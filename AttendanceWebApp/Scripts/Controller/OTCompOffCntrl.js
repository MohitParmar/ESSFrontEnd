angular.module('myApp.Controllers').controller('OTCompOffController', ['$scope', '$http', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.alluserlist = []; $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.loc = $('#myLoc').val(); $scope.ResetView = function () { window.location.reload(true); }; jQuery.support.cors = true;
    $scope.GetRelesaseStratey = function () { var rel = new XMLHttpRequest(); rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() + '&empUnqId=' + $('#myEmpUnqId').val(), true); rel.setRequestHeader('Accept', 'application/json'); rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.$digest(); } }; rel.send(); };//Get Release Strategy
    $scope.ToValidate = function () {
        var coDate1, coDate2, coffDt;
        coDate1 = $("#coDate1").val();
        coDate2 = $("#coDate2").val();
        coffDt = $("#coffDt").val();
        var date1, date2, date3;
        if (coDate1 != "") { date1 = new Date(coDate1); };
        if (coDate2 != "") { date2 = new Date(coDate2); };
        if (coffDt != "") { date3 = new Date(coffDt); };
        if (typeof (date1) == "undefiend") {
            $("#coDate1").val("");
            $("#coffDt").val("");
            alert("Please Select date for Overtime Date 1"); return false;
        } else {
            var coffdays1 = ((date1 - date3) / (1000 * 60 * 60 * 24) * -1) + 1;
            if (coffdays1 > 91) {
                $("#coDate1").val("");
                $("#coffDt").val("");
                alert("Please Enter valid date for Overtime Date 1");
                return false;
            };
        }
        if ((typeof (date2) != "undefined") && coDate2 != "") {
            var coffdays2 = ((date2 - date3) / (1000 * 60 * 60 * 24) * -1) + 1;
            if (coffdays2 > 91) {
                $("#coDate2").val("");
                $("#coffDt").val("");
                alert("Please Enter Valid date for Overtime Date 2"); return false;
            };
        }
        if (coDate1 === coDate2) {
            alert("Please Enter Valid dates");
            $("#coDate1").val("");
            $("#coDate2").val("");
            $("#coffDt").val("");
            return false;
        }
    }; //Date Validation
    //Get Applied Comp Off Leave Requests & Validate
    $scope.LeaveRequestData = function (entity) {
        document.getElementById("BtnCreate").disabled = true;
        document.getElementById("BtnSave").disabled = true;
        $scope.ToValidate();
        var chk = false;
        if ((typeof (entity) === "undefined") ||
            (typeof (entity.coDate1) === "undefined") ||
            (typeof (entity.coffDt) === "undefined") ||
            (typeof (entity.remarks) === "undefined")) {
            alert("Please Fill All Required Details Step by Step..."); return false;
        }
        var remarks = entity.remarks;
        var coDate1 = entity.coDate1;
        var coDate2 = $("#coDate2").val();
        var coffDt = entity.coffDt;
        var halfDayFlag = false;
        if ($('#halfFlag').prop("checked") === true) { halfDayFlag = true; }
        var d = new Date();
        var year = d.getFullYear().toString();
        var month = d.getMonth() + 1;
        var yearmonth = year + (month.toString());
        var jsonObj = {};
        var TableData = storeTblValues();
        function storeTblValues() {
            $('.tempRow').remove();
            var row = $("<tr>" +
                "<td style='text-align:center;'><input type='hidden' name='coffDt' value='" + coffDt + "'>" + coffDt + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='halfDay' value='" + new Boolean(halfDayFlag) + "'>" + halfDayFlag + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='remarks' value='" + remarks + "'>" + remarks + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='coDate1' value='" + coDate1 + "'>" + coDate1 + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='coDate2' value='" + coDate2 + "'>" + coDate2 + "</td>" +
                "</tr>");
            $("#aliasTable").append(row);
            var TableData = new Array();
            $('#aliasTable tr').each(function (row, tr) {
                TableData[row] = {
                    "yearMonth": yearmonth,
                    "leaveAppId": 0,
                    "compCode": $('#myCompCode').val(),
                    "wrkGrp": $('#myWrkGrp').val(),
                    "leaveAppItem": 1,
                    "leaveTypeCode": 'OC',
                    "fromDt": $(tr).find('td:eq(0)').text(),
                    "toDt": $(tr).find('td:eq(0)').text(),
                    "totalDays": 1,
                    "halfdayflag": $(tr).find('td:eq(1)').text(),
                    "remarks": $(tr).find('td:eq(2)').text(),
                    "coMode": 'E',
                    "coDate1": $(tr).find('td:eq(3)').text(),
                    "coDate2": $(tr).find('td:eq(4)').text()
                }
            });
            TableData.shift();
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
            jsonObj.releaseStrategy = $('#myEmpUnqId').val();
            jsonObj.releaseStatusCode = "N";
            jsonObj.addDt = d;
            jsonObj.addUser = $('#myEmpUnqId').val();
            jsonObj.updDt = d;
            jsonObj.updUser = null;
            jsonObj.remarks = null;
            jsonObj.leaveApplicationDetails = TableData;
            return jsonObj;
        };
        TableData = JSON.stringify(TableData);
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

                var tdate = new Date(dtlarr[dtlarrleg]["toDt"]);
                tdate = tdate.getFullYear() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getDate();

                var codate1 = new Date(dtlarr[dtlarrleg]["coDate1"]);
                codate1 = codate1.getFullYear() + "/" + (codate1.getMonth() + 1) + "/" + codate1.getDate();
                var codate2;
                if (dtlarr[dtlarrleg]["coDate2"] != null) {
                    codate2 = new Date(dtlarr[dtlarrleg]["coDate2"]);
                    codate2 = codate2.getFullYear() + "/" + (codate2.getMonth() + 1) + "/" + codate2.getDate();
                } else { codate2 = ""; };

                var row = $("<tr>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + tdate + "'>" + tdate + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value=" + new Boolean(dtlarr[dtlarrleg]["halfDayFlag"]) + ">" + halfDayFlag + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + dtlarr[dtlarrleg]["remarks"] + "'>" + dtlarr[dtlarrleg]["remarks"] + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + codate1 + "'>" + codate1 + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + codate2 + "'>" + codate2 + "</td>" +
                    "</tr>");
                $("#aliasTable").append(row);
                document.getElementById("coDate1").value = "";
                document.getElementById("coDate2").value = "";
                document.getElementById("coffDt").value = "";
                $('#halfFlag').prop('checked', false);
                document.getElementById("remarks").value = "";
                document.getElementById("BtnCreate").disabled = false;
            }
            else if (xhr1.status === 400 || xhr1.status === 404 || xhr1.status === 500) {
                if (chk === false) {
                    var tables = document.getElementById('aliasTable');
                    var rowCounts = tables.rows.length;
                    tables.deleteRow(rowCounts - 1);
                    chk = true;
                    c = c - 1;
                };
                var str = xhr1.responseText.replace("[", '').replace("]", '').toString();
                var fields = str.split(',');
                var er = "";
                for (var i = 0; i < fields.length; i++) {
                    er = er + fields[i] + "<br/>";
                };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>" + er + "</strong></div>";
                $('#MessageBox').show();
                document.getElementById("coDate1").value = "";
                document.getElementById("coDate2").value = "";
                document.getElementById("coffDt").value = "";
                $('#halfFlag').prop('checked', false);
                document.getElementById("remarks").value = "";
                document.getElementById("BtnCreate").disabled = false;
            };
        }; xhr1.send(TableData);
    };
    //Create New Comp Off Application
    $scope.createLeave = function () {
        document.getElementById("BtnCreate").disabled = true;
        var d = new Date();
        var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var year = d.getFullYear().toString();
        var month = d.getMonth() + 1;
        var yearmonth = year + (month.toString());
        var jsonObj = {};
        var TableData = storeTblValues();
        function storeTblValues() {
            var TableData = new Array();
            $('#aliasTable tr').each(function (row, tr) {
                TableData[row] = {
                    "yearMonth": yearmonth,
                    "leaveAppId": 0,
                    "compCode": $('#myCompCode').val(),
                    "wrkGrp": $('#myWrkGrp').val(),
                    "leaveAppItem": 1,
                    "leaveTypeCode": "OC",
                    "fromDt": $(tr).find('td:eq(0)').text(),
                    "toDt": $(tr).find('td:eq(0)').text(),
                    "totalDays": 1,
                    "halfdayflag": $(tr).find('td:eq(1)').text(),
                    "remarks": $(tr).find('td:eq(2)').text(),
                    "coMode": 'E',
                    "coDate1": $(tr).find('td:eq(3)').text(),
                    "coDate2": $(tr).find('td:eq(4)').text()
                }
            });
            TableData.shift();
            if (TableData.length < 0) {
                alert("COff Item not inserted. please try again");
                return false;
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
            jsonObj.isHOD = $('#myIsHod').val();
            jsonObj.releaseGroupCode = $('#releaseGroupCode').val();
            jsonObj.releaseStrategy = "";
            jsonObj.releaseStatusCode = "";
            jsonObj.addDt = dt;
            jsonObj.addUser = $('#myEmpUnqId').val();
            jsonObj.clientIp = $('#myIPAddress').val();
            jsonObj.updDt = dt;
            jsonObj.updUser = null;
            jsonObj.remarks = 'OC_';
            jsonObj.parentId = 0;
            jsonObj.leaveApplicationDetails = TableData;
            return jsonObj;
        };
        if (TableData.leaveApplicationDetails.length > 0) {
            TableData = JSON.stringify(TableData);
        } else { alert("plase try after some time."); return false; };
        var xhr = new XMLHttpRequest();
        xhr.open('POST', $scope._Conpath + 'LeaveApplication/CreateLeaveApplication', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Compensatory off application created successfully.</strong></div>";
                $('#MessageBox').show();
                $("#aliasTable").find("tr:not(:first)").remove();
                document.getElementById("coDate1").value = "";
                document.getElementById("coDate2").value = "";
                document.getElementById("coffDt").value = "";
                $('#halfFlag').prop('checked', false);
                document.getElementById("remarks").value = "";
                document.getElementById("BtnCreate").disabled = false;
            } else if (xhr.status === 400 || xhr.status === 403 || xhr.status === 404 || xhr.status === 408 || xhr.status === 500) {
                var str = xhr.responseText.replace("[", '').replace("]", '').toString();
                var fields = str.split(',');
                var er = ""; for (var i = 0; i < fields.length; i++) {
                    er = er + fields[i] + "<br/>";
                };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Application not created.</strong></div>";
                $('#MessageBox').show();
                document.getElementById("coDate1").value = "";
                document.getElementById("coDate2").value = "";
                document.getElementById("coffDt").value = "";
                $('#halfFlag').prop('checked', false);
                document.getElementById("remarks").value = "";
            };
        }; xhr.send(TableData);
    };
}]);
myApp.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });