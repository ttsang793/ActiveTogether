using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class Adminuser
{
    public int Id { get; set; }

    public string Password { get; set; } = null!;

    public string Fullname { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<Blogarticle> Blogarticles { get; set; } = new List<Blogarticle>();

    public virtual ICollection<Import> Imports { get; set; } = new List<Import>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Refund> Refunds { get; set; } = new List<Refund>();
}
