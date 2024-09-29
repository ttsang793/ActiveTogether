import "./Blog/Blog.css"
import "./Introduction.css"
import sponsor from "/src/img/sponsor.jpg"

/* Có thể thay đổi */
export default function Introduction() {
  return (
    <main className="blog-article">
      <h1 className="flex-grow-1 text-center fw-bold">GIỚI THIỆU</h1>
      <hr />

      {/* Tạo ra 2 div ứng với 2 đoạn văn (kế thừa CSS từ blog) */}
      <div className="paragraph intro-paragraph">
        <div className="row">
          <div className="col-9">
            <h2>Chào mừng đến với Active Together</h2>
            <p>
            Active Together được lập ra bởi những người bạn trẻ thành phố yêu thích thể thao. Sinh ra ở một thành phố
            đầy xô bồ, các bạn trẻ ấy càng trân trọng với những phút giây được vui chơi thể thao cùng với nhau.
            </p>

            <p>
            Và đó là phương châm của Active Together ra đời, <q>Together, we'll build an Active community</q>, Active
            Together luôn muốn xây dựng một cộng đồng năng động hơn, cho dù bạn ở miền quê hay thị thành.
            </p>

            <p>
            Active Together chú trọng đến các môn thể thao đồng đội, như là bóng rổ, cầu lông, bóng đá, hi vọng sẽ gắn
            kết nhóm bạn của bạn thông qua các hoạt động thể thao, dù bạn mới bắt đầu chơi hay thành thục môn thể thao
            đó. Ngoài ra, với nhu cầu thay đổi bản thân, Active Together cũng bán những quần áo tập gym, chạy điền kinh,
            hi vọng giúp cho khách hàng của chúng tôi trở nên năng động hơn, luôn luôn quyết tâm thực hiện mục tiêu của
            mình, không bao giờ bỏ cuộc.
            </p>
          </div>

          <div className="col-3">
            <img src="/src/img/football.jpg" alt="Giới thiệu" className="intro-img" />
          </div>
        </div>
      </div>

      <div className="paragraph intro-paragraph">
        <div className="row">        
          <div className="col-3">
            <img src="/src/img/sample_thumbnail.jpg" alt="Sứ mệnh" className="intro-img" />
          </div>

          <div className="col-9">
            <h2>Sứ mệnh Active Together</h2>
            <ul className="intro-goal">
              <li><i className="bi bi-check-circle-fill"></i> Cung cấp các sản phẩm đa dạng với các môn thể thao.</li>
              <li><i className="bi bi-check-circle-fill"></i> Am hiểu nhu cầu của khách hàng.</li>
              <li><i className="bi bi-check-circle-fill"></i> Mang tính độc đáo đa dạng và phong phú cao.</li>
              <li><i className="bi bi-check-circle-fill"></i> Đóng góp tích cực cho cộng đồng và môi trường sống.</li>
              <li><i className="bi bi-check-circle-fill"></i> Góp phần tạo ra cộng đồng năng động, gắn kết hơn.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Thương hiệu đồng hành + Quotes */}
      <div className="row intro-paragraph">
        <div className="col">
          <h2 className="fw-bold fst-italic text-center">Các thương hiệu liên kết</h2>
          <div className="sponsor">
            <img src={sponsor} alt="Sponsor" />
            <img src={sponsor} alt="Sponsor" />
            <img src={sponsor} alt="Sponsor" />
            <img src={sponsor} alt="Sponsor" />
            <img src={sponsor} alt="Sponsor" />
            <img src={sponsor} alt="Sponsor" />
          </div>
        </div>

        
        <div className="col">
          <h2 className="fw-bold fst-italic text-center">Các câu nói</h2>
          <div id="quoteCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item text-center active">
              <q className="quote">You miss 100% of the shots you don't take.</q>
              <div className="quote-author">- Wayne Gretzky</div>
            </div>
            <div className="carousel-item text-center">
              <q className="quote">Sports brings people together.</q>
              <div className="quote-author">- Rajashree Choudhury</div>
            </div>
            <div className="carousel-item text-center">
              <q className="quote">Believe in yourself, even when others doubt you.</q>
              <div className="quote-author">- Candace Parker</div>
            </div>
            <div className="carousel-item text-center">
              <q className="quote">My closest friends have been made through sport.</q>
              <div className="quote-author">- Gary Lineker</div>
            </div>
          </div>

          
          <button className="carousel-control-prev" type="button" data-bs-target="#quoteCarousel" data-bs-slide="prev">
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#quoteCarousel" data-bs-slide="next">
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        </div>
      </div>
    </main>
  )
}