﻿var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]); app.controller("VaccinationCntroller", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), $scope._Conpath = ""; var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol;
    $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") });
    $scope.ResetView = function () { window.location.reload(!0) };
    $scope.exportObj, $scope.currentPage = 1, $scope.itemsPerPage = 25, jQuery.support.cors = !0;
    $scope.FirstDoseValidate = function () { var now = new Date, chkFrom = document.getElementById("dtFirstDose"), FromDate = chkFrom.value, date1 = new Date(FromDate), FirstDoseOn = new Date("2021-01-16"); return FirstDoseOn > date1 ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Correct Date of First Dose</strong></div>", $("#MessageBox").show(), document.getElementById("dtFirstDose").value = "", !1) : date1 > now ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Future Date not allowed.. </strong></div>", $("#MessageBox").show(), document.getElementById("dtFirstDose").value = "", !1) : void 0 }, $scope.Validate = function () { var now = new Date, chkFrom = document.getElementById("dtFirstDose"), FromDate = chkFrom.value, chkTo = document.getElementById("dtSecondDose"), ToDate = chkTo.value; if ("" === FromDate) return document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>First Dose Date is Mandatory</strong></div>", $("#MessageBox").show(), document.getElementById("dtSecondDose").value = "", !1; var date1 = new Date(FromDate), date2 = new Date(ToDate); return FromDate == ToDate ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Correct date for both Dose</strong></div>", $("#MessageBox").show(), document.getElementById("dtSecondDose").value = "", !1) : date1 > date2 ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Valid Dates.. </strong></div>", $("#MessageBox").show(), document.getElementById("dtSecondDose").value = "", !1) : date1 > now || date2 > now ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Future Date not allowed.. </strong></div>", $("#MessageBox").show(), document.getElementById("dtSecondDose").value = "", !1) : void 0 }, $scope.PrecautionValidate = function () { var now = new Date, chkFrom = document.getElementById("dtFirstDose"), FromDate = chkFrom.value, chkTo = document.getElementById("dtSecondDose"), ToDate = chkTo.value, chkPrecaution = document.getElementById("dtPrecautionDose"), PrecautionDate = chkPrecaution.value; if ("" === FromDate || "" === ToDate) return document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>First and Second Dose Date is Mandatory</strong></div>", $("#MessageBox").show(), document.getElementById("dtPrecautionDose").value = "", !1; var date1 = new Date(FromDate), date2 = new Date(ToDate), date3 = new Date(PrecautionDate); return FromDate == PrecautionDate || ToDate == PrecautionDate ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Correct date.</strong></div>", $("#MessageBox").show(), document.getElementById("dtPrecautionDose").value = "", !1) : date2 > date3 || date1 > date3 ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Valid Dates.. </strong></div>", $("#MessageBox").show(), document.getElementById("dtPrecautionDose").value = "", !1) : date1 > now || date2 > now || date3 > now ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Future Date not allowed.. </strong></div>", $("#MessageBox").show(), document.getElementById("dtPrecautionDose").value = "", !1) : void 0 }, $scope.CertificateUpload = function (certData) { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var firstDose = $("#dtFirstDose").val(), secondDose = $("#dtSecondDose").val(), thirdDose = $("#dtPrecautionDose").val(); if ("undefined" == typeof certData) return alert("Please Enter Details"), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"), !1; var now = new Date, dtnow = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(), data = new FormData, files = $("#files").get(0).files; if (0 === files.length) return alert("Please Select Vaccination Certificate"), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"), !1; var jsonObj = {}; jsonObj.EmpUnqId = $("#myEmpUnqId").val(), jsonObj.FirstDoseDate = firstDose, jsonObj.SecondDoseDate = secondDose, jsonObj.ThirdDoseDate = thirdDose, jsonObj.UpdateDate = dtnow, jsonObj = JSON.stringify(jsonObj); var xhr = new XMLHttpRequest; xhr.open("POST", $scope._Conpath + "Vaccination/AddVaccinationData", !0), xhr.setRequestHeader("Content-type", "application/json"), xhr.onreadystatechange = function () { if (4 === xhr.readyState && 200 === xhr.status) { if (files.length > 0) for (f = 0; f < files.length; f++)data.append("UploadedImage", files[f]); $.ajax({ type: "PUT", url: $scope._Conpath + "Vaccination/CertificateUpload?empUnqId=" + $("#myEmpUnqId").val(), contentType: !1, processData: !1, data: data, success: function (result) { $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"), document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Uploaded Successfully...</strong></div>", $("#MessageBox").show(), document.getElementById("dtFirstDose").value = "", document.getElementById("dtSecondDose").value = "", document.getElementById("dtPrecautionDose").value = "", $scope.GetEmpVaccination() }, error: function (err) { $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"), document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please try after some time...</strong></div>", $("#MessageBox").show() } }) } else if (400 === xhr.status || 403 === xhr.status || 404 === xhr.status || 408 === xhr.status || 500 === xhr.status) { for (var str = xhr.responseText.replace("[", "").replace("]", "").toString(), fields = str.split(","), er = "", i = 0; i < fields.length; i++)er = er + fields[i] + "<br/>"; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er + "</strong></div>", $("#MessageBox").show(), document.getElementById("dtFirstDose").value = "", document.getElementById("dtSecondDose").value = "", document.getElementById("dtPrecautionDose").value = "" } }, xhr.send(jsonObj) }, $scope.GetFile = function () { var slpdls = new XMLHttpRequest; slpdls.open("GET", $scope._Conpath + "Vaccination/GetFile?empUnqId=" + $("#myEmpUnqId").val(), !0), slpdls.setRequestHeader("Accept", "application/json"), slpdls.responseType = "arraybuffer", slpdls.onload = function () { if (200 == slpdls.status) { var blob = new Blob([slpdls.response], { type: "application/pdf" }), objectUrl = URL.createObjectURL(blob); window.open(objectUrl) } else document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> File Not Found...</strong></div>", $("#MessageBox").show() }, slpdls.send() }, $scope.GetEmpVaccination = function () { var eva = new XMLHttpRequest; eva.open("GET", $scope._Conpath + "Vaccination/GetEmpVaccination?empunqid=" + $("#myEmpUnqId").val(), !0), eva.setRequestHeader("Accept", "application/json"), eva.onreadystatechange = function () { if (4 === eva.readyState && 200 === eva.status) { var json = JSON.parse(eva.responseText); $scope.evaData = json; var s = new Array; s[0] = $scope.evaData, $scope.evdata = s, $scope.$digest(); var FirstDoseDate = $scope.evdata[0].firstDoseDate; "" != FirstDoseDate && null != FirstDoseDate && (FirstDoseDate = $scope.evdata[0].firstDoseDate.substring(0, $scope.evdata[0].firstDoseDate.indexOf("T"))); var SecondDoseDate = $scope.evdata[0].secondDoseDate; "" != SecondDoseDate && null != SecondDoseDate && (SecondDoseDate = $scope.evdata[0].secondDoseDate.substring(0, $scope.evdata[0].secondDoseDate.indexOf("T"))); var PrecautionDoseDate = $scope.evdata[0].thirdDoseDate; "" != PrecautionDoseDate && null != PrecautionDoseDate && (PrecautionDoseDate = $scope.evdata[0].thirdDoseDate.substring(0, $scope.evdata[0].thirdDoseDate.indexOf("T"))), $("#dtFirstDose").val(FirstDoseDate), $("#dtSecondDose").val(SecondDoseDate), $("#dtPrecautionDose").val(PrecautionDoseDate) } }, eva.send() };
    $scope.GetVaccination = function () {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var vac = new XMLHttpRequest;
        vac.open("GET", $scope._Conpath + "Vaccination/GetVaccination", !0);
        vac.setRequestHeader("Accept", "application/json");
        vac.onreadystatechange = function () {
            if (4 === vac.readyState && 200 === vac.status) {
                var json = JSON.parse(vac.responseText);
                arr = new Array; arr = json; for (var myArray = [], i = 0; i < arr.length; i++) {
                    myArray.push([]), myArray[i].EmpUnqId = arr[i].empUnqId, myArray[i].EmpName = arr[i].employee.empName, myArray[i].StationName = arr[i].employee.statName, myArray[i].Category = arr[i].employee.catName, myArray[i].Designation = arr[i].employee.desgName; var FirstDoseDate = arr[i].firstDoseDate; "" != FirstDoseDate && null != FirstDoseDate ? myArray[i].FirstDoseDate = arr[i].firstDoseDate.substring(0, arr[i].firstDoseDate.indexOf("T")) : myArray[i].FirstDoseDate = ""; var SecondDoseDate = arr[i].secondDoseDate; "" != SecondDoseDate && null != SecondDoseDate ? myArray[i].SecondDoseDate = arr[i].secondDoseDate.substring(0, arr[i].secondDoseDate.indexOf("T")) : myArray[i].SecondDoseDate = ""; var PrecautionDoseDate = arr[i].thirdDoseDate; "" != PrecautionDoseDate && null != PrecautionDoseDate ? myArray[i].PrecautionDoseDate = arr[i].thirdDoseDate.substring(0, arr[i].thirdDoseDate.indexOf("T")) : myArray[i].PrecautionDoseDate = ""; var UpdateDate = arr[i].updateDate; "" != UpdateDate && null != UpdateDate ? myArray[i].UpdateDate = arr[i].updateDate : myArray[i].UpdateDate = ""
                };
                $scope.vacData = myArray;
                $scope.vacData = $filter("orderBy")($scope.vacData, "-UpdateDate");
                $scope.exportObj = $scope.vacData, $scope.$digest();
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
            } else { $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"); };
        }; vac.send();
    };
    $scope.GetFileEmpWise = function (eCode) { var slpdls = new XMLHttpRequest; slpdls.open("GET", $scope._Conpath + "Vaccination/GetFile?empUnqId=" + eCode, !0), slpdls.setRequestHeader("Accept", "application/json"), slpdls.responseType = "arraybuffer", slpdls.onload = function () { if (200 == slpdls.status) { var blob = new Blob([slpdls.response], { type: "application/pdf" }), objectUrl = URL.createObjectURL(blob); window.open(objectUrl) } else document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> File Not Found...</strong></div>", $("#MessageBox").show() }, slpdls.send() }, $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse }, $scope.exportAllData = function (name) { setTimeout(function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = name + d; $scope.JSONToCSVConvertor($scope.exportObj, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv") }, 100) }, $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n" } if ("" === CSV) return void alert("Invalid data"); var fileName = ""; fileName += ReportTitle.replace(/ /g, "_"); var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link) }
}), app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });