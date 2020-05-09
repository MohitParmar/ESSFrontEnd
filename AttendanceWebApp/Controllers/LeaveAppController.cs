using AttendanceWebApp.Models;
using System.Linq;
using System.Web.Mvc;

namespace AttendanceWebApp.Controllers
{
    public class LeaveAppController : Controller
    {
        private ApplicationDbContext _context;

        public LeaveAppController()
        {
            _context = new ApplicationDbContext();
        }

        public ActionResult LeaveApply()
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

        public ActionResult COffApply()
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

        public ActionResult COffApplyJFL()
        {
            return Session["EmpUnqId"] != null && Session["UserRole"] != null
                ? View()
                : (ActionResult)RedirectToAction("Index", "Login");
        }

        public ActionResult LeaveRules()
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

        public ActionResult LeaveCancellation()
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

        public ActionResult FullLeaveCancel()
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

        public ActionResult WOChangeBEL()
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

        [HttpGet]
        [System.Web.Http.ActionName("GetLeaveTypeList")]
        public JsonResult GetLeaveTypeList(string compid)
        {
            try
            {
                var LeaveTypeData = (from o in _context.LeaveTypes
                                     where
                                     o.CompCode == compid &&
                                     o.WrkGrp == "COMP" && o.Active == true

                                     select new { o.LeaveTypeCode, o.LeaveTypeName }).ToList();
                return Json(LeaveTypeData, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return null;
            }
        }
    }
}
