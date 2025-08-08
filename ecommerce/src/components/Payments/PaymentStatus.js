import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Spinner, Card, Badge } from 'react-bootstrap';
import { PaymentService } from '../../services/PaymentService';

const PaymentStatus = ({ orderId, onStatusChange }) => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const checkPaymentStatus = useCallback(async () => {
        try {
            setLoading(true);
            const result = await PaymentService.checkPaymentStatus(orderId);
            setStatus(result);
            
            if (onStatusChange) {
                onStatusChange(result);
            }
        } catch (error) {
            setError('Không thể kiểm tra trạng thái thanh toán');
        } finally {
            setLoading(false);
        }
    }, [orderId, onStatusChange]);

    useEffect(() => {
        checkPaymentStatus();
    }, [checkPaymentStatus]); 

   

    const getStatusBadge = (paymentStatus) => {
        switch (paymentStatus) {
            case 'SUCCESS':
                return <Badge bg="success">Thành công</Badge>;
            case 'PENDING':
                return <Badge bg="warning">Đang xử lý</Badge>;
            case 'FAILED':
                return <Badge bg="danger">Thất bại</Badge>;
            default:
                return <Badge bg="secondary">Không xác định</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="text-center p-4">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-2">Đang kiểm tra trạng thái thanh toán</p>
            </div>
        );
        
    }




    if (error) {
        return (
            <Alert variant="danger">
                {error}
            </Alert>
        );

    }

    if (!status || status.status === 'NOT_FOUND') {
        return (
            <Alert variant="warning">
                Không tìm thấy thông tin thanh toán cho đơn hàng này nhé bro!
            </Alert>
        );
    }



    return (
        <Card>
            <Card.Header>
                <h5>Trạng thái thanh toán</h5>
            </Card.Header>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>Mã đơn hàng:</span>
                    <strong>{orderId}</strong>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>Trạng thái:</span>
                    {getStatusBadge(status.paymentStatus)}
                </div>
                
                {status.amount && (
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Số tiền:</span>
                        <strong className="text-danger">
                            {status.amount.toLocaleString('vi-VN')} VNĐ
                        </strong>
                    </div>
                )}
                



                {status.type && (
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Phương thức:</span>
                        <strong>{status.type}</strong>
                    </div>
                )}
                
                {status.createdDate && (
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Ngày tạo:</span>
                        <strong>{new Date(status.createdDate).toLocaleString('vi-VN')}</strong>
                    </div>
                )}


            </Card.Body>



        </Card>
    );
};

export default PaymentStatus;