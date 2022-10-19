using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class AddressProofController : Controller
    {
        // GET: AddressProof
        public ActionResult AddressProofRequest()
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
        //public ActionResult GetEmpAddProof() { if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); } }
        //public ActionResult AddressProofRelease() { if (Session["EmpUnqId"] != null && Session["UserRole"] != null) { return View(); } else { return RedirectToAction("Index", "Login"); } }
    }
}