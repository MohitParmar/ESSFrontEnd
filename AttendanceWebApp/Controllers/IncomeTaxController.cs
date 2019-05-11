using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class IncomeTaxController : Controller
    {
        public ActionResult IncomeTaxDeclaration()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        public ActionResult ITDeclarationReport()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }
    }
}