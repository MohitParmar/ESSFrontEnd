﻿var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('MediclaimCntroller', function ($scope, $http, $filter) {

    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.alluserlist = [];
    $scope._Conpath = '';
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });

    //Reload Page
    $scope.ResetView = function () { window.location.reload(true); };

    //Enable Jquery Support FOR XML HTTP Request Objet to execute Cross Domain Object
    jQuery.support.cors = true;

    // Age Calculate
    $scope._calculateAge = function () {
        var birthday = document.getElementById('dtDOB').value;
        var d = new Date();
        var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var date1 = new Date(birthday);
        var date2 = new Date(today);
        var yearCount = diff_years(date1, date2);
        $('#txtAge').val(yearCount);
        function diff_years(dt2, dt1) {
            var diff = (dt2.getTime() - dt1.getTime()) / 1000;
            diff /= (60 * 60 * 24);
            return Math.abs(Math.round(diff / 365.25));
        }
    }

    //Using For DIR Pagintaiton Sorting
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };

    //Get Employee details from employee code (Method Use for Reset Password)
    $scope.GetEmpInfo = function () {
        var emp = new XMLHttpRequest();
        emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + $('#myEmpUnqId').val(), true);
        emp.setRequestHeader('Accept', 'application/json');
        emp.onreadystatechange = function () {
            if (emp.readyState === 4) {
                var json = JSON.parse(emp.responseText);
                $scope.empdata = json;
                $scope.$digest();
            }
            else if (emp.status !== 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>";
                $('#MessageBox').show();
            }
        };
        emp.send();
    };
});

//Date Time Picker
app.directive("datepicker", function () {
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