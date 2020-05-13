namespace _3.LSP
{
    using System;
    class Program
    {
        static void Main(string[] args)
        {
            ICanFly animal = new Bird();
            animal.Noise = "AWW";
            animal.MakeNoise();
            animal.Fly();
            Console.ReadLine();
        }
    }
}
