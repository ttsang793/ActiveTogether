# Active Together
<p align="justify">
Đây là website cửa hàng bán thể thao Active Together, là sản phẩm của môn học Công nghệ .NET. Với sự hỗ trợ của ReactJS ở frontend, .NET 7.0 ở backend, người dùng có thể sử dụng bất kỳ trình duyệt nào để trải nghiệm mua sắm cùng Active Together.</p>

## Giới thiệu Active Together
<p align="center">
  <img src="https://lh3.googleusercontent.com/pw/AP1GczOgK12ZRYv7CoU9YyNe78BAvQncd8qAjkCWIW8xpNLmo9loGYKGm_x9XF6UnixLdMCymwwvkNxxt8lrOwBCSqwS7g21nxqONZfPiLpyykusqjEPFYc=w621-h585-no" alt="Logo Active Together" width="200px" />
</p>

<p align="justify">
Với phương châm <q><i>Together, we'll build an Active community</i></q>, Active Together tập trung vào các sản phẩm liên quan đến các môn thể thao đồng đội như bóng đá, bóng rổ, cầu lông... hướng đến xã hội năng động và phát triển cùng nhau.
</p>

### _Mục tiêu của Active Togeher:_
* Cung cấp các sản phẩm đa dạng với các môn thể thao.
* Am hiểu nhu cầu của khách hàng.
* Mang tính độc đáo đa dạng và phong phú cao.
* Đóng góp tích cực cho cộng đồng và môi trường sống.
* Góp phần tạo ra cộng đồng năng động, gắn kết hơn.

## Hình ảnh một số trang của Active Together
<img src="https://lh3.googleusercontent.com/pw/AP1GczMT1Pj3ten9lN26YpOztss1ySE1v_q2y1q-hL_ZHFTTxzmrFdGEZEwzf1cFYVZRD8hbh6RzWsqtc0ev4rst8uirZAY3b5N5ewRCZMPN9lCZQklK1DU=w1080-h585-no" alt="Home Active Together" />
<p align="center">Trang chủ của Active Together</p>
<img src="https://lh3.googleusercontent.com/pw/AP1GczP6NsrIrdNg__Et6RPu_cxq63aO8Oq5kLuXLYEAaj5U5D5COw7hpmhLS4w-RzV7AJbT0mUefQVPyAUXAqMEDJBIGmFBG5Wo7nM3W99JEUUP7OgzFJ8DP_ZlEJYz4wVDcGKra2LsGNyTVr9B9k7K4eBj=w3636-h2436-s-no-gm" alt="Product Page Active Together">
<p align="center">Trang sản phẩm</p>

## Hướng dẫn cài đặt
* Bước 1: Cài đặt **[XAMPP](https://www.apachefriends.org/download.html)** (PHP >= 8.2.0).
* Bước 2: Cài đặt **[.NET 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0).** Nếu bạn sử dụng IDE như Visual Studio thì có thể bỏ qua bước này.
* Bước 3: Chạy cơ sở dữ liệu:
  * Bước 3.1: Khởi động XAMPP. Kích hoạt 2 dịch vụ sau: Apache và MySQL.
  * Bước 3.2: Mở trình soạn thảo SQL của máy tính của bạn. Ví dụ, bạn có thể bỏ vào PHPMyAdmin của XAMPP:
    ```
    https://localhost/phpmyadmin
    ```
  * Bước 3.3: Copy các câu lệnh trong file _/Database/empty_db.sql_ vào trình soạn thảo SQL vửa mở, rồi sau đó thực thi.
* Bước 4: Tích hợp đăng nhập bằng  và thanh toán điện tử:
  * Đăng nhập bằng Google:
    * Khởi tạo file firebase.js ở /reactapp. Nội dung file ở [tài liệu hướng dẫn của Google Firebase](https://firebase.google.com/docs/web/setup).
    * Tạo project Google Firebase, download secret key của project đó. Tạo thư mục /json, rồi copy file .json mới tải vào thư mục đó.
  * [VNPay](https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html), [Momo](https://developers.momo.vn/v3/vi/docs/payment/api/wallet/onetime): Làm theo hướng dẫn của nhà sản xuất.

* Bước 5: Chạy trang web:
  * Ở frontend, di chuyển tới thư mục reactapp
    ```
    cd reactapp
    ```
  * Sau đó chạy câu lệnh sau để khởi động trang web:
    ```
    npm run dev
    ```
  * Ở backend, mở Visual Studio hoặc IDE C# mà bạn dùng. Sau đó bắt đầu chạy.
  * Nếu bạn dùng Visual Studio Code, gõ câu lệnh sau:
    ```
    dotnet run
    ```

## Thành viên thực hiện
* [3121560077 - Trần Tuấn Sang](https://ttsang793.github.io)