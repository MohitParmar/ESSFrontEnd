using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class MediclaimController : Controller
    {
        // GET: Mediclaim
        public ActionResult NameAddition() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");

        public ActionResult DependentDetails() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");

        public ActionResult ReleaseDependents() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
    }
}