﻿var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('OpenMonthController', function ($scope, $http) {

    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1; $scope.itemsPerPage = 10;
    $scope.alluserlist = [];
    $scope._Conpath = ''; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });

    jQuery.support.cors = true;

    //Change Open Month
    $scope.ChangeOpenMonth = function (openMonth) {
        var opmnth = openMonth.yearMonth; var d = new Date(opmnth); var yearmonth; if (d.getMonth() + 1 < '10') { yearmonth = (d.getFullYear()) + '0' + (d.getMonth() + 1); } else { yearmonth = (d.getFullYear().toString()) + (d.getMonth() + 1); }
        var opm = new XMLHttpRequest();
        opm.open('POST', $scope._Conpath + 'OpenMonth/ChangeOpenMonth?yearMonth=' + yearmonth, true);
        opm.setRequestHeader("Content-type", "application/json");
        opm.onreadystatechange = function () {
            if (opm.readyState === 4 && opm.status === 200) {
                $scope.GetOpenMonth();
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Open Month Changed Successfully.. </strong></div>"; $('#MessageBox').show();
                document.getElementById("openMonth").value = "";
            } else if (opm.status === 400) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Open Month not Changed.. </strong></div>"; $('#MessageBox').show();
                document.getElementById("openMonth").value = "";
            }
        };
        opm.send();
    };

    //Get Current Open Month Details
    $scope.GetOpenMonth = function () {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var mon = new XMLHttpRequest();
        mon.open('GET', $scope._Conpath + 'OpenMonth/GetOpenMonth', true);
        mon.setRequestHeader("Content-type", "application/json");
        mon.onreadystatechange = function () {
            if (mon.readyState === 4 && mon.status === 200) {
                var msg = mon.responseText; var pretemp = (msg).slice(1, 11); var p = pretemp.split("-"); var pdate = new Date(p[0], p[1] - 1, p[2]); var pdate1 = monthNames[pdate.getMonth()];
                document.getElementById("CurOpenMonth").innerHTML = "<div><h3>Currnet Open Month is : " + pdate1 + ", " + pdate.getFullYear() + "</h3></div>";
            }
        };
        mon.send();
    };

    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
});

//Date Picker
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });