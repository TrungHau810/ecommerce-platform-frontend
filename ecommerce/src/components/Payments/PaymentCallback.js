import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Alert, Spinner, Button } from "react-bootstrap";
import { PaymentService } from "../../services/PaymentService";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  const handlePaymentCallback = useCallback(async () => {
    setLoading(true);
    try {
     
      const vnpResponseCode = searchParams.get("vnp_ResponseCode");
      const vnpTxnRef = searchParams.get("vnp_TxnRef");
      const vnpAmount = searchParams.get("vnp_Amount");

      
      const paramsObj = Object.fromEntries([...searchParams.entries()]);

      const backendResult = await PaymentService.confirmVNPayReturn(paramsObj);
    

      setResult({
        orderId: vnpTxnRef,
        responseCode: vnpResponseCode,
        amount: vnpAmount,
        backendStatus: backendResult?.status, 
      });

    } catch (err) {
      console.error("Lỗi payment callback:", err);
      setResult({
        orderId: null,
        responseCode: "ERR",
        amount: null,
        backendStatus: "ERROR",
      });
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    handlePaymentCallback();
  }, [handlePaymentCallback]);

  const getPaymentStatus = () => {
    if (!result) return "UNKNOWN";
    
    if (result.backendStatus) return result.backendStatus.toUpperCase();
    
    const rc = result.responseCode;
    if (rc === "00") return "SUCCESS";
    if (rc === "24") return "CANCELLED";
    return "FAILED";
  };

  const getStatusMessage = () => {
    const s = getPaymentStatus();
    if (s === "SUCCESS") return "Thanh toán thành công!";
    if (s === "CANCELLED") return "Thanh toán đã bị hủy";
    if (s === "FAILED") return "Thanh toán thất bại";

    if (s === "ERROR") return "Có lỗi khi xác thực thanh toán";
    return "Trạng thái thanh toán không xác định";
  };

  const getStatusVariant = () => {
      const s = getPaymentStatus();
      if (s === "SUCCESS") return "success";
      if (s === "CANCELLED") return "warning";
      if (s === "FAILED" || s === "ERROR") return "danger";
      return "secondary";
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang load</span>
        </Spinner>
        
        <p className="mt-3">Đang xử lý kết quả thanh toán</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Alert variant={getStatusVariant()}>
            <Alert.Heading>{getStatusMessage()}</Alert.Heading>

            {result && (
              <div className="mt-3">
                <p>
                  <strong>Mã đơn hàng:</strong> {result.orderId}
                </p>

                <p>
                  <strong>Mã phản hồi (VNPay):</strong> {result.responseCode}
                </p>


                {result.amount && (
                  <p>
                    <strong>Số tiền:</strong>{" "}
                    {(Number(result.amount || 0) / 100).toLocaleString("vi-VN")}{" "}
                    VNĐ
                  </p>
                )}
              </div>
            )}

            <hr />
            <div className="d-flex gap-2">
              <Button variant="primary" onClick={() => navigate("/cart")}>
                Quay lại giỏ hàng
              </Button>

              <Button variant="outline-primary" onClick={() => navigate("/")}>
                Tiếp tục mua sắm
              </Button>
            </div>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default PaymentCallback;
