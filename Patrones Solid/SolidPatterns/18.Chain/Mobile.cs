using System;

namespace _18.Chain
{
    public class Mobile
    {
        public Mobile(string name, Type type, double price)
        {
            Type = type;
            Price = price;
            Name = name;
        }

        public Type Type { get; private set; }
        public double Price { get; private set; }
        public string Name { get; private set; }

        public override string ToString()
        {
            return $"{Name}, Categoría: {Type}, Precio: {Price}";
        }
    }
}