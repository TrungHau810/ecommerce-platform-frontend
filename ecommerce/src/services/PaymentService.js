import axios, { authApis }  from '../configs/Apis';


export const PaymentService = {

    createVNPayPayment: async (paymentData) => {
        // try{
        //     const res = await axios.post('/api/payments/vnpay/create', paymentData);
        //     return res.data;
        // } catch(error){
        //     console.error('Lỗi: ', error)
        //     throw error
        // }


        //sẽ xoá
        try {
            console.log('=== FRONTEND DEBUG: Sending request ===');
            console.log('URL:', '/api/payments/vnpay/create');
            console.log('Data:', paymentData);
            
            // Dùng authApis() để tự động gửi token
            const res = await authApis().post('/api/payments/vnpay/create', paymentData);
            
            console.log('=== FRONTEND DEBUG: Response received ===');
            console.log('Response:', res.data);
            
            return res.data;
        } catch (error) {
            console.log('Lỗi: ', error);
            throw error;
        }
    },

      checkPaymentStatus: async (orderId) => {
        try {
            const response = await axios.get(`/api/payments/vnpay/status/${orderId}`);
            return response.data;
        } catch (error) {
            console.error('Eeror rồi', error);
            throw error;
        }
    },

    verifyPayment: async (orderId) => {
        try {
            const response = await axios.post('/api/payments/vnpay/verify', { orderId });
            return response.data;
        } catch (error) {
            console.error('Quá trời', error);
            throw error;
        }
    },
    
    getPaymentHistory: async () => {
        try {
            const response = await axios.get('/api/payments/history');
            return response.data;
        } catch (error) {
            console.error('Lỗi vvv:', error);
            throw error;
        }
    },

    confirmVNPayReturn: async (paramsObj) => {
    
        const res = await axios.get('/api/payments/vnpay/return', { params: paramsObj });
        return res.data; 
    },
}