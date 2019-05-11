var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('ShortLeaveController', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1; $scope.itemsPerPage = 10; $scope.alluserlist = [];
    $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    jQuery.support.cors = true;
    $scope.ResetView = function () { window.location.reload(true); };
    $scope.postflg;
    $scope.ToValidate = function () { var chkFrom = document.getElementById('FromDt'); var chkTo = document.getElementById('ToDt'); var FromDate = chkFrom.value; var ToDate = chkTo.value; var date1 = new Date(FromDate); var date2 = new Date(ToDate); var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1; document.getElementById("TotalDays").value = diff; if (diff > 1) { $("#HalfFlag").attr("disabled", true); } else { $("#HalfFlag").removeAttr("disabled"); }; if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; } else { return true; }; };
    $scope.GetOpenMonth = function () { var mon = new XMLHttpRequest(); mon.open('GET', $scope._Conpath + 'OpenMonth/GetOpenMonth', true); mon.setRequestHeader("Content-type", "application/json"); mon.onreadystatechange = function () { if (mon.readyState === 4 && mon.status === 200) { var msg = mon.responseText; $('#previousMonthdate').val(msg); } }; mon.send(); };//Get Open Month Details
    //Get Leave Application List By ECode
    $scope.GetShortLeaveLists = function () {
        $scope.GetOpenMonth();
        var xhr = new XMLHttpRequest(); xhr.open('GET', $scope._Conpath + 'ShortLeave/GetShortLeaves?empUnqId=' + $('#myEmpUnqId').val(), true); xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var json = JSON.parse(xhr.responseText); var mainarr = new Array(); mainarr = json;
                for (var i = 0; i < mainarr.length; i++) {
                    for (var j = 0; j < mainarr[i]["leaveApplicationDetails"].length; j++) {
                        var ispostedflg = mainarr[i]["leaveApplicationDetails"][j].isPosted; var fromdate = mainarr[i]["leaveApplicationDetails"][j].fromDt; var ftmp = (fromdate).slice(0, 10); var f = ftmp.split("-"); var fdate = new Date(f[0], f[1] - 1, f[2]); var predate = $('#previousMonthdate').val(); var pretemp = (predate).slice(1, 11); var p = pretemp.split("-"); var pdate = new Date(p[0], p[1] - 1, p[2]); pdate = new Date(pdate.getFullYear(), pdate.getMonth() - 1, 25); if (ispostedflg === 'F' && fdate <= pdate) { mainarr[i].openmonthflg = false; } else { mainarr[i].openmonthflg = true; }//Add OpenMonth Flag Column
                    }
                } $scope.ldata = mainarr; $scope.ldata = $filter('orderBy')($scope.ldata, '-leaveAppId'); $scope.curPage = 0; $scope.pageSize = 10; $scope.$digest();
            }
        }; xhr.send();
    };
    $scope.PopulateData = function (LeaveAppId) { $scope.LeaveAppId = LeaveAppId; $scope.GetLeaveApplicationDetails(); };
    //Get Login User Leave Application Details from Application Id 
    $scope.GetLeaveApplicationDetails = function () { var xhr1 = new XMLHttpRequest(); xhr1.open('GET', $scope._Conpath + 'LeaveApplication/GetLeaveApplication?leaveAppId=' + $scope.LeaveAppId, true); xhr1.setRequestHeader('Accept', 'application/json'); xhr1.onreadystatechange = function () { if (xhr1.readyState === 4) { var jsonvar = JSON.parse(xhr1.responseText); var leavedetail = jsonvar[0].leaveApplicationDetails; for (var i = 0; i < leavedetail.length; i++) { var partialpost = leavedetail[i].isPosted; if (partialpost === 'P') { $scope.postflg = true; } else { $scope.postflg = false; } }; if ($scope.postflg === false) { $scope.lappdata = jsonvar; $scope.$digest(); } else { alert("This Application is partially posted. Please Contact to HR Department."); }; if ($scope.postflg === false || typeof ($scope.postflg) === "undefined") { $('#ConformModel').modal('show'); }; if ($scope.postflg === true) { return false; }; } }; xhr1.send(); };
    //Short Leave Cancellation
    $scope.LeaveCancel = function (entity) {
        var d = new Date(); var year = d.getFullYear().toString(); var month = d.getMonth() + 1; var yearmonth = year + (month.toString()); var Remarks = entity.Remarks;
        var FromDate = entity.FromDt; var farray = FromDate.split("-"); FromDate = farray[0] + '/' + farray[1] + '/' + farray[2];
        var ToDate = entity.ToDt; var tarray = ToDate.split("-"); ToDate = tarray[0] + '/' + tarray[1] + '/' + tarray[2];
        var date1 = new Date(FromDate); var date2 = new Date(ToDate); var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1; if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; };
        var Totaldays = $('#TotalDays').val(); if (Totaldays === null || Totaldays === '' || Totaldays === 0) { Totaldays = diff; }
        var jsonObj = {};
        var tbldta = GetLeaveDetails(); function GetLeaveDetails() { var tbldta = new Array(); $('#aliastable tr').each(function (row, tr) { tbldta[row] = { "leaveTypeCode": $(tr).find('td:eq(1)').text(), "fromDt": $(tr).find('td:eq(2)').text(), "toDt": $(tr).find('td:eq(3)').text() } }); return tbldta; };
        var efdate = Date.parse(FromDate); var etdate = Date.parse(ToDate);
        var ltype; var chkfdt = ""; var chktdt = ""; var lnt = tbldta.length;
        for (var i = 0; i < tbldta.length; i++) { var fdt = tbldta[i]["fromDt"]; var tdt = tbldta[i]["toDt"]; var fdtarray = fdt.split("/"); fdt = fdtarray[2] + '/' + fdtarray[1] + '/' + fdtarray[0]; var tdtarray = tdt.split("/"); tdt = tdtarray[2] + '/' + tdtarray[1] + '/' + tdtarray[0]; fdt = Date.parse(fdt); tdt = Date.parse(tdt); if (efdate <= tdt && etdate >= fdt) { ltype = tbldta[i]["leaveTypeCode"]; if (i === 0) { chkfdt = fdt; } if (lnt === 1) { chktdt = tdt; } else { chktdt = tdt; } }; };
        if (efdate === chkfdt && etdate === chktdt) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Cancel this Leave Application from Full Leave Cancel Menu</strong></div>"; $('#MessageBox').show(); jQuery('#btnClose').click(); return false; }
        var TableData = storeTblValues(); TableData = JSON.stringify(TableData); function storeTblValues() { var TableData = new Array(); TableData[0] = { "yearMonth": yearmonth, "leaveAppId": 0, "compCode": $('#myCompCode').val(), "wrkGrp": $('#myWrkGrp').val(), "leaveAppItem": 1, "leaveTypeCode": ltype, "fromDt": FromDate, "toDt": ToDate, "totalDays": Totaldays, "halfdayflag": false, "remarks": Remarks }; jsonObj.yearMonth = yearmonth; jsonObj.leaveAppId = 0; jsonObj.empUnqId = $('#myEmpUnqId').val(); jsonObj.compCode = $('#myCompCode').val(); jsonObj.wrkGrp = $('#myWrkGrp').val(); jsonObj.unitCode = $('#myUnitCode').val(); jsonObj.deptCode = $('#myDeptCode').val(); jsonObj.statCode = $('#myStatCode').val(); jsonObj.secCode = $('#mySecCode').val(); jsonObj.catCode = $('#myCatCode').val(); jsonObj.isHOD = $('#myIsHod').val(); jsonObj.releaseGroupCode = $('#releaseGroupCode').val(); jsonObj.releaseStrategy = ""; jsonObj.releaseStatusCode = ""; jsonObj.addDt = d; jsonObj.addUser = $('#myEmpUnqId').val(); jsonObj.updDt = d; jsonObj.updUser = null; jsonObj.remarks = null; jsonObj.parentId = $scope.LeaveAppId; jsonObj.leaveApplicationDetails = TableData; return jsonObj; };
        var xhr = new XMLHttpRequest(); xhr.open('POST', $scope._Conpath + 'ShortLeave/CreateShortLeave', true); xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () { if (xhr.status === 201) { jQuery('#btnClose').click(); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Cancellation Leave Created Sucesfully.. </strong></div>"; $('#MessageBox').show(); $("#aliasTable").find("tr:not(:first)").remove(); document.getElementById("FromDt").value = ""; document.getElementById("ToDt").value = ""; document.getElementById("TotalDays").value = ""; document.getElementById("Remarks").value = ""; } else { jQuery('#btnClose').click(); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Cancellation Not Created.. </strong></div>"; $('#MessageBox').show(); document.getElementById("FromDt").value = ""; document.getElementById("ToDt").value = ""; document.getElementById("TotalDays").value = ""; document.getElementById("Remarks").value = ""; } $scope.GetShortLeaveLists(); }; xhr.send(TableData);
    };
    //Full Leave Application Cancel
    $scope.FullLeaveCancel = function (lgrp, lappid) {
        var retVal = confirm("Do you want to continue ?");
        if (retVal == true) {
            var flc = new XMLHttpRequest(); flc.open('POST', $scope._Conpath + 'ShortLeave/CancelLeave?releaseGroupCode=' + lgrp + '&leaveAppId=' + lappid, true); flc.setRequestHeader("Content-type", "application/json");
            flc.onreadystatechange = function () {
                if (flc.readyState === 4) {
                    //Auto Mail Sending
                    var json = JSON.parse(flc.responseText); var maildata = []; maildata = json; var relsdata = []; relsdata = maildata["applReleaseStatus"]; var relsauth = relsdata[0]["releaseAuth"]; var sd1 = maildata["releaseGroupCode"]; var sd2 = maildata["leaveAppId"]; var rlsmail = new XMLHttpRequest(); rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMail?releaseGroupCode=' + sd1 + '&id=' + sd2 + '&releaseAuth=' + relsauth, true); rlsmail.setRequestHeader("Content-type", "application/json"); rlsmail.send();
                    //Auto Mail End
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Canceled Successfully.. </strong></div>"; $('#MessageBox').show();
                } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Not Canceled</strong></div>"; $('#MessageBox').show(); }
                $scope.GetShortLeaveLists();
            }; flc.send();
            return true;
        } else { return false; }
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });