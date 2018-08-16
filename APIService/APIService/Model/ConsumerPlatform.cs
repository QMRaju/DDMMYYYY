using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIService.Model
{
    public class ConsumerPlatform
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public long PhoneNo { get; set; }
        public long AlternativePhoneNo { get; set; }
        public string Sex { get; set; }
        public DateTime DOB { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public long PINCode { get; set; }
        public string LongStayYear { get; set; }
        public string LongStayMonth { get; set; }
        public int IsPermanent { get; set; }
        public long AdharNo { get; set; }
        public string Occupation { get; set; }
        public string EmployementNo { get; set; }
        public string Designation { get; set; }
        public string SalaryRange { get; set; }
        public string SavetoDraff { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateBy { get; set; }
        public string Enabled { get; set; }

 

    }
}