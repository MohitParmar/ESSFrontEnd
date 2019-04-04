﻿var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('EmployeeListCntroller', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1; $scope.itemsPerPage = 50;
    $scope.alluserlist = [];
    $scope.jsondata;
    $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    //Get Lsit of Employees List when Login User is Releaser 
    $scope.GetReleaseStrategy = function () { var rls = new XMLHttpRequest(); rls.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?empunqid=' + $('#myEmpUnqId').val(), true); rls.setRequestHeader('Accept', 'application/json'); rls.onreadystatechange = function () { if (rls.readyState === 4) { var json = JSON.parse(rls.responseText); $scope.rlsdata = json; $scope.$digest(); } }; rls.send(); };
    //Get Lsit of Employees List when Login User is Releaser 
    $scope.GetEmployeeList = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var empdtl = new XMLHttpRequest();
        empdtl.open('GET', $scope._Conpath + 'Employee/GetEmployees?location=' + $('#myLoc').val(), true); empdtl.setRequestHeader('Accept', 'application/json'); empdtl.onreadystatechange = function () {
            if (empdtl.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(empdtl.responseText);
                var al = new Array; al = json; var myArray = [];
                for (var i = 0; i < al.length; i++) {
                    myArray.push([]);
                    myArray[i]["empUnqId"] = al[i].empUnqId; myArray[i]["empName"] = al[i].empName; myArray[i]["fatherName"] = al[i].fatherName; myArray[i]["email"] = al[i].email;
                    myArray[i]["unitName"] = al[i].unitName; myArray[i]["deptName"] = al[i].deptName; myArray[i]["statName"] = al[i].statName; myArray[i]["catName"] = al[i].catName;
                    myArray[i]["desgName"] = al[i].desgName; myArray[i]["perAdd1"] = al[i].perAdd1; myArray[i]["perAdd2"] = al[i].perAdd2; myArray[i]["perAdd3"] = al[i].perAdd3;
                    myArray[i]["perAdd4"] = al[i].perAdd4; myArray[i]["perCity"] = al[i].perCity; myArray[i]["perDistrict"] = al[i].perDistrict;
                    myArray[i]["perState"] = al[i].perState; myArray[i]["perPin"] = al[i].perPin; myArray[i]["perPhone"] = al[i].perPhone; myArray[i]["preAdd1"] = al[i].preAdd1;
                    myArray[i]["preAdd2"] = al[i].preAdd2; myArray[i]["preAdd3"] = al[i].preAdd3; myArray[i]["preAdd4"] = al[i].preAdd4; myArray[i]["preCity"] = al[i].preCity;
                    myArray[i]["preDistrict"] = al[i].preDistrict; myArray[i]["preState"] = al[i].preState; myArray[i]["prePin"] = al[i].prePin;
                    myArray[i]["prePhone"] = al[i].prePhone; myArray[i]["preResPhone"] = al[i].preResPhone; myArray[i]["preEmail"] = al[i].preEmail;
                    myArray[i]["location"] = al[i].location;
                };
                $scope.alldata = myArray; $scope.jsondata = $scope.alldata; $scope.$digest();
            }
        }; empdtl.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };   //Sort DATA
    $scope.exportAllData = function () {
        setTimeout(function () {
            $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var d = new Date();
            d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = "User_Address_Report_" + d;
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