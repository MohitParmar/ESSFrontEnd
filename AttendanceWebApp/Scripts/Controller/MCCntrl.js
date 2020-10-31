var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("MCController", function ($scope, $http) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), $scope._Conpath = ""; var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol; $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") });
    $scope.currentPage = 1, $scope.itemsPerPage = 50;
    $scope.ResetView = function () { window.location.reload(!0) };
    $scope.GetRelesaseStratey = function () { var rel = new XMLHttpRequest; rel.open("GET", $scope._Conpath + "ReleaseStrategy/GetReleaseStrategy?releaseGroup=" + $("#releaseGroupCode").val() + "&empUnqId=" + $("#myEmpUnqId").val(), !0), rel.setRequestHeader("Accept", "application/json"), rel.onreadystatechange = function () { if (4 === rel.readyState) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1, $scope.$digest() } }, rel.send() };
    $scope.GetDependentDetails = function(mode) {
        $("#loading").removeClass("deactivediv");
        $("#loading").addClass("activediv");
        var emp = new XMLHttpRequest();
        if (mode === "true") {
            emp.open("GET",
                $scope._Conpath + "MedDependent/GetDependents?mode=true&policyYear=202021&empunqid=" + null,
                true);
        } else {
            emp.open("GET",
                $scope._Conpath +
                "MedDependent/GetDependents?mode=false&policyYear=202021&empunqid=" +
                $("#myEmpUnqId").val(),
                true);
        };
        emp.setRequestHeader("Accept", "application/json");
        emp.onreadystatechange = function() {
            if (emp.readyState === 4) {
                $("#loading").removeClass("activediv");
                $("#loading").addClass("deactivediv");
                var json1 = JSON.parse(emp.responseText);
                $scope.depData = json1;
                $scope.$digest();
            } else if (emp.status !== 200) {
                $("#loading").removeClass("activediv");
                $("#loading").addClass("deactivediv");
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>";
                $("#MessageBox").show();
            };
        };
        emp.send();
    };
}); app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });