import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import AdminTextBox from "/src/Admin/Components/AdminTextBox";

export default function AdminUserList({users, roles}) {
  const [show, setShow] = useState(false);
  let [role, setRole] = useState(users.map(r => r.roleId));
  let [userList, setUserList] = useState(users);
  let [rSearch, setRSeach] = useState("");
  let [aFullName, setAFullName] = useState("");
  let [aPhone, setAPhone] = useState("");
  let [aEmail, setAEmail] = useState("");
  let [aRoleId, setARoleId] = useState(-1);

  let [aFullNameError, setAFullNameError] = useState("");
  let [aPhoneError, setAPhoneError] = useState("");
  let [aEmailError, setAEmailError] = useState("");
  let [aRoleIdError, setARoleIdError] = useState("");
  
  const handleHide = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRoleChange = (e,i) => {
    const newRole = [...role.splice(0, i), e.target.value, ...role.splice(i+1)];
    setRole(newRole);
  }

  function renderModal() {  
    return (
      <Modal show={show} onHide={handleHide} animation={false} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title><b>Thêm nhân viên mới</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <AdminTextBox type="text" detail="name" onChange={e => setAFullName(e.target.value)} value={aFullName} errorValue={aFullNameError} placeholder="Họ tên" />
            <AdminTextBox type="text" detail="phone" onChange={e => setAPhone(e.target.value)} value={aPhone} errorValue={aPhoneError} placeholder="Số điện thoại" />
            <AdminTextBox type="text" detail="email" onChange={e => setAEmail(e.target.value)} value={aEmail} errorValue={aEmailError} placeholder="Email" />
            <AdminTextBox type="select" detail="role" placeholder="Vai trò" value={aRoleId} onChange={e => setARoleId(e.target.value)} list={role} errorValue={aRoleIdError} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="small-at-btn" onClick={insertAdmin}>Thêm nhân viên</button>
          <button className="small-at-btn-secondary" onClick={handleHide}>Hủy</button>
        </Modal.Footer>
      </Modal>
    )
  }

  function renderList() {
    return (
      userList.map((u, i) =>
        <tr key={i}>
          <td className="align-middle">{u.id}</td>
          <td className="align-middle">{u.fullName}</td>
          <td className="align-middle">
            {
              <select value={role[i]} onChange={e => handleRoleChange(e, i)} disabled={!u.isActive}>
                {
                  roles.map(r => <option key={`${i}_${r.id}`} value={r.id}>{r.name}</option>)
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
    <>
      <div className="col-8">
        <div className="d-flex c-10">
          <button className="small-at-sbtn" onClick={handleShow}><i className="bi bi-plus"></i></button>
          
          <div className="d-flex w-100">
            <AdminTextBox type="search" placeholder="Nhập tên nhân viên cần tìm..." value={rSearch} onChange={e => setRSeach(rSearch = e.target.value)} onKeyDown={findData} />
            <button className="small-at-sbtn"><i className="bi bi-search"></i></button>
          </div>
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
      {renderModal()}
    </>
  )

  async function findData() {
    if (rSearch == "") setUserList(users);
    else setUserList(users.filter(u => u.fullName.toLowerCase().includes(rSearch.toLowerCase())))
  }

  async function insertAdmin() {
    if (confirm("Bạn có muốn thêm nhân viên mới?")) {
      const response = await fetch(`/api/permission/adminuser/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({fullName: aFullName, phone: aPhone, email: aEmail, roleId: aRoleId})
      });
  
      if (response.ok) { alert("Lưu vai trò của nhân viên thành công"); location.reload(); }
      else if (response.status === 400) {
        const data = await response.json();
        setAFullNameError(aFullNameError = data.errors[0]);
        setAPhoneError(aPhoneError = data.errors[1]);
        setAEmailError(aEmailError = data.errors[2]);
        setARoleIdError(aRoleIdError = data.errors[3]);
      }
      else { alert("Đã có lỗi xảy ra, lưu vai trò của nhân viên thất bại" )}
    }
  }
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