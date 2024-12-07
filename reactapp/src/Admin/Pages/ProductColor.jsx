import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import AdminTextBox from "/src/Admin/Components/AdminTextBox";
import PleaseWait from "/src/Shared/PleaseWait";

export default function AProductColor() {
  const [color, setColor] = useState([]);
  const [productColor, setProductColor] = useState([]);

  const { id } = useParams();
  const [cId, setCId] = useState('');
  const [cCode, setCCode] = useState('');
  const [cCodeError, setCCodeError] = useState('');

  let [selectedFile, setSelectedFile] = useState([]);
  let [image, setImage] = useState([]);
  const hasLoad = useRef(false);

  useEffect(() => {
    if (hasLoad.current) return;

    populateColorData();
    populateProductColorData(id);

    hasLoad.current = true;
  }, []);

  const handleColorChange = e => setCCode(e.target.value)  

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedFile((prevFiles) => [...prevFiles, ...newFiles]);  // Add new files to the state

    // Process the images to display
    const newDisplayImages = [];
    const readerPromises = newFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          newDisplayImages.push(readerEvent.target.result); // Collect all the images
          resolve();
        };
        reader.readAsDataURL(file); // Read each file as data URL
      });
    });

    // After all files have been read, update the displayImage state
    Promise.all(readerPromises).then(() => {
      setImage((prevImages) => [...prevImages, ...newDisplayImages]); // Append new images
    });
  };

  const handleDeleteImage = (e, i) => {
    const newFile = selectedFile.filter((_, index) => index !== i);
    const newImage = image.filter((_, index) => index !== i);

    setSelectedFile(newFile);
    setImage(newImage);
  }

  const renderImageList = () => {
    return image.length === 0 ? <></> : image.map((d, i) =>
      <div id="image-container" className="image-container mb-2" key={i}>
        <button className="small-at-sbtn close" onClick={e => handleDeleteImage(e, i)}>&times;</button>
        <img id="small-image" src={d} alt={i} style={{ height: "150px" }} />
      </div>
    )
  }

  async function saveNewProductColor(e) {
    e.preventDefault();
    if (cCode === "") setCCodeError("Vui lòng chọn màu");
    else if ((cId === "" && productColor.findIndex(pc => pc.colorCode == cCode) > -1) || (productColor.filter(pc => pc.ProductId == cId).findIndex(pc => pc.colorCode == cCode) > -1))
      setCCodeError("Vui lòng chọn màu không trùng với các màu đã lưu");
    else (cId !== "") ? updateProductColor() : addProductColor();
  }

  function renderTable() {
    return (
      <>
        {
          productColor.map(c =>
            <tr key={c.id}>
              <td className="align-middle">
                <img src={c.productImages.length === 0 ? "/src/images/product/default.png" : c.productImages[0].image} alt={c.colorCodeNavigation.code} className="product-thumbnail" />
              </td>
              <td className="align-middle">{c.id}</td>
              <td className="align-middle">{c.colorCodeNavigation.code}</td>
              <td className="align-middle">{c.colorCodeNavigation.name}</td>
              <td className="align-middle">
                <a href={`/admin/thong-tin-mau-sac-san-pham/${id}/${c.id}`}>
                  <i className="bi bi-eye"></i>
                </a>
                <i className="bi bi-gear" onClick={() => { setCId(c.id); setCCode(c.colorCodeNavigation.code); setSelectedFile(selectedFile = c.productImages.map(c => c.image)); setImage(image = c.productImages.map(c => c.image)) }}></i>
                <i className={`bi bi-${c.isActive ? "lock" : "unlock"}`} onClick={() => deleteProductColor(c.id, c.isActive)}></i>
              </td>
            </tr>
          )
        }
      </>
    )
  }
  
  return (!hasLoad) ? <PleaseWait /> : (
    <main>
      <h1 className="flex-grow-1 text-center fw-bold">MÀU SẮC SẢN PHẨM</h1>
      <hr />

      <div className="row">
        <div className="col-3">
          <AdminTextBox type="text" detail="id" value={cId} readOnly placeholder="ID chi tiết" />

          <div className="mt-3">
            <label htmlFor="color">Màu sản phẩm</label>
            <select className="form-control mt-1" id="color" value={cCode} onChange={e => handleColorChange(e)}>
              <option value="" disabled selected hidden>Màu sản phẩm</option>
              {
                color.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)
              }
            </select>
            <div id="color-error" className="error-value">{cCodeError}</div>
          </div>          

          <div className="mt-3">
            <input type="file" id="upload-file" className="disabled" onChange={handleFileChange} accept="image/*" multiple={true} />
            <input type="button" value="Chọn hình..." onClick={() => document.getElementById('upload-file').click()} className="small-at-btn mb-2" />
            {renderImageList()}
          </div>

        <input type="submit" value="Lưu" onClick={e => saveNewProductColor(e)} className="at-btn mt-3 me-2" />
        <input type="button" value="Hủy" onClick={() => cancelProductColor()} className="at-btn-secondary mt-3" />
        </div>

        <div className="col-9">            
          <table className="table table-striped table-bordered table-hover pointer">
            <thead>
              <tr>
                <th className="text-center w-10 align-middle"></th>
                <th className="text-center w-10 align-middle">ID</th>
                <th className="text-center align-middle">Mã HEX</th>
                <th className="text-center align-middle">Màu sắc</th>
                <th className="w-120px"></th>
              </tr>
            </thead>

            <tbody className="table-group-divider">
              {renderTable(productColor)}
            </tbody>
          </table>   
        </div>
      </div>
    </main>
  )

  async function populateProductColorData(id) {
    fetch(`/api/productcolor/get?id=${id}`).then(response => response.json()).then(data => setProductColor(data));
  }

  async function populateColorData() {
    fetch("/api/color/get").then(response => response.json()).then(data => setColor(data));
  }

  function cancelProductColor() {
    setCId(""); setCCode(""); setCCodeError(""); setSelectedFile([]); setImage([]);
  }  
  
  async function addProductColor() {
    if (confirm("Bạn có chắc chắn thêm màu cho sản phẩm này?")) {
      const response = await fetch("/api/productcolor/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ productId: id, colorCode: cCode })
      });
  
      if (handleUpload() && response.ok) { alert("Thêm màu cho sản phẩm thành công"); location.reload() }
      else alert("Đã có lỗi xảy ra, thêm màu cho sản phẩm đã thêm thất bại");
    }
  }
  
  async function updateProductColor() {
    if (confirm("Bạn có chắc chắn cập nhật màu cho sản phẩm này?")) {
      const response = await fetch("/api/productcolor/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ productId: id, id: cId, colorCode: cCode })
      });
  
      if (handleUpload() && response.ok) { alert("Cập nhật màu sản phẩm thành công"); location.reload() }
      else alert("Đã có lỗi xảy ra, cập nhật màu sản phẩm thất bại");
    }  
  }

  async function handleUpload() {
    const formData = new FormData();
    let countStr = 0;
    selectedFile.forEach(file => {
      if (typeof(file) === "string") {
        const emptyBlob = new Blob([], { type: `image/${file.substring(file.lastIndexOf(".") + 1)}` });
        const emptyFile = new File([emptyBlob], `@__#${file}`, { type: `image/${file.substring(file.lastIndexOf(".") + 1)}` });
        formData.append("file", emptyFile);
        countStr++;
      }
      else formData.append("file", file);
    });

    if (countStr === selectedFile.length) return true;
  
    try {
      await axios.post('/api/productcolor/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  
  async function deleteProductColor(id, isActive) {
    const action = isActive ? "khóa" : "mở khóa"
    if (confirm(`Bạn có chắc chắn ${action} chi tiết màu sắc này?`)) {
      const url = isActive ? `/api/productcolor/lock?id=${id}` : `/api/productcolor/unlock?id=${id}`;
  
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({id})
      })
  
      if (response.ok) { alert(`Chi tiết màu sắc đã ${action} thành công.`); location.reload(); }
      else alert(`Đã có lỗi xảy ra. Chi tiết màu sắc đã ${action} thất bại.`)
    }
  }
}