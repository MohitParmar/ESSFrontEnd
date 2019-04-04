var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('EmpRlsStrListCntroller', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1; $scope.itemsPerPage = 50;
    $scope.alluserlist = [];
    $scope.jsondata;
    $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    //Get All Employee Release Strategy
    $scope.GetEmployeeReleaseStrategy = function () { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var rls = new XMLHttpRequest(); rls.open('GET', $scope._Conpath + 'Employee/GetEmpRelease?flag=' + true, true); rls.setRequestHeader('Accept', 'application/json'); rls.onreadystatechange = function () { if (rls.readyState === 4) { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); $scope.jsondata = rls.responseText; var json = JSON.parse(rls.responseText); $scope.rlsdata = json; $scope.$digest(); } }; rls.send(); };
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
    $scope.exportAllData = function () {
        setTimeout(function () {
            $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var d = new Date();
            d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = "Employee_Wise_Release_Strategy_List_" + d;
            $scope.JSONToCSVConvertor($scope.jsondata, FileName, true); $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
        }, 100);
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = ''; CSV += ReportTitle + '\r\n\n';
        if (ShowLabel) { var row = ""; for (var index in arrData[0]) { row += index + ','; } row = row.slice(0, -1); CSV += row + '\r\n'; };
        for (var i = 0; i < arrData.length; i++) {
            var row = ""; for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; } row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }
        if (CSV === '') { alert("Invalid data"); return; }
        var fileName = "MyReport_" + ReportTitle.replace(/ /g, "_"); var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a"); link.href = uri; link.style = "visibility:hidden"; link.download = fileName + ".csv";
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
    }
});