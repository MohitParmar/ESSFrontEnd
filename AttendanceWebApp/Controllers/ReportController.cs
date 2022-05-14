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
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        public ActionResult LeaveReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        //HR Reports
        public ActionResult PostedLeaveReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult PostedByReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult LeavePerformanceReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult PendingLeavesForPostReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult AllGatePassReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult AllUsersDetailsReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult UniformMasterReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult EmployeeReleaseStrategyList()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        //Common User Report
        public ActionResult PerformanceReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        //Common User Gatepass Report
        public ActionResult PrintGatePassReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        //Releaser GatePass Report
        public ActionResult ReleaserGatePassReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult PendingLeaveReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult DeptLeaveReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }
    }
}
