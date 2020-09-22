var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);

app.controller("WeeklyOffCntroller", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val();
    $scope.currentPage = 1;
    $scope.itemsPerPage = 25;
    $scope.alluserlist = [];
    $scope._Conpath = "";
    var url_string = window.location.href;
    var url = new URL(url_string);
    var urlhost = url.hostname;
    var urlprotocol = url.protocol;
    $(document).ready(function () {
        if (typeof _ConPath === "undefined") {
            return;
        } else {
            if (urlhost === _URLHostName) {
                $scope._Conpath = _ConPath;
            } else {
                $scope._Conpath = urlprotocol + "//" + urlhost + "/api/";
            }
        }
    });
    $scope.ResetView = function () {
        window.location.reload(true);
    };
    jQuery.support.cors = true;
    $scope.GetRelesaseStratey = function () {
        var rel = new XMLHttpRequest();
        rel.open("GET", $scope._Conpath + "ReleaseStrategy/GetReleaseStrategy?releaseGroup=" + $("#releaseGroupCode").val() + "&empUnqId=" + $("#myEmpUnqId").val(), true);
        rel.setRequestHeader("Accept", "application/json");
        rel.onreadystatechange = function () {
            if (rel.readyState === 4) {
                var jsonvar1 = JSON.parse(rel.responseText);
                rlsarr = jsonvar1;
                $scope.rlsdata = jsonvar1;
                $scope.$digest();
            }
        };
        rel.send();
    };
    $scope.GetEmpInfo = function () {
        var e_Code = $("#myEmpUnqId").val();
        var emp = new XMLHttpRequest();
        emp.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + e_Code, true);
        emp.setRequestHeader("Accept", "application/json");
        emp.onreadystatechange = function () {
            if (emp.readyState === 4) {
                var json = JSON.parse(emp.responseText);
                $scope.empdata = json;
                $scope.$digest();
                $("#txtEmpCode").val($scope.empdata[0].empUnqId);
                $("#txtEmpName").val($scope.empdata[0].empName);
                $("#txtDesg").val($scope.empdata[0].desgName);
                $("#txtStat").val($scope.empdata[0].statName);
            }
        };
        emp.send();
    };
    $scope.YearValidate = function () {
        var chkFrom = document.getElementById("PresentWODt");
        var FromDate = chkFrom.value;
        var date1 = new Date(FromDate);
        var fyear = date1.getFullYear();
        var d = new Date();
        var tyear = d.getFullYear();
        if (tyear < fyear || fyear < tyear) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Enter Valid Date of Current Month/Year.. </strong></div>";
            $("#MessageBox").show();
            document.getElementById("PresentWODt").value = "";
            return false;
        } else {
            $scope.ToValidate();
        }
    };
    $scope.ToValidate = function () {
        var chkFrom = document.getElementById("PresentWODt");
        var chkTo = document.getElementById("ChangeWODt");
        var FromDate = chkFrom.value;
        var ToDate = chkTo.value;
        if (FromDate === "") {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Select From Date First...</strong></div>";
            $("#MessageBox").show();
            document.getElementById("PresentWODt").value = "";
            document.getElementById("ChangeWODt").value = "";
            return false;
        }
        var date1 = new Date(FromDate);
        var date2 = new Date(ToDate);
        var fyear = date2.getFullYear();
        var d = new Date();
        var tyear = d.getFullYear();
        if (tyear < fyear) {
            alert("Please Enter Valid Date of Current Month/Year.. ");
            document.getElementById("ChangeWODt").value = "";
            return false;
        }
        var diff = (date1 - date2) / (1e3 * 60 * 60 * 24) * -1 + 1;
        if (diff === "NaN" || diff <= 0) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Select Proper Dates for OD apply.</strong></div>";
            $("#MessageBox").show();
            document.getElementById("PresentWODt").value = "";
            document.getElementById("ChangeWODt").value = "";
            return false;
        }
        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Enter Valid Date Range.. </strong></div>";
            $("#MessageBox").show();
            return false;
        } else {
            return true;
        }
    };
    $scope.CreateWO = function (entity) {
        document.getElementById("BtnCreate").disabled = true;
        var d = new Date();
        var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var year = d.getFullYear().toString();
        var month = d.getMonth() + 1;
        var yearmonth = year + month.toString();
        var FromDateTime = entity.PresentWODt;
        var ToDateTime = entity.ChangeWODt;
        var HalfDayFlag = false;
        var TotalDays = "1";
        var jsonObj = {};
        var TableData = storeTblValues();
        TableData = JSON.stringify(TableData);
        function storeTblValues() {
            var TableData = new Array();
            TableData[0] = {
                yearMonth: yearmonth,
                leaveAppId: 0,
                compCode: $("#myCompCode").val(),
                wrkGrp: $("#myWrkGrp").val(),
                leaveAppItem: "1",
                leaveTypeCode: "WO",
                fromDt: FromDateTime,
                toDt: ToDateTime,
                totalDays: TotalDays,
                halfdayflag: HalfDayFlag,
                remarks: entity.Remarks,
                placeOfVisit: "",
                contactAddress: ""
            };
            jsonObj.yearMonth = yearmonth;
            jsonObj.leaveAppId = 0;
            jsonObj.empUnqId = $("#myEmpUnqId").val();
            jsonObj.compCode = $("#myCompCode").val();
            jsonObj.wrkGrp = $("#myWrkGrp").val();
            jsonObj.unitCode = $("#myUnitCode").val();
            jsonObj.deptCode = $("#myDeptCode").val();
            jsonObj.statCode = $("#myStatCode").val();
            jsonObj.catCode = $("#myCatCode").val();
            jsonObj.isHOD = $("#myIsHod").val();
            jsonObj.releaseGroupCode = $("#releaseGroupCode").val();
            jsonObj.releaseStrategy = "";
            jsonObj.releaseStatusCode = "";
            jsonObj.addDt = dt;
            jsonObj.addUser = $("#myEmpUnqId").val();
            jsonObj.clientIp = $("#myIPAddress").val();
            jsonObj.updDt = dt;
            jsonObj.updUser = null;
            jsonObj.remarks = null;
            jsonObj.parentId = 0;
            jsonObj.leaveApplicationDetails = TableData;
            return jsonObj;
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", $scope._Conpath + "LeaveApplication/CreateLeaveApplication", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Week Off Change Application Created Sucessfully.. </strong></div>";
                $("#MessageBox").show();
                document.getElementById("PresentWODt").value = "";
                document.getElementById("ChangeWODt").value = "";
            } else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Wekk Off Change Application Not Created Please try Again.. </strong></div>";
                $("#MessageBox").show();
                document.getElementById("PresentWODt").value = "";
                document.getElementById("ChangeWODt").value = "";
            }
        };
        xhr.send(TableData);
    };
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };
});

app.directive("datepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                dateFormat: "yy-mm-dd",
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    };
});