import { useState, useEffect, useRef } from "react"
import { CamelToKebab } from "/src/Scripts/Utility";
import axios from 'axios';
import AdminTextBox from "/src/Admin/Components/AdminTextBox";
import "./BlogArticleDetail.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "/src/Admin/Components/CustomQuill.css";

export default function ABlogArticleDetail(props) {
  const [aId, setAId] = useState("");
  let [aTitle, setATitle] = useState("");
  let [aBrief, setABrief] = useState("");
  let [aThumbnail, setAThumbnail] = useState(null);
  const [aWrittenAdmin, setAWrittenAdmin] = useState(240101);
  const [aDatePublish, setADatePublish] = useState("")
  let [aContent, setAContent] = useState("");

  const handleATitle = e => setATitle(aTitle = e.target.value);
  const handleABrief = e => setABrief(aBrief = e.target.value);
  const handleAContent = newContext => setAContent(aContent = newContext);

  const [aTitleError, setATitleError] = useState("");
  const [aBriefError, setABriefError] = useState("");
  const [aThumbnailError, setAThumbnailError] = useState("");
  const [aContentError, setAContentError] = useState("");
  
  let [aImage, setAImage] = useState([]);
  const handleImageUpload = (newImage, index = 0) => setAImage(aImage = [...aImage.slice(0, index), newImage, ...aImage.slice(index)]);

  const quillRef = useRef(null);
  useEffect(() => {
    const id = new URLSearchParams(location.search).get("id");
    if (id !== null) populateArticleData(id);

    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.format('align', 'justify');
      quill.getModule('toolbar').addHandler('image', handleImageButtonClick);
    }
  }, []);

  const handleImageButtonClick = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const quill = quillRef.current.getEditor();
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result;
          const range = quill.getSelection();
          if (range) {
            quill.insertEmbed(range.index, 'image', imageUrl);
            handleImageUpload(file, range.index);
          } else {
            quill.insertEmbed(0, 'image', imageUrl);
            handleImageUpload(file);
          }
        };
        reader.readAsDataURL(file);
      }
    };
  }

  const handleThumbnailUpload = e => {
    setAThumbnail(aThumbnail = e.target.files[0]);

    const reader = new FileReader();
    reader.onload = e => document.getElementById('small-image').src = e.target.result;
    reader.readAsDataURL(e.target.files[0]);
    document.getElementById('image-container').classList.remove("disabled");
  }

  const handleDeleteThumbnail = () => {
    setAThumbnail(aThumbnail = null);
    document.getElementById('small-image').src = "/src/images/blog/default.jpg";
    document.getElementById('image-container').classList.add("disabled");
  }

  return (
    <main>
      <h1 className="flex-grow-1 text-center fw-bold">{location.search.includes("?id=") ? "SỬA" : "THÊM"} BÀI BLOG</h1>
      <hr />

      <AdminTextBox type="text" detail="id" value={aId} readOnly placeholder="Mã bài" />
      <AdminTextBox type="text" detail="name" onChange={handleATitle} value={aTitle} errorValue={aTitleError} placeholder="Tiêu đề" />
      <AdminTextBox type="textarea" detail="brief" onChange={handleABrief} value={aBrief} errorValue={aBriefError} placeholder="Tóm tắt" />

      <div className="mt-3">
        <input type="file" id="upload-thumbnail" onChange={handleThumbnailUpload} accept="image/*" className="disabled" />
        <input type="button" value="Chọn hình tiêu đề..." onClick={() => document.getElementById('upload-thumbnail').click()} className="small-at-btn mb-2" />
        <div id="image-container" className="image-container mb-2">
          <button className="small-at-sbtn close" onClick={handleDeleteThumbnail}>&times;</button>
          <img id="small-image" src="/src/images/blog/default.jpg" style={{ height: "300px" }} />
        </div>
        <div id="image-error" className="error-value">{aThumbnailError}</div>
      </div>

      <div className="mb-3">
        <div className="fw-semibold mb-1">Nội dung:</div>
        <ReactQuill ref={quillRef} value={aContent} onChange={handleAContent}
          modules={{
            toolbar: [
              [{ header: [2, 3, 4, false] }],
              ['bold', 'italic', 'underline', 'clean', { 'list': 'bullet' }],
              [{ 'align': 'justify' }, { 'align': 'center' }],
              ['link', 'image', 'video']
            ]
          }}
        />
        <div id="content-error" className="error-value">{aContentError}</div>
      </div>

      <input type="button" value="Lưu" className="small-at-btn me-2" onClick={saveNewArticle} />
      <input type="button" value="Hủy" className="small-at-btn-secondary" onClick={() => location.href = "/admin/bai-blog"} />
    </main>
  )

  async function populateArticleData(id) {
    fetch(`/api/blog/get/detail?id=${id}`).then(response => response.json()).then(data => {
      setAId(data.id); setATitle(aTitle = data.title); setABrief(aBrief = data.brief);
      setAThumbnail(aThumbnail = data.thumbnail); setAWrittenAdmin(data.writtenAdmin);
      setADatePublish(data.datePublish); setAContent(aContent = data.content);
      document.getElementById('small-image').src = aThumbnail;
    });

    fetch(`/api/blog/get/detail/image?id=${id}`).then(response => response.json()).then(data => {
      const quill = quillRef.current.getEditor();
      for (let i=0; i<data.length; i++) quill.insertEmbed(i, 'image', data[i]);
      setAImage(data);
    });
  }

  async function saveNewArticle(e) {
    e.preventDefault();
    let fileName = "";

    if (typeof (aThumbnail) !== "string") {
      if (!aThumbnail) {
        alert("Vui lòng chọn hình tiêu đề của bài viết!");
        return;
      }
      fileName = "/src/images/blog/thumbnail_" + aId + aThumbnail.name.substring(aThumbnail.name.lastIndexOf("."));
    }
    else {
      if (aThumbnail === "") {
        alert("Vui lòng chọn hình tiêu đề của bài viết!");
        return;
      }
      else fileName = "/src/images/blog/thumbnail_" + aId + aThumbnail.substring(aThumbnail.lastIndexOf("."));
    }


    (aId === "") ? addArticle(aThumbnail.name.substring(aThumbnail.name.lastIndexOf("."))) : updateArticle(fileName);
  }

  async function addArticle(extension) {
    if (confirm("Bạn có chắc chắn thêm bài blog này?")) {
      const response = await fetch("/api/blog/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title: aTitle,
          brief: aBrief,
          urlName: CamelToKebab(aTitle),
          thumbnail: extension,
          writtenAdmin: props.username,
          content: aContent,
          isActive: true
        })
      });

      if (uploadThumbnail() && uploadImage() && response.ok) { alert("Bài blog đã thêm thành công"); location.href = "/admin/bai-blog" }
      else if (response.status === 400) {
        const data = await response.json();
        setATitleError(data.errors[0]);
        setABriefError(data.errors[1]);
        setAThumbnailError(data.errors[2]);
        setAContentError(data.errors[3]);
      }
      else alert("Đã có lỗi xảy ra, bài blog đã thêm thất bại");
    }
  }

  async function updateArticle(thumbnail) {
    if (confirm("Bạn có chắc chắn cập nhật bài blog này?")) {
      const response = await fetch("/api/blog/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: aId,
          title: aTitle,
          brief: aBrief,
          urlName: CamelToKebab(aTitle),
          thumbnail,
          writtenAdmin: aWrittenAdmin,
          datePublish: aDatePublish,
          content: aContent,
          isActive: true
        })
      });

      if (response.ok) {
        if (typeof (aThumbnail) === "string" || uploadThumbnail()) { alert("Bài blog đã cập nhật thành công"); location.href = "/admin/bai-blog" }
        else alert("Lỗi hình ảnh, bài blog đã cập nhật thất bại");
      }
      else if (response.status === 400) {
        const data = await response.json();
        setATitleError(data.errors[0]);
        setABriefError(data.errors[1]);
        setAThumbnailError(data.errors[2]);
        setAContentError(data.errors[3]);
      }
      else alert("Đã có lỗi xảy ra, bài blog đã cập nhật thất bại");
    }
  }

  async function uploadThumbnail() {
    const formData = new FormData();
    formData.append('file', aThumbnail);

    try {
      const response = await axios.post('/api/blog/upload/thumbnail', formData, {
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

  async function uploadImage() {
    if (aImage.length === 0) return true;

    const formData = new FormData();
    formData.append('file', aImage);

    try {
      const response = await axios.post('/api/blog/upload/image', formData, {
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