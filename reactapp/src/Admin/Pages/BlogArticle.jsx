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
                  <button className="small-at-btn me-1">Xem</button>
                </a>
                <a href={`/admin/thong-tin-bai-blog?id=${a.id}`}>
                  <button className="small-at-btn me-1">Sửa</button>
                </a>
                <button className="small-at-btn" onClick={() => deleteArticle(a.id, a.isActive)}>{a.isActive ? "Khóa" : "Mở khóa"}</button>
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
        
        <div className="text-end">
          <a href="/admin/thong-tin-bai-blog">
            <button className="at-btn">Thêm</button>
          </a>
        </div>

        <table className="table table-striped table-bordered table-hover pointer mt-3">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Hình minh họa</th>
              <th className="text-center">Tiêu đề</th>
              <th className="text-center">Tác giả</th>
              <th className="w-10"></th>
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