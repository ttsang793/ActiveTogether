import "./ProductDetail.css";
import ProductSuggestion from "/src/Components/ProductSuggestion";
import AddToCart from "/src/Components/AddToCart";
import { DisplayPrice } from "/src/Components/Utility.js"
import FourOFour from "./FourOFour";
import React, { Component } from 'react'

export default class ProductDetail extends Component {
  static displayName = ProductDetail.name;

  constructor(props) {
    super(props);
    this.state = { product: [], loading: true }
  }

  componentDidMount() { this.populateProductDetail() }

  static renderLuaChon(option, id, title) {
    return (
      <div className="my-2">
        <label htmlFor={id}>{title}:&nbsp;</label>
        <select id={id} defaultValue={option[0]} className="pe-2">
          {option.map((o, i) => <option value={o} key={i}>{o}</option>)}
        </select>
      </div>
    );
  }

  static renderOptions(product) {
    let colorList = []
    product.forEach(p => { colorList.push(p.color) });

    return (
      <>
        {(product[0].product.size.split(",").length > 1) && ProductDetail.renderLuaChon(product[0].product.size.split(","), "kichThuoc", "Kích thước")}
        {(colorList.length > 1) && ProductDetail.renderLuaChon(colorList, "mauSac", "Màu sắc")}
      </>
    )
  }

  static renderProductDetail(product) {
    let colorList = []
    product.forEach(p => { colorList.push(p.color) });
    const sizeList = product[0].product.size.split(",");

    return (
      <main>
        <div className="d-flex product-detail">
          <div className="d-flex flex-column">
            <div id="showing" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={`/src/img/${product[0].image}`} className="showing" alt={colorList[0]} />
                </div>
                {
                  colorList.map((c,i) => {
                      if (i > 0) return (
                        <div className="carousel-item">
                          <img src={`/src/img/${product[i].image}`} className="showing" alt={c} />
                        </div>
                      )
                    }
                  )
                }
              </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#showing" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#showing" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
              
              <div className="small-images d-flex mt-2">                
                <img src={`/src/img/${product[0].image}`} alt={product[0].color}
                  key={product[0].color} className="small-img active" data-bs-target="#showing" data-bs-slide-to="0"
                  aria-current="true" onClick={e => document.getElementById("showing").src = e.target.src} />

                {product.map((_, i) => {
                  if (i > 0) return (
                  <img src={`/src/img/${product[i].image}`} alt={product[i].color}
                    key={product[i].color} className="small-img" data-bs-target="#showing" data-bs-slide-to={`${i}`}
                    onClick={e => document.getElementById("showing").src = e.target.src} />)})}
              </div>
            </div>
          </div>

          <div className="flex-grow-1">
            <h1>{product[0].product.name}</h1>
            <div className="price d-flex align-items-center">
              <div className="current-price">{DisplayPrice(product[0].price)}</div>
              {/*<div className="old-price">{DisplayPrice(product.oldPrice)}</div>*/}
            </div>
            <hr />

            {(sizeList.length > 1) && ProductDetail.renderLuaChon(sizeList, "kichThuoc", "Kích thước")}
            {(colorList.length > 1) && ProductDetail.renderLuaChon(colorList, "mauSac", "Màu sắc")}

            <AddToCart type="text" />
          </div>
        </div>

        <div className="product-description" id="product-description">
          <h2>Mô tả sản phẩm</h2>
          <hr />
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Class natoque pharetra scelerisque potenti hac per. Nunc lacinia fringilla
            hac dictumst magna integer. Porta dictum finibus penatibus fringilla, commodo auctor fusce adipiscing. Euismod gravida erat nisl
            iaculis nullam. Odio purus etiam eleifend quisque duis montes odio consequat. Gravida purus aptent nam nunc sociosqu placerat.
            Neque integer accumsan sed, euismod auctor sollicitudin porta eget ex. Donec elementum rhoncus auctor venenatis eu montes.
            Bibendum aliquet egestas felis tellus posuere vivamus proin. Ultricies posuere donec vitae placerat varius porttitor. Litora
            penatibus tempor ante congue blandit cras tempus lacus. Luctus cubilia libero proin; suspendisse consequat ad. Curabitur pulvinar
            sagittis at facilisi augue? Fringilla iaculis ultricies nisi rhoncus amet arcu diam conubia. Nascetur tempor nostra condimentum
            donec tincidunt, vulputate donec convallis. Montes semper purus a rhoncus nisi consequat. Aenean auctor vitae sapien luctus;
            vestibulum natoque. Dictum magnis at, tellus sapien lectus porta auctor arcu. Risus dui vulputate nibh semper dapibus tincidunt.
            Platea convallis consequat morbi suscipit est facilisi bibendum. Per sit nisi facilisi nibh dolor quis. Tortor himenaeos laoreet
            elit hac commodo ligula porttitor iaculis. Habitant ut commodo pharetra id sed. Per pellentesque vitae pulvinar mus vestibulum
            tortor senectus at dolor. Luctus dignissim pulvinar at aliquam consectetur commodo semper. Euismod ipsum cursus nisi penatibus
            sagittis neque lacus nec. Litora himenaeos sit enim accumsan mattis quisque. Eu inceptos eleifend sodales aliquet leo; mi accumsan
            commodo? Egestas tortor suscipit lacus est feugiat nulla commodo. Velit urna platea blandit orci habitant hendrerit iaculis.
            Bibendum rutrum elit; mi blandit sodales amet. Felis placerat natoque congue potenti lacus torquent massa. Mus non consectetur
            ultricies praesent faucibus per cubilia adipiscing.
          </p>
        </div>

        <div className="otherProducts">
          <ProductSuggestion title="Sản phẩm liên quan" />
        </div>

        <div className="watchedProducts">
          <ProductSuggestion title="Sản phẩm đã xem" />
        </div>
      </main>
    )
  }

  render() {
    const content = this.state.loading ? <p>Please wait...</p> : ProductDetail.renderProductDetail(this.state.product);
    return content;
  }

  async populateProductDetail() {
    fetch(`/productdetail/ByUrlName?urlName=${location.pathname.substring(10)}`).then(response => response.json())
      .then(data => { this.setState({ product: data, loading: false }) })
      .catch(() => location.href = "/404");
  }
}