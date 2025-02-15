﻿var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("ManageLeaveMasterController", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), $scope.currentPage = 1, $scope.itemsPerPage = 10;
    $scope.alluserlist = [], $scope.leaveappdetails = "";
    $scope._Conpath = ""; var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol;
    $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") });
    jQuery.support.cors = !0;
    $scope.SetLTListValue = function (value) { "OH" === value && ($("#HalfFlag").attr("disabled", !0), $("#HalfFlag").attr("checked", !1)) };
    $scope.ResetView = function () { window.location.reload(!0) };
    $scope.ToValidate = function () { var chkFrom = document.getElementById("FromDt"), chkTo = document.getElementById("ToDt"), FromDate = chkFrom.value, ToDate = chkTo.value, date1 = new Date(FromDate), date2 = new Date(ToDate), diff = (date1 - date2) / 864e5 * -1 + 1; return $("#TotalDays").text = diff, document.getElementById("TotalDays").value = diff, diff > 1 ? ($("#HalfFlag").attr("disabled", !0), $("#HalfFlag").attr("checked", !1)) : $("#HalfFlag").removeAttr("disabled"), date1 > date2 ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>", $("#MessageBox").show(), !1) : !0 };
    $scope.GetEmpInfo = function () {
        var emp = new XMLHttpRequest;
        emp.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + $("#eCode").val(), !0);
        emp.setRequestHeader("Accept", "application/json");
        emp.onreadystatechange = function () {
            if (4 === emp.readyState) {
                var json1 = JSON.parse(emp.responseText); $scope.empdata = json1, $scope.$digest();
                $scope.GetLARelesaseStratey(); $scope.GetGPRelesaseStratey(); $scope.GetLeaveRequestLists(); $scope.GetLeave(); $scope.GetPostedLeave();
            } else 200 !== emp.status && (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>", $("#MessageBox").show())
        }, emp.send();
    };
    $scope.GetLeaveRequestLists = function () {
        var xhr1 = new XMLHttpRequest; xhr1.open("GET", $scope._Conpath + "LeaveApplication/GetLeaveApplication?empUnqId=" + $("#eCode").val(), !0), xhr1.setRequestHeader("Accept", "application/json"), xhr1.onreadystatechange = function () { if (4 === xhr1.readyState) { var json = JSON.parse(xhr1.responseText), la = new Array; la = json; for (var empName, statName, releaseDate, applReleaseStatus = new Array, leaveApplicationDetails = new Array, cnt = 0, myArray = [], i = 0; i < la.length; i++) { empName = la[i].employee.empName, statName = la[i].stations.statName, applReleaseStatus = la[i].applReleaseStatus; for (var j = 0; j < applReleaseStatus.length; j++)releaseDate = applReleaseStatus[j].releaseDate; leaveApplicationDetails = la[i].leaveApplicationDetails; for (var l = 0; l < leaveApplicationDetails.length; l++)myArray.push([]), myArray[cnt].releaseGroupCode = la[i].releaseGroupCode, myArray[cnt].releaseStatusCode = la[i].releaseStatusCode, myArray[cnt].leaveAppId = la[i].leaveAppId, myArray[cnt].yearMonth = la[i].yearMonth, myArray[cnt].addDt = la[i].addDt, myArray[cnt].applReleaseStatus = la[i].applReleaseStatus, myArray[cnt].releaseDate = releaseDate, myArray[cnt].updDt = la[i].updDt, myArray[cnt].empUnqId = la[i].empUnqId, myArray[cnt].empName = empName, myArray[cnt].statName = statName, myArray[cnt].postedBy = la[i].updUser, myArray[cnt].relremarks = la[i].remarks, myArray[cnt].remarks = leaveApplicationDetails[l].remarks, myArray[cnt].leaveAppItem = leaveApplicationDetails[l].leaveAppItem, myArray[cnt].leaveTypeCode = leaveApplicationDetails[l].leaveTypeCode, myArray[cnt].fromDt = leaveApplicationDetails[l].fromDt, myArray[cnt].toDt = leaveApplicationDetails[l].toDt, myArray[cnt].totalDays = leaveApplicationDetails[l].totalDays, myArray[cnt].halfDayFlag = leaveApplicationDetails[l].halfDayFlag, myArray[cnt].coMode = leaveApplicationDetails[l].coMode, myArray[cnt].coDate1 = leaveApplicationDetails[l].coDate1, myArray[cnt].coDate2 = leaveApplicationDetails[l].coDate2, myArray[cnt].isPosted = leaveApplicationDetails[l].isPosted, myArray[cnt].cancelled = leaveApplicationDetails[l].cancelled, myArray[cnt].parentId = leaveApplicationDetails[l].parentId, myArray[cnt].postUser = leaveApplicationDetails[l].postUser, myArray[cnt].postedDt = leaveApplicationDetails[l].postedDt, cnt++; leaveApplicationDetails = "" } $scope.lappdata = myArray, $scope.lappdata = $filter("orderBy")($scope.lappdata, "-leaveAppId"), $scope.curPage = 0, $scope.pageSize = 10, $scope.$digest() } }, xhr1.send()
    };
    $scope.PopulateData = function (leaveappid, leaveappitem) {
        $("#ConformModel").modal("show"), $scope.leaveappdetails = "", $scope.GetLeaveApplicationDetails(leaveappid, leaveappitem)
    };
    $scope.GetLeaveApplicationDetails = function (leaveappid, leaveappitem) {
        var xhr1 = new XMLHttpRequest; xhr1.open("GET", $scope._Conpath + "LeaveApplication/GetLeaveApplication?leaveAppId=" + leaveappid, !0), xhr1.setRequestHeader("Accept", "application/json"), xhr1.onreadystatechange = function () { function setSelectedValue(selectObj, valueToSet) { for (var i = 0; i < selectObj.options.length; i++)if (selectObj.options[i].text === valueToSet) return void (selectObj.options[i].selected = !0) } if (4 === xhr1.readyState) for (var jsonvar = JSON.parse(xhr1.responseText), leavedetail = jsonvar[0].leaveApplicationDetails, i = 0; i < leavedetail.length; i++) { var leaveitemno = leavedetail[i].leaveAppItem; if (leaveitemno === leaveappitem) { $scope.leaveappdetails = jsonvar[0].leaveApplicationDetails[i], $scope.$digest(), $("#FromDt").val(leavedetail[i].fromDt.replace("T00:00:00", "")), $("#ToDt").val(leavedetail[i].toDt.replace("T00:00:00", "")), $("#Remarks").val(leavedetail[i].remarks); var hlf = leavedetail[i].halfDayFlag; hlf === !0 ? $("#HalfFlag").attr("checked", !0) : $("#HalfFlag").attr("checked", !1), $("#TotalDays").val(leavedetail[i].totalDays); var objSelect = document.getElementById("LeaveType"); setSelectedValue(objSelect, leavedetail[i].leaveTypeCode) } } }, xhr1.send()
    };
    $scope.createLeave = function () {
        function storeTblValues() {
            return jsonObj.yearMonth = $scope.leaveappdetails.yearMonth, jsonObj.leaveAppId = $scope.leaveappdetails.leaveAppId, jsonObj.compCode = $scope.leaveappdetails.compCode, jsonObj.wrkGrp = $scope.leaveappdetails.wrkGrp, jsonObj.leaveAppItem = $scope.leaveappdetails.leaveAppItem, jsonObj.leaveTypeCode = LeaveTypeCode, jsonObj.fromDt = FromDate, jsonObj.toDt = ToDate, jsonObj.totalDays = Totaldays, jsonObj.halfdayflag = HalfDayFlag, jsonObj.remarks = Remarks, jsonObj
        } var e = document.getElementById("LeaveType"), strUser = e.options[e.selectedIndex].text, LeaveTypeCode = strUser; LeaveTypeCode.length > 2 && (LeaveTypeCode = $scope.leaveappdetails.leaveTypeCode); var Remarks = $("#Remarks").val(), chkFrom = document.getElementById("FromDt"), chkTo = document.getElementById("ToDt"), FromDate = chkFrom.value, ToDate = chkTo.value, date1 = new Date(FromDate), date2 = new Date(ToDate), diff = (date1 - date2) / 864e5 * -1 + 1; if (date1 > date2) return document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>", $("#MessageBox").show(), !1; var HalfDayFlag = !1; HalfDayFlag = $("#HalfFlag").prop("checked") === !0 ? !0 : !1; var Totaldays = 0; Totaldays = $("#TotalDays").val(), HalfDayFlag === !0 ? Totaldays = "0.5" : (null === Totaldays || "" === Totaldays || 0 === Totaldays) && (Totaldays = diff); var jsonObj = {}, TableData = storeTblValues(); TableData = JSON.stringify(TableData); var la = new XMLHttpRequest; la.open("POST", $scope._Conpath + "ManageLeave/ManageLeave?EmpUnqID=" + $("#eCode").val(), !0), la.setRequestHeader("Content-type", "application/json"), la.onreadystatechange = function () { 4 === la.readyState && 200 === la.status ? (jQuery("#btnClose").click(), document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Application Updated.. </strong></div>", $("#MessageBox").show(), document.getElementById("FromDt").value = "", document.getElementById("ToDt").value = "", document.getElementById("TotalDays").value = "", document.getElementById("Remarks").value = "", $("#HalfFlag").prop("checked", !1), $("#LeaveType option:first").attr("selected", !0), $scope.GetEmpInfo()) : (jQuery("#btnClose").click(), document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Application Not Updated.. </strong></div>", $("#MessageBox").show(), document.getElementById("FromDt").value = "", document.getElementById("ToDt").value = "", document.getElementById("TotalDays").value = "", document.getElementById("Remarks").value = "", $("#HalfFlag").prop("checked", !1), $("#LeaveType option:first").attr("selected", !0)) }, la.send(TableData)
    };
    $scope.GetLARelesaseStratey = function () {
        debugger;
        var LA = new XMLHttpRequest; LA.open("GET", $scope._Conpath + "ReleaseStrategy/GetReleaseStrategy?releaseGroup=" + $("#releaseGroupCode").val() + "&empUnqId=" + $("#eCode").val(), !0), LA.setRequestHeader("Accept", "application/json"), LA.onreadystatechange = function () { if (4 === LA.readyState) { var jsonvar1 = JSON.parse(LA.responseText); $scope.rlsdata = jsonvar1, $scope.$digest() } }, LA.send()
    };
    $scope.GetGPRelesaseStratey = function () {
        debugger;
        var GP = new XMLHttpRequest;
        GP.open("GET", $scope._Conpath + "ReleaseStrategy/GetReleaseStrategy?releaseGroup=" + $("#gpreleaseGroupCode").val() + "&empUnqId=" + $("#eCode").val(), !0);
        GP.setRequestHeader("Accept", "application/json");
        GP.onreadystatechange = function () {
            if (4 === GP.readyState) {
                var jsonvar1 = JSON.parse(GP.responseText);
                $scope.GPdata = jsonvar1;
                $scope.$digest();
            }
        };
        GP.send();
    };
    $scope.LeaveReject = function (rejRemarks, value, value1) {
        function storeValues() {
            var tbldata = new Array; $("#aliasTable tr").each(function (row, tr) { tbldata[row] = { LeaveAppId: $(tr).find("td:eq(5)").text(), LeaveAppItem: $(tr).find("td:eq(7)").text() } }); var tbl = new Array; tbl[0] = "test"; for (var count = 0, i = 0; i < tbldata.length; i++) { var appid = tbldata[i].LeaveAppId; if (appid == value) { if ("undefined" == typeof rejRemarks || "undefined" == typeof rejRemarks.remarks) return document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Remarks First</strong></div>", void $("#MessageBox").show(); tbl[count] = { YearMonth: value1, LeaveAppId: value, LeaveAppItem: tbldata[i].LeaveAppItem, IsPosted: "R", Remarks: rejRemarks.remarks, UserId: $("#myEmpUnqId").val() }, count++ } } return tbl
        };
        var tbldata = storeValues(); tbldata = JSON.stringify(tbldata); var rej = new XMLHttpRequest; rej.open("POST", $scope._Conpath + "LeavePosting/PostLeaves", !0), rej.setRequestHeader("Content-type", "application/json"), rej.onreadystatechange = function () { 4 === rej.readyState && 200 === rej.status ? (window.location.reload(!0), document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Rejected Sucesfully.. </strong></div>", $("#MessageBox").show(), $scope.GetEmpInfo()) : (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Not Rejected Please Try again.. </strong></div>", $("#MessageBox").show()) }, rej.send(tbldata)
    };
    $scope.GetLeave = function () {
        var d = new Date, req = new XMLHttpRequest; req.open("GET", $scope._Conpath + "LeaveBalance/GetLeaveBalance?empUnqId=" + $("#eCode").val() + "&yearmonth=" + d.getFullYear(), !0), req.setRequestHeader("Accept", "application/json"), req.onreadystatechange = function () { if (4 === req.readyState) { var json = JSON.parse(req.responseText); $scope.data = json, $scope.$digest() } }, req.send()
    };
    $scope.GetPostedLeave = function () {
        var pstl = (new Date, new XMLHttpRequest); pstl.open("GET", $scope._Conpath + "leaveentry?empunqid=" + $("#eCode").val(), !0), pstl.setRequestHeader("Accept", "application/json"), pstl.onreadystatechange = function () { if (4 === pstl.readyState) { var json = JSON.parse(pstl.responseText); $scope.pladata = json, $scope.pladata = $filter("orderBy")($scope.pladata, "-fromDt"), $scope.curPage1 = 0, $scope.pageSize1 = 5, $scope.$digest() } }, pstl.send()
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
});
app.directive("datepicker", function () {
    return {
        restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options)
        }
    }
});
app.controller("SelectLTypeCntrl", function ($scope, $http) {
    $scope.GetLTypeList = function () {
        $http({ method: "Get", contentType: "application/json", url: "/LeaveApp/GetLeaveTypeList?compid=" + $("#myCompCode").val() }).success(function (data, status, headers, config) { $scope.LList = data }).error(function (data, status, headers, config) { $scope.message = "Unexpected Error" })
    }
});