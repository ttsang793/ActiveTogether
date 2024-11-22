import ProductGrid from "/src/Components/product/ProductGrid"
//import FilterList from "/src/Components/FilterList"
import PleaseWait from "/src/Shared/PleaseWait"
import "./Products.css"
import React, { Component } from 'react'
import ProductEmpty from "../../Components/product/ProductEmpty";

export default class Products extends Component {
  static displayName = Products.name;

  constructor(props) {
    super(props);

    const params = new URLSearchParams(location.search);
    const search = params.get("search") === null ? "" : params.get("search");
    const page = params.get("page") === null ? 1 : Number(params.get("page"));
    const numPerPage = params.get("num") === null ? 10 : Number(params.get("num"));
    const sort = params.get("sort") === null ? 0 : Number(params.get("sort"));
    const avail = params.get("avail") == 1;
    const fillArr = [
      { title: "Mức giá", details: ["Dưới 500.000đ", "Từ 500.000đ - 1.000.000đ", "Trên 1.000.000đ"] }
    ]

    this.state = { products: [], sort, search, page, numPerPage, avail, loading: true, fillArr }
  }

  reloadPage(e, page, sort = this.state.sort) {
    const search = { search: this.state.search, page: this.state.page, numPerPage: (this.state.numPerPage > 50) ? "All" : this.state.numPerPage, sort: sort }
    if (e.target.id === "numPerPage")
      search.numPerPage = (e.target.value === "Tất cả") ? "All": e.target.value;
    search.page = page;

    const url = new URL(location.origin + location.pathname);
    let params = new URLSearchParams(url.search);
    if (search.search !== "") params.set("search", search.search)
    if (search.page > 1) params.set("page", search.page);
    if (isNaN(search.numPerPage) || search.numPerPage > 10) params.set("num", search.numPerPage);

    if (sort > 0) params.set("sort", search.sort);
    if (document.getElementById("avail").checked) params.set("avail", 1)
    
    location.href = url + (params.size > 0 ? "?" : "") + params.toString();
  }

  componentDidMount() {
    this.populateProductData();
    //this.populateFilterData();
  }

  renderBottom() {
    const numPage = this.state.page;
    const totalPage = Math.ceil(this.state.products.length / this.state.numPerPage);
    
    if (location.search.includes("num=All") || totalPage === 1) return <></>

    const firstButton = (numPage > 1) ? <button className="at-sbtn-secondary mx-1" onClick={e => this.reloadPage(e, 1)}>&lt;</button> : "";
    const lastButton = (numPage < totalPage) ? <button className="at-sbtn-secondary mx-1" onClick={e => this.reloadPage(e, totalPage)}>&gt;</button> : "";

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
          <button className={`at-sbtn${pageList[0] === numPage ? "" : "-secondary"} mx-1`} onClick={e => this.reloadPage(e, pageList[0])}>{pageList[0]}</button>
          <button className={`at-sbtn${pageList[1] === numPage ? "" : "-secondary"} mx-1`} onClick={e => this.reloadPage(e, pageList[1])}>{pageList[1]}</button>
          { pageList[2] !== undefined && <button className={`at-sbtn${pageList[2] === numPage ? "" : "-secondary"} mx-1`} onClick={e => this.reloadPage(e, pageList[2])}>{pageList[2]}</button> }
        {lastButton}
      </div>
    )
  }

  renderProductList() {
    const last = Math.min(this.state.numPerPage * this.state.page, this.state.products.length);
    const products = this.state.products.slice(this.state.numPerPage * (this.state.page - 1), last);

    return (
      <div className="product-list">
        {products.map(p => <ProductGrid key={p.urlName} urlName={p.urlName} image={`${p.image.substring(0, p.image.indexOf(",") > -1 ? p.image.indexOf(",") : p.image.length)}`} name={p.name} price={p.price} oldPrice={p.oldPrice} />)}
      </div>
    )
  }

  renderProductPage() {
    return (
      <>
        <div className="my-4">
          {
            //<FilterList filters={this.state.fillArr} />
          }

          <div className="order-tab mt-3">
            <div>
              <label htmlFor="sort">Số sản phẩm:&nbsp;</label>
              <select id="numPerPage" defaultValue={`${location.href.includes("num=All") ? "All" : this.state.numPerPage}`} onChange={e => this.reloadPage(e, 1)}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="All">Tất cả</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort">Sắp xếp:&nbsp;</label>
              <select id="sort" defaultValue={`${this.state.sort}`} onChange={e => this.reloadPage(e, this.state.page, e.target.value)}>
                <option value="0">Mặc định</option>
                <option value="1">Giá thấp đến cao</option>
                <option value="2">Giá cao đến thấp</option>
                <option value="3">Từ A-Z</option>
                <option value="4">Từ Z-A</option>
              </select>
            </div>

            <div>
              <input type="checkbox" id="avail" checked={this.state.avail} onChange={e => this.reloadPage(e, 1)} /> Chỉ xem các sản phẩm có hàng
            </div>
          </div>
        </div>

        { this.renderProductList() }

        { this.renderBottom() }
      </>
    )
  }

  render() {
    return (this.state.loading) ? <PleaseWait /> : (
      this.state.products.length === 0 ? <ProductEmpty /> : (
        <main className="user-main">
          <h1 className="flex-grow-1 text-center fw-bold">SẢN PHẨM</h1>
          <hr />
  
          {this.renderProductPage()}
        </main>
      )
    )
  }

  async populateProductData() {
    let url = ""
    if (this.state.search === "") url = `/product/get?sort=${this.state.sort}`;
    else url = `/product/get?search=${this.state.search}&sort=${this.state.sort}`;

    fetch(url).then(response => response.json()).then(data => {
      if (this.state.avail) data = data.filter(d => d.quantity > 0);
      this.setState({ products: data, loading: false, numPerPage: (isNaN(this.state.numPerPage) ? data.length : this.state.numPerPage) });
    });
  }

  async populateFilterData() {
    fetch(`/product/filter`).then(response => response.json()).then(data => {
      const newFillArr = this.state.fillArr;
      data.forEach(d => {
        if (newFillArr.findIndex(f => f.title === d.title) === -1) newFillArr.push(d)
      });
      this.setState({ fillArr: newFillArr });
    });
  }
}