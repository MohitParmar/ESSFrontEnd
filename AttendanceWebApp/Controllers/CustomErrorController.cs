using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class CustomErrorController : Controller
    {
        public ActionResult AuthorizationError() => View();

        public ActionResult UnderMaintainance() => View();
    }
}
