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

        //Income Declaration Report as per SAP Upload Format.
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

        //Update / Delete User Income Tax Declaration Details
        public ActionResult IncomeTaxDecFin()
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

        //Tax Comparison Report
        //public ActionResult TaxComparisonReport()
        //{
        //    if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
        //    {
        //        return View();
        //    }
        //    else
        //    {
        //        return RedirectToAction("Index", "Login");
        //    }
        //}

        public ActionResult Form16Upload()
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

        public ActionResult Form16()
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
