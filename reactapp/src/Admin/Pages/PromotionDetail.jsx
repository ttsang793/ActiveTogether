import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { DisplayDate } from "/src/Scripts/Utility"
import AdminTextBox from "/src/Admin/Components/AdminTextBox";
import PleaseWait from "/src/shared/PleaseWait";

export default function APromotionDetail() {
  const { id } = useParams();
  const hasLoad = useRef(false);
  let [product, setProduct] = useState([]);
  const [productId, setProductId] = useState(1);
  const [saleProduct, setSaleProduct] = useState([]);
  const [promotion, setPromotion] = useState({});

  useEffect(() => {
    if (hasLoad.current) return;
    populateSaleProductList(Number(id));
  }, []);

  const handleSaleProducts = () => {
    if (document.getElementById("percent").value === "") {
      alert("Vui lòng nhập phần trăm giảm giá");
      return;
    }

    const index = (saleProduct.length > 0) ? saleProduct.findIndex(s => s.id === productId) : -1;
    const percent = Number(document.getElementById("percent").value);
    const p = product.find(p => p.id === productId);
    var newSaleProduct;
    if (index === -1) newSaleProduct = [...saleProduct, { id: p.id, name: p.name, percent: percent / 100 }]
    else newSaleProduct = [...saleProduct.slice(0, index), { id: p.id, name: p.name, percent: percent / 100 }, ...saleProduct.slice(index + 1)];
    setSaleProduct(newSaleProduct);
    document.getElementById("percent").value = "";
  }

  const handleIdChange = e => setProductId(Number(e.target.value));

  const renderSaleProducts = () => {
    return saleProduct.map((a, i) =>
      <tr key={i}>
        <td className="align-middle">{a.id}</td>
        <td className="align-middle">{a.name}</td>
        <td className="align-middle">{Math.round(a.percent * 100)}%</td>
        <td className="align-middle">
          <i className="bi-x" onClick={e => deleteSaleProducts(e, i)}></i>
        </td>
      </tr>
    )
  }

  function deleteSaleProducts(e, i) {
    e.preventDefault();

    const newSaleProduct = [...saleProduct.slice(0, i), ...saleProduct.slice(i + 1)];
    setSaleProduct(newSaleProduct);

    renderSaleProducts();
  }

  const populateSaleProductList = async (id) => {
    try {
      const productResponse = await fetch(`/api/product/get`);
      const productData = await productResponse.json();
      setProduct(productData);

      const promotionResponse = await fetch(`/api/promotion/get?id=${id}`);
      const promotionData = await promotionResponse.json();
      setPromotion(promotionData);

      const promotionDetailResponse = await fetch(`/api/promotiondetail/get?id=${id}`);
      const promotionDetailData = await promotionDetailResponse.json();
      const newSaleProduct = [];
      promotionDetailData.forEach(pr => newSaleProduct.push({ id: pr.productId, name: productData.find(p => p.id == pr.productId).name, percent: pr.percent }));
      setSaleProduct(newSaleProduct);
    }
    catch (err) {
      console.error(err);
    }
    finally {
      hasLoad.current = true;
    }
  }

  return (!hasLoad.current) ? <PleaseWait /> : (
    <main>
      <h1 className="flex-grow-1 text-center fw-bold">DANH SÁCH SẢN PHẨM KHUYẾN MÃI</h1>
      <hr />

      <AdminTextBox type="text" detail="id" value={promotion.id} readOnly placeholder="Mã chương trình" />
      <AdminTextBox type="text" detail="name" value={promotion.title} readOnly placeholder="Tên chương trình" />
      <AdminTextBox type="text" detail="date-start" value={DisplayDate(promotion.dateStart)} readOnly placeholder="Ngày bắt đầu" />
      <AdminTextBox type="text" detail="date-end" value={DisplayDate(promotion.dateEnd)} readOnly placeholder="Ngày kết thúc" />

      <hr />
      <div className="fw-semibold mb-1">Danh sách sản phẩm:</div>
      <div className="d-flex c-10">
        <select id="product-list" className="form-control" defaultValue={productId} onChange={handleIdChange}>
          {
            product.map(p => (<option key={p.id} value={p.id}>{p.id} - {p.name}</option>))
          }
        </select>
        <input className="form-control w-120px" id="percent" type="number" min="5" max="95" placeholder="5 - 95%" />
        <button className="small-at-btn" onClick={handleSaleProducts}>Thêm</button>
      </div>
      <table className="table table-hover table-striped w-100 mt-2">
        <thead className="text-center">
          <tr>
            <th className="w-10">Mã SP</th>
            <th>Tên sản phẩm</th>
            <th className="w-25">Giảm giá</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderSaleProducts()}
        </tbody>
      </table>

      <input type="button" value="Lưu" className="small-at-btn me-2" onClick={savePromotion} />
      <input type="button" value="Hủy" className="small-at-btn-secondary" onClick={() => location.href = "/admin/giam-gia"} />
    </main>
  );

  async function savePromotion(e) {
    e.preventDefault();
    if (saleProduct.length === 0) {
      alert("Vui lòng chọn sản phẩm khuyến mãi!");
      return;
    }

    if (confirm("Bạn có chắc chắn lưu các sản phẩm được khuyến mãi?")) {
      const promotionDetails = [];
      saleProduct.forEach(s => promotionDetails.push({ promotionId: id, productId: s.id, percent: s.percent }));

      const response = await fetch("/api/promotiondetail/update", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ id, promotionDetails })
      });

      if (response.ok) { alert("Lưu các sản phẩm thành công."), location.href = "/admin/giam-gia" }
      else alert("Đã có lỗi xảy ra, lưu các sản phẩm thất bại!");
    }
  }
}