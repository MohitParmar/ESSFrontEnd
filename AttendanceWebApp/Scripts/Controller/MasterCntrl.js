﻿var app = angular.module('myApp');

app.controller('MasterCntrloller', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope._Conpath = ''; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });
    jQuery.support.cors = true;

    //Get User Release Strategy of Login /Member
    $scope.GetRelesaseStratey = function (rls) {
        var rel = new XMLHttpRequest();
        rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + rls + '&empUnqId=' + $('#myEmpUnqId').val(), true);
        rel.setRequestHeader('Accept', 'application/json');
        rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.$digest(); } };
        rel.send();
    };

    $scope.ListOfholiday = function () {
        var dyear = new Date();
        var hld = new XMLHttpRequest();
        hld.open('GET', $scope._Conpath + 'Holiday/GetHolidays?compcode=' + $('#myCompCode').val() + '&wrkGrp=' + $('#myWrkGrp').val() + '&tYear=' + dyear.getFullYear(), true);
        hld.setRequestHeader('Accept', 'application/json');
        hld.onreadystatechange = function () { if (hld.readyState === 4) { var json = JSON.parse(hld.responseText); $scope.hlddata = json; $scope.$digest(); } };
        hld.send();
    };

    //Get Leave Balance of Login Member
    $scope.GetLeave = function () {
        var d = new Date();
        var req = new XMLHttpRequest();
        req.open('GET', $scope._Conpath + 'LeaveBalance/GetLeaveBalance?empUnqId=' + $('#myEmpUnqId').val() + '&yearmonth=' + d.getFullYear(), true);
        req.setRequestHeader('Accept', 'application/json');
        req.onreadystatechange = function () { if (req.readyState === 4) { var json = JSON.parse(req.responseText); $scope.data = json; $scope.$digest(); } };
        req.send();
    };

    //Load / Unload Div control in User Manual
    $scope.LoadDiv = function (data) {
        if (data === "LR") { $('#div_LeaveRelease').show(); $('#div_LeaveApplication').hide(); $('#div_UpdateEmailId').hide(); $('#div_ReleaseStrategy').hide(); $('#div_LeaveCancellation').hide(); $('#div_LeavePosting').hide(); };
        if (data === "LA") { $('#div_LeaveApplication').show(); $('#div_LeaveRelease').hide(); $('#div_UpdateEmailId').hide(); $('#div_ReleaseStrategy').hide(); $('#div_LeaveCancellation').hide(); $('#div_LeavePosting').hide(); };
        if (data === "EM") { $('#div_UpdateEmailId').show(); $('#div_LeaveRelease').hide(); $('#div_LeaveApplication').hide(); $('#div_ReleaseStrategy').hide(); $('#div_LeaveCancellation').hide(); $('#div_LeavePosting').hide(); };
        if (data === "RS") { $('#div_ReleaseStrategy').show(); $('#div_LeaveRelease').hide(); $('#div_LeaveApplication').hide(); $('#div_UpdateEmailId').hide(); $('#div_LeaveCancellation').hide(); $('#div_LeavePosting').hide(); };
        if (data === "LC") { $('#div_LeaveCancellation').show(); $('#div_LeaveRelease').hide(); $('#div_LeaveApplication').hide(); $('#div_UpdateEmailId').hide(); $('#div_ReleaseStrategy').hide(); $('#div_LeavePosting').hide(); };
        if (data === "LP") { $('#div_LeavePosting').show(); $('#div_LeaveRelease').hide(); $('#div_LeaveApplication').hide(); $('#div_UpdateEmailId').hide(); $('#div_ReleaseStrategy').hide(); $('#div_LeaveCancellation').hide(); };
    };
});