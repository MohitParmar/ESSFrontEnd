using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class ODController : Controller
    {
        public ActionResult ODApply()
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