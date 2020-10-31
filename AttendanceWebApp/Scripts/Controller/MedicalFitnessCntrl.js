var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("MedicalFitnessController", function ($scope, $http) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), jQuery.support.cors = true, $scope.currentPage = 1, $scope.itemsPerPage = 10, $scope.alluserlist = [], $scope._Conpath = ""; var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol;
    $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"); });
    $scope.ResetView = function () { window.location.reload(true) }; var blockArr = []; $scope.FitnessInfo;
    $scope.GetEmpBlock = function () {
        var eCode = $("#eCode").val();
        if ("" === eCode)
            return document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Valid Employee Code</strong></div>",
                $("#MessageBox").show(), false;
        var xhr = new XMLHttpRequest; xhr.open("GET", $scope._Conpath + "MedicalFitness/GetEmpBlock?empUnqId=" + eCode, true); xhr.setRequestHeader("Accept", "application/json"), xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                var json = JSON.parse(xhr.responseText);
                blockArr[0] = json, $scope.blockData = blockArr;
                var cardBlockedDays = 0; var date2 = new Date(); var blockdate = blockArr[0]["blockDt"];
                var date1, diffTime, cardBlockedDays;
                if (blockdate !== null) {
                    date1 = new Date(blockdate); diffTime = Math.abs(date2 - date1); cardBlockedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                };
                blockArr[0]["cardBlockedDays"] = cardBlockedDays || 0; $scope.curPage = 0, $scope.pageSize = 10, $scope.$digest();
            };
        }, xhr.send();
    };
    $scope.CreateMedFitness = function (data) {
        if ((typeof (data) === "undefined") || (typeof (data.Remarks) === "undefined") || (typeof (data.FitUnfit) === "undefined")) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Remarks and FIT / UNFIT for Submit.</strong></div>"; $("#MessageBox").show(); return false;
        };
        var d = new Date(); var now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        var jsonObj = {}; jsonObj.Id = 0; jsonObj.TestDate = now; jsonObj.EmpUnqId = blockArr[0]["empUnqId"];
        if (blockArr[0]["blockDt"] === null) { jsonObj.CardBlockedOn = null; } else { jsonObj.CardBlockedOn = blockArr[0]["blockDt"] || null; };
        if (blockArr[0]["cardBlockedDays"] === null) { jsonObj.CardBlockedDays = 0; } else { jsonObj.CardBlockedDays = blockArr[0]["cardBlockedDays"] || 0; };
        if (blockArr[0]["blockRemark"] === null) { jsonObj.CardBlockedReason = ""; } else { jsonObj.CardBlockedReason = blockArr[0]["blockRemark"].toUpperCase() || ""; };
        jsonObj.FitnessFlag = data.FitUnfit; jsonObj.Remarks = data.Remarks.toUpperCase(); jsonObj.AddDt = now; jsonObj.AddUser = $("#myEmpUnqId").val();
        jsonObj = JSON.stringify(jsonObj);
        var xhr1 = new XMLHttpRequest; xhr1.open("POST", $scope._Conpath + "MedicalFitness/CreateMedFitness", true);
        xhr1.setRequestHeader("Content-type", "application/json"); xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4 && xhr1.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Medical Fitness Submitted.</strong></div>"; $("#MessageBox").show();
                $scope.ResetView();
            } else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Medical Fitness Not Submitted.</strong></div>"; $("#MessageBox").show();
            };
        }, xhr1.send(jsonObj);
    };
    $scope.GetMedFitness = function (fitData) {
        $("#loading").removeClass("deactivediv"); $("#loading").addClass("activediv"); var fromDate, toDate;
        if ((typeof (fitData) === "undefined") || (typeof (fitData.fromDt) === "undefined") || (typeof (fitData.toDt) === "undefined")) {
            var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            fromDate = (firstDay.getFullYear()) + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate();
            toDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + (lastDay.getDate());
        } else { fromDate = fitData.fromDt; toDate = fitData.toDt; };
        var xhr2 = new XMLHttpRequest; xhr2.open("GET", $scope._Conpath + "MedicalFitness/GetMedFitness?fromDt=" + fromDate + "&toDt=" + toDate, true);
        xhr2.setRequestHeader("Accept", "application/json"), xhr2.onreadystatechange = function () {
            if (4 === xhr2.readyState) {
                var json = JSON.parse(xhr2.responseText); var la = json; var cnt = 0; var myArray = [];
                for (var i = 0; i < la.length; i++) {
                    myArray.push([]);
                    myArray[cnt]["WorkGroup"] = la[i].wrkGrpDesc;
                    myArray[cnt]["EmpCode"] = la[i].empUnqId;
                    myArray[cnt]["EmpName"] = la[i].empName;
                    myArray[cnt]["Dept"] = la[i].deptName;
                    myArray[cnt]["Stat"] = la[i].statName;
                    myArray[cnt]["Cat"] = la[i].catName;
                    myArray[cnt]["Desg"] = la[i].desgName;
                    myArray[cnt]["CardBlockedOn"] = la[i].cardBlockedOn ? la[i].cardBlockedOn.substring(0, la[i].cardBlockedOn.indexOf("T")) : "";
                    myArray[cnt]["CardBlockedDays"] = la[i].cardBlockedDays;
                    myArray[cnt]["CardBlockedReason"] = la[i].cardBlockedReason;
                    var fit = la[i].fitnessFlag; if (fit === true) { myArray[cnt]["FitStatus"] = "FIT"; } else { myArray[cnt]["FitStatus"] = "UNFIT"; };
                    myArray[cnt]["FitRemarks"] = la[i].remarks;
                    myArray[cnt]["FitDate"] = la[i].addDt ? la[i].addDt.substring(0, la[i].addDt.indexOf("T")) : "";
                    myArray[cnt]["FitnessBy"] = la[i].addUser;
                    cnt++;
                }
                $scope.fitnessData = myArray, $scope.FitnessInfo = $scope.fitnessData, $scope.curPage = 0, $scope.pageSize = 10, $scope.$digest();
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
            };
        }, xhr2.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    $scope.exportAllData = function (name) { setTimeout(function () { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var d = new Date(); d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = name + "_" + d; $scope.JSONToCSVConvertor($scope.FitnessInfo, FileName, true); $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); }, 100); };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData; var CSV = ''; CSV += ReportTitle + '\r\n\n'; if (ShowLabel) { var row = ""; for (var index in arrData[0]) { row += index + ','; } row = row.slice(0, -1); CSV += row + '\r\n'; }; for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; } row.slice(0, row.length - 1); CSV += row + '\r\n'; }; if (CSV === '') { alert("Invalid data"); return; }; var fileName = ""; fileName += ReportTitle.replace(/ /g, "_"); var uri = 'data:text/csv;charset=utf-8,' + escape(CSV); var link = document.createElement("a"); link.href = uri; link.style = "visibility:hidden"; link.download = fileName + ".csv"; document.body.appendChild(link); link.click(); document.body.removeChild(link); };
}); app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });