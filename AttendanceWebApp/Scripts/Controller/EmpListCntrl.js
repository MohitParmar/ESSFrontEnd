var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('EmployeeListCntroller', function ($scope, $http) {

    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.alluserlist = [];
    $scope._Conpath = '';
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });

    //Get Lsit of Employees List when Login User is Releaser 
    $scope.GetReleaseStrategy = function () {
        var rls = new XMLHttpRequest();
        rls.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?empunqid=' + $('#myEmpUnqId').val(), true);
        rls.setRequestHeader('Accept', 'application/json');
        rls.onreadystatechange = function () {
            if (rls.readyState === 4) {
                var json = JSON.parse(rls.responseText);
                $scope.rlsdata = json;
                $scope.$digest();
            }
        };
        rls.send();
    };

    //Using For DIR Pagintaiton Sorting
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});