import { Component } from "react"
import { CamelToKebab } from "/src/Components/Utility";

export default class AProductDetail extends Component {
  static displayName = AProductDetail.name;

  constructor(props) {
    super(props);
    this.state = { sport: [], category: [], brand: [], show: false, pId: "", pName: "", pBrandId: "1", pCategoryId: "1",
      pDesc: "", pSize: "", pGender: 0, pSport: [], pPrice: [{ color: "", image: "", price: "" }] }
  }

  componentDidMount() {
    this.populateBrandData();
    this.populateCategoryData();
    this.populateSportData();

    if (location.search.includes("?id=")) this.populateProductDetail(location.search.substring(4));
  }

  addColorInput() {
    const newPrice = [...this.state.pPrice, { color: "", image: "", price: "" }];
    this.setState({ pPrice: newPrice });
    const i = this.state.pPrice.length - 1;

    return (
      <div>
        <input type="text" value={this.state.pPrice[i].color} onChange={e => this.handlePriceChange(e, i)} className="form-control color d-inline mb-3 me-4" style={{ width: "100px" }} />
        <input type="text" value={this.state.pPrice[i].image} onChange={e => this.handlePriceChange(e, i)} className="form-control image w-50 d-inline mb-3 me-4" />
        <input type="text" value={this.state.pPrice[i].price} onChange={e => this.handlePriceChange(e, i)} className="form-control price w-50 d-inline mb-3" style={{ width: "100px" }} />
      </div>
    )
  }

  renderColorInputs() {
    if (this.state.pPrice.length === 0) return this.addColorInput();
    else return this.state.pPrice.map((p, i) =>
      <div key={p.id}>
        <input type="text" value={p.color} onChange={e => this.handlePriceChange(e, i)} className="form-control color d-inline mb-3 me-4" style={{ width: "100px" }} />
        <input type="text" value={p.image} onChange={e => this.handlePriceChange(e, i)} className="form-control image w-50 d-inline mb-3 me-4" />
        <input type="text" value={p.price} onChange={e => this.handlePriceChange(e, i)} className="form-control price d-inline mb-3" style={{ width: "100px" }} />
      </div>
    )
  }

  handleBrandChange(e) {
    this.setState({ pBrandId: e.target.value })
  }

  handleCategoryChange(e) {
    this.setState({ pBrandId: e.target.value })
  }

  handleSportChange(e, i) {
    const newSport = (e.target.checked) ? [...this.state.pSport, i + 1] : this.state.pSport.filter(s => s !== this.state.pSport[i]);
    this.setState({ pSport: newSport });
    return e.target.checked;
  }
  
  handlePriceChange(e, index) {
    const newPrice = this.state.pPrice.map((p, i) => {
      if (i === index) {
        if (e.target.classList.contains("color")) p.color = e.target.value;
        else if (e.target.classList.contains("image")) p.image = e.target.value;        
        else p.price = e.target.value;
      }
      return p;
    })

    this.setState({ pPrice: newPrice });
  }


  render() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">{location.search.includes("?id=") ? "SỬA" : "THÊM"} SẢN PHẨM</h1>
        <hr />

        <input type="text" className="form-control mb-2" value={this.state.pId} readOnly placeholder="Mã sản phẩm" />
        <input type="text" className="form-control mb-2" onChange={(e) => this.setState({pName: e.target.value})} value={this.state.pName} placeholder="Tên sản phẩm" autoFocus />

        <div className="mb-2">
          Thương hiệu:
          <select className="form-control">
          {
            this.state.brand.map(b => <option key={b.id} value={b.id} onChange={e => this.handleBrandChange(e)}>{b.id} - {b.name}</option>)
          }
          </select>
        </div>

        <div className="mb-2">
          Loại sản phẩm:
          <select className="form-control">
            {
              this.state.category.map(c => <option key={c.id} value={c.id} onChange={e => this.handleCategoryChange(e)}>{c.id} - {c.name}</option>)
            }
          </select>
        </div>

        <textarea placeholder="Mô tả" className="form-control mb-2" style={{ height: "100px" }} onChange={(e) => this.setState({pDesc: e.target.value})} value={this.state.pDesc}></textarea>
        <input type="text" className="form-control mb-2" placeholder="Kích thước" onChange={(e) => this.setState({pSize: e.target.value})} value={this.state.pSize} />

        <div className="mb-2">
          Môn thể thao: <br />
          {
            this.state.sport.map((s,i) => { return (
              <div key={s.name}>
                <input type="checkbox" id={`sport-${s.id - 1}`} defaultChecked={this.state.pSport.includes(s.id)} onChange={e => this.handleSportChange(e, i)} /> {s.name}
              </div>
            )})
          }
        </div>

        <div className="mb-2">
          Giới tính:<br />
          <input type="radio" name="product-gender" checked={this.state.pGender === 0} onChange={() => this.setState({pGender: 0})} /> Nam<br />
          <input type="radio" name="product-gender" checked={this.state.pGender === 1} onChange={() => this.setState({pGender: 1})} /> Nữ<br />
          <input type="radio" name="product-gender" checked={this.state.pGender === 2} onChange={() => this.setState({pGender: 2})} /> Unisex (hoặc không có)<br />
        </div>

        <div id="color-input">
          Danh sách màu và giá: <button onClick={() => this.addColorInput()}>+</button>
          { this.renderColorInputs() }
        </div>

        <input type="button" value="Lưu" className="small-at-btn me-2" onClick={e => this.saveNewProduct(e)} />
        <input type="button" value="Hủy" className="small-at-btn-secondary" onClick={() => location.href = "/admin/san-pham"} />
      </main>
    )
  }

  async populateBrandData() {
    fetch("/api/brand/All").then(response => response.json()).then(data => this.setState({brand: data}));
  }

  async populateCategoryData() {
    fetch("/api/category/All").then(response => response.json()).then(data => this.setState({category: data}));
  }

  async populateSportData() {
    fetch("/api/sport/All").then(response => response.json()).then(data => this.setState({sport: data}));
  }

  async populateProductDetail(id) {
    fetch(`/api/product?id=${id}`).then(response => response.json()).then(data => this.setState({
      pId: data.id, pName: data.name, pDesc: (data.description == null) ? "" : data.description, pSize: data.size, pGender: data.gender, pSport: data.sport
    }));

    fetch(`/api/product/price?id=${id}`).then(response => response.json()).then(data => {
      this.setState({ pPrice: data })
    });
  }

  async saveNewProduct(e) {
    e.preventDefault();
    (this.state.pId === "") ? this.addProduct() : this.updateProduct();
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
          name: this.state.pName,
          urlName: CamelToKebab(this.state.pName),
          brandId: this.state.pBrandId,
          categoryId: this.state.pCategoryId,
          description: (this.state.pDesc === undefined) ? "" : this.state.pDesc,
          size: this.state.pSize,
          gender: this.state.pGender,
          productsports: this.state.pSport,
          productprices: this.state.pPrice
        })
      });
  
      if (response.ok) { alert("Sản phẩm đã thêm thành công"), location.href = "/admin/san-pham" }
      else alert("Đã có lỗi xảy ra, sản phẩm đã thêm thất bại");
    }  
  }
  
  async updateProduct() {
    if (confirm("Bạn có chắc chắn cập nhật sản phẩm này?")) {
    }
  }
}