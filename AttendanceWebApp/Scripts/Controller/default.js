﻿$(document).ready(function () {
    var conpath; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; var url_port = url.port; if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { conpath = _ConPath; } else { conpath = urlprotocol + "//" + urlhost + "/api/"; } }; var newArr = {}; var chk = $('#myUserRole').val(); var _wrkgrp = $('#myWrkGrp').val(); var loc = $('#myLoc').val(); jQuery.support.cors = true; var rel = new XMLHttpRequest(); rel.open('GET', conpath + 'Roles/GetRoleAuth?roleId=' + chk, true); rel.setRequestHeader('Accept', 'application/json'); rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); newArr = jsonvar1; for (var i = 0; i < newArr.length; i++) { document.getElementById(newArr[i]["menuId"]).hidden = false; }; }; }; rel.send();
    if (loc === 'IPU') { if (_URLHostName !== urlhost && _wrkgrp === 'COMP') { $('#mnuMaster').hide(); $('#mnuReport').hide(); $('#mnuUitility').hide(); $('#mnuLeavePosting').hide(); $('#mnuCreateGatePass').hide(); $('#mnuContCreateGatePass').hide(); $('#mnuGatePassInOut').hide(); $('#mnuEmployeeProfile').hide(); $('#mnuIncomeTaxDeclaration').show(); $('#mnuAddressMaster').hide(); $('#mnuuniformmaster').hide(); $('#mnuUpdateEmailAdd').hide(); $('#mnuUserManual').hide(); $('#mnuChangePassword').hide(); $('#mnuPayslipUpload').hide(); $('#mnuPayslip').hide(); }; }
    else if (loc === 'NKP') { if (_URLHostName !== urlhost && _wrkgrp === 'COMP') { $('#mnuMaster').hide(); $('#mnuReport').hide(); $('#mnuGatePass').hide(); $('#mnuUitility').hide(); $('#mnuLeavePosting').hide(); $('#mnuEmployeeProfile').hide(); $('#mnuIncomeTaxDeclaration').hide(); $('#mnuAddressMaster').hide(); $('#mnuuniformmaster').hide(); $('#mnuUpdateEmailAdd').hide(); $('#mnuUserManual').hide(); $('#mnuChangePassword').hide(); $('#mnuPayslipUpload').hide(); $('#mnuPayslip').hide(); }; }
    else if (loc === 'BEL') { if (_URLHostName !== urlhost && _wrkgrp === 'COMP') { var s = $('#myEmpUnqId').val(); if (s === '105440') { $('#mnuReport').show(); $('#mnuLeaveReport').show(); $('#mnuReleaserEmpReport').hide(); $('#mnuITDReport').hide(); $('#mnuLeaveApplicationDetails').hide(); $('#mnuPostedLeaveReport').hide(); $('#mnuPostedByReport').hide(); $('#mnuLeavePerformanceReport').hide(); $('#mnuPendingLeavesForPostReport').hide(); $('#mnuAllGatePassReport').hide(); $('#mnuUserPresentAddressReport').hide(); $('#mnuUniformMasterReport').hide(); $('#mnuEmpRlsStrLstReport').hide(); $('#mnuVehicleGatePassReport').hide(); } else { $('#mnuReport').hide(); }; $('#mnuMaster').hide(); $('#mnuUitility').hide(); $('#mnuLeavePosting').hide(); $('#mnuCreateGatePass').show(); if (chk === '2' || chk === '6' || chk === '7' || chk === '8' || chk === '11') { $('#mnuContCreateGatePass').show(); } else { $('#mnuContCreateGatePass').hide(); }; $('#mnuGatePassInOut').hide(); $('#mnuEmployeeProfile').hide(); $('#mnuIncomeTaxDeclaration').hide(); $('#mnuAddressMaster').hide(); $('#mnuuniformmaster').hide(); $('#mnuUpdateEmailAdd').hide(); $('#mnuUserManual').hide(); $('#mnuChangePassword').hide(); $('#mnuPayslipUpload').hide(); $('#mnuPayslip').hide(); }; }
    else if (loc === 'JFL') { if (_URLHostName !== urlhost && _wrkgrp === 'COMP') { $('#mnuMaster').hide(); $('#mnuReport').hide(); $('#mnuUitility').hide(); $('#mnuLeavePosting').hide(); $('#mnuCreateGatePass').hide(); $('#mnuContCreateGatePass').hide(); $('#mnuGatePassInOut').hide(); $('#mnuEmployeeProfile').hide(); $('#mnuIncomeTaxDeclaration').hide(); $('#mnuAddressMaster').hide(); $('#mnuuniformmaster').hide(); $('#mnuUpdateEmailAdd').show(); $('#mnuUserManual').hide(); $('#mnuChangePassword').hide(); $('#mnuPayslipUpload').hide(); $('#mnuPayslip').hide(); }; };
    //var _isSecUser = $('#myIsSecUser').val(); var _isGpReleaser = $('#myIsGpReleaser').val();  var _isHod = $('#myIsHod').val();
    //else if (loc === 'KJSAW') { if (chk === "IsUser" && _wrkgrp === "COMP") { $('#mnuMaster').hide(); $('#mnuGatePass').hide(); $('#mnuReport').hide(); $('#mnuUitility').hide(); $('#mnuLeaveRelease').hide(); $('#mnuLeavePosting').hide(); $('#mnuManageLeave').hide(); } else if (chk === "IsUser" && _wrkgrp !== "COMP") { $('#mnubar').hide(); $('#mnuuniformmaster').hide(); $('#mnuChangePassword').hide(); $('#mnuAddressMaster').hide(); $('#mnuUpdateEmailAdd').hide(); $('#mnuEmployeeProfile').hide(); $('#mnuManageLeave').hide(); $('#mnuPerformanceReport').hide(); $('#mnuITDReport').hide(); }; if (chk === "IsReleaser") { $('#mnuLeaveRelease').show(); $('#mnuLeaveReport').show(); $('#mnuReleaserEmpReport').show(); $('#mnuUitility').hide(); $('#mnuMaster').hide(); $('#mnuGatePass').hide(); $('#mnuLeavePosting').hide(); $('#mnuLeavePerformanceReport').hide(); $('#mnuPostedLeaveReport').hide(); $('#mnuPostedByReport').hide(); $('#mnuPendingLeavesForPostReport').hide(); $('#mnuEmpRlsStrLstReport').hide(); $('#mnuUniformMasterReport').hide(); $('#mnuUserPresentAddressReport').hide(); $('#mnuGatePassRelease').hide(); $('#mnuContCreateGatePass').hide(); $('#mnuRelGatePassReport').hide(); $('#mnuGatePassInOut').hide(); $('#mnuAllGatePassReport').hide(); $('#mnuManageLeave').hide(); $('#mnuLeaveApplicationDetails').hide(); $('#mnuITDReport').hide(); }; if (chk === "IsHrUser") { $('#mnuMaster').show(); $('#mnuUitility').show(); $('#mnuLeavePosting').show(); $('#mnuLeavePerformanceReport').show(); $('#mnuPostedLeaveReport').show(); $('#mnuPostedByReport').show(); $('#mnuPendingLeavesForPostReport').show(); $('#mnuEmpRlsStrLstReport').show(); $('#mnuUniformMasterReport').show(); $('#mnuUserPresentAddressReport').show(); $('#mnuAllGatePassReport').show(); $('#mnuGatePass').hide(); $('#mnuLeaveRelease').hide(); $('#mnuLeaveReport').hide(); $('#mnuReleaserEmpReport').hide(); $('#mnuGatePassRelease').hide(); $('#mnuContCreateGatePass').hide(); $('#mnuRelGatePassReport').hide(); $('#mnuGatePassInOut').hide(); $('#mnuManageLeave').hide(); $('#mnuLeaveApplicationDetails').show(); $('#mnuITDReport').hide(); }; if (chk === "IsHrRelease") { $('#mnuMaster').show(); $('#mnuUitility').show(); $('#mnuLeaveRelease').show(); $('#mnuLeavePosting').show(); $('#mnuReleaserEmpReport').show(); $('#mnuLeaveReport').show(); $('#mnuLeavePerformanceReport').show(); $('#mnuEmpRlsStrLstReport').show(); $('#mnuPostedLeaveReport').show(); $('#mnuPostedByReport').show(); $('#mnuPendingLeavesForPostReport').show(); $('#mnuUniformMasterReport').show(); $('#mnuUserPresentAddressReport').show(); $('#mnuAllGatePassReport').show(); $('#mnuGatePass').hide(); $('#mnuGatePassRelease').hide(); $('#mnuContCreateGatePass').hide(); $('#mnuRelGatePassReport').hide(); $('#mnuGatePassInOut').hide(); $('#mnuManageLeave').hide(); $('#mnuLeaveApplicationDetails').show(); $('#mnuITDReport').hide(); }; if (chk === "IsAdmin") { $('#mnuDashboard').show(); $('#mnuMaster').show(); $('#mnuLeave').show(); $('#mnuGatePass').hide(); $('#mnuReport').show(); $('#mnuUitility').show(); $('#mnuUserManual').show(); $('#mnuManageLeave').show(); }; if (_URLHostName !== urlhost) { $('#mnuDashboard').show(); $('#mnuReport').hide(); $('#mnuGatePass').hide(); $('#mnuUitility').hide(); $('#mnuChangePassword').show(); $('#mnuAddressMaster').show(); $('#mnuUpdateEmailAdd').show(); $('#mnuEmployeeProfile').show(); $('#mnuMaster').hide(); $('#mnuPostedLeaveReport').hide(); $('#mnuCreateGatePass').hide(); $('#mnuContCreateGatePass').hide(); $('#mnuGatePassInOut').hide(); $('#mnuUserManual').hide(); $('#mnuuniformmaster').hide(); $('#mnuManageLeave').hide(); $('#mnuLeavePosting').hide(); $('#mnuLeaveApplicationDetails').hide(); $('#mnuManageLeave').hide(); $('#mnuITDReport').hide(); }; };
});