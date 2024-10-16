using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class User
{
    public int Id { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? Fullname { get; set; }

    public DateTime? DateCreated { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public int? Point { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Productreview> Productreviews { get; set; } = new List<Productreview>();

    public virtual ICollection<Useraddress> Useraddresses { get; set; } = new List<Useraddress>();
}
