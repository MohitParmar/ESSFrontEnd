﻿$(document).ready(function () {
    var conpath,
        url_string = window.location.href,
        url = new URL(url_string),
        urlhost = url.hostname,
        urlprotocol = url.protocol;
    url.port;
    if ("undefined" != typeof _ConPath) {
        conpath = urlhost === _URLHostName ? _ConPath : urlprotocol + "//" + urlhost + "/api/";
        var newArr = {},
            chk = $("#myUserRole").val(),
            _wrkgrp = $("#myWrkGrp").val(),
            loc = $("#myLoc").val(),
            _memberId = $("#myEmpUnqId").val();
        jQuery.support.cors = !0;
        var rel = new XMLHttpRequest;
        if (rel.open("GET", conpath + "Roles/GetRoleAuth?empUnqId=" + _memberId, !0),
            rel.setRequestHeader("Accept", "application/json"), rel.onreadystatechange = function () {
                if (4 === rel.readyState) {
                    var jsonvar1 = JSON.parse(rel.responseText);
                    newArr = jsonvar1;
                    for (var i = 0; i < newArr.length; i++) document.getElementById(newArr[i].menuId).hidden = !1
                    var ndFLG = $("#myNDFlag").val();
                    if (ndFLG === "True") {
                        $("#mnuNODuesStatus").show();
                    } else {
                        $("#mnuNODuesStatus").hide();
                    }
                }
            }, rel.send(), "IPU" === loc)
            _URLHostName !== urlhost &&
                "COMP" === _wrkgrp &&
                ($("#mnuMaster").hide(), $("#mnuReport").hide(), $("#mnuUitility").hide(), $("#mnuLeavePosting").hide(),
                    $("#mnuCreateGatePass").hide(), $("#mnuContCreateGatePass").hide(), $("#mnuGatePassInOut").hide(),
                    $("#mnuEmployeeProfile").hide(), $("#mnuIncomeTaxDeclaration").show(),
                    $("#mnuAddressMaster").show(), $("#mnuuniformmaster").hide(), $("#mnuUpdateEmailAdd").hide(),
                    $("#mnuUserManual").hide(), $("#mnuChangePassword").hide(), $("#mnuPayslipUpload").hide(), $(
                        "#mnuPayslip").show());
        else if ("NKP" === loc)
            _URLHostName !== urlhost &&
                "COMP" === _wrkgrp &&
                ($("#mnuMaster").hide(), $("#mnuReport").hide(), $("#mnuGatePass").hide(), $("#mnuUitility").hide(),
                    $("#mnuLeavePosting").hide(), $("#mnuEmployeeProfile").hide(), $("#mnuIncomeTaxDeclaration").hide(),
                    $("#mnuAddressMaster").hide(), $("#mnuuniformmaster").hide(), $("#mnuUpdateEmailAdd").hide(),
                    $("#mnuUserManual").hide(), $("#mnuChangePassword").hide(), $("#mnuPayslipUpload").hide(), $(
                        "#mnuPayslip").show());
        else if ("BEL" === loc) {
            if (_URLHostName !== urlhost && "COMP" === _wrkgrp) {
                var s = $("#myEmpUnqId").val();
                "105440" === s
                    ? ($("#mnuReport").show(), $("#mnuLeaveReport").show(), $("#mnuReleaserEmpReport").hide(),
                        $("#mnuITDReport").hide(), $("#mnuLeaveApplicationDetails").hide(),
                        $("#mnuPostedLeaveReport").hide(), $("#mnuPostedByReport").hide(),
                        $("#mnuLeavePerformanceReport").hide(), $("#mnuPendingLeavesForPostReport").hide(),
                        $("#mnuAllGatePassReport").hide(), $("#mnuUserPresentAddressReport").hide(),
                        $("#mnuUniformMasterReport").hide(), $("#mnuEmpRlsStrLstReport").hide(), $(
                            "#mnuVehicleGatePassReport").hide())
                    : $("#mnuReport").hide(), $("#mnuMaster").hide(), $("#mnuUitility").hide(),
                    $("#mnuLeavePosting").hide(), $("#mnuCreateGatePass").show(),
                    "2" === chk || "6" === chk || "7" === chk || "8" === chk || "11" === chk
                        ? $("#mnuContCreateGatePass").show()
                        : $("#mnuContCreateGatePass").hide(), $("#mnuGatePassInOut").hide(),
                    $("#mnuEmployeeProfile").hide(), $("#mnuIncomeTaxDeclaration").hide(),
                    $("#mnuAddressMaster").hide(),
                    $("#mnuuniformmaster").hide(), $("#mnuUpdateEmailAdd").hide(), $("#mnuUserManual").hide(),
                    $("#mnuChangePassword").hide(), $("#mnuPayslipUpload").hide(), $("#mnuPayslip").show()
            }
        } else
            "JFL" === loc
                ? _URLHostName !== urlhost &&
                "COMP" === _wrkgrp &&
                ($("#mnuMaster").hide(), $("#mnuReport").hide(), $("#mnuUitility").hide(), $("#mnuLeavePosting").hide(),
                    $("#mnuCreateGatePass").hide(), $("#mnuContCreateGatePass").hide(), $("#mnuGatePassInOut").hide(),
                    $("#mnuEmployeeProfile").hide(), $("#mnuIncomeTaxDeclaration").hide(),
                    $("#mnuAddressMaster").hide(), $("#mnuuniformmaster").hide(), $("#mnuUpdateEmailAdd").show(),
                    $("#mnuUserManual").hide(), $("#mnuChangePassword").hide(), $("#mnuPayslipUpload").hide(), $(
                        "#mnuPayslip").show())
                : "KJSAW" === loc &&
                _URLHostName !== urlhost &&
                ($("#mnuDashboard").show(), $("#mnuReport").hide(), $("#mnuGatePass").hide(), $("#mnuUitility").hide(),
                    $("#mnuChangePassword").show(), $("#mnuAddressMaster").show(), $("#mnuUpdateEmailAdd").show(),
                    $("#mnuEmployeeProfile").show(), $("#mnuMaster").hide(), $("#mnuPostedLeaveReport").hide(),
                    $("#mnuCreateGatePass").hide(), $("#mnuContCreateGatePass").hide(), $("#mnuGatePassInOut").hide(),
                    $("#mnuUserManual").hide(), $("#mnuuniformmaster").hide(), $("#mnuManageLeave").hide(),
                    $("#mnuLeavePosting").hide(), $("#mnuLeaveApplicationDetails").hide(), $("#mnuManageLeave").hide())
    }
});