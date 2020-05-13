namespace _2.OCP
{
    public interface ISpecification<T>
    {
        bool isSatisfied(T item);
    }
}
