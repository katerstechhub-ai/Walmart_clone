export const getMerchantId = () => {
    try {
        const merchantData = localStorage.getItem('merchantData');
        if (!merchantData) return null;
        const parsed = JSON.parse(merchantData);
        return parsed.id || parsed._id;
    } catch (error) {
        console.error('Error getting merchant ID:', error);
        return null;
    }
};