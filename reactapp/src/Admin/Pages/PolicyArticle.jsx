import React, { Component } from "react"
import AdminTextBox from "/src/Admin/Components/AdminTextBox";

export default class ABlogArticle extends Component {
  static displayName = ABlogArticle.name;

  constructor(props) {
    super(props);
    this.state = {article: [], pSearch: ""}
  }

  componentDidMount() { this.populateArticleData() }

  renderTable(articles) {
    return (
      <>
        {
          articles.map(a => 
            <tr key={a.id} className="pointer">
              <td className="align-middle">{a.id}</td>
              <td className="align-middle">{a.title}</td>
              <td className="align-middle">
                <a onClick={() => this.loadBlogContent(a)}>
                  <i className="bi bi-eye"></i>
                </a>
                <a href={`/admin/thong-tin-chinh-sach?id=${a.id}`}>
                  <i className="bi bi-gear"></i>
                </a>
                <i className={`bi bi-${a.isActive ? "lock" : "unlock"}`} onClick={() => deleteArticle(a.id, a.isActive)}></i>
              </td>
            </tr>
          )
        }
      </>
    )
  }

  render() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">CHÍNH SÁCH</h1>
        <div className="fst-italic text-center">(Chú ý: Không nên tạo quá nhiều chính sách!)</div>
        <hr />
        
        <div className="d-flex c-10">
          <a href="/admin/thong-tin-chinh-sach">
            <button className="at-btn"><i className="bi bi-plus-circle"></i> Tạo chính sách mới</button>
          </a>

          <div className="d-flex flex-grow-1">
            <AdminTextBox type="search" placeholder="Nhập chính sách cần tìm..." value={this.state.pSearch} onChange={e => this.setState({ pSearch: e.target.value })} onKeyDown={() => this.findData()} />
            <button className="small-at-sbtn"><i className="bi bi-search"></i></button>
          </div>
        </div>

        <table className="table table-striped table-bordered table-hover pointer mt-3">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Tiêu đề</th>
              <th className="w-120px"></th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {this.renderTable(this.state.article)}
          </tbody>
        </table>
      </main>
    )
  }

  async populateArticleData() {
    fetch("/api/policy/get").then(response => response.json()).then(data => this.setState({article: data}));
  }

  async findData() {
    if (this.state.pSearch === "") this.populateArticleData();
    else fetch(`/api/policy/find?title=${this.state.pSearch}`).then(response => response.json()).then(data => this.setState({article: data}));
  }

  loadBlogContent(a) {
    localStorage.setItem("article-load", JSON.stringify(a));
    location.href = "/admin/xem-chinh-sach";
  }
}

async function deleteArticle(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} chính sách này?`)) {
    const url = isActive ? `/api/policy/lock?id=${id}` : `/api/policy/unlock?id=${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id})
    })

    if (response.ok) { alert(`Chính sách đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Chính sách đã ${action} thất bại.`)
  }
}