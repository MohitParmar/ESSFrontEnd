using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class ReportController : Controller
    {
        public ActionResult LeaveReport()
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

        public ActionResult PendingLeavesForPostReport()
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

        public ActionResult PostedLeaveReport()
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

        public ActionResult EmployeeList()
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

        public ActionResult EmployeeReleaseStrategyList()
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

        public ActionResult PerformanceReport()
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

        public ActionResult LeavePerformanceReport()
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

        public ActionResult PostedByReport()
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

        public ActionResult UniformMasterReport()
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

        public ActionResult PrintGatePassReport()
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

        ///View All Gate Pass List
        public ActionResult AllGatePassReport()
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

        public ActionResult ReleaserGatePassReport()
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

        public ActionResult AllUsersDetailsReport()
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
    }
}
