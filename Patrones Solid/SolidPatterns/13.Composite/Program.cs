namespace _13.Composite
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public abstract class Product
    {
        protected Product(string name, int price)
        {
            Name = name;
            Price = price;
        }

        public string Name { get; private set; }
        public int Price { get; private set; }

        public abstract void Add(Product product);
        public abstract void Remove(Product product);

        public abstract string GetPrice();
    }

    public class SimpleProduct : Product
    {
        public SimpleProduct(string name, int price) : base(name, price)
        {
        }

        public override void Add(Product product)
        {
            // Operación no se puede realizar porqué es el elemento que se encuentra mas abajo en la jerarquía

        }

        public override void Remove(Product product)
        {
            // Operación no se puede realizar porqué es el elemento que se encuentra mas abajo en la jerarquía
        }

        public override string GetPrice()
        {
            return $"El precio de {Name} es {Price.ToString("N2")}";
        }

    }

    public class CompositeProduct : Product
    {
        List<Product> _products = new List<Product>();

        public CompositeProduct(string name) : base(name, 0)
        {
        }

        public override void Add(Product product)
        {
            _products.Add(product);
        }

        public override string GetPrice()
        {
            return $"El precio de {Name} es {_products.Sum(o => o.Price).ToString("N2")}";
        }

        public override void Remove(Product product)
        {
            _products.Remove(product);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Product ram = new SimpleProduct("Ram 16 gb", 7000);
            Product processor = new SimpleProduct("Intel core 7", 17000);
            Product videoCard = new SimpleProduct("nVidia gtx 1050", 85000);
            Product keyBoard = new SimpleProduct("Teclado Dell", 300);
            Product mouse = new SimpleProduct("Mouse Dell", 300);
            Product rig = new SimpleProduct("Torre hp", 3000);
            Product led = new SimpleProduct("Led Lg", 4000);

            Product gamingKit = new CompositeProduct("Computador gamer básico");
            gamingKit.Add(ram);
            gamingKit.Add(processor);
            gamingKit.Add(videoCard);
            gamingKit.Add(keyBoard);
            gamingKit.Add(mouse);
            gamingKit.Add(rig);
            gamingKit.Add(led);

            Console.WriteLine(ram.GetPrice());
            Console.ReadLine();
        }
    }
}
