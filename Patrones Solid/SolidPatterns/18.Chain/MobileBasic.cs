namespace _18.Chain
{
    class MobileBasic : ISpecification<Mobile>
    {
        public bool IsSatisfied(Mobile item)
        {
            return item.Type == Type.Basic;
        }
    }
}
