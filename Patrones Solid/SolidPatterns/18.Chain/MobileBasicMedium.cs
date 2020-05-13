namespace _18.Chain
{
    class MobileBasicMedium : ISpecification<Mobile>
    {
        public bool IsSatisfied(Mobile item)
        {
            return item.Type == Type.Medium || item.Type == Type.Basic;
        }
    }
}
