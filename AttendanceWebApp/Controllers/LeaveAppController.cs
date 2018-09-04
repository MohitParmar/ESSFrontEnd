using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class LeaveAppController : Controller
    {
        public ActionResult LeaveApply()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); }
        }

        public ActionResult COffApply()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); }
        }

        public ActionResult LeaveRules()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); }
        }

        public ActionResult LeaveCancellation()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); }
        }

        public ActionResult FullLeaveCancel()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); }
        }
    }
}