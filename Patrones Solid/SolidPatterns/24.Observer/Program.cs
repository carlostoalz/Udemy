﻿namespace _24.Observer
{
    using System;
    using System.Collections.Generic;

    public interface IRestaurant
    {
        void Update(Fruits fruits);
    }


    public abstract class Fruits
    {
        private double _pricePerKg;
        private List<IRestaurant>_restaurants = new List<IRestaurant>();

        protected Fruits(double pricePerKg)
        {
            _pricePerKg = pricePerKg;
        }

        public void Attach(IRestaurant restaurant)
        {
            _restaurants.Add(restaurant);
        }

        public void Detach(IRestaurant restaurant)
        {
            _restaurants.Remove(restaurant);
        }

        public void Notify()
        {
            foreach (IRestaurant restaurant in _restaurants)
            {
                restaurant.Update(this);
                Console.WriteLine("");
            }



        }

        public double PricePerKg
        {
            get { return _pricePerKg; }
            set
            {
                if (_pricePerKg != value)
                {
                    _pricePerKg = value;
                    Notify();
                }
            }
        }

    }

    public class Limon : Fruits
    {
        public Limon(double pricePerKg) : base(pricePerKg)
        {
        }
    }

    public class Restaurant : IRestaurant
    {
        private string _name;
        private double _purchaseThreshold;

        public Restaurant(string name, double purchaseThreshold)
        {
            _name = name;
            _purchaseThreshold = purchaseThreshold;
        }

        public void Update(Fruits fruits)
        {
            Console.Write($"Notificando a {_name} que el precio de {fruits.GetType().Name} cambio a {fruits.PricePerKg}");

            if (fruits.PricePerKg < _purchaseThreshold)
            {
                Console.WriteLine("");
                Console.WriteLine($"{_name} quiere comprar algunos {fruits.GetType().Name}es!");
            }
        }
    }

    public class Button
    {
        public event EventHandler Clicked;

        public void Click()
        {
            Clicked?.Invoke(this, EventArgs.Empty);
        }
    }

    public class Form
    {
        public Form(Button button)
        {
            //button.Clicked += ButtonOnClicked;
            //Problemas con .net core solo se puede en formularios windows donde se hace uso de los eventos a controles en este caaso un formulario
            //WeakEventManager<Button, EventArgs>.AddHandler(button, "Clicked", ButtonOnClicked);
        }

        private void ButtonOnClicked(object sender, EventArgs e)
        {
            Console.WriteLine("El boton es clickeado");
        }

        ~Form()
        {
            Console.WriteLine("Form finalizo");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Limon limon = new Limon(0.82);
            limon.Attach(new Restaurant("La Paella", 0.77));
            limon.Attach(new Restaurant("La Gloria", 0.74));
            limon.Attach(new Restaurant("Los Consentidos", 0.75));

            // Fluctuacion de precios
            limon.PricePerKg = 0.79;
            limon.PricePerKg = 0.76;
            limon.PricePerKg = 0.74;
            limon.PricePerKg = 0.81;
        }

        private static void FireGC()
        {
            Console.WriteLine("Empezar GC");
            GC.Collect();
            GC.WaitForPendingFinalizers();
            GC.Collect();
            Console.WriteLine("Finalizar GC");
        }
    }
}
