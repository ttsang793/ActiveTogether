import "./Product.css"
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import AdminTextBox from "/src/Admin/Components/AdminTextBox";
import PleaseWait from "/src/Shared/PleaseWait";

export default function AProductDetail() {
  const { id, colorId } = useParams();
  const [pSKU, setPSKU] = useState("");
  let [pSize, setPSize] = useState("");
  let [pPrice, setPPrice] = useState("");
  let [pNote, setPNote] = useState("");

  const [pSizeError, setPSizeError] = useState("");
  const [pPriceError, setPPriceError] = useState("");
  const [pNoteError, setPNoteError] = useState("");

  const handlePSize = e => setPSize(pSize = e.target.value);
  const handlePPrice = e => setPPrice(pPrice = e.target.value);
  const handlePNote = e => setPNote(pNote = e.target.value);
  let [detail, setDetail] = useState([]);

  const hasLoad = useRef(false);

  useEffect(() => {
    if (hasLoad.current) return;
    
    populateProductDetailData(colorId);

    hasLoad.current = true;
  }, []);

  function renderTable(products) {
    return (
      <>
        {
          products.map(p =>
            <tr key={p.sku}>
              <td className="align-middle">{p.sku}</td>
              <td className="align-middle">{p.size}</td>
              <td className="align-middle">{p.price}</td>
              <td className="align-middle">
                <i className="bi bi-gear" onClick={() => handleSelect(p)}></i>
                <i className={`bi bi-${p.isActive ? "lock" : "unlock"}`} onClick={() => deleteProductDetail(p.id, p.isActive)}></i>
              </td>
            </tr>
          )
        }
      </>
    )
  }

  const handleSelect = p => {
    setPSKU(p.sku); setPSize(pSize = p.size); setPPrice(pPrice = p.price);
  }

  return (!hasLoad.current) ? <PleaseWait /> : (
    <main>
      <h1 className="flex-grow-1 text-center fw-bold">CHI TIẾT MÀU SẮC SẢN PHẨM</h1>
      <hr />

      <div className="row">
        <div className="col-3">
          <AdminTextBox type="text" detail="SKU" value={pSKU} readOnly={true} placeholder="Mã SKU" />
          <AdminTextBox type="text" detail="size" onChange={handlePSize} value={pSize} errorValue={pSizeError} placeholder="Kích thước" readOnly={pSKU !== ""} />
          <AdminTextBox type="text" detail="price" onChange={handlePPrice} value={pPrice} errorValue={pPriceError} placeholder="Đơn giá" />
          <AdminTextBox type="textarea" detail="note" onChange={handlePNote} value={pNote} errorValue={pNoteError} placeholder="Ghi chú" />

          <input type="submit" value="Lưu" onClick={e => saveNewProductDetail(e)} className="at-btn mt-3 me-2" />
          <input type="button" value="Hủy" onClick={() => cancelProductDetail()} className="at-btn-secondary mt-3" />
        </div>

        <div className="col-9">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">SKU</th>
                <th className="text-center">Kích thước</th>
                <th className="text-center">Đơn giá</th>
                <th></th>
              </tr>
            </thead>

            <tbody className="table-group-divider">
              {renderTable(detail)}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )

  async function populateProductDetailData(colorId) {
    fetch(`/api/productdetail/get?id=${colorId}`).then(response => response.json()).then(data => setDetail(detail = data));
  }

  function cancelProductDetail() {
    setPSKU("");
    setPSize("");
    setPPrice("");
    setPNote("");
    setPSizeError("");
    setPPriceError("");
    setPNoteError("");
  }

  async function deleteProductDetail(id, isActive) {
    const action = isActive ? "khóa" : "mở khóa"
    if (confirm(`Bạn có chắc chắn ${action} chi tiết sản phẩm này?`)) {
      const url = isActive ? `/api/productdetail/lock?id=${id}` : `/api/productdetail/unlock?id=${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ id })
      })

      if (response.ok) { alert(`Chi tiết sản phẩm đã ${action} thành công.`); location.reload(); }
      else alert(`Đã có lỗi xảy ra. Chi tiết sản phẩm đã ${action} thất bại.`)
    }
  }

  async function saveNewProductDetail(e) {
    e.preventDefault();
    if (pSKU !== "") updateProductDetail();

    else {
      let temp = `${colorId}`;
      while (temp.length < 5) temp = '0' + temp;
      setPSKU(temp + pSize);
      addProductDetail();
    }
  }

  async function addProductDetail() {
    if (confirm("Bạn có chắc chắn thêm chi tiết này?")) {
      const response = await fetch("/api/productdetail/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ productId: id, productColorId: colorId, sku: pSKU, price: Number(pPrice) || 0, size: pSize, note: pNote })
      });

      if (response.ok) { alert("Chi tiết sản phẩm đã thêm thành công"); location.reload() }
      else if (response.status === 400) {
        const data = await response.json();
        setPSKU("");
        setPSizeError(data.errors[0]);
        setPPriceError(data.errors[1]);
        setPNoteError(data.errors[2]);
      }
      else alert("Đã có lỗi xảy ra, chi tiết đã thêm thất bại");
    }

  }

  async function updateProductDetail() {
    if (confirm("Bạn có chắc chắn cập nhật chi tiết này?")) {
      const response = await fetch("/api/productdetail/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ productId: id, productColorId: colorId, sku: pSKU, price: Number(pPrice) || 0, size: pSize, note: pNote })
      });

      if (response.ok) { alert("Chi tiết sản phẩm đã cập nhật thành công"); location.reload() }
      else if (response.status === 400) {
        const data = await response.json();
        setPSizeError(data.errors[0]);
        setPPriceError(data.errors[1]);
        setPNoteError(data.errors[2]);
      }
      else alert("Đã có lỗi xảy ra, chi tiết đã cập nhật thất bại");
    }
  }
}