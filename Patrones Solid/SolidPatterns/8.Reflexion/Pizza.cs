namespace _8.Reflexion
{
    using System;
    using System.Collections.Generic;
    public abstract class Pizza
    {
        public string Name { get; set; }
        protected string Dough;
        protected string Sauce;
        protected List<string> Toppings = new List<string>();

        public void Prepare()
        {
            Console.WriteLine($"Prepararando: {Name}");
            Console.WriteLine($"Colocando masa: {Dough}");
            Console.WriteLine($"Agregando salsa: {Sauce}");
            Console.WriteLine($"Agregando Capas: {string.Join(",", Toppings)}");

        }
        public void Bake() => Console.WriteLine($"Cocinar por 20 min");
        public void Cut() => Console.WriteLine($"Pizza fue cortada en partes iguales");
        public void Box() => Console.WriteLine($"Pizza colocada en caja oficial");

    }
}
