﻿var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('LeaveReportCntrloller', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 25; $scope.alluserlist = []; $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; }); $scope.InfoPL; $scope.ToValidate = function () { var chkFrom = document.getElementById('FromDt'); var chkTo = document.getElementById('ToDt'); var FromDate = chkFrom.value; var ToDate = chkTo.value; var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; } else { return true; } }; $scope.GetLeaveInfo = function (entity) { var FromDate, ToDate; if ((typeof (entity) === "undefined") || (typeof (entity.FromDt) === "undefined") || (typeof (entity.ToDt) === "undefined")) { var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth(), 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); FromDate = (firstDay.getFullYear()) + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate(); ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate()); } else { FromDate = entity.FromDt; ToDate = entity.ToDt; }; var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; }; var xhr = new XMLHttpRequest(); xhr.open('GET', $scope._Conpath + 'LeaveReport/GetLeaves?empunqid=' + $('#myEmpUnqId').val() + '&fromDt=' + FromDate + '&toDt=' + ToDate, true); xhr.setRequestHeader('Accept', 'application/json'); xhr.onreadystatechange = function () { if (xhr.readyState === 4) { var json = JSON.parse(xhr.responseText); var la = new Array; la = json; var leaveApplicationDetails = new Array; var empName, statName; var cnt = 0; var myArray = []; for (var i = 0; i < la.length; i++) { empName = la[i].employee.empName; statName = la[i].stations.statName; leaveApplicationDetails = la[i].leaveApplicationDetails; for (var l = 0; l < leaveApplicationDetails.length; l++) { myArray.push([]); myArray[cnt]["leaveAppId"] = la[i].leaveAppId; myArray[cnt]["addDt"] = la[i].addDt.substring(0, la[i].addDt.indexOf("T")); myArray[cnt]["releaseStatusCode"] = la[i].releaseStatusCode; myArray[cnt]["empUnqId"] = la[i].empUnqId; myArray[cnt]["empName"] = empName; myArray[cnt]["statName"] = statName; myArray[cnt]["remarks"] = leaveApplicationDetails[l].remarks; myArray[cnt]["leaveAppItem"] = leaveApplicationDetails[l].leaveAppItem; myArray[cnt]["leaveTypeCode"] = leaveApplicationDetails[l].leaveTypeCode; myArray[cnt]["fromDt"] = leaveApplicationDetails[l].fromDt.substring(0, leaveApplicationDetails[l].fromDt.indexOf("T")); myArray[cnt]["toDt"] = leaveApplicationDetails[l].toDt.substring(0, leaveApplicationDetails[l].toDt.indexOf("T")); myArray[cnt]["totalDays"] = leaveApplicationDetails[l].totalDays; myArray[cnt]["halfDayFlag"] = leaveApplicationDetails[l].halfDayFlag; cnt++; }; leaveApplicationDetails = ""; }; $scope.data = myArray; $scope.InfoPL = $scope.data; $scope.data = $filter('orderBy')($scope.data, '-leaveAppId'); $scope.curPage = 0; $scope.pageSize = 25; $scope.$digest(); } }; xhr.send(); };  //Get Leave App Details report for Releaser
    $scope.GetPostedLeaveInfo = function (data) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var FromDate, ToDate; if ((typeof (data) === "undefined") || (typeof (data.FromDt) === "undefined") || (typeof (data.ToDt) === "undefined")) { var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0); FromDate = firstDay.getFullYear() + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate(); ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate()); } else { FromDate = data.FromDt; ToDate = data.ToDt; }; var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; }; var sel = $('#cmbIsPosted').val();
        var xhr1 = new XMLHttpRequest(); xhr1.open('GET', $scope._Conpath + 'LeavePosting/GetLeaves?fromDt=' + FromDate + '&toDt=' + ToDate + '&postingFlg=' + sel, true); xhr1.setRequestHeader('Accept', 'application/json'); xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); var json = JSON.parse(xhr1.responseText); var la = new Array; la = json; var applReleaseStatus = new Array; var leaveApplicationDetails = new Array; var empName, statName, releaseDate, releaseAuth, releaserName, location; var cnt = 0; var myArray = [];
                for (var i = 0; i < la.length; i++) {
                    empName = la[i].employee.empName; location = la[i].employee.location; statName = la[i].stations.statName; applReleaseStatus = la[i].applReleaseStatus; for (var j = 0; j < applReleaseStatus.length; j++) { releaseDate = applReleaseStatus[j].releaseDate; releaseAuth = applReleaseStatus[j].releaseAuth; releaserName = applReleaseStatus[j].releaserName; }; leaveApplicationDetails = la[i].leaveApplicationDetails;
                    for (var l = 0; l < leaveApplicationDetails.length; l++) {
                        myArray.push([]); myArray[cnt]["yearMonth"] = la[i].yearMonth; myArray[cnt]["location"] = location; myArray[cnt]["leaveAppId"] = la[i].leaveAppId; myArray[cnt]["addDt"] = la[i].addDt.substring(0, la[i].addDt.indexOf("T"));
                        myArray[cnt]["releaseStatusCode"] = la[i].releaseStatusCode; myArray[cnt]["releaseDate"] = releaseDate ? releaseDate.substring(0, releaseDate.indexOf("T")) : ''; myArray[cnt]["finalReleaser"] = releaseAuth || ''; myArray[cnt]["releaserName"] = releaserName;
                        if (leaveApplicationDetails[l].postedDt != "" && leaveApplicationDetails[l].postedDt != null) { myArray[cnt]["postedDt"] = leaveApplicationDetails[l].postedDt.substring(0, leaveApplicationDetails[l].postedDt.indexOf("T")); } else { myArray[cnt]["postedDt"] = ''; }; myArray[cnt]["empUnqId"] = la[i].empUnqId; myArray[cnt]["empName"] = empName; myArray[cnt]["statName"] = statName; myArray[cnt]["remarks"] = leaveApplicationDetails[l].remarks; myArray[cnt]["leaveAppItem"] = leaveApplicationDetails[l].leaveAppItem; myArray[cnt]["leaveTypeCode"] = leaveApplicationDetails[l].leaveTypeCode; myArray[cnt]["isPosted"] = leaveApplicationDetails[l].isPosted; myArray[cnt]["fromDt"] = leaveApplicationDetails[l].fromDt.substring(0, leaveApplicationDetails[l].fromDt.indexOf("T")); myArray[cnt]["toDt"] = leaveApplicationDetails[l].toDt.substring(0, leaveApplicationDetails[l].toDt.indexOf("T")); myArray[cnt]["totalDays"] = leaveApplicationDetails[l].totalDays; myArray[cnt]["halfDayFlag"] = leaveApplicationDetails[l].halfDayFlag; cnt++;
                    }; leaveApplicationDetails = "";
                }; $scope.pdata = myArray; $scope.InfoPL = $scope.pdata; $scope.curPage1 = 0; $scope.pageSize1 = 25; $scope.$digest();
            };
        }; xhr1.send();
    };
    $scope.PostLeaveReject = function (data, value, value1) { var TableData = storeTblValues(); TableData = JSON.stringify(TableData); function storeTblValues() { var TableData = new Array(); $('#aliasTable tr').each(function (row, tr) { TableData[row] = { "LeaveAppId": $(tr).find('td:eq(1)').text(), "LeaveAppItem": $(tr).find('td:eq(10)').text() } }); var tbl = new Array(); tbl[0] = "test"; var count = 0; for (var i = 0; i < TableData.length; i++) { var appid = TableData[i]["LeaveAppId"]; if (appid == value) { if ((typeof (data) === "undefined") || (typeof (data.Remarks) === "undefined")) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Remarks First For Rejection</strong></div>"; $('#MessageBox').show(); return; }; tbl[count] = { "YearMonth": value1, "LeaveAppId": value, "LeaveAppItem": TableData[i]["LeaveAppItem"], "IsPosted": "R", "Remarks": data.Remarks, "UserId": $('#myEmpUnqId').val() }; count++; }; } return tbl; }; var xhr1 = new XMLHttpRequest(); xhr1.open('POST', $scope._Conpath + 'LeavePosting/PostLeaves', true); xhr1.setRequestHeader("Content-type", "application/json"); xhr1.onreadystatechange = function () { if (xhr1.readyState === 4 && xhr1.status === 200) { var rlsmail = new XMLHttpRequest(); rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMail?releaseGroupCode=LA&id=' + value, true); rlsmail.setRequestHeader("Content-type", "application/json"); rlsmail.send(); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Rejected Sucesfully.. </strong></div>"; $('#MessageBox').show(); } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Not Rejected Please Try again.. </strong></div>"; $('#MessageBox').show(); }; $scope.GetPostedLeaveInfo(); }; xhr1.send(TableData); };   //Reject Force fully after Leave Application Posted
    $scope.PerformanceAttendanceRpt = function (str) { var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth() - 2, 25); var lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()); var FromDate = (firstDay.getFullYear()) + '-' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate(); var ToDate = lastDay.getFullYear() + '-' + (lastDay.getMonth() + 1) + '-' + (lastDay.getDate()); if (str === "PERF") { $('#rptPerformance').show(); $('#rptPunching').hide(); } if (str === "PUNCH") { $('#rptPerformance').hide(); $('#rptPunching').show(); }; var pr = new XMLHttpRequest(); pr.open('GET', $scope._Conpath + 'Employee/PerfAttd?empunqid=' + $('#myEmpUnqId').val() + '&flag=' + str + '&fromdate=' + FromDate + '&todate=' + ToDate, true); pr.setRequestHeader('Accept', 'application/json'); pr.onreadystatechange = function () { if (pr.readyState === 4) { var json = JSON.parse(pr.responseText); $scope.prdata = json; if (str === "PERF") { var newarr = $scope.prdata; var cnt1 = 0; var myAttdArray = []; for (var i = 0; i < newarr.length; i++) { myAttdArray.push([]); myAttdArray[cnt1]["EmpUnqId"] = newarr[i].empUnqId; myAttdArray[cnt1]["AttdDate"] = newarr[i].attdDate.substring(0, newarr[i].attdDate.indexOf("T")); myAttdArray[cnt1]["ScheDuleShift"] = newarr[i].scheDuleShift; myAttdArray[cnt1]["ConsShift"] = newarr[i].consShift; var consin = newarr[i].consIn; if (consin === null) { myAttdArray[cnt1]["ConsIn"] = ""; } else { myAttdArray[cnt1]["ConsIn"] = newarr[i].consIn.replace("T", " "); }; var consOut = newarr[i].consOut; if (consOut === null) { myAttdArray[cnt1]["ConsOut"] = ""; } else { myAttdArray[cnt1]["ConsOut"] = newarr[i].consOut.replace("T", " "); }; myAttdArray[cnt1]["ConsWrkHrs"] = newarr[i].consWrkHrs; myAttdArray[cnt1]["ConsOverTime"] = newarr[i].consOverTime; myAttdArray[cnt1]["Status"] = newarr[i].status; myAttdArray[cnt1]["HalfDay"] = newarr[i].halfDay; myAttdArray[cnt1]["LeaveType"] = newarr[i].leaveType; myAttdArray[cnt1]["LeaveHalf"] = newarr[i].leaveHalf; myAttdArray[cnt1]["Earlycome"] = newarr[i].earlycome; myAttdArray[cnt1]["EarlyGoing"] = newarr[i].earlyGoing; myAttdArray[cnt1]["LateCome"] = newarr[i].lateCome; cnt1++; }; $scope.prdata = myAttdArray; $scope.prdata = $filter('orderBy')($scope.prdata, '-AttdDate'); $scope.InfoPL = $scope.prdata; }; if (str === "PUNCH") { $scope.prdata = $filter('orderBy')($scope.prdata, '-punchDate'); }; $scope.curPage = 0; $scope.pageSize = 31; $scope.$digest(); }; }; pr.send(); }; //Attendance Report / Cafetria Punching Report
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; }; $scope.exportAllData = function (name) { setTimeout(function () { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var d = new Date(); d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = name + d; $scope.JSONToCSVConvertor($scope.InfoPL, FileName, true); $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); }, 100); }; $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData; var CSV = ''; CSV += ReportTitle + '\r\n\n'; if (ShowLabel) { var row = ""; for (var index in arrData[0]) { row += index + ','; } row = row.slice(0, -1); CSV += row + '\r\n'; }; for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; } row.slice(0, row.length - 1); CSV += row + '\r\n'; }; if (CSV === '') { alert("Invalid data"); return; }; var fileName = ""; fileName += ReportTitle.replace(/ /g, "_"); var uri = 'data:text/csv;charset=utf-8,' + escape(CSV); var link = document.createElement("a"); link.href = uri; link.style = "visibility:hidden"; link.download = fileName + ".csv"; document.body.appendChild(link); link.click(); document.body.removeChild(link); };
}); app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });
