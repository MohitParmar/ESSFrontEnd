﻿var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('LeaveReleaseCntrloller', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 10; $scope.alluserlist = [];
    var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; var url_port = url.port;
    $scope._Conpath = ''; var loc = $("#myLoc").val();
    $(document).ready(function () {
        if (typeof (_ConPath) === "undefined") { return; } else {
            if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else {
                $scope._Conpath = urlprotocol + "//" + urlhost + "/api/";
            }
        };
    });
    $scope.RefreshTable = function () { $scope.tableParams.reload(); }; jQuery.support.cors = true; var d = new Date(); var releasearr = []; var rlsarr = [];
    $scope.GetLeaveInfo = function () { var FromDate, ToDate; var firstDay = new Date(); var lastDay = new Date(new Date().setDate(new Date().getDate() + 30)); FromDate = (firstDay.getFullYear()) + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate(); ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate()); var req = new XMLHttpRequest(); req.open('GET', $scope._Conpath + 'LeaveReport/GetLeaves?empunqid=' + $('#myEmpUnqId').val() + '&fromDt=' + FromDate + '&toDt=' + ToDate, true); req.setRequestHeader('Accept', 'application/json'); req.onreadystatechange = function () { if (req.readyState === 4) { var json = JSON.parse(req.responseText); $scope.reqdata = json; $scope.reqdata = $filter('orderBy')($scope.reqdata, '-leaveAppId'); $scope.curPage = 0; $scope.pageSize = 10; $scope.$digest(); } }; req.send(); };//Get Leave Report Login Releaser
    $scope.GetLeaveRequestLists = function () { var xhr = new XMLHttpRequest(); xhr.open('GET', $scope._Conpath + 'AppRelease/GetApplReleaseStatus?empUnqId=' + $('#myEmpUnqId').val(), true); xhr.setRequestHeader('Accept', 'application/json'); xhr.onreadystatechange = function () { if (xhr.readyState === 4) { var json = JSON.parse(xhr.responseText); rlsarr = json; $scope.data = json; $scope.data = $filter('orderBy')($scope.data, '-leaveAppId'); $scope.curPage1 = 0; $scope.pageSize1 = 10; $scope.$digest(); } }; xhr.send(); };//Get Pending Leave Applicatinons List
    $scope.PopulateData = function (LeaveAppId, empunqid) {
        $scope.LeaveAppId = LeaveAppId; $scope.empunqid = empunqid; var bal = new XMLHttpRequest(); bal.open('GET', $scope._Conpath + 'LeaveBalance/GetLeaveBalance?empUnqId=' + empunqid + '&yearmonth=' + d.getFullYear() + '&flag=true', true); bal.setRequestHeader('Accept', 'application/json'); bal.onreadystatechange = function () { if (bal.readyState === 4) { var json = JSON.parse(bal.responseText); $scope.lbaldata = json; $scope.$digest(); } }; bal.send(); $scope.GetLeaveApplicationDetails(); $('#ConformModel').modal('show');
    };//Popup the Model
    $scope.GetLeaveApplicationDetails = function () {
        var xhr1 = new XMLHttpRequest(); xhr1.open('GET', $scope._Conpath + 'LeaveApplication/GetLeaveApplication?leaveAppId=' + $scope.LeaveAppId, true); xhr1.setRequestHeader('Accept', 'application/json'); xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                var jsonvar = JSON.parse(xhr1.responseText); releasearr = jsonvar; $scope.lappdata = jsonvar; var objarr = []; objarr = $scope.lappdata;      //Get Leave Application wise Releaser Details
                var xhr2 = new XMLHttpRequest(); xhr2.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + objarr[0]["releaseGroupCode"] + '&empUnqId=' + $scope.empunqid, true); xhr2.setRequestHeader('Accept', 'application/json'); xhr2.onreadystatechange = function () { if (xhr2.readyState === 4) { var jsonvar1 = JSON.parse(xhr2.responseText); $scope.rlsdata = jsonvar1; $scope.$digest(); }; }; xhr2.send();//Get Release Strategy
                var pstl = new XMLHttpRequest(); pstl.open('GET', $scope._Conpath + 'leaveentry?empunqid=' + objarr[0]["empUnqId"], true); pstl.setRequestHeader('Accept', 'application/json'); pstl.onreadystatechange = function () { if (pstl.readyState === 4) { var json = JSON.parse(pstl.responseText); $scope.pladata = json; $scope.pladata = $filter('orderBy')($scope.pladata, '-fromDt'); $scope.curPage2 = 0; $scope.pageSize2 = 5; $scope.$digest(); }; }; pstl.send(); $scope.$digest();//Get Posted Leave Entries
            };
        }; xhr1.send();
    };      //Get Leave Application Details from Leave Application ID
    $scope.UpdateLeaveReleaseStatus = function (releaseStatusCode, rlsappid, data) {
        var rmks = ''; if (releaseStatusCode === "R") { if ((typeof (data) === "undefined") || (typeof (data.Remarks) === "undefined")) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Remarks First For Rejection</strong></div>"; $('#MessageBox').show(); return false; } else { rmks = data.Remarks; }; } else { if ((typeof (data) === "undefined")) { rmks = ""; } else { rmks = data.Remarks; }; }; var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        // Get Releaser Details From AppReleaseStatus Table
        var leaveheaderarr = []; var detailarr = []; for (var r = 0; r <= rlsarr.length; r++) { var ecode = rlsarr[r]["leaveAppId"]; if (ecode == rlsappid) { leaveheaderarr = rlsarr[r]; detailarr = rlsarr[r]["applReleaseStatus"]; break; }; };
        //Get ReleaseCode of Releaser
        var dataarr = []; for (i = 0; i < detailarr.length; i++) { var release_auth = detailarr[i]["releaseAuth"]; if (release_auth === $('#myEmpUnqId').val()) { dataarr = detailarr[i]; break; }; };
        var jsonObj = {}; jsonObj.YearMonth = dataarr.yearMonth; jsonObj.ReleaseGroupCode = dataarr.releaseGroupCode; jsonObj.ApplicationId = rlsappid; jsonObj.ReleaseStrategy = dataarr.releaseStrategy; jsonObj.ReleaseStrategyLevel = dataarr.releaseStrategyLevel; jsonObj.ReleaseCode = dataarr.releaseCode; jsonObj.ReleaseStatusCode = dataarr.releaseStatusCode; jsonObj.ReleaseDate = strDate; jsonObj.ReleaseAuth = dataarr.releaseAuth; jsonObj.IsFinalRelease = dataarr.isFinalRelease; jsonObj.Remarks = rmks; jsonObj.LeaveApplications_YearMonth = null; jsonObj.LeaveApplications_LeaveAppId = null; jsonObj = JSON.stringify(jsonObj);
        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST', $scope._Conpath + 'AppRelease/UpdateApplReleaseStatus?empUnqId=' + $('#myEmpUnqId').val() + '&releaseStatusCode=' + releaseStatusCode, true);
        xhr2.setRequestHeader("Content-type", "application/json");
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4) {
                $('#btnClose').click(); if (releaseStatusCode === 'F') {
                    //Auto Mail Sending
                    var empcode = $('#myEmpUnqId').val(); var ind = 0; var rls_final = ''; if (detailarr.length > 0) { for (var rls = 0; rls < detailarr.length; rls++) { var rls_code = detailarr[rls]["releaseAuth"]; rls_final = detailarr[rls]["isFinalRelease"]; if (rls_code === empcode && rls_final !== true) { ind = rls + 1; break; }; }; }; if (rls_final !== true) { var relsauth = detailarr[ind]["releaseAuth"]; var rlsmail = new XMLHttpRequest(); rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMail?releaseGroupCode=' + detailarr[ind]["releaseGroupCode"] + '&id=' + rlsappid + '&releaseAuth=' + relsauth, true); rlsmail.setRequestHeader("Content-type", "application/json"); rlsmail.send(); };
                    //Auto Mail End
                    document.getElementById("Remarks").value = ""; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Application Approved Sucesfully.. </strong></div>";
                    ///Auto Leave Post
                    debugger;
                    var loc = $('#myLoc').val(); var cancelled = leaveheaderarr.cancelled; var parentid = leaveheaderarr.parentId;
                    if (rls_final === true && (loc === "IPU" || loc === "NKP" || loc === "NSK" || loc === "NAG")) {
                        var slflg = false; var TableData = storeTblValues(); var ldata = new Array();
                        TableData = JSON.stringify(TableData);
                        function storeTblValues() {
                            var TableData = new Array(); $('#aliasTable tr').each(function (row, tr) {
                                TableData[row] = {
                                    "LeaveAppId": $(tr).find('td:eq(0)').text(), "LeaveAppItem": $(tr).find('td:eq(2)').text(),
                                    "LeaveTypeCode": $(tr).find('td:eq(3)').text()
                                }
                            });
                            var tbl = new Array(); tbl[0] = "test"; var count = 0;
                            for (var i = 0; i < TableData.length - 1; i++) {
                                var appid = TableData[i]["LeaveAppId"]; var appleavetype = TableData[i]["LeaveTypeCode"];
                                if (appid == rlsappid) {
                                    if (loc === "IPU" && (appleavetype === "SL" || appleavetype === "OD" || parentid !== 0 || cancelled === true)) {
                                        slflg = true; return false;
                                    } else if (appleavetype === "SL" || appleavetype === "OD" || parentid !== 0 || cancelled === true) {
                                        slflg = true; return false;
                                    };
                                    tbl[count] = {
                                        "YearMonth": dataarr.yearMonth, "LeaveAppId": rlsappid, "LeaveAppItem": TableData[i]["LeaveAppItem"], "IsPosted": "F", "UserId": $('#myEmpUnqId').val()
                                    }; count++;
                                };
                            }; ldata = tbl; return tbl;
                        };
                        if (slflg === false) {
                            debugger;
                            var pst = new XMLHttpRequest();
                            pst.open('POST', $scope._Conpath + 'LeavePosting/PostLeaves', true);
                            pst.setRequestHeader("Content-type", "application/json");
                            pst.onreadystatechange = function () {
                                if (pst.readyState === 4 && pst.status === 200) { debugger; TableData = ""; }
                                else { debugger; }
                            }; pst.send(TableData);
                        };
                    };
                }; if (releaseStatusCode === 'R') { document.getElementById("Remarks").value = ""; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Application Rejected Sucesfully.. </strong></div>"; }; $('#MessageBox').show();
            } else { jQuery('#btnClose').click(); if (releaseStatusCode === 'F') { document.getElementById("Remarks").value = ""; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Application Not Approved .. </strong></div>"; }; if (releaseStatusCode === 'R') { document.getElementById("Remarks").value = ""; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> Leave Application Not Rejected .. </strong></div>"; }; $('#MessageBox').show(); }; $scope.GetLeaveRequestLists();
        }; xhr2.send(jsonObj);
    };      //Update Leave Application With Approve / Reject
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
});
