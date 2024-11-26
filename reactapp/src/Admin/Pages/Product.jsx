import "./Product.css"
import { Component } from "react";
import { CamelToKebab } from "/src/Scripts/Utility";
import PleaseWait from "/src/Shared/PleaseWait";

export default class AProduct extends Component {
  static displayName = AProduct.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, product: [], sport: [], category: [], brand: [], pId: "", pName: "", pBrandId: "", pCategoryId: "", pDesc: "", pGender: 0, pIsChildren: false, pSport: []}
  }

  componentDidMount = () => {
    this.populateBrandData();
    this.populateCategoryData();
    this.populateSportData();
    this.populateProductData();
  }

  handleClick(p) {
    this.setState(
      {
        pId: p.id,
        pName: p.name,
        pBrandId: p.brandId,
        pCategoryId: p.categoryId,
        pDesc: p.description,
        pGender: p.gender,
        pIsChildren: p.isChildren,
        pSport: p.productSports.map(p => p.sportId)
      }
    )
  }

  cancelProduct() {
    this.setState({pId: "", pName: "", pBrandId: "", pCategoryId: "", pDesc: "", pGender: 0, pIsChildren: false, pSport: []})
  }

  handleBrandChange(e) {
    this.setState({ pBrandId: e.target.value })
  }

  handleCategoryChange(e) {
    this.setState({ pCategoryId: e.target.value })
  }

  handleGenderChange(e) {
    this.setState({ pGender: e.target.value })
  }

  handleSportChange(e, sportId) {
    const { pSport } = this.state;
  
    if (e.target.checked) this.setState({ pSport: [...pSport, sportId] });
    else this.setState({ pSport: pSport.filter(id => id !== sportId) });
  }

  renderImage(product) {
    try {
      return product.productColors[0].productImages[0].image;
    }
    catch {
      return "/src/images/product/default.png";
    }
  }

  renderTable(products) {
    return (
      <>
        {
          products.map(p =>
            <tr key={p.id}>
              <td className="align-middle">
                <img src={this.renderImage(p)} alt={p.name} className="product-thumbnail" />
              </td>
              <td className="align-middle">{p.id}</td>
              <td className="align-middle">{p.name}</td>
              <td className="align-middle">
                <a href={`/admin/thong-tin-san-pham/${p.id}`}>
                  <i className="bi bi-eye"></i>
                </a>
                <i className="bi bi-gear" onClick={() => this.handleClick(p)}></i>
                <i className={`bi bi-${p.isActive ? "lock" : "unlock"}`} onClick={() => deleteProduct(p.id, p.isActive)}></i>
              </td>
            </tr>
          )
        }
      </>
    )
  }

  render() {
    return this.state.loading ? <PleaseWait /> : (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">SẢN PHẨM</h1>
        <hr />

        <div className="row">
          <div className="col-3">
            <input type="text" value={this.state.pId} className="form-control" readOnly placeholder="Mã sản phẩm" />
            <input type="text" onChange={(e) => this.setState({ pName: e.target.value })} value={this.state.pName} className="form-control mt-3" placeholder="Tên sản phẩm" />

            <div className="mt-3">
              <select className="form-control" value={this.state.pBrandId} onChange={e => this.handleBrandChange(e)}>
                <option value="" disabled selected hidden>Thương hiệu</option>
                {
                  this.state.brand.map(b => <option key={b.id} value={b.id}>{b.id} - {b.name}</option>)
                }
              </select>
            </div>

            <div className="mt-3">
              <select className="form-control" value={this.state.pCategoryId} onChange={e => this.handleCategoryChange(e)}>
                <option value="" disabled selected hidden>Loại sản phẩm</option>
                {
                  this.state.category.map(c => <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)
                }
              </select>
            </div>

            <div className="mt-3">
              <select className="form-control" value={this.state.pGender} onChange={e => this.handleGenderChange(e)}>
                <option value="" disabled selected hidden>Giới tính</option>
                <option value="0">Nữ</option>
                <option value="1">Nam</option>
                <option value="2">Unisex</option>
              </select>
            </div>
            
            <div className="mt-3 form-control">
              <input type="checkbox" id="0" checked={this.state.pSport.includes(0)} onChange={(e) => this.handleSportChange(e, s.id)} /> Tất cả
              {
                this.state.sport.map(s => { return (
                  <div key={s.name}>
                    <input type="checkbox" id={`sport-${s.id}`} checked={this.state.pSport.includes(s.id)} onChange={(e) => this.handleSportChange(e, s.id)} /> {s.name}
                  </div>
                )})
              }
            </div>

            <textarea placeholder="Mô tả" className="form-control mt-3" style={{ height: "100px" }} onChange={(e) => this.setState({ pDesc: e.target.value })} value={this.state.pDesc}></textarea>

            <div className="mt-3 form-control">
              <input type="checkbox" checked={this.state.pIsChildren} onChange={e => this.setState({ pIsChildren: e.target.checked })} /> Sản phẩm có size trẻ em
            </div>
            
            <input type="submit" value="Lưu" onClick={e => this.saveNewProduct(e)} className="at-btn mt-3 me-2" />
            <input type="button" value="Hủy" onClick={() => this.cancelProduct()} className="at-btn-secondary mt-3" />
          </div>

          <div className="col-9">
            <div className="d-flex">
              <input type="search" className="form-control" placeholder="Nhập tên sản phẩm cần tìm..." />
              <button className="small-at-sbtn"><i className="bi bi-search"></i></button>
            </div>

            <table className="table table-striped table-bordered table-hover mt-3">
              <thead>
                <tr>
                  <th className="text-center w-10"></th>
                  <th className="text-center w-10">ID</th>
                  <th className="text-center">Tên sản phẩm</th>
                  <th className="w-120px"></th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {this.renderTable(this.state.product)}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }

  async populateProductData() {
    fetch("/api/product/get").then(response => response.json()).then(data => this.setState({ loading: false, product: data }));
  }

  async populateBrandData() {
    fetch("/api/brand/get").then(response => response.json()).then(data => this.setState({brand: data}));
  }

  async populateCategoryData() {
    fetch("/api/category/get").then(response => response.json()).then(data => this.setState({category: data}));
  }

  async populateSportData() {
    fetch("/api/sport/get").then(response => response.json()).then(data => this.setState({sport: data}));
  }

  async saveNewProduct(e) {
    e.preventDefault();
    this.state.pId === "" ? this.addProduct() : this.updateProduct();
  }
  
  async addProduct() {
    if (confirm("Bạn có chắc chắn thêm sản phẩm này?")) {
      const response = await fetch("/api/product/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.product.length + 1,
          name: this.state.pName,
          urlName: CamelToKebab(this.state.pName),
          brandId: this.state.pBrandId,
          categoryId: this.state.pCategoryId,
          description: this.state.pDesc,
          gender: this.state.pGender,
          isChildren: this.state.pIsChildren,
          sportId: this.state.pSport
        })
      });
  
      if (response.ok) { alert("Sản phẩm đã thêm thành công"), location.reload() }
      else alert("Đã có lỗi xảy ra, sản phẩm đã thêm thất bại");
    }  
  }
  
  async updateProduct() {
    if (confirm("Bạn có chắc chắn cập nhật sản phẩm này?")) {
      const response = await fetch("/api/product/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.pId,
          name: this.state.pName,
          urlName: CamelToKebab(this.state.pName),
          brandId: this.state.pBrandId,
          categoryId: this.state.pCategoryId,
          description: this.state.pDesc,
          gender: this.state.pGender,
          isChildren: this.state.pIsChildren,
          sportId: this.state.pSport
        })
      });
  
      if (response.ok) { alert("Sản phẩm đã cập nhật thành công"), location.reload() }
      else alert("Đã có lỗi xảy ra, sản phẩm đã cập nhật thất bại");
    }  
  }
}

async function deleteProduct(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} sản phẩm này?`)) {
    const url = isActive ? `/api/product/lock?id=${id}` : `/api/product/unlock?id=${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ id })
    })

    if (response.ok) { alert(`Sản phẩm đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Sản phẩm đã ${action} thất bại.`)
  }
}