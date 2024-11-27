import FormTextBox from "/src/Components/shared/FormTextBox"
import { DisplayPrice, DisplayConfig, BoDauTiengViet } from "/src/Scripts/Utility.js"
import { useState, Component } from "react";
import PleaseWait from "/src/Shared/PleaseWait"
import "./Order.css"
import OrderEmpty from "/src/Components/product/OrderEmpty";

function OrderInfo(props) {
  let [fullName, setFullName] = useState(props.user.fullName || "");
  let [address, setAddress] = useState(props.addressList[0].address || "");
  let [phone, setPhone] = useState(props.user.phone ||"");
  let [email, setEmail] = useState(props.user.email ||"");
  let [paymentMethod, setPaymentMethod] = useState("Tiền mặt");
  let [errorFullName, setErrorFullName] = useState("");
  let [errorAddress, setErrorAddress] = useState("");
  let [errorPhone, setErrorPhone] = useState("");
  let [errorEmail, setErrorEmail] = useState("");

  const handleFullNameChange = e => {
    setFullName(fullName = e.target.value);
    handleErrorFullName();
  }
  const handleAddressChange = e => {
    setAddress(address = e.target.value);
    handleErrorAddress();
  }
  const handleAddressSelected = newAddress => {
    setAddress(address = newAddress);
    handleErrorAddress();
  }
  const handlePhoneChange = e => {
    setPhone(phone = e.target.value);
    handleErrorPhone();
  }
  const handleEmailChange = e => {
    setEmail(email = e.target.value);
    handleErrorEmail();
  }
  const handlePaymentChange = e => setPaymentMethod(e.target.value);
  
  const handleErrorFullName = () => {
    let error = "";

    if (fullName === "") error = "Vui lòng nhập tên người nhận";
    setErrorFullName(errorFullName = error);
  }
  const handleErrorAddress = () => {
    let error = "";

    if (address === "") error = "Cần có địa chỉ mặc định";
    else if (!address.match(/^\d+(\/\d)*\s\X+$/gm)) address = "Vui lòng nhập địa chỉ đúng định dạng (VD: 23 Âu Dương Lân, P3, Q8)";
    setErrorAddress(errorAddress = error);
  }
  const handleErrorPhone = () => {
    let error = "";

    if (phone === "") error = "Số điện thoại không được để trống";
    else if (!phone.match(/^0(([3,5,7,8,9][0-9]{8})|([2][0-9]{9}))$/gm)) error = "Số điện thoại phải đúng định dạng (10 hoặc 11 số)";
    setErrorPhone(errorPhone = error);
  }
  const handleErrorEmail = () => {
    let error = "";

    if (email === "") error = "Email không được để trống";
    else if (!email.match(/.+@[a-z]+(\.[a-z]*)+/gm)) error = "Email phải đúng định dạng (example@mail.com)";
    setErrorEmail(errorEmail = error);
  }
  
  let products;
  try {
    products = JSON.parse(localStorage.getItem("payItem")).orderProducts;
  }
  catch {
    products = null;
  }

  function handleAddress(e) {
    handleAddressSelected(props.addressList[e.target.selectedIndex].address);
  }

  function calTotal() {
    let total = 0;
    products.forEach(p => total = total + p.price * p.quantity);
    return total;
  }

  async function addOrder(e) {
    e.preventDefault();

    handleErrorFullName();
    handleErrorAddress();
    handleErrorEmail();
    handleErrorPhone();

    if (!(errorFullName === "" && errorAddress === "" && errorPhone === "" && errorEmail === "")) return;

    if (confirm("Bạn có chắc chắn thanh toán cho các sản phẩm bạn đã chọn?")) {
      if (paymentMethod === "VNPay") {
        const response = await fetch("/order/vnpay/payment", {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ username: this.props.username, fullname: BoDauTiengViet(fullName), total: calTotal() })
        })
        const url = await response.json();
        location.href = url;
      }
      else location.href = "/thanh-toan/hoan-tat";

      /*
      const response = await fetch("/order/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username, fullName, address, phone, email, paymentMethod,
          total: calTotal(),
          orderDetails: products
        })
      })
    
      if (response.ok) {
        localStorage.removeItem("payItem");
        alert("Đặt hàng thành công! Cảm ơn bạn đã lựa chọn Active Together!");
        location.href = "/nguoi-dung/lich-su-don-hang";
      }
      else alert("Đã có lỗi xảy ra, đặt hàng thất bại.");*/
    }
  }

  return products === null ? <OrderEmpty /> : (
    <main className="user-main">
      <h1 className="text-center fw-bold">THANH TOÁN ĐƠN HÀNG</h1>
      <hr />

      <div className="d-flex mb-3 order-container">
        <div>
          <div className="fs-4 fw-bold fst-italic">THÔNG TIN NHẬN HÀNG</div>
          <hr className="mt-0 mb-4" />
          {
            (this.props.username !== null) ? (
            <>
              <div className="form-detail-title">Địa chỉ đã lưu</div>
              <select onChange={handleAddress}>
                {
                  props.addressList.map((a, i) => <option key={i} value={i}>{a.type}</option>)
                }
              </select>
            </>) : <></>
          }
          <FormTextBox type="fullName" placeholder="Tên người nhận" icon="bi-person-fill" value={fullName} onValueChange={handleFullNameChange} errorValue={errorFullName} />
          <FormTextBox type="address" placeholder="Địa chỉ" icon="bi-house-door-fill" value={address} onValueChange={handleAddressChange} errorValue={errorAddress} />
          <FormTextBox type="phone" placeholder="Số điện thoại" icon="bi-telephone-fill" value={phone} onValueChange={handlePhoneChange} errorValue={errorPhone} />
          <FormTextBox type="email" placeholder="Email" icon="bi-envelope-fill" value={email} onValueChange={handleEmailChange} errorValue={errorEmail} />

          <div className="form-detail-title">Hình thức thanh toán</div>
          <select onChange={handlePaymentChange} defaultValue={paymentMethod}>
            <option value="Tiền mặt">Tiền mặt</option>
            <option value="VNPay">VNPay</option>
          </select>
        </div>

        <div className="item-list">
          {
            products.map(p =>
              <div className="d-flex mb-3" key={p.sku}>
                <img src={p.image} alt={p.name} />

                <div className="item-detail">
                  <b className="fs-5">{p.name}</b>
                  <i>{DisplayConfig(p.color, p.size)}</i>
                  <div>Số lượng: {p.quantity}</div>
                  <div>Thành tiền: {DisplayPrice(p.price * p.quantity)}</div>
                </div>
              </div>
            )
          }

          <div className="text-end fs-5 fw-bold fst-italic">
            TỔNG: {DisplayPrice(calTotal())}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-success mx-1" onClick={e => addOrder(e)}>
          <i className="bi bi-cart-check"></i> Thanh toán
        </button>

        <a href="/gio-hang">
          <button className="btn btn-primary mx-1">
            <i className="bi bi-cart"></i> Giỏ hàng
          </button>
        </a>

        <a href="/san-pham">
          <button className="btn btn-info mx-1">
            <i className="bi bi-bag-plus"></i> Chọn thêm sản phẩm
          </button>
        </a>
      </div>
    </main>
  )
}

export default class Order extends Component {
  static DisplayName = Order.name;

  constructor(props) {
    super(props);
    this.state = { addressList: [], user: {}, loading: true }
  }

  componentDidMount() {
    this.populateAddress();
  }

  async populateAddress() {
    const username = this.props.username;
    const userResponse = await fetch(`/user?username=${username}`);
    if (!userResponse.ok) throw new Error('Network response was not ok');
    const userData = await userResponse.json();
    this.setState({ user: userData });

    const addressResponse = await fetch(`/user/get/address?username=${username}`);
    if (!addressResponse.ok) throw new Error('Network response was not ok');
    const addressData = await addressResponse.json();
    this.setState({ addressList: addressData, loading: false });
  }

  render() {
    return this.state.loading ? <PleaseWait /> : <OrderInfo addressList={this.state.addressList} user={this.state.user} />
  }
}