﻿var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('PostedByHRReportController', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1; $scope.itemsPerPage = 25;
    $scope.alluserlist = [];

    $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });

    $scope.InfoPL;

    //Check Validation From Date & To Date Range
    $scope.ToValidate = function () {
        var chkFrom = document.getElementById('FromDt'); var chkTo = document.getElementById('ToDt');
        var FromDate = chkFrom.value; var ToDate = chkTo.value;
        var date1 = new Date(FromDate); var date2 = new Date(ToDate);
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; } else { return true; }
    }

    //Get Leave Enteries From Posted By HR User
    $scope.GetPostedByReport = function (puser) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var FromDate, ToDate;
        if ((typeof (puser) === "undefined") || (typeof (puser.FromDt) === "undefined") || (typeof (puser.ToDt) === "undefined")) {
            var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate();
            ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate());
        } else { FromDate = puser.FromDt; ToDate = puser.ToDt; }
        var date1 = new Date(FromDate); var date2 = new Date(ToDate);
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; }
        var pbyr = new XMLHttpRequest();
        pbyr.open('GET', $scope._Conpath + 'LeavePosting/GetLeaves?fromDt=' + FromDate + '&toDt=' + ToDate + '&postingFlg=F', true);
        pbyr.setRequestHeader('Accept', 'application/json');
        pbyr.onreadystatechange = function () {
            if (pbyr.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                $scope.InfoPL = pbyr.responseText;
                var json = JSON.parse(pbyr.responseText);
                $scope.pbydata = json; $scope.pbydata = $filter('orderBy')($scope.pbydata, '-leaveAppId');
                $scope.curPage = 0; $scope.pageSize = 25; $scope.$digest();
            }
        };
        pbyr.send();
    };

    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };

    $scope.exportAllData = function () {
        setTimeout(function () {
            $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
            var d = new Date(); d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = "Posted_By_Report_" + d;
            $scope.JSONToCSVConvertor($scope.InfoPL, FileName, true);
            $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
        }, 100);
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = ''; CSV += ReportTitle + '\r\n\n'; //Set Report title in first row or line
        if (ShowLabel) { var row = ""; for (var index in arrData[0]) { row += index + ','; } row = row.slice(0, -1); CSV += row + '\r\n'; }
        for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; } row.slice(0, row.length - 1); CSV += row + '\r\n'; }
        if (CSV === '') { alert("Invalid data"); return; }
        var fileName = "MyReport_"; fileName += ReportTitle.replace(/ /g, "_");
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a"); link.href = uri; link.style = "visibility:hidden"; link.download = fileName + ".csv"; document.body.appendChild(link); link.click();
        document.body.removeChild(link);
    }
});

//Date Picker
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });