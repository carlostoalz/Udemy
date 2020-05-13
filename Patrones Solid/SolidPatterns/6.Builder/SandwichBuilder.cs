namespace _6.Builder
{
    public abstract class SandwichBuilder
    {
        protected Sandwich _sandwich;

        public Sandwich Sandwich
        {
            get { return _sandwich; }
        }
        public abstract void AddBread();
        public abstract void AddProtein();
        public abstract void AddCheese();
        public abstract void AddVeggies();
        public abstract void AddCondiments();
    }
}
