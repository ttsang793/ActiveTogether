import React, { Component } from "react"
import PleaseWait from "/src/Shared/PleaseWait"
import RoleList from "./RoleList";
import AdminUserList from "./AdminUserList";

export default class APromotion extends Component {
  static displayName = APromotion.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, user: [], role: [] }
  }

  componentDidMount() {
    this.populateData();
  }

  render() {
    return this.state.loading ? <PleaseWait /> : (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">PHÂN QUYỀN</h1>
        <hr />

        <div className="row">
          <RoleList roles={this.state.role} />
          <AdminUserList users={this.state.user} roles={this.state.role} />
        </div>
      </main>
    )
  }

  async populateData() {
    const userResponse = await fetch('/api/permission/adminuser/get');
    if (!userResponse.ok) throw new Error('Network response was not ok');
    const userData = await userResponse.json();

    const roleResponse = await fetch('/api/permission/role/get');
    if (!roleResponse.ok) throw new Error('Network response was not ok');
    const roleData = await roleResponse.json();

    this.setState({ loading: false, user: userData, role: roleData });
  }
}