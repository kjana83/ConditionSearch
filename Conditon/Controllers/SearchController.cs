using Conditon.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Conditon.Controllers
{
    public class SearchController : ApiController
    {
        public async Task<HttpResponseMessage> Get([FromUri]string id)
        {

            var httpClient = new HttpClient();            
            var url = String.Format("http://v1.syndication.nhschoices.nhs.uk/conditions/atoz/{0}.json?apikey=bbccdd", id.Substring(0, 1));
            var response = await httpClient.GetAsync(new Uri(url));
            string content = await response.Content.ReadAsStringAsync();
            var format= JsonConvert.DeserializeObject<List<Condition>>(content);
            
            var listConditions= format.Select(p=>p.Text);

            return this.Request.CreateResponse(HttpStatusCode.OK,listConditions );
        }
    }
}
