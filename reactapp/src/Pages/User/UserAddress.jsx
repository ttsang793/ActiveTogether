import { Component } from "react";
import PleaseWait from "/src/Shared/PleaseWait";
import "./UserAddress.css";

export default class UserAddress extends Component {
  static displayName = UserAddress.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, address: [] }
  }

  componentDidMount() {
    this.populateAddress()
  }

  async populateAddress() {
    fetch(`/user/get/address?username=${this.props.username}`).then(response => response.json()).then(data => {
      this.setState({ loading: false, address: data });
    })
  }

  addAddressInput(e) {
    e.preventDefault();

    const newAddress = [...this.state.address, { userId: this.state.address[0].userId, type: "", address: "" }];
    this.setState({ address: newAddress });
    const i = this.state.address.length - 1;

    return (
      <tr key={i}>
        <td>
          <input type="text" className="form-control type" onChange={e => this.handleAddressChange(e, i)} value={this.state.address[i].type} />
        </td>
        <td>
          <input type="text" className="form-control address" onChange={e => this.handleAddressChange(e, i)} value={this.state.address[i].address} />
        </td>
      </tr>
    )
  }

  deleteAddressInput(e, i) {
    e.preventDefault();

    const newAddress = [...this.state.address.slice(0, i), ...this.state.address.slice(i + 1)];
    this.setState({ address: newAddress });

    this.renderAddressInputs();
  }
  
  handleAddressChange(e, index) {
    const newAddress = this.state.address.map((a, i) => {
      if (i === index) {
        if (e.target.classList.contains("type")) a.type = e.target.value;
        else a.address = e.target.value;
      }
      return a;
    })

    this.setState({ address: newAddress });
  }

  renderAddressInputs() {
    return this.state.address.map((a, i) =>
      <tr key={i}>
        <td>
          <input type="text" className="form-control type" onChange={e => this.handleAddressChange(e, i)} value={a.type} />
        </td>
        <td>
          <input type="text" className="form-control address" onChange={e => this.handleAddressChange(e, i)} value={a.address} />
        </td>
        <td>
          <i className="bi bi-x" onClick={e => this.deleteAddressInput(e,i)}></i>
        </td>
      </tr>
    )
  }

  render() {
    return this.state.loading ? <PleaseWait /> : (
      <main className="user-main">
        <h1 className="flex-grow-1 text-center fw-bold">ĐỊA CHỈ CỦA NGƯỜI DÙNG</h1>
        <hr />
        <form className="text-center" id="change-address-form">
          <div className="text-end">
            <button className="small-at-btn-secondary" onClick={e => this.addAddressInput(e)}>Thêm địa chỉ mới</button>
          </div>
          <table className="table table-hover table-striped w-100">
            <thead>
              <tr>
                <th className="w-25">Tiêu đề</th>
                <th className="w-75">Địa chỉ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { this.renderAddressInputs() }
            </tbody>
          </table>
          <input type="submit" value="Lưu thông tin" onClick={e => this.updateAddress(e)} className="at-btn m-at-btn" />
        </form>
      </main>
    )
  }

  async updateAddress(e) {
    e.preventDefault();
    if (confirm("Bạn có muốn lưu danh sách địa chỉ hiện tại của bạn?")) {
      const response = await fetch(`/user/update/address?username=${this.props.username}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ addressList: this.state.address })
      });
  
      if (response.ok) { alert("Danh sách địa chỉ được cập nhật thành công"), location.href = "/nguoi-dung" }
      else alert("Đã có lỗi xảy ra, cập nhật danh sách địa chỉ thất bại");
    }
  }
}