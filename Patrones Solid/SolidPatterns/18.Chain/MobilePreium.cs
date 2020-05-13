namespace _18.Chain
{
    class MobilePreium : ISpecification<Mobile>
    {
        public bool IsSatisfied(Mobile item)
        {
            return item.Type == Type.Premium;
        }
    }
}
