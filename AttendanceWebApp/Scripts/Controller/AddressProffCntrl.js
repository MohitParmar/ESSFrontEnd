var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("AddressProffController", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(); var url_string = window.location.href;
    var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $scope._Conpath = "";
    "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/");
    $scope.currentPage = 1; $scope.itemsPerPage = 25;
    $scope.ResetView = function () { window.location.reload(!0) };
    jQuery.support.cors = true; $scope.exportObj; $scope.addUsr;
    $scope.enabledOther = function (a) {
        if (a === "OTHERS") { document.getElementById("others").disabled = false; }
        else { document.getElementById("others").disabled = true; }
    };
    $scope.CreateRequest = function (aprObj) {
        document.getElementById("btnSubmit").disabled = true;
        var jsonObj = {}; jsonObj.Id = 0; jsonObj.EmpUnqId = $("#myEmpUnqId").val();
        if (aprObj.purpose === "OTHERS") { jsonObj.Purpose = aprObj.others; } else { jsonObj.Purpose = aprObj.purpose; }
        jsonObj = JSON.stringify(jsonObj);
        var APR = new XMLHttpRequest;
        APR.open("POST", $scope._Conpath + "AddressProof/AddressProofRequest", !0);
        APR.setRequestHeader("Content-Type", "application/json");
        APR.onreadystatechange = function () {
            if (APR.readyState === 4 && APR.status === 200) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" +
                    "Submited Successfully..</strong></div>";
                $("#MessageBox").show();
                document.getElementById("btnSubmit").disabled = false;
                $("#eCode").val("");
                $("#empName").val("");
                $("#designation").val("");
                $("#station").val("");
                $("#joinDate").val("");
                $("#relieveDate").val("");
            } else if (APR.status === 400) {
                var str = APR.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString();
                var fields = str.split(',');
                var er = "";
                for (var i = 0; i < fields.length; i++) {
                    er = er + fields[i] + "<br/>";
                };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er +
                    "</strong></div>";
                $("#MessageBox").show();
                document.getElementById("btnSubmit").disabled = false;
            };
        }; APR.send(jsonObj);
    };
    $scope.GetEmpAddProof = function () {
        var eap = new XMLHttpRequest;
        eap.open("GET", $scope._Conpath + "AddressProof/getempaddproof?empUnqId=" + $("#myEmpUnqId").val(), !0);
        eap.setRequestHeader("Accept", "application/json");
        eap.onreadystatechange = function () {
            if (eap.readyState === 4 && eap.status === 200) { var json = JSON.parse(eap.responseText); $scope.eapData = json; $scope.$digest(); }
            else if (eap.status === 400) {
                var str = eap.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString();
                var fields = str.split(','); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er +
                    "</strong></div>";
                $("#MessageBox").show();
            };
        }; eap.send();
    };
    //$scope.GetPendingRequests = function () {
    /*var GPR = new XMLHttpRequest;
    GPR.open("GET", $scope._Conpath + "AddressProof/getrequests", !0);
    GPR.setRequestHeader("Accept", "application/json");
    GPR.onreadystatechange = function () {
        if (GPR.readyState === 4 && GPR.status === 200) {
            var json = JSON.parse(GPR.responseText);
            $scope.gprData = json;
            $scope.$digest();
        } else if (GPR.status === 400) {
            var str = GPR.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString();
            var fields = str.split(','); var er = "";
            for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er +
                "</strong></div>";
            $("#MessageBox").show();
        };
    }; GPR.send();
};*/
    //$scope.ReleaseRequest = function (r, id, sts) {
    /*var rmks = '';
    if (sts === "R") {
        if ((typeof (r) === "undefined") || (typeof (r.Remarks) === "undefined")) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Remarks First For Rejection</strong></div>"; $('#MessageBox').show(); return false;
        } else { rmks = r.Remarks; };
    } else { if ((typeof (r) === "undefined")) { rmks = ""; } else { rmks = r.Remarks; }; };
    var jsonObj = {};
    jsonObj.Id = id;
    jsonObj.HrReleaseStatusCode = sts;
    jsonObj.HrRemarks = rmks;
    jsonObj.HrUser = $("#myEmpUnqId").val();
    jsonObj = JSON.stringify(jsonObj);
    var RAR = new XMLHttpRequest;
    RAR.open("PUT", $scope._Conpath + "AddressProof/ReleaseRequest", !0);
    RAR.setRequestHeader("Content-Type", "application/json");
    RAR.onreadystatechange = function () {
        if (RAR.readyState === 4 && RAR.status === 200) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-success alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" +
                "Submited Successfully..</strong></div>";
            $("#MessageBox").show();
            $scope.GetPendingRequests();
        } else if (RAR.status === 400) {
            var str = RAR.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString();
            var fields = str.split(','); var er = "";
            for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er +
                "</strong></div>"; $("#MessageBox").show();
        };
    }; RAR.send(jsonObj);
};*/
    $scope.PopulateData = function (obj) { $scope.GetPresentAddress(obj); $('#ConformModel').modal('show'); };
    $scope.GetPresentAddress = function (getobj) {
        var ff = getobj;
        var preAdd = new XMLHttpRequest;
        preAdd.open("GET", $scope._Conpath + "EmpAddress/GetEmpAddress?empUnqId=" + ff.empUnqId, !0);
        preAdd.setRequestHeader("Accept", "application/json");
        preAdd.onreadystatechange = function () {
            if (4 === preAdd.readyState) {
                var json = JSON.parse(preAdd.responseText);
                var myArray = new Array(); var al = new Array; al = json; $scope.$digest();
                myArray.push([]);
                myArray[0].applicationDate = ff.applicationDate;
                myArray[0].purpose = ff.purpose;
                myArray[0].id = ff.id;
                myArray[0].SAPID = al.empUnqId;
                myArray[0].EMPNAME = $("#myEmpName").val();
                myArray[0].VillageOrCity = al.hrCity;
                myArray[0].SocietyOrLocationOrArea = al.hrSociety;
                var houseNumber, societyName, areaName, landMark, preCity, tehsil, policeStation, preDistrict, preState, prePin;
                houseNumber = null === al.houseNumber || "" === al.houseNumber ? "" : al.houseNumber + ",";
                societyName = null === al.societyName || "" === al.societyName ? "" : al.societyName + ",";
                areaName = null === al.areaName || "" === al.areaName ? "" : al.areaName + ",";
                landMark = null === al.landMark || "" === al.landMark ? "" : al.landMark + ",";
                preCity = null === al.preCity || "" === al.preCity ? "" : al.preCity + ",";
                tehsil = null === al.tehsil || "" === al.tehsil ? "" : al.tehsil + ",";
                policeStation = null === al.policeStation || "" === al.policeStation ? "" : al.policeStation + ",";
                preDistrict = null === al.preDistrict || "" === al.preDistrict ? "" : al.preDistrict + ",";
                preState = null === al.preState || "" === al.preState ? "" : al.preState + ",";
                prePin = null === al.prePin || "" === al.prePin ? "" : al.prePin;
                var fadd = houseNumber + societyName + areaName + landMark + preCity + tehsil + policeStation + preDistrict +
                    preState + prePin;
                myArray[0].FullAddress = fadd;
                myArray[0].PresentHouseNumber = houseNumber;
                myArray[0].PresentSocietyName = societyName;
                myArray[0].PresentAreaName = areaName;
                myArray[0].PresentLandMark = landMark;
                myArray[0].PresentCity = preCity;
                myArray[0].PresentTehsil = tehsil;
                myArray[0].PresentPoliceStation = policeStation;
                myArray[0].PresentDistrict = preDistrict;
                myArray[0].PresentState = preState;
                myArray[0].PresentPinCode = prePin;
                var hrverified = al.hrVerified; hrverified === !0 ? myArray[0].HRVerified = "Yes" : myArray[0].HRVerified = "No";
                var updatedate = al.updDt; null === updatedate ? myArray[0].UpdateDate = "" : myArray[0].UpdateDate = al.updDt.replace("T", " ");
                var emp = new XMLHttpRequest; emp.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + ff.empUnqId, !0);
                emp.setRequestHeader("Accept", "application/json"); emp.onreadystatechange = function () {
                    if (4 === emp.readyState) {
                        var json1 = JSON.parse(emp.responseText);
                        $scope.empdata = json1;
                        myArray[0].JoinDate = $scope.empdata[0].joinDate;
                        myArray[0].Designation = $scope.empdata[0].desgName;
                        $scope.preadddata = myArray;
                        $scope.$digest();
                    };
                }; emp.send();
            } else if (preAdd.status === 400) {
                var str = preAdd.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString();
                var fields = str.split(','); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er +
                    "</strong></div>";
                $("#MessageBox").show();
            };
        }; preAdd.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    $scope.exportAllData = function (name) { setTimeout(function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = name + d; $scope.JSONToCSVConvertor($scope.exportObj, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv") }, 100) };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n" } if ("" === CSV) return void alert("Invalid data"); var fileName = ""; fileName += ReportTitle.replace(/ /g, "_"); var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link) };
});