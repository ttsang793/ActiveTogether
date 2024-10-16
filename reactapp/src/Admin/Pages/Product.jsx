export default function Product() {
  return (
    <main>
      <h1 className="flex-grow-1 text-center fw-bold">SẢN PHẨM</h1>
      <hr />

      <div className="d-flex c-10">
        <input type="text" className="form-control" readOnly placeholder="Mã loại" />
        <input type="text" className="form-control" placeholder="Tên loại" />
        
        <input type="submit" value="Lưu" className="at-btn" />
      </div>

      <table className="table table-striped table-bordered mt-3">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Tên loại</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
        </tbody>
      </table>
    </main>
  )
}