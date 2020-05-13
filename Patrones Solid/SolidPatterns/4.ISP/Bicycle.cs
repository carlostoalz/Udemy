namespace _4.ISP
{
    using System;
    public class Bicycle : IVehicle
    {
        public int GetNumberOfWheel()
        {
            return 2;
        }

        public void Move()
        {
            Console.WriteLine("Moviendo");
        }

    }
}
