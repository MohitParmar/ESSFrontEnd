﻿angular.module('myApp.Controllers').controller('COffLeaveController', ['$scope', '$http', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.alluserlist = [];
    $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.loc = $('#myLoc').val();
    $scope.ResetView = function () { window.location.reload(true); };   //Reload Page
    //Get Release Strategy
    $scope.GetRelesaseStratey = function () { var rel = new XMLHttpRequest(); rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() + '&empUnqId=' + $('#myEmpUnqId').val(), true); rel.setRequestHeader('Accept', 'application/json'); rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.$digest(); } }; rel.send(); };
    //Check Holiday Date with today
    $scope.ChkHoliday = function () {
        var d = new Date(); var today;
        if (d.getMonth() < '10') { today = d.getFullYear() + '-' + '0' + (d.getMonth() + 1) + '-' + d.getDate(); }
        else { today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
        var FromDate = $("#FromDt option:selected").text();
        var fdt = FromDate + " 00:00:00"; var tdt = today + " 00:00:00"; var date1 = new Date(fdt); var date2 = new Date(tdt);
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Can not take COFF before Holiday</strong></div>"; $('#MessageBox').show(); return false; } else { return true; }
    };
    //Date Validation
    $scope.ToValidate = function () {
        var FromDate = $("#FromDt option:selected").text(); var chkTo = document.getElementById('ToDt'); var ToDate = chkTo.value;
        var date1 = new Date(FromDate); var date2 = new Date(ToDate); var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1;
        if ($scope.loc === "IPU") { if (diff > 8) { alert("Please Select Correct Date for COff Apply .. "); return false; } }
        else { if (diff > 91) { alert("Please Select Correct Date for COff Apply .. "); return false; } }
        $('#TotalDays').text = diff; document.getElementById("TotalDays").value = diff;
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date..</strong></div>"; $('#MessageBox').show(); return false; } else { return true; }
    };
    var c = 0;
    //Get Applied Comp Off Leave Requests & Validate
    $scope.LeaveRequestData = function (entity) {
        var chk = false; var chktabldta = false;
        //Check Today With Holiday 
        var dtoday = new Date(); var today;
        if (dtoday.getMonth() < '10') { today = dtoday.getFullYear() + '-' + '0' + (dtoday.getMonth() + 1) + '-' + dtoday.getDate(); }
        else { today = dtoday.getFullYear() + '-' + (dtoday.getMonth() + 1) + '-' + dtoday.getDate(); }
        var FromDate = $("#FromDt option:selected").text();
        var fdt = FromDate + " 00:00:00"; var tdt = today + " 00:00:00";
        var dateholidaydate = new Date(fdt); var datetoday = new Date(tdt);
        if (datetoday < dateholidaydate) { alert("Can not take COFF before Holiday"); return false; }
        //enable Checkbox for Half Day Leave Apply
        if ((typeof (entity) === "undefined") || (typeof (entity.ToDt) === "undefined") || (typeof (entity.Remarks) === "undefined") || FromDate === "") { alert("Please Fill All Required Details .. "); return false; }
        var LeaveTypeCode = $('#txtLeaveTypeCode').val(); var Totaldays = 1; var Remarks = entity.Remarks.replace("'", ""); var ToDate = entity.ToDt;
        var date1 = new Date(FromDate); var date2 = new Date(ToDate); var coffdays = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1;
        if ($scope.loc === "IPU") { if (coffdays > 8) { alert("Please Select Correct Date for COff Apply .. "); return false; } }
        else { if (coffdays > 91) { alert("Please Select Correct Date for COff Apply .. "); return false; } }

        // Week Off Apply //if (coffdays > 4) { alert("Please Select Correct Date for COff Apply .. "); return false; }

        ///Get Grid Data
        var d = new Date(); var year = d.getFullYear().toString(); var month = d.getMonth() + 1; var yearmonth = year + (month.toString());
        var jsonObj = {};
        var TableData = storeTblValues()
        TableData = JSON.stringify(TableData);
        //Get DAta From the Leae Application Form & store into Array
        function storeTblValues() {
            var count = 0; c = c + 1; count++;
            $('.tempRow').remove();
            var row = $("<tr>" +
                "<td><input type='hidden' name='AliasLastNames' value='" + c + "'>" + c + "</td>" +
                "<td><input type='hidden' name='AliasFirstNames' value='" + LeaveTypeCode + "'>" + LeaveTypeCode + "</td>" +
                "<td><input type='hidden' name='AliasFirstNames' value='" + FromDate + "'>" + FromDate + "</td>" +
                "<td><input type='hidden' name='AliasMiddleNames' value='" + ToDate + "'>" + ToDate + "</td>" +
                "<td><input type='hidden' name='AliasLastNames' value='" + Totaldays + "'>" + Totaldays + "</td>" +
                "<td><input type='hidden' name='AliasLastNames' value='" + Remarks + "'>" + Remarks + "</td>" +
                "</tr>");
            $("#aliasTable").append(row);
            var TableData = new Array();
            $('#aliasTable tr').each(function (row, tr) {
                TableData[row] = {
                    "yearMonth": yearmonth
                    , "leaveAppId": 0
                    , "compCode": $('#myCompCode').val()
                    , "wrkGrp": $('#myWrkGrp').val()
                    , "leaveAppItem": c
                    , "leaveTypeCode": $('#txtLeaveTypeCode').val()
                    , "fromDt": $(tr).find('td:eq(2)').text()
                    , "toDt": $(tr).find('td:eq(3)').text()
                    , "totalDays": $(tr).find('td:eq(4)').text()
                    , "halfdayflag": false
                    , "remarks": $(tr).find('td:eq(5)').text()
                }
            });
            TableData.shift();
            jsonObj.yearMonth = yearmonth; jsonObj.leaveAppId = 0; jsonObj.empUnqId = $('#myEmpUnqId').val(); jsonObj.compCode = $('#myCompCode').val();
            jsonObj.wrkGrp = $('#myWrkGrp').val(); jsonObj.unitCode = $('#myUnitCode').val(); jsonObj.deptCode = $('#myDeptCode').val();
            jsonObj.statCode = $('#myStatCode').val(); jsonObj.catCode = $('#myCatCode').val(); jsonObj.releaseGroupCode = $('#releaseGroupCode').val();
            jsonObj.releaseStrategy = ""; jsonObj.releaseStatusCode = ""; jsonObj.addDt = d; jsonObj.addUser = $('#myEmpUnqId').val(); jsonObj.updDt = d;
            jsonObj.updUser = null; jsonObj.remarks = null; jsonObj.leaveApplicationDetails = TableData;
            return jsonObj;
        }

        if (chktabldta === true) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + LeaveTypeCode + " is already exist please cannnot select same leave type</strong></div>"; $('#MessageBox').show();
            document.getElementById("FromDt").value = ""; document.getElementById("ToDt").value = ""; document.getElementById("TotalDays").value = "";
            document.getElementById("Remarks").value = ""; document.getElementById("txtLeaveTypeCode").value = "CO"; chktabldta = false; return;
        }
        jQuery.support.cors = true;
        //POST Data to Validate//POST Data to Validate
        var xhr1 = new XMLHttpRequest(); xhr1.open('POST', $scope._Conpath + 'LeaveValidate/IsValid', true); xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4 && xhr1.status === 200) {
                var json = JSON.parse(xhr1.responseText); $scope.Vdata = json;
                var newarr = []; newarr[0] = $scope.Vdata;
                var dtlarr = []; dtlarr = newarr[0]["leaveApplicationDetails"]; var dtlarrleg = dtlarr.length;
                var table = document.getElementById('aliasTable'); var rowCount = table.rows.length; table.deleteRow(rowCount - 1);
                dtlarrleg = dtlarrleg - 1;
                var fdate = new Date(dtlarr[dtlarrleg]["fromDt"]); var tdate = new Date(dtlarr[dtlarrleg]["toDt"]);
                //fdate = fdate.getDate() + "/" + (fdate.getMonth() + 1) + "/" + fdate.getFullYear();     //dd/MM/yyyy
                fdate = fdate.getFullYear() + "/" + (fdate.getMonth() + 1) + "/" + fdate.getDate();     //yyyy/MM/dd
                tdate = tdate.getFullYear() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getDate();     //yyyy/MM/dd
                //var COremarks = dtlarr[dtlarrleg]["remarks"] + " " + "Holiday Date : " + fdate;
                var row = $("<tr>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + dtlarr[dtlarrleg]["leaveAppItem"] + "'>" + dtlarr[dtlarrleg]["leaveAppItem"] + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + dtlarr[dtlarrleg]["leaveTypeCode"] + "'>" + dtlarr[dtlarrleg]["leaveTypeCode"] + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasMiddleNames' value='" + fdate + "'>" + fdate + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + tdate + "'>" + tdate + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + dtlarr[dtlarrleg]["totalDays"] + "'>" + dtlarr[dtlarrleg]["totalDays"] + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + dtlarr[dtlarrleg]["remarks"] + "'>" + dtlarr[dtlarrleg]["remarks"] + "</td>" +
                    "</tr>");
                $("#aliasTable").append(row);
                document.getElementById("FromDt").value = ""; document.getElementById("ToDt").value = ""; document.getElementById("TotalDays").value = "";
                document.getElementById("Remarks").value = ""; document.getElementById("txtLeaveTypeCode").value = "CO"; document.getElementById("BtnSave").disabled = true;
            }
            else if (xhr1.status === 400 || xhr1.status === 403 || xhr1.status === 404 || xhr1.status === 408 || xhr1.status === 500) {
                if (chk === false) { var tables = document.getElementById('aliasTable'); var rowCounts = tables.rows.length; tables.deleteRow(rowCounts - 1); chk = true; c = c - 1; }
                var str = xhr1.responseText.replace("[", '').replace("]", '').toString(); var fields = str.split(',');
                var er = ""; for (var i = 0; i < fields.length ; i++) { er = er + fields[i] + "<br/>"; }
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er + "</strong></div>"; $('#MessageBox').show();
                document.getElementById("FromDt").value = ""; document.getElementById("ToDt").value = ""; document.getElementById("TotalDays").value = "";
                document.getElementById("Remarks").value = ""; document.getElementById("txtLeaveTypeCode").value = "CO";
            }
        }
        xhr1.send(TableData);
    };
    //Create New Comp Off Leave Application
    $scope.createLeave = function () {
        var d = new Date(); var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var year = d.getFullYear().toString(); var month = d.getMonth() + 1; var yearmonth = year + (month.toString());
        var jsonObj = {};
        var TableData = storeTblValues()
        TableData = JSON.stringify(TableData);
        //Get data from the Leave List Grid
        function storeTblValues() {
            var TableData = new Array();
            $('#aliasTable tr').each(function (row, tr) {
                TableData[row] = {
                    "yearMonth": yearmonth
                    , "leaveAppId": 0
                    , "compCode": $('#myCompCode').val()
                    , "wrkGrp": $('#myWrkGrp').val()
                    , "leaveAppItem": $(tr).find('td:eq(0)').text()
                    , "leaveTypeCode": $(tr).find('td:eq(1)').text()
                    , "fromDt": $(tr).find('td:eq(2)').text()
                    , "toDt": $(tr).find('td:eq(3)').text()
                    , "totalDays": $(tr).find('td:eq(4)').text()
                    , "halfdayflag": false
                    , "remarks": $(tr).find('td:eq(5)').text()
                }
            });
            TableData.shift();// first row will be empty - so remove
            if (TableData.length > 0) { for (var tdata = 0; tdata < TableData.length; tdata++) { var ltyp = TableData[tdata]["leaveTypeCode"]; if (ltyp === '') { return false; } } } else { return false; }
            jsonObj.yearMonth = yearmonth; jsonObj.leaveAppId = 0; jsonObj.empUnqId = $('#myEmpUnqId').val(); jsonObj.compCode = $('#myCompCode').val();
            jsonObj.wrkGrp = $('#myWrkGrp').val(); jsonObj.unitCode = $('#myUnitCode').val(); jsonObj.deptCode = $('#myDeptCode').val();
            jsonObj.statCode = $('#myStatCode').val(); jsonObj.catCode = $('#myCatCode').val(); jsonObj.isHOD = $('#myIsHod').val();
            jsonObj.releaseGroupCode = $('#releaseGroupCode').val(); jsonObj.releaseStrategy = ""; jsonObj.releaseStatusCode = ""; jsonObj.addDt = dt;
            jsonObj.addUser = $('#myEmpUnqId').val(); jsonObj.clientIp = $('#myIPAddress').val(); jsonObj.updDt = dt; jsonObj.updUser = null; jsonObj.remarks = null;
            jsonObj.parentId = 0; jsonObj.leaveApplicationDetails = TableData;
            return jsonObj;
        }
        jQuery.support.cors = true;
        var xhr = new XMLHttpRequest(); xhr.open('POST', $scope._Conpath + 'LeaveApplication/CreateLeaveApplication', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201) {
                //Auto Mail Sending
                var json = JSON.parse(xhr.responseText); var maildata = []; maildata = json; var relsdata = []; relsdata = maildata["applReleaseStatus"];
                var relsauth = relsdata[0]["releaseAuth"];
                var rlsmail = new XMLHttpRequest(); rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMail?releaseGroupCode=' + maildata["releaseGroupCode"] + '&id=' + maildata["leaveAppId"] + '&releaseAuth=' + relsauth, true); rlsmail.setRequestHeader("Content-type", "application/json"); rlsmail.send();
                //Auto Mail End
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Application Created Sucesfully.. </strong></div>"; $('#MessageBox').show();
                $("#aliasTable").find("tr:not(:first)").remove(); document.getElementById("FromDt").value = ""; document.getElementById("ToDt").value = "";
                document.getElementById("TotalDays").value = ""; document.getElementById("Remarks").value = ""; document.getElementById("BtnCreate").disabled = true;
                document.getElementById("txtLeaveTypeCode").value = "CO";
            }
            else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Application Not Created.. </strong></div>"; $('#MessageBox').show();
                document.getElementById("FromDt").value = ""; document.getElementById("ToDt").value = ""; document.getElementById("TotalDays").value = "";
                document.getElementById("Remarks").value = ""; document.getElementById("txtLeaveTypeCode").value = "CO";
            }
        };
        xhr.send(TableData);
    };
}]);
myApp.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });