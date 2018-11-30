var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('listdata', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.rlsdata = []; //declare an empty array

    //Get Conntion Path of Backend from Web Config & Set in ConPath
    $scope._Conpath = '';
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });
    $scope.ResetView = function () { window.location.reload(true); }; //Reload Page

    //Enable Jquery For XML HTTP Request
    jQuery.support.cors = true;

    //Get Login User Details
    $scope.GetUserInfo = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + $('#myEmpUnqId').val(), true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var json = JSON.parse(xhr.responseText);
                $scope.Udata = json;
                $scope.$digest();
            }
        };
        xhr.send();
    };

    //Get Employee details entered by user for Reset Password 
    $scope.GetEmpInfo = function () {
        $('#tbl_empdtl').show();

        var e_Code = $('#eCode').val();
        if (e_Code === '') {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Employee Code First.. </strong></div>";
            $('#MessageBox').show();

            return false;
        }

        var emp = new XMLHttpRequest();
        emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + $('#eCode').val(), true);
        emp.setRequestHeader('Accept', 'application/json');
        emp.onreadystatechange = function () {
            if (emp.readyState === 4) {
                var json1 = JSON.parse(emp.responseText);
                $scope.empdata = json1;
                $scope.$digest();
            }
            else if (emp.status !== 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>";
                $('#MessageBox').show();
            }
        };
        emp.send();
    };

    //Get Login User Leave Applications List
    $scope.GetLeaveRequestLists = function () {
        var xhr1 = new XMLHttpRequest();
        xhr1.open('GET', $scope._Conpath + 'LeaveApplication/GetLeaveApplication?empUnqId=' + $('#myEmpUnqId').val(), true);
        xhr1.setRequestHeader('Accept', 'application/json');
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                var json = JSON.parse(xhr1.responseText);
                $scope.lappdata = json;
                $scope.lappdata = $filter('orderBy')($scope.lappdata, '-leaveAppId');
                $scope.curPage = 0;
                $scope.pageSize = 10;
                $scope.$digest();
            }
        };
        xhr1.send();
    };

    //Get Posted Leave List by HR Department
    $scope.GetPostedLeave = function () {
        var d = new Date();
        var pstl = new XMLHttpRequest();
        pstl.open('GET', $scope._Conpath + 'leaveentry?empunqid=' + $('#myEmpUnqId').val() + '&year=' + d.getFullYear(), true);
        pstl.setRequestHeader('Accept', 'application/json');
        pstl.onreadystatechange = function () {
            if (pstl.readyState === 4) {
                var json = JSON.parse(pstl.responseText);
                $scope.pladata = json;
                $scope.pladata = $filter('orderBy')($scope.pladata, '-fromDt');
                $scope.curPage1 = 0;
                $scope.pageSize1 = 10;
                $scope.$digest();
            }
        };
        pstl.send();
    };

    //Sorting Grid
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };

    //Get Release Strategy
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

    //Post Leave Applications
    $scope.CostLeave = function (data, value, value1) {
        var TableData = storeTblValues();
        TableData = JSON.stringify(TableData);

        function storeTblValues() {
            var TableData = new Array();
            $('#aliasTable tr').each(function (row, tr) {
                TableData[row] = { "LeaveAppId": $(tr).find('td:eq(0)').text(), "LeaveAppItem": $(tr).find('td:eq(1)').text(), "IsPosted": $(tr).find("select").val() }
            });

            var tbl = new Array();
            tbl[0] = "test";

            var count = 0;

            for (var i = 0; i < TableData.length; i++) {
                var appid = TableData[i]["LeaveAppId"];
                var ispst = TableData[i]["IsPosted"];

                if (appid === value) {
                    if (ispst === "0") {
                        if ((typeof (data) === "undefined") || (typeof (data.Remarks) === "undefined")) {
                            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Remarks First For Rejection</strong></div>";
                            $('#MessageBox').show();
                            return;
                        }
                    }

                    if (ispst === "0") {
                        tbl[count] = {
                            "YearMonth": value1, "LeaveAppId": value, "LeaveAppItem": TableData[i]["LeaveAppItem"], "IsPosted": "R", "Remarks": data.Remarks, "UserId": $('#myEmpUnqId').val()
                        }
                        count++;
                    }

                    if (ispst !== "0") {
                        tbl[count] = {
                            "YearMonth": value1, "LeaveAppId": value, "LeaveAppItem": TableData[i]["LeaveAppItem"], "IsPosted": TableData[i]["IsPosted"]
                        }
                        count++;
                    }
                }
            } return tbl;
        }

        var xhr1 = new XMLHttpRequest();
        xhr1.open('POST', $scope._Conpath + 'LeavePosting/PostLeaves', true);
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4 && xhr1.status === 200) {
                window.location.reload(true);
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Leave Posted / Rejected Sucesfully.. </strong></div>";
                $('#MessageBox').show();
            }
            else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Leave Not Posted / Rejected.. </strong></div>";
                $('#MessageBox').show();
            }
            $scope.GetPostingLeaveApplicationLists();
        };
        xhr1.send(TableData);
    };

    //Get Posted Leave Applications
    $scope.GetPostingLeaveApplicationLists = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', $scope._Conpath + 'LeavePosting/GetLeaves', true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var json = JSON.parse(xhr.responseText);
                $scope.lappdata = json; $scope.$digest();
            }
        };
        xhr.send();
    };

    //Get Fully Posted / Partillay Posted / Not Posted / Post Rejected by HR Leaves Report
    $scope.GetPostedLeaveInfo = function (data) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var FromDate, ToDate;
        if ((typeof (data) === "undefined") || (typeof (data.FromDt) === "undefined") || (typeof (data.ToDt) === "undefined")) {
            var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate();
            ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate());
        } else { FromDate = data.FromDt; ToDate = data.ToDt; }
        var date1 = new Date(FromDate); var date2 = new Date(ToDate);
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; }
        var sel = $('#cmbIsPosted').val()
        var xhr1 = new XMLHttpRequest();
        xhr1.open('GET', $scope._Conpath + 'LeavePosting/GetLeaves?fromDt=' + FromDate + '&toDt=' + ToDate + '&postingFlg=' + sel, true);
        xhr1.setRequestHeader('Accept', 'application/json');
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(xhr1.responseText);
                //$scope.InfoPL = json; $scope.pdata = json; $scope.pdata = $filter('orderBy')($scope.pdata, '-leaveAppId');
                var la = new Array; la = json;
                var applReleaseStatus = new Array;
                var leaveApplicationDetails = new Array;
                var empName, statName, releaseDate;
                var cnt = 0;
                var myArray = [];
                for (var i = 0; i < la.length; i++) {
                    empName = la[i].employee.empName;
                    statName = la[i].stations.statName;
                    applReleaseStatus = la[i].applReleaseStatus; for (var j = 0; j < applReleaseStatus.length; j++) { releaseDate = applReleaseStatus[j].releaseDate; }
                    leaveApplicationDetails = la[i].leaveApplicationDetails;
                    for (var l = 0; l < leaveApplicationDetails.length; l++) {
                        myArray.push([]);
                        //Leave Applications
                        myArray[cnt]["releaseGroupCode"] = la[i].releaseGroupCode;
                        myArray[cnt]["leaveAppId"] = la[i].leaveAppId;
                        myArray[cnt]["yearMonth"] = la[i].yearMonth;
                        myArray[cnt]["addDt"] = la[i].addDt;
                        myArray[cnt]["releaseDate"] = releaseDate;
                        myArray[cnt]["updDt"] = la[i].updDt;
                        myArray[cnt]["empUnqId"] = la[i].empUnqId;
                        myArray[cnt]["empName"] = empName;
                        myArray[cnt]["statName"] = statName;
                        //Leave Application Details 
                        myArray[cnt]["remarks"] = leaveApplicationDetails[l].remarks;
                        myArray[cnt]["leaveAppItem"] = leaveApplicationDetails[l].leaveAppItem;
                        myArray[cnt]["leaveTypeCode"] = leaveApplicationDetails[l].leaveTypeCode;
                        myArray[cnt]["fromDt"] = leaveApplicationDetails[l].fromDt;
                        myArray[cnt]["toDt"] = leaveApplicationDetails[l].toDt;
                        myArray[cnt]["totalDays"] = leaveApplicationDetails[l].totalDays;
                        myArray[cnt]["halfDayFlag"] = leaveApplicationDetails[l].halfDayFlag;
                        myArray[cnt]["isPosted"] = leaveApplicationDetails[l].isPosted;
                        cnt++;
                    }
                    leaveApplicationDetails = "";
                }
                $scope.pdata = myArray;
                $scope.InfoPL = $scope.pdata;
                $scope.curPage1 = 0; $scope.pageSize1 = 25;
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
                    "LeaveAppId": $(tr).find('td:eq(2)').text(),
                    "LeaveAppItem": $(tr).find('td:eq(10)').text()
                }
            });
            
            var tbl = new Array(); tbl[0] = "test";
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
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Rejected Sucesfully.. </strong></div>"; $('#MessageBox').show();
            } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Not Rejected Please Try again.. </strong></div>"; $('#MessageBox').show(); }
            $scope.GetPostedLeaveInfo();
        };
        xhr1.send(TableData);
    };
});