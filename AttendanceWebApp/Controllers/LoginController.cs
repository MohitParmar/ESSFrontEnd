using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AttendanceWebApp.Models;

namespace AttendanceWebApp.Controllers
{
    public class LoginController : Controller
    {
        private ApplicationDbContext _context;

        public LoginController() { _context = new ApplicationDbContext(); }

        protected override void Dispose(bool disposing) { _context.Dispose(); base.Dispose(disposing); }

        public ActionResult Index()
        {
            return View();
        }

        public static int iPasswordCounter = 0;

        [HttpPost]
        public ActionResult Users(Employees requestData)
        {
            try
            {
                Session["EmpUnqId"] = Convert.ToString(requestData.EmpUnqId);
                Session["EmpName"] = Convert.ToString(requestData.EmpName);
                Session["Pass"] = Convert.ToString(requestData.Pass);
                Session["CompCode"] = Convert.ToString(requestData.CompCode);
                Session["WrkGrp"] = Convert.ToString(requestData.WrkGrp);
                Session["UnitCode"] = Convert.ToString(requestData.UnitCode);
                Session["DeptCode"] = Convert.ToString(requestData.DeptCode);
                Session["StatCode"] = Convert.ToString(requestData.StatCode);
                Session["CatCode"] = Convert.ToString(requestData.CatCode);
                Session["IsHod"] = Convert.ToString(requestData.IsHod);

                bool IsReleaser = requestData.IsReleaser;

                bool IsHrUser = requestData.IsHrUser;

                if (IsReleaser == true && IsHrUser == false)
                {
                    Session["UserRole"] = "IsReleaser";
                }
                else if (IsHrUser == true && IsReleaser == false)
                {
                    Session["UserRole"] = "IsHrUser";
                }
                else if (IsHrUser == true && IsReleaser == true)
                {
                    Session["UserRole"] = "IsHrRelease";
                }
                else
                {
                    Session["UserRole"] = "IsUser";
                }
                return null;
            }
            catch
            {
                return null;
            }
        }

        ///Logout
        public ActionResult UserLogin()
        {
            Response.AddHeader("Cache-Control", "no-cache, no-store,must-revalidate");
            Response.AddHeader("Pragma", "no-cache");
            Response.AddHeader("Expires", "0");

            Session.Abandon();
            Session.Clear();
            Response.Cookies.Clear();
            Session.RemoveAll();

            Session["EmpUnqId"] = null;
            Session["EmpName"] = null;
            Session["Pass"] = null;
            Session["CompCode"] = null;
            Session["WrkGrp"] = null;
            Session["UnitCode"] = null;
            Session["DeptCode"] = null;
            Session["StatCode"] = null;
            Session["CatCode"] = null;
            Session["IsHod"] = null;
            Session["UserRole"] = null;

            return RedirectToAction("Index", "Login");
        }
    }
}