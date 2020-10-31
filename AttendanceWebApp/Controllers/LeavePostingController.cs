using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class LeavePostingController : Controller
    {
        public ActionResult LeavePosting()
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

        //View User Leave Applications / User Dashboard
        public ActionResult LeaveApplicationView()
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
    }
}
