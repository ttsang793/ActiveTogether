import "./ProductDetail.css";
import PleaseWait from "/src/Shared/PleaseWait"
import ProductSuggestion from "/src/Components/product/ProductSuggestion";
import ProductReview from "/src/Components/product/ProductReview";
import AddToCart from "/src/Components/product/AddToCart";
import { DisplayPrice } from "/src/Scripts/Utility.js"
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
  
  handleOptionChange(e, i = 0, idList = []) {
    if (e.target.classList.contains("color")) {
      this.handleIndexChange(e.target.id, this.state.image.length)
      this.setState({sku: idList[i].sku + this.state.sku.substring(5)});
    }
    else this.setState({sku: this.state.sku.substring(0,5) + e.target.innerHTML});
  }

  renderSize(sizeList) {
    return (
      <div className="my-2">
        Kích thước:&nbsp;
        <div className="select-list">
          {sizeList.map((s, i) =>
            <button className={`select-option size ${this.state.sku.substring(5) === s ? "selected" : ""}`} key={i}
            onClick={e => this.handleOptionChange(e)}>{s}</button>
          )}
        </div>
      </div>
    );
  }

  renderColor(colorList, idList) {
    return (
      <div className="my-2">
        Màu sắc:&nbsp;
        <div className="select-list">
          {colorList.map((c, i) =>
            <button className={`select-option color ${this.state.sku.substring(0,5) === idList[i].sku ? "selected" : ""}`} id={idList[i].id} key={i}
            onClick={e => this.handleOptionChange(e, i, idList)}>{c}</button>
          )}
        </div>
      </div>
    );
  }

  renderProductDetail(product, image,review) {
    document.title = this.state.product[0].name;

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
      const index = Number(p.image) - 1;
      if (idList.length === 0 || idList.findIndex(p => p.id === index) === -1) idList.push({id: index, sku: p.sku.substring(0,5)});
    })

    return (
      <main className="user-main">
        <div className="d-flex product-detail c-10">          
          <div className="d-flex product-detail-image me-2">
            <div className="position-relative"> 
              {
                (image.length > 1) ?
                <button onClick={() => this.handleIndexChange(this.state.index - 1, image.length)} className="carousel-prev">&lt;</button> :
                <></>
              }
              <img src={`${image[this.state.index].image}`} className="showing" id="showing" />
              {
                (image.length > 1) ?
                <button onClick={() => this.handleIndexChange(this.state.index + 1, image.length)} className="carousel-next">&gt;</button> :
                <></>
              }
            </div>

            
            <div className="d-flex align-item-center mt-2" style={{columnGap: "9px"}}> 
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
          
          <div className="product-detail-buying">
            <h1>{product[0].name}</h1>
            <div className="price d-flex align-items-center">
              <div className="current-price">{DisplayPrice(product[0].price)}</div>
              {
                product[0].oldPrice !== null ? <div className="old-price">{DisplayPrice(product[0].oldPrice)}</div> : <></>
              }
            </div>
            <hr />

            {(sizeList.length > 1) && this.renderSize(sizeList)}
            {(colorList.length > 1) && this.renderColor(colorList, idList)}

            {<AddToCart type="text" product={product.find(p => p.sku === this.state.sku)} username={this.props.username} />}
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
            vestibulum natoque.
          </p>
        </div>

        <ProductReview review={review} sizeList={sizeList} colorList={colorList} idList={idList} sku={product[0].sku} />

        <div className="otherProducts pt-5">
          <ProductSuggestion title="Sản phẩm liên quan" />
        </div>

        <div className="watchedProducts pt-5">
          <ProductSuggestion title="Sản phẩm đã xem" />
        </div>
      </main>
    )
  }

  render() {
    const content = this.state.loading ? <PleaseWait /> : this.renderProductDetail(this.state.product, this.state.image, this.state.review);
    return content;
  }

  async populateProductDetail(url) {
    const response = await fetch(`/product?urlName=${url}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const productData = await response.json();
    this.setState({ product: productData, sku: productData[0].sku.substring(0,5) + productData[0].size });

    const imageResponse = await fetch(`/product/img?urlName=${url}`);
    if (!imageResponse.ok) throw new Error('Network response was not ok');
    const imageData = await imageResponse.json();
    this.setState({ image: imageData });

    const reviewResponse = await fetch(`/product/review/get?urlName=${url}`);
    if (!reviewResponse.ok) throw new Error('Network response was not ok');
    const reviewData = await reviewResponse.json();
    this.setState({ review: reviewData, loading: false });
  }
}