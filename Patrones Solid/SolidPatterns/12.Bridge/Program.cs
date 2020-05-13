namespace _12.Bridge
{
    using System;
    using System.Linq;

    public abstract class ReaderApp
    {
        public string Text { get; set; }
        protected IDisplayFormatter _displayFormatter;
        public ReaderApp(IDisplayFormatter displayFormatter)
        {
            _displayFormatter = displayFormatter;
        }

        public abstract void Display();
    }

    public interface IDisplayFormatter
    {
        void Display(string text);
    }

    public class NormalDisplay : IDisplayFormatter
    {
        public void Display(string text)
        {
            Console.WriteLine(text);
        }
    }

    public class ReverseDisplay : IDisplayFormatter
    {
        public void Display(string text)
        {
            Console.WriteLine(text.Reverse().ToArray());
        }
    }


    public class Windows7 : ReaderApp
    {
        public Windows7(IDisplayFormatter displayFormatter) : base(displayFormatter)
        {
        }

        public override void Display()
        {
            _displayFormatter.Display("Aplicación utilizada desde window 7 \n" + Text);
        }
    }
    public class Windows10 : ReaderApp
    {
        public Windows10(IDisplayFormatter displayFormatter) : base(displayFormatter)
        {
        }

        public override void Display()
        {
            _displayFormatter.Display("Aplicación utilizada desde window 10 \n" + Text);

        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            ReaderApp appWindow7 = new Windows7(new NormalDisplay()) { Text = "Aprendiendo Bridge" };
            appWindow7.Display();
            ReaderApp appWindow10 = new Windows10(new NormalDisplay()) { Text = "Aprendiendo Bridge" };
            appWindow10.Display();


            ReaderApp appWindowReverse7 = new Windows7(new ReverseDisplay()) { Text = "Aprendiendo Bridge" };
            appWindowReverse7.Display();
            ReaderApp appWindowReverse10 = new Windows10(new ReverseDisplay()) { Text = "Aprendiendo Bridge" };
            appWindowReverse10.Display();

            Console.ReadLine();
        }
    }
}
