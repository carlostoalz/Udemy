using System;

namespace _6.Builder
{
    class Program
    {
        static void Main(string[] args)
        {
            var sandwich = new SandwichAssembly(new CheeseBurger());
            sandwich.Assemble();
            Console.WriteLine($"{sandwich.GetSandwich.Bread} {sandwich.GetSandwich.Cheese} {sandwich.GetSandwich.Protein} {sandwich.GetSandwich.Veggies} {sandwich.GetSandwich.Condiments}");
            Console.ReadLine();

            var builder = new SanducheBuilder()
                .WithMeat()
                .WithCheeseChedar()
                .WithMayoMustard();
        }
    }
}
