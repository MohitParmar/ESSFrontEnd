﻿using System;
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
                if (Session["UserRole"].ToString() == "4" || Session["UserRole"].ToString() == "6" || Session["UserRole"].ToString() == "11")
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
        //Update / Delete User Income Tax Declaration Details
        public ActionResult IncomeTaxDecFin()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "4" || Session["UserRole"].ToString() == "6" || Session["UserRole"].ToString() == "11")
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