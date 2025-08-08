import React, { useState } from 'react';

import { PaymentService } from '../../services/PaymentService';
import { Alert, Button, Modal, Spinner } from 'react-bootstrap';

const PaymentForm = ({ orderData, onPaymentSuccess, onPaymentError }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleVNPayPayment = async () => {
    setLoading(true);
    setError('');

    try {
        const paymentData = {
            orderId: orderData.orderId,
            
            amount: Number(orderData.totalAmount || 0),
            orderInfo: `Thanh toan don hang ${orderData.orderId}`,
            orderType: 'other',
            locale: 'vn',
            returnUrl: `${window.location.origin}/payment/callback`,
            ipnUrl: 'http://localhost:8080/EcommercePlatformWeb/api/payments/vnpay/ipn',
            
            items: (orderData.items || []).map(i => ({
                productId: i.id,
                quantity: i.quantity
            })),
        };

        console.log('Creating payment with data:', paymentData);
        console.log('orderData:', orderData);

        const response = await PaymentService.createVNPayPayment(paymentData);

        if (response.status === 'SUCCESS' && response.paymentUrl) {
            window.location.href = response.paymentUrl;
        } else {
            setError(response.message || 'Tạo thanh toán thất bại');
        }
    } catch (e) {
        console.error('Payment error details:', e.response?.data);
        setError(e.response?.data?.message || e.message || 'Không thể kết nối server thanh toán');
        console.error('Payment error:', e);
    } finally {
        setLoading(false);
    }
};

  

    return (
        <>
            <div className="payment-form">
                <h4>Chọn phương thức thanh toán</h4>
                
                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}

                <div className="payment-methods">
                    <div className="payment-method-item">
                        <Button
                            variant="outline-primary"
                            size="lg"
                            onClick={handleVNPayPayment}
                            disabled={loading}
                            className="w-100 mb-3"
                        >
                            {loading ? (
                                <div>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Đang xử lý...
                                </div>
                            ) : (
                                <>
                                    <img 
                                        src="../src/Payments/vnnpay-logo.png" 
                                        alt="Thanh toán qua VNPay" 
                                        //style={{ width: '30px', marginRight: '10px' }}
                                    />
                                    
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="payment-summary mt-4">
                        <h5>Thông tin đơn hàng</h5>
                        <div className="d-flex justify-content-between">
                            <span>Mã đơn hàng:</span>
                            <strong>{orderData.orderId}</strong>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Tổng tiền:</span>
                            <strong className="text-danger">
                                {orderData.totalAmount?.toLocaleString('vi-VN')} VNĐ
                            </strong>
                        </div>
                    </div>
                </div>
            </div>

            
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thanh toán thành công!</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <p>Đơn hàng của bạn đã được thanh toán thành công.</p>
                    <p>Mã đơn hàng: <strong>{orderData.orderId}</strong></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>


            </Modal>
        </>
    );
};

export default PaymentForm;