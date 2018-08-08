using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using APIService.Models;
using System.Data.Entity;
using APIService.Model;


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

        [Route("StateList")]
        [HttpGet]
        public IHttpActionResult GetListOfState(int countryID)

        {
            try
            {
                var result = (from subCat in db.StateMasters
                              where subCat.CountryID == countryID
                              group subCat by new { subCat.ID, subCat.Name } into State
                              select new
                              {
                                  ID = State.Key.ID,
                                  Name = State.Key.Name
                              }).ToList();
                return Ok(result);
            }
            catch (Exception S)
            {
                return BadRequest();

            }
        }


        [Route("cityList")]
        [HttpGet]
        public IHttpActionResult GetListOfcity(int stateID)

        {
            try
            {

                var result = (from subCat in db.CityMasters
                              where subCat.StateID == stateID
                              group subCat by new { subCat.ID, subCat.Name } into city
                              select new
                              {
                                  ID = city.Key.ID,
                                  Name = city.Key.Name
                              }).ToList();
                return Ok(result);
            }
            catch (Exception S)
            {
                return BadRequest();

            }
        }

        [Route("GetDelear")]
        [HttpGet]
        public IHttpActionResult Getdeleardetails(int cN, int sN, int ciN)

        {
            try
            {

                var result = (from w in db.WebDealarDetails
                              where w.CountryID == cN && w.StateID == sN && w.CityId == ciN
                              group w by new { w.RecordId, w.CountryName, w.StateName, w.CityName, w.DelarName, w.Enabled, w.CreateDate } into getsubCat
                              select new
                              {
                                  RecordId = getsubCat.Key.RecordId,
                                  CountryName = getsubCat.Key.CountryName,
                                  StateName = getsubCat.Key.StateName,
                                  CityName = getsubCat.Key.CityName,
                                  DelarName = getsubCat.Key.DelarName,
                                  Enabled = getsubCat.Key.Enabled,
                                  CreateDate = getsubCat.Key.CreateDate,
                              }).ToList();
                return Ok(result);
            }
            catch (Exception S)
            {
                return BadRequest();

            }
        }

        [Route("ConsumerCount")]
        [HttpGet]
        public IHttpActionResult GetConsumerdetails(int dealerID)

        {
            try
            {
                var countName = db.WebConsumerDetails.Where(t => t.DealerId == dealerID).Count();
                return Ok(countName);
            }
            catch (Exception S)
            {
                return BadRequest();

            }
        }

        [Route("GetConsumer")]
        [HttpGet]
        public IHttpActionResult GetConsumerdetailsall(int dealerID)
        {
            try
            {
                if (!string.IsNullOrEmpty(dealerID.ToString()))
                {
                    dealerID = 40801;
                }
                //int HardCodeID = 15002;

                var result = (from w in db.WebConsumerDetails
                              where w.DealerId == dealerID
                              group w by new { w.ConsumerID, w.ConsumerName, w.Email, w.MobileNumber, w.Location, w.Enabled, w.LastOrder } into getsubCat
                              select new
                              {
                                  ConsumerID = getsubCat.Key.ConsumerID,
                                  ConsumerName = getsubCat.Key.ConsumerName,
                                  Email = getsubCat.Key.Email,
                                  MobileNumber = getsubCat.Key.MobileNumber,
                                  Location = getsubCat.Key.Location,
                                  Enabled = getsubCat.Key.Enabled,
                                  LastOrder = getsubCat.Key.LastOrder,
                              }).ToList();
                return Ok(result);
            }
            catch (Exception S)
            {
                return BadRequest();

            }
        }


        [Route("DraffStatus")]
        [HttpGet]
        public int DraffStatus(string emailDraff)
        {
            int draffStatusFlag = 0;
            using (DemoEntities db = new DemoEntities())
            {
                var Status = db.WebConsumerProfiles.Where(x => x.Email == emailDraff).FirstOrDefault();
                if (Status != null) // update
                {
                    return draffStatusFlag = 1;
                }
                else
                {
                    return draffStatusFlag = 0;
                }
            }

             
        }

        [Route("SaveConsumerProfile")]
        [HttpGet]
        public IHttpActionResult Save(ConsumerPlatform cP)
        {
            try
            {
                using (var db = new DemoEntities())
                {
                    db.Entry(cP).State = cP.Id_== 0 ? EntityState.Added : EntityState.Modified;
                    db.SaveChanges();
                }
                return Ok();

            }
            catch (Exception)
            {

                throw;
            }


        }
    }
}
