import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { Link, useNavigate } from 'react-router-dom';
import { FaTruck, FaUndo, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaTrash, FaRegHeart } from 'react-icons/fa';
import AddYourEssentialsSection from '../Components/AddYourEssentialsSection';
import CartFooter from '../Components/CartFooter';
import { getCart, updateCart, deleteCartItem, checkoutCart } from '../api';

const CartPage = () => {
    const navigate = useNavigate();
    const [isPickupOpen, setIsPickupOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingItemId, setUpdatingItemId] = useState(null);
    const [error, setError] = useState('');
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const getUserId = () => {
        try {
            const userData = localStorage.getItem('walmart_user');
            if (userData) {
                const parsed = JSON.parse(userData);
                return parsed.id || parsed._id;
            }
            return null;
        } catch {
            return null;
        }
    };

    const userId = getUserId();

    const getCartExtras = () => {
        return JSON.parse(localStorage.getItem('cartExtras') || '{}');
    };

    const fetchCart = async () => {
        if (!userId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await getCart(userId);
            console.log('API Response:', response.data);
            
            let items = [];
            const data = response.data?.data || response.data;
            const extras = getCartExtras();

            if (data && Array.isArray(data)) {
                data.forEach(cartItem => {
                    const quantity = cartItem.quantity || 1;
                    
                    if (cartItem.products && Array.isArray(cartItem.products)) {
                        cartItem.products.forEach(product => {
                            const productId = product.id || product._id;
                            const extra = extras[productId] || {};

                            items.push({
                                id: cartItem.id,
                                product_id: productId,
                                title: extra.name || product.title || 'Product',
                                price: extra.price || parseFloat(product.price) || 0,
                                quantity: quantity,
                                image: extra.image || product.images?.[0] || "https://i5.walmartimages.com/seo/Nee-Doh-Swirlin-Usa-Nice-Cube-1-pc_b287ed30-90ea-4652-b8cd-78c77a3c5e6d.690357663a2a4b81b43280b02c2a6503.png",
                                size: extra.size || 'OS',
                                color: extra.color || '',
                            });
                        });
                    } else if (cartItem.product_id) {
                        const productId = cartItem.product_id;
                        const extra = extras[productId] || {};
                        
                        items.push({
                            id: cartItem.id,
                            product_id: productId,
                            title: extra.name || cartItem.title || 'Product',
                            price: extra.price || parseFloat(cartItem.price) || 0,
                            quantity: quantity,
                            image: extra.image || cartItem.image || "https://i5.walmartimages.com/seo/Nee-Doh-Swirlin-Usa-Nice-Cube-1-pc_b287ed30-90ea-4652-b8cd-78c77a3c5e6d.690357663a2a4b81b43280b02c2a6503.png",
                            size: extra.size || 'OS',
                            color: extra.color || '',
                        });
                    }
                });
            }
            
            console.log('Raw items from API:', items);
            
            // Merge items by product_id only
            const mergedMap = new Map();
            items.forEach(item => {
                const key = item.product_id;
                if (mergedMap.has(key)) {
                    const existing = mergedMap.get(key);
                    existing.quantity += item.quantity;
                    mergedMap.set(key, existing);
                } else {
                    mergedMap.set(key, { ...item });
                }
            });
            
            const mergedItems = Array.from(mergedMap.values());
            console.log('Merged items:', mergedItems);
            
            setCartItems(mergedItems);
        } catch (err) {
            console.error('Error fetching cart:', err);
            setError('Failed to load cart');
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };

    // Fix quantities that are incorrect (reset to proper values)
    const fixQuantities = async () => {
        if (!userId) return;
        
        let hasChanges = false;
        
        for (const item of cartItems) {
            // If quantity is greater than 1 for a single item, we need to check if it should be
            // For now, we'll assume quantities should be what the user set, not what API returns
            // This is a safety net
            if (item.quantity > 10) {
                console.log(`Fixing abnormal quantity for ${item.title} from ${item.quantity} to 1`);
                try {
                    const payload = {
                        user_id: userId,
                        product_id: item.product_id,
                        quantity: 1,
                        has_variation: false
                    };
                    await updateCart(payload);
                    hasChanges = true;
                } catch (err) {
                    console.error('Error fixing quantity:', err);
                }
            }
        }
        
        if (hasChanges) {
            await fetchCart();
            showToast('Quantities have been corrected', 'info');
        }
    };

    useEffect(() => {
        if (userId) {
            fetchCart();
        } else {
            setLoading(false);
        }
    }, [userId]);

    // Fix quantities after cart loads
    useEffect(() => {
        if (!loading && cartItems.length > 0) {
            fixQuantities();
        }
    }, [loading, cartItems]);

    const updateQuantity = async (productId, newQuantity) => {
        if (!userId) return;
        if (newQuantity < 1) return;
        
        setUpdatingItemId(productId);
        try {
            const payload = {
                user_id: userId,
                product_id: productId,
                quantity: newQuantity,
                has_variation: false
            };

            await updateCart(payload);
            
            // Update local state immediately for smooth UI
            setCartItems(prevItems => 
                prevItems.map(item => 
                    item.product_id === productId 
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
            
            window.dispatchEvent(new Event('cartUpdated'));
            showToast('Quantity updated', 'success');
            
        } catch (err) {
            console.error('Error updating quantity:', err);
            showToast('Failed to update quantity', 'error');
        } finally {
            setUpdatingItemId(null);
        }
    };

    const handleRemoveItem = async (productId) => {
        if (!userId) return;
        
        try {
            await deleteCartItem({ user_id: userId, product_id: productId });
            const extras = getCartExtras();
            delete extras[productId];
            localStorage.setItem('cartExtras', JSON.stringify(extras));
            setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
            showToast('Item removed from cart', 'success');
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (err) {
            console.error('Error removing item:', err);
            showToast('Failed to remove item', 'error');
        }
    };

    const handleCheckout = async () => {
        if (!userId) {
            showToast('Please sign in to checkout', 'error');
            navigate('/signin');
            return;
        }
        
        setCheckoutLoading(true);
        try {
            const response = await checkoutCart({ user_id: userId });
            if (response.status === 200 || response.status === 201) {
                localStorage.removeItem('cartExtras');
                setCartItems([]);
                showToast('Order placed successfully!', 'success');
                window.dispatchEvent(new Event('cartUpdated'));
                setTimeout(() => navigate('/orders'), 1500);
            } else {
                throw new Error('Checkout failed');
            }
        } catch (err) {
            console.error('Error during checkout:', err);
            showToast('Failed to process checkout', 'error');
        } finally {
            setCheckoutLoading(false);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navigation />
                <div className="flex justify-center items-center flex-grow">
                    <div className="animate-pulse text-gray-400">Loading cart...</div>
                </div>
                <CartFooter />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            {toast && (
                <div className="fixed top-20 right-4 z-50 animate-slide-in">
                    <div className={`${toast.type === 'success' ? 'bg-black' : 'bg-red-600'} text-white px-6 py-3 rounded-lg shadow-lg`}>
                        {toast.message}
                    </div>
                </div>
            )}

            <div className="w-full mx-auto px-5 py-8 flex-grow">
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {!userId && (
                    <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                        Please <Link to="/signin" className="underline font-semibold">sign in</Link> to view your cart
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                        </h1>

                        {cartItems.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                                <img
                                    src="https://i5.walmartimages.com/dfw/63fd9f59-3023/b0689b83-9f3a-46e7-ba79-83da819aeec2/v1/empty-cart.svg"
                                    alt="Empty cart"
                                    className="w-40 h-40 mx-auto mb-4"
                                />
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                                <p className="text-gray-500 mb-4">Add items to get started</p>
                                <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            cartItems.map((item) => {
                                const itemPrice = item.price || 0;
                                const itemQuantity = item.quantity || 1;
                                const itemId = item.product_id;
                                const isUpdating = updatingItemId === itemId;
                                
                                return (
                                    <div key={itemId} className="shadow-lg rounded-lg overflow-hidden mb-4">
                                        <div className="bg-blue-50 p-4 flex items-center gap-2">
                                            <img src="https://i5.walmartimages.com/dfw/63fd9f59-1b5e/5452ae02-a31f-4ef1-9a45-62ac0b06c13b/v1/mci-shipping.svg" alt="shipping" className="h-8" />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-800">Free shipping</span>
                                                <Link to="/change-zip" className="text-xs text-black underline">95829</Link>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <div className="flex gap-4">
                                                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                                                
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h3>
                                                    {item.size && item.size !== 'OS' && (
                                                        <p className="text-xs text-gray-600">Size: {item.size}</p>
                                                    )}
                                                    {item.color && (
                                                        <p className="text-xs text-gray-600">Color: {item.color}</p>
                                                    )}
                                                    <div className="flex items-center gap-1 mt-2">
                                                        <FaUndo className="text-gray-500 text-xs" />
                                                        <span className="text-xs text-gray-600">Free 30-day returns</span>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-gray-800">${(itemPrice * itemQuantity).toFixed(2)}</p>
                                                    <div className="flex items-center rounded-full border mt-2">
                                                        <button
                                                            onClick={() => updateQuantity(itemId, itemQuantity - 1)}
                                                            disabled={isUpdating || itemQuantity <= 1}
                                                            className="w-8 h-7 text-lg font-bold disabled:opacity-50"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center text-sm">{itemQuantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(itemId, itemQuantity + 1)}
                                                            disabled={isUpdating}
                                                            className="w-8 h-7 text-lg font-bold disabled:opacity-50"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(itemId)}
                                                        className="text-xs text-red-500 mt-2 hover:underline block"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}

                        <AddYourEssentialsSection />
                    </div>

                    {cartItems.length > 0 && (
                        <div className="lg:w-1/3">
                            <div className="sticky shadow-2xl rounded-lg p-6 top-20 bg-white">
                                <button
                                    onClick={handleCheckout}
                                    disabled={checkoutLoading}
                                    className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors mb-4 disabled:opacity-50"
                                >
                                    {checkoutLoading ? 'Processing...' : 'Continue to checkout'}
                                </button>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                                        <span className="text-gray-800 font-semibold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Taxes</span>
                                        <span className="text-gray-600">Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between mt-4 pt-4 border-t">
                                        <span className="text-lg font-bold text-gray-800">Estimated total</span>
                                        <span className="text-lg font-bold text-gray-800">${subtotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <CartFooter />

            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slide-in { animation: slideIn 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default CartPage;