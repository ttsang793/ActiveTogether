import "./ProductDetail.css";
import ProductSuggestion from "/src/Components/ProductSuggestion";
import ProductReview from "/src/Components/ProductReview";
import AddToCart from "/src/Components/AddToCart";
import { DisplayPrice } from "/src/Components/Utility.js"
import FourOFour from "./FourOFour";
import React, { Component } from 'react'

export default class ProductDetail extends Component {
  static displayName = ProductDetail.name;

  constructor(props) {
    super(props);
    this.state = { product: [], image: [], review: [], index: 0, sku: "", loading: true }
  }

  componentDidMount() {
    const url = location.pathname.substring(10);
    this.populateProductDetail(url);
  }

  handleIndexChange(index, total) {
    this.setState({index: index < 0 ? total - 1 : index % total}, () => {
      if (total < 3) {
        document.getElementsByClassName("main-small-img")[0].classList.remove("main-small-img");
        document.getElementsByClassName("small-img")[this.state.index].classList.add("main-small-img");
      }
    })
  }

  handleOptionChange(e, idList) {
    const i = e.target.selectedIndex;
    if (e.target.id === "color") {
      this.handleIndexChange(e.target.value, this.state.image.length)
      this.setState({sku: idList[i].sku + (this.state.sku.endsWith("FREE") ? "FREE" : document.getElementById("size").value)});
    }
    else this.setState({sku: this.state.sku.substring(0,5) + e.target.value});
  }

  renderLuaChon(option, id, title, idList = []) {
    return (
      <div className="my-2">
        <label htmlFor={id}>{title}:&nbsp;</label>
        <select id={id} defaultValue={option[0]} className="pe-2" onChange={e => this.handleOptionChange(e, idList)}>
          {option.map((o, i) => <option value={idList.length > 0 ? i : o} key={i}>{o}</option>)}
        </select>
      </div>
    );
  }

  renderProductDetail(product, image) {
    let colorList = []
    product.forEach(p => {
      if (!colorList.includes(p.color)) colorList.push(p.color);
    });

    let sizeList = []
    product.forEach(p => {
      if (!sizeList.includes(p.size)) sizeList.push(p.size);
    });

    let idList = []
    product.forEach(p => {
      const index = Number(p.image);
      if (idList.length === 0 || idList.findIndex(p => p.id === index) === -1) idList.push({id: index, sku: p.sku.substring(0,5)});
    })

    return (
      <main>
        <div className="d-flex product-detail">          
          <div className="d-flex flex-column me-2">
            <div style={{ position: "relative" }}> 
              <button onClick={() => this.handleIndexChange(this.state.index - 1, image.length)} className="carousel-prev">&lt;</button>
              <img src={`${image[this.state.index].image}`} className="showing" id="showing" />
              <button onClick={() => this.handleIndexChange(this.state.index + 1, image.length)} className="carousel-next">&gt;</button>
            </div>

            
            <div className="d-flex align-item-center c-10 mt-2"> 
            { (image.length >= 3) ? (
                <>
                  <img src={`${image[this.state.index % image.length].image}`} className="small-img main-small-img" />

                  <img src={`${image[(this.state.index + 1) % image.length].image }`}
                    className="small-img" onClick={() => this.handleIndexChange(this.state.index + 1, image.length)} />
                    
                  <img src={`${image[(this.state.index + 2) % image.length].image}`}
                    className="small-img" onClick={() => this.handleIndexChange(this.state.index + 2, image.length)} />
                </>
              )
              : (
                <>
                  <img src={`${image[0].image}`} className="small-img main-small-img" onClick={() => this.handleIndexChange(0, image.length)} />
                  {image.length === 2 ? <img src={`${image[1].image}`} className="small-img" onClick={() => this.handleIndexChange(1, 2)} /> : ""}
                </>
              )
            }              
            </div>
          </div>

          <div className="flex-grow-1">
            <h1>{product[0].name}</h1>
            <div className="price d-flex align-items-center">
              <div className="current-price">{DisplayPrice(product[0].price)}</div>
              {
                product[0].oldPrice !== null ? <div className="old-price">{DisplayPrice(product[0].oldPrice)}</div> : <></>
              }
            </div>
            <hr />

            {(sizeList.length > 1) && this.renderLuaChon(sizeList, "size", "Kích thước")}
            {(colorList.length > 1) && this.renderLuaChon(colorList, "color", "Màu sắc", idList)}

            {<AddToCart type="text" product={product.find(p => p.sku === this.state.sku)} />}
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

        <div>
          <input type="text" className="form-control" />
          <select name="" id=""></select>
          <input type="submit" value="Đăng review" onClick={e => this.addReview(e)} />
          {
            this.state.review.map((r, i) =>
              <ProductReview key={i} review={r} />
            )
          }
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
    const content = this.state.loading ? <p>Please wait...</p> : this.renderProductDetail(this.state.product, this.state.image);
    return content;
  }

  async populateProductDetail(url) {
    try {
      const response = await fetch(`/productdetail?urlName=${url}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const productData = await response.json();
      this.setState({ product: productData, sku: productData[0].sku.substring(0,5) + productData[0].size });

      const imageResponse = await fetch(`/productdetail/img?urlName=${url}`);
      if (!imageResponse.ok) throw new Error('Network response was not ok');
      const imageData = await imageResponse.json();
      this.setState({ image: imageData });

      const reviewResponse = await fetch(`/productdetail/review?urlName=${url}`);
      if (!reviewResponse.ok) throw new Error('Network response was not ok');
      const reviewData = await reviewResponse.json();
      this.setState({ image: reviewData, loading: false });
    }
    catch {
      location.href = "/404";
    }
  }
}