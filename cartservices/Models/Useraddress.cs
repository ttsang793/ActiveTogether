using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class UserAddress
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Type { get; set; } = null!;

    public string Address { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
