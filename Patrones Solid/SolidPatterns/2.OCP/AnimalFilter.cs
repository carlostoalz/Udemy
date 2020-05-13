namespace _2.OCP
{
    using System.Collections.Generic;
    using System.Linq;
    public class AnimalFilter : IFilter<Animal>
    {
        public List<Animal> Filter(IEnumerable<Animal> animals, ISpecification<Animal> specification) => animals.Where(o => specification.isSatisfied(o)).ToList();
    }
}
