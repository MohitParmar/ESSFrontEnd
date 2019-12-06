﻿angular.module('myApp.Controllers').controller('COffJFLController', ['$scope', '$http', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.alluserlist = []; $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.loc = $('#myLoc').val(); $scope.ResetView = function () { window.location.reload(true); }; jQuery.support.cors = true;
    $scope.GetRelesaseStratey = function () { var rel = new XMLHttpRequest(); rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() + '&empUnqId=' + $('#myEmpUnqId').val(), true); rel.setRequestHeader('Accept', 'application/json'); rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.$digest(); } }; rel.send(); };//Get Release Strategy
    var c = 0;
    //Get Applied Comp Off Leave Requests & Validate
    $scope.LeaveRequestData = function (entity) {
        var chk = false; var chktabldta = false; var CODate1 = entity.CODate1; var CODate2 = entity.CODate2;
        if ((typeof (entity) === "undefined") || (typeof (entity.ToDt) === "undefined") || (typeof (entity.Remarks) === "undefined") ||
            (typeof (entity.CODate1) === "undefined")) { alert("Please Fill All Required Details .. "); return false; };
        if ((typeof (entity.CODate2) === "undefined")) { CODate2 = ''; };
        var COMODE = entity.COMODE; var LeaveTypeCode = $('#txtLeaveTypeCode').val(); var Remarks = entity.Remarks.replace("'", ""); var ToDate = entity.ToDt;
        var date1 = new Date(CODate1); var date2 = new Date(ToDate); var coffdays = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1;
        if ($scope.loc === "IPU") { if (coffdays > 31) { alert("Please Select Correct Date for COff Apply .. "); return false; }; };
        var d = new Date(); var year = d.getFullYear().toString(); var month = d.getMonth() + 1; var yearmonth = year + (month.toString());
        var jsonObj = {}; var TableData = storeTblValues(); TableData = JSON.stringify(TableData);
        function storeTblValues() {
            var count = 0; c = c + 1; count++;
            $('.tempRow').remove();
            var row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + c + "'>" + c + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + LeaveTypeCode + "'>" + LeaveTypeCode + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasMiddleNames' value='" + ToDate + "'>" + ToDate + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + 1 + "'>" + 1 + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + Remarks + "'>" + Remarks + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasMiddleNames' value='" + COMODE + "'>" + COMODE + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + CODate1 + "'>" + CODate1 + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasMiddleNames' value='" + CODate2 + "'>" + CODate2 + "</td>" + "</tr>");
            $("#aliasTable").append(row);
            var TableData = new Array();
            $('#aliasTable tr').each(function (row, tr) {
                TableData[row] = {
                    "yearMonth": yearmonth,
                    "leaveAppId": 0,
                    "compCode": $('#myCompCode').val(),
                    "wrkGrp": $('#myWrkGrp').val(),
                    "leaveAppItem": c,
                    "leaveTypeCode": $('#txtLeaveTypeCode').val(),
                    "fromDt": $(tr).find('td:eq(2)').text(),
                    "toDt": $(tr).find('td:eq(2)').text(),
                    "totalDays": $(tr).find('td:eq(3)').text(),
                    "halfdayflag": false,
                    "remarks": $(tr).find('td:eq(4)').text(),
                    "coMode": $(tr).find('td:eq(5)').text(),
                    "coDate1": $(tr).find('td:eq(6)').text(),
                    "coDate2": $(tr).find('td:eq(7)').text()
                }
            }); TableData.shift();
            jsonObj.yearMonth = yearmonth;
            jsonObj.leaveAppId = 0;
            jsonObj.empUnqId = $('#myEmpUnqId').val();
            jsonObj.compCode = $('#myCompCode').val();
            jsonObj.wrkGrp = $('#myWrkGrp').val();
            jsonObj.unitCode = $('#myUnitCode').val();
            jsonObj.deptCode = $('#myDeptCode').val();
            jsonObj.statCode = $('#myStatCode').val();
            jsonObj.catCode = $('#myCatCode').val();
            jsonObj.releaseGroupCode = $('#releaseGroupCode').val();
            jsonObj.releaseStrategy = "";
            jsonObj.releaseStatusCode = "";
            jsonObj.addDt = d;
            jsonObj.addUser = $('#myEmpUnqId').val();
            jsonObj.updDt = d;
            jsonObj.updUser = null;
            jsonObj.remarks = null;
            jsonObj.leaveApplicationDetails = TableData;
            return jsonObj;
        };
        var xhr1 = new XMLHttpRequest();
        xhr1.open('POST', $scope._Conpath + 'LeaveValidate/IsValid', true);
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4 && xhr1.status === 200) {
                
                var json = JSON.parse(xhr1.responseText);
                $scope.Vdata = json;
                var newarr = [];
                newarr[0] = $scope.Vdata;
                var dtlarr = [];
                dtlarr = newarr[0]["leaveApplicationDetails"];
                var dtlarrleg = dtlarr.length;
                var table = document.getElementById('aliasTable');
                var rowCount = table.rows.length;
                table.deleteRow(rowCount - 1);
                dtlarrleg = dtlarrleg - 1;
                var tdate = new Date(dtlarr[dtlarrleg]["toDt"]); tdate = tdate.getFullYear() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getDate();
                var codate1 = new Date(dtlarr[dtlarrleg]["coDate1"]); codate1 = codate1.getFullYear() + "/" + (codate1.getMonth() + 1) + "/" + codate1.getDate();
                var codate2 = new Date(dtlarr[dtlarrleg]["coDate2"]); codate2 = codate2.getFullYear() + "/" + (codate2.getMonth() + 1) + "/" + codate2.getDate();
                var row = $("<tr>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + dtlarr[dtlarrleg]["leaveAppItem"] + "'>" +
                    dtlarr[dtlarrleg]["leaveAppItem"] + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + dtlarr[dtlarrleg]["leaveTypeCode"] + "'>" +
                    dtlarr[dtlarrleg]["leaveTypeCode"] + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + tdate + "'>" + tdate + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + dtlarr[dtlarrleg]["totalDays"] + "'>" +
                    dtlarr[dtlarrleg]["totalDays"] + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + dtlarr[dtlarrleg]["remarks"] + "'>" +
                    dtlarr[dtlarrleg]["remarks"] + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + dtlarr[dtlarrleg]["coMode"] + "'>" + dtlarr[dtlarrleg]["coMode"] + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + codate1 + "'>" + codate1 + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + codate2 + "'>" + codate2 + "</td>" +
                    "</tr>"); $("#aliasTable").append(row);
                document.getElementById("CODate1").value = "";
                document.getElementById("CODate2").value = "";
                document.getElementById("ToDt").value = "";
                document.getElementById("Remarks").value = "";
                document.getElementById("txtLeaveTypeCode").value = "CO";
                document.getElementById("BtnSave").disabled = true;
            } else if (xhr1.status === 400 || xhr1.status === 403 || xhr1.status === 404 || xhr1.status === 408 || xhr1.status === 500) {
                
                if (chk === false) {
                    var tables = document.getElementById('aliasTable');
                    var rowCounts = tables.rows.length;
                    tables.deleteRow(rowCounts - 1);
                    chk = true; c = c - 1;
                } var str = xhr1.responseText.replace("[", '').replace("]", '').toString();
                var fields = str.split(',');
                var er = "";
                for (var i = 0; i < fields.length; i++) {
                    er = er + fields[i] + "<br/>";
                } document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er +
                    "</strong></div>"; $('#MessageBox').show();
                document.getElementById("CODate1").value = "";
                document.getElementById("CODate2").value = "";
                document.getElementById("ToDt").value = "";
                document.getElementById("Remarks").value = "";
                document.getElementById("txtLeaveTypeCode").value = "CO";
            };
        }; xhr1.send(TableData);
    };
    //Create New Comp Off Leave Application
    $scope.createLeave = function () {
        var d = new Date(); var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes(); var year = d.getFullYear().toString(); var month = d.getMonth() + 1; var yearmonth = year + (month.toString());
        var jsonObj = {}; var TableData = storeTblValues(); TableData = JSON.stringify(TableData);
        function storeTblValues() {
            var TableData = new Array();
            $('#aliasTable tr').each(function (row, tr) {
                TableData[row] = {
                    "yearMonth": yearmonth,
                    "leaveAppId": 0,
                    "compCode": $('#myCompCode').val(),
                    "wrkGrp": $('#myWrkGrp').val(),
                    "leaveAppItem": $(tr).find('td:eq(0)').text(),
                    "leaveTypeCode": $(tr).find('td:eq(1)').text(),
                    "fromDt": $(tr).find('td:eq(2)').text(),
                    "toDt": $(tr).find('td:eq(2)').text(),
                    "totalDays": $(tr).find('td:eq(3)').text(),
                    "halfdayflag": false,
                    "remarks": $(tr).find('td:eq(4)').text(),
                    "coMode": $(tr).find('td:eq(5)').text(),
                    "coDate1": $(tr).find('td:eq(6)').text(),
                    "coDate2": $(tr).find('td:eq(7)').text()
                }
            }); TableData.shift();
            if (TableData.length > 0) {
                for (var tdata = 0; tdata < TableData.length; tdata++) {
                    var ltyp = TableData[tdata]["leaveTypeCode"];
                    if (ltyp === '') {
                        return false;
                    }
                }
            } else {
                return false;
            };
            jsonObj.yearMonth = yearmonth;
            jsonObj.leaveAppId = 0;
            jsonObj.empUnqId = $('#myEmpUnqId').val();
            jsonObj.compCode = $('#myCompCode').val();
            jsonObj.wrkGrp = $('#myWrkGrp').val();
            jsonObj.unitCode = $('#myUnitCode').val();
            jsonObj.deptCode = $('#myDeptCode').val();
            jsonObj.statCode = $('#myStatCode').val();
            jsonObj.catCode = $('#myCatCode').val();
            jsonObj.isHOD = $('#myIsHod').val();
            jsonObj.releaseGroupCode = $('#releaseGroupCode').val();
            jsonObj.releaseStrategy = "";
            jsonObj.releaseStatusCode = "";
            jsonObj.addDt = dt;
            jsonObj.addUser = $('#myEmpUnqId').val();
            jsonObj.clientIp = $('#myIPAddress').val();
            jsonObj.updDt = dt;
            jsonObj.updUser = null;
            jsonObj.remarks = null;
            jsonObj.parentId = 0;
            jsonObj.leaveApplicationDetails = TableData;
            return jsonObj;
        };
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', $scope._Conpath + 'LeaveApplication/CreateLeaveApplication', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201) {
                //Auto Mail Sending Start
                //var json = JSON.parse(xhr.responseText); var maildata = []; maildata = json; var relsdata = []; relsdata = maildata["applReleaseStatus"]; var relsauth = relsdata[0]["releaseAuth"];
                //var rlsmail = new XMLHttpRequest(); rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMail?releaseGroupCode=' + maildata["releaseGroupCode"] + '&id=' + maildata["leaveAppId"] + '&releaseAuth=' + relsauth, true); rlsmail.setRequestHeader("Content-type", "application/json"); rlsmail.send();
                //Auto Mail End
                
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Leave Application Created Sucesfully.. </strong></div>";
                $('#MessageBox').show();
                $("#aliasTable").find("tr:not(:first)").remove();
                document.getElementById("CODate1").value = "";
                document.getElementById("CODate2").value = "";
                document.getElementById("ToDt").value = "";
                document.getElementById("Remarks").value = "";
                document.getElementById("BtnCreate").disabled = true;
                document.getElementById("txtLeaveTypeCode").value = "CO";
            } else {
                
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Leave Application Not Created.. </strong></div>";
                $('#MessageBox').show();
                document.getElementById("CODate1").value = "";
                document.getElementById("CODate2").value = "";
                document.getElementById("ToDt").value = "";
                document.getElementById("Remarks").value = "";
                document.getElementById("txtLeaveTypeCode").value = "CO";
            };
        }; xhr.send(TableData);
    };
}]);
myApp.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });