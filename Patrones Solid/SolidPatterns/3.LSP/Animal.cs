
namespace _3.LSP
{
using System;
    public class Animal : IAnimal
    {
        public string Noise { get; set; }
        public virtual void MakeNoise()
        {
            Console.WriteLine(Noise);
        }

    }
}
