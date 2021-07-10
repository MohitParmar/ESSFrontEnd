var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("MissPunchController", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val();
    $scope.currentPage = 1; $scope.itemsPerPage = 10;
    $scope._Conpath = ""; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") });
    $scope.ResetView = function () { window.location.reload(!0) };
    jQuery.support.cors = true; var d = new Date(); var rlsarr = [];
    $scope.GetReleaseStrategy = function () {
        var rel = new XMLHttpRequest();
        rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() + '&empUnqId=' + $('#myEmpUnqId').val(), true);
        rel.setRequestHeader('Accept', 'application/json');
        rel.onreadystatechange = function () {
            if (rel.readyState === 4) {
                var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.$digest();
            }
        }; rel.send();
    };
    $scope.GetEmpInfo = function () {
        $("#tbl_empdtl").show();
        var e_Code = $("#eCode").val();
        if ("" === e_Code) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Employee Code First.. </strong></div>";
            $("#MessageBox").show();
            return false;
        };
        var emp = new XMLHttpRequest;
        emp.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + $("#eCode").val(), !0);
        emp.setRequestHeader("Accept", "application/json");
        emp.onreadystatechange = function () {
            if (4 === emp.readyState) {
                var json1 = JSON.parse(emp.responseText);
                $scope.empdata = json1;
                $scope.$digest();
            } else if (200 !== emp.status) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>";
                $("#MessageBox").show();
            };
        }; emp.send();
    };
    $scope.CreateMissPunch = function (entity, hrflg) {
        if (hrflg && (typeof (entity.IO) === "undefined")) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Select Punch Type.</strong></div>";
            $('#MessageBox').show();
            return false;
        };
        if ((typeof (entity) === "undefined") ||
            (typeof (entity.Reason) === "undefined")) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Fill All Details.</strong></div>";
            $('#MessageBox').show();
            return false;
        };
        var now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes(); var e_Code = $("#eCode").val();
        var IO = ""; if ((typeof (entity.IO) !== "undefined")) { IO = entity.IO; } else { IO = ""; };
        jsonObj = {}; jsonObj.Id = 0; jsonObj.AddDate = now; jsonObj.EmpUnqId = e_Code; jsonObj.Reason = entity.Reason; jsonObj.Remarks = entity.Remarks;
        jsonObj.ReleaseStrategy = e_Code; jsonObj.ReleaseStatusCode = "N";
        if (IO !== "") {
            if (IO === "I") { jsonObj.InTime = now; jsonObj.InTimeUser = $("#myEmpUnqId").val(); jsonObj.OutTime = null; jsonObj.OutTimeUser = null; }
            else if (IO === "O") { jsonObj.InTime = null; jsonObj.InTimeUser = null; jsonObj.OutTime = now; jsonObj.OutTimeUser = $("#myEmpUnqId").val(); }
        } else { jsonObj.InTime = now; jsonObj.InTimeUser = $("#myEmpUnqId").val(); jsonObj.OutTime = null; jsonObj.OutTimeUser = null; };
        jsonObj.PostingFlag = false; jsonObj.MissedPunchReleaseStatus = null; jsonObj = JSON.stringify(jsonObj);
        var xhr = new XMLHttpRequest(); xhr.open('POST', $scope._Conpath + 'MissedPunch/CreateMissedPunch', true); xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("txtRemarks").value = ""; document.getElementById("eCode").value = "";
                $("#tbl_empdtl").find("tr:not(:first)").remove(); $("#cmbReason option:first").attr("selected", true);
                if (IO !== "") { $("#cmbIOflag option:first").attr("selected", true); };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Miss Punch Application Created.. </strong></div>";
                $('#MessageBox').show();
            } else {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Miss Punch Application Not Created.. </strong></div>";
                $('#MessageBox').show();
            };
        }; xhr.send(jsonObj);
    };
    $scope.GetPendingRelease = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var mpr = new XMLHttpRequest; mpr.open("GET", $scope._Conpath + "MissedPunch/GetApplReleaseStatus?empUnqId=" + $("#myEmpUnqId").val(), true);
        mpr.setRequestHeader("Accept", "application/json");
        mpr.onreadystatechange = function () {
            if (mpr.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                debugger;
                var json = JSON.parse(mpr.responseText); rlsarr = json; $scope.msData = json;
                for (var i = 0; i < $scope.msData.length; i++) {
                    var emp = $scope.msData[i].employee.empName;
                    $scope.msData[i]["empName"] = emp;
                }
                $scope.$digest();
            };
        }; mpr.send();
    };
    $scope.ReleaseMissPunch = function (releaseStatusCode, appId, data) {
        var now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var rmks = '';
        if (releaseStatusCode === "R") {
            if ((typeof (data) === "undefined") || (typeof (data.Remarks) === "undefined")) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Please Enter Remarks First For Rejection</strong></div>";
                $('#MessageBox').show();
                return false;
            } else { rmks = data.Remarks; };
        } else { if ((typeof (data) === "undefined")) { rmks = ""; } else { rmks = data.Remarks; }; };
        // Get Releaser Details From AppReleaseStatus Table
        var detailarr = []; for (var r = 0; r <= rlsarr.length; r++) { var id = rlsarr[r]["id"]; if (id == appId) { detailarr = rlsarr[r]["missedPunchReleaseStatus"]; break; }; };
        //Get ReleaseCode of Releaser
        var dataarr = []; for (i = 0; i < detailarr.length; i++) { var release_auth = detailarr[i]["releaseAuth"]; if (release_auth === $('#myEmpUnqId').val()) { dataarr = detailarr[i]; break; }; };
        var jsonObj = {}; jsonObj.ApplicationId = appId; jsonObj.ReleaseStrategy = dataarr.releaseStrategy; jsonObj.ReleaseStrategyLevel = dataarr.releaseStrategyLevel;
        jsonObj.ReleaseCode = dataarr.releaseCode; jsonObj.ReleaseStatusCode = dataarr.releaseStatusCode; jsonObj.ReleaseDate = now; jsonObj.ReleaseAuth = dataarr.releaseAuth;
        jsonObj.IsFinalRelease = dataarr.isFinalRelease; jsonObj.Remarks = rmks; jsonObj = JSON.stringify(jsonObj);
        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST', $scope._Conpath + 'MissedPunch/AppRelease?empUnqId=' + $('#myEmpUnqId').val() + '&releaseStatusCode=' + releaseStatusCode, true);
        xhr2.setRequestHeader("Content-type", "application/json");
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4) {
                if (releaseStatusCode === 'F') {
                    document.getElementById("txtRemarks").value = "";
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Application Approved..</strong></div>";
                };
                if (releaseStatusCode === 'R') {
                    document.getElementById("txtRemarks").value = "";
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Application Rejected..</strong></div>";
                };
                $('#MessageBox').show();
                $scope.GetPendingRelease();
            } else {
                if (releaseStatusCode === 'F') {
                    document.getElementById("txtRemarks").value = "";
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Application Not Approved .. </strong></div>";
                };
                if (releaseStatusCode === 'R') {
                    document.getElementById("txtRemarks").value = "";
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Application Not Rejected .. </strong></div>";
                };
                $('#MessageBox').show();
            };
        }; xhr2.send(jsonObj);
    };
    $scope.GetMissedPunch = function (data) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var FromDate, ToDate;
        if ("undefined" == typeof data || "undefined" == typeof data.FromDt || "undefined" == typeof data.ToDt) {
            var date = new Date;
            firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate();
            ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { FromDate = data.FromDt, ToDate = data.ToDt; };
        var date1 = new Date(FromDate), date2 = new Date(ToDate);
        if (date1 > date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Valid Date Range.. </strong></div>",
                $("#MessageBox").show();
            return false;
        };
        var xhr4 = new XMLHttpRequest();
        xhr4.open('GET', $scope._Conpath + 'MissedPunch/GetMissedPunch?fromDt=' + FromDate + '&toDt=' + ToDate + '&isPostedOnly=false', true);
        xhr4.setRequestHeader("Content-type", "application/json");
        xhr4.onreadystatechange = function () {
            if (xhr4.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(xhr4.responseText);
                $scope.mpaData = json;
                for (var i = 0; i < $scope.mpaData.length; i++) {
                    var emp = $scope.mpaData[i].employee.empName;
                    $scope.mpaData[i]["empName"] = emp;
                };
                $scope.$digest();
            };
        }; xhr4.send();
    };
    $scope.GetEmployeeMissedPunch = function (data) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var FromDate, ToDate;
        if ("undefined" == typeof data || "undefined" == typeof data.FromDt || "undefined" == typeof data.ToDt) {
            var date = new Date;
            firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate();
            ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { FromDate = data.FromDt, ToDate = data.ToDt; };
        var date1 = new Date(FromDate), date2 = new Date(ToDate);
        if (date1 > date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Valid Date Range.. </strong></div>",
                $("#MessageBox").show();
            return false;
        };
        var xhr5 = new XMLHttpRequest();
        xhr5.open('GET', $scope._Conpath + 'MissedPunch/GetMissedPunch?fromDt=' + FromDate + '&toDt=' + ToDate + '&isPostedOnly=false&empUnqId=' + $('#myEmpUnqId').val(), true);
        xhr5.setRequestHeader("Content-type", "application/json");
        xhr5.onreadystatechange = function () {
            if (xhr5.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(xhr5.responseText);
                $scope.emrData = json;
                $scope.$digest();
            }
        }; xhr5.send();
    };
    $scope.MissPunchInfo = function () {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        debugger;
        var prev = new Date(); var FromDate = new Date(prev); FromDate.setDate(prev.getDate() - 1);
        var dd = FromDate.getDate(); var mm = FromDate.getMonth() + 1; var yyyy = FromDate.getFullYear();
        if (dd < 10) { dd = '0' + dd; } if (mm < 10) { mm = '0' + mm; };
        FromDate = yyyy + '/' + mm + '/' + dd;
        var today = new Date(); var ToDate = new Date(today); ToDate.setDate(today.getDate());
        var dd2 = ToDate.getDate(); var mm2 = ToDate.getMonth() + 1; var yyyy2 = ToDate.getFullYear(); var h = ToDate.getHours(); var m = ToDate.getMinutes(); var s = ToDate.getSeconds();
        if (dd2 < 10) { dd2 = '0' + dd2; } if (mm2 < 10) { mm2 = '0' + mm2; };
        ToDate = yyyy2 + '/' + mm2 + '/' + dd2 + ' ' + h + ':' + m + ':' + s;
        var xhr6 = new XMLHttpRequest();
        xhr6.open('GET', $scope._Conpath + 'MissedPunch/GetMissedPunch?fromDt=' + FromDate + '&toDt=' + ToDate + '&isPostedOnly=false', true);
        xhr6.setRequestHeader("Content-type", "application/json");
        xhr6.onreadystatechange = function () {
            if (xhr6.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(xhr6.responseText);
                var dtl = new Array; dtl = json; var inArray = [];
                var count = 0;
                for (var i = 0; i < dtl.length; i++) {
                    var outTime = dtl[i].outTime;
                    var status = dtl[i].releaseStatusCode;
                    if (outTime == null && status !== "R") {
                        inArray.push([]);
                        inArray[count]["Id"] = dtl[i].id;
                        inArray[count]["EmpUnqId"] = dtl[i].empUnqId;
                        inArray[count]["EmpName"] = dtl[i].employee.empName;
                        inArray[count]["Reason"] = dtl[i].reason;
                        inArray[count]["Remarks"] = dtl[i].remarks;
                        inArray[count]["InTime"] = dtl[i].inTime;
                        count++;
                    }
                };
                $scope.inData = inArray;
                $scope.$digest();
            }
        }; xhr6.send();
    }
    $scope.MissPunchOut = function (id, io) {
        var out = new XMLHttpRequest();
        out.open('PUT', $scope._Conpath + 'MissedPunch/UpdateTime?id=' + id + "&inOut=" + io + "&empUnqId=" + $('#myEmpUnqId').val(), true);
        out.setRequestHeader("Content-type", "application/json");
        out.onreadystatechange = function () {
            if (out.readyState === 4 && out.status === 200) {
                alert("Out Successfully..");
                $scope.MissPunchInfo();
            };
        }; out.send();
    }
    $scope.MissedPunchReportReleaser = function (data) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var FromDate, ToDate;
        if ("undefined" == typeof data || "undefined" == typeof data.FromDt || "undefined" == typeof data.ToDt) {
            var date = new Date;
            firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate();
            ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { FromDate = data.FromDt, ToDate = data.ToDt; };
        var date1 = new Date(FromDate), date2 = new Date(ToDate);
        if (date1 > date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Valid Date Range.. </strong></div>",
                $("#MessageBox").show();
            return false;
        };
        var rpt = new XMLHttpRequest();
        rpt.open('GET', $scope._Conpath + 'MissedPunch/GetMissedPunchReleaser?fromDt=' + FromDate + '&toDt=' + ToDate + '&empUnqId=' + $("#myEmpUnqId").val(), true);
        rpt.setRequestHeader("Content-type", "application/json");
        rpt.onreadystatechange = function () {
            if (rpt.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                debugger;
                var json = JSON.parse(rpt.responseText);
                $scope.rptData = json;
                for (var i = 0; i < $scope.rptData.length; i++) {
                    var emp = $scope.rptData[i].employee.empName;
                    $scope.rptData[i]["empName"] = emp;
                };
                $scope.$digest();
            };
        }; rpt.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });