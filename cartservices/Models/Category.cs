﻿using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Category
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
