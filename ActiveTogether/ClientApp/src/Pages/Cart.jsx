import "./Cart.css";
import ItemRow from "/src/Components/ItemRow";
import phd from "/src/img/placeholder.png";

export default function Cart() {
  return (
    <main>    
      <h1 className="flex-grow-1 text-center fw-bold">GIỎ HÀNG</h1>
      <hr />

      <table className="text-center table table-bordered cart-table">
        <thead>
          <tr>
            <th width="3%"><input type="checkbox" name="" id="" /></th>
            <th width="20%">Hình ảnh</th>
            <th width="45%">Tên sản phẩm</th>
            <th width="10%">Số lượng</th>
            <th width="15%">Giá</th>
            <th width="7%"></th>
          </tr>
        </thead>

        <tbody>
          <ItemRow image={phd} title="Giày Adidas" currentPrice={20000} quantity={1} />
        </tbody>
      </table>

      <div className="text-center">
        <input type="button" value="Thanh toán" className="btn btn-success mx-1" />
        <input type="button" value="Xóa giỏ hàng" className="btn btn-danger mx-1" />
      </div>
    </main>
  )
}