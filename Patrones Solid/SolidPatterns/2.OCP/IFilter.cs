namespace _2.OCP
{
    using System.Collections.Generic;
    public interface IFilter<T>
    {
        List<T> Filter(IEnumerable<T> animals, ISpecification<T> specification);
    }
}
