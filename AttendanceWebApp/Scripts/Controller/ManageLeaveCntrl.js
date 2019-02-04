﻿var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('ManageLeaveMasterController', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1; $scope.itemsPerPage = 10;
    $scope.alluserlist = [];
    $scope.leaveappdetails = "";
    $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    //$scope._Conpath = ''; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });
    jQuery.support.cors = true;
    $scope.SetLTListValue = function (value) { if (value === "OH") { $("#HalfFlag").attr("disabled", true); $("#HalfFlag").attr("checked", false); } };
    $scope.ResetView = function () { window.location.reload(true); };       //Reload Page
    $scope.ToValidate = function () {
        var chkFrom = document.getElementById('FromDt'); var chkTo = document.getElementById('ToDt');
        var FromDate = chkFrom.value; var ToDate = chkTo.value; var date1 = new Date(FromDate); var date2 = new Date(ToDate); var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1;
        $('#TotalDays').text = diff; document.getElementById("TotalDays").value = diff;
        if (diff > 1) { $("#HalfFlag").attr("disabled", true); $("#HalfFlag").attr("checked", false); } else { $("#HalfFlag").removeAttr("disabled"); }
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; } else { return true; }
    };
    //Get Employee details from employee code (Method Use for Reset Password)
    $scope.GetEmpInfo = function () {
        var emp = new XMLHttpRequest(); emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + $('#eCode').val(), true); emp.setRequestHeader('Accept', 'application/json');
        emp.onreadystatechange = function () {
            if (emp.readyState === 4) { var json1 = JSON.parse(emp.responseText); $scope.empdata = json1; $scope.$digest(); $scope.GetRelesaseStratey(); $scope.GetLeaveRequestLists(); }
            else if (emp.status !== 200) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>"; $('#MessageBox').show(); }
        };
        emp.send();
    };
    $scope.GetLeaveRequestLists = function () {
        var xhr1 = new XMLHttpRequest(); xhr1.open('GET', $scope._Conpath + 'LeaveApplication/GetLeaveApplication?empUnqId=' + $('#eCode').val(), true);
        xhr1.setRequestHeader('Accept', 'application/json');
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                var json = JSON.parse(xhr1.responseText); var la = new Array; la = json;
                var applReleaseStatus = new Array; var leaveApplicationDetails = new Array;
                var empName, statName, releaseDate;
                var cnt = 0;
                var myArray = [];
                for (var i = 0; i < la.length; i++) {
                    empName = la[i].employee.empName; statName = la[i].stations.statName; applReleaseStatus = la[i].applReleaseStatus;
                    for (var j = 0; j < applReleaseStatus.length; j++) { releaseDate = applReleaseStatus[j].releaseDate; }
                    leaveApplicationDetails = la[i].leaveApplicationDetails;
                    for (var l = 0; l < leaveApplicationDetails.length; l++) {
                        myArray.push([]);
                        //Leave Applications
                        myArray[cnt]["releaseGroupCode"] = la[i].releaseGroupCode; myArray[cnt]["releaseStatusCode"] = la[i].releaseStatusCode;
                        myArray[cnt]["leaveAppId"] = la[i].leaveAppId; myArray[cnt]["yearMonth"] = la[i].yearMonth; myArray[cnt]["addDt"] = la[i].addDt;
                        myArray[cnt]["releaseDate"] = releaseDate; myArray[cnt]["updDt"] = la[i].updDt; myArray[cnt]["empUnqId"] = la[i].empUnqId;
                        myArray[cnt]["empName"] = empName; myArray[cnt]["statName"] = statName; myArray[cnt]["postedBy"] = la[i].updUser;
                        //Leave Application Details 
                        myArray[cnt]["remarks"] = leaveApplicationDetails[l].remarks; myArray[cnt]["leaveAppItem"] = leaveApplicationDetails[l].leaveAppItem;
                        myArray[cnt]["leaveTypeCode"] = leaveApplicationDetails[l].leaveTypeCode; myArray[cnt]["fromDt"] = leaveApplicationDetails[l].fromDt;
                        myArray[cnt]["toDt"] = leaveApplicationDetails[l].toDt; myArray[cnt]["totalDays"] = leaveApplicationDetails[l].totalDays;
                        myArray[cnt]["halfDayFlag"] = leaveApplicationDetails[l].halfDayFlag; myArray[cnt]["isPosted"] = leaveApplicationDetails[l].isPosted;
                        cnt++;
                    } leaveApplicationDetails = "";
                } $scope.lappdata = myArray; $scope.lappdata = $filter('orderBy')($scope.lappdata, '-leaveAppId'); $scope.curPage = 0; $scope.pageSize = 10; $scope.$digest();
            }
        };
        xhr1.send();
    };
    $scope.PopulateData = function (leaveappid, leaveappitem) { $('#ConformModel').modal('show'); $scope.leaveappdetails = ""; $scope.GetLeaveApplicationDetails(leaveappid, leaveappitem); };
    //Get Leave Application Details FROM Application Id 
    $scope.GetLeaveApplicationDetails = function (leaveappid, leaveappitem) {
        var xhr1 = new XMLHttpRequest(); xhr1.open('GET', $scope._Conpath + 'LeaveApplication/GetLeaveApplication?leaveAppId=' + leaveappid, true);
        xhr1.setRequestHeader('Accept', 'application/json');
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                var jsonvar = JSON.parse(xhr1.responseText); var leavedetail = jsonvar[0].leaveApplicationDetails;
                for (var i = 0; i < leavedetail.length; i++) {
                    var leaveitemno = leavedetail[i].leaveAppItem;
                    if (leaveitemno === leaveappitem) {
                        $scope.leaveappdetails = jsonvar[0].leaveApplicationDetails[i]; $scope.$digest();
                        $('#FromDt').val(leavedetail[i].fromDt.replace("T00:00:00", "")); $('#ToDt').val(leavedetail[i].toDt.replace("T00:00:00", ""));
                        $('#Remarks').val(leavedetail[i].remarks);
                        var hlf = leavedetail[i].halfDayFlag; if (hlf === true) { $("#HalfFlag").attr("checked", true); } else { $("#HalfFlag").attr("checked", false); };
                        $('#TotalDays').val(leavedetail[i].totalDays);
                        //Get Select object & Set Leave Type in the Selection
                        var objSelect = document.getElementById("LeaveType"); setSelectedValue(objSelect, leavedetail[i].leaveTypeCode);
                        function setSelectedValue(selectObj, valueToSet) {
                            for (var i = 0; i < selectObj.options.length; i++) {
                                if (selectObj.options[i].text === valueToSet) { selectObj.options[i].selected = true; return; }
                            }
                        }
                    };
                }
            }
        };
        xhr1.send();
    };
    //Create New Leave Application
    $scope.createLeave = function () {
        //var oldLeaveTypeCode = $scope.leaveappdetails[0].leaveTypeCode;var newLeaveTypeCode = $('#cmbIsPosted').val();
        //if (newLeaveTypeCode !== oldLeaveTypeCode) { LeaveTypeCode = newLeaveTypeCode; } else { LeaveTypeCode = oldLeaveTypeCode; }
        var e = document.getElementById("LeaveType"); var strUser = e.options[e.selectedIndex].text;
        var LeaveTypeCode = strUser; if (LeaveTypeCode.length > 2) { LeaveTypeCode = $scope.leaveappdetails.leaveTypeCode; }
        var Remarks = $('#Remarks').val();
        var chkFrom = document.getElementById('FromDt'); var chkTo = document.getElementById('ToDt'); var FromDate = chkFrom.value; var ToDate = chkTo.value;
        var date1 = new Date(FromDate); var date2 = new Date(ToDate); var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1;
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; };
        var HalfDayFlag = false; if ($('#HalfFlag').prop("checked") === true) { HalfDayFlag = true; } else { HalfDayFlag = false; }
        var Totaldays = 0; Totaldays = $('#TotalDays').val();
        if (HalfDayFlag === true) { Totaldays = '0.5'; } else { if (Totaldays === null || Totaldays === '' || Totaldays === 0) { Totaldays = diff; } }
        var jsonObj = {};
        var TableData = storeTblValues()
        TableData = JSON.stringify(TableData);
        function storeTblValues() {
            jsonObj.yearMonth = $scope.leaveappdetails.yearMonth; jsonObj.leaveAppId = $scope.leaveappdetails.leaveAppId;
            jsonObj.compCode = $scope.leaveappdetails.compCode; jsonObj.wrkGrp = $scope.leaveappdetails.wrkGrp;
            jsonObj.leaveAppItem = $scope.leaveappdetails.leaveAppItem; jsonObj.leaveTypeCode = LeaveTypeCode; jsonObj.fromDt = FromDate; jsonObj.toDt = ToDate;
            jsonObj.totalDays = Totaldays; jsonObj.halfdayflag = HalfDayFlag; jsonObj.remarks = Remarks;
            return jsonObj;
        };
        var la = new XMLHttpRequest(); la.open('POST', $scope._Conpath + 'ManageLeave/ManageLeave?EmpUnqID=' + $('#eCode').val(), true);
        la.setRequestHeader("Content-type", "application/json");
        la.onreadystatechange = function () {
            if (la.readyState === 4 && la.status === 200) {
                jQuery('#btnClose').click();
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Application Updated.. </strong></div>"; $('#MessageBox').show();
                document.getElementById("FromDt").value = ""; document.getElementById("ToDt").value = ""; document.getElementById("TotalDays").value = "";
                document.getElementById("Remarks").value = ""; $('#HalfFlag').prop('checked', false); $("#LeaveType option:first").attr("selected", true);
                $scope.GetEmpInfo();
            }
            else {
                jQuery('#btnClose').click();
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Application Not Updated.. </strong></div>"; $('#MessageBox').show();
                document.getElementById("FromDt").value = ""; document.getElementById("ToDt").value = ""; document.getElementById("TotalDays").value = "";
                document.getElementById("Remarks").value = ""; $('#HalfFlag').prop('checked', false); $("#LeaveType option:first").attr("selected", true);
            }
        }; la.send(TableData);
    };
    //Get Release Strategy
    $scope.GetRelesaseStratey = function () {
        var rel = new XMLHttpRequest(); rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() + '&empUnqId=' + $('#eCode').val(), true); rel.setRequestHeader('Accept', 'application/json');
        rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.$digest(); } }; rel.send();
    };
    //Reject Force fully after Leave Application Posted 
    $scope.LeaveReject = function (rejRemarks, value, value1) {
        var tbldata = storeValues(); tbldata = JSON.stringify(tbldata);
        function storeValues() {
            var tbldata = new Array();
            $('#aliasTable tr').each(function (row, tr) { tbldata[row] = { "LeaveAppId": $(tr).find('td:eq(2)').text(), "LeaveAppItem": $(tr).find('td:eq(7)').text() } });
            var tbl = new Array(); tbl[0] = "test"; var count = 0;
            for (var i = 0; i < tbldata.length; i++) {
                var appid = tbldata[i]["LeaveAppId"];
                if (appid == value) {
                    if ((typeof (rejRemarks) === "undefined") || (typeof (rejRemarks.remarks) === "undefined")) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Enter Remarks First</strong></div>"; $('#MessageBox').show(); return; }
                    tbl[count] = { "YearMonth": value1, "LeaveAppId": value, "LeaveAppItem": tbldata[i]["LeaveAppItem"], "IsPosted": "R", "Remarks": rejRemarks.remarks, "UserId": $('#myEmpUnqId').val() }
                    count++;
                }
            } return tbl;
        };
        var rej = new XMLHttpRequest(); rej.open('POST', $scope._Conpath + 'LeavePosting/PostLeaves', true); rej.setRequestHeader("Content-type", "application/json");
        rej.onreadystatechange = function () {
            if (rej.readyState === 4 && rej.status === 200) {
                window.location.reload(true);
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Rejected Sucesfully.. </strong></div>"; $('#MessageBox').show();
                $scope.GetEmpInfo();
            } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Not Rejected Please Try again.. </strong></div>"; $('#MessageBox').show(); }
        }; rej.send(tbldata);
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });
//Get Leave Types
app.controller('SelectLTypeCntrl', function ($scope, $http, $filter) { $scope.GetLTypeList = function () { $http({ method: 'Get', contentType: "application/json", url: '/LeaveApp/GetLeaveTypeList' }).success(function (data, status, headers, config) { $scope.LList = data; }).error(function (data, status, headers, config) { $scope.message = 'Unexpected Error'; }); }; });