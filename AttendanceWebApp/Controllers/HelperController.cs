using System;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class HelperController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public string GetUrl()
        {
            return String.Format("{0}://{1}", Request.Url.Scheme, Request.Url.Host);
        }
    }
}
