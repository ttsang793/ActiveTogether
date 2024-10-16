using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Blogarticle
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Brief { get; set; }

    public string? UrlName { get; set; }

    public int WrittenAdmin { get; set; }

    public string? Content { get; set; }

    public DateTime? DatePublish { get; set; }

    public virtual Adminuser WrittenAdminNavigation { get; set; } = null!;
}
