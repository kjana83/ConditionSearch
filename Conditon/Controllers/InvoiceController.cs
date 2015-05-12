using Conditon.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Conditon.Controllers
{
    public class InvoiceController : ApiController
    {
        public async Task<HttpResponseMessage> Post()
        {

            var provider = new PhotoMultipartFormDataStreamProvider(Environment.CurrentDirectory);

            await this.Request.Content.ReadAsMultipartAsync(provider);

            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);        

            // Specify values for optional parameters, as needed
            queryString["visualFeatures"] = "All";

            // Specify your subscription key
            queryString["subscription-key"] = "80f28591cb4c47f291b7fd401ff348f3";

            // Specify values for path parameters (shown as {...})
            var uri = "https://api.projectoxford.ai/vision/v1/analyses?" + queryString;


            HttpResponseMessage response;
            byte[] byteData = Encoding.UTF8.GetBytes("");
            foreach (var file in provider.FileData)
            {
                var fileInfo = new FileInfo(file.LocalFileName);
                var stream = new StreamReader(file.LocalFileName);
                byteData=Encoding.UTF8.GetBytes(stream.ReadToEnd());
            }

            // Specify request body
            

            using (var content = new ByteArrayContent(byteData))
            {
                response = await client.PostAsync(uri, content);
            }

            if (response.Content != null)
            {
                var responseString = await response.Content.ReadAsStringAsync();
                return this.Request.CreateResponse(HttpStatusCode.OK);
            }

            return this.Request.CreateResponse(HttpStatusCode.NotFound);
        }
    }
}
