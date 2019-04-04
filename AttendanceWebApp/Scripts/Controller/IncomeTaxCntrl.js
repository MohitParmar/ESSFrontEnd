var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('IncomeTaxController', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1; $scope.itemsPerPage = 10; $scope.alluserlist = [];
    $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.ResetView = function () { window.location.reload(true); };
    jQuery.support.cors = true;
    $('.btnNext').click(function () { $('.nav-tabs > .active').next('li').find('a').trigger('click'); }); $('.btnPrevious').click(function () { $('.nav-tabs > .active').prev('li').find('a').trigger('click'); });
    //Get User Personal Details
    $scope.GetUserPerasonalInfo = function () { var Udata1; var Uperdata2; var xy = {}; var xhr = new XMLHttpRequest(); xhr.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + $('#myEmpUnqId').val(), true); xhr.setRequestHeader('Accept', 'application/json'); xhr.onreadystatechange = function () { if (xhr.readyState === 4 && xhr.status === 200) { var json1 = JSON.parse(xhr.responseText); $scope.Udata = json1; var per = new XMLHttpRequest(); per.open('GET', $scope._Conpath + 'Employee/GetEmpDetails?empunqid=' + $('#myEmpUnqId').val() + '&mode=1', true); per.setRequestHeader('Accept', 'application/json'); per.onreadystatechange = function () { if (per.readyState === 4 && per.status === 200) { var json = JSON.parse(per.responseText); $scope.Uperdata = json; Uperdata2 = $scope.Uperdata; Udata1 = $scope.Udata; angular.merge(xy, Udata1, Uperdata2); $scope.UserInfo = xy; $scope.$digest(); } }; per.send(); } }; xhr.send(); $scope.$digest(); };
    //calculate annual rent
    $scope.calcRent = function () { var rentPM = document.getElementById('rentpm').value; var rentYearly = rentPM * 12; document.getElementById("renttotal").value = rentYearly; };
    //Total Investments
    $scope.Total80c = function () {
        var p_ppf = parseInt(document.getElementById('p_ppf').value) || 0; var a_ppf = parseInt(document.getElementById('a_ppf').value) || 0;
        var p_deposit = parseInt(document.getElementById('p_deposit').value) || 0; var a_deposit = parseInt(document.getElementById('a_deposit').value) || 0;
        var p_insurance = parseInt(document.getElementById('p_insurance').value) || 0; var a_insurance = parseInt(document.getElementById('a_insurance').value) || 0;
        var p_nsc = parseInt(document.getElementById('p_nsc').value) || 0; var a_nsc = parseInt(document.getElementById('a_nsc').value) || 0;
        var p_mfund = parseInt(document.getElementById('p_mfund').value) || 0; var a_mfund = parseInt(document.getElementById('a_mfund').value) || 0;
        var p_houseloan = parseInt(document.getElementById('p_houseloan').value) || 0; var a_houseloan = parseInt(document.getElementById('a_houseloan').value) || 0;
        var p_child1fees = parseInt(document.getElementById('p_child1fees').value) || 0; var a_child1fees = parseInt(document.getElementById('a_child1fees').value) || 0;
        var p_child2fees = parseInt(document.getElementById('p_child2fees').value) || 0; var a_child2fees = parseInt(document.getElementById('a_child2fees').value) || 0;
        var p_pensionscheme = parseInt(document.getElementById('p_pensionscheme').value) || 0; var a_pensionscheme = parseInt(document.getElementById('a_pensionscheme').value) || 0;
        var p_others = parseInt(document.getElementById('p_others').value) || 0; var a_others = parseInt(document.getElementById('a_others').value) || 0;
        var p_total = p_ppf + p_deposit + p_insurance + p_nsc + p_mfund + p_houseloan + p_child1fees + p_child2fees + p_pensionscheme + p_others; document.getElementById("p_total").value = p_total;
        var a_total = a_ppf + a_deposit + a_insurance + a_nsc + a_mfund + a_houseloan + a_child1fees + a_child2fees + a_pensionscheme + a_others; document.getElementById("a_total").value = a_total;
        //document.getElementById("total_diff").value = a_total - p_total;
    };
});
//Date Picker
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });