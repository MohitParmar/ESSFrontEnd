﻿var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]); app.controller("EmployeeListCntroller", function ($scope, $http) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), $scope.currentPage = 1, $scope.itemsPerPage = 10, $scope.alluserlist = []; $scope._Conpath = ""; var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol; $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") });
    $scope.jsondata; $scope.GetReleaseStrategy = function () { var rls = new XMLHttpRequest; rls.open("GET", $scope._Conpath + "ReleaseStrategy/GetReleaseStrategy?empunqid=" + $("#myEmpUnqId").val(), !0), rls.setRequestHeader("Accept", "application/json"), rls.onreadystatechange = function () { if (4 === rls.readyState) { var json = JSON.parse(rls.responseText); $scope.rlsdata = json, $scope.$digest() } }, rls.send() };
    $scope.GetEmployeeList = function () {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var empdtl = new XMLHttpRequest;
        empdtl.open("GET", $scope._Conpath + "Employee/GetEmployees?location=" + $("#myLoc").val(), !0), empdtl.setRequestHeader("Accept", "application/json");
        empdtl.onreadystatechange = function () {
            if (4 === empdtl.readyState) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"); var json = JSON.parse(empdtl.responseText);
                al = new Array; al = json; for (var myArray = [], i = 0; i < al.length; i++) {
                    myArray.push([]), myArray[i].SAPID = al[i].empUnqId, myArray[i].EmpName = al[i].empName, myArray[i].FatherName = al[i].fatherName;
                    myArray[i].Email = al[i].email, myArray[i].UnitName = al[i].unitName, myArray[i].DeptName = al[i].deptName, myArray[i].StatName = al[i].statName;
                    myArray[i].CatName = al[i].catName, myArray[i].DesgName = al[i].desgName; myArray[i].VillageOrCity = al[i].hrCity; myArray[i].SocietyOrLocationOrArea = al[i].hrSociety;
                    var houseNumber, societyName, areaName, landMark, preCity, tehsil, policeStation, preDistrict, preState, prePin;
                    houseNumber = null === al[i].houseNumber || "" === al[i].houseNumber ? "" : al[i].houseNumber + ",";
                    societyName = null === al[i].societyName || "" === al[i].societyName ? "" : al[i].societyName + ",";
                    areaName = null === al[i].areaName || "" === al[i].areaName ? "" : al[i].areaName + ",";
                    landMark = null === al[i].landMark || "" === al[i].landMark ? "" : al[i].landMark + ",";
                    preCity = null === al[i].preCity || "" === al[i].preCity ? "" : al[i].preCity + ",";
                    tehsil = null === al[i].tehsil || "" === al[i].tehsil ? "" : al[i].tehsil + ",";
                    policeStation = null === al[i].policeStation || "" === al[i].policeStation ? "" : al[i].policeStation + ",";
                    preDistrict = null === al[i].preDistrict || "" === al[i].preDistrict ? "" : al[i].preDistrict + ",";
                    preState = null === al[i].preState || "" === al[i].preState ? "" : al[i].preState + ",";
                    prePin = null === al[i].prePin || "" === al[i].prePin ? "" : al[i].prePin;
                    var fadd = houseNumber + societyName + areaName + landMark + preCity + tehsil + policeStation + preDistrict + preState + prePin;
                    myArray[i].FullAddress = fadd;
                    myArray[i].PresentHouseNumber = al[i].houseNumber, myArray[i].PresentSocietyName = al[i].societyName, myArray[i].PresentAreaName = al[i].areaName;
                    myArray[i].PresentLandMark = al[i].landMark, myArray[i].PresentCity = al[i].preCity, myArray[i].PresentTehsil = al[i].tehsil;
                    myArray[i].PresentPoliceStation = al[i].policeStation, myArray[i].PresentDistrict = al[i].preDistrict, myArray[i].PresentState = al[i].preState;
                    myArray[i].PresentPinCode = al[i].prePin, myArray[i].PresentPhone = al[i].prePhone, myArray[i].PresentResPhone = al[i].preResPhone;
                    myArray[i].PresentEmail = al[i].preEmail;
                    var companyAcc = al[i].companyAcc; companyAcc === !0 ? myArray[i].CompanyAccomodation = "Yes" : myArray[i].CompanyAccomodation = "No";
                    myArray[i].PermanentAdd1 = al[i].perAdd1, myArray[i].PermanentAdd2 = al[i].perAdd2, myArray[i].PermanentAdd3 = al[i].perAdd3;
                    myArray[i].PermanentAdd4 = al[i].perAdd4, myArray[i].PermanentCity = al[i].perCity, myArray[i].PermanentDistrict = al[i].perDistrict;
                    myArray[i].PermanentState = al[i].perState, myArray[i].PermanentPinCode = al[i].perPin, myArray[i].PermanentPhone = al[i].perPhone;
                    myArray[i].location = al[i].location;
                    var hrverified = al[i].hrVerified; hrverified === !0 ? myArray[i].HRVerified = "Yes" : myArray[i].HRVerified = "No";
                    var updatedate = al[i].updDt; null === updatedate ? myArray[i].UpdateDate = "" : myArray[i].UpdateDate = al[i].updDt.replace("T", " ")
                } $scope.alldata = myArray, $scope.jsondata = $scope.alldata, $scope.$digest();
            }
        }, empdtl.send()
    };
    $scope.Popup = function (empunqid) { $scope.GetEmpPresentAddress(empunqid); $("#addressModel").modal('show'); };
    $scope.GetEmpPresentAddress = function (empid) {
        var arr = new Array; preAdd = new XMLHttpRequest; preAdd.open("GET", $scope._Conpath + "EmpAddress/GetEmpAddress?empUnqId=" + empid, !0);
        preAdd.setRequestHeader("Accept", "application/json"); preAdd.onreadystatechange = function () {
            if (4 === preAdd.readyState) {
                json = JSON.parse(preAdd.responseText); tmparr = json;
                arr[0] = {
                    empUnqId: tmparr.empUnqId, houseNumber: tmparr.houseNumber, societyName: tmparr.societyName, areaName: tmparr.areaName, landMark: tmparr.landMark,
                    preCity: tmparr.preCity, tehsil: tmparr.tehsil, preDistrict: tmparr.preDistrict, preState: tmparr.preState, prePin: tmparr.prePin,
                    preEmail: tmparr.preEmail, prePhone: tmparr.prePhone, preResPhone: tmparr.preResPhone, policeStation: tmparr.policeStation,
                    hrCity: tmparr.hrCity, hrSociety: tmparr.hrSociety, counter: tmparr.counter
                };
                $("#txtHouseNumber").val(arr[0].houseNumber), $("#txtSocietyName").val(arr[0].societyName), $("#txtAreaName").val(arr[0].areaName);
                $("#txtLandMark").val(arr[0].landMark), $("#txtPreCity").val(arr[0].preCity), $("#txtTehsil").val(arr[0].tehsil), $("#pincode").val(arr[0].prePin);
                $("#txtemailid").val(arr[0].preEmail), $("#txtphoneno").val(arr[0].prePhone), $("#txtresno").val(arr[0].preResPhone);
                $("#txtPoliceStation").val(arr[0].policeStation);
                $("#txtdist").val(arr[0].preDistrict); $("#txtstate").val(arr[0].preState);
                $("#hrCity").val(arr[0].hrCity); $("#hrSociety").val(arr[0].hrSociety);
                $("#hidCounter").val(arr[0].counter);
                $("#hidEmpid").val(arr[0].empUnqId);
                $scope.$digest();
            };
        }; preAdd.send()
    };
    $scope.HRUpdateAddress = function () {
        var houseNumber = "", societyName = "", areaName = "", landMark = "", preCity = "", tehsil = "", pincode = "", phoneno = "", PreEmail = "", PrePoliceStation = "";
        var hrCity = "", hrSociety = "";
        houseNumber = $("#txtHouseNumber").val(); societyName = $("#txtSocietyName").val(); areaName = $("#txtAreaName").val(); landMark = $("#txtLandMark").val();
        preCity = $("#txtPreCity").val(); tehsil = $("#txtTehsil").val(); pincode = $("#pincode").val(); phoneno = $("#txtphoneno").val(); PreEmail = $("#txtemailid").val();
        PrePoliceStation = $("#txtPoliceStation").val(); hrCity = $("#hrCity").val(); hrSociety = $("#hrSociety").val()
        var jsonObj = {};
        jsonObj.EmpUnqId = $("#hidEmpid").val(); jsonObj.HouseNumber = houseNumber.toUpperCase(); jsonObj.SocietyName = societyName.toUpperCase();
        jsonObj.AreaName = areaName.toUpperCase(); jsonObj.LandMark = landMark.toUpperCase(); jsonObj.PreCity = preCity.toUpperCase();
        jsonObj.tehsil = tehsil.toUpperCase();
        jsonObj.PoliceStation = PrePoliceStation.toUpperCase(); jsonObj.PreState = $("#txtstate").val().toUpperCase();
        jsonObj.PreDistrict = $("#txtdist").val().toUpperCase();
        jsonObj.PreEmail = PreEmail.toUpperCase(); jsonObj.PrePin = pincode; jsonObj.PrePhone = phoneno; jsonObj.PreResPhone = $("#txtresno").val();
        jsonObj.HrCity = hrCity.toUpperCase();
        jsonObj.HrSociety = hrSociety.toUpperCase();
        jsonObj.Counter = $("#hidCounter").val();
        jsonObj = JSON.stringify(jsonObj);
        var addr = new XMLHttpRequest(); addr.open("PUT", $scope._Conpath + "EmpAddress/UpdateEmpAddressHr", true);
        addr.setRequestHeader("Content-type", "application/json");
        addr.onreadystatechange = function () {
            if (addr.readyState === 4 && addr.status === 200) {
                jQuery("#btnClose").click();
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Address / Contact Details Successfully Updated.. </strong></div>"; $("#MessageBox").show();
            } else if (addr.status === 400) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Address / Contact Details are not Saved.As no changes detected.</strong></div>"; $("#MessageBox").show(); }
        }; addr.send(jsonObj);
    }
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse }; $scope.exportAllData = function () { setTimeout(function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = "User_Address_Report_" + d; $scope.JSONToCSVConvertor($scope.jsondata, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv") }, 100) }, $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n" } if ("" === CSV) return void alert("Invalid data"); var fileName = ReportTitle.replace(/ /g, "_"), uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link) };
}); 