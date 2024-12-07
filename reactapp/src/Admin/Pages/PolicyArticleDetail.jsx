import { CamelToKebab } from "/src/Scripts/Utility";
import { useState, useEffect, useRef } from 'react';
import AdminTextBox from "/src/Admin/Components/AdminTextBox";
import "./BlogArticleDetail.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "/src/Admin/Components/CustomQuill.css";

export default function ABlogArticleDetail() {
  const [aId, setAId] = useState("");
  let [aTitle, setATitle] = useState("");
  let [aContent, setAContent] = useState("");
  const [aTitleError, setATitleError] = useState("");
  const [aContentError, setAContentError] = useState("");
  const quillRef = useRef(null);

  const handleATitle = e => setATitle(aTitle = e.target.value);
  const handleAContent = value => setAContent(value);

  useEffect(() => {
    const id = new URLSearchParams(location.search).get("id");
    if (id !== null) populateArticleData(id);

    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.format('align', 'justify');
    }
  }, [])

  async function populateArticleData(id) {
    fetch(`/api/policy/get/detail?id=${id}`).then(response => response.json()).then(data => {
      setAId(data.id);
      setATitle(aTitle = data.title);
      setAContent(aContent = data.content)
    });
  }

  async function saveNewArticle(e) {
    e.preventDefault();
    aId === "" ? addArticle() : updateArticle();
  }

  async function addArticle() {
    if (confirm("Bạn có chắc chắn thêm chính sách này?")) {
      const response = await fetch("/api/policy/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title: aTitle,
          urlName: CamelToKebab(aTitle),
          content: aContent,
          isActive: true
        })
      });

      if (response.ok) { alert("Chính sách đã thêm thành công"); location.href = "/admin/chinh-sach" }
      else if (response.status === 400) {
        const data = await response.json();
        setATitleError(data[0]);
        setAContentError(data[1]);
      }
      else alert("Đã có lỗi xảy ra, chính sách đã thêm thất bại");
    }
  }

  async function updateArticle() {
    if (confirm("Bạn có chắc chắn cập nhật chính sách này?")) {
      const response = await fetch("/api/policy/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: aId,
          title: aTitle,
          urlName: CamelToKebab(aTitle),
          content: aContent,
          isActive: true
        })
      });

      if (response.ok) { alert("Chính sách đã cập nhật thành công"); location.href = "/admin/chinh-sach" }
      else if (response.status === 400) {
        const data = await response.json();
        setATitleError(data[0]);
        setAContentError(data[1]);
      }
      else alert("Đã có lỗi xảy ra, chính sách đã cập nhật thất bại");
    }
  }

  return (
    <main>
      <h1 className="flex-grow-1 text-center fw-bold">{location.search.includes("?id=") ? "SỬA" : "THÊM"} CHÍNH SÁCH</h1>
      <hr />

      <AdminTextBox type="text" detail="id" value={aId} readOnly placeholder="Mã chính sách" />
      <AdminTextBox type="text" detail="name" onChange={handleATitle} value={aTitle} errorValue={aTitleError} placeholder="Tiêu đề" />
      <div className="mb-3">
        <div className="fw-semibold mb-1">Nội dung:</div>
        <ReactQuill ref={quillRef} value={aContent} onChange={handleAContent}
          modules={{
            toolbar: [
              [{ header: [2, 3, 4, false] }],
              ['bold', 'italic', 'underline', 'clean', { 'list': 'bullet' }],
              [{ 'align': 'justify' }, { 'align': 'center' }]
            ],
          }}
        />
        <div id="content-error" className="error-value">{aContentError}</div>
      </div>

      <input type="button" value="Lưu" className="small-at-btn me-2" onClick={e => saveNewArticle(e)} />
      <input type="button" value="Hủy" className="small-at-btn-secondary" onClick={() => location.href = "/admin/chinh-sach"} />
    </main>
  )
}