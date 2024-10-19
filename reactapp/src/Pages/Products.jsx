import ProductGrid from "/src/Components/ProductGrid"
import FilterList from "/src/Components/FilterList"
import "./Products.css"
import React, { Component } from 'react'

const fillArr = [
  { title: "Mức giá", details: ["Dưới 500.000đ", "Từ 500.000đ - 1.000.000đ", "Trên 1.000.000đ"] },
  { title: "Thương hiệu", details: ["Dưới 500.000đ", "Từ 500.000đ - 1.000.000đ", "Trên 1.000.000đ"] },
  { title: "Size giày", details: ["Dưới 500.000đ", "Từ 500.000đ - 1.000.000đ", "Trên 1.000.000đ"] },
  { title: "Size quần áo", details: ["Dưới 500.000đ", "Từ 500.000đ - 1.000.000đ", "Trên 1.000.000đ"] }
]

export default class Products extends Component {
  static displayName = Products.name;

  constructor(props) {
    super(props);
    this.state = { products: [], numPerPage: 10, loading: true }
  }

  componentDidMount() { this.populateProductData() }

  renderBottom() {
    const numPage = location.search === "" ? 1 : Number(location.search.substring(6));
    const totalPage = Math.ceil(this.state.products.length / this.state.numPerPage);

    const firstButton = (numPage > 1) ? <a href="/san-pham"><button className="at-sbtn-secondary mx-1">&lt;</button></a> : "";
    const lastButton = (numPage < totalPage) ? <a href={`?page=${totalPage}`}><button className="at-sbtn-secondary mx-1">&gt;</button></a> : "";

    let pageList = [numPage];
    switch (true) {
      case (numPage === 1): {
        let i = numPage + 1;
        while (i <= totalPage && i <= numPage + 2) pageList.push(i++);
        break;
      }
      case (numPage === totalPage): {
        let i = numPage - 1;
        while (i >= 1 && i >= numPage - 2) pageList.unshift(i--);
        break;
      }
      default: {
        pageList.unshift(numPage - 1);
        pageList.push(numPage + 1);
      }
    }

    return (
      <div id="page" className="d-flex justify-content-center mt-2">
        {firstButton}
        <a href={`?page=${pageList[0]}`}>
          <button className={`at-sbtn${pageList[0] === numPage ? "" : "-secondary"} mx-1`}>{pageList[0]}</button>
        </a>
        <a href={`?page=${pageList[1]}`}>
          <button className={`at-sbtn${pageList[1] === numPage ? "" : "-secondary"} mx-1`}>{pageList[1]}</button>
        </a>
        <a href={`?page=${pageList[2]}`}>
          <button className={`at-sbtn${pageList[2] === numPage ? "" : "-secondary"} mx-1`}>{pageList[2]}</button>
        </a>
        {lastButton}
      </div>
    )
  }

  renderProductList() {    
    const numPage = location.search === "" ? 1 : Number(location.search.substring(6));
    const last = Math.min(this.state.numPerPage * numPage, this.state.products.length);

    const products = this.state.products.slice(this.state.numPerPage * (numPage - 1), last);

    return (
      <div className="d-flex flex-wrap justify-content-center">
        {products.map(p => <ProductGrid key={p.urlName} urlName={p.urlName} image={`/src/img/${p.image.substring(0, p.image.indexOf(",") > -1 ? p.image.indexOf(",") : p.image.length)}`} name={p.name} price={p.price} />)}
      </div>
    )
  }

  renderProductPage() {
    return (
      <>
        <div className="my-4">
          <FilterList filters={fillArr} />

          <div className="d-flex order-tab justify-content-flex-end mt-3">
            <div>
              <label htmlFor="sort">Số sản phẩm:&nbsp;</label>
              <select name="" id="numPerPage" defaultValue="10">
                <option value="10" onChange={() => this.setState({numPerPage: 10})}>10</option>
                <option value="25" onChange={() => this.setState({numPerPage: 25})}>25</option>
                <option value="50" onChange={() => this.setState({numPerPage: 50})}>50</option>
                <option value="Tất cả" onChange={() => this.setState({numPerPage: this.state.products.length})}>Tất cả</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort">Sắp xếp:&nbsp;</label>
              <select name="" id="sort" defaultValue="Mặc định">
                <option value="Mặc định">Mặc định</option>
                <option value="Từ A-Z">Từ A-Z</option>
                <option value="Từ Z-A">Từ Z-A</option>
                <option value="Giá thấp đến cao">Giá thấp đến cao</option>
                <option value="Giá cao đến thấp">Giá cao đến thấp</option>
              </select>
            </div>

            <div>
              <input type="checkbox" name="" id="only-available" /> Chỉ xem các sản phẩm có hàng
            </div>
          </div>
        </div>

        { this.renderProductList() }

        { this.renderBottom() }
      </>
    )
  }

  render() {
    const content = this.state.loading ? <p>Please wait...</p> : this.renderProductPage();
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">TẤT CẢ SẢN PHẨM</h1>
        <hr />

        {content}
      </main>
    )
  }

  async populateProductData() {
    fetch("/productdetail/All").then(response => response.json()).then(data => {
      this.setState({ products: data, loading: false });
    });
  }
}