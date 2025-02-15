﻿var app = angular.module('myApp'); app.controller('MasterCntrloller', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; var url_port = url.port;
    $scope._Conpath = ''; var loc = $("#myLoc").val(); jQuery.support.cors = true;
    $(document).ready(function () {
        if (typeof (_ConPath) === "undefined") { return; } else {
            if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else {
                $scope._Conpath = urlprotocol + "//" + urlhost + "/api/";
            }
        };
    });
    $scope.GetRelesaseStratey = function (rls) {
        var rel = new XMLHttpRequest(); rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + rls + '&empUnqId=' + $('#myEmpUnqId').val(), true); rel.setRequestHeader('Accept', 'application/json'); rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.$digest(); } }; rel.send();
    };
    $scope.ListOfholiday = function () {
        var dyear = new Date(); var hld = new XMLHttpRequest(); hld.open('GET', $scope._Conpath + 'Holiday/GetHolidays?compcode=' + $('#myCompCode').val() + '&wrkGrp=' + $('#myWrkGrp').val() + '&tYear=' + dyear.getFullYear() + '&location=' + $('#myLoc').val() + '&optionalFlg=false', true); hld.setRequestHeader('Accept', 'application/json'); hld.onreadystatechange = function () { if (hld.readyState === 4) { var json = JSON.parse(hld.responseText); $scope.hlddata = json; $scope.$digest(); } }; hld.send();
    };
    $scope.ListOfOptionalholiday = function () {
        var ohyear = new Date(); var opthld = new XMLHttpRequest(); opthld.open('GET', $scope._Conpath + 'Holiday/GetHolidays?compcode=' + $('#myCompCode').val() + '&wrkGrp=' + $('#myWrkGrp').val() + '&tYear=' + ohyear.getFullYear() + '&location=' + $('#myLoc').val() + '&optionalFlg=true', true); opthld.setRequestHeader('Accept', 'application/json'); opthld.onreadystatechange = function () { if (opthld.readyState === 4) { var optjson = JSON.parse(opthld.responseText); $scope.opthlddata = optjson; $scope.$digest(); }; }; opthld.send();
    };
    $scope.GetLeave = function () {
        var d = new Date(); var req = new XMLHttpRequest(); req.open('GET', $scope._Conpath + 'LeaveBalance/GetLeaveBalance?empUnqId=' + $('#myEmpUnqId').val() + '&yearmonth=' + d.getFullYear(), true); req.setRequestHeader('Accept', 'application/json'); req.onreadystatechange = function () { if (req.readyState === 4) { var json = JSON.parse(req.responseText); $scope.data = json; $scope.$digest(); } }; req.send();
    };
    $scope.LoadDiv = function (data) {
        if (data === "LR") { $('#div_LeaveRelease').show(); $('#div_LeaveApplication').hide(); $('#div_UpdateEmailId').hide(); $('#div_ReleaseStrategy').hide(); $('#div_LeaveCancellation').hide(); $('#div_LeavePosting').hide(); }; if (data === "LA") { $('#div_LeaveApplication').show(); $('#div_LeaveRelease').hide(); $('#div_UpdateEmailId').hide(); $('#div_ReleaseStrategy').hide(); $('#div_LeaveCancellation').hide(); $('#div_LeavePosting').hide(); }; if (data === "EM") { $('#div_UpdateEmailId').show(); $('#div_LeaveRelease').hide(); $('#div_LeaveApplication').hide(); $('#div_ReleaseStrategy').hide(); $('#div_LeaveCancellation').hide(); $('#div_LeavePosting').hide(); }; if (data === "RS") { $('#div_ReleaseStrategy').show(); $('#div_LeaveRelease').hide(); $('#div_LeaveApplication').hide(); $('#div_UpdateEmailId').hide(); $('#div_LeaveCancellation').hide(); $('#div_LeavePosting').hide(); }; if (data === "LC") { $('#div_LeaveCancellation').show(); $('#div_LeaveRelease').hide(); $('#div_LeaveApplication').hide(); $('#div_UpdateEmailId').hide(); $('#div_ReleaseStrategy').hide(); $('#div_LeavePosting').hide(); }; if (data === "LP") { $('#div_LeavePosting').show(); $('#div_LeaveRelease').hide(); $('#div_LeaveApplication').hide(); $('#div_UpdateEmailId').hide(); $('#div_ReleaseStrategy').hide(); $('#div_LeaveCancellation').hide(); };
    };
});
