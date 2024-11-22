using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class AdminUser
{
    public int Id { get; set; }

    public string Password { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<BlogArticle> BlogArticles { get; set; } = new List<BlogArticle>();

    public virtual ICollection<Import> Imports { get; set; } = new List<Import>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Refund> Refunds { get; set; } = new List<Refund>();
}
