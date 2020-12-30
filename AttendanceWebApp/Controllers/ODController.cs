using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class ODController : Controller
    {
        public ActionResult ODApply() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
    }
}
