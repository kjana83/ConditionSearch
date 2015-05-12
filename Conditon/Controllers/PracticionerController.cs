using Conditon.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Xml.Serialization;
using WebApi.OutputCache.V2;

namespace Conditon.Controllers
{
    public class PracticionerController : ApiController
    {
        [CacheOutput(ClientTimeSpan = 100, ServerTimeSpan = 100)]
        public async Task<HttpResponseMessage> Get()
        {
            var httpClient = new HttpClient();
            var url = @"http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/all.xml?apikey=bbccdd";
            var response = await httpClient.GetAsync(new Uri(url));
            var content = await response.Content.ReadAsStreamAsync();
            var reader = new XmlSerializer(typeof(feed));
            var feeds = (feed)reader.Deserialize(content);

            var practioners = new List<Practicioner>();

            try
            {
                foreach (var p in feeds.entry)
                {
                    var practicioner = new Practicioner
                    {
                        Name = p.content.organisationSummary.name,
                        AddressLine1 = (p.content.organisationSummary.address.addressLine.Length > 0) ? p.content.organisationSummary.address.addressLine[0] : String.Empty,
                        AddressLine2 = (p.content.organisationSummary.address.addressLine.Length > 1) ? p.content.organisationSummary.address.addressLine[1] : String.Empty,
                        AddressLine3 = (p.content.organisationSummary.address.addressLine.Length > 2) ? p.content.organisationSummary.address.addressLine[2] : String.Empty,
                        AddressLine4 = (p.content.organisationSummary.address.addressLine.Length > 3) ? p.content.organisationSummary.address.addressLine[3] : String.Empty,
                        AddressLine5 = (p.content.organisationSummary.address.addressLine.Length > 4) ? p.content.organisationSummary.address.addressLine[4] : String.Empty,
                        PostCode = p.content.organisationSummary.address.postcode,
                        Phone = p.content.organisationSummary.phone,
                        Latitude = p.content.organisationSummary.geographicCoordinates.latitude,
                        Longitude = p.content.organisationSummary.geographicCoordinates.longitude
                    };
                    practioners.Add(practicioner);
                }
            }
            catch (Exception ex)
            {

            }


            return this.Request.CreateResponse(HttpStatusCode.OK, practioners);
        }
    }
}
