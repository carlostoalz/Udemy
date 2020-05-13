namespace _8.Reflexion
{
    using System;
    public class NYPizzaStore : PizzaStore
    {
        public override Pizza CreatePizza(TypeOfPizza type)
        {

            return (Pizza)Activator.
                CreateInstance(Type.GetType($"PizzaFactory.NY{Enum.GetName(typeof(TypeOfPizza), type)}Pizza"));

        }
    }
}
