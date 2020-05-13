﻿namespace _18.Chain
{
    using System;
    using System.Collections.Generic;

    abstract class Handler
    {
        protected Handler _successor;
        protected ISpecification<Mobile> _specification;

        protected Handler(ISpecification<Mobile> specification)
        {
            _specification = specification;
        }


        public void SetSuccessor(Handler successor)
        {
            this._successor = successor;
        }

        public abstract void HandleRequest(Mobile mobile);
    }

    class Employee : Handler
    {
        public Employee(ISpecification<Mobile> specification) : base(specification)
        {
        }

        public override void HandleRequest(Mobile mobile)
        {
            if (CanHandle(mobile))
            {
                Console.WriteLine($"Order de {mobile} realizada por {this.GetType().Name}");
            }
            else
            {
                _successor.HandleRequest(mobile);
            }

        }

        public bool CanHandle(Mobile mobile)
        {
            return _specification.IsSatisfied(mobile);
        }
    }

    class Supervisor : Handler
    {
        public Supervisor(ISpecification<Mobile> specification) : base(specification)
        {
        }

        public override void HandleRequest(Mobile mobile)
        {
            if (CanHandle(mobile))
            {
                Console.WriteLine($"Order de {mobile} realizada por {this.GetType().Name}");
            }
            else
            {
                _successor.HandleRequest(mobile);
            }

        }

        public bool CanHandle(Mobile mobile)
        {
            return _specification.IsSatisfied(mobile);
        }
    }

    class CEO : Handler
    {
        public CEO(ISpecification<Mobile> specification) : base(specification)
        {
        }

        public override void HandleRequest(Mobile mobile)
        {
            if (CanHandle(mobile))
            {
                Console.WriteLine($"Order de {mobile} realizada por {this.GetType().Name}");
            }
            else
            {
                _successor.HandleRequest(mobile);
            }

        }

        public bool CanHandle(Mobile mobile)
        {
            return _specification.IsSatisfied(mobile);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var iphone = new Mobile("Iphone", Type.Premium, 900);
            var xiaomiRedmi = new Mobile("Xiami redmi note", Type.Basic, 300);
            var xiamiMI = new Mobile("Xiami mi 9", Type.Medium, 600);

            var phones = new List<Mobile>();
            phones.Add(iphone);
            phones.Add(xiamiMI);
            phones.Add(xiaomiRedmi);

            var employee = new Employee(new MobileBasicMedium());
            var supervisor = new Supervisor(new MobileMedium());
            var ceo = new CEO(new MobilePreium());
            employee.SetSuccessor(supervisor);
            supervisor.SetSuccessor(ceo);
            phones.ForEach(t => employee.HandleRequest(t));
            Console.ReadLine();
        }
    }
}
