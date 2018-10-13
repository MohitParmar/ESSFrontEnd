angular.module('myApp.Controllers').controller('LeaveController', ['$scope', '$http', function ($scope, $http) {

    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.alluserlist = [];
    $scope._Conpath = '';
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });

    $scope.SetLTListValue = function (value) {
        //if (value === "CO") { $("#HalfFlag").attr("disabled", true); $("#HalfFlag").attr("checked", false); }
        $scope.LeaveType = value;
    };

    //Reload Page
    $scope.ResetView = function () { window.location.reload(true); };

    //Get Release Strategy
    $scope.GetRelesaseStratey = function () {
        var rel = new XMLHttpRequest();
        rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() + '&empUnqId=' + $('#myEmpUnqId').val(), true);
        rel.setRequestHeader('Accept', 'application/json');
        rel.onreadystatechange = function () {
            if (rel.readyState === 4) {
                var jsonvar1 = JSON.parse(rel.responseText);
                $scope.rlsdata = jsonvar1;
                $scope.$digest();
            }
        };
        rel.send();
    };

    //Date Validation
    $scope.ToValidate = function () {
        var chkFrom = document.getElementById('FromDt');
        var chkTo = document.getElementById('ToDt');

        var FromDate = chkFrom.value;
        var ToDate = chkTo.value;

        var date1 = new Date(FromDate);
        var date2 = new Date(ToDate);
        var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1;

        $('#TotalDays').text = diff;

        document.getElementById("TotalDays").value = diff;

        if (diff > 1) {
            $("#HalfFlag").attr("disabled", true);
            $("#HalfFlag").attr("checked", false);
        }
        else {
            $("#HalfFlag").removeAttr("disabled");
        }

        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }
        else {
            return true;
        }
    };

    var c = 0;

    //Get Applied Leave Requests
    $scope.LeaveRequestData = function (entity) {

        var chk = false;
        var chktabldta = false;

        //enable Checkbox for Half Day Leave Apply
        $("#HalfFlag").removeAttr("disabled");

        if ((typeof (entity) === "undefined") ||
            (typeof (entity.LeaveTypeCode) === "undefined") ||
            (typeof (entity.FromDt) === "undefined") ||
            (typeof (entity.ToDt) === "undefined") ||
            (typeof (entity.Remarks) === "undefined")) {
            alert("Please Fill All Required Details .. ");
            return false;
        }

        var LeaveTypeCode = entity.LeaveTypeCode;
        var HalfDayFlag = false;
        var Totaldays = 0;

        var Remarks = entity.Remarks.replace("'", "");
        var FromDate = entity.FromDt;
        var ToDate = entity.ToDt;
        var date1 = new Date(FromDate);
        var date2 = new Date(ToDate);

        //if (LeaveTypeCode === "CO") {
        //    var coffdays = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1;
        //    Totaldays = 1;
        //    $('#HalfFlag').prop('checked', false);
        //    if (coffdays > 4) {
        //        alert("Please Select Correct Date for COff Apply .. ");
        //        return false;
        //    }
        //}
        //else {

        var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1;

        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }

        if ($('#HalfFlag').prop("checked") === true) { HalfDayFlag = true; } else { HalfDayFlag = false; }

        Totaldays = $('#TotalDays').val();
        if (HalfDayFlag === true) {
            Totaldays = '0.5';
        } else {
            if (Totaldays === null ||
                Totaldays === '' ||
                Totaldays === 0) {
                Totaldays = diff;
            }
        }
        //};

        ///Get Grid Data

        var d = new Date();
        var year = d.getFullYear().toString();
        var month = d.getMonth() + 1;
        var yearmonth = year + (month.toString());

        var jsonObj = {};

        var TableData = storeTblValues()
        TableData = JSON.stringify(TableData);

        //Get DAta From the Leae Application Form & store into Array
        function storeTblValues() {
            var count = 0;
            c = c + 1;
            count++;

            $('.tempRow').remove();
            var row = $("<tr>" +
                "<td><input type='hidden' name='AliasLastNames' value='" + c + "'>" + c + "</td>" +
                "<td><input type='hidden' name='AliasFirstNames' value='" + LeaveTypeCode + "'>" + LeaveTypeCode + "</td>" +
                "<td><input type='hidden' name='AliasFirstNames' value='" + FromDate + "'>" + FromDate + "</td>" +
                "<td><input type='hidden' name='AliasMiddleNames' value='" + ToDate + "'>" + ToDate + "</td>" +
                "<td><input type='hidden' name='AliasLastNames' value='" + Totaldays + "'>" + Totaldays + "</td>" +
                "<td><input type='hidden' name='AliasLastNames' value=" + new Boolean(HalfDayFlag) + ">" + HalfDayFlag + "</td>" +
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
                    , "leaveTypeCode": $(tr).find('td:eq(1)').text()
                    , "fromDt": $(tr).find('td:eq(2)').text()
                    , "toDt": $(tr).find('td:eq(3)').text()
                    , "totalDays": $(tr).find('td:eq(4)').text()
                    , "halfdayflag": $(tr).find('td:eq(5)').text()
                    , "remarks": $(tr).find('td:eq(6)').text()
                }
            });
            TableData.shift();

            var ltyp = '';

            if (TableData.length > 1) {

                ltyp = TableData[0]["leaveTypeCode"];
                lhlf = TableData[0]["halfdayflag"];

                if (ltyp === LeaveTypeCode && lhlf === false) {
                    var tables = document.getElementById('aliasTable');
                    var rowCounts = tables.rows.length;
                    tables.deleteRow(rowCounts - 1);
                    c = c - 1;
                    chktabldta = true;
                    return;
                }
            }

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
        }

        if (chktabldta === true) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + LeaveTypeCode + " is already exist please cannnot select same leave type</strong></div>";
            $('#MessageBox').show();
            document.getElementById("FromDt").value = "";
            document.getElementById("ToDt").value = "";
            document.getElementById("TotalDays").value = "";
            document.getElementById("Remarks").value = "";
            $('#HalfFlag').prop('checked', false);
            $("#LeaveType option:first").attr("selected", true);
            chktabldta = false;
            return;
        }

        //POST Data to Validate
        jQuery.support.cors = true;

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

                var fdate = new Date(dtlarr[dtlarrleg]["fromDt"]);
                var tdate = new Date(dtlarr[dtlarrleg]["toDt"]);

                fdate = fdate.getFullYear() + "/" + (fdate.getMonth() + 1) + "/" + fdate.getDate();
                tdate = tdate.getFullYear() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getDate();

                var row = $("<tr>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + dtlarr[dtlarrleg]["leaveAppItem"] + "'>" + dtlarr[dtlarrleg]["leaveAppItem"] + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + dtlarr[dtlarrleg]["leaveTypeCode"] + "'>" + dtlarr[dtlarrleg]["leaveTypeCode"] + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasMiddleNames' value='" + fdate + "'>" + fdate + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + tdate + "'>" + tdate + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + dtlarr[dtlarrleg]["totalDays"] + "'>" + dtlarr[dtlarrleg]["totalDays"] + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value=" + new Boolean(dtlarr[dtlarrleg]["halfdayflag"]) + ">" + HalfDayFlag + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + dtlarr[dtlarrleg]["remarks"] + "'>" + dtlarr[dtlarrleg]["remarks"] + "</td>" +
                    "</tr>");
                $("#aliasTable").append(row);

                document.getElementById("FromDt").value = "";
                document.getElementById("ToDt").value = "";
                document.getElementById("TotalDays").value = "";
                document.getElementById("Remarks").value = "";
                $('#HalfFlag').prop('checked', false);
                $("#LeaveType option:first").attr("selected", true);
                if (leaveTypeCode === "CO") {
                    document.getElementById("BtnSave").disabled = true;
                }
            }
            else if (xhr1.status === 400 || xhr1.status === 403 || xhr1.status === 404 || xhr1.status === 408 || xhr1.status === 500) {
                if (chk === false) {
                    var tables = document.getElementById('aliasTable');
                    var rowCounts = tables.rows.length;
                    tables.deleteRow(rowCounts - 1);
                    chk = true;
                    c = c - 1;
                }

                var str = xhr1.responseText.replace("[", '').replace("]", '').toString();
                var fields = str.split(',');
                var er = "";
                for (var i = 0; i < fields.length ; i++) {
                    er = er + fields[i] + "<br/>";
                }

                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er + "</strong></div>";
                $('#MessageBox').show();
                document.getElementById("FromDt").value = "";
                document.getElementById("ToDt").value = "";
                document.getElementById("TotalDays").value = "";
                document.getElementById("Remarks").value = "";
                $('#HalfFlag').prop('checked', false);
                $("#LeaveType option:first").attr("selected", true);
            }
        }
        xhr1.send(TableData);
    };

    //Create New Leave Application
    $scope.createLeave = function () {

        var d = new Date();
        var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var year = d.getFullYear().toString()
        var month = d.getMonth() + 1
        var yearmonth = year + (month.toString());

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
                    , "halfdayflag": $(tr).find('td:eq(5)').text()
                    , "remarks": $(tr).find('td:eq(6)').text()
                }
            });
            TableData.shift();// first row will be empty - so remove

            if (TableData.length > 0) {
                for (var tdata = 0; tdata < TableData.length; tdata++) {
                    var ltyp = TableData[tdata]["leaveTypeCode"];
                    if (ltyp === '') {
                        return false;
                    }
                }
            }
            else { return false; }

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
            jsonObj.updDt = dt;
            jsonObj.updUser = null;
            jsonObj.remarks = null;
            jsonObj.parentId = 0;
            jsonObj.leaveApplicationDetails = TableData;
            return jsonObj;
        }

        jQuery.support.cors = true;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', $scope._Conpath + 'LeaveApplication/CreateLeaveApplication', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201) {

                //Auto Mail Sending
                var json = JSON.parse(xhr.responseText);
                var maildata = []; maildata = json;
                var relsdata = []; relsdata = maildata["applReleaseStatus"];
                var relsauth = relsdata[0]["releaseAuth"];
                var rlsmail = new XMLHttpRequest();
                rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMail?releaseGroupCode=' + maildata["releaseGroupCode"] + '&id=' + maildata["leaveAppId"] + '&releaseAuth=' +
                    relsauth, true);
                rlsmail.setRequestHeader("Content-type", "application/json");
                rlsmail.send();
                //Auto Mail End

                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Application Created Sucesfully.. </strong></div>";
                $('#MessageBox').show();
                $("#aliasTable").find("tr:not(:first)").remove();
                document.getElementById("FromDt").value = "";
                document.getElementById("ToDt").value = "";
                document.getElementById("TotalDays").value = "";
                document.getElementById("Remarks").value = "";
                document.getElementById("BtnCreate").disabled = true;
                $('#HalfFlag').prop('checked', false);
                $("#LeaveType option:first").attr("selected", true);
            }
            else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Application Not Created.. </strong></div>";
                $('#MessageBox').show();
                document.getElementById("FromDt").value = "";
                document.getElementById("ToDt").value = "";
                document.getElementById("TotalDays").value = "";
                document.getElementById("Remarks").value = "";
                $('#HalfFlag').prop('checked', false);
                $("#LeaveType option:first").attr("selected", true);
            }
        };
        xhr.send(TableData);
    };

    /*refresh table*/
    $scope.RefreshTable = function () { $scope.tableParams.reload(); };
}]);

//Get Leave Types
angular.module('myApp.Controllers').controller('SelectLTypeCntrl', ['$scope', '$http', function ($scope, $http) {
    $scope.GetLTypeList = function () {
        $http({
            method: 'Get',
            contentType: "application/json",
            url: '/Api/LeaveAppData/GetLeaveTypeList'
        }).success(function (data, status, headers, config) {
            $scope.LList = data;
        }).error(function (data, status, headers, config) {
            $scope.message = 'Unexpected Error';
        });
    };
}]);

//Date Picker
myApp.directive("datepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); };
            var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } };
            elem.datepicker(options);
        }
    }
});