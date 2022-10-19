var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("VehicleGatePassCntroller", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val();
    $scope.currentPage = 1, $scope.itemsPerPage = 25, $scope.alluserlist = [], $scope._Conpath = "", $scope._AttdConPath = "";
    var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol;
    $(document).ready(function () {
        "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/", "undefined" != typeof _AttdConPath && (urlhost === _URLHostName ? $scope._AttdConPath = _AttdConPath : $scope._AttdConPath = urlprotocol + "//" + urlhost + "/api/"))
    });
    $scope.VGPInfo, jQuery.support.cors = !0;
    $scope.LoadData = function (str) {
        "OUT" === str && ($("#divOUT").show(), $("#divIN").hide(), $("#outinmsg").text("OUT")), "IN" === str && ($("#divOUT").hide(), $("#divIN").show(), $("#outinmsg").text("IN"))
    };
    $scope.VehicleNewGPInfo = function () {
        var count = 0, out = new XMLHttpRequest; out.open("GET", $scope._AttdConPath + "Vehicle/GET?type=", !0), out.setRequestHeader("Accept", "application/json"), out.onreadystatechange = function () { if (4 === out.readyState && 200 === out.status) { var json = JSON.parse(out.responseText), vo = new Array; vo = json; for (var outArray = [], i = 0; i < vo.length; i++) { var VGPStatus = vo[i].VehicleStatus; "N" === VGPStatus && (outArray.push([]), outArray[count].LogID = vo[i].LogID, outArray[count].VehicleNo = vo[i].VehicleNo, outArray[count].StartKM = vo[i].StartKM, outArray[count].DriverName = vo[i].DriverName, outArray[count].LogDate = vo[i].LogDate, outArray[count].PlaceToVisit = vo[i].PlaceToVisit, count++) } $scope.outdata = outArray, $scope.outdata = $filter("orderBy")($scope.outdata, "-LogID"), $scope.$digest() } }, out.send()
    };
    $scope.VehicleOutGPInfo = function () {
        var count1 = 0, vgpin = new XMLHttpRequest; vgpin.open("GET", $scope._AttdConPath + "Vehicle/GET?type=", !0), vgpin.setRequestHeader("Accept", "application/json"), vgpin.onreadystatechange = function () { if (4 === vgpin.readyState && 200 === vgpin.status) { var json = JSON.parse(vgpin.responseText), vi = new Array; vi = json; for (var inArray = [], i = 0; i < vi.length; i++) { var VGPStatus = vi[i].VehicleStatus; "O" === VGPStatus && (inArray.push([]), inArray[count1].LogID = vi[i].LogID, inArray[count1].VehicleNo = vi[i].VehicleNo, inArray[count1].DriverName = vi[i].DriverName, inArray[count1].LogDate = vi[i].LogDate, inArray[count1].Outtime = vi[i].Outtime, inArray[count1].PlaceToVisit = vi[i].PlaceToVisit, count1++) } $scope.indata = inArray, $scope.indata = $filter("orderBy")($scope.indata, "-LogID"), $scope.$digest() } }, vgpin.send()
    };
    $scope.VehicleGateINOUT = function (logid, statusflg) {
        var retVal = confirm("LogID : " + logid); if (retVal === !0) { var vgpio = new XMLHttpRequest; vgpio.open("POST", $scope._AttdConPath + "Vehicle/UpdateTime?LogID=" + logid + "&IOFLG=" + statusflg, !0), vgpio.setRequestHeader("accept", "application/json"), vgpio.onreadystatechange = function () { if (4 === vgpio.readyState && 200 === vgpio.status) { var json = JSON.parse(vgpio.responseText); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + json.errorMessage + "</strong></div>", $("#MessageBox").show() } else if (400 === vgpio.status) { var json1 = JSON.parse(vgpio.responseText); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> " + json1.errorMessage + " </strong></div>", $("#MessageBox").show() } $scope.VehicleNewGPInfo(), $scope.VehicleOutGPInfo() }, vgpio.send() }
    };
    $scope.VehicleGatePassReport = function () {
        var count2 = 0, vgpr = new XMLHttpRequest;
        vgpr.open("GET", $scope._AttdConPath + "Vehicle/Get?type=REPORT", !0);
        vgpr.setRequestHeader("Accept", "application/json");
        vgpr.onreadystatechange = function () {
            if (4 === vgpr.readyState && 200 === vgpr.status) {
                var json = JSON.parse(vgpr.responseText); vgp = new Array; vgp = json;
                for (var myArray = [], i = 0; i < vgp.length; i++) {
                    vgp[i].VehicleStatus, myArray.push([]), myArray[count2].LogID = vgp[i].LogID;
                    myArray[count2].LogDate = vgp[i].LogDate, myArray[count2].VehicleNo = vgp[i].VehicleNo;
                    myArray[count2].DriverName = vgp[i].DriverName;
                    var outtime = vgp[i].Outtime; if ("" !== outtime) {
                        var d = new Date(outtime);
                        outtime = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
                        myArray[count2].Outtime = outtime;
                    } else myArray[count2].Outtime = vgp[i].Outtime;
                    var intime = vgp[i].InTime; if ("" !== intime) {
                        var t = new Date(intime);
                        intime = t.getDate() + "/" + (t.getMonth() + 1) + "/" + t.getFullYear() + " " + t.getHours() + ":" + t.getMinutes();
                        myArray[count2].InTime = intime;
                    } else myArray[count2].InTime = vgp[i].InTime;
                    myArray[count2].StartKM = vgp[i].StartKM, myArray[count2].EndKM = vgp[i].EndKM;
                    vgp[i].EndKM > 0 ? myArray[count2].TotalKM = vgp[i].EndKM - vgp[i].StartKM : myArray[count2].TotalKM = "";
                    myArray[count2].TripFrom = vgp[i].TripFrom, myArray[count2].TripVIA = vgp[i].TripVIA;
                    myArray[count2].PlaceToVisit = vgp[i].PlaceToVisit, myArray[count2].VehicleStatus = vgp[i].VehicleStatus;
                    myArray[count2].GateOut = vgp[i].GateOutFlg, myArray[count2].GateIn = vgp[i].GateInFlg, count2++;
                };
                $scope.vgprdata = myArray, $scope.vgprdata = $filter("orderBy")($scope.vgprdata, "-LogID");
                $scope.VGPInfo = $scope.vgprdata, $scope.$digest();
            };
        }; vgpr.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    $scope.exportAllData = function () {
        setTimeout(function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = "Vehicle_Gate_Pass_Report_" + d; $scope.JSONToCSVConvertor($scope.VGPInfo, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv") }, 100)
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n" } if ("" === CSV) return void alert("Invalid data"); var fileName = ReportTitle.replace(/ /g, "_"), uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link)
    };
});