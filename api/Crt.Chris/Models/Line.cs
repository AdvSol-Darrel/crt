﻿using System.Collections.Generic;

namespace Crt.Chris.Models
{
    public class Line
    {
        public List<Point> Points { get; set; }
        public decimal[][] Coordinates {get; set;}

        public Line(decimal[][] coordinates)
        {
            Coordinates = coordinates;
            Points = new List<Point>();

            for (var i = 0; i < coordinates.Length; i++)
            {
                Points.Add(new Point(coordinates[i]));
            }
        }

        public Line(params Point[] points)
        {
            Coordinates = new decimal[points.Length][];
            Points = new List<Point>();

            var i = 0;
            foreach(var point in points)
            {
                Points.Add(point);
                Coordinates[i] = point.Coordinates;
                i++;
            }
        }
    }
}
