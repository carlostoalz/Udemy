namespace _11.Adapter
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Xml.Linq;

    public class Product
    {
        public Product()
        { }
        public Product(string name, int price)
        {
            Name = name;
            Price = price;
        }

        public string Name { get; set; }
        public int Price { get; set; }
    }

    public static class ProductDataProvider
    {
        public static List<Product> GetData() =>
            new List<Product>
            {
                new Product("IPhone", 5000),
                new Product("Xiami Mi 2", 100),
                new Product("Samsung s9", 4000)
            };
    }

    public class XmlConverter
    {
        public XDocument GetXml()
        {
            var xDocument = new XDocument();
            var xElement = new XElement("Productos");
            var xAttributes = ProductDataProvider.GetData().Select(m => new XElement("Producto",new XAttribute("Nombre", m.Name), new XAttribute("Precio", m.Price)));
            xElement.Add(xAttributes);
            xDocument.Add(xElement);
            return xDocument;
        }
    }

    public interface IXmlToJson
    {
        void ConvertXmlToJson();
    }

    public class XmlToJsonAdapter : IXmlToJson
    {
        private XmlConverter _xmlConverter;

        public XmlToJsonAdapter(XmlConverter xmlConverter)
        {
            _xmlConverter = xmlConverter;
        }

        public void ConvertXmlToJson()
        {
            var products = _xmlConverter.GetXml()
                .Element("Productos")
                .Elements("Producto")
                .Select(m => new Product
                {
                    Name = m.Attribute("Nombre").Value,
                    Price = int.Parse(m.Attribute("Precio").Value)
                });

            new JsonConverter(products).ConvertToJson();
        }
    }

    public class JsonConverter
    {
        private IEnumerable<Product> _productData;

        public JsonConverter(IEnumerable<Product> productData)
        {
            _productData = productData;
        }

        public void ConvertToJson()
        {
            string result = JsonConvert.SerializeObject(_productData, Newtonsoft.Json.Formatting.Indented);
            Console.WriteLine(result);
        }
    }


    class Program
    {
        static void Main(string[] args)
        {
            var xmlConverter = new XmlConverter();
            var adapter = new XmlToJsonAdapter(xmlConverter);
            adapter.ConvertXmlToJson();
            Console.ReadLine();
        }
    }
}
