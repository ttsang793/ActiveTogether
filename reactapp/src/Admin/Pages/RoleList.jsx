export default function RoleList({roles}) {
  console.log(roles);

  function renderRoleList() {
    return (
      roles.map((r, i) => 
        <tr key={i}>
          <td className="align-middle">{r.id}</td>
          <td className="align-middle">{r.name}</td>
          <td className="align-middle">
            <a href={`/admin/chi-tiet-vai-tro?id=${r.id}`}>
              <i className={`bi bi-gear`}></i>
            </a>
          </td>
        </tr>
      )
    )
  }

  return (
    <div className="col-4">
      <div>
        <a href="/admin/chi-tiet-vai-tro">
          <button className="at-btn"><i className="bi bi-plus-circle"></i> Tạo vai trò mới</button>
        </a>
      </div>

      <table className="table table-striped table-hover pointer table-bordered mt-3">
        <thead>
          <tr>
            <th className="text-center w-10">ID</th>
            <th className="text-center">Vai trò</th>
            <th className="w-120px"></th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
          {renderRoleList()}
        </tbody>
      </table>
    </div>
  )
}