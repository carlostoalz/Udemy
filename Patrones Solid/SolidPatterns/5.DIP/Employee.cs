namespace _5.DIP
{
    public class Employee
    {
        private Email _email;
        private SMS _sms;

        public Employee(Email email, SMS sms)
        {
            _email = email;
            _sms = sms;
        }

        public void Send()
        {
            _email.SendEmail();
            _sms.SendSMS();
        }

    }
}
