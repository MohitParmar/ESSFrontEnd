using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class ShiftScheduleController : Controller
    {
        // GET: ShiftSchedule
        public ActionResult SSDLUP()
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
        
        public ActionResult SSUpdate()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }
        
        public ActionResult SSRelease()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }
        
        public ActionResult SSReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }
        
        public ActionResult SSHRReport()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }
        
        public ActionResult SSEmployee()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }
        
        public ActionResult SSOpenMonth()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        }

        //public ActionResult ShiftChange()
        //{
        //    return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //}
        //public ActionResult ReleaseShiftChange()
        //{
        //    return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //}
        //public ActionResult ShiftChangePosting()
        //{
        //    return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //}
        //public ActionResult ShiftChangeReportHR()
        //{
        //    return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //}
        //public ActionResult ShiftChangeUploadTemplate()
        //{
        //    return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //}
        //public ActionResult ShiftChangeReportSupervisor()
        //{
        //    return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //}
        //public ActionResult MyShiftChangeReport()
        //{
        //    return Session["EmpUnqId"] != null && Session["UserRole"] != null ? View() : (ActionResult)RedirectToAction("Index", "Login");
        //}
    }
}