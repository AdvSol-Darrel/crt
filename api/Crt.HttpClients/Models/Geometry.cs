﻿namespace Crt.HttpClients.Models
{
    public class Geometry<T>
    {
        public string type { get; set; }
        public T coordinates { get; set; }
    }

    public class Geometry
    {
        public string type { get; set; }
    }
}
