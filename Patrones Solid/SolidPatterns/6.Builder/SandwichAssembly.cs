namespace _6.Builder
{
    public class SandwichAssembly
    {
        private SandwichBuilder _sadwichBuilder;

        public SandwichAssembly(SandwichBuilder sadwichBuilder)
        {
            _sadwichBuilder = sadwichBuilder;
        }

        public void Assemble()
        {
            _sadwichBuilder.AddBread();
            _sadwichBuilder.AddCheese();
            _sadwichBuilder.AddVeggies();
            _sadwichBuilder.AddCondiments();
        }

        public Sandwich GetSandwich
        {
            get { return _sadwichBuilder.Sandwich; }
        }
    }
}
