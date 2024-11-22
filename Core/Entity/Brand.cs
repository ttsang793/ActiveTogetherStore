﻿namespace Core.Entity;

public partial class Brand : BaseEntity
{
    public string? Name { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
