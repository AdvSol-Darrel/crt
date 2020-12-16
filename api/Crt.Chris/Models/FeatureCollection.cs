﻿namespace Crt.Chris.Models
{
    public class FeatureCollection<T>
    {
        public Feature<T> [] features { get; set; }
        public int totalFeatures { get; set; }
        public int numberMatched { get; set; }
    }

    public class FeatureCollection
    {
        public SimpleFeature[] features { get; set; }
        public int totalFeatures { get; set; }
        public int numberMatched { get; set; }
    }
}
