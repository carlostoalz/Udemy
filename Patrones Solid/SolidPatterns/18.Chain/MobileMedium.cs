
namespace _18.Chain
{
    class MobileMedium : ISpecification<Mobile>
    {
        public bool IsSatisfied(Mobile item)
        {
            return item.Type == Type.Medium;
        }
    }
}
