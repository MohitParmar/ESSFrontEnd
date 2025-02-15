﻿var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("EmpServayCntrloller", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(); $scope.currentPage = 1; $scope.itemsPerPage = 10;
    $scope._Conpath = ''; $scope._AttdConPath = "";
    var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; var url_port = url.port;
    var loc = $("#myLoc").val();
    //$(document).ready(function () {
    //    "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/")
    //});
    $(document).ready(function () {
        "undefined" != typeof _ConPath &&
            (urlhost === _URLHostName ?
                $scope._Conpath = _ConPath :
                $scope._Conpath = urlprotocol + "//" + urlhost + "/api/",
                "undefined" != typeof _AttdConPath &&
                (urlhost === _URLHostName ?
                    $scope._AttdConPath = _AttdConPath :
                    $scope._AttdConPath = urlprotocol + "//" + urlhost + "/api/")
            )
    });
    $scope.ResetView = function () { window.location.reload(!0) }; jQuery.support.cors = true;
    $scope.GetAllSurvey = function () {
        var sur = new XMLHttpRequest;
        sur.open("GET", $scope._AttdConPath + "Survey/GetAllSurvey?EmpUnqID=", !0);
        sur.setRequestHeader("Accept", "application/json");
        sur.onreadystatechange = function () {
            if (4 === sur.readyState) {
                var json1 = JSON.parse(sur.responseText); $scope.surdata = json1; $scope.$digest();
            }
            else if (200 !== sur.status) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>";
                $("#MessageBox").show();
            };
        };
        sur.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    $scope.exportAllData = function (name) {
        setTimeout(function () {
            $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
            var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = name + d;
            $scope.JSONToCSVConvertor($scope.exportObj, FileName, !0);
            $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
        }, 100);
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) {
            var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n"
        } if ("" === CSV) return void alert("Invalid data"); var fileName = ""; fileName += ReportTitle.replace(/ /g, "_"); var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link)
    };
});