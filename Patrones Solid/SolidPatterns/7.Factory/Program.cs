namespace _7.Factory
{
    using System;
    class Program
    {
        static void Main(string[] args)
        {
            var user = User.Factory.CreateWithDefaultCountry("Rodrigo", "rodrigo@gmail.com");

            Console.WriteLine($"Usuario: {user.Name} Email: {user.Email}, Pais: {user.Country}");
            Console.ReadLine();
        }
    }
}
