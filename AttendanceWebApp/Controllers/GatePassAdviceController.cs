using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class GatePassAdviceController : Controller
    {
        // Generate Gate Pass Advice
        public ActionResult GenerateGPAdvice() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //Release Gate Pass Advice
        public ActionResult ReleaseGPAdvice() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //Post Gate Pass Advice by Store User
        public ActionResult POSTGPAdvice() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //Get Gate Pass Advice List by User
        public ActionResult GetGPAdviceList() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        public ActionResult GPAdviceReport() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        public ActionResult MasterUpload() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        public ActionResult PostedGPAdviceReport() => Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
    }
}
