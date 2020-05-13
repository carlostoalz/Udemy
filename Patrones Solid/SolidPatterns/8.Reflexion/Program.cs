namespace _8.Reflexion
{
    using System;
    class Program
    {
        static void Main(string[] args)
        {
            PizzaStore nyStore = new NYPizzaStore();
            Pizza pizza = nyStore.OrderPizza(TypeOfPizza.Pepperoni);
            Console.WriteLine($"Pizza {pizza.Name} lista para ser entregada a Rodrigo");
            Console.ReadLine();
        }
    }
}
