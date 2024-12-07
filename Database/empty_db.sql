/*drop database at_web;

create database at_web;*/

create table brand (id int primary key auto_increment, `name` varchar(100), is_active boolean default true);

create table category (id int primary key auto_increment, `name` varchar(100), is_active boolean default true);

create table sport (
	id int primary key,
    `name` varchar(100),
    image varchar(512),
    is_active boolean default true
);

create table `user` (
	id int primary key auto_increment,
    firebase_uid varchar(255) unique,
	username varchar(50) not null unique,
	full_name varchar(200),
	date_created date,
	phone varchar(15),
	email varchar(150),
	`point` int default 0,
	avatar longtext
);

create table user_address (
	id int primary key auto_increment,
    user_id int,
    `type` varchar(70),
    address longtext,
    constraint FK_UserAddress_User foreign key (user_id) references `user`(id)
);

create table `role` (
	id int primary key,
    `name` varchar(100)
);

create table `permission_group` (
	id int primary key auto_increment,
	`name` varchar(40)
);

create table permission (
	id int primary key auto_increment,
    `name` varchar(100),
	permission_group_id int,
	constraint FK_Permission_PermissionGroup foreign key (permission_group_id) references `permission_group`(id)
);

create table role_permission (
	id int primary key auto_increment,
	role_id int not null,
    permission_id int not null,
    constraint FK_RolePermission_Role foreign key (role_id) references `role`(id),
    constraint FK_RolePermission_Permission foreign key (permission_id) references permission(id)
);

create table admin_user (
	id int primary key,
    firebase_uid varchar(255) unique,
	full_name varchar(200),
	phone varchar(15),
	email longtext,
    role_id int,
    is_active bool default true,
	avatar longtext,
    constraint FK_Admin_Role foreign key (role_id) references `role`(id)
);

CREATE TABLE policy_article (
	id int auto_increment primary key,
	title varchar(200) unique,
	url_name varchar(200) unique,
	content longtext,
	date_publish date,
	is_active boolean default true
)

CREATE TABLE blog_article (
	id int auto_increment primary key,
	title varchar(200) unique,
	brief varchar(512),
	url_name varchar(200) unique,
	thumbnail longtext,
	written_admin int,
	content longtext,
	date_publish date,
	is_active boolean default true,
    constraint FK_BlogArticle_Admin foreign key (written_admin) references admin_user(id)
);

create table color (
	`code` char(7) primary key,
    `name` varchar(20),
    is_active bool default true
);

CREATE TABLE product (
	id int primary key auto_increment,
	`name` longtext,
	url_name longtext,
	brand_id int,
	category_id int,
	`description` longtext,
	gender smallint,
	is_children boolean default false,
	price decimal(10,0),
	quantity int,
	is_active boolean default true,
    constraint FK_Product_Brand foreign key (brand_id) references brand(id),
    constraint FK_Product_Category foreign key (category_id) references category(id)
);

CREATE TABLE `product_color` (
	`id` int primary key auto_increment,
	product_id int,
	color_code char(7),
	is_active boolean default true,
    constraint FK_ProductColor_Product foreign key (product_id) references product(id),
    constraint FK_ProductColor_Color foreign key (color_code) references color(`code`)
);

CREATE TABLE `product_detail` (
	id int primary key auto_increment,
	sku varchar(50) unique,
	product_color_id int,
	`size` varchar(5),
	price decimal(10,0),
	quantity int,
	note longtext,
	is_active boolean default true,
    constraint FK_ProductDetail_ProductColor foreign key (product_color_id) references product_color(id)
);

CREATE TABLE `product_image` (
	id int primary key auto_increment,
	product_color_id int,
	image longtext,
    constraint FK_ProductImage_ProductColor foreign key (product_color_id) references product_color(id)
);

CREATE TABLE `product_review` (
	id int primary key auto_increment,
	product_id int,
	sku varchar(50),
	user_id int,
	review longtext,
	star smallint,
    date_publish timestamp,
    constraint FK_ProductReview_Product foreign key(product_id) references product(id),
    constraint FK_ProductReview_ProductDetail foreign key(sku) references product_detail(sku),
    constraint FK_ProductReview_User foreign key(user_id) references `user`(id)
);

CREATE TABLE `product_sport` (
	`id` int primary key auto_increment,
	product_id int,
    sport_id int,
    constraint FK_ProductSport_Product foreign key (product_id) references product(id),
    constraint FK_ProductSport_Sport foreign key (sport_id) references sport(id)
);

create table `product_history` (
    `username` varchar(50) not null,
    `product_id` int not null,
    `url_name` longtext not null,
    `timestamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    constraint FK_ProductHistory_User foreign key (username) REFERENCES `user`(username),
    constraint FK_ProductHistory_Product foreign key (product_id) REFERENCES `product`(id),
    constraint PK_ProductHistory primary key (`username`, product_id)
);

CREATE TABLE `order` (
	`id` int primary key auto_increment,
	`user_id` int,
	`full_name` varchar(200),
	`address` longtext,
	`phone` varchar(15),
	`email` varchar(150),
	`total` decimal(10,0),
	`point` int default 0,
	`date_purchased` datetime,
	`date_vertified` datetime,
	`date_received` datetime,
	`date_canceled` datetime,
	`status` smallint default 0,
	`vertify_admin` int,
    `is_paid` boolean,
    `payment_method` varchar(30),
    constraint FK_Order_User foreign key (user_id) references `user`(id),
    constraint FK_Order_Admin foreign key (vertify_admin) references admin_user(id)
);

CREATE TABLE `order_detail` (
	`id` int primary key auto_increment,
	`order_id` int,
	`sku` varchar(50),
	`price` decimal(10,0),
	`quantity` int,
	`is_return` boolean default false,
    constraint FK_OrderDetail_Order foreign key (order_id) references `order`(id),
    constraint FK_OrderDetail_ProductDetail foreign key (sku) references product_detail(sku)
);

CREATE TABLE `promotion` (
	`id` int primary key auto_increment,
	`title` varchar(200),
	`date_start` date,
	`date_end` date,
	is_active boolean
);

CREATE TABLE `promotion_detail` (
	`id` int primary key auto_increment,
	`promotion_id` int,
	`product_id` int,
	`percent` float,
    constraint FK_PromotionDetail_Promotion foreign key (promotion_id) references promotion(id),
    constraint FK_PromotionDetail_Product foreign key (product_id) references product(id),
    constraint FK_PromotionDetail_Percent check (`percent` > 0 and `percent` < 1)
);

CREATE TABLE `refund` (
	`id` int primary key auto_increment,
	`order_detail_id` int,
	`price` decimal(10,0),
	`quantity` int,
	`status` smallint,
	`reason` longtext,
	`check_admin` int,
	`date_refund` datetime,
    constraint FK_Refund_OrderDetail foreign key (order_detail_id) references order_detail(id),
    constraint FK_Refund_Admin foreign key (check_admin) references admin_user(id)
);

CREATE TABLE `import` (
	`id` int primary key auto_increment,
	`date_import` datetime,
	`check_admin` int,
	`total` decimal(10,0),
    constraint FK_Import_Admin foreign key (check_admin) references admin_user(id)
);

CREATE TABLE `import_detail` (
	`id` int primary key auto_increment,
	`import_id` int,
	`sku` varchar(50),
	`price` decimal(10,0),
	`quantity` int,
    constraint FK_ImportDetail_Import foreign key (import_id) references `import`(id),
    constraint FK_ImportDetail_ProductDetail foreign key (sku) references product_detail(sku)
);

CREATE TABLE `cart_detail` (
	`id` int primary key auto_increment,
	`user_id` int,
	`sku` varchar(50),
	`price` decimal(10,0),
	`quantity` int,
    constraint FK_CartDetail_User foreign key (user_id) references `user`(id),
    constraint FK_CartDetail_ProductDetail foreign key (sku) references product_detail(sku)
);

/* Dua du lieu */
INSERT INTO `sport` (`id`, `name`, `image`) VALUES (0, 'Tất cả', '');


INSERT INTO permission_group (`name`) VALUES
('Sản phẩm'),
('Loại sản phẩm'),
('Thương hiệu'),
('Thể thao'),
('Màu sắc'),
('Nhập kho'),
('Hóa đơn'),
('Hoàn trả'),
('Giảm giá'),
('Blog'),
('Phân quyền');

INSERT INTO permission (`name`, `permission_group_id`) VALUES
('Xem sản phẩm', 1),
('Thêm sản phẩm', 1),
('Sửa sản phẩm', 1),
('Khóa sản phẩm', 1),
('Xem chi tiết màu sắc sản phẩm', 1),
('Thêm chi tiết màu sắc sản phẩm', 1),
('Sửa chi tiết màu sắc sản phẩm', 1),
('Khóa chi tiết màu sắc sản phẩm', 1),
('Xem chi tiết SKU', 1),
('Thêm chi tiết SKU', 1),
('Sửa chi tiết SKU', 1),
('Khóa chi tiết SKU', 1),
('Xem loại sản phẩm', 2),
('Thêm loại sản phẩm', 2),
('Sửa loại sản phẩm', 2),
('Khóa loại sản phẩm', 2),
('Xem thương hiệu', 3),
('Thêm thương hiệu', 3),
('Sửa thương hiệu', 3),
('Khóa thương hiệu', 3),
('Xem môn thể thao', 4),
('Thêm môn thể thao', 4),
('Sửa môn thể thao', 4),
('Khóa môn thể thao', 4),
('Xem màu sắc', 5),
('Thêm màu sắc', 5),
('Sửa màu sắc', 5),
('Khóa màu sắc', 5),
('Xem danh sách nhập kho', 6),
('Lập phiếu nhập kho', 6),
('Xem danh sách đơn hàng', 7),
('Cập nhật trạng thái đơn hàng', 7),
('Xem danh sách hoàn trả', 8),
('Cập nhật trạng thái hoàn trả', 8),
('Xem các chương trình giảm giá', 9),
('Lập chương trình giảm giá', 9),
('Sửa chương trình giảm giá', 9),
('Khóa chương trình giảm giá', 9),
('Xem danh sách chương trình giảm giá', 9),
('Thêm sản phẩm vào chương trình giảm giá', 9),
('Xóa sản phẩm ra khỏi chương trình giảm giá', 9),
('Xem danh sách bài blog', 10),
('Viết bài blog', 10),
('Cập nhật bài blog', 10),
('Xóa bài blog', 10),
('Xem danh sách vai trò', 11),
('Thêm vài trò', 11),
('Sửa vai trò', 11),
('Khóa vai trò', 11),
('Cập nhật quyền cho vai trò', 11),
('Thêm nhân viên', 11),
('Cập nhật vai trò cho nhân viên', 11);

INSERT INTO `role` (`id`, `name`) values (0, 'Không có'), (1, 'Adminstrator')

INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES
('1', '1'),
('1', '2'),
('1', '3'),
('1', '4'),
('1', '5'),
('1', '6'),
('1', '7'),
('1', '8'),
('1', '9'),
('1', '10'),
('1', '11'),
('1', '12'),
('1', '13'),
('1', '14'),
('1', '15'),
('1', '16'),
('1', '17'),
('1', '18'),
('1', '19'),
('1', '20'),
('1', '21'),
('1', '22'),
('1', '23'),
('1', '24'),
('1', '25'),
('1', '26'),
('1', '27'),
('1', '28'),
('1', '29'),
('1', '30'),
('1', '31'),
('1', '32'),
('1', '33'),
('1', '34'),
('1', '35'),
('1', '36'),
('1', '37'),
('1', '38'),
('1', '39'),
('1', '40'),
('1', '41'),
('1', '42'),
('1', '43'),
('1', '44'),
('1', '45'),
('1', '46'),
('1', '47'),
('1', '48'),
('1', '49'),
('1', '50'),
('1', '51'),
('1', '52');

/*Chú ý: Nên tạo Google Firebase trước khi chèn bảng sau*/
INSERT INTO `admin_user` (`id`, `firebase_uid`, `full_name`, `phone`, `email`, `role_id`, `avatar`) VALUES
(240101, '', 'Admin', '0123456789', 'admin@gmail.com', 1, "/src/images/avatar/default.jpg");