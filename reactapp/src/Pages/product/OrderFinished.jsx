import React, { useEffect, useState } from 'react';
import "./OrderFinished.css"

export default function OrderFinished() {
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.search.length > 0) {
      fetch("https://localhost:5173/order/vnpay/result" + location.search)
        .then(response => response.json())
        .then(data => { setSuccess(data); setLoading(false); })
        .catch(() => { setSuccess(false); setLoading(false); });
    }

    /*
    if (success) {
      fetch("/order/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username, fullName, address, phone, email, paymentMethod,
          total: calTotal(),
          orderDetails: products
        }).then(() => { setLoading(false); })
      })
    }
    else setLoading(false);*/
  }, []);

  const renderBody = () => {
    if (success) return (
      <div className='text-center payment-body'>
        <h2>Cảm ơn bạn đã ủng hộ Active Together!</h2>

        <img src="/victory.png" alt="victory" />

        <div className="detail text-center">
          Đơn hàng của bạn đã được đưa lên hệ thống. Bạn hãy thường xuyên cập nhật trạng thái đơn hàng của bạn. Bây giờ, bạn có thể tiếp tục xem tiếp các sản phẩm, và nhớ quay lại ủng hộ chúng mình nhé!
        </div>

        <div>
          <a href="/nguoi-dung/lich-su-don-hang">
            <button className="btn btn-primary mx-1">
              <i className="bi bi-cart"></i> Xem lịch sử đơn hàng
            </button>
          </a>

          <a href="/san-pham">
            <button className="btn btn-info mx-1">
              <i className="bi bi-bag-plus"></i> Tiếp tục mua sắm
            </button>
          </a>
        </div>
      </div>
    )

    else return (
      <div className='text-center payment-body'>
        <h2>Đã có lỗi xảy ra, thanh toán thất bại!</h2>

        <img src="/404.png" alt="error" />

        <div className="detail text-center">
          Có thể đã có lỗi kỹ thuật, hoặc bạn đã hủy thanh toán. Vui lòng nhấn <q>Quay lại thanh toán</q> để thử lại nhé!
        </div>

        <div>
          <a href="/thanh-toan">
            <button className="btn btn-primary mx-1">
              <i className="bi bi-cart"></i> Quay lại thanh toán
            </button>
          </a>

          <a href="/san-pham">
            <button className="btn btn-info mx-1">
              <i className="bi bi-bag-plus"></i> Tiếp tục mua sắm
            </button>
          </a>
        </div>
      </div>
    )
  }

  // Render the payment result
  return (
    <main className='user-main payment-container'>
      <h1 className="text-center fw-bold">THANH TOÁN {success ? "THÀNH CÔNG" : "THẤT BẠI"}</h1>
      <hr />

      { renderBody() }
    </main>
  );
}