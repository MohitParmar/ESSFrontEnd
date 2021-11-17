﻿var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("FullandFinalController", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val();
    $scope.currentPage = 1; $scope.itemsPerPage = 10;
    var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $scope._Conpath = "";
    "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/")
    $scope.ResetView = function () { window.location.reload(!0) };
    jQuery.support.cors = true; $scope.exportObj;
    $scope.addUsr;
    $scope.GetFandF = function (e_Code) {
        var e_Code = $("#eCode").val();
        usr = new XMLHttpRequest;
        if ((typeof (e_Code) !== "undefined")) {
            if (e_Code.length === 6) { usr.open("GET", $scope._Conpath + "FandF/GetFandF?empUnqId=" + e_Code, !0); } else { return false; };
        }
        usr.setRequestHeader("Accept", "application/json");
        usr.onreadystatechange = function () {
            if (usr.readyState === 4) {
                var json = JSON.parse(usr.responseText);
                $scope.Udata = json;
                $scope.$digest();
                $("#eCode").val($scope.Udata.empUnqId);
                $("#empName").val($scope.Udata.employee.empName);
                $("#designation").val($scope.Udata.employee.desgName);
                $("#station").val($scope.Udata.employee.statName);
                $("#joinDate").val($scope.Udata.employee.joinDate.substring(0, $scope.Udata.employee.joinDate.indexOf("T")));
                $("#relieveDate").val($scope.Udata.relieveDate.substring(0, $scope.Udata.relieveDate.indexOf("T")));
                $("#mode").val($scope.Udata.modeOfLeaving);
                $scope.addUsr = $scope.Udata.addUser
                $("#documentNo").val($scope.Udata.documentNo);
                $("#recoveryAmount").val($scope.Udata.recoveryAmount);
                $("#cashDeposited").val($scope.Udata.cashDeposited);
                if ($scope.Udata.depositDate != "" && $scope.Udata.depositDate != null) {
                    $("#depositDate").val($scope.Udata.depositDate.substring(0, $scope.Udata.depositDate.indexOf("T")));
                }
                $("#remarks").val($scope.Udata.remarks);
            } else if (usr.status === 400) {
                var str = usr.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString(); var fields = str.split(','); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er +
                    "</strong></div>"; $("#MessageBox").show();
                $("#eCode").val(""); $("#empName").val(""); $("#designation").val(""); $("#station").val(""); $("#joinDate").val(""); $("#relieveDate").val("");
                $("#mode").val(""); $("#gratuity").val(""); $("#documentNo").val(""); $("#recoveryAmount").val(""); $("#cashDeposited").val(""); $("#depositDate").val("");
                $("#remarks").val("");
            };
        }; usr.send();
    };
    $scope.UpdateFandF = function () {
        var dNo = $("#documentNo").val();
        if (dNo === "" || typeof (dNo) === "undefiend") {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" +
                "Please Enter Document No.</strong></div>"; $("#MessageBox").show();
            document.getElementById("btnSubmit").disabled = false;
            return false;
        };
        document.getElementById("btnSubmit").disabled = true;
        var jsonObj = {};
        jsonObj.EmpUnqId = $("#eCode").val();
        jsonObj.RelieveDate = $("#relieveDate").val();
        jsonObj.DocumentNo = dNo.toUpperCase();
        jsonObj.RecoveryAmount = $("#recoveryAmount").val();
        jsonObj.CashDeposited = $("#cashDeposited").val().toUpperCase();
        jsonObj.DepositDate = $("#depositDate").val();
        jsonObj.Remarks = $("#remarks").val().toUpperCase();
        var v = $("#gratuity").val();
        if (v === "YES") { jsonObj.GratuityFlag = true; } else { jsonObj.GratuityFlag = false; };
        jsonObj.AddUser = $("#myEmpUnqId").val();
        jsonObj.AddDate = new Date();
        jsonObj = JSON.stringify(jsonObj);
        fnf = new XMLHttpRequest;
        if ($scope.addUsr !== null && $scope.addUsr !== "" && (typeof ($scope.addUsr) !== "undefined")) { fnf.open("PUT", $scope._Conpath + "FandF/ChangeFandF", !0); }
        else { fnf.open("POST", $scope._Conpath + "FandF/CreateFandF", !0); }
        fnf.setRequestHeader("Content-Type", "application/json");
        fnf.onreadystatechange = function () {
            if (fnf.readyState === 4) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" +
                    "Submited Successfully..</strong></div>"; $("#MessageBox").show();
                document.getElementById("btnSubmit").disabled = false;
                $("#eCode").val(""); $("#empName").val(""); $("#designation").val(""); $("#station").val(""); $("#joinDate").val(""); $("#relieveDate").val("");
                $("#mode").val(""); $("#gratuity").val(""); $("#documentNo").val(""); $("#recoveryAmount").val(""); $("#cashDeposited").val(""); $("#depositDate").val("");
                $("#remarks").val("");
            } else if (fnf.status === 400) {
                var str = fnf.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString(); var fields = str.split(','); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er +
                    "</strong></div>"; $("#MessageBox").show();
                document.getElementById("btnSubmit").disabled = false;
            };
        }; fnf.send(jsonObj);
    };
    $scope.FandFReport = function (data) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var FromDate, ToDate; if ((typeof (data) === "undefined") || (typeof (data.FromDt) === "undefined") || (typeof (data.ToDt) === "undefined")) { var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth(), 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); FromDate = (firstDay.getFullYear()) + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate(); ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate()); } else { FromDate = data.FromDt; ToDate = data.ToDt; };
        var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; };
        usr = new XMLHttpRequest; usr.open("GET", $scope._Conpath + "FandF/GetFandF?fromDt=" + FromDate + "&toDt=" + ToDate, !0); usr.setRequestHeader("Accept", "application/json"); usr.onreadystatechange = function () {
            if (usr.readyState === 4 && usr.status === 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(usr.responseText);
                var la = new Array; la = json; var myArray = [];
                for (var i = 0; i < la.length; i++) {
                    myArray.push([]);
                    myArray[i]["SR_NO"] = i + 1;
                    myArray[i]["EMP_CODE"] = la[i].empUnqId;
                    myArray[i]["EMP_NAME"] = la[i].employee.empName;
                    myArray[i]["DESG"] = la[i].employee.desgName;
                    myArray[i]["DEPT"] = la[i].employee.statName;
                    myArray[i]["JOINING_DT"] = la[i].employee.joinDate.substring(0, la[i].employee.joinDate.indexOf("T"));
                    myArray[i]["RELIEVE_DT"] = la[i].relieveDate.substring(0, la[i].relieveDate.indexOf("T"));
                    myArray[i]["REASON"] = la[i].modeOfLeaving;
                    myArray[i]["DOC_NO"] = la[i].documentNo;
                    if (la[i].recoveryAmount !== null) { myArray[i]["RECOVERY_AMT"] = la[i].recoveryAmount; } else { myArray[i]["RECOVERY_AMT"] = ""; };
                    myArray[i]["CASH_DEPOSIT"] = la[i].cashDeposited;
                    if (la[i].depositDate !== null) { myArray[i]["DEPOSIT_DT"] = la[i].depositDate; } else { myArray[i]["DEPOSIT_DT"] = ""; };
                    myArray[i]["REMARKS"] = la[i].remarks;
                    if (la[i].gratuityFlag === true) { myArray[i]["GRATUITY_ELG"] = "YES"; } else { myArray[i]["GRATUITY_ELG"] = "NO"; };
                }
                $scope.fafdata = myArray;
                $scope.exportObj = myArray;
                $scope.$digest();
            } else if (usr.status === 400) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var str = usr.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString(); var fields = str.split(','); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er +
                    "</strong></div>"; $("#MessageBox").show();
                $("#eCode").val(""); $("#empName").val(""); $("#designation").val(""); $("#station").val(""); $("#joinDate").val(""); $("#relieveDate").val("");
                $("#mode").val(""); $("#gratuity").val(""); $("#documentNo").val(""); $("#recoveryAmount").val(""); $("#cashDeposited").val(""); $("#depositDate").val("");
                $("#remarks").val("");
            };
        }; usr.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    $scope.exportAllData = function (name) {
        setTimeout(function () {
            $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
            var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = name + d;
            $scope.JSONToCSVConvertor($scope.exportObj, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv")
        }, 100)
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) {
            var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n"
        } if ("" === CSV) return void alert("Invalid data"); var fileName = ""; fileName += ReportTitle.replace(/ /g, "_"); var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link)
    };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });