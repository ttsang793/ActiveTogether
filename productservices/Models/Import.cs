using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class Import
{
    public int Id { get; set; }

    public DateTime? DateImport { get; set; }

    public int? CheckAdmin { get; set; }

    public decimal? Total { get; set; }

    public virtual Adminuser? CheckAdminNavigation { get; set; }

    public virtual ICollection<Importdetail> Importdetails { get; set; } = new List<Importdetail>();
}
