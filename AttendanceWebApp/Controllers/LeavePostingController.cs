using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class LeavePostingController : Controller
    {
        public ActionResult LeavePosting()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "IsHrUser" || Session["UserRole"].ToString() == "IsHrRelease" || Session["UserRole"].ToString() == "IsAdmin")
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

        public ActionResult LeaveApplicationView()
        {
            if (Session["UserRole"].ToString() == "IsHrUser" || Session["UserRole"].ToString() == "IsHrRelease" || Session["UserRole"].ToString() == "IsAdmin")
            {
                return View();
            }
            else
            {
                return RedirectToAction("AuthorizationError", "CustomError");
            }
        }
    }
}
