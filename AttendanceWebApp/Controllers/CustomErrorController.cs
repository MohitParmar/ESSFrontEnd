using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class CustomErrorController : Controller
    {
        public ActionResult AuthorizationError()
        {
            return View();
        }
    }
}
