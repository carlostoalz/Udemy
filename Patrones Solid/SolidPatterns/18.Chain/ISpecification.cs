namespace _18.Chain
{
    interface ISpecification<T>
    {
        bool IsSatisfied(T item);
    }
}
