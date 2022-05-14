using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class VaccinationController : Controller
    {
        // GET: Vaccination
        public ActionResult UploadVaccinationCertificate()
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

        public ActionResult VaccinationReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }
    }
}