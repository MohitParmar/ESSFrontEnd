var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("TripController", function ($scope, $http, $filter) {
    /*$http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(),*/
    $scope.currentPage = 1, $scope.itemsPerPage = 50, $scope.alluserlist = [], $scope._Conpath = "";
    var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol;
    $(document).ready(function () {
        "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/");
    });
    var d = new Date(),
        Currentyear = d.getFullYear();
    $scope.jsondata;
    $scope.ResetView = function () {
        window.location.reload(!0);
    }
    $scope.AddUniformDetails = function (entity) {
        if ("undefined" == typeof entity || "undefined" == typeof entity.TrouserSize || "undefined" == typeof entity.ShirtSize) return alert("Please Fill All Required Details .. "),
            !1;
        var jsonObj = {};
        jsonObj.EmpUnqId = $("#myEmpUnqId").val(), jsonObj.Year = Currentyear, jsonObj.TrouserSize = entity.TrouserSize,
            jsonObj.ShirtSize = entity.ShirtSize, jsonObj.UpdUser = $("#myEmpUnqId").val(),
            jsonObj = JSON.stringify(jsonObj);
        var Unf = new XMLHttpRequest();
        Unf.open("POST", $scope._Conpath + "EmpUniform/UpdateUniform", !0), Unf.setRequestHeader("Content-type", "application/json"),
            Unf.onreadystatechange = function () {
                4 === Unf.readyState && 200 === Unf.status ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Uniform Details Updated Successfully.. </strong></div>",
                    $("#MessageBox").show(), document.getElementById("txtShirtSize").value = "", document.getElementById("txtTrouserSize").value = "",
                    $scope.GetUniformDetails()) : 400 === Unf.status && (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Uniform Details not Saved.. </strong></div>",
                        $("#MessageBox").show(), document.getElementById("txtShirtSize").value = "", document.getElementById("txtTrouserSize").value = "");
            }, Unf.send(jsonObj);
    };
    $scope.GetUniformDetails = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", $scope._Conpath + "EmpUniform/GetEmpUniform?year=0&empUnqId=" + $("#myEmpUnqId").val(), !0),
            xhr.setRequestHeader("Accept", "application/json"), xhr.onreadystatechange = function () {
                if (4 === xhr.readyState) {
                    var json = JSON.parse(xhr.responseText);
                    $scope.data = json, $scope.$digest();
                }
            }, xhr.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse; };
    $scope.exportAllData = function () {
        setTimeout(function () {
            $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
            var d = new Date();
            d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = "Uniform_Master_List_" + d;
            $scope.JSONToCSVConvertor($scope.jsondata, FileName, !0), $("#loading").removeClass("activediv"),
                $("#loading").addClass("deactivediv");
        }, 100);
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = "";
        if (CSV += ReportTitle + "\r\n\n", ShowLabel) {
            var row = "";
            for (var index in arrData[0]) row += index + ",";
            row = row.slice(0, -1), CSV += row + "\r\n";
        }
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i]) row += '"' + arrData[i][index] + '",';
            row.slice(0, row.length - 1), CSV += row + "\r\n";
        }
        if ("" === CSV) return void alert("Invalid data");
        var fileName = "MyReport_";
        fileName += ReportTitle.replace(/ /g, "_");
        var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a");
        link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv",
            document.body.appendChild(link), link.click(), document.body.removeChild(link);
    };
});