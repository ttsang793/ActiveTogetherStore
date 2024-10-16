import "./Home.css";
import ProductGrid from "/src/Components/ProductGrid";
import HomeSelection from "/src/Components/HomeSelection";
import BlogBlock from "/src/Components/BlogBlock";
import ProductSuggestion from "/src/Components/ProductSuggestion";

import football from "/src/img/football.jpg";
import phd from "/src/img/placeholder.png";
import sampleThumbnail from "/src/img/sample_thumbnail.jpg"

const desc = "Bóng chuyền là một môn thể thao đồng đội đầy hứng khởi, nhưng cũng như các môn thể thao khác, tai nạn là điều không tránh khỏi. Đây là 5 tip để giảm thiểu tai nạn khi chơi bóng chuyền.";

export default function Home() {
  return (
    <main className="home-main">
      {/* Banner */}
      <div className="banner">
        <img src="/src/img/sample_banner.jpg" alt="" className="banner" />
      </div>

      {/* Giới thiệu */}
      <div className="home-welcome-banner">
        <h1 className="home-welcome">CHÀO MỪNG ĐẾN VỚI ACTIVE TOGETHER</h1>
        <div className="home-description">Cùng nhau tạo nên một xã hội năng động hơn!</div>
        <div className="text-center">
          <a href="gioi-thieu"><button className="at-btn mt-4">Xem giới thiệu</button></a>
        </div>
      </div>

      {/* Các môn thể thao */}
      <div className="home-content-box">
        <img src="field.jpg" className="background" />
        <div className="home-content-detail">          
          <h2 className="home-title">CÁC MÔN THỂ THAO</h2>
          <div className="d-flex w-100">
            <HomeSelection image={football} name="Bóng đá" width={20} />
            <HomeSelection image={football} name="Bóng rổ" width={20} />
            <HomeSelection image={football} name="Cầu lông" width={20} />
            <HomeSelection image={football} name="Pickleball" width={20} />
            <HomeSelection image={football} name="Gym" width={20} />
          </div>
        </div>
      </div>

      {/* Giới tính + Độ tuổi */}
      <div className="home-content-box">
        <img src="background.jpg" className="background" />
        <div className="home-content-detail">
          <h2 className="home-title">SẢN PHẨM THEO GIỚI TÍNH</h2>
          <div className="d-flex w-100">
            <HomeSelection image={football} name="Nam" width={100/3} />
            <HomeSelection image={football} name="Nữ" width={100/3} />
            <HomeSelection image={football} name="Trẻ em" width={100/3} />
          </div>
        </div>
      </div>

      {/* Sản phẩm mới nhất + Sản phẩm đã xem (có thể xem như là 1 component) */}
      <div className="otherProducts main-margin">
        <ProductSuggestion title="Sản phẩm liên quan" />
      </div>

      <div className="watchedProducts main-margin">
        <ProductSuggestion title="Sản phẩm đã xem" />
      </div>

      {/* Tin tức */}
      <div className="latest-blog main-margin">
        <h2 className="home-title">BÀI VIẾT MỚI NHẤT</h2>
        <BlogBlock img={sampleThumbnail} title="Một số tips chơi bóng chuyền" smallDesc={desc} author="Tuấn Sang" date="26/09/2024" />
        <BlogBlock img={sampleThumbnail} title="Một số tips chơi bóng chuyền" smallDesc={desc} author="Tuấn Sang" date="26/09/2024" />
        <BlogBlock img={sampleThumbnail} title="Một số tips chơi bóng chuyền" smallDesc={desc} author="Tuấn Sang" date="26/09/2024" />

        <div className="text-center">
          <a href="tin-tuc"><button className="at-btn">Xem thêm bài viết</button></a>
        </div>
      </div>

      {/* Newsletter */}
      <div className="home-content-box">
        <img src="help.jpg" className="background" />
        <div className="home-content-detail text-center">
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