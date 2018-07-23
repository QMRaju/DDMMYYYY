using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIService.Controllers
{
    [RoutePrefix("api/Test")]
    public class TestController : ApiController
    {
        [Route("MyInfo")]
        public string MyTest()
        {
            string TestName = "sucess";
            return TestName; 
        }
    }
}
