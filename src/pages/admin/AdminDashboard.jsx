import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaBox,
    FaShoppingCart,
    FaTags,
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaChartLine,
    FaUsers,
    FaUserPlus,
    FaSearch,
} from 'react-icons/fa';
import {
    getProducts,
    getCategories,
    getSales,
    deleteProduct,
    createProduct,
    getCart,
    getUserOrders,
    getUserReviews,
    getUserRatings,
    getUserLikes,
    userSignup,
    getUsers,
    updateUser,
    deleteUser as deleteUserApi,
    changeUserPassword,
    createCategory,
    updateCategory,
    deleteCategory
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
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Category Modal States
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [categoryImageInput, setCategoryImageInput] = useState('');
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        image: '',
        merchant_id: ''
    });

    // New product state
    const [newProduct, setNewProduct] = useState({
        title: '',
        descp: '',
        price: '',
        quantity: '',
        images: [],
        category_id: '',
        merchant_id: '',
        currency: 'NGN',
        brand: '',
        min_qty: 1,
        max_qty: 10,
        discount: 0,
        discount_expiration: '',
        has_refund_policy: false,
        has_discount: false,
        has_shipment: true,
        has_variation: false,
        shipping_locations: ['Nigeria'],
        attrib: []
    });
    const [imageInput, setImageInput] = useState('');

    // New user state
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: ''
    });

    // Edit user form state
    const [editUserForm, setEditUserForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: 'user'
    });

    const getMerchantData = () => {
        try {
            const raw = localStorage.getItem('merchantData');
            if (!raw || raw === 'undefined' || raw === 'null') return null;
            return JSON.parse(raw);
        } catch (error) {
            console.error('Error parsing merchant data:', error);
            return null;
        }
    };

    useEffect(() => {
        const merchant = getMerchantData();
        if (!merchant) {
            navigate('/admin/signin');
            return;
        }
        setMerchantData(merchant);
        setNewProduct(prev => ({
            ...prev,
            merchant_id: merchant.id || merchant._id
        }));
        fetchAllData(merchant);
    }, [navigate]);

    const fetchAllData = async (merchant) => {
        setLoading(true);
        try {
            const merchantId = merchant?.id || merchant?._id;
            if (merchantId) {
                const [productsRes, categoriesRes, salesRes, usersRes] = await Promise.all([
                    getProducts(merchantId),
                    getCategories(merchantId),
                    getSales(merchantId),
                    getUsers(merchantId)
                ]);
                console.log('Products response:', productsRes.data);
                console.log('Categories response:', categoriesRes.data);
                setProducts(productsRes.data?.data || productsRes.data?.products || productsRes.data || []);
                setCategories(categoriesRes.data?.data || categoriesRes.data?.categories || categoriesRes.data || []);
                setCategories(categoriesRes.data?.data || categoriesRes.data || []);
                setSales(salesRes.data?.data || salesRes.data || []);
                setUsers(usersRes.data?.data || usersRes.data || []);
            }

            await fetchAllCarts();
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllCarts = async () => {
        try {
            const userIds = [...new Set(sales.map(sale => sale.user_id).filter(Boolean))];

            if (userIds.length === 0) {
                setCarts([]);
                return;
            }

            const cartPromises = userIds.map(userId =>
                getCart(userId).catch(() => ({ data: { data: null } }))
            );

            const cartResponses = await Promise.all(cartPromises);
            const allCarts = cartResponses
                .map(res => res.data?.data || res.data)
                .filter(cart => cart !== null);

            setCarts(Array.isArray(allCarts) ? allCarts : []);
        } catch (error) {
            console.error('Error fetching carts:', error);
            setCarts([]);
        }
    };

    // ========== CATEGORY CRUD FUNCTIONS ==========
    const openCreateCategoryModal = () => {
        setEditingCategory(null);
        setNewCategory({
            name: '',
            description: '',
            image: '',
            merchant_id: merchantData?.id || merchantData?._id || ''
        });
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
        setSuccess('');

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
                const categoryId = editingCategory.id || editingCategory._id;
                response = await updateCategory(categoryId, categoryData);
            } else {
                response = await createCategory(categoryData);
            }

            if (response.status === 200 || response.status === 201) {
                setSuccess(editingCategory ? 'Category updated successfully!' : 'Category created successfully!');
                setShowCategoryModal(false);
                await fetchAllData(merchantData);
                setTimeout(() => setSuccess(''), 3000);
            } else {
                throw new Error(response.data?.message || 'Failed to save category');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to save category');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteCategory = async (categoryId, categoryName) => {
        if (window.confirm(`Are you sure you want to delete category "${categoryName}"? This will also delete all products in this category.`)) {
            try {
                const response = await deleteCategory(categoryId);
                if (response.status === 200 || response.status === 204) {
                    setSuccess('Category deleted successfully!');
                    await fetchAllData(merchantData);
                    setTimeout(() => setSuccess(''), 3000);
                } else {
                    throw new Error('Failed to delete category');
                }
            } catch (error) {
                console.error('Error deleting category:', error);
                setError('Failed to delete category');
            }
        }
    };

    // View user details
    const viewUserDetails = async (userId) => {
        try {
            setLoading(true);
            const [ordersRes, reviewsRes, ratingsRes, likesRes] = await Promise.all([
                getUserOrders(userId).catch(() => ({ data: { data: [] } })),
                getUserReviews(userId).catch(() => ({ data: { data: [] } })),
                getUserRatings(userId).catch(() => ({ data: { data: [] } })),
                getUserLikes(userId).catch(() => ({ data: { data: [] } }))
            ]);

            const userDetails = {
                id: userId,
                orders: ordersRes.data?.data || ordersRes.data || [],
                reviews: reviewsRes.data?.data || reviewsRes.data || [],
                ratings: ratingsRes.data?.data || ratingsRes.data || [],
                likes: likesRes.data?.data || likesRes.data || []
            };

            setSelectedUser(userDetails);
            setShowUserModal(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
            setError('Failed to fetch user details');
        } finally {
            setLoading(false);
        }
    };

    // Edit user
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

    // Update user
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const userId = editingUser.id || editingUser._id;
            const response = await updateUser(userId, editUserForm);

            if (response.status === 200 || response.status === 201) {
                setSuccess('User updated successfully!');
                setShowEditModal(false);
                await fetchAllData(merchantData);
                setTimeout(() => setSuccess(''), 3000);
            } else {
                throw new Error(response.data?.message || 'Failed to update user');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to update user');
        } finally {
            setSubmitting(false);
        }
    };

    // Delete user
    const deleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await deleteUserApi(userId);
                if (response.status === 200 || response.status === 204) {
                    setSuccess('User deleted successfully!');
                    await fetchAllData(merchantData);
                    setTimeout(() => setSuccess(''), 3000);
                } else {
                    throw new Error('Failed to delete user');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('Failed to delete user');
            }
        }
    };

    const addImage = () => {
        if (imageInput && newProduct.images.length < 5) {
            setNewProduct({ ...newProduct, images: [...newProduct.images, imageInput] });
            setImageInput('');
        }
    };

    const removeImage = (index) => {
        const newImages = newProduct.images.filter((_, i) => i !== index);
        setNewProduct({ ...newProduct, images: newImages });
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess('');

        try {
            if (!newProduct.title) throw new Error('Product title is required');
            if (!newProduct.price || newProduct.price <= 0) throw new Error('Valid price is required');
            if (!newProduct.quantity || newProduct.quantity < 0) throw new Error('Valid quantity is required');
            if (!newProduct.category_id) throw new Error('Please select a category');
            if (newProduct.images.length === 0) throw new Error('At least one product image is required');

            const productData = {
                title: newProduct.title,
                descp: newProduct.descp || '',
                price: parseFloat(newProduct.price),
                quantity: parseInt(newProduct.quantity),
                images: newProduct.images,
                currency: newProduct.currency,
                min_qty: parseInt(newProduct.min_qty),
                max_qty: parseInt(newProduct.max_qty),
                discount: parseFloat(newProduct.discount) || 0,
                discount_expiration: newProduct.discount_expiration || "",
                has_refund_policy: newProduct.has_refund_policy,
                has_discount: newProduct.has_discount,
                has_shipment: newProduct.has_shipment,
                has_variation: newProduct.has_variation,
                shipping_locations: newProduct.shipping_locations,
                attrib: newProduct.attrib,
                category_id: newProduct.category_id,
                merchant_id: newProduct.merchant_id,
                brand: newProduct.brand || ""
            };

            const response = await createProduct(productData);
            if (response.status === 200 || response.status === 201) {
                setSuccess('Product created successfully!');
                setNewProduct({
                    title: '',
                    descp: '',
                    price: '',
                    quantity: '',
                    images: [],
                    category_id: '',
                    merchant_id: merchantData?.id || merchantData?._id || '',
                    currency: 'NGN',
                    brand: '',
                    min_qty: 1,
                    max_qty: 10,
                    discount: 0,
                    discount_expiration: '',
                    has_refund_policy: false,
                    has_discount: false,
                    has_shipment: true,
                    has_variation: false,
                    shipping_locations: ['Nigeria'],
                    attrib: []
                });

                await fetchAllData(merchantData);
                setTimeout(() => {
                    setActiveTab('products');
                    setSuccess('');
                }, 2000);
            } else {
                throw new Error(response.data?.message || 'Failed to create product');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to create product');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess('');

        try {
            if (!newUser.first_name) throw new Error('First name is required');
            if (!newUser.last_name) throw new Error('Last name is required');
            if (!newUser.email) throw new Error('Email is required');
            if (!newUser.phone) throw new Error('Phone number is required');
            if (!newUser.password || newUser.password.length < 6) throw new Error('Password must be at least 6 characters');

            const response = await userSignup(newUser);
            if (response.status === 200 || response.status === 201) {
                setSuccess('User created successfully!');
                setNewUser({ first_name: '', last_name: '', email: '', phone: '', password: '' });
                await fetchAllData(merchantData);
                setTimeout(() => {
                    setActiveTab('users');
                    setSuccess('');
                }, 2000);
            } else {
                throw new Error(response.data?.message || 'Failed to create user');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to create user');
        } finally {
            setSubmitting(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('merchantToken');
        localStorage.removeItem('merchantData');
        navigate('/admin/signin');
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(productId);
                await fetchAllData(merchantData);
                setSuccess('Product deleted successfully!');
                setTimeout(() => setSuccess(''), 3000);
            } catch (error) {
                setError('Failed to delete product');
            }
        }
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
        { id: 'create-product', label: 'Create product', icon: <FaPlus /> },
        { id: 'categories', label: 'Categories', icon: <FaTags /> },
        { id: 'orders', label: 'Orders', icon: <FaShoppingCart /> },
        { id: 'users', label: 'Users', icon: <FaUsers /> },
        { id: 'create-user', label: 'Create user', icon: <FaUserPlus /> },
        { id: 'cart', label: 'Cart', icon: <FaShoppingCart /> },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg"
            >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar - Blue Theme with Scroll */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white transform transition-transform duration-300 z-40 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                {/* Header - Fixed at top */}
                <div className="p-5 border-b border-blue-700 italic flex-shrink-0">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <img
                            src="https://i5.walmartimages.com/dfw/4ff9c6c9-af86/k2-_47db52a8-75b4-4c98-868a-4cf9248272c5.v1.svg"
                            alt="Walmart"
                            className="h-8 w-8"
                        />
                        Walmart Admin
                    </h1>
                    {merchantData && (
                        <p className="text-sm text-blue-200 mt-1 truncate">{merchantData.store_name}</p>
                    )}
                </div>

                {/* Scrollable Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                    {sidebarLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => { setActiveTab(link.id); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${activeTab === link.id ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'}`}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Logout Button - Fixed at bottom */}
                <div className="p-4 border-t border-blue-700 flex-shrink-0">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-blue-700 hover:text-white transition-colors"
                    >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main Content */}
            <div className="lg:ml-64 p-6">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <h2 className="text-2xl font-bold text-blue-800 italic">
                        {activeTab === 'dashboard' && 'Dashboard'}
                        {activeTab === 'products' && 'Products Management'}
                        {activeTab === 'create-product' && 'Create New Product'}
                        {activeTab === 'categories' && 'Categories Management'}
                        {activeTab === 'orders' && 'Orders Management'}
                        {activeTab === 'users' && 'Users Management'}
                        {activeTab === 'create-user' && 'Create New User'}
                        {activeTab === 'cart' && 'Cart Management'}
                    </h2>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        {success}
                    </div>
                )}

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-full text-white`}>
                                        {stat.icon}
                                    </div>
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
                                        {products.slice(0, 10).map((product, index) => (
                                            <tr key={product.id || product._id} className="border-b">
                                                <td className="py-3 text-sm">{index + 1}</td>
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
                            <h3 className="text-lg font-semibold text-blue-800 italic">All Products</h3>
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
                                            <td className="py-3"><img src={product.images?.[0]} alt={product.title} className="w-10 h-10 object-cover rounded" /></td>
                                            <td className="py-3 text-sm">{product.title?.substring(0, 40)}...</td>
                                            <td className="py-3 text-sm">${product.price}</td>
                                            <td className="py-3 text-sm">{product.quantity}</td>
                                            <td className="py-3">
                                                <div className="flex gap-2">
                                                    <button className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                                                    <button className="text-blue-800 hover:text-blue-400"><FaEdit /></button>
                                                    <button onClick={() => handleDeleteProduct(product.id || product._id)} className="text-red-700 hover:text-red-400"><FaTrash /></button>
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
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Price ($) *</label>
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
                                <p className="text-xs text-gray-500 mt-1">Maximum 5 images. Add at least one image.</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-blue-800 italic mb-1">Category *</label>
                                <select value={newProduct.category_id} onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id || cat._id} value={cat.id || cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                                {categories.length === 0 && (
                                    <p className="text-xs text-red-500 mt-1">No categories available. Please create a category first.</p>
                                )}
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

                {/* Categories Tab with Create Category */}
                {activeTab === 'categories' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-blue-800 italic">All Categories</h3>
                            <button
                                onClick={openCreateCategoryModal}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700"
                            >
                                <FaPlus /> Add Category
                            </button>
                        </div>

                        {categories.length === 0 ? (
                            <div className="text-center text-blue-800 italic py-12">
                                <FaTags className="text-5xl mx-auto mb-3 text-gray-300" />
                                <p>No categories yet.</p>
                                <p className="text-sm mt-1">Click "Add Category" to create your first category</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {categories.map((category) => (
                                    <div key={category.id || category._id} className="border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-3 flex-1">
                                            {category.image && (
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />
                                            )}
                                            <div>
                                                <span className="font-medium text-gray-800">{category.name}</span>
                                                {category.description && (
                                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{category.description}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditCategoryModal(category)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                                title="Edit Category"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category.id || category._id, category.name)}
                                                className="text-red-600 hover:text-red-800 transition-colors"
                                                title="Delete Category"
                                            >
                                                <FaTrash />
                                            </button>
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
                        <h3 className="text-lg font-semibold text-blue-800 italic mb-4">All Orders</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b">
                                    <tr className="text-left text-sm text-blue-800 italic">
                                        <th className="pb-2">Order ID</th>
                                        <th className="pb-2">Customer</th>
                                        <th className="pb-2">Amount</th>
                                        <th className="pb-2">Status</th>
                                        <th className="pb-2">Date</th>
                                        <th className="pb-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sales.map((sale) => (
                                        <tr key={sale.id || sale._id} className="border-b">
                                            <td className="py-3 text-sm">#{sale.id || sale._id}</td>
                                            <td className="py-3 text-sm">{sale.customer_name || 'N/A'}</td>
                                            <td className="py-3 text-sm">${sale.amount}</td>
                                            <td className="py-3">
                                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                                    {sale.status || 'Completed'}
                                                </span>
                                            </td>
                                            <td className="py-3 text-sm">{sale.created_at ? new Date(sale.created_at).toLocaleDateString() : 'N/A'}</td>
                                            <td className="py-3">
                                                <button className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                                            </td>
                                        </tr>
                                    ))}
                                    {sales.length === 0 && (
                                        <tr><td colSpan="6" className="py-6 text-center text-blue-800 italic">No orders yet</td></tr>
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
                            <h3 className="text-lg font-semibold text-blue-800 italic">Users</h3>
                            <button onClick={() => setActiveTab('create-user')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
                                <FaPlus /> Add New User
                            </button>
                        </div>
                        <div className="mb-4 relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-800" />
                            <input
                                type="text"
                                placeholder="Search users by name, email or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-blue-800 italic rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        <th className="pb-2">ROLE</th>
                                        <th className="pb-2">CREATED</th>
                                        <th className="pb-2">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users
                                            .filter(user =>
                                                user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                user.phone?.includes(searchTerm)
                                            )
                                            .map((user, index) => (
                                                <tr key={user.id || user._id} className="border-b hover:bg-gray-50">
                                                    <td className="py-3 text-sm">{index + 1}</td>
                                                    <td className="py-3 text-sm">{user.first_name} {user.last_name}</td>
                                                    <td className="py-3 text-sm">{user.email}</td>
                                                    <td className="py-3 text-sm">{user.phone || 'N/A'}</td>
                                                    <td className="py-3 text-sm">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                                            {user.role || 'user'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 text-sm">
                                                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => viewUserDetails(user.id || user._id)}
                                                                className="text-blue-600 hover:text-blue-800"
                                                                title="View Details"
                                                            >
                                                                <FaEye />
                                                            </button>
                                                            <button
                                                                onClick={() => editUser(user)}
                                                                className="text-green-600 hover:text-green-800"
                                                                title="Edit User"
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                            <button
                                                                onClick={() => deleteUser(user.id || user._id)}
                                                                className="text-red-600 hover:text-red-800"
                                                                title="Delete User"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="py-12 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <FaUsers className="text-gray-300 text-5xl mb-3" />
                                                    <p className="text-blue-800 italic">No users found</p>
                                                    <p className="text-blue-800 italic text-sm mt-1">Click "Add New User" to create your first user</p>
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
                                    <input
                                        type="text"
                                        value={newUser.first_name}
                                        onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                                        placeholder="e.g., John"
                                        className="w-full border border-gray-300 text-blue-800 italic rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">Last Name *</label>
                                    <input
                                        type="text"
                                        value={newUser.last_name}
                                        onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                                        placeholder="e.g., Doe"
                                        className="w-full border border-gray-300 text-blue-800 italic rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-blue-800 italic mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    placeholder="user@example.com"
                                    className="w-full border border-gray-300 text-blue-800 italic rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-blue-800 italic mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    value={newUser.phone}
                                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                                    placeholder="+234 801 234 5678"
                                    className="w-full border border-gray-300 text-blue-800 italic rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-blue-800 italic mb-1">Password *</label>
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    placeholder="Minimum 6 characters"
                                    className="w-full border border-gray-300 text-blue-800 italic rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {submitting ? 'Creating...' : 'Create User'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('users')}
                                    className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Cart Tab */}
                {activeTab === 'cart' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-blue-800 italic mb-4">Cart Management</h3>

                        {loading ? (
                            <div className="text-center py-8">Loading carts...</div>
                        ) : (
                            <>
                                {(() => {
                                    const cartsArray = Array.isArray(carts) ? carts : [];
                                    const totalItems = cartsArray.reduce((sum, cart) => sum + (cart?.items?.length || 0), 0);
                                    const totalValue = cartsArray.reduce((sum, cart) => sum + (parseFloat(cart?.total) || 0), 0);
                                    const uniqueUsers = new Set(cartsArray.map(cart => cart?.user_id).filter(Boolean)).size;

                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                            <div className="bg-blue-50 rounded-lg p-4 text-center">
                                                <p className="text-2xl font-bold text-blue-600">{cartsArray.length}</p>
                                                <p className="text-sm text-blue-800 italic">Active Carts</p>
                                            </div>
                                            <div className="bg-green-50 rounded-lg p-4 text-center">
                                                <p className="text-2xl font-bold text-green-600">{totalItems}</p>
                                                <p className="text-sm text-blue-800 italic">Total Items</p>
                                            </div>
                                            <div className="bg-purple-50 rounded-lg p-4 text-center">
                                                <p className="text-2xl font-bold text-purple-600">${totalValue.toLocaleString()}</p>
                                                <p className="text-sm text-blue-800 italic">Cart Value</p>
                                            </div>
                                            <div className="bg-yellow-50 rounded-lg p-4 text-center">
                                                <p className="text-2xl font-bold text-yellow-600">{uniqueUsers}</p>
                                                <p className="text-sm text-blue-800 italic">Unique Users</p>
                                            </div>
                                        </div>
                                    );
                                })()}

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="border-b">
                                            <tr className="text-left text-sm text-blue-800 italic">
                                                <th className="pb-2">USER ID</th>
                                                <th className="pb-2">ITEMS</th>
                                                <th className="pb-2">TOTAL</th>
                                                <th className="pb-2">PRODUCTS</th>
                                                <th className="pb-2">UPDATED</th>
                                                <th className="pb-2">ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(() => {
                                                const cartsArray = Array.isArray(carts) ? carts : [];
                                                if (cartsArray.length > 0) {
                                                    return cartsArray.map((cart) => (
                                                        <tr key={cart?.id || cart?._id || Math.random()} className="border-b hover:bg-gray-50">
                                                            <td className="py-3 text-sm font-mono">{cart?.user_id || 'N/A'}</td>
                                                            <td className="py-3 text-sm">
                                                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                                                    {cart?.items?.length || 0} items
                                                                </span>
                                                            </td>
                                                            <td className="py-3 text-sm font-semibold">
                                                                ${(parseFloat(cart?.total) || 0).toLocaleString()}
                                                            </td>
                                                            <td className="py-3 text-sm">
                                                                {cart?.items?.slice(0, 2).map((item, idx) => (
                                                                    <div key={idx} className="text-xs text-gray-600">
                                                                        {item?.product_id?.substring(0, 10)}... (x{item?.quantity || 1})
                                                                    </div>
                                                                ))}
                                                                {cart?.items?.length > 2 && (
                                                                    <span className="text-xs text-gray-400">+{cart.items.length - 2} more</span>
                                                                )}
                                                                {(!cart?.items || cart?.items?.length === 0) && 'Empty cart'}
                                                            </td>
                                                            <td className="py-3 text-sm">
                                                                {cart?.updated_at ? new Date(cart.updated_at).toLocaleString() :
                                                                    cart?.created_at ? new Date(cart.created_at).toLocaleString() : 'N/A'}
                                                            </td>
                                                            <td className="py-3">
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={() => {/* View cart details */ }}
                                                                        className="text-blue-600 hover:text-blue-800"
                                                                        title="View Cart"
                                                                    >
                                                                        <FaEye />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ));
                                                } else {
                                                    return (
                                                        <tr>
                                                            <td colSpan="6" className="py-12 text-center">
                                                                <div className="flex flex-col items-center justify-center">
                                                                    <FaShoppingCart className="text-blue-800 italic text-5xl mb-3" />
                                                                    <p className="text-blue-800 italic">No active carts found</p>
                                                                    <p className="text-blue-800 italic text-sm mt-1">Carts will appear here when users add items</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            })()}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* User Details Modal */}
            {showUserModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">User Details</h3>
                                <button onClick={() => setShowUserModal(false)} className="text-gray-500 hover:text-gray-700">
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Orders ({selectedUser.orders?.length || 0})</h4>
                                    {selectedUser.orders?.length > 0 ? (
                                        <div className="bg-gray-50 p-3 rounded max-h-40 overflow-y-auto">
                                            {selectedUser.orders.map((order, idx) => (
                                                <div key={idx} className="text-sm py-1 border-b">Order #{order.id} - ${order.amount}</div>
                                            ))}
                                        </div>
                                    ) : <p className="text-gray-500 text-sm">No orders yet</p>}
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Reviews ({selectedUser.reviews?.length || 0})</h4>
                                    {selectedUser.reviews?.length > 0 ? (
                                        <div className="bg-gray-50 p-3 rounded max-h-40 overflow-y-auto">
                                            {selectedUser.reviews.map((review, idx) => (
                                                <div key={idx} className="text-sm py-1 border-b">{review.comment}</div>
                                            ))}
                                        </div>
                                    ) : <p className="text-gray-500 text-sm">No reviews yet</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Edit User</h3>
                                <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                                    <FaTimes />
                                </button>
                            </div>

                            <form onSubmit={handleUpdateUser}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        value={editUserForm.first_name}
                                        onChange={(e) => setEditUserForm({ ...editUserForm, first_name: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        value={editUserForm.last_name}
                                        onChange={(e) => setEditUserForm({ ...editUserForm, last_name: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editUserForm.email}
                                        onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        value={editUserForm.phone}
                                        onChange={(e) => setEditUserForm({ ...editUserForm, phone: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <select
                                        value={editUserForm.role}
                                        onChange={(e) => setEditUserForm({ ...editUserForm, role: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {submitting ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Category Modal - Create/Edit Category */}
            {showCategoryModal && (
                <div className="fixed inset-0  bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-blue-800 italic">
                                    {editingCategory ? 'Edit Category' : 'Create New Category'}
                                </h3>
                                <button
                                    onClick={() => setShowCategoryModal(false)}
                                    className="text-blue-800 italic hover:text-blue-500"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <form onSubmit={handleSaveCategory}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">
                                        Category Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        placeholder="e.g., Fashion, Electronics, Toys"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        rows="3"
                                        value={newCategory.description}
                                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                        placeholder="Brief description of the category"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-blue-800 italic mb-1">
                                        Category Image URL
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={categoryImageInput}
                                            onChange={(e) => setCategoryImageInput(e.target.value)}
                                            placeholder="Enter image URL"
                                            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (categoryImageInput) {
                                                    setNewCategory({ ...newCategory, image: categoryImageInput });
                                                    setCategoryImageInput('');
                                                }
                                            }}
                                            className="bg-gray-200 px-4 rounded-lg hover:bg-gray-300"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    {newCategory.image && (
                                        <div className="mt-2 relative inline-block">
                                            <img
                                                src={newCategory.image}
                                                alt="Category preview"
                                                className="w-20 h-20 object-cover rounded border"
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setNewCategory({ ...newCategory, image: '' })}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                    <p className="text-xs text-gray-500 mt-1">Add an image URL for the category icon</p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {submitting ? 'Saving...' : (editingCategory ? 'Update Category' : 'Create Category')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowCategoryModal(false)}
                                        className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
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