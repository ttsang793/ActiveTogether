using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class Useraddress
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public virtual User IdNavigation { get; set; } = null!;
}
