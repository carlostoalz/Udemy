namespace _23.NullObject
{
    using System;

    public interface IDiscount
    {
        double CalculateDiscount(double productCost);
    }

    public class StudentDiscount : IDiscount
    {
        public double CalculateDiscount(double productCost)
        {
            return productCost * 0.5;
        }
    }

    public class FriendDiscount : IDiscount
    {
        public double CalculateDiscount(double productCost)
        {
            return productCost * 0.6;
        }
    }

    public class NullDiscount : IDiscount
    {
        public double CalculateDiscount(double productCost)
        {
            return 0;
        }
    }
    public class Order
    {
        private IDiscount _discount;
        private int _productPrice;

        public Order(IDiscount discount, int productPrice)
        {
            _discount = discount;
            _productPrice = productPrice;
        }
        public Order() { }
        public double GetDiscout()
        {

            return _discount.CalculateDiscount(_productPrice);
        }

        public Order GetOrderByProducyName(string product) => new Order();
    }

    class Program
    {
        static void Main(string[] args)
        {
            var studentOrder = new Order(new StudentDiscount(), 50);
            studentOrder.GetDiscout();

            var friendOrder = new Order(new FriendDiscount(), 100);
            friendOrder.GetDiscout();

            var noDiscountOrder = new Order(new NullDiscount(), 100);
            noDiscountOrder.GetDiscout();
            var order = new Order();
            var orderByProduct = order.GetOrderByProducyName("Producto");

            if (orderByProduct != null)
            {
                Console.WriteLine($"La order es {orderByProduct}");
            }

            Console.ReadKey();
        }
    }
}
