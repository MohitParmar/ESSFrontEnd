var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('EmployeeListCntroller', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1; $scope.itemsPerPage = 50;
    $scope.alluserlist = [];

    $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () {
        if (typeof (_ConPath) === "undefined") { return; } else {
            if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else {
                $scope._Conpath = urlprotocol + "//" + urlhost + "/api/";
            }
        };
    });

    $scope.jsondata;

    //Get Lsit of Employees List when Login User is Releaser 
    $scope.GetReleaseStrategy = function () {
        var rls = new XMLHttpRequest();
        rls.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?empunqid=' + $('#myEmpUnqId').val(), true);
        rls.setRequestHeader('Accept', 'application/json');
        rls.onreadystatechange = function () { if (rls.readyState === 4) { var json = JSON.parse(rls.responseText); $scope.rlsdata = json; $scope.$digest(); } };
        rls.send();
    };

    //Get Lsit of Employees List when Login User is Releaser 
    $scope.GetEmployeeList = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var empdtl = new XMLHttpRequest();
        empdtl.open('GET', $scope._Conpath + 'Employee/GetEmployees', true);
        empdtl.setRequestHeader('Accept', 'application/json');
        empdtl.onreadystatechange = function () {
            if (empdtl.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                $scope.jsondata = empdtl.responseText;
                var json = JSON.parse(empdtl.responseText); $scope.alldata = json;
                $scope.$digest();
            }
        };
        empdtl.send();
    };

    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; }

    $scope.exportAllData = function () {
        setTimeout(function () {
            $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
            var d = new Date(); d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = "User_Address_Report_" + d; $scope.JSONToCSVConvertor($scope.jsondata, FileName, true);
            $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
        }, 100);
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {

        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';
        CSV += ReportTitle + '\r\n\n';
        if (ShowLabel) {
            var row = "";
            for (var index in arrData[0]) {
                row += index + ',';
            }
            //row = "empUnqId, empName, fatherName, email, unitName, deptName, statName, catName, desgName,perAdd1, perAdd2, perAdd3, perAdd4, perDistrict, perCity, perState, perPin, perPhone,preAdd1, preAdd2, preAdd3, preAdd4, preDistrict, preCity, preState, prePin, prePhone, preResPhone, preEmail";
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            } row.slice(0, row.length - 1); CSV += row + '\r\n';
        }
        if (CSV === '') {
            alert("Invalid data"); return;
        }
        var fileName = "MyReport_" + ReportTitle.replace(/ /g, "_");
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});