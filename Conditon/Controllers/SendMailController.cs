
using System;
using System.Net;
using System.Net.Mail;
using SendGrid;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;

namespace Conditon.Controllers
{
    public class SendMailController : ApiController
    {
        public HttpResponseMessage Get([FromUri]string recipient)
        {
            SendGridMessage myMessage = new SendGridMessage();
            myMessage.AddTo(recipient);
            myMessage.From = new MailAddress("Hackathon@tcs.com", "TCS Hackathon");
            myMessage.Subject = "Claim Processing";
            myMessage.Text = "Your claim has been processed successfully";

            // Create credentials, specifying your user name and password.
            var credentials = new NetworkCredential("azure_40249abca3689a4e45df83973b571266@azure.com", "ncbwL42Ik93nHlm");

            // Create an Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            // You can also use the **DeliverAsync** method, which returns an awaitable task.
            transportWeb.DeliverAsync(myMessage);

            return this.Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
