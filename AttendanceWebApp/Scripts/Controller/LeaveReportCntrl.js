﻿var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('LeaveReportCntrloller', function ($scope, $http, $filter) {

    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1;
    $scope.itemsPerPage = 25;
    $scope.alluserlist = [];
    $scope._Conpath = '';
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });
    $scope.InfoPL;

    //Check Validation From Date & To Date Range
    $scope.ToValidate = function () {

        var chkFrom = document.getElementById('FromDt');
        var chkTo = document.getElementById('ToDt');

        var FromDate = chkFrom.value;
        var ToDate = chkTo.value;

        var date1 = new Date(FromDate);
        var date2 = new Date(ToDate);
        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }
        else { return true; }
    }

    //Get Leave Application Details report for Releaser
    $scope.GetLeaveInfo = function (entity) {

        var FromDate, ToDate;

        if ((typeof (entity) === "undefined") ||
            (typeof (entity.FromDt) === "undefined") ||
            (typeof (entity.ToDt) === "undefined")) {

            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            FromDate = (firstDay.getFullYear()) + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate();
            ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate());
        }
        else {
            FromDate = entity.FromDt;
            ToDate = entity.ToDt;
        }

        var date1 = new Date(FromDate);
        var date2 = new Date(ToDate);

        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', $scope._Conpath + 'LeaveReport/GetLeaves?empunqid=' + $('#myEmpUnqId').val() + '&fromDt=' + FromDate + '&toDt=' + ToDate, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var json = JSON.parse(xhr.responseText);
                $scope.data = json;
                $scope.data = $filter('orderBy')($scope.data, '-leaveAppId');
                $scope.curPage = 0;
                $scope.pageSize = 25;
                $scope.$digest();
            }
        };
        xhr.send();
    };

    //Get Posted / Not Posted / Rejected by HR Leaves Report
    $scope.GetPostedLeaveInfo = function (data) {
        
        $('#loading').removeClass("deactivediv");
        $('#loading').addClass("activediv");

        var FromDate, ToDate;

        if ((typeof (data) === "undefined") ||
            (typeof (data.FromDt) === "undefined") ||
            (typeof (data.ToDt) === "undefined")) {

            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);

            FromDate = firstDay.getFullYear() + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate();
            ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate());
        }
        else {
            FromDate = data.FromDt;
            ToDate = data.ToDt;
        }

        var date1 = new Date(FromDate);
        var date2 = new Date(ToDate);

        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }

        var sel = $('#cmbIsPosted').val()

        var xhr1 = new XMLHttpRequest();
        xhr1.open('GET', $scope._Conpath + 'LeavePosting/GetLeaves?fromDt=' + FromDate + '&toDt=' + ToDate + '&postingFlg=' + sel, true);
        xhr1.setRequestHeader('Accept', 'application/json');
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                $('#loading').removeClass("activediv");
                $('#loading').addClass("deactivediv");

                $scope.InfoPL = xhr1.responseText;
                var json = JSON.parse(xhr1.responseText);
                $scope.pdata = json;
                $scope.pdata = $filter('orderBy')($scope.pdata, '-leaveAppId');
                $scope.curPage1 = 0;
                $scope.pageSize1 = 25;
                $scope.$digest();
            }
        };
        xhr1.send();
    };

    //Reject Force fully after Leave Application Posted 
    $scope.PostLeaveReject = function (data, value, value1) {

        var TableData = storeTblValues();
        TableData = JSON.stringify(TableData);

        function storeTblValues() {
            var TableData = new Array();
            $('#aliasTable tr').each(function (row, tr) {
                TableData[row] = {
                    "LeaveAppId": $(tr).find('td:eq(0)').text(),
                    "LeaveAppItem": $(tr).find('td:eq(2)').text()
                }
            });

            var tbl = new Array();
            tbl[0] = "test";

            var count = 0;

            for (var i = 0; i < TableData.length; i++) {
                var appid = TableData[i]["LeaveAppId"];
                if (appid == value) {
                    if ((typeof (data) === "undefined") || (typeof (data.Remarks) === "undefined")) {
                        document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Remarks First For Rejection</strong></div>";
                        $('#MessageBox').show();
                        return;
                    }

                    tbl[count] = {
                        "YearMonth": value1
                        , "LeaveAppId": value
                        , "LeaveAppItem": TableData[i]["LeaveAppItem"]
                        , "IsPosted": "R"
                        , "Remarks": data.Remarks
                        , "UserId": $('#myEmpUnqId').val()
                    }
                    count++;
                }
            }
            return tbl;
        }

        var xhr1 = new XMLHttpRequest();
        xhr1.open('POST', $scope._Conpath + 'LeavePosting/PostLeaves', true);
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4 && xhr1.status === 200) {
                window.location.reload(true);
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Rejected Sucesfully.. </strong></div>";
                $('#MessageBox').show();
            }
            else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Not Rejected Please Try again.. </strong></div>";
                $('#MessageBox').show();
            }
            $scope.GetPostedLeaveInfo();
        };
        xhr1.send(TableData);
    };

    //Attendance Report / Cafetria Punching Report
    $scope.PerformanceAttendanceRpt = function (str) {

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth() - 2, 25);           //Previous Month Date 25
        var lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());    //Current Date Today
        var FromDate = (firstDay.getFullYear()) + '-' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate();
        var ToDate = lastDay.getFullYear() + '-' + (lastDay.getMonth() + 1) + '-' + (lastDay.getDate());

        if (str === "PERF") {
            $('#rptPerformance').show();
            $('#rptPunching').hide();
        }

        if (str === "PUNCH") {
            $('#rptPerformance').hide();
            $('#rptPunching').show();
        }

        var pr = new XMLHttpRequest();
        pr.open('GET', $scope._Conpath + 'Employee/PerfAttd?empunqid=' + $('#myEmpUnqId').val() + '&flag=' + str + '&fromdate=' + FromDate + '&todate=' + ToDate, true);
        pr.setRequestHeader('Accept', 'application/json');
        pr.onreadystatechange = function () {
            if (pr.readyState === 4) {

                var json = JSON.parse(pr.responseText);
                $scope.prdata = json;
                $scope.prdata = $filter('orderBy')($scope.prdata, '-attdDate');
                $scope.curPage = 0;
                $scope.pageSize = 31;
                $scope.$digest();
            }
        };
        pr.send();
    };

    //Using For DIR Pagintaiton Sorting
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };

    //Export to Excel CSV File Grid Data
    $scope.exportAllData = function () {
        setTimeout(function () {

            $('#loading').removeClass("deactivediv");
            $('#loading').addClass("activediv");

            var d = new Date();
            d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = "Posted_Leave_Report_" + d;

            $scope.JSONToCSVConvertor($scope.InfoPL, FileName, true);

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
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); };
            var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } };
            elem.datepicker(options);
        }
    }
});