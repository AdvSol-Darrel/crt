﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crt.Model.Dtos.Ratio
{
    public class RatioUpdateDto : RatioSaveDto
    {
        public decimal RatioId { get; set; }
    }
}