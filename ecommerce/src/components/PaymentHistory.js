import { useEffect, useState } from "react"
import { authApis } from "../configs/Apis";
import { Navigate, useNavigate } from 'react-router-dom';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPaymentHistory();
    }, []);

    const fetchPaymentHistory = async() => {
        try {
            setLoading(true);
            const res = await authApis().get('/api/payments/user/history');

            setPayments(res.data);
        } catch(error){
            console.error('Lỗi rồi', error)
            if (error.response?.status === 401) {
                Navigate('/login')
            }else{
                setError('Lỗi')
            }
        } finally{
            setLoading(false)
        }
    };

    return (
        <div className="container mx-auto p-4 ">
            <h2 className="text-2xl font-bold mb-4  " >Lịch sử thanh toán</h2>
            {payments.length === 0 ? (
                <p>Chưa có lịch sử thanh toán nào</p>
            ) : (
                <div className="space-y-4 bg-dark" >
                    {payments.map((payment) => (
                        <div key={payment.id} className="border rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-start" >
                                <div>
                                    <h3 className="font-semibold text-primary ">Mã đơn hàng: {payment.orderCode}</h3>
                                    <p className="text-gray-600 text-success">Số tiền: {payment.amount?.toLocaleString('vi-VN')} VNĐ</p>
                                    <p className="text-gray-600 text-warning">Ngày tạo: {new Date(payment.createdDate).toLocaleDateString('vi-VN')}</p>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    
};

export default PaymentHistory;