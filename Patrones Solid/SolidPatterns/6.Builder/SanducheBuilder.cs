namespace _6.Builder
{
    public class SanducheBuilder
    {
        protected Sandwich _sandwich;

        public Sandwich Sandwich
        {
            get { return _sandwich; }
        }

        public SanducheBuilder WithMeat()
        {
            _sandwich.Protein = "Carne";
            return this;
        }
        public SanducheBuilder WithCheeseChedar()
        {
            _sandwich.Cheese = "Queso chedar";
            return this;
        }

        public SanducheBuilder WithMayoMustard()
        {
            _sandwich.Cheese = "Mayonesa, Mostaza";
            return this;
        }
    }
}
