using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
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

        public ActionResult ChangePassword()
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

        public ActionResult EmployeeProfile()
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

        public ActionResult ResetPassword()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "3" || Session["UserRole"].ToString() == "8" || Session["UserRole"].ToString() == "11")
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

        public ActionResult UpdateEmailAdd()
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

        public ActionResult OpenMonth()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "3" || Session["UserRole"].ToString() == "8" || Session["UserRole"].ToString() == "11")
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
