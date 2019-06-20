var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('VehicleGatePassCntroller', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1; $scope.itemsPerPage = 25; $scope.alluserlist = [];
    $scope._Conpath = ''; $scope._AttdConPath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; }; }; if (typeof (_AttdConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._AttdConPath = _AttdConPath; } else { $scope._AttdConPath = urlprotocol + "//" + urlhost + "/api/"; }; }; });
    jQuery.support.cors = true;
    $scope.LoadData = function (str) { if (str === "OUT") { $('#divOUT').show(); $('#divIN').hide(); $('#outinmsg').text("OUT"); }; if (str === "IN") { $('#divOUT').hide(); $('#divIN').show(); $('#outinmsg').text("IN"); }; };
    //Vehical New Gate Pass Info
    $scope.VehicleNewGPInfo = function () {
        var count = 0; var out = new XMLHttpRequest(); out.open('GET', $scope._AttdConPath + 'Vehicle/GET?type=', true); out.setRequestHeader("Accept", "application/json");
        out.onreadystatechange = function () {
            if (out.readyState === 4 && out.status === 200) {
                var json = JSON.parse(out.responseText); var vo = new Array; vo = json; var outArray = [];
                for (var i = 0; i < vo.length; i++) {
                    var VGPStatus = vo[i].VehicleStatus;
                    if (VGPStatus === "N") {
                        outArray.push([]); outArray[count]["LogID"] = vo[i].LogID; outArray[count]["VehicleNo"] = vo[i].VehicleNo; outArray[count]["StartKM"] = vo[i].StartKM;
                        outArray[count]["DriverName"] = vo[i].DriverName; outArray[count]["LogDate"] = vo[i].LogDate; outArray[count]["PlaceToVisit"] = vo[i].PlaceToVisit;
                        count++;
                    };
                }; $scope.outdata = outArray; $scope.outdata = $filter('orderBy')($scope.outdata, '-LogID'); $scope.$digest();
            };
        }; out.send();
    };
    //Vehical Out Gate Pass Info
    $scope.VehicleOutGPInfo = function () {
        var count1 = 0;
        var vgpin = new XMLHttpRequest(); vgpin.open('GET', $scope._AttdConPath + 'Vehicle/GET?type=', true); vgpin.setRequestHeader("Accept", "application/json");
        vgpin.onreadystatechange = function () {
            if (vgpin.readyState === 4 && vgpin.status === 200) {
                var json = JSON.parse(vgpin.responseText); var vi = new Array; vi = json; var inArray = [];
                for (var i = 0; i < vi.length; i++) {
                    var VGPStatus = vi[i].VehicleStatus;
                    if (VGPStatus === "O") {
                        inArray.push([]); inArray[count1]["LogID"] = vi[i].LogID; inArray[count1]["VehicleNo"] = vi[i].VehicleNo;
                        inArray[count1]["DriverName"] = vi[i].DriverName; inArray[count1]["LogDate"] = vi[i].LogDate; inArray[count1]["Outtime"] = vi[i].Outtime;
                        inArray[count1]["PlaceToVisit"] = vi[i].PlaceToVisit; count1++;
                    };
                }; $scope.indata = inArray; $scope.indata = $filter('orderBy')($scope.indata, '-LogID'); $scope.$digest();
            };
        }; vgpin.send();
    };
    //Vehical Gate Pass Report
    $scope.VehicleGatePassReport = function () {
        var count2 = 0;
        var vgpr = new XMLHttpRequest(); vgpr.open('GET', $scope._AttdConPath + 'Vehicle/Get?type=REPORT', true); vgpr.setRequestHeader("Accept", "application/json");
        vgpr.onreadystatechange = function () {
            if (vgpr.readyState === 4 && vgpr.status === 200) {
                var json = JSON.parse(vgpr.responseText); var vgp = new Array; vgp = json; var myArray = [];
                for (var i = 0; i < vgp.length; i++) {
                    var VGPStatus = vgp[i].VehicleStatus;
                    myArray.push([]);
                    myArray[count2]["LogID"] = vgp[i].LogID;
                    myArray[count2]["LogDate"] = vgp[i].LogDate;
                    myArray[count2]["VehicleNo"] = vgp[i].VehicleNo;
                    myArray[count2]["DriverName"] = vgp[i].DriverName;
                    var outtime = vgp[i].Outtime; if (outtime !== "") { var d = new Date(outtime); outtime = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes(); myArray[count2]["Outtime"] = outtime; } else { myArray[count2]["Outtime"] = vgp[i].Outtime; };
                    var intime = vgp[i].InTime; if (intime !== "") { var t = new Date(intime); intime = t.getDate() + "/" + (t.getMonth() + 1) + "/" + t.getFullYear() + " " + t.getHours() + ":" + t.getMinutes(); myArray[count2]["InTime"] = intime; } else { myArray[count2]["InTime"] = vgp[i].InTime; };
                    myArray[count2]["StartKM"] = vgp[i].StartKM;
                    myArray[count2]["EndKM"] = vgp[i].EndKM;
                    myArray[count2]["TripFrom"] = vgp[i].TripFrom;
                    myArray[count2]["TripVIA"] = vgp[i].TripVIA;
                    myArray[count2]["PlaceToVisit"] = vgp[i].PlaceToVisit;
                    myArray[count2]["VehicleStatus"] = vgp[i].VehicleStatus;
                    count2++;
                }; $scope.vgprdata = myArray; $scope.vgprdata = $filter('orderBy')($scope.vgprdata, '-LogID'); $scope.$digest();
            };
        }; vgpr.send();
    };
    //Vehical Gate Pass IN/OUT 
    $scope.VehicleGateINOUT = function (logid, statusflg) {
        var retVal = confirm("LogID : " + logid); if (retVal === true) {
            var vgpio = new XMLHttpRequest();
            vgpio.open('POST', $scope._AttdConPath + 'Vehicle/UpdateTime?LogID=' + logid + '&IOFLG=' + statusflg, true); vgpio.setRequestHeader("accept", "application/json");
            vgpio.onreadystatechange = function () {
                if (vgpio.readyState === 4 && vgpio.status === 200) {
                    var json = JSON.parse(vgpio.responseText);
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + json.errorMessage + "</strong></div>"; $('#MessageBox').show();
                } else if (vgpio.status === 400) {
                    var json1 = JSON.parse(vgpio.responseText); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> " + json1.errorMessage + " </strong></div>"; $('#MessageBox').show();
                }; $scope.VehicleNewGPInfo(); $scope.VehicleOutGPInfo();
            }; vgpio.send();
        };
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
});