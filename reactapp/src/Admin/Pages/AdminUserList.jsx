import { useState } from 'react';

export default function AdminUserList({users, roles}) {
  let [role, setRole] = useState(users.map(r => r.roleId));
  const handleRoleChange = (e,i) => {
    const newRole = [...role.splice(0, i), e.target.value, ...role.splice(i+1)];
    setRole(newRole);
  }

  function renderList() {
    return (
      users.map((u, i) => 
        <tr key={i}>
          <td className="align-middle">{u.id}</td>
          <td className="align-middle">{u.fullName}</td>
          <td className="align-middle">
            {
              !u.isActive ? roles[u.roleId].name :
              <select value={role[i]} onChange={e => handleRoleChange(e, i)}>
                {
                  roles.map(r => <option value={r.id}>{r.name}</option>)
                }
              </select>
            }
          </td>
          <td className="align-middle">
            {
              !u.isActive ? <></> : 
              <>
                <i className={`bi bi-floppy`} onClick={() => saveRole(u.id, u.roleId)}></i>
                <i className={`bi bi-lock`} onClick={() => lockEmployee(u.id)}></i>
              </>
            }
          </td>
        </tr>
      )
    )
  }

  return (
    <div className="col-8">
      <div className="d-flex">
        <input type="search" className="form-control" placeholder="Nhập tên nhân viên cần tìm..." />
        <button className="small-at-sbtn"><i className="bi bi-search"></i></button>
      </div>

      <table className="table table-striped table-hover table-bordered mt-3">
        <thead>
          <tr>
            <th className="text-center align-middle w-120px">ID</th>
            <th className="text-center align-middle">Tên nhân viên</th>
            <th className="text-center align-middle w-25">Vai trò</th>
            <th className="w-120px"></th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
          {renderList()}
        </tbody>
      </table>
    </div>
  )
}

async function saveRole(id, roleId) {
  if (confirm("Bạn có muốn gán cho nhân viên vai trò này?")) {
    const response = await fetch(`/api/permission/adminuser/updaterole?id=${id}&roleId=${roleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({id, roleId})
    });

    if (response.ok) { alert("Lưu vai trò của nhân viên thành công"); location.reload(); }
    else { alert("Đã có lỗi xảy ra, lưu vai trò của nhân viên thất bại" )}
  }
}

async function lockEmployee(id) {
  if (confirm("Bạn có muốn khóa nhân viên? Bạn chỉ nên làm vậy khi nhân viên chính thức nghỉ việc!")) {
    const response = await fetch(`/api/permission/adminuser/lock?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({id})
    });

    if (response.ok) { alert("Khóa nhân viên thành công"); location.reload(); }
    else { alert("Đã có lỗi xảy ra, khóa nhân viên thất bại" )}
  }
}