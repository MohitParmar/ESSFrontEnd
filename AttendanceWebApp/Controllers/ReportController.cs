﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class ReportController : Controller
    {
        //Releaser Reports
        public ActionResult EmployeeList()
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

        public ActionResult LeaveReport()
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
        //HR Reports
        public ActionResult PostedLeaveReport()
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

        public ActionResult PostedByReport()
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

        public ActionResult LeavePerformanceReport()
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

        public ActionResult PendingLeavesForPostReport()
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

        public ActionResult AllGatePassReport()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "3" || Session["UserRole"].ToString() == "8" || Session["UserRole"].ToString() == "9" ||
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

        public ActionResult AllUsersDetailsReport()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "3" || Session["UserRole"].ToString() == "8" || Session["UserRole"].ToString() == "4" ||
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

        public ActionResult UniformMasterReport()
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
        
        public ActionResult EmployeeReleaseStrategyList()
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
        //Common User Report
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
        //Common User Gatepass Report
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
        //Releaser GatePass Report
        public ActionResult ReleaserGatePassReport()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "2" || Session["UserRole"].ToString() == "6" || Session["UserRole"].ToString() == "7" ||
                    Session["UserRole"].ToString() == "8" || Session["UserRole"].ToString() == "11")
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
