import ProductGrid from "/src/Components/product/ProductGrid"
import FilterList from "/src/Components/product/FilterList"
import PleaseWait from "/src/Shared/PleaseWait"
import "./Products.css"
import React, { useState, useEffect, useRef } from 'react'
import ProductEmpty from "/src/Components/product/ProductEmpty";

export default function Products() {
  let [products, setProducts] = useState([]);
  let [fillArr, setFillArr] = useState([
    {
      params: "price",
      title: "Mức giá", 
      details: [
        {id: 1, name: "Dưới 500.000đ"},
        {id: 2, name: "Từ 500.000đ - 1.000.000đ"},
        {id: 3, name: "Trên 1.000.000đ"}
      ]
    }
  ]);
  let [fillParams, setFillParams] = useState([{param: 'price', content: []}]);
  let [initialParams, setInitialParams] = useState([]);
  let [loading, setLoading] = useState(true);
  const hasRun = useRef(false);
  
  const params = new URLSearchParams(location.search);
  const search = params.get("search") === null ? "" : params.get("search");
  const page = params.get("page") === null ? 1 : Number(params.get("page"));
  let [numPerPage, setNumPerPage] = useState(params.get("num") === null ? 10 : Number(params.get("num")));
  const sort = params.get("sort") === null ? 0 : Number(params.get("sort"));
  const avail = params.get("avail") == 1;

  function handleFilterClick(params, filter) {
    let i = fillParams.findIndex(f => f.param === params);
    let content = fillParams[i].content;

    let j = content.findIndex(c => c === filter)
    if (j === -1) content.push(filter); else content = [...content.slice(0,j), ...content.slice(j+1)];

    setFillParams(fillParams = [...fillParams.slice(0, i), {param: params, content}, ...fillParams.slice(i+1)]);
  }

  function reloadPage(e, ePage, eSort = sort) {
    e.preventDefault();
    const searchParams = { search, page: ePage, numPerPage: (numPerPage > 50) ? "All" : numPerPage, sort: eSort };
    const url = new URL(location.origin + location.pathname);

    if (e.target.id === "numPerPage")
      searchParams.numPerPage = (e.target.value === "Tất cả") ? "All": e.target.value;

    let urlParams = new URLSearchParams(url.search);
    fillParams.forEach(f => {
      if (f.content.length > 0) urlParams.set(f.param, f.content.join("_"))
    });

    if (searchParams.search !== "") urlParams.set("search", searchParams.search.toLowerCase())
    if (searchParams.page > 1) urlParams.set("page", searchParams.page);
    if (isNaN(searchParams.numPerPage) || searchParams.numPerPage > 10) urlParams.set("num", searchParams.numPerPage);

    if (sort > 0) urlParams.set("sort", searchParams.sort);
    if (document.getElementById("avail").checked) urlParams.set("avail", 1);
    
    location.href = url + (urlParams.size > 0 ? "?" : "") + urlParams.toString();
  }

  useEffect(() => {
    if (hasRun.current) return;
    
    populateProductData();

    hasRun.current = true;
  }, []);

  function renderBottom() {
    const totalPage = Math.ceil(products.length / numPerPage);
    
    if (location.search.includes("num=All") || totalPage === 1) return <></>

    const firstButton = (page > 1) ? <button className="at-sbtn-secondary mx-1" onClick={e => reloadPage(e, 1)}>&lt;</button> : "";
    const lastButton = (page < totalPage) ? <button className="at-sbtn-secondary mx-1" onClick={e => reloadPage(e, totalPage)}>&gt;</button> : "";

    let pageList = [page];
    switch (true) {
      case (page === 1): {
        let i = page + 1;
        while (i <= totalPage && i <= page + 2) pageList.push(i++);
        break;
      }
      case (page === totalPage): {
        let i = page - 1;
        while (i >= 1 && i >= page - 2) pageList.unshift(i--);
        break;
      }
      default: {
        pageList.unshift(page - 1);
        pageList.push(page + 1);
      }
    }

    return (
      <div id="page" className="d-flex justify-content-center mt-2">
        {firstButton}
          <button className={`at-sbtn${pageList[0] === page ? "" : "-secondary"} mx-1`} onClick={e => reloadPage(e, pageList[0])}>{pageList[0]}</button>
          <button className={`at-sbtn${pageList[1] === page ? "" : "-secondary"} mx-1`} onClick={e => reloadPage(e, pageList[1])}>{pageList[1]}</button>
          { pageList[2] !== undefined && <button className={`at-sbtn${pageList[2] === page ? "" : "-secondary"} mx-1`} onClick={e => reloadPage(e, pageList[2])}>{pageList[2]}</button> }
        {lastButton}
      </div>
    )
  }

  function renderProductList() {
    const last = Math.min(numPerPage * page, products.length);
    const pageProducts = products.slice(numPerPage * (page - 1), last);

    return loading ? <></> : (
      <div className="product-list">
        {pageProducts.map(p => {
          try {
            const salePercent = 1 - p.promotionDetails[0].percent;
            return <ProductGrid key={p.urlName} urlName={p.urlName} image={p.productColors[0].productImages[0].image}
            name={p.name} price={p.price * salePercent} oldPrice={p.promotionDetails.length > 0 ? p.price : null} />
          }
          catch {
            return <ProductGrid key={p.urlName} urlName={p.urlName} image={p.productColors[0].productImages[0].image} name={p.name} price={p.price} oldPrice={null} />
          }
        })}
      </div>
    )
  }

  function renderProductPage() {
    return loading ? <></> : (
      <>
        <div className="my-4">
          {
            <FilterList initialParams={initialParams} filters={fillArr} onClick={(params, filter) => handleFilterClick(params, filter)} reloadPage={e => reloadPage(e, 1)} />
          }

          <div className="order-tab mt-3">
            <div>
              <label htmlFor="sort">Số sản phẩm:&nbsp;</label>
              <select id="numPerPage" defaultValue={`${location.href.includes("num=All") ? "All" : numPerPage}`} onChange={e => reloadPage(e, 1)}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="All">Tất cả</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort">Sắp xếp:&nbsp;</label>
              <select id="sort" defaultValue={`${sort}`} onChange={e => reloadPage(e, page, e.target.value)}>
                <option value="0">Mặc định</option>
                <option value="1">Giá thấp đến cao</option>
                <option value="2">Giá cao đến thấp</option>
                <option value="3">Từ A-Z</option>
                <option value="4">Từ Z-A</option>
              </select>
            </div>

            <div>
              <input type="checkbox" id="avail" checked={avail} onChange={e => reloadPage(e, 1)} /> Chỉ xem các sản phẩm có hàng
            </div>
          </div>
        </div>

        { renderProductList() }

        { renderBottom() }
      </>
    )
  }

  async function populateProductData() {
    const response = await fetch(`/product/filter`);
    const filterData = await response.json();    
    const newFillArr = fillArr;
    const newFillParams = fillParams;

    filterData.forEach(d => {
      if (newFillArr.findIndex(f => f.title === d.title) === -1) {
        newFillArr.push(d);
        newFillParams.push({param: d.params, content: []})
    }});

    setFillArr(fillArr = newFillArr);
    setFillParams(fillParams = newFillParams);

    let searchList = [];
    for (const [key, value] of params.entries()) searchList.push({param: key, detailString: value})
    searchList.forEach(s => s.detailString.split("_").forEach(c => handleFilterClick(s.param, c)));
    setInitialParams(initialParams = fillParams);

    if (searchList.length === 0) searchList = null;

    fetch(`/product/get?sort=${sort}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchList)
    }).then(response => response.json()).then(data => {
      if (avail) data = data.filter(d => d.quantity > 0);
      setProducts(products = data);
      setLoading(loading = false);
      setNumPerPage(numPerPage = isNaN(numPerPage) ? data.length : numPerPage);
    });
  }
  
  return loading ? <PleaseWait /> : (
    products.length === 0 ? <ProductEmpty /> : (
      <main className="user-main">
        <h1 className="flex-grow-1 text-center fw-bold">SẢN PHẨM</h1>
        <hr />

        {renderProductPage()}
      </main>
    )
  )
}