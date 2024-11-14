using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using cartservices.Models;

namespace cartservices.Data;

public partial class AtWebContext : DbContext
{
    public AtWebContext()
    {
    }

    public AtWebContext(DbContextOptions<AtWebContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AdminUser> AdminUsers { get; set; }

    public virtual DbSet<BlogArticle> BlogArticles { get; set; }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<CartDetail> CartDetails { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Import> Imports { get; set; }

    public virtual DbSet<ImportDetail> ImportDetails { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductColor> ProductColors { get; set; }

    public virtual DbSet<ProductDetail> ProductDetails { get; set; }

    public virtual DbSet<ProductImage> ProductImages { get; set; }

    public virtual DbSet<ProductReview> ProductReviews { get; set; }

    public virtual DbSet<ProductSport> ProductSports { get; set; }

    public virtual DbSet<Promotion> Promotions { get; set; }

    public virtual DbSet<PromotionDetail> PromotionDetails { get; set; }

    public virtual DbSet<Refund> Refunds { get; set; }

    public virtual DbSet<Sport> Sports { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserAddress> UserAddresses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var connectionString = configuration.GetConnectionString("AtWebCon");
            optionsBuilder.UseMySQL(connectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AdminUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("admin_user");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(200)
                .HasColumnName("full_name");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(15)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<BlogArticle>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("blog_article");

            entity.HasIndex(e => e.WrittenAdmin, "FK_BlogArticle_AdminUser");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Brief)
                .HasMaxLength(512)
                .HasColumnName("brief");
            entity.Property(e => e.Content)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("content");
            entity.Property(e => e.DatePublish)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_publish");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.Thumbnail)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("thumbnail");
            entity.Property(e => e.Title)
                .HasMaxLength(200)
                .HasColumnName("title");
            entity.Property(e => e.UrlName)
                .HasMaxLength(200)
                .HasColumnName("url_name");
            entity.Property(e => e.WrittenAdmin)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("written_admin");

            entity.HasOne(d => d.WrittenAdminNavigation).WithMany(p => p.BlogArticles)
                .HasForeignKey(d => d.WrittenAdmin)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_BlogArticle_AdminUser");
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("brand");

            entity.HasIndex(e => e.Name, "name").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<CartDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("cart_detail");

            entity.HasIndex(e => e.Sku, "FK_CartDetail_ProductDetail");

            entity.HasIndex(e => e.UserId, "FK_CartDetail_User");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Price)
                .HasPrecision(10)
                .HasDefaultValueSql("'0'")
                .HasColumnName("price");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'1'")
                .HasColumnType("int(11)")
                .HasColumnName("quantity");
            entity.Property(e => e.Sku)
                .HasMaxLength(50)
                .HasColumnName("sku");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.SkuNavigation).WithMany(p => p.CartDetails)
                .HasForeignKey(d => d.Sku)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_CartDetail_ProductDetail");

            entity.HasOne(d => d.User).WithMany(p => p.CartDetails)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_CartDetail_User");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("category");

            entity.HasIndex(e => e.Name, "name").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Import>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("import");

            entity.HasIndex(e => e.CheckAdmin, "FK_Import_AdminUser");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.CheckAdmin)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("check_admin");
            entity.Property(e => e.DateImport)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_import");
            entity.Property(e => e.Total)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("total");

            entity.HasOne(d => d.CheckAdminNavigation).WithMany(p => p.Imports)
                .HasForeignKey(d => d.CheckAdmin)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Import_AdminUser");
        });

        modelBuilder.Entity<ImportDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("import_detail");

            entity.HasIndex(e => e.ImportId, "FK_ImportDetail_Import");

            entity.HasIndex(e => e.Sku, "FK_ImportDetail_ProductDetail");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.ImportId)
                .HasColumnType("int(11)")
                .HasColumnName("import_id");
            entity.Property(e => e.Price)
                .HasPrecision(10)
                .HasDefaultValueSql("'0'")
                .HasColumnName("price");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("quantity");
            entity.Property(e => e.Sku)
                .HasMaxLength(50)
                .HasColumnName("sku");

            entity.HasOne(d => d.Import).WithMany(p => p.ImportDetails)
                .HasForeignKey(d => d.ImportId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ImportDetail_Import");

            entity.HasOne(d => d.SkuNavigation).WithMany(p => p.ImportDetails)
                .HasForeignKey(d => d.Sku)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ImportDetail_ProductDetail");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("order");

            entity.HasIndex(e => e.VertifyAdmin, "FK_Order_AdminUser");

            entity.HasIndex(e => e.UserId, "FK_Order_User");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.DatePurchased)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_purchased");
            entity.Property(e => e.DateReceived)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_received");
            entity.Property(e => e.DateVertified)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_vertified");
            entity.Property(e => e.Point)
                .HasDefaultValueSql("'0'")
                .HasColumnType("int(11)")
                .HasColumnName("point");
            entity.Property(e => e.Status)
                .HasDefaultValueSql("'0'")
                .HasColumnType("smallint(6)")
                .HasColumnName("status");
            entity.Property(e => e.Total)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("total");
            entity.Property(e => e.UserId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("user_id");
            entity.Property(e => e.VertifyAdmin)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("vertify_admin");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Order_User");

            entity.HasOne(d => d.VertifyAdminNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.VertifyAdmin)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Order_AdminUser");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("order_detail");

            entity.HasIndex(e => e.OrderId, "FK_OrderDetail_Order");

            entity.HasIndex(e => e.Sku, "FK_OrderDetail_ProductDetail");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.IsReturn)
                .HasDefaultValueSql("'0'")
                .HasColumnName("is_return");
            entity.Property(e => e.OrderId)
                .HasColumnType("int(11)")
                .HasColumnName("order_id");
            entity.Property(e => e.Price)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("price");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("quantity");
            entity.Property(e => e.Sku)
                .HasMaxLength(50)
                .HasColumnName("sku");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_OrderDetail_Order");

            entity.HasOne(d => d.SkuNavigation).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.Sku)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_OrderDetail_ProductDetail");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("product");

            entity.HasIndex(e => e.BrandId, "FK_Product_Brand");

            entity.HasIndex(e => e.CategoryId, "FK_Product_Category");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.BrandId)
                .HasColumnType("int(11)")
                .HasColumnName("brand_id");
            entity.Property(e => e.CategoryId)
                .HasColumnType("int(11)")
                .HasColumnName("category_id");
            entity.Property(e => e.Description)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("description");
            entity.Property(e => e.Gender)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("smallint(6)")
                .HasColumnName("gender");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.IsChildren)
                .HasDefaultValueSql("'0'")
                .HasColumnName("is_children");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.UrlName).HasColumnName("url_name");

            entity.HasOne(d => d.Brand).WithMany(p => p.Products)
                .HasForeignKey(d => d.BrandId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Product_Brand");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Product_Category");
        });

        modelBuilder.Entity<ProductColor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("product_color");

            entity.HasIndex(e => e.ProductId, "FK_ProductColor_Product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Color)
                .HasMaxLength(20)
                .HasColumnName("color");
            entity.Property(e => e.ProductId)
                .HasColumnType("int(11)")
                .HasColumnName("product_id");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductColors)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ProductColor_Product");
        });

        modelBuilder.Entity<ProductDetail>(entity =>
        {
            entity.HasKey(e => e.Sku).HasName("PRIMARY");

            entity.ToTable("product_detail");

            entity.HasIndex(e => e.ProductColorId, "FK_ProductDetail_ProductColor");

            entity.Property(e => e.Sku)
                .HasMaxLength(50)
                .HasColumnName("sku");
            entity.Property(e => e.DateEnd)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_end");
            entity.Property(e => e.DateStart)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_start");
            entity.Property(e => e.Note).HasColumnName("note");
            entity.Property(e => e.OldPrice)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("old_price");
            entity.Property(e => e.Price)
                .HasPrecision(10)
                .HasDefaultValueSql("'0'")
                .HasColumnName("price");
            entity.Property(e => e.ProductColorId)
                .HasColumnType("int(11)")
                .HasColumnName("product_color_id");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'0'")
                .HasColumnType("int(11)")
                .HasColumnName("quantity");
            entity.Property(e => e.Size)
                .HasMaxLength(5)
                .HasColumnName("size");

            entity.HasOne(d => d.ProductColor).WithMany(p => p.ProductDetails)
                .HasForeignKey(d => d.ProductColorId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ProductDetail_ProductColor");
        });

        modelBuilder.Entity<ProductImage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("product_image");

            entity.HasIndex(e => e.ProductColorId, "FK_ProductImage_ProductColor");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Image)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("image");
            entity.Property(e => e.ProductColorId)
                .HasColumnType("int(11)")
                .HasColumnName("product_color_id");

            entity.HasOne(d => d.ProductColor).WithMany(p => p.ProductImages)
                .HasForeignKey(d => d.ProductColorId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ProductImage_ProductColor");
        });

        modelBuilder.Entity<ProductReview>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("product_review");

            entity.HasIndex(e => e.ProductId, "FK_ProductReview_Product");

            entity.HasIndex(e => e.Sku, "FK_ProductReview_ProductDetail");

            entity.HasIndex(e => e.UserId, "FK_ProductReview_User");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.ProductId)
                .HasColumnType("int(11)")
                .HasColumnName("product_id");
            entity.Property(e => e.Respond)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("respond");
            entity.Property(e => e.Review).HasColumnName("review");
            entity.Property(e => e.Sku)
                .HasMaxLength(50)
                .HasColumnName("sku");
            entity.Property(e => e.Star)
                .HasDefaultValueSql("'5'")
                .HasColumnType("int(5)")
                .HasColumnName("star");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductReviews)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ProductReview_Product");

            entity.HasOne(d => d.SkuNavigation).WithMany(p => p.ProductReviews)
                .HasForeignKey(d => d.Sku)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ProductReview_ProductDetail");

            entity.HasOne(d => d.User).WithMany(p => p.ProductReviews)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ProductReview_User");
        });

        modelBuilder.Entity<ProductSport>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("product_sport");

            entity.HasIndex(e => e.ProductId, "FK_ProductSport_Product");

            entity.HasIndex(e => e.SportId, "FK_ProductSport_Sport");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.ProductId)
                .HasColumnType("int(11)")
                .HasColumnName("product_id");
            entity.Property(e => e.SportId)
                .HasColumnType("int(11)")
                .HasColumnName("sport_id");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductSports)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ProductSport_Product");

            entity.HasOne(d => d.Sport).WithMany(p => p.ProductSports)
                .HasForeignKey(d => d.SportId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ProductSport_Sport");
        });

        modelBuilder.Entity<Promotion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("promotion");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.DateEnd)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_end");
            entity.Property(e => e.DateStart)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_start");
            entity.Property(e => e.Description)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("description");
            entity.Property(e => e.Title)
                .HasMaxLength(200)
                .HasColumnName("title");
        });

        modelBuilder.Entity<PromotionDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("promotion_detail");

            entity.HasIndex(e => e.ProductId, "FK_PromotionDetail_Product");

            entity.HasIndex(e => e.PromotionId, "FK_PromotionDetail_Promotion");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Percent)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("percent");
            entity.Property(e => e.ProductId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("product_id");
            entity.Property(e => e.PromotionId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("promotion_id");

            entity.HasOne(d => d.Product).WithMany(p => p.PromotionDetails)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_PromotionDetail_Product");

            entity.HasOne(d => d.Promotion).WithMany(p => p.PromotionDetails)
                .HasForeignKey(d => d.PromotionId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_PromotionDetail_Promotion");
        });

        modelBuilder.Entity<Refund>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("refund");

            entity.HasIndex(e => e.CheckAdmin, "FK_Refund_AdminUser");

            entity.HasIndex(e => e.OrderDetailId, "FK_Refund_OrderDetails");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.CheckAdmin)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("check_admin");
            entity.Property(e => e.DateRefund)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_refund");
            entity.Property(e => e.OrderDetailId)
                .HasColumnType("int(11)")
                .HasColumnName("order_detail_id");
            entity.Property(e => e.Price)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("price");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("quantity");
            entity.Property(e => e.Reason)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("reason");
            entity.Property(e => e.Status)
                .HasDefaultValueSql("'0'")
                .HasColumnType("int(11)")
                .HasColumnName("status");

            entity.HasOne(d => d.CheckAdminNavigation).WithMany(p => p.Refunds)
                .HasForeignKey(d => d.CheckAdmin)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Refund_AdminUser");

            entity.HasOne(d => d.OrderDetail).WithMany(p => p.Refunds)
                .HasForeignKey(d => d.OrderDetailId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Refund_OrderDetails");
        });

        modelBuilder.Entity<Sport>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("sport");

            entity.HasIndex(e => e.Name, "name").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Username, "username").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Avatar)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("avatar");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_created");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(200)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("full_name");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(15)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("phone");
            entity.Property(e => e.Point)
                .HasDefaultValueSql("'0'")
                .HasColumnType("int(11)")
                .HasColumnName("point");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<UserAddress>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user_address");

            entity.HasIndex(e => e.UserId, "FK_UserAddress_User");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Address).HasColumnName("address");
            entity.Property(e => e.Type)
                .HasMaxLength(100)
                .HasColumnName("type");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.UserAddresses)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_UserAddress_User");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
