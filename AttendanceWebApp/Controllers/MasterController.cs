using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class MasterController : Controller
    {
        public ActionResult CreateReleaseStreategy()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); }
        }

        public ActionResult UserManual()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); }
        }

        public ActionResult UniFormMaster()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); }
        }

        public ActionResult GatePass()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); }
        }
    }
}