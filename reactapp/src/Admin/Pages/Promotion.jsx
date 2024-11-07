import { DisplayDate } from "/src/Components/Utility"
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

  renderTable(sports) {
    return (
      <>
        {
          sports.map(s => 
            <tr key={s.id}>
              <td className="align-middle">{s.id}</td>
              <td className="align-middle">{s.title}</td>
              <td className="align-middle">{DisplayDate(s.dateStart)}</td>
              <td className="align-middle">{DisplayDate(s.dateEnd)}</td>
              <td>
                <button className="small-at-btn">Xem sản phẩm</button>
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