namespace _9.Prototype
{
    using System;
    using System.IO;
    using System.Runtime.Serialization.Formatters.Binary;

    public static class ExtensionMethods
    {
        public static T DeepCopy<T>(this T self)
        {
            var stream = new MemoryStream();
            var formatter = new BinaryFormatter();
            formatter.Serialize(stream, self);
            stream.Seek(0, SeekOrigin.Begin);

            object copy = formatter.Deserialize(stream);
            stream.Close();
            return (T)copy;

        }
    }

    interface IPrototype<T>
    {
        T DeepCopy();
    }

    public class Category : ICloneable
    {
        public Category()
        {

        }

        public Category(string name)
        {
            this.Name = name;
        }
        public string Name { get; set; }

        public object Clone()
        {
            return new Category(Name);
        }
    }
    public class Product : ICloneable
    {
        public string Name { get; set; }
        public Category Category { get; set; }
        public Price Price { get; set; }

        public Product(string name, Category category)
        {
            Name = name;
            Category = category;
        }

        public override string ToString()
        {
            return $"Producto: {Name}, Categoría: {Category.Name}";
        }

        public object Clone()
        {
            return new Product(Name, (Category)Category.Clone());
        }

        //public Product DeepCopy()
        //{
        //    return new Product { Name = Name, Category=(Category)Category.Clone(), Price = new Price(Price) };
        //}
    }

    public class Price
    {
        public double Amount { get; set; }
        public Price() { }
        public Price(Price price)
        {
            Amount = price.Amount;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var notebook1 = new Product("MacBook Pro", new Category("Computers"));

            var dell = notebook1.DeepCopy();
            dell.Category.Name = "Notebooks";
            dell.Name = "Dell";
            Console.WriteLine(notebook1);
            Console.WriteLine(dell);
            Console.ReadLine();
        }
    }
}
