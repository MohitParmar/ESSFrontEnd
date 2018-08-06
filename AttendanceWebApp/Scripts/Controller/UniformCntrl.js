var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('UniformController', function ($scope, $http, $filter) {

    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.alluserlist = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope._Conpath = '';
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });
    $scope.jsondata;

    $scope.ResetView = function () { window.location.reload(true); }    //Reload Page

    var d = new Date();
    var Currentyear = (d.getFullYear());

    $scope.AddUniformDetails = function (entity) {

        if ((typeof (entity) === "undefined") ||
           (typeof (entity.TrouserSize) === "undefined") ||
           (typeof (entity.ShirtSize) === "undefined")) {
            alert("Please Fill All Required Details .. ");
            return false;
        }

        var jsonObj = {};

        jsonObj.EmpUnqId = $('#myEmpUnqId').val();
        jsonObj.Year = Currentyear;
        jsonObj.TrouserSize = entity.TrouserSize;
        jsonObj.ShirtSize = entity.ShirtSize;
        jsonObj.UpdUser = $('#myEmpUnqId').val();
        jsonObj = JSON.stringify(jsonObj);

        var Unf = new XMLHttpRequest();
        Unf.open('POST', $scope._Conpath + 'EmpUniform/UpdateUniform', true);
        Unf.setRequestHeader("Content-type", "application/json");
        Unf.onreadystatechange = function () {
            if (Unf.readyState === 4 && Unf.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Uniform Details Updated Successfully.. </strong></div>";
                $('#MessageBox').show();
                document.getElementById("txtShirtSize").value = "";
                document.getElementById("txtTrouserSize").value = "";
                $scope.GetUniformDetails();
            }
            else if (Unf.status === 400) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Uniform Details not Saved.. </strong></div>";
                $('#MessageBox').show();
                document.getElementById("txtShirtSize").value = "";
                document.getElementById("txtTrouserSize").value = "";
            }
        };
        Unf.send(jsonObj);
    };

    //Get Uniform Details of Selected User 
    $scope.GetUniformDetails = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', $scope._Conpath + 'EmpUniform/GetEmpUniform?year=' + Currentyear + ' &empUnqId=' + $('#myEmpUnqId').val(), true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var json = JSON.parse(xhr.responseText);
                $scope.data = json;
                $scope.$digest();
            }
        };
        xhr.send();
    };

    //Get Uniform Details of Selected User 
    $scope.GetAllUserUniformDetails = function () {

        $('#loading').removeClass("deactivediv");
        $('#loading').addClass("activediv");

        var xhr1 = new XMLHttpRequest();
        xhr1.open('GET', $scope._Conpath + 'EmpUniform/GetEmpUniform?year=' + Currentyear, true);
        xhr1.setRequestHeader('Accept', 'application/json');
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                $('#loading').removeClass("activediv");
                $('#loading').addClass("deactivediv");
                $scope.jsondata = xhr1.responseText;
                var json = JSON.parse(xhr1.responseText);
                $scope.Alldata = json;
                $scope.Alldata = $filter('orderBy')($scope.Alldata, '-updTime');
                $scope.$digest();
            }
        };
        xhr1.send();
    };

    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; }    //Using For DIR Pagintaiton Sorting

    //Export to Excel CSV File Grid Data
    $scope.exportAllData = function () {
        setTimeout(function () {

            $('#loading').removeClass("deactivediv");
            $('#loading').addClass("activediv");

            var d = new Date();
            d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = "Uniform_Master_List_" + d;

            $scope.JSONToCSVConvertor($scope.jsondata, FileName, true);

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
    }
});

//Date Picker
app.directive("datepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, ngModelCtrl) {
            var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); };
            var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } };
            elem.datepicker(options);
        }
    }
});