using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIService.Controllers
{
    [RoutePrefix("api/Employees")]
    public class EmployeesController : ApiController
    {
       // [Authorize]
        public IEnumerable<Employee> Get()
        {
            using (DemoEntities entities = new DemoEntities())
            {
                return entities.Employees.ToList();
            }
        }

        [Route("Create")]
        [HttpPost]
        public IHttpActionResult Create(Employee emp)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid Request");
            using (DemoEntities entities = new DemoEntities())
            {
                entities.Employees.Add(emp);
                entities.SaveChanges();

            }
            return Ok();
        }

        [Route("Update")]
        [HttpPut]
        public IHttpActionResult Update(Employee emp)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");
            using (DemoEntities ctx = new DemoEntities())
            {
                var existingEmp = ctx.Employees.Where(c => c.code == emp.code)
                    .FirstOrDefault<Employee>();
                if(existingEmp != null)
                {
                    existingEmp.code = emp.code;
                    existingEmp.name = emp.name;
                    existingEmp.gender = emp.gender;
                    existingEmp.annualSalary = emp.annualSalary;
                    existingEmp.dateOfBirth = emp.dateOfBirth;
                    ctx.SaveChanges();
                }
                else { NotFound(); }
            }

            return Ok();
        }

        [HttpDelete]
        [Route("Delete")]
        public IHttpActionResult Delete(string codeParam)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");
            using (DemoEntities entities = new DemoEntities())
            {
                var ctx = entities.Employees.Where(e => e.code == codeParam)
                    .FirstOrDefault<Employee>();
                if(ctx != null)
                {
                    entities.Employees.Remove(ctx);
                    entities.SaveChanges();
                }
                else { NotFound(); }


            }

            return Ok();


        }
    }
}
