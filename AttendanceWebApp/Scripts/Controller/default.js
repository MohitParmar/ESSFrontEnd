$(document).ready(function () {
    var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var chk = $('#myUserRole').val();
    var _isSecUser = $('#myIsSecUser').val(); var _isGpReleaser = $('#myIsGpReleaser').val(); var _wrkgrp = $('#myWrkGrp').val(); var _isHod = $('#myIsHod').val();
    if (_isSecUser === "True") {
        $('#mnuGatePassInOut').show(); $('#mnuDashboard').hide(); $('#mnuMaster').hide(); $('#mnuLeave').hide(); $('#mnuGatePass').hide(); $('#mnuReport').hide();
        $('#mnuUitility').hide(); $('#mnuUserManual').hide(); $('#mnuuniformmaster').hide(); $('#mnuChangePassword').hide(); $('#mnuAddressMaster').hide();
        $('#mnuUpdateEmailAdd').hide(); $('#mnuEmployeeProfile').hide(); $('#mnuManageLeave').hide();
    }//if security role
    if (chk === "IsUser" && _wrkgrp === "COMP") {
        $('#mnuMaster').hide(); $('#mnuReport').hide(); $('#mnuUitility').hide(); $('#mnuLeaveRelease').hide(); $('#mnuLeavePosting').hide(); $('#mnuGatePassRelease').hide();
        $('#mnuContCreateGatePass').hide(); $('#mnuRelGatePassReport').hide(); $('#mnuGatePassInOut').hide(); $('#mnuManageLeave').hide();
    } else if (chk === "IsUser" && _wrkgrp !== "COMP") {
        $('#mnuDashboard').hide(); $('#mnuMaster').hide(); $('#mnuLeave').hide(); $('#mnuGatePass').hide(); $('#mnuReport').hide(); $('#mnuUitility').hide();
        $('#mnuUserManual').hide(); $('#mnuuniformmaster').hide(); $('#mnuChangePassword').hide(); $('#mnuAddressMaster').hide(); $('#mnuUpdateEmailAdd').hide();
        $('#mnuEmployeeProfile').hide(); $('#mnuManageLeave').hide();
    }//if user role
    if (chk === "IsReleaser") {
        $('#mnuLeaveRelease').show(); $('#mnuLeaveReport').show(); $('#mnuReleaserEmpReport').show(); $('#mnuUitility').hide(); $('#mnuMaster').hide();
        $('#mnuLeavePosting').hide(); $('#mnuLeavePerformanceReport').hide(); $('#mnuPostedLeaveReport').hide(); $('#mnuPostedByReport').hide();
        $('#mnuPendingLeavesForPostReport').hide(); $('#mnuEmpRlsStrLstReport').hide(); $('#mnuUniformMasterReport').hide(); $('#mnuUserPresentAddressReport').hide();
        $('#mnuGatePassRelease').hide(); $('#mnuContCreateGatePass').hide(); $('#mnuRelGatePassReport').hide(); $('#mnuGatePassInOut').hide();
        $('#mnuAllGatePassReport').hide(); $('#mnuManageLeave').hide(); $('#mnuLeaveApplicationDetails').hide();
    }//if releaser role
    if (chk === "IsHrUser") {
        $('#mnuMaster').show(); $('#mnuUitility').show(); $('#mnuLeavePosting').show(); $('#mnuLeavePerformanceReport').show(); $('#mnuPostedLeaveReport').show();
        $('#mnuPostedByReport').show(); $('#mnuPendingLeavesForPostReport').show(); $('#mnuEmpRlsStrLstReport').show(); $('#mnuUniformMasterReport').show();
        $('#mnuUserPresentAddressReport').show(); $('#mnuAllGatePassReport').show(); $('#mnuLeaveApplicationDetails').show(); $('#mnuLeaveRelease').hide();
        $('#mnuLeaveReport').hide(); $('#mnuReleaserEmpReport').hide(); $('#mnuGatePassRelease').hide(); $('#mnuContCreateGatePass').hide(); $('#mnuRelGatePassReport').hide();
        $('#mnuGatePassInOut').hide(); $('#mnuManageLeave').hide();
    }//if hr user role
    if (chk === "IsHrRelease") {
        $('#mnuMaster').show(); $('#mnuUitility').show(); $('#mnuLeaveRelease').show(); $('#mnuLeavePosting').show(); $('#mnuReleaserEmpReport').show();
        $('#mnuLeaveReport').show(); $('#mnuLeavePerformanceReport').show(); $('#mnuEmpRlsStrLstReport').show(); $('#mnuPostedLeaveReport').show();
        $('#mnuPostedByReport').show(); $('#mnuPendingLeavesForPostReport').show(); $('#mnuUniformMasterReport').show(); $('#mnuUserPresentAddressReport').show();
        $('#mnuAllGatePassReport').show(); $('#mnuGatePassInOut').hide(); $('#mnuManageLeave').hide(); $('#mnuLeaveApplicationDetails').show();
    }//if Hr / Releaser both role
    if (_isHod === "True") {
        $('#mnuReport').show(); $('#mnuAllGatePassReport').show(); $('#mnuReleaserEmpReport').hide(); $('#mnuLeaveReport').hide(); $('#mnuLeavePerformanceReport').hide();
        $('#mnuEmpRlsStrLstReport').hide(); $('#mnuPostedLeaveReport').hide(); $('#mnuPostedByReport').hide(); $('#mnuPendingLeavesForPostReport').hide();
        $('#mnuUniformMasterReport').hide(); $('#mnuUserPresentAddressReport').hide(); $('#mnuGatePassRelease').hide(); $('#mnuContCreateGatePass').hide();
        $('#mnuRelGatePassReport').hide(); $('#mnuGatePassInOut').hide(); $('#mnuManageLeave').hide();
    }//Use For Extra Right in hr department User for only reprots
    if (_isGpReleaser === "True") {
        $('#mnuGatePassRelease').show(); $('#mnuContCreateGatePass').show(); $('#mnuRelGatePassReport').show(); $('#mnuGatePassInOut').hide(); $('#mnuManageLeave').hide();
    }//if Gate Pass Releaser role
    if (chk === "IsAdmin") {
        $('#mnuDashboard').show(); $('#mnuMaster').show(); $('#mnuLeave').show(); $('#mnuGatePass').show(); $('#mnuReport').show(); $('#mnuUitility').show();
        $('#mnuUserManual').show(); $('#mnuManageLeave').show();
    }//if Is Admin
    if (_URLHostName !== urlhost) {
        $('#mnuDashboard').show(); $('#mnuMaster').hide(); $('#mnuReport').hide(); $('#mnuUitility').hide(); $('#mnuChangePassword').show(); $('#mnuAddressMaster').show();
        $('#mnuUpdateEmailAdd').show(); $('#mnuEmployeeProfile').show(); $('#mnuPostedLeaveReport').hide(); $('#mnuCreateGatePass').hide(); $('#mnuLeavePosting').hide();
        $('#mnuContCreateGatePass').hide(); $('#mnuGatePassInOut').hide(); $('#mnuUserManual').hide(); $('#mnuuniformmaster').hide(); $('#mnuManageLeave').hide();
    }//MOBILE 
});