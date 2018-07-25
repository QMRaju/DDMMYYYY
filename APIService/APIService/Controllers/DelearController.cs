using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using APIService.Models;
using System.Data.Entity;


namespace APIService.Controllers
{

    [RoutePrefix("api/Delear")]
    public class DelearController : ApiController
    {
        //public DelearController()
        //{
        //    // Add the following code  
        //    // problem will be solved  
        //    db.Configuration.ProxyCreationEnabled = false;
        //}

        DemoEntities db = new DemoEntities();

        //public IEnumerable<Country> GetCountryList()
        //{
        //   var q = db.CountryMasters.ToList();
           

        //}

        //[Route("CountryList")]
        //[HttpGet]
        //public IHttpActionResult GetListOfCategory()
        //{
        //    try
        //    {
        //        var result = (from Country in db.CountryMasters
        //                      group Country by new { Country.Id, Country.Name } into getCountry
        //                      select new
        //                      {
        //                          CountryId = getCountry.Key.Id,
        //                          Name = getCountry.Key.Name
        //                      }).ToList();
        //        //var result = db.CountryMasters.ToList();
        //        return Ok(result);
        //    }
        //    catch (Exception S)
        //    {
        //        return BadRequest();

        //    }
        //}

        [Route("CountryList")]
        [HttpGet]
        public IHttpActionResult GetListOfSubCategory()
        {
            try
            {
                var result = (from subCat in db.CountryMasters
                              group subCat by new { subCat.ID, subCat.Name } into getsubCat
                              select new
                              {
                                  ID = getsubCat.Key.ID,
                                  Name = getsubCat.Key.Name
                              }).ToList();
                return Ok(result);
            }
            catch (Exception S)
            {
                return BadRequest();
                 
            }
        }

    }
}
