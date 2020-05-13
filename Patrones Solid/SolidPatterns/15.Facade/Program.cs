namespace _15.Facade
{
    using System;

    public class HomeController
    {
        private WifiController _wifiController = new WifiController();
        private AirConditionerController _airController = new AirConditionerController();
        private LightController _lightController = new LightController();
        public void TurnOn()
        {
            _wifiController.TurnOn();
            _airController.TurnOn();
            _lightController.TurnOn();

        }

        public void TurnOff()
        {
            _wifiController.TurnOff();
            _airController.TurnOff();
            _lightController.TurnOff();

        }
    }
    public class WifiController
    {
        public void TurnOn()
        {
            Console.WriteLine("Wifi is on");
        }
        public void TurnOff()
        {

            Console.WriteLine("Wifi is off");
        }
    }

    public class AirConditionerController
    {
        public void TurnOn()
        {
            Console.WriteLine("Aire acondicionado is on");
        }
        public void TurnOff()
        {

            Console.WriteLine("Aire acondicionado is off");
        }
    }

    public class LightController
    {
        public void TurnOn()
        {
            Console.WriteLine("Luz is on");
        }
        public void TurnOff()
        {

            Console.WriteLine("Luz is off");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            HomeController homeController = new HomeController();

            Console.WriteLine("Llegando a casa....");
            homeController.TurnOn();
            Console.WriteLine("Salir de casa....");
            homeController.TurnOff();
            Console.ReadLine();
        }
    }
}
