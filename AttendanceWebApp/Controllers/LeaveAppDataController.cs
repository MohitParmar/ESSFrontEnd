using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AttendanceWebApp.Models;

namespace AttendanceWebApp.Controllers
{
    public class LeaveAppDataController : ApiController
    {
        private ApplicationDbContext _context;

        public LeaveAppDataController() { _context = new ApplicationDbContext(); }

        //Get Leave Types
        [HttpGet]
        [System.Web.Http.ActionName("GetLeaveTypeList")]
        public dynamic GetLeaveTypeList()
        {
            try
            {
                var LeaveTypeData = (from o in _context.LeaveTypes
                                     where o.WrkGrp == "comp" && o.Active == true
                                     select new
                                     {
                                         o.LeaveTypeCode,
                                         o.LeaveTypeName
                                     }).ToList<dynamic>();

                return LeaveTypeData;
            }
            catch
            {
                return null;
            }
        }
    }
}