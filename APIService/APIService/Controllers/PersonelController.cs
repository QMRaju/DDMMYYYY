using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIService.Controllers
{
    public class PersonelController : ApiController
    {
        [HttpGet]
        public IEnumerable<Personel> GetPersonelInfo()
        {
            using (DemoEntities entities=new DemoEntities())
            {
                return entities.Personels.ToList();
            }
        }
    }
}
