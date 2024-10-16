using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace productservices.Models;

public partial class AtWebContext : DbContext
{
    public AtWebContext()
    {
    }

    public AtWebContext(DbContextOptions<AtWebContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Adminuser> Adminusers { get; set; }

    public virtual DbSet<Blogarticle> Blogarticles { get; set; }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Import> Imports { get; set; }

    public virtual DbSet<Importdetail> Importdetails { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Orderdetail> Orderdetails { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Productprice> Productprices { get; set; }

    public virtual DbSet<Productreview> Productreviews { get; set; }

    public virtual DbSet<Promotion> Promotions { get; set; }

    public virtual DbSet<Promotiondetail> Promotiondetails { get; set; }

    public virtual DbSet<Refund> Refunds { get; set; }

    public virtual DbSet<Refunddetail> Refunddetails { get; set; }

    public virtual DbSet<Sport> Sports { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Useraddress> Useraddresses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;uid=root;database=at_web");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Adminuser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("adminuser");

            entity.Property(e => e.Id)
                .HasColumnType("int(6)")
                .HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .HasColumnName("email");
            entity.Property(e => e.Fullname)
                .HasMaxLength(100)
                .HasColumnName("fullname");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(15)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Blogarticle>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("blogarticle");

            entity.HasIndex(e => e.WrittenAdmin, "FK_BlogArticle_Admin");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Brief)
                .HasMaxLength(512)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("brief");
            entity.Property(e => e.Content)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("content");
            entity.Property(e => e.DatePublish)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_publish");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
            entity.Property(e => e.UrlName)
                .HasMaxLength(200)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("url_name");
            entity.Property(e => e.WrittenAdmin)
                .HasColumnType("int(11)")
                .HasColumnName("written_admin");

            entity.HasOne(d => d.WrittenAdminNavigation).WithMany(p => p.Blogarticles)
                .HasForeignKey(d => d.WrittenAdmin)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_BlogArticle_Admin");
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("brand");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("category");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Import>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("import");

            entity.HasIndex(e => e.CheckAdmin, "FK_Import_Admin");

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
                .HasConstraintName("FK_Import_Admin");
        });

        modelBuilder.Entity<Importdetail>(entity =>
        {
            entity.HasKey(e => new { e.ImportId, e.ProductpriceId }).HasName("PRIMARY");

            entity.ToTable("importdetail");

            entity.HasIndex(e => e.ProductpriceId, "FK_ImportDetail_ProductPrice");

            entity.Property(e => e.ImportId)
                .HasColumnType("int(11)")
                .HasColumnName("import_id");
            entity.Property(e => e.ProductpriceId)
                .HasColumnType("int(11)")
                .HasColumnName("productprice_id");
            entity.Property(e => e.Price)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("price");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("quantity");

            entity.HasOne(d => d.Import).WithMany(p => p.Importdetails)
                .HasForeignKey(d => d.ImportId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ImportDetail_Import");

            entity.HasOne(d => d.Productprice).WithMany(p => p.Importdetails)
                .HasForeignKey(d => d.ProductpriceId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ImportDetail_ProductPrice");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("orders");

            entity.HasIndex(e => e.VertifyAdmin, "FK_Orders_Admin");

            entity.HasIndex(e => e.UserId, "FK_Orders_User");

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
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("point");
            entity.Property(e => e.Total)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("total");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");
            entity.Property(e => e.VertifyAdmin)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("vertify_admin");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Orders_User");

            entity.HasOne(d => d.VertifyAdminNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.VertifyAdmin)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Orders_Admin");
        });

        modelBuilder.Entity<Orderdetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("orderdetail");

            entity.HasIndex(e => e.OrderId, "FK_OrderDetail_Orders");

            entity.HasIndex(e => e.ProductpriceId, "FK_OrderDetail_ProductPrice");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.OrderId)
                .HasColumnType("int(11)")
                .HasColumnName("order_id");
            entity.Property(e => e.ProductpriceId)
                .HasColumnType("int(11)")
                .HasColumnName("productprice_id");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("quantity");

            entity.HasOne(d => d.Order).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_OrderDetail_Orders");

            entity.HasOne(d => d.Productprice).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.ProductpriceId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_OrderDetail_ProductPrice");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("products");

            entity.HasIndex(e => e.BrandId, "PK_Products_Brand");

            entity.HasIndex(e => e.CategoryId, "PK_Products_Category");

            entity.HasIndex(e => e.Name, "name").IsUnique();

            entity.HasIndex(e => e.UrlName, "url_name").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.BrandId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("brand_id");
            entity.Property(e => e.CategoryId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("category_id");
            entity.Property(e => e.Description)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("description");
            entity.Property(e => e.Gender)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("gender");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("is_active");
            entity.Property(e => e.IsChildren)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("is_children");
            entity.Property(e => e.Name)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("longtext")
                .HasColumnName("name");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("quantity");
            entity.Property(e => e.Size)
                .HasMaxLength(150)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("size");
            entity.Property(e => e.UrlName)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("longtext")
                .HasColumnName("url_name");

            entity.HasOne(d => d.Brand).WithMany(p => p.Products)
                .HasForeignKey(d => d.BrandId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("PK_Products_Brand");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("PK_Products_Category");

            entity.HasMany(d => d.Sports).WithMany(p => p.Products)
                .UsingEntity<Dictionary<string, object>>(
                    "Productsport",
                    r => r.HasOne<Sport>().WithMany()
                        .HasForeignKey("SportId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("FK_ProductSports_Sport"),
                    l => l.HasOne<Product>().WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("FK_ProductSports_Product"),
                    j =>
                    {
                        j.HasKey("ProductId", "SportId").HasName("PRIMARY");
                        j.ToTable("productsports");
                        j.HasIndex(new[] { "SportId" }, "FK_ProductSports_Sport");
                        j.IndexerProperty<int>("ProductId")
                            .HasColumnType("int(11)")
                            .HasColumnName("product_id");
                        j.IndexerProperty<int>("SportId")
                            .HasColumnType("int(11)")
                            .HasColumnName("sport_id");
                    });
        });

        modelBuilder.Entity<Productprice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("productprice");

            entity.HasIndex(e => e.ProductId, "FK_ProductPrice_Product");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Color)
                .HasMaxLength(100)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("color");
            entity.Property(e => e.DateEnd)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_end");
            entity.Property(e => e.DateStart)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_start");
            entity.Property(e => e.Image).HasColumnName("image");
            entity.Property(e => e.Price)
                .HasPrecision(10)
                .HasColumnName("price");
            entity.Property(e => e.ProductId)
                .HasColumnType("int(11)")
                .HasColumnName("product_id");

            entity.HasOne(d => d.Product).WithMany(p => p.Productprices)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ProductPrice_Product");
        });

        modelBuilder.Entity<Productreview>(entity =>
        {
            entity.HasKey(e => new { e.ProductId, e.UserId }).HasName("PRIMARY");

            entity.ToTable("productreview");

            entity.HasIndex(e => e.UserId, "FK_ProductReview_user");

            entity.Property(e => e.ProductId)
                .HasColumnType("int(11)")
                .HasColumnName("product_id");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");
            entity.Property(e => e.Review).HasColumnName("review");

            entity.HasOne(d => d.Product).WithMany(p => p.Productreviews)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ProductReview_Product");

            entity.HasOne(d => d.User).WithMany(p => p.Productreviews)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_ProductReview_user");
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
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Promotiondetail>(entity =>
        {
            entity.HasKey(e => new { e.PromotionId, e.ProductId }).HasName("PRIMARY");

            entity.ToTable("promotiondetail");

            entity.HasIndex(e => e.ProductId, "FK_PromotionDetail_Product");

            entity.Property(e => e.PromotionId)
                .HasColumnType("int(11)")
                .HasColumnName("promotion_id");
            entity.Property(e => e.ProductId)
                .HasColumnType("int(11)")
                .HasColumnName("product_id");
            entity.Property(e => e.Percent)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("percent");

            entity.HasOne(d => d.Product).WithMany(p => p.Promotiondetails)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_PromotionDetail_Product");

            entity.HasOne(d => d.Promotion).WithMany(p => p.Promotiondetails)
                .HasForeignKey(d => d.PromotionId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_PromotionDetail_Promotion");
        });

        modelBuilder.Entity<Refund>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("refund");

            entity.HasIndex(e => e.VertifyAdmin, "FK_Refund_Admin");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.DateRefunded)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_refunded");
            entity.Property(e => e.Total)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("total");
            entity.Property(e => e.VertifyAdmin)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("vertify_admin");

            entity.HasOne(d => d.VertifyAdminNavigation).WithMany(p => p.Refunds)
                .HasForeignKey(d => d.VertifyAdmin)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Refund_Admin");
        });

        modelBuilder.Entity<Refunddetail>(entity =>
        {
            entity.HasKey(e => new { e.OrderdetailId, e.RefundId }).HasName("PRIMARY");

            entity.ToTable("refunddetail");

            entity.HasIndex(e => e.RefundId, "FK_RefundDetail_Refund");

            entity.Property(e => e.OrderdetailId)
                .HasColumnType("int(11)")
                .HasColumnName("orderdetail_id");
            entity.Property(e => e.RefundId)
                .HasColumnType("int(11)")
                .HasColumnName("refund_id");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("quantity");

            entity.HasOne(d => d.Orderdetail).WithMany(p => p.Refunddetails)
                .HasForeignKey(d => d.OrderdetailId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RefundDetail_OrderDetail");

            entity.HasOne(d => d.Refund).WithMany(p => p.Refunddetails)
                .HasForeignKey(d => d.RefundId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RefundDetail_Refund");
        });

        modelBuilder.Entity<Sport>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("sport");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("date_created");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("email");
            entity.Property(e => e.Fullname)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("fullname");
            entity.Property(e => e.Password)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("password");
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
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("username");
        });

        modelBuilder.Entity<Useraddress>(entity =>
        {
            entity.HasKey(e => new { e.Id, e.Name }).HasName("PRIMARY");

            entity.ToTable("useraddress");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Address).HasColumnName("address");

            entity.HasOne(d => d.IdNavigation).WithMany(p => p.Useraddresses)
                .HasForeignKey(d => d.Id)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_UserAddress_User");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
