import axios from 'axios';

const BASE_URL = 'http://ecommerce.reworkstaging.name.ng/v2';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('merchantToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ========== MERCHANT (ADMIN) API ==========

// Merchant Sign Up
export const merchantSignup = (data) => api.post('/merchants', data);

// Merchant Login
export const merchantLogin = (data) => api.post('/merchants/login', data);

// Update Merchant
export const updateMerchant = (merchantId, data) => api.put(`/merchants/${merchantId}`, data);

// Change Merchant Password
export const changeMerchantPassword = (merchantId, data) => api.put(`/merchants/${merchantId}/change-passwd`, data);

// ========== CATEGORY API ==========

// Get Categories
export const getCategories = (merchantId) => api.get(`/categories?merchant_id=${merchantId}`);

// Create Category
export const createCategory = (data) => api.post('/categories', data);

// Update Category
export const updateCategory = (categoryId, data) => api.put(`/categories/${categoryId}`, data);

// Delete Category
export const deleteCategory = (categoryId) => api.delete(`/categories/${categoryId}`);

// ========== PRODUCT API ==========



// Get Single Product
export const getProduct = (productId) => api.get(`/products/${productId}`);

// Create Product (without variation)
export const createProduct = (data) => api.post('/products', data);

// Update Product
export const updateProduct = (productId, data) => api.put(`/products/${productId}`, data);

// Delete Product
export const deleteProduct = (productId) => api.delete(`/products/${productId}`);

// ========== SALES/ORDERS API ==========

// Get Sales
export const getSales = (merchantId) => api.get(`/sales?merchant_id=${merchantId}`);

// ========== USER API ==========

// User Sign Up
export const userSignup = (data) => api.post('/users', data);

// User Login
export const userLogin = (data) => api.post('/users/login');



// Change User Password
export const changeUserPassword = (userId, data) => api.put(`/users/${userId}/change-passwd`, data);

// Get User Orders
export const getUserOrders = (userId) => api.get(`/users/orders?user_id=${userId}`);

// Get User Reviews
export const getUserReviews = (userId) => api.get(`/users/reviews?user_id=${userId}`);

// Get User Ratings
export const getUserRatings = (userId) => api.get(`/users/ratings?user_id=${userId}`);

// Get User Likes
export const getUserLikes = (userId) => api.get(`/users/likes?user_id=${userId}`);

// ========== CART API ==========



// Add to Cart (with variation)
export const addToCartWithVariation = (data) => api.post('/carts', data);

// Add to Cart (without variation)
export const addToCart = (data) => api.post('/carts', data);

// Add Note to Cart
export const addCartNote = (data) => api.post('/carts/set-note', data);

// Checkout
export const checkout = (data) => api.post('/carts/checkout', data);

// Delete Cart Item
export const deleteCartItem = (data) => api.delete('/carts', { data });

// ========== REVIEW API ==========

// Get Product Reviews
export const getProductReviews = (productId) => api.get(`/reviews?product_id=${productId}`);

// Create Review
export const createReview = (data) => api.post('/reviews', data);

// Update Review
export const updateReview = (reviewId, data) => api.put(`/reviews/${reviewId}`, data);

// Delete Review
export const deleteReview = (data) => api.delete('/reviews', { data });

// ========== RATING API ==========

// Get Product Ratings
export const getProductRatings = (productId) => api.get(`/ratings?product_id=${productId}`);

// Create Rating
export const createRating = (data) => api.post('/ratings', data);

// Update Rating
export const updateRating = (data) => api.put('/ratings', data);

// Delete Rating
export const deleteRating = (data) => api.delete('/ratings', { data });

// ========== LIKE API ==========

// Get Product Likes
export const getProductLikes = (productId) => api.get(`/likes?product_id=${productId}`);

// Create Like
export const createLike = (data) => api.post('/likes', data);

// Delete Like
export const deleteLike = (data) => api.delete('/likes', { data });
// Add to your api.js file:

// Get all users
export const getUsers = (merchantId) => api.get(`/users?merchant_id=${merchantId}`);

// Update user
export const updateUser = (userId, data) => api.put(`/users/${userId}`, data);

// Delete user
export const deleteUser = (userId) => api.delete(`/users/${userId}`);

// Add these to your existing api.js file

// ========== CART API ==========

// Make sure your getCart function in api.js looks like this:
export const getCart = (userId) => api.get(`/carts?user_id=${userId}`);

// Update cart (add/update item) - with or without variation
export const updateCart = (data) => api.post('/carts', data);
// Update the getProducts function in your api.js file:
export const getProducts = (merchantId, categoryId = null, page = 1, limit = 100) => {
    let url = `/products?merchant_id=${merchantId}&page=${page}&limit=${limit}`;
    if (categoryId) {
        url += `&category_id=${categoryId}`;
    }
    return api.get(url);
};



// Checkout cart
export const checkoutCart = (data) => api.post('/carts/checkout', data);



export default api;