using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class MedicalFitnessController : Controller
    {
        // GET: MedicalFittness
        public ActionResult MedicalFit() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");

        public ActionResult MedicalFitReport() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
    }
}