﻿using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Productreview
{
    public int ProductId { get; set; }

    public int UserId { get; set; }

    public string Review { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
