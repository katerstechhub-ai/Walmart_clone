import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../api';

export const useProducts = (merchantId, categoryName = null) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    // First, get category ID if category name is provided
    useEffect(() => {
        const fetchCategoryId = async () => {
            if (!categoryName || !merchantId) return;

            try {
                const response = await getCategories(merchantId);
                const categories = response.data?.data || response.data || [];
                const foundCategory = categories.find(
                    cat => cat.name?.toLowerCase() === categoryName.toLowerCase()
                );
                if (foundCategory) {
                    setCategoryId(foundCategory.id || foundCategory._id);
                }
            } catch (err) {
                console.error(`Error finding category ${categoryName}:`, err);
            }
        };

        fetchCategoryId();
    }, [categoryName, merchantId]);

    // Fetch products based on category ID
    useEffect(() => {
        const fetchProducts = async () => {
            if (!merchantId) return;

            setLoading(true);
            try {
                let response;
                if (categoryId) {
                    response = await getProducts(merchantId, categoryId);
                } else if (categoryName === null) {
                    // Fetch all products if no category specified
                    response = await getProducts(merchantId);
                } else {
                    setProducts([]);
                    setLoading(false);
                    return;
                }

                const productsData = response.data?.data || response.data || [];
                setProducts(Array.isArray(productsData) ? productsData : []);
                setError(null);
            } catch (err) {
                console.error(`Error fetching products for ${categoryName}:`, err);
                setError(err.message);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [merchantId, categoryId, categoryName]);

    return { products, loading, error };
};