var app = angular.module('myApp', ['angularUtils.directives.dirPagination']); app.controller('ShiftScheduleCntroller', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 50; $scope.alluserlist = []; $scope.jsondata; $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.jsondata; var rlsarr = [];
    $scope.GetReleaseStrategy = function () { var rls = new XMLHttpRequest(); rls.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?empunqid=' + $('#myEmpUnqId').val(), true); rls.setRequestHeader('Accept', 'application/json'); rls.onreadystatechange = function () { if (rls.readyState === 4) { var json = JSON.parse(rls.responseText); $scope.rlsdata = json; $scope.$digest(); }; }; rls.send(); };
    $scope.Download = function (mode) {
        var ssd = new XMLHttpRequest(); ssd.open('GET', $scope._Conpath + 'ShiftSchedule/GetSchedule?empunqid=' + $('#myEmpUnqId').val() + '&mode=' + mode, true);
        ssd.setRequestHeader('Accept', 'application/json'); ssd.onreadystatechange = function () {
            if (ssd.readyState === 4 && ssd.status === 200) {
                var json1 = JSON.parse(ssd.responseText); $scope.ssddata = json1; $scope.jsondata = $scope.ssddata; $scope.$digest(); var ReportName = '';
                if (mode === '0') { ReportName = "ShiftSchedule_"; }; if (mode === '1') { ReportName = "CurrentMonthAll_"; };
                if (mode === '2') { ReportName = "CurrentMonthReleased_"; }; if (mode === '3') { ReportName = "PreviousMonthAll_"; };
                if (mode === '4') { ReportName = "PreviousMonthReleased_"; };
                $scope.exportAllData(ReportName);
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>File Downlaoded Successfully...</strong></div>"; $('#MessageBox').show();
            } else { var json1 = JSON.parse(ssd.responseText); if (ssd.status === 400) { $scope.sslddata = json1; $scope.$digest(); }; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> Shift Schedule for the month is already uploaded which is displayed below. <br/>Used Appropriate Option to change already uploaded shift schedule. </strong ></div > "; $('#MessageBox').show(); };
        }; ssd.send();
    };
    $scope.Upload = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var data = new FormData(); var files = $("#files").get(0).files; if (files.length > 0) { for (f = 0; f < files.length; f++) { data.append("UploadedImage", files[f]); }; };        // Add the uploaded file to the form data collection
        $.ajax({
            type: "POST", url: $scope._Conpath + 'ShiftSchedule/UploadSchedule?empUnqId=' + $('#myEmpUnqId').val(), contentType: false, processData: false, data: data,
            success: function (result) { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>File Uploaded Successfully...</strong></div>"; $('#MessageBox').show(); },
            error: function (err) { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Files not uploaded Successfully Please Retry...</strong></div>"; $('#MessageBox').show(); }
        });
    };
    $scope.GetSSList = function () { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var ssl = new XMLHttpRequest(); ssl.open('GET', $scope._Conpath + 'AppRelease/GetApplReleaseStatus?empUnqId=' + $('#myEmpUnqId').val() + '&releaseGroupCode=' + $('#releaseGroupCode').val(), true); ssl.setRequestHeader('Accept', 'application/json'); ssl.onreadystatechange = function () { if (ssl.readyState === 4) { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); var json = JSON.parse(ssl.responseText); rlsarr = json; $scope.ssdata = json; $scope.ssdata = $filter('orderBy')($scope.ssdata, '-scheduleId'); $scope.curPage1 = 0; $scope.pageSize1 = 10; $scope.$digest(); }; }; ssl.send(); };
    $scope.GetSchedule = function (data) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var FromDate, ToDate;
        if ((typeof (data) === "undefined") || (typeof (data.FromDt) === "undefined") || (typeof (data.ToDt) === "undefined")) {
            $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Select From Date & To Date Properly. </strong ></div> "; $('#MessageBox').show();
            return false;
            //var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth(), 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            //FromDate = (firstDay.getFullYear()) + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate();
            //ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate());
        } else { FromDate = data.FromDt; ToDate = data.ToDt; };
        var GSL = new XMLHttpRequest(); GSL.open('GET', $scope._Conpath + 'ShiftSchedule/GetSchedule?fromDate=' + FromDate + '&toDate=' + ToDate, true);
        GSL.setRequestHeader('Accept', 'application/json'); GSL.onreadystatechange = function () {
            if (GSL.readyState === 4 && GSL.status === 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); var json = JSON.parse(GSL.responseText); $scope.GSLdata = json;
                $scope.GSLdata = $filter('orderBy')($scope.GSLdata, 'empUnqId'); $scope.jsondata = $scope.GSLdata; $scope.curPage1 = 0; $scope.pageSize1 = 10;
                $scope.$digest();
            };
        }; GSL.send();
    };
    $scope.UpdateSSReleaseStatus = function (releaseStatusCode, rlsssid) {
        var d = new Date(); var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var detailarr = []; for (var r = 0; r <= rlsarr.length; r++) { var ssid = rlsarr[r]["scheduleId"]; if (ssid === rlsssid) { detailarr = rlsarr[r]["schedules"][0].applReleaseStatus; break; }; };
        //Get ReleaseCode of Releaser
        var dataarr = []; for (i = 0; i < detailarr.length; i++) { var r_auth = detailarr[i]["releaseAuth"]; if (r_auth === $('#myEmpUnqId').val()) { dataarr = detailarr[i]; break; }; };
        var jsonObj = {}; jsonObj.YearMonth = detailarr[0].yearMonth; jsonObj.ReleaseGroupCode = detailarr[0].releaseGroupCode; jsonObj.ApplicationId = rlsssid; jsonObj.ReleaseStrategy = detailarr[0].releaseStrategy; jsonObj.ReleaseStrategyLevel = detailarr[0].releaseStrategyLevel; jsonObj.ReleaseCode = dataarr.releaseCode; jsonObj.ReleaseStatusCode = detailarr[0].releaseStatusCode; jsonObj.ReleaseDate = strDate; jsonObj.ReleaseAuth = dataarr.releaseAuth; jsonObj.IsFinalRelease = dataarr.isFinalRelease; jsonObj.Remarks = ""; jsonObj.LeaveApplications_YearMonth = null; jsonObj.LeaveApplications_LeaveAppId = null; jsonObj = JSON.stringify(jsonObj);
        var xhr2 = new XMLHttpRequest(); xhr2.open('POST', $scope._Conpath + 'AppRelease/UpdateGpStatus?empUnqId=' + $('#myEmpUnqId').val() + '&releaseStatusCode=' + releaseStatusCode + '&releaseGroupCode=' + $('#releaseGroupCode').val(), true); xhr2.setRequestHeader("Content-type", "application/json"); xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4 && xhr2.status === 200) {
                if (releaseStatusCode === 'F') { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>SS Approved Sucesfully.. </strong></div>"; };
                if (releaseStatusCode === 'R') { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>SS Rejected Sucesfully.. </strong></div>"; };
                $('#MessageBox').show(); $scope.GetSSList();
            } else {
                if (releaseStatusCode === 'F') { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>SS Not Approved .. </strong></div>"; };
                if (releaseStatusCode === 'R') { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>SS Not Rejected .. </strong></div>"; };
                $('#MessageBox').show(); $scope.GetSSList();
            };
        }; xhr2.send(jsonObj);
    };  //Update Shift Schedule With Approve / Reject
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
    $scope.exportAllData = function (ReportName) { setTimeout(function () { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var d = new Date(); d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = ReportName + d; $scope.JSONToCSVConvertor($scope.jsondata, FileName, true); $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); }, 100); };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData; var CSV = '';
        //CSV += ReportTitle + '\r\n\n';
        if (ShowLabel) { var row = ""; for (var index in arrData[0]) { row += index + ','; } row = row.slice(0, -1); CSV += row + '\r\n'; };
        for (var i = 0; i < arrData.length; i++) {
            var row = ""; for (var index in arrData[i]) { var f = arrData[i][index]; if (f === null) { f = ''; }; row += '"' + f + '",'; };
            row.slice(0, row.length - 1); CSV += row + '\r\n';
        }; if (CSV === '') { alert("Invalid data"); return; }; var fileName = ReportTitle.replace(/ /g, "_");
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV); var link = document.createElement("a"); link.href = uri; link.style = "visibility:hidden";
        link.download = fileName + ".csv"; document.body.appendChild(link); link.click(); document.body.removeChild(link);
    };
}); app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });