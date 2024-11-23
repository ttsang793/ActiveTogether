import { DisplayDate } from "/src/Scripts/Utility"
import React, { Component } from "react"

export default class APromotion extends Component {
  static displayName = APromotion.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, promotion: [] }
  }

  componentDidMount() {
    this.populatePromotionDetail()
  }

  renderTable(promotions) {
    return (
      <>
        {
          promotions.map(p => 
            <tr key={p.id}>
              <td className="align-middle">{p.id}</td>
              <td className="align-middle">{p.title}</td>
              <td className="align-middle">{DisplayDate(p.dateStart)}</td>
              <td className="align-middle">{DisplayDate(p.dateEnd)}</td>
              <td>
                <button className="small-at-btn">Xem sản phẩm</button>
                <button className="small-at-btn" onClick={() => deletePromotion(p.id, p.isActive)}>{p.isActive ? "Khóa" : "Mở khóa"}</button>
              </td>
            </tr>
          )
        }
      </>
    )
  }

  render() {
    return this.state.loading ? <p>Please wait...</p> : (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">CHƯƠNG TRÌNH GIẢM GIÁ</h1>
        <hr />

        <div className="text-end">
          <input type="submit" value="Tạo mới" onClick={() => location.href = "/admin/chuong-trinh-giam-gia"} className="at-btn" />
        </div>

        <table className="table table-striped table-hover pointer table-bordered mt-3">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Tiêu đề</th>
              <th className="text-center">Ngày bắt đầu</th>
              <th className="text-center">Ngày kết thúc</th>
              <th className="w-10"></th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {this.renderTable(this.state.promotion)}
          </tbody>
        </table>
      </main>
    )
  }

  async populatePromotionDetail() {    
    fetch("/api/promotion/get").then(response => response.json()).then(data => this.setState({loading: false, promotion: data}));
  }
}

async function deletePromotion(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} chương trình giảm giá này?`)) {
    const url = isActive ? `/api/promotion/lock?id=${id}` : `/api/promotion/unlock?id=${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id})
    })

    if (response.ok) { alert(`Chương trình khuyến mãi đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Chương trình khuyến mãi đã ${action} thất bại.`)
  }
}