import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaBox, FaShoppingCart, FaTags, FaPlus, FaEdit, FaTrash,
    FaEye, FaSignOutAlt, FaBars, FaTimes, FaChartLine,
    FaUsers, FaUserPlus, FaSearch,
} from 'react-icons/fa';
import {
    getProducts, getCategories, getSales, deleteProduct, createProduct, updateProduct,
    getCart, getUserOrders, getUserReviews, getUserRatings, getUserLikes,
    userSignup, getUsers, updateUser, deleteUser as deleteUserApi,
    createCategory, updateCategory, deleteCategory
} from '../../api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sales, setSales] = useState([]);
    const [carts, setCarts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [merchantData, setMerchantData] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // User modals
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editUserForm, setEditUserForm] = useState({ first_name: '', last_name: '', email: '', phone: '', role: 'user' });

    // Cart modal
    const [selectedCart, setSelectedCart] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);

    // Order modal
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);

    // Product modals
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditProductModal, setShowEditProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editProductForm, setEditProductForm] = useState({
        title: '', descp: '', price: '', quantity: '', images: [],
        category_id: '', brand: '', currency: 'NGN',
    });
    const [editProductImageInput, setEditProductImageInput] = useState('');

    // Category modal
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [categoryImageInput, setCategoryImageInput] = useState('');
    const [newCategory, setNewCategory] = useState({ name: '', description: '', image: '', merchant_id: '' });

    // New product form
    const [newProduct, setNewProduct] = useState({
        title: '', descp: '', price: '', quantity: '', images: [],
        category_id: '', merchant_id: '', currency: 'NGN', brand: '',
        min_qty: 1, max_qty: 50, discount: 0, discount_expiration: '',
        has_refund_policy: false, has_discount: false, has_shipment: true,
        has_variation: false, shipping_locations: ['Nigeria'], attrib: []
    });
    const [imageInput, setImageInput] = useState('');

    // New user form
    const [newUser, setNewUser] = useState({ first_name: '', last_name: '', email: '', phone: '', password: '' });

    const getMerchantData = () => {
        try {
            const raw = localStorage.getItem('merchantData');
            if (!raw || raw === 'undefined' || raw === 'null') return null;
            return JSON.parse(raw);
        } catch (e) { return null; }
    };

    useEffect(() => {
        const merchant = getMerchantData();
        if (!merchant) {
            navigate('/admin/signin');
            return;
        }
        setMerchantData(merchant);
        setNewProduct(prev => ({ ...prev, merchant_id: merchant.id || merchant._id }));
        fetchAllData(merchant);
    }, [navigate]);

    const fetchAllProductsWithPagination = async (merchantId) => {
        let allProducts = [];
        let page = 1;
        const limit = 100;

        try {
            const response = await getProducts(merchantId, null, page, limit);
            const productsData = response.data?.data || response.data || [];
            allProducts = productsData;

            const total = response.data?.total || response.data?.pagination?.total || productsData.length;
            const totalPages = response.data?.pagination?.total_pages || Math.ceil(total / limit);

            if (totalPages > 1) {
                const remainingPages = [];
                for (let p = 2; p <= totalPages && p <= 10; p++) {
                    remainingPages.push(
                        getProducts(merchantId, null, p, limit).catch(() => ({ data: [] }))
                    );
                }
                const remainingResponses = await Promise.all(remainingPages);
                remainingResponses.forEach(res => {
                    const pageData = res.data?.data || res.data || [];
                    allProducts = [...allProducts, ...pageData];
                });
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            const fallbackResponse = await getProducts(merchantId);
            allProducts = fallbackResponse.data?.data || fallbackResponse.data?.products || fallbackResponse.data || [];
        }

        return allProducts;
    };

    const fetchAllData = async (merchant) => {
        setLoading(true);
        setError('');
        try {
            const merchantId = merchant?.id || merchant?._id;
            if (!merchantId) {
                setLoading(false);
                return;
            }

            const [allProducts, categoriesRes, salesRes, usersRes] = await Promise.all([
                fetchAllProductsWithPagination(merchantId),
                getCategories(merchantId).catch(() => ({ data: [] })),
                getSales(merchantId).catch(() => ({ data: [] })),
                getUsers(merchantId).catch(() => ({ data: [] }))
            ]);

            setProducts(Array.isArray(allProducts) ? allProducts : []);
            setCategories(Array.isArray(categoriesRes.data?.data || categoriesRes.data) ? (categoriesRes.data?.data || categoriesRes.data) : []);
            setSales(Array.isArray(salesRes.data?.data || salesRes.data) ? (salesRes.data?.data || salesRes.data) : []);

            const allUsers = usersRes.data?.data || usersRes.data || [];
            const userList = Array.isArray(allUsers) ? allUsers : [];
            setUsers(userList);

            // Log one sale and one user so you can confirm the id fields match
            if (salesRes.data?.data?.[0] || salesRes.data?.[0]) {
                console.log('Sample sale object:', salesRes.data?.data?.[0] || salesRes.data?.[0]);
            }
            if (userList[0]) {
                console.log('Sample user object:', userList[0]);
            }

            if (userList.length > 0) {
                const cartUserList = userList.slice(0, 50);
                const cartPromises = cartUserList.map(u =>
                    getCart(u.id || u._id).catch(() => ({ data: null }))
                );
                const cartResponses = await Promise.all(cartPromises);
                const allCarts = cartResponses
                    .map(res => res.data?.data || res.data)
                    .filter(cart => cart && cart.items && cart.items.length > 0);
                setCarts(Array.isArray(allCarts) ? allCarts : []);
            }

        } catch (error) {
            console.error('Error in fetchAllData:', error);
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // Tries every possible id field variation to match sale -> user
    const getUserByUserId = (sale) => {
        if (!sale) return null;
        const possibleIds = [
            sale.user_id,
            sale.userId,
            sale.buyer_id,
            sale.buyerId,
            sale.customer_id,
            sale.customerId,
            sale.user?.id,
            sale.user?._id,
        ].filter(Boolean);

        if (possibleIds.length === 0) return null;

        return users.find(u => {
            const uid = u.id || u._id;
            return possibleIds.includes(uid);
        }) || null;
    };

    const getUserName = (userId) => {
        if (!userId) return 'N/A';
        const user = users.find(u => (u.id || u._id) === userId);
        if (user) {
            return `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email || 'N/A';
        }
        return userId.substring(0, 8) + '...';
    };

    // ===== CATEGORY =====
    const openCreateCategoryModal = () => {
        setEditingCategory(null);
        setNewCategory({ name: '', description: '', image: '', merchant_id: merchantData?.id || merchantData?._id || '' });
        setCategoryImageInput('');
        setShowCategoryModal(true);
    };

    const openEditCategoryModal = (category) => {
        setEditingCategory(category);
        setNewCategory({
            name: category.name || '',
            description: category.description || '',
            image: category.image || '',
            merchant_id: merchantData?.id || merchantData?._id || ''
        });
        setCategoryImageInput('');
        setShowCategoryModal(true);
    };

    const handleSaveCategory = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            if (!newCategory.name) throw new Error('Category name is required');
            const categoryData = {
                name: newCategory.name,
                description: newCategory.description || '',
                image: newCategory.image || '',
                merchant_id: newCategory.merchant_id
            };
            let response;
            if (editingCategory) {
                response = await updateCategory(editingCategory.id || editingCategory._id, categoryData);
            } else {
                response = await createCategory(categoryData);
            }
            if (response.status === 200 || response.status === 201) {
                setSuccess(editingCategory ? 'Category updated!' : 'Category created!');
                setShowCategoryModal(false);
                await fetchAllData(merchantData);
                setTimeout(() => setSuccess(''), 3000);
            } else throw new Error('Failed to save category');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to save category');
        } finally { setSubmitting(false); }
    };

    const handleDeleteCategory = async (categoryId, categoryName) => {
        if (window.confirm(`Delete category "${categoryName}"?`)) {
            try {
                await deleteCategory(categoryId);
                setSuccess('Category deleted!');
                await fetchAllData(merchantData);
                setTimeout(() => setSuccess(''), 3000);
            } catch (error) { setError('Failed to delete category'); }
        }
    };

    // ===== ORDERS =====
    const viewOrder = (sale) => {
        const user = getUserByUserId(sale);
        setSelectedOrder({ ...sale, user });
        setShowOrderModal(true);
    };

    // ===== USERS =====
    const viewUserDetails = async (userId) => {
        try {
            setLoading(true);
            const [ordersRes, reviewsRes, ratingsRes, likesRes] = await Promise.all([
                getUserOrders(userId).catch(() => ({ data: [] })),
                getUserReviews(userId).catch(() => ({ data: [] })),
                getUserRatings(userId).catch(() => ({ data: [] })),
                getUserLikes(userId).catch(() => ({ data: [] }))
            ]);
            setSelectedUser({
                id: userId,
                orders: ordersRes.data?.data || ordersRes.data || [],
                reviews: reviewsRes.data?.data || reviewsRes.data || [],
                ratings: ratingsRes.data?.data || ratingsRes.data || [],
                likes: likesRes.data?.data || likesRes.data || []
            });
            setShowUserModal(true);
        } catch (error) { setError('Failed to fetch user details'); }
        finally { setLoading(false); }
    };

    const editUser = (user) => {
        setEditingUser(user);
        setEditUserForm({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            phone: user.phone || '',
            role: user.role || 'user'
        });
        setShowEditModal(true);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const userId = editingUser.id || editingUser._id;
            await updateUser(userId, editUserForm);
            setSuccess('User updated!');
            setShowEditModal(false);
            await fetchAllData(merchantData);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) { setError(err.response?.data?.message || 'Failed to update user'); }
        finally { setSubmitting(false); }
    };

    const deleteUser = async (userId) => {
        if (window.confirm('Delete this user?')) {
            try {
                await deleteUserApi(userId);
                setSuccess('User deleted!');
                await fetchAllData(merchantData);
                setTimeout(() => setSuccess(''), 3000);
            } catch (error) { setError('Failed to delete user'); }
        }
    };

    // ===== PRODUCTS =====
    const viewProduct = (product) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    };

    const openEditProductModal = (product) => {
        setEditingProduct(product);
        setEditProductForm({
            title: product.title || '',
            descp: product.descp || '',
            price: product.price || '',
            quantity: product.quantity || '',
            images: product.images ? [...product.images] : [],
            category_id: product.category_id || product.category?.id || product.category?._id || '',
            brand: product.brand || '',
            currency: product.currency || 'NGN',
        });
        setEditProductImageInput('');
        setShowEditProductModal(true);
    };

    const addEditProductImage = () => {
        if (editProductImageInput && editProductForm.images.length < 5) {
            setEditProductForm({ ...editProductForm, images: [...editProductForm.images, editProductImageInput] });
            setEditProductImageInput('');
        }
    };

    const removeEditProductImage = (index) => {
        setEditProductForm({ ...editProductForm, images: editProductForm.images.filter((_, i) => i !== index) });
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            if (!editProductForm.title) throw new Error('Title required');
            if (!editProductForm.price) throw new Error('Price required');
            if (!editProductForm.quantity) throw new Error('Quantity required');
            if (editProductForm.images.length === 0) throw new Error('Add at least one image');
            const productId = editingProduct.id || editingProduct._id;
            const response = await updateProduct(productId, {
                ...editProductForm,
                price: parseFloat(editProductForm.price),
                quantity: parseInt(editProductForm.quantity),
            });
            if (response.status === 200 || response.status === 201) {
                setSuccess('Product updated!');
                setShowEditProductModal(false);
                await fetchAllData(merchantData);
                setTimeout(() => setSuccess(''), 3000);
            } else throw new Error('Failed to update product');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to update product');
        } finally { setSubmitting(false); }
    };

    const addImage = () => {
        if (imageInput && newProduct.images.length < 5) {
            setNewProduct({ ...newProduct, images: [...newProduct.images, imageInput] });
            setImageInput('');
        }
    };

    const removeImage = (index) => {
        setNewProduct({ ...newProduct, images: newProduct.images.filter((_, i) => i !== index) });
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            if (!newProduct.title) throw new Error('Title required');
            if (!newProduct.price) throw new Error('Price required');
            if (!newProduct.quantity) throw new Error('Quantity required');
            if (!newProduct.category_id) throw new Error('Select a category');
            if (newProduct.images.length === 0) throw new Error('Add at least one image');

            const response = await createProduct({
                ...newProduct,
                price: parseFloat(newProduct.price),
                quantity: parseInt(newProduct.quantity),
                min_qty: parseInt(newProduct.min_qty),
                max_qty: parseInt(newProduct.max_qty),
                discount: parseFloat(newProduct.discount) || 0,
            });
            if (response.status === 200 || response.status === 201) {
                setSuccess('Product created!');
                setNewProduct({
                    title: '', descp: '', price: '', quantity: '', images: [],
                    category_id: '', merchant_id: merchantData?.id || merchantData?._id || '',
                    currency: 'NGN', brand: '', min_qty: 1, max_qty: 50, discount: 0,
                    discount_expiration: '', has_refund_policy: false, has_discount: false,
                    has_shipment: true, has_variation: false, shipping_locations: ['Nigeria'], attrib: []
                });
                await fetchAllData(merchantData);
                setTimeout(() => { setActiveTab('products'); setSuccess(''); }, 2000);
            } else throw new Error('Failed to create product');
        } catch (err) { setError(err.response?.data?.message || err.message || 'Failed to create product'); }
        finally { setSubmitting(false); }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Delete this product?')) {
            try {
                await deleteProduct(productId);
                setSuccess('Product deleted!');
                await fetchAllData(merchantData);
                setTimeout(() => setSuccess(''), 3000);
            } catch (error) { setError('Failed to delete product'); }
        }
    };

    // ===== CART =====
    const viewCart = (cart) => {
        setSelectedCart(cart);
        setShowCartModal(true);
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            if (!newUser.password || newUser.password.length < 6) throw new Error('Password must be at least 6 characters');
            const response = await userSignup(newUser);
            if (response.status === 200 || response.status === 201) {
                setSuccess('User created!');
                setNewUser({ first_name: '', last_name: '', email: '', phone: '', password: '' });
                await fetchAllData(merchantData);
                setTimeout(() => { setActiveTab('users'); setSuccess(''); }, 2000);
            } else throw new Error('Failed to create user');
        } catch (err) { setError(err.response?.data?.message || err.message || 'Failed to create user'); }
        finally { setSubmitting(false); }
    };

    const handleLogout = () => {
        localStorage.removeItem('merchantToken');
        localStorage.removeItem('merchantData');
        navigate('/admin/signin');
    };

    const stats = [
        { title: 'Total Products', value: products.length, icon: <FaBox />, color: 'bg-blue-600' },
        { title: 'Total Orders', value: sales.length, icon: <FaShoppingCart />, color: 'bg-green-600' },
        { title: 'Total Categories', value: categories.length, icon: <FaTags />, color: 'bg-purple-600' },
        { title: 'Total Revenue', value: `$${sales.reduce((sum, sale) => sum + (sale.amount || 0), 0).toLocaleString()}`, icon: <FaChartLine />, color: 'bg-yellow-600' },
    ];

    const sidebarLinks = [
        { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine /> },
        { id: 'products', label: 'Products', icon: <FaBox /> },
        { id: 'create-product', label: 'Create Product', icon: <FaPlus /> },
        { id: 'categories', label: 'Categories', icon: <FaTags /> },
        { id: 'orders', label: 'Orders', icon: <FaShoppingCart /> },
        { id: 'users', label: 'Users', icon: <FaUsers /> },
        { id: 'create-user', label: 'Create User', icon: <FaUserPlus /> },
        { id: 'cart', label: 'Cart', icon: <FaShoppingCart /> },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="text-gray-500">Loading dashboard data...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg">
                {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white transform transition-transform duration-300 z-40 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="p-5 border-b border-blue-700 flex-shrink-0">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <img src="https://i5.walmartimages.com/dfw/4ff9c6c9-af86/k2-_47db52a8-75b4-4c98-868a-4cf9248272c5.v1.svg" alt="Walmart" className="h-8 w-8" />
                        Walmart Admin
                    </h1>
                    {merchantData && <p className="text-sm text-blue-200 mt-1 truncate">{merchantData.store_name}</p>}
                </div>
                <nav className="flex-1 overflow-y-auto p-4">
                    {sidebarLinks.map((link) => (
                        <button key={link.id} onClick={() => { setActiveTab(link.id); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${activeTab === link.id ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'}`}>
                            {link.icon}<span>{link.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-blue-700 flex-shrink-0">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-blue-700 hover:text-white transition-colors">
                        <FaSignOutAlt /><span>Sign Out</span>
                    </button>
                </div>
            </div>

            {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            {/* Main Content */}
            <div className="lg:ml-64 p-6">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <h2 className="text-2xl font-bold text-blue-800 italic">
                        {activeTab === 'dashboard' && 'Dashboard'}
                        {activeTab === 'products' && `Products Management (${products.length})`}
                        {activeTab === 'create-product' && 'Create New Product'}
                        {activeTab === 'categories' && `Categories Management (${categories.length})`}
                        {activeTab === 'orders' && `Orders Management (${sales.length})`}
                        {activeTab === 'users' && `Users Management (${users.length})`}
                        {activeTab === 'create-user' && 'Create New User'}
                        {activeTab === 'cart' && `Cart Management (${carts.length} active)`}
                    </h2>
                </div>

                {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
                {success && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>}

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-full text-white`}>{stat.icon}</div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-blue-900 italic">Recent Products (Top 10)</h3>
                                <button onClick={() => setActiveTab('products')} className="text-blue-600 text-sm hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-left text-sm text-blue-800 italic">
                                            <th className="pb-2">S/N</th>
                                            <th className="pb-2">PRODUCT NAME</th>
                                            <th className="pb-2">PRICE</th>
                                            <th className="pb-2">CATEGORY</th>
                                            <th className="pb-2">STOCK</th>
                                            <th className="pb-2">STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.slice(0, 10).map((product, i) => (
                                            <tr key={product.id || product._id} className="border-b">
                                                <td className="py-3 text-sm">{i + 1}</td>
                                                <td className="py-3 text-sm">{product.title?.substring(0, 30)}...</td>
                                                <td className="py-3 text-sm">${product.price}</td>
                                                <td className="py-3 text-sm">{product.category?.name || 'N/A'}</td>
                                                <td className="py-3 text-sm">{product.quantity}</td>
                                                <td className="py-3 text-sm">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${product.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {products.length === 0 && (
                                            <tr><td colSpan="6" className="py-6 text-center text-gray-500">No products yet</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-blue-800 italic">All Products ({products.length})</h3>
                            <button onClick={() => setActiveTab('create-product')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
                                <FaPlus /> Add Product
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b">
                                    <tr className="text-left text-sm text-blue-800">
                                        <th className="pb-2">Image</th>
                                        <th className="pb-2">Title</th>
                                        <th className="pb-2">Price</th>
                                        <th className="pb-2">Quantity</th>
                                        <th className="pb-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id || product._id} className="border-b">
                                            <td className="py-3">
                                                <img src={product.images?.[0]} alt={product.title} className="w-10 h-10 object-cover rounded" />
                                            </td>
                                            <td className="py-3 text-sm">{product.title?.substring(0, 40)}...</td>
                                            <td className="py-3 text-sm">${product.price}</td>
                                            <td className="py-3 text-sm">{product.quantity}</td>
                                            <td className="py-3">
                                                <div className="flex gap-2">
                                                    <button onClick={() => viewProduct(product)} className="text-blue-600 hover:text-blue-800" title="View"><FaEye /></button>
                                                    <button onClick={() => openEditProductModal(product)} className="text-green-600 hover:text-green-800" title="Edit"><FaEdit /></button>
                                                    <button onClick={() => handleDeleteProduct(product.id || product._id)} className="text-red-700 hover:text-red-400" title="Delete"><FaTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr><td colSpan="5" className="py-6 text-center text-gray-500">No products yet</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Create Product Tab */}
                {activeTab === 'create-product' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-blue-800 italic mb-4">Create New Product</h3>
                        <form onSubmit={handleCreateProduct}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-blue-800 italic mb-1">Title *</label>
                                <input type="text" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-blue-800 italic mb-1">Description</label>
                                <textarea rows="3" value={newProduct.descp} onChange={(e) => setNewProduct({ ...newProduct, descp: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Price *</label>
                                    <input type="number" step="0.01" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Quantity *</label>
                                    <input type="number" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-blue-800 italic mb-1">Images (URLs) *</label>
                                <div className="flex gap-2 mb-2">
                                    <input type="text" value={imageInput} onChange={(e) => setImageInput(e.target.value)} placeholder="Enter image URL" className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <button type="button" onClick={addImage} className="bg-gray-200 px-4 rounded-lg hover:bg-gray-300">Add</button>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {newProduct.images.map((img, idx) => (
                                        <div key={idx} className="relative">
                                            <img src={img} alt={`Preview ${idx}`} className="w-16 h-16 object-cover rounded" />
                                            <button type="button" onClick={() => removeImage(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-blue-800 italic mb-1">Category *</label>
                                <select value={newProduct.category_id} onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id || cat._id} value={cat.id || cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-3">
                                <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                                    {submitting ? 'Creating...' : 'Create Product'}
                                </button>
                                <button type="button" onClick={() => setActiveTab('products')} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Categories Tab */}
                {activeTab === 'categories' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-blue-800 italic">All Categories ({categories.length})</h3>
                            <button onClick={openCreateCategoryModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
                                <FaPlus /> Add Category
                            </button>
                        </div>
                        {categories.length === 0 ? (
                            <div className="text-center text-blue-800 italic py-12">
                                <FaTags className="text-5xl mx-auto mb-3 text-gray-300" />
                                <p>No categories yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {categories.map((category) => (
                                    <div key={category.id || category._id} className="border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-3 flex-1">
                                            {category.image && <img src={category.image} alt={category.name} className="w-12 h-12 object-cover rounded" onError={(e) => e.target.style.display = 'none'} />}
                                            <span className="font-medium text-gray-800">{category.name}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditCategoryModal(category)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                                            <button onClick={() => handleDeleteCategory(category.id || category._id, category.name)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-blue-800 italic mb-4">All Orders ({sales.length})</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b">
                                    <tr className="text-left text-sm text-blue-800 italic">
                                        <th className="pb-2">#</th>
                                        <th className="pb-2">CUSTOMER NAME</th>
                                        <th className="pb-2">EMAIL</th>
                                        <th className="pb-2">AMOUNT</th>
                                        <th className="pb-2">STATUS</th>
                                        <th className="pb-2">DATE</th>
                                        <th className="pb-2">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sales.map((sale, idx) => {
                                        const user = getUserByUserId(sale);
                                        return (
                                            <tr key={sale.id || sale._id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 text-sm">{idx + 1}</td>
                                                <td className="py-3 text-sm font-medium">
                                                    {user
                                                        ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email
                                                        : (sale.customer_name || sale.buyer_name || 'N/A')}
                                                </td>
                                                <td className="py-3 text-sm">{user?.email || sale.customer_email || 'N/A'}</td>
                                                <td className="py-3 text-sm">${sale.amount}</td>
                                                <td className="py-3">
                                                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">{sale.status || 'Completed'}</span>
                                                </td>
                                                <td className="py-3 text-sm">{sale.created_at ? new Date(sale.created_at).toLocaleDateString() : 'N/A'}</td>
                                                <td className="py-3">
                                                    <button onClick={() => viewOrder(sale)} className="text-blue-600 hover:text-blue-800" title="View Order"><FaEye /></button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {sales.length === 0 && (
                                        <tr><td colSpan="7" className="py-6 text-center text-blue-800 italic">No orders yet</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-blue-800 italic">Users ({users.length})</h3>
                            <button onClick={() => setActiveTab('create-user')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
                                <FaPlus /> Add New User
                            </button>
                        </div>
                        <div className="mb-4 relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-800" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b">
                                    <tr className="text-left text-sm text-blue-800 italic">
                                        <th className="pb-2">#</th>
                                        <th className="pb-2">NAME</th>
                                        <th className="pb-2">EMAIL</th>
                                        <th className="pb-2">PHONE</th>
                                        <th className="pb-2">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users
                                            .filter(u => u && (
                                                (u.first_name && u.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                                (u.last_name && u.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                                (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                                (u.phone && u.phone.includes(searchTerm))
                                            ))
                                            .map((user, i) => (
                                                <tr key={user.id || user._id || i} className="border-b hover:bg-gray-50">
                                                    <td className="py-3 text-sm">{i + 1}</td>
                                                    <td className="py-3 text-sm">{user.first_name || ''} {user.last_name || ''}</td>
                                                    <td className="py-3 text-sm">{user.email || 'N/A'}</td>
                                                    <td className="py-3 text-sm">{user.phone || 'N/A'}</td>
                                                    <td className="py-3">
                                                        <div className="flex gap-2">
                                                            <button onClick={() => viewUserDetails(user.id || user._id)} className="text-blue-600 hover:text-blue-800" title="View"><FaEye /></button>
                                                            <button onClick={() => editUser(user)} className="text-green-600 hover:text-green-800" title="Edit"><FaEdit /></button>
                                                            <button onClick={() => deleteUser(user.id || user._id)} className="text-red-600 hover:text-red-800" title="Delete"><FaTrash /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-12 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <FaUsers className="text-gray-300 text-5xl mb-3" />
                                                    <p className="text-gray-500">No users found</p>
                                                    <p className="text-gray-400 text-sm mt-1">Click "Add New User" to create your first user</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Create User Tab */}
                {activeTab === 'create-user' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-blue-800 italic mb-4">Create New User</h3>
                        <form onSubmit={handleCreateUser}>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">First Name *</label>
                                    <input type="text" value={newUser.first_name} onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Last Name *</label>
                                    <input type="text" value={newUser.last_name} onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-blue-800 italic mb-1">Email *</label>
                                <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-blue-800 italic mb-1">Phone *</label>
                                <input type="tel" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-blue-800 italic mb-1">Password *</label>
                                <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                            </div>
                            <div className="flex gap-3">
                                <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                                    {submitting ? 'Creating...' : 'Create User'}
                                </button>
                                <button type="button" onClick={() => setActiveTab('users')} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Cart Tab */}
                {activeTab === 'cart' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-blue-800 italic mb-4">Cart Management ({carts.length} active)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-50 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-blue-600">{carts.length}</p>
                                <p className="text-sm text-blue-800 italic">Active Carts</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-green-600">{carts.reduce((sum, c) => sum + (c?.items?.length || 0), 0)}</p>
                                <p className="text-sm text-blue-800 italic">Total Items</p>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-purple-600">${carts.reduce((sum, c) => sum + (parseFloat(c?.total) || 0), 0).toLocaleString()}</p>
                                <p className="text-sm text-blue-800 italic">Cart Value</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b">
                                    <tr className="text-left text-sm text-blue-800 italic">
                                        <th className="pb-2">USER</th>
                                        <th className="pb-2">ITEMS</th>
                                        <th className="pb-2">TOTAL</th>
                                        <th className="pb-2">UPDATED</th>
                                        <th className="pb-2">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carts.length > 0 ? carts.map((cart) => (
                                        <tr key={cart?.id || cart?._id || Math.random()} className="border-b hover:bg-gray-50">
                                            <td className="py-3 text-sm font-medium">{getUserName(cart?.user_id)}</td>
                                            <td className="py-3 text-sm">
                                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{cart?.items?.length || 0} items</span>
                                            </td>
                                            <td className="py-3 text-sm font-semibold">${(parseFloat(cart?.total) || 0).toLocaleString()}</td>
                                            <td className="py-3 text-sm">{cart?.updated_at ? new Date(cart.updated_at).toLocaleString() : 'N/A'}</td>
                                            <td className="py-3">
                                                <button onClick={() => viewCart(cart)} className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="5" className="py-12 text-center text-blue-800 italic">No active carts found</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* ===== MODALS — no dark overlay ===== */}

            {/* View Product Modal */}
            {showProductModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[85vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-blue-800 italic">Product Details</h3>
                                <button onClick={() => setShowProductModal(false)} className="text-gray-500 hover:text-gray-700"><FaTimes /></button>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm font-medium text-blue-800 italic mb-2">Images ({selectedProduct.images?.length || 0})</p>
                                <div className="flex gap-3 flex-wrap">
                                    {selectedProduct.images?.length > 0 ? (
                                        selectedProduct.images.map((img, idx) => (
                                            <img key={idx} src={img} alt={`Product ${idx + 1}`} className="w-24 h-24 object-cover rounded border border-gray-200" onError={(e) => e.target.style.display = 'none'} />
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No images available</p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <span className="text-sm font-medium text-gray-600 w-28">Title:</span>
                                    <span className="text-sm text-gray-800">{selectedProduct.title || 'N/A'}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-sm font-medium text-gray-600 w-28">Description:</span>
                                    <span className="text-sm text-gray-800">{selectedProduct.descp || 'No description'}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-sm font-medium text-gray-600 w-28">Price:</span>
                                    <span className="text-sm text-gray-800">${selectedProduct.price}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-sm font-medium text-gray-600 w-28">Quantity:</span>
                                    <span className="text-sm text-gray-800">{selectedProduct.quantity}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-sm font-medium text-gray-600 w-28">Category:</span>
                                    <span className="text-sm text-gray-800">{selectedProduct.category?.name || 'N/A'}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-sm font-medium text-gray-600 w-28">Brand:</span>
                                    <span className="text-sm text-gray-800">{selectedProduct.brand || 'N/A'}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-sm font-medium text-gray-600 w-28">Status:</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${selectedProduct.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {selectedProduct.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-end">
                                <button onClick={() => setShowProductModal(false)} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 text-sm">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {showEditProductModal && editingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[85vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-blue-800 italic">Edit Product</h3>
                                <button onClick={() => setShowEditProductModal(false)} className="text-gray-500 hover:text-gray-700"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleUpdateProduct}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Title *</label>
                                    <input type="text" value={editProductForm.title} onChange={(e) => setEditProductForm({ ...editProductForm, title: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Description</label>
                                    <textarea rows="3" value={editProductForm.descp} onChange={(e) => setEditProductForm({ ...editProductForm, descp: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-blue-800 italic mb-1">Price *</label>
                                        <input type="number" step="0.01" value={editProductForm.price} onChange={(e) => setEditProductForm({ ...editProductForm, price: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-blue-800 italic mb-1">Quantity *</label>
                                        <input type="number" value={editProductForm.quantity} onChange={(e) => setEditProductForm({ ...editProductForm, quantity: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Brand</label>
                                    <input type="text" value={editProductForm.brand} onChange={(e) => setEditProductForm({ ...editProductForm, brand: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Images (URLs) *</label>
                                    <div className="flex gap-2 mb-2">
                                        <input type="text" value={editProductImageInput} onChange={(e) => setEditProductImageInput(e.target.value)} placeholder="Enter image URL" className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        <button type="button" onClick={addEditProductImage} className="bg-gray-200 px-4 rounded-lg hover:bg-gray-300">Add</button>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {editProductForm.images?.map((img, idx) => (
                                            <div key={idx} className="relative">
                                                <img src={img} alt={`Preview ${idx}`} className="w-16 h-16 object-cover rounded border border-gray-200" onError={(e) => e.target.style.display = 'none'} />
                                                <button type="button" onClick={() => removeEditProductImage(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">×</button>
                                            </div>
                                        ))}
                                        {editProductForm.images?.length === 0 && (
                                            <p className="text-gray-400 text-sm">No images added yet</p>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Category</label>
                                    <select value={editProductForm.category_id} onChange={(e) => setEditProductForm({ ...editProductForm, category_id: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id || cat._id} value={cat.id || cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-3">
                                    <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                                        {submitting ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button type="button" onClick={() => setShowEditProductModal(false)} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Order Detail Modal */}
            {showOrderModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-lg w-full max-h-[85vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="text-xl font-bold text-blue-800 italic">Order Details</h3>
                                <button onClick={() => setShowOrderModal(false)} className="text-gray-500 hover:text-gray-700"><FaTimes /></button>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                <p className="text-xs text-blue-500 uppercase font-semibold mb-2">Order Info</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Order ID</span>
                                        <span className="text-sm font-medium text-gray-800">{selectedOrder.id || selectedOrder._id || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Amount</span>
                                        <span className="text-sm font-bold text-green-700">${selectedOrder.amount || '0'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Status</span>
                                        <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">{selectedOrder.status || 'Completed'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Date</span>
                                        <span className="text-sm text-gray-800">{selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleString() : 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Customer Info</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Name</span>
                                        <span className="text-sm font-medium text-gray-800">
                                            {selectedOrder.user
                                                ? `${selectedOrder.user.first_name || ''} ${selectedOrder.user.last_name || ''}`.trim() || 'N/A'
                                                : (selectedOrder.customer_name || selectedOrder.buyer_name || 'N/A')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Email</span>
                                        <span className="text-sm text-gray-800">{selectedOrder.user?.email || selectedOrder.customer_email || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Phone</span>
                                        <span className="text-sm text-gray-800">{selectedOrder.user?.phone || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">User ID</span>
                                        <span className="text-sm text-gray-500 break-all">
                                            {selectedOrder.user_id || selectedOrder.userId || selectedOrder.buyer_id || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {selectedOrder.items && selectedOrder.items.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Items Ordered ({selectedOrder.items.length})</p>
                                    <div className="space-y-2">
                                        {selectedOrder.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm border border-gray-100">
                                                <span className="text-gray-700">Product: {item?.product_id?.substring(0, 12)}...</span>
                                                <span className="text-gray-600">Qty: {item?.quantity || 1}</span>
                                                <span className="font-medium text-gray-800">${item?.price || 0}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {(selectedOrder.delivery_address || selectedOrder.address) && (
                                <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                                    <p className="text-xs text-yellow-600 uppercase font-semibold mb-2">Delivery Address</p>
                                    <p className="text-sm text-gray-800">{selectedOrder.delivery_address || selectedOrder.address}</p>
                                </div>
                            )}
                            <div className="flex justify-end mt-2">
                                <button onClick={() => setShowOrderModal(false)} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 text-sm">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Detail Modal */}
            {showCartModal && selectedCart && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Cart — {getUserName(selectedCart?.user_id)}</h3>
                                <button onClick={() => setShowCartModal(false)} className="text-gray-500 hover:text-gray-700"><FaTimes /></button>
                            </div>
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Items ({selectedCart?.items?.length || 0})</h4>
                                {selectedCart?.items?.length > 0 ? (
                                    <div className="space-y-2">
                                        {selectedCart.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                                                <span>Product: {item?.product_id?.substring(0, 15)}...</span>
                                                <span>Qty: {item?.quantity || 1}</span>
                                                <span>${item?.price || 0}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : <p className="text-gray-500 text-sm">No items</p>}
                            </div>
                            <div className="flex justify-between items-center border-t pt-4">
                                <p className="font-bold">Total: ${parseFloat(selectedCart?.total || 0).toLocaleString()}</p>
                                <button onClick={() => setShowCartModal(false)} className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* User Details Modal */}
            {showUserModal && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">User Details</h3>
                                <button onClick={() => setShowUserModal(false)} className="text-gray-500 hover:text-gray-700"><FaTimes /></button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Orders ({selectedUser.orders?.length || 0})</h4>
                                    {selectedUser.orders?.length > 0 ? (
                                        <div className="bg-gray-50 p-3 rounded max-h-40 overflow-y-auto">
                                            {selectedUser.orders.map((order, idx) => (
                                                <div key={idx} className="text-sm py-1 border-b">Order #{order.id} — ${order.amount}</div>
                                            ))}
                                        </div>
                                    ) : <p className="text-gray-500 text-sm">No orders yet</p>}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Reviews ({selectedUser.reviews?.length || 0})</h4>
                                    {selectedUser.reviews?.length > 0 ? (
                                        <div className="bg-gray-50 p-3 rounded max-h-40 overflow-y-auto">
                                            {selectedUser.reviews.map((review, idx) => (
                                                <div key={idx} className="text-sm py-1 border-b">{review.comment || review.text}</div>
                                            ))}
                                        </div>
                                    ) : <p className="text-gray-500 text-sm">No reviews yet</p>}
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button onClick={() => setShowUserModal(false)} className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Edit User</h3>
                                <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleUpdateUser}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input type="text" value={editUserForm.first_name} onChange={(e) => setEditUserForm({ ...editUserForm, first_name: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input type="text" value={editUserForm.last_name} onChange={(e) => setEditUserForm({ ...editUserForm, last_name: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" value={editUserForm.email} onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input type="tel" value={editUserForm.phone} onChange={(e) => setEditUserForm({ ...editUserForm, phone: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="flex gap-3">
                                    <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                                        {submitting ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button type="button" onClick={() => setShowEditModal(false)} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-blue-800 italic">{editingCategory ? 'Edit Category' : 'Create New Category'}</h3>
                                <button onClick={() => setShowCategoryModal(false)} className="text-blue-800 hover:text-blue-500"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleSaveCategory}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Category Name *</label>
                                    <input type="text" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} placeholder="e.g., fashion, food, electronics" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Description</label>
                                    <textarea rows="3" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Image URL</label>
                                    <div className="flex gap-2">
                                        <input type="text" value={categoryImageInput} onChange={(e) => setCategoryImageInput(e.target.value)} placeholder="Enter image URL" className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        <button type="button" onClick={() => { if (categoryImageInput) { setNewCategory({ ...newCategory, image: categoryImageInput }); setCategoryImageInput(''); } }} className="bg-gray-200 px-4 rounded-lg hover:bg-gray-300">Add</button>
                                    </div>
                                    {newCategory.image && (
                                        <div className="mt-2 relative inline-block">
                                            <img src={newCategory.image} alt="Preview" className="w-20 h-20 object-cover rounded border" onError={(e) => e.target.style.display = 'none'} />
                                            <button type="button" onClick={() => setNewCategory({ ...newCategory, image: '' })} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                                        {submitting ? 'Saving...' : (editingCategory ? 'Update' : 'Create')}
                                    </button>
                                    <button type="button" onClick={() => setShowCategoryModal(false)} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard; 