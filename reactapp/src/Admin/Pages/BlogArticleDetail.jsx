import { Component } from "react"
import { CamelToKebab } from "/src/Components/Utility";
import axios from 'axios';
import "./BlogArticleDetail.css"

export default class ABlogArticleDetail extends Component {
  static displayName = ABlogArticleDetail.name;

  constructor(props) {
    super(props)
    this.state = { aId: "", aTitle: "", aBrief: "", aThumbnail: null, aContent: "" }
  }

  componentDidMount() {
    const id = new URLSearchParams(location.search).get("id");
    if (id !== null) this.populateArticleData(id);
  }

  handleFileUpload(e) {
    this.setState({ aThumbnail: e.target.files[0] })

    var reader = new FileReader();
    reader.onload = e => document.getElementById('small-image').src = e.target.result;
    reader.readAsDataURL(e.target.files[0]);
    document.getElementById('image-container').classList.remove("disabled");
  }

  handleDeleteImage() {
    this.setState({ aThumbnail: null })
    document.getElementById('small-image').src = "";
    document.getElementById('image-container').classList.add("disabled");
  }

  render() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">{location.search.includes("?id=") ? "SỬA" : "THÊM"} BÀI BLOG</h1>
        <hr />

        <input type="text" className="form-control mb-2" value={this.state.aId} readOnly placeholder="Mã bài" />
        <input type="text" className="form-control mb-2" onChange={e => this.setState({ aTitle: e.target.value })} value={this.state.aTitle} placeholder="Tiêu đề bài viết" autoFocus />
        <textarea onChange={(e) => this.setState({ aBrief: e.target.value })} value={this.state.aBrief} className="form-control mb-2" placeholder="Tóm tắt bài viết"></textarea>
        <input type="file" id="upload-thumbnail" onChange={e => this.handleFileUpload(e)} accept="image/*" className="disabled" />
        <input type="button" value="Chọn hình tiêu đề..." onClick={() => document.getElementById('upload-thumbnail').click()} className="small-at-btn mb-2" />
        <div id="image-container" className="image-container mb-2">
          <button className="btn close" onClick={() => this.handleDeleteImage()}>&times;</button>
          <img id="small-image" />
        </div>
        <textarea onChange={(e) => this.setState({ aContent: e.target.value })} value={this.state.aContent} className="form-control mb-2" placeholder="Nội dung"></textarea>

        <input type="button" value="Lưu" className="small-at-btn me-2" onClick={e => this.saveNewArticle(e)} />
        <input type="button" value="Hủy" className="small-at-btn-secondary" onClick={() => location.href = "/admin/bai-blog"} />
      </main>
    )
  }

  async populateArticleData(id) {
    fetch(`/api/blog/get/content?id=${id}`).then(response => response.json()).then(data => {
      this.setState({ aId: data.id, aTitle: data.title, aBrief: data.brief, aThumbnail: data.thumbnail, aContent: data.content },
        () => document.getElementById('small-image').src = this.state.aThumbnail)
    });
  }

  async saveNewArticle(e) {
    e.preventDefault();
    let extension = "";
    
    if (typeof(this.state.aThumbnail) !== "string")
    {
      if (!this.state.aThumbnail) {
        alert("Vui lòng chọn hình tiêu đề của bài viết!");
        return;
      }

      else extension = this.state.aThumbnail.name.substring(this.state.aThumbnail.name.lastIndexOf("."));
    }
    (this.state.aId === "") ? this.addArticle(extension) : this.updateArticle(extension);
  }

  async addArticle(extension) {
    if (confirm("Bạn có chắc chắn thêm bài blog này?")) {
      const response = await fetch("/api/blog/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title: this.state.aTitle,
          brief: this.state.aBrief,
          urlName: CamelToKebab(this.state.aTitle),
          thumbnail: extension,
          writtenAdmin: 240523,
          content: this.state.aContent,
          isActive: true
        })
      });

      if (this.uploadThumbnail() && response.ok) { alert("Bài blog đã thêm thành công"); location.href = "/admin/bai-blog" }
      else alert("Đã có lỗi xảy ra, bài blog đã thêm thất bại");
    }
  }

  async updateArticle(extension) {
    if (confirm("Bạn có chắc chắn cập nhật bài blog này?")) {
      const response = await fetch("/api/blog/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.aId,
          title: this.state.aTitle,
          brief: this.state.aBrief,
          urlName: CamelToKebab(this.state.aTitle),
          thumbnail: extension,
          content: this.state.aContent,
          isActive: true
        })
      });

      if (response.ok) {
        if (extension === "" || this.uploadThumbnail()) {
          alert("Bài blog đã cập nhật thành công");
          location.href = "/admin/bai-blog"
        }
        else alert("Lỗi hình ảnh, bài blog đã cập nhật thất bại");
      }
      else alert("Đã có lỗi xảy ra, bài blog đã cập nhật thất bại");
    }
  }

  async uploadThumbnail() {
    const formData = new FormData();
    formData.append('file', this.state.aThumbnail);

    try {
      const response = await axios.post('/api/blog/uploadphoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.status === 200;
    }
    catch (error) {
      return false
    }
  }
}