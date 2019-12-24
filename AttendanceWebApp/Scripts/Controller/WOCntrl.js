var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('WeeklyOffCntroller', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 25; $scope.alluserlist = []; $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.ResetView = function () { window.location.reload(true); }; jQuery.support.cors = true;
    $scope.GetRelesaseStratey = function () { var rel = new XMLHttpRequest(); rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() + '&empUnqId=' + $('#myEmpUnqId').val(), true); rel.setRequestHeader('Accept', 'application/json'); rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); rlsarr = jsonvar1; $scope.rlsdata = jsonvar1; $scope.$digest(); }; }; rel.send(); };
    $scope.GetEmpInfo = function () {
        var e_Code = $('#myEmpUnqId').val(); var emp = new XMLHttpRequest(); emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + e_Code, true); emp.setRequestHeader('Accept', 'application/json');
        emp.onreadystatechange = function () {
            if (emp.readyState === 4) {
                var json = JSON.parse(emp.responseText); $scope.empdata = json; $scope.$digest(); $('#txtEmpCode').val($scope.empdata[0].empUnqId);
                $('#txtEmpName').val($scope.empdata[0].empName); $('#txtDesg').val($scope.empdata[0].desgName); $('#txtStat').val($scope.empdata[0].statName);
            };
        }; emp.send();
    }; //Get Employee details

    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });