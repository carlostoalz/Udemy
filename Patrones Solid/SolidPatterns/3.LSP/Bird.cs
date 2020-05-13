namespace _3.LSP
{
    using System;
    public class Bird : Animal, ICanFly
    {
        public void Fly()
        {
            Console.WriteLine("Puedo volar");
        }
    }
}
