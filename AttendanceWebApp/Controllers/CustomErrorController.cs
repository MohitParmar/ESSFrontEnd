using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class CustomErrorController : Controller
    {
        public ActionResult AuthorizationError()
        {
            return View();
        }

        public ActionResult UnderMaintainance()
        {
            return View();
        }
    }
}
