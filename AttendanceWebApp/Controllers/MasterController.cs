using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class MasterController : Controller
    {
        //Create Or Update Releaser Strategies
        public ActionResult CreateReleaseStreategy()
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

        public ActionResult UserManual()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult UniFormMaster()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult AddressMaster()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        //Manage Leave Application Changes

        public ActionResult ManageLeaveMaster()
        {
            if (Session["EmpUnqId"] != null && Session["UserRole"] != null)
            {
                if (Session["UserRole"].ToString() == "11") { return View(); }
                else { return RedirectToAction("AuthorizationError", "CustomError"); }
            }
            else { return RedirectToAction("Index", "Login"); }
        }

        public ActionResult SalarySlip()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult SalarySlipUpload()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult UserProfileView()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult SAPIDReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }
    }
}

//public ActionResult VerifyAddressHR()
//{ return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login"); }