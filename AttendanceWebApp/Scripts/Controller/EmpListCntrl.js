var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('EmployeeListCntroller', function ($scope, $http) {

    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1;
    $scope.itemsPerPage = 50;
    $scope.alluserlist = [];
    $scope._Conpath = '';
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });
    $scope.Info;

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

    //Get Lsit of Employees List when Login User is Releaser 
    $scope.GetEmployeeList = function () {
        $('#loading').removeClass("deactivediv");
        $('#loading').addClass("activediv");

        var empdtl = new XMLHttpRequest();
        empdtl.open('GET', $scope._Conpath + 'Employee/GetEmployees', true);
        empdtl.setRequestHeader('Accept', 'application/json');
        empdtl.onreadystatechange = function () {
            if (empdtl.readyState === 4) {

                $('#loading').removeClass("activediv");
                $('#loading').addClass("deactivediv");

                $scope.Info = empdtl.responseText;
                var json = JSON.parse(empdtl.responseText);
                $scope.alldata = json;
                $scope.$digest();
            }
        };
        empdtl.send();
    };

    //Using For DIR Pagintaiton Sorting
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; }

    $scope.exportAllData = function () {
        setTimeout(function () {

            $('#loading').removeClass("deactivediv");
            $('#loading').addClass("activediv");

            var d = new Date();
            d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = "All_Users_Present_Address_Report_" + d;

            $scope.JSONToCSVConvertor($scope.Info, FileName, true);

            $('#loading').removeClass("activediv");
            $('#loading').addClass("deactivediv");
        }, 100);
    };

    //Convert Json Data to CSV 
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {

        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';
        CSV += ReportTitle + '\r\n\n'; //Set Report title in first row or line

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";
            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n'; //append Label row with line break
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n'; //add a line break after each row
        }

        if (CSV === '') { alert("Invalid data"); return; }
        var fileName = "MyReport_"; //Generate a file name

        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, "_");
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV); //Initialize file format you want csv or xls

        // Now the little tricky part.// you can use either>> window.open(uri);// but this will not work in some browsers// or you will not get the correct file extension    
        // this trick will generate a temp <a /> tag

        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden"; //set the visibility hidden so it will not effect on your web-layout
        link.download = fileName + ".csv";
        document.body.appendChild(link); //this part will append the anchor tag and remove it after automatic click
        link.click();
        document.body.removeChild(link);
    };
});