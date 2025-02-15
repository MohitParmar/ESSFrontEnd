﻿var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('LeavePerformanceReportController', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 25; $scope.alluserlist = [];
    var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; var url_port = url.port;
    $scope._Conpath = ''; var loc = $("#myLoc").val();
    $(document).ready(function () {
        if (typeof (_ConPath) === "undefined") { return; } else {
            if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else {
                $scope._Conpath = urlprotocol + "//" + urlhost + "/api/";
            }
        };
    });
    $scope.lPerRpt; var tmparr1;
    $scope.ToValidate = function () { var chkFrom = document.getElementById('FromDt'); var chkTo = document.getElementById('ToDt'); var FromDate = chkFrom.value; var ToDate = chkTo.value; var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; } else { return true; }; };
    $scope.GetLeavePerformanceReport = function (dt) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var FromDate = dt.FromDt; var ToDate = dt.ToDt; var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; } var Perf = new XMLHttpRequest(); Perf.open('GET', $scope._Conpath + 'LeaveReport/GetLeaves?fromDt=' + FromDate + '&toDt=' + ToDate, true); Perf.setRequestHeader('Accept', 'application/json'); Perf.onreadystatechange = function () {
            if (Perf.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); var json = JSON.parse(Perf.responseText); $scope.perfdata = json; $scope.lPerRpt = json; var test = $scope.perfdata; var srtcv = test[0]; var arr = [];
                //Get Columns Names using key & Store in Array arr[]
                for (var key in srtcv) { var s = key; arr.push(key); };   //Replace Column Name
                var tmparr1 = new Array(arr); $scope.headers = arr; var tmparr = new Array(arr.length); for (var i = 0; i < arr.length; i++) { tmparr[i] = new Array(test.length); }; for (var i = 0; i < test.length; i++) { for (var j = 0; j < arr.length; j++) { var colname = arr[j]; var test0 = test[i][colname]; tmparr[j][i] = test0; }; }; var transposedArray = transpose(tmparr); $scope.dta = transposedArray; $scope.lPerRpt = tmparr1.concat(transposedArray); $scope.curPage = 0; $scope.pageSize = 25; $scope.$digest();
            };
        }; Perf.send();
    };
    //Conversion from Row to Columns For Array
    function transpose(arr) { return Object.keys(arr[0]).map(function (c) { return arr.map(function (r) { return r[c]; }) }) };
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; }; $scope.exportAllData = function () { setTimeout(function () { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var d = new Date(); d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = "Leave_Performance_List_" + d; $scope.JSONToCSVConvertor($scope.lPerRpt, FileName, true); $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); }, 100); }; $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData; var CSV = ''; CSV += ReportTitle + '\r\n\n'; if (ShowLabel) { var row = ""; for (var index in arrData[0]) { row += ','; } row = row.slice(0, -1); CSV += row + '\r\n'; } for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; } row.slice(0, row.length - 1); CSV += row + '\r\n'; } if (CSV === '') { alert("Invalid data"); return; } var fileName = "MyReport_"; fileName += ReportTitle.replace(/ /g, "_"); var uri = 'data:text/csv;charset=utf-8,' + escape(CSV); var link = document.createElement("a"); link.href = uri; link.style = "visibility:hidden"; link.download = fileName + ".csv"; document.body.appendChild(link); link.click(); document.body.removeChild(link); };
}); app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });
