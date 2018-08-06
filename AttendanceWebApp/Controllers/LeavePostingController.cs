using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class LeavePostingController : Controller
    {
        public ActionResult LeavePosting()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); }
        }
    }
}