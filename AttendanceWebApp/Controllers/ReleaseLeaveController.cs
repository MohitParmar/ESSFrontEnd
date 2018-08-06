using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class ReleaseLeaveController : Controller
    {
        public ActionResult LeaveRelease()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); }
        }
    }
}