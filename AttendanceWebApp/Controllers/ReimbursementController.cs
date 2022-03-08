using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class ReimbursementController : Controller
    {
        public ActionResult Conveyance_Form() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //public ActionResult LTA_Form() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //public ActionResult Advance_Form() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //public ActionResult ReimbursementFroms() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        public ActionResult ReimbursementReport() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        public ActionResult ReimbursementRelease() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
    }
}
