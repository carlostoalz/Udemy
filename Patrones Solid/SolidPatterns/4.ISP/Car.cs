namespace _4.ISP
{
    using System;
    public class Car : IVehicle, IEngineVehicle
    {
        public int GetNumberOfWheel()
        {
            return 4;
        }

        public void Move()
        {
            Console.WriteLine("Moviendo");
        }

        public void startEngine()
        {
            Console.WriteLine("start");
        }

        public void stopEngine()
        {
            Console.WriteLine("stop");
        }
    }
}
