using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class GatePassController : Controller
    {
        public ActionResult GatePass()
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

        public ActionResult ContractualGatePass()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "2" || Session["UserRole"].ToString() == "6" || Session["UserRole"].ToString() == "7" ||
                    Session["UserRole"].ToString() == "8" || Session["UserRole"].ToString() == "11" || Session["UserRole"].ToString() == "12")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("AuthorizationError", "CustomError");
                }
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        public ActionResult GatePassRelease()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "2" || Session["UserRole"].ToString() == "6" || Session["UserRole"].ToString() == "7" ||
                    Session["UserRole"].ToString() == "8" || Session["UserRole"].ToString() == "11" || Session["UserRole"].ToString() == "12")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("AuthorizationError", "CustomError");
                }
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        public ActionResult GatePassInOut()
        {
            if (Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "5" || Session["UserRole"].ToString() == "11")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("AuthorizationError", "CustomError");
                }
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        public ActionResult GPSecReport()
        {
            if (Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "5" || Session["UserRole"].ToString() == "11")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("AuthorizationError", "CustomError");
                }
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        public ActionResult VehicleGatePassInOut()
        {
            if (Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "5" || Session["UserRole"].ToString() == "11")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("AuthorizationError", "CustomError");
                }
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        public ActionResult VehicleGatePassReport()
        {
            if (Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "5" || Session["UserRole"].ToString() == "11" || Session["UserRole"].ToString() == "12")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("AuthorizationError", "CustomError");
                }
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }
    }
}
