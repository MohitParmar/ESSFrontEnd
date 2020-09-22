var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("ShiftScheduleCntroller", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(); $scope.currentPage = 1; $scope.itemsPerPage = 50; $scope.alluserlist = []; $scope.jsondata; $scope._Conpath = ""; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof _ConPath === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } } });
    $scope.jsondata; var rlsarr = [];
    $scope.GetReleaseStrategy = function () { var rls = new XMLHttpRequest(); rls.open("GET", $scope._Conpath + "ReleaseStrategy/GetReleaseStrategy?empunqid=" + $("#myEmpUnqId").val(), true); rls.setRequestHeader("Accept", "application/json"); rls.onreadystatechange = function () { if (rls.readyState === 4) { var json = JSON.parse(rls.responseText); $scope.rlsdata = json; $scope.$digest(); } }; rls.send(); };
    $scope.Download = function (mode) {
        var ssd = new XMLHttpRequest(); ssd.open("GET", $scope._Conpath + "ShiftSchedule/GetSchedule?empunqid=" + $("#myEmpUnqId").val() + "&mode=" + mode, true); ssd.setRequestHeader("Accept", "application/json"); ssd.onreadystatechange = function () {
            if (ssd.readyState === 4 && ssd.status === 200) {
                var json1 = JSON.parse(ssd.responseText); $scope.jsondata = json1; var la = new Array; la = json1; var ReportName = "";
                if (mode === "0") { ReportName = "ShiftSchedule_"; $scope.exportAllData(ReportName); }; if (mode === "1") { ReportName = "CurrentMonthAll_"; }; if (mode === "2") { ReportName = "CurrentMonthReleased_"; }; if (mode === "3") { ReportName = "PreviousMonthAll_"; }; if (mode === "4") { ReportName = "PreviousMonthReleased_"; };
                var cnt = 0; var myArray = []; for (var i = 0; i < la.length; i++) { myArray.push([]); let counter = 1; for (let key in la[i]) { myArray[cnt]["d" + ('00' + counter).slice(-2)] = la[i][key]; counter++; }; cnt++; };
                $scope.ssddata = myArray; $scope.$digest(); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Save File where you want...</strong></div>"; $("#MessageBox").show();
            } else { var json1 = JSON.parse(ssd.responseText); if (ssd.status === 400) { $scope.sslddata = json1; $scope.$digest(); $("#divDL").show(); } else if (ssd.status === 500) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>" + ssd.responseText + "</strong ></div> "; } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong> Shift Schedule for the month is already uploaded which is displayed below." + " Used Appropriate Option to change already uploaded shift schedule. " + "</strong ></div> "; }; $("#MessageBox").show(); };
        }; ssd.send();
    };
    $scope.Upload = function () {
        $("#loading").removeClass("deactivediv"); $("#loading").addClass("activediv"); var data = new FormData(); var files = $("#files").get(0).files; if (files.length > 0) { for (f = 0; f < files.length; f++) { data.append("UploadedImage", files[f]); } }
        $.ajax({
            type: "POST", url: $scope._Conpath + "ShiftSchedule/UploadSchedule?empUnqId=" + $("#myEmpUnqId").val(), contentType: false, processData: false, data: data,
            success: function (result) { $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv"); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>File Uploaded Successfully...</strong></div>"; $("#MessageBox").show(); },
            error: function (err) { $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv"); var errer = err.responseText.replace(/\"/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\[/g, "").replace(/\]/g, ""); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong> Error :~ " + errer + "<br/>" + "</strong></div>"; $("#MessageBox").show(); }
        });
    };
    $scope.GetSSList = function () {
        $("#loading").removeClass("deactivediv");
        $("#loading").addClass("activediv");
        var ssl = new XMLHttpRequest();
        ssl.open("GET", $scope._Conpath + "AppRelease/GetApplReleaseStatus?empUnqId=" + $("#myEmpUnqId").val() + "&releaseGroupCode=" + $("#releaseGroupCode").val(), true);
        ssl.setRequestHeader("Accept", "application/json");
        ssl.onreadystatechange = function () {
            if (ssl.readyState === 4) {

                $("#loading").removeClass("activediv");
                $("#loading").addClass("deactivediv");
                var json = JSON.parse(ssl.responseText);
                rlsarr = json;
                $scope.ssdata = json;
                $scope.ssdata = $filter("orderBy")($scope.ssdata, "-scheduleId");
                $scope.curPage1 = 0;
                $scope.pageSize1 = 10;
                $scope.$digest();
            }
        };
        ssl.send();
    };
    $scope.GetSchedule = function (data) {

        $("#loading").removeClass("deactivediv");
        $("#loading").addClass("activediv");
        var FromDate, ToDate;
        if (typeof data === "undefined" || typeof data.FromDt === "undefined" || typeof data.ToDt === "undefined") {
            $("#loading").removeClass("activediv");
            $("#loading").addClass("deactivediv");
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            FromDate = firstDay.getFullYear() + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate();
            ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate());
            //document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Select From Date & To Date Properly. </strong ></div> ";//$("#MessageBox").show();//return false;
        } else { FromDate = data.FromDt; ToDate = data.ToDt; };
        var GSL = new XMLHttpRequest();
        GSL.open("GET", $scope._Conpath + "ShiftSchedule/GetSchedule?fromDate=" + FromDate + "&toDate=" + ToDate, true);
        GSL.setRequestHeader("Accept", "application/json");
        GSL.onreadystatechange = function () {
            if (GSL.readyState === 4 && GSL.status === 200) {
                $("#loading").removeClass("activediv");
                $("#loading").addClass("deactivediv");
                var json = JSON.parse(GSL.responseText);
                $scope.GSLdata = json;
                $scope.GSLdata = $filter("orderBy")($scope.GSLdata, "empUnqId");
                $scope.jsondata = $scope.GSLdata;
                $scope.curPage1 = 0;
                $scope.pageSize1 = 10;
                $scope.$digest();
            }
        };
        GSL.send();
    };
    $scope.GetOpenMonth = function () {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; var mon = new XMLHttpRequest();
        mon.open('GET', $scope._Conpath + 'ShiftSchedule/GetOpenMonth', true);
        mon.setRequestHeader("Content-type", "application/json"); mon.onreadystatechange = function () {
            if (mon.readyState === 4 && mon.status === 200) {
                var msg = mon.responseText; var pretemp = (msg).slice(1, 11); var p = pretemp.split("-");
                var pdate = new Date(p[0], p[1] - 1, p[2]); var pdate1 = monthNames[pdate.getMonth()];
                document.getElementById("CurOpenMonth").innerHTML = "<div><h4>Current Open Month is : " + pdate1 + ", " + pdate.getFullYear() + "</h4></div>";
            }
        }; mon.send();
    };
    $scope.UpdateDownload = function () {
        var ssd = new XMLHttpRequest(); ssd.open("GET", $scope._Conpath + "ShiftScheduleUpdate/GetSchedule?empunqid=" + $("#myEmpUnqId").val(), true); ssd.setRequestHeader("Accept", "application/json");
        ssd.onreadystatechange = function () {
            if (ssd.readyState === 4 && ssd.status === 200) {
                var json1 = JSON.parse(ssd.responseText); $scope.jsondata = json1; $scope.ssddata = json1; $scope.$digest(); var la = new Array; la = json1; $scope.exportAllData("ShiftSchedule_");
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Save File where you want...</strong></div>"; $("#MessageBox").show();
            } else {
                var json1 = JSON.parse(ssd.responseText);
                if (ssd.status === 400) { $scope.sslddata = json1; $scope.$digest(); $("#divDL").show(); }
                else if (ssd.status === 500) {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>" + ssd.responseText + "</strong ></div> ";
                } else {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong> Shift Schedule for the month is already uploaded which is displayed below." + " Used Appropriate Option to change already uploaded shift schedule. " + "</strong ></div> ";
                }; $("#MessageBox").show();
            };
        };
        ssd.send();
    };
    $scope.UpdateUpload = function () {
        $("#loading").removeClass("deactivediv"); $("#loading").addClass("activediv"); var data = new FormData(); var files = $("#files").get(0).files;
        if (files.length > 0) { for (f = 0; f < files.length; f++) { data.append("UploadedImage", files[f]); } }
        $.ajax({
            type: "POST", url: $scope._Conpath + "ShiftScheduleUpdate/UpldateSchedule?empUnqId=" + $("#myEmpUnqId").val(), contentType: false, processData: false, data: data,
            success: function (result) {
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>File Uploaded Successfully...</strong></div>";
                $("#MessageBox").show();
            },
            error: function (err) {
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
                var errer = err.responseText.replace(/\"/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\[/g, "").replace(/\]/g, "");
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong> Error :~ " + errer + "<br/>" + "</strong></div>";
                $("#MessageBox").show();
            }
        });
    };
    $scope.UpdateSSReleaseStatus = function (releaseStatusCode, rlsssid) {
        var d = new Date();
        var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        var detailarr = [];
        for (var r = 0; r <= rlsarr.length; r++) {
            var ssid = rlsarr[r]["scheduleId"];
            if (ssid === rlsssid) {
                detailarr = rlsarr[r]["schedules"][0].applReleaseStatus;
                break;
            }
        }
        var dataarr = [];
        for (i = 0; i < detailarr.length; i++) {
            var r_auth = detailarr[i]["releaseAuth"];
            if (r_auth === $("#myEmpUnqId").val()) {
                dataarr = detailarr[i];
                break;
            }
        }
        var jsonObj = {};
        jsonObj.YearMonth = detailarr[0].yearMonth;
        jsonObj.ReleaseGroupCode = detailarr[0].releaseGroupCode;
        jsonObj.ApplicationId = rlsssid;
        jsonObj.ReleaseStrategy = detailarr[0].releaseStrategy;
        jsonObj.ReleaseStrategyLevel = detailarr[0].releaseStrategyLevel;
        jsonObj.ReleaseCode = dataarr.releaseCode;
        jsonObj.ReleaseStatusCode = detailarr[0].releaseStatusCode;
        jsonObj.ReleaseDate = strDate;
        jsonObj.ReleaseAuth = dataarr.releaseAuth;
        jsonObj.IsFinalRelease = dataarr.isFinalRelease;
        jsonObj.Remarks = "";
        jsonObj.LeaveApplications_YearMonth = null;
        jsonObj.LeaveApplications_LeaveAppId = null;
        jsonObj = JSON.stringify(jsonObj);
        var xhr2 = new XMLHttpRequest();
        xhr2.open("POST", $scope._Conpath + "AppRelease/UpdateGpStatus?empUnqId=" + $("#myEmpUnqId").val() + "&releaseStatusCode=" + releaseStatusCode + "&releaseGroupCode=" + $("#releaseGroupCode").val(), true);
        xhr2.setRequestHeader("Content-type", "application/json");
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4 && xhr2.status === 200) {
                if (releaseStatusCode === "F") {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>SS Approved Sucesfully.. </strong></div>";
                }
                if (releaseStatusCode === "R") {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>SS Rejected Sucesfully.. </strong></div>";
                }
                $("#MessageBox").show();
                $scope.GetSSList();
            } else {
                if (releaseStatusCode === "F") {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>SS Not Approved .. </strong></div>";
                }
                if (releaseStatusCode === "R") {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>SS Not Rejected .. </strong></div>";
                }
                $("#MessageBox").show();
                $scope.GetSSList();
            }
        };
        xhr2.send(jsonObj);
    };
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };
    $scope.exportAllData = function (ReportName) {
        setTimeout(function () {
            $("#loading").removeClass("deactivediv");
            $("#loading").addClass("activediv");
            var d = new Date();
            d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = ReportName + d;
            $scope.JSONToCSVConvertor($scope.jsondata, FileName, true);
            $("#loading").removeClass("activediv");
            $("#loading").addClass("deactivediv");
        }, 100);
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
        var CSV = "";
        if (ShowLabel) {
            var row = "";
            for (var index in arrData[0]) {
                row += index + ",";
            }
            row = row.slice(0, -1);
            CSV += row + "\r\n";
        }
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i]) {
                var f = arrData[i][index];
                if (f === null) {
                    f = "";
                }
                row += '"' + f + '",';
            }
            row.slice(0, row.length - 1);
            CSV += row + "\r\n";
        }
        if (CSV === "") {
            alert("Invalid data");
            return;
        }
        var fileName = ReportTitle.replace(/ /g, "_");
        var uri = "data:text/csv;charset=utf-8," + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
}); app.directive("datepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                dateFormat: "yy-mm-dd",
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    };
});