import { Component } from "react"
import { DisplayPrice, DisplayDate } from "/src/Scripts/Utility";
import Modal from 'react-bootstrap/Modal';

export default class AImport extends Component {
  static displayName = AImport.name;

  constructor(props) {
    super(props);
    this.state = { import: [], importDetail: [], show: false }
  }

  componentDidMount = () => this.populateImportData();

  renderModal(im) {
    return (
      <Modal show={this.state.show} onHide={() => this.setState({ show: false })} animation={false} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Hóa đơn nhập kho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="nb-2">
            <b>Người lập:</b> {im.checkAdmin} - {im.adminName}<br />
            <b>Ngày lập:</b> {DisplayDate(im.dateImport)}<br />
          </div>
          <b><i>Danh sách hàng hóa:</i></b>
          <table className="table table-striped table-bordered table-hover mt-3">
            <thead>
              <tr>
                <th className="text-center">SKU</th>
                <th className="text-center">Tên sản phẩm</th>
                <th className="text-center">Thông số</th>
                <th className="text-center">Giá tiền</th>
                <th className="text-center">Số lượng</th>
              </tr>
            </thead>

            <tbody className="table-group-divider">
              {this.state.importDetail.filter(x => x.billId === im.id).map(i =>
                <tr key={i.sku}>
                  <td className="align-middle">{i.sku}</td>
                  <td className="align-middle">{i.name}</td>
                  <td className="align-middle">{i.color + " " + i.size}</td>
                  <td className="align-middle">{DisplayPrice(i.price)}</td>
                  <td className="align-middle">{i.quantity}</td>
                </tr>
              )}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    )
  }

  renderTable(imports) {
    return (
      <>
        {
          imports.map(im =>
            <React.Fragment key={im.id}>
              <tr>
                <td className="align-middle">{im.id}</td>
                <td className="align-middle">{DisplayDate(im.dateImport)}</td>
                <td className="align-middle">{`${im.checkAdmin} - ${im.adminName}`}</td>
                <td className="align-middle">{DisplayPrice(im.total)}</td>
                <td>
                  <button className="small-at-btn" onClick={() => this.setState({ show: true })}>Xem chi tiết</button>
                </td>
              </tr>
              {this.renderModal(im)}
            </React.Fragment>
          )
        }
      </>
    )
  }

  render() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">NHẬP KHO</h1>
        <hr />

        <div>
          <a href="/admin/thong-tin-nhap-kho">
            <button className="at-btn"><i className="bi bi-plus-circle"></i> Lập phiếu nhập kho mới</button>
          </a>
        </div>

        <table className="table table-striped table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Ngày lập</th>
              <th className="text-center">Người lập</th>
              <th className="text-center">Thành tiền</th>
              <th className="button-col"></th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {this.renderTable(this.state.import)}
          </tbody>
        </table>
      </main>
    )
  }

  async populateImportData() {
    fetch("/api/import/get").then(response => response.json()).then(data => this.setState({ import: data }));
    fetch(`/api/import/get/detail`).then(response => response.json()).then(data => this.setState({ importDetail: data }));
  }
}