import React, { Component } from "react";

export default class RoleDetail extends Component {
  static DisplayName = RoleDetail.name;

  constructor(props) {
    super(props);
    const params = new URLSearchParams(location.search);
    const id = params.get("id") === null ? "" : params.get("id");

    this.state = { addId: "", rId: id, rName: "", rPermission: [], permission: [] }
  }

  componentDidMount() {
    this.populatePermissionList();
    if (this.state.rId !== "") this.populateRolePermissionData();
  }

  handlePermissionChange(e, permissionId) {
    const { rPermission } = this.state;
  
    if (e.target.checked) this.setState({ rPermission: [...rPermission, permissionId] });
    else this.setState({ rPermission: rPermission.filter(id => id !== permissionId) });
  }

  render() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">QUYỀN CỦA VAI TRÒ</h1>
        <hr />
        
        <input type="text" value={this.state.rId} className="form-control" readOnly placeholder="Mã vai trò" />
        <input type="text" onChange={(e) => this.setState({ rName: e.target.value })} value={this.state.rName} className="form-control mt-3" placeholder="Tên vai trò" />

        <div className="row form-control m-0 mt-3 d-flex">
          {
            this.state.permission.map((p, i) =>
              <div className="col-3 my-2 text-justify" key={i}>
                <input type="checkbox" className="me-2" checked={this.state.rPermission.includes(i + 1)} onChange={e => this.handlePermissionChange(e, i + 1)} />{p.name}
              </div>
            )
          }
        </div>

        <div className="text-center">
          <input type="submit" value="Lưu" onClick={() => this.saveRole()} className="at-btn mt-3 me-2" />
          <input type="button" value="Hủy" onClick={() => location.href = "/admin/phan-quyen"} className="at-btn-secondary mt-3" />
        </div>

      </main>
    )
  }

  async saveRole() {
    this.state.rId === "" ? this.addRole() : this.updateRole();
  }

  async addRole() {
    if (confirm("Bạn có muốn thêm vai trò mới?")) {
      const response = await fetch("/api/permission/role/insert", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ id: this.state.addId, name: this.state.rName, permissionIds: this.state.rPermission })
      });
  
      if (response.ok) { alert("Vai trò đã thêm thành công"); location.href = "/admin/phan-quyen" }
      else alert("Đã có lỗi xảy ra, vai trò đã thêm thất bại");
    }
  }

  async updateRole() {
    if (confirm("Bạn có muốn cập nhật vai trò này?")) {
      const response = await fetch("/api/permission/role/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ id: this.state.rId, name: this.state.rName, permissionIds: this.state.rPermission })
      });
  
      if (response.ok) { alert("Vai trò đã cập nhật thành công"); location.href = "/admin/phan-quyen" }
      else alert("Đã có lỗi xảy ra, vai trò đã cập nhật thất bại");
    }
  }

  async populatePermissionList() {
    fetch(`/api/permission/get`).then(response => response.json()).then(data => this.setState({ permission: data }));
    fetch('/api/permission/role/get').then(reponse => reponse.json()).then(data => this.setState({ addId: data.length + 1 }))
  }

  async populateRolePermissionData() {
    fetch(`/api/permission/role/getpermission?id=${this.state.rId}`).then(response => response.json())
      .then(data => this.setState({ rName: data.name, rPermission: data.rolePermissions.map(r => r.permissionId) }))
  }
}