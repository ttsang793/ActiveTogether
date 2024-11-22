import React, { Component } from "react"

export default class ASport extends Component {
  static displayName = ASport.name;

  constructor(props) {
    super(props);
    this.state = {sport: [], sId: "", sName: ""}
  }

  componentDidMount() { this.populateSportData() }

  async saveNewSport(e) {
    e.preventDefault();
    (this.state.sId !== "") ? updateSport(this.state.sId, this.state.sName) : addSport(this.state.sName);
  }

  renderTable(sports) {
    return (
      <>
        {
          sports.map(s => 
            <tr key={s.id} onClick={() => this.setState({sId: s.id, sName: s.name})}>
              <td className="align-middle">{s.id}</td>
              <td className="align-middle">{s.name}</td>
              <td>
                <button className="small-at-btn" onClick={() => deleteSport(s.id, s.isActive)}>{s.isActive ? "Khóa" : "Mở khóa"}</button>
              </td>
            </tr>
          )
        }
      </>
    )
  }

  render() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">CÁC MÔN THỂ THAO</h1>
        <hr />

        <div className="d-flex c-10">
          <input type="text" value={this.state.sId} className="form-control" readOnly placeholder="Mã môn thể thao" />
          <input type="text" onChange={(e) => this.setState({sName: e.target.value})} value={this.state.sName} className="form-control" placeholder="Tên môn thể thao" />
          
          <input type="submit" value="Lưu" onClick={e => this.saveNewSport(e)} className="at-btn" />
        </div>

        <table className="table table-striped table-hover pointer table-bordered mt-3">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Tên môn thể thao</th>
              <th className="w-10"></th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {this.renderTable(this.state.sport)}
          </tbody>
        </table>
      </main>
    )
  }

  async populateSportData() {
    fetch("/api/sport/All").then(response => response.json()).then(data => this.setState({sport: data}));
  }
}

async function addSport(name) {
  if (confirm("Bạn có chắc chắn thêm môn thể thao này?"))  {
    const response = await fetch("/api/sport/Add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({name})
    })

    if (response.ok) { alert("Thêm môn thể thao thành công."); location.reload(); }
    else alert("Đã có lỗi xảy ra. Thêm môn thể thao thất bại.")
  }
}

async function updateSport(id, name) {
  if (confirm("Bạn có chắc chắn cập nhật môn thể thao này?"))  {
    const response = await fetch(`/api/sport/Update?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id, name})
    })

    if (response.ok) { alert("Cập nhật môn thể thao thành công."); location.reload(); }
    else alert("Đã có lỗi xảy ra. Cập nhật môn thể thao thất bại.")
  }
}

async function deleteSport(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} môn thể thao này?`)) {
    const response = await fetch(`/api/sport/Delete?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id})
    })

    if (response.ok) { alert(`Môn thể thao đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Môn thể thao đã ${action} thất bại.`)
  }
}