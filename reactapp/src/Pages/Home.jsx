import "./Home.css";
import HomeSelection from "/src/Components/home/HomeSelection";
import BlogBlock from "/src/Components/blog/BlogBlock";
import ProductSuggestion from "/src/Components/product/ProductSuggestion";
import PleaseWait from "/src/Shared/PleaseWait"
import { DisplayDate } from "/src/Scripts/Utility.js";
import { Component } from "react";

export default class Home extends Component {
  static DisplayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, sport: [], article: [] }
  }

  componentDidMount() {
    this.populateData();
  }

  render() {
    return this.state.loading ? <PleaseWait /> : (
      <main className="home-main">
        {/* Banner */}
        <div id="bannerCarousel" className="carousel slide banner">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/src/images/banner/banner1.png" className="d-block w-100" alt="welcome" />
            </div>
            <div className="carousel-item">
              <img src="/src/images/banner/banner2.png" className="d-block w-100" alt="motto" />
            </div>
            <div className="carousel-item">
              <img src="/src/images/banner/banner3.png" className="d-block w-100" alt="sale" />
            </div>
            <div className="carousel-item">
              <img src="/src/images/banner/banner4.png" className="d-block w-100" alt="gymshark" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Giới thiệu */}
        <div className="home-content-box">
          <img src="/src/images/banner/welcome.png" alt="welcome" />

          <div className="home-content-detail">
            <h1 className="home-welcome">CHÀO MỪNG ĐẾN VỚI ACTIVE TOGETHER</h1>
            <div className="home-description">Cùng nhau tạo nên một xã hội năng động hơn!</div>
            <div className="text-center">
              <a href="gioi-thieu"><button className="at-btn mt-4">Xem giới thiệu</button></a>
            </div>
          </div>
        </div>

        {
          // Các môn thể thao
        }
        <div className="home-content-box">
          <img src="field.jpg" className="background" />
          <div className="home-content-detail">          
            <h2 className="home-title">CÁC MÔN THỂ THAO</h2>
            <div className="home-content-collection">
              {
                this.state.sport.map(s => <HomeSelection key={s.name} image={s.image} name={s.name} radius={true} />)
              }
            </div>
          </div>
        </div>

        {
          // Giới tính + Độ tuổi
        }
        <div className="home-content-box">
          <img src="background.jpg" className="background" />
          <div className="home-content-detail">
            <h2 className="home-title">SẢN PHẨM THEO GIỚI TÍNH</h2>
            <div className="home-content-collection">
              <HomeSelection image="/src/images/sport/man.png" name="Nam" width={100/3} radius={false} />
              <HomeSelection image="/src/images/sport/woman.png" name="Nữ" width={100/3} radius={false} />
              <HomeSelection image="/src/images/sport/children.png" name="Trẻ em" width={100/3} radius={false} />
            </div>
          </div>
        </div>

        <div className="main-margin-container">
          {
            // Sản phẩm mới nhất + Sản phẩm đã xem (có thể xem như là 1 component)
          }
          <div className="otherProducts main-margin py-5">
            <ProductSuggestion title="Sản phẩm liên quan" />
          </div>

          <div className="watchedProducts main-margin py-5">
            <ProductSuggestion title="Sản phẩm đã xem" />
          </div>

          {
            //Tin tức
          }
          <div className="latest-blog main-margin py-5">
            <h2 className="home-title">BÀI VIẾT MỚI NHẤT</h2>
            {
              this.state.article.map(a =>
                <BlogBlock key={a.title} img={a.thumbnail} title={a.title} smallDesc={a.brief} author={a.writtenAdmin} date={DisplayDate(a.datePublish)} urlName={a.urlName} />
              )
            }

            <div className="text-center">
              <a href="tin-tuc"><button className="at-btn">Xem thêm bài viết</button></a>
            </div>
          </div>
        </div>

        {
          // Newsletter
        }
        <div className="home-content-box">
          <img src="help.jpg" className="background" />
          <div className="home-content-detail">
            <form action="">
              <h2 className="home-title">Đăng ký để nhận thông tin của Active Together</h2>
              <div className="home-description">
                Bằng việc đăng ký email, quý khách hàng sẽ nhận được những thông báo mới nhất về khuyến mãi, hàng hóa và tin tức mới nhất.
              </div>
              <input type="email" name="" id="" placeholder="Nhập email của quý khách hàng" className="subscription" />
              <input type="submit" value="Đăng ký" className="subscription-register" />
            </form>
          </div>
        </div>
      </main>
    )
  }

  async populateData() {
    fetch('/sport/get').then(response => response.json()).then(data => this.setState({ sport: data })).catch()

    fetch('/blog/get/top3').then(response => response.json()).then(data => this.setState({ loading: false, article: data })).catch(this.setState({ loading: false }))
  }
}