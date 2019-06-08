using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class ReleaseLeaveController : Controller
    {
        public ActionResult LeaveRelease()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "2" || Session["UserRole"].ToString() == "6" || Session["UserRole"].ToString() == "8" ||
                    Session["UserRole"].ToString() == "11")
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
