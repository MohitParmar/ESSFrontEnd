using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class ProgressReviewController : Controller
    {
        //HR: Generate Review Quators
        public ActionResult ReviewQuatorMaster()
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

        //Supervisor: Submit Performance Review Details
        public ActionResult PerformanceReview()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        //HOD: Submit/Release Perfomance Review
        public ActionResult PerformanceReviewRelease()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        //HR: Submit/Release Performance Review
        public ActionResult PerformanceReviewHRRelease()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult PerformanceReviewReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult PerformanceStatusReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }
    }
}