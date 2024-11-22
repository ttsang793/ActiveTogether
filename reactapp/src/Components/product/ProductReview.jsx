import "./ProductReview.css"
import SimplePage from "/src/Components/shared/SimplePage";
import ProductStar from "/src/Components/productreview/ProductStar";
import ProductStarBar from "/src/Components/productreview/ProductStarBar";
import Review from "/src/Components/productreview/Review";
import { Component } from "react";

export default class ProductReview extends Component {
  static displayName = ProductReview.name;

  constructor(props) {
    super(props);
    this.state = { reviewList: [], reviewListAppear: [], page: 0, error: "", review: "", star: 0, sku: this.props.sku, starRange: [], loading: true }
    this.handleReviewListChange = this.handleReviewListChange.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.uploadReview = this.uploadReview.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.calStarRange();
    }, 500);
  }

  handleReload(page) {
    this.handleReviewListChange(page);
  }

  handleReviewListChange(page = 1) {
    const reviewsPerPage = 6;
    const lastReviewIndex = page * reviewsPerPage;
    const firstReviewIndex = lastReviewIndex - reviewsPerPage;
    
    // Slice the review list to show only the reviews for the selected page
    const reviewListAppear = this.state.reviewList.slice(firstReviewIndex, lastReviewIndex);
    
    // Update the state with the new reviews for the current page
    this.setState({ reviewListAppear, page });
  }

  handleReviewChange = e => this.setState({ review: e.target.value, error: "" })

  handleStarChange = e => {
    const star = Number(e.target.id.substring(e.target.id.length - 1));

    for (let i=0; i<5; i++) {
      if (i < star) document.querySelectorAll(".star-rating")[i].classList.add("star-rated");
      else document.querySelectorAll(".star-rating")[i].classList.remove("star-rated");
    }

    this.setState({ star: star, error: "" })
  }

  handleOptionChange(e, idList) {
    const i = e.target.selectedIndex;
    if (e.target.id === "color")
      this.setState({sku: idList[i].sku + (this.state.sku.endsWith("FREE") ? "FREE" : document.getElementById("size").value)});
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
    )
  }

  calStarRange() {
    const result = [0, 0, 0, 0, 0];

    if (this.props.review.length > 0) {
      this.props.review.forEach(r => {
        result[5 - r.star]++;
      })

      let max = result[0];
      for (let i=1; i<5; i++) if (result[i] > max) max = result[i];
      for (let i=0; i<5; i++) result[i] = result[i] * 100 / max;

      
      this.setState({ reviewList: this.props.review}, () => this.handleReviewListChange());      
    }

    this.setState({ starRange: result, loading: false });
  }


  calAverageStar() {
    let avg = 0;
    this.props.review.forEach(r => avg += r.star);
    return this.props.review.length === 0 ? 0 : (avg / this.props.review.length).toFixed(1);
  }

  render() {
    return this.state.loading ? <></> : (
      <div>        
        <h2>Đánh giá sản phẩm</h2>
        <hr />

        <div className="review-container">
          <div className="star d-flex flex-column pe-4">
            <div className="d-flex c-10">
              <div className="average">
                <span className="fs-1 fw-bold">{this.calAverageStar()}</span>
              </div>

              <div className="average-star">
                <div>
                  <ProductStar star={this.calAverageStar()} />
                </div>
                (tổng số {this.props.review.length} review)
              </div>
            </div>

            <div>
              <ProductStarBar rating={5} width={this.state.starRange[0]} />
              <ProductStarBar rating={4} width={this.state.starRange[1]} />
              <ProductStarBar rating={3} width={this.state.starRange[2]} />
              <ProductStarBar rating={2} width={this.state.starRange[3]} />
              <ProductStarBar rating={1} width={this.state.starRange[4]} />
            </div>
          </div>
          
          <div className="d-flex flex-column review-box">
            <textarea className="form-control mb-2" placeholder="Hãy cho chúng mình biết trải nghiệm của bạn nhé!" value={this.state.review} onChange={this.handleReviewChange}>
            </textarea>

            <div className="review-detail">
              <div>
                <i className="bi bi-star-fill star-rating" id="star-1" onClick={this.handleStarChange}></i>
                <i className="bi bi-star-fill star-rating" id="star-2" onClick={this.handleStarChange}></i>
                <i className="bi bi-star-fill star-rating" id="star-3" onClick={this.handleStarChange}></i>
                <i className="bi bi-star-fill star-rating" id="star-4" onClick={this.handleStarChange}></i>
                <i className="bi bi-star-fill star-rating" id="star-5" onClick={this.handleStarChange}></i>
              </div>
              <div>
                {(this.props.colorList.length > 1) && this.renderLuaChon(this.props.colorList, "color", "Màu sắc", this.props.idList)}
              </div>
              <div>
                {(this.props.sizeList.length > 1) && this.renderLuaChon(this.props.sizeList, "size", "Kích thước")}
              </div>
            </div>
            <div className="error-value" id="error-value">{this.state.error}</div>

            <div className="text-end mt-2">
              <button className="small-at-btn" onClick={() => this.uploadReview()}>Đăng</button>
            </div>
          </div>
        </div>        

        <div className="review-list w-100 my-4">
          {this.state.reviewListAppear.map((r, i) => <Review key={i} review={r} />)}
        </div>

        <SimplePage page={this.state.page} total={this.props.review.length} numPerPage={6} handlePageChange={this.handleReload} />
      </div>
    )
  }

  async uploadReview() {
    if (localStorage.getItem("userLogin") === null) alert("Vui lòng đăng nhập để review sản phẩm!");
    else if (this.state.review === "") this.setState({error: "Vui lòng nhập review cho sản phẩm!"});
    else if (this.state.star === 0) this.setState({error: "Vui lòng đánh giá số sao cho sản phẩm!"});
    else {
      if (confirm("Bạn có muốn đăng review này?")) {
        const response = await fetch("/product/review/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            productId: this.props.id,
            sku: this.state.sku,
            review: this.state.review,
            star: this.state.star,
            userName: localStorage.getItem("userLogin")
          })
        })
        
        if (response.ok) { alert("Cảm ơn bạn đã dánh giá sản phẩm này!"); location.reload() }
        else alert("Xin lỗi bạn, đã có lỗi từ hệ thống. Bạn vui lòng thử lại nhé!")
      }
    }
  }
}