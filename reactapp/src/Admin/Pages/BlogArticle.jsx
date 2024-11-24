import React, { Component } from "react"

export default class ABlogArticle extends Component {
  static displayName = ABlogArticle.name;

  constructor(props) {
    super(props);
    this.state = {article: []}
  }

  componentDidMount() { this.populateArticleData() }

  renderTable(articles) {
    return (
      <>
        {
          articles.map(a => 
            <tr key={a.id} className="pointer">
              <td className="align-middle">{a.id}</td>
              <td className="align-middle">
                <img src={a.thumbnail} alt="thumbnail"width={"200px"} />
              </td>
              <td className="align-middle">{a.title}</td>
              <td className="align-middle">{a.writtenAdmin}</td>
              <td className="align-middle">
                <a href={`/admin/xem-bai-blog?id=${a.id}`}>
                  <i className="bi bi-eye"></i>
                </a>
                <a href={`/admin/thong-tin-bai-blog?id=${a.id}`}>
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
        <h1 className="flex-grow-1 text-center fw-bold">BÀI BLOG</h1>
        <hr />
        
        <div className="d-flex c-10">
          <a href="/admin/thong-tin-bai-blog">
            <button className="at-btn"><i className="bi bi-plus-circle"></i> Tạo bài blog mới</button>
          </a>

          <div className="d-flex flex-grow-1">
            <input type="search" className="form-control" placeholder="Nhập tiêu đề bài blog cần tìm..." />
            <button className="small-at-sbtn"><i className="bi bi-search"></i></button>
          </div>
        </div>

        <table className="table table-striped table-bordered table-hover pointer mt-3">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center w-10">Hình minh họa</th>
              <th className="text-center">Tiêu đề</th>
              <th className="text-center">Tác giả</th>
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
    fetch("/api/blog/get").then(response => response.json()).then(data => this.setState({article: data}));
  }
}

async function deleteArticle(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} bài blog này?`)) {
    const url = isActive ? `/api/blog/lock?id=${id}` : `/api/blog/unlock?id=${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id})
    })

    if (response.ok) { alert(`Bài blog đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Bài blog đã ${action} thất bại.`)
  }
}