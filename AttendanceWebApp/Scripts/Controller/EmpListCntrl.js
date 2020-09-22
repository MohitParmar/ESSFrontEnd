var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('EmployeeListCntroller', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 50; $scope.alluserlist = []; $scope.jsondata; $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.GetReleaseStrategy = function () { var rls = new XMLHttpRequest(); rls.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?empunqid=' + $('#myEmpUnqId').val(), true); rls.setRequestHeader('Accept', 'application/json'); rls.onreadystatechange = function () { if (rls.readyState === 4) { var json = JSON.parse(rls.responseText); $scope.rlsdata = json; $scope.$digest(); } }; rls.send(); };
    $scope.GetEmployeeList = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var empdtl = new XMLHttpRequest(); empdtl.open('GET', $scope._Conpath + 'Employee/GetEmployees?location=' + $('#myLoc').val(), true); empdtl.setRequestHeader('Accept', 'application/json'); empdtl.onreadystatechange = function () {
            if (empdtl.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); var json = JSON.parse(empdtl.responseText); var al = new Array; al = json; var myArray = [];
                for (var i = 0; i < al.length; i++) {
                    myArray.push([]); myArray[i]["SAPID"] = al[i].empUnqId; myArray[i]["EmpName"] = al[i].empName; myArray[i]["FatherName"] = al[i].fatherName; myArray[i]["Email"] = al[i].email;
                    myArray[i]["UnitName"] = al[i].unitName; myArray[i]["DeptName"] = al[i].deptName; myArray[i]["StatName"] = al[i].statName; myArray[i]["CatName"] = al[i].catName;
                    myArray[i]["DesgName"] = al[i].desgName;
                    var houseNumber, societyName, areaName, landMark, preCity, tehsil, policeStation, preDistrict, preState, prePin;
                    if (al[i].houseNumber === null || al[i].houseNumber === '') { houseNumber = ""; } else { houseNumber = al[i].houseNumber + ","; };
                    if (al[i].societyName === null || al[i].societyName === '') { societyName = ""; } else { societyName = al[i].societyName + ","; };
                    if (al[i].areaName === null || al[i].areaName === '') { areaName = ""; } else { areaName = al[i].areaName + ","; };
                    if (al[i].landMark === null || al[i].landMark === '') { landMark = ""; } else { landMark = al[i].landMark + ","; };
                    if (al[i].preCity === null || al[i].preCity === '') { preCity = ""; } else { preCity = al[i].preCity + ","; };
                    if (al[i].tehsil === null || al[i].tehsil === '') { tehsil = ""; } else { tehsil = al[i].tehsil + ","; };
                    if (al[i].policeStation === null || al[i].policeStation === '') { policeStation = ""; } else { policeStation = al[i].policeStation + ","; };
                    if (al[i].preDistrict === null || al[i].preDistrict === '') { preDistrict = ""; } else { preDistrict = al[i].preDistrict + ","; };
                    if (al[i].preState === null || al[i].preState === '') { preState = ""; } else { preState = al[i].preState + ","; };
                    if (al[i].prePin === null || al[i].prePin === '') { prePin = ""; } else { prePin = al[i].prePin; };
                    var fadd = houseNumber + societyName + areaName + landMark + preCity + tehsil + policeStation + preDistrict + preState + prePin;
                    myArray[i]["FullAddress"] = fadd;
                    myArray[i]["PresentHouseNumber"] = al[i].houseNumber; myArray[i]["PresentSocietyName"] = al[i].societyName;
                    myArray[i]["PresentAreaName"] = al[i].areaName; myArray[i]["PresentLandMark"] = al[i].landMark; myArray[i]["PresentCity"] = al[i].preCity;
                    myArray[i]["PresentTehsil"] = al[i].tehsil; myArray[i]["PresentPoliceStation"] = al[i].policeStation; myArray[i]["PresentDistrict"] = al[i].preDistrict;
                    myArray[i]["PresentState"] = al[i].preState; myArray[i]["PresentPinCode"] = al[i].prePin;
                    myArray[i]["PresentPhone"] = al[i].prePhone; myArray[i]["PresentResPhone"] = al[i].preResPhone;
                    myArray[i]["PresentEmail"] = al[i].preEmail;
                    var companyAcc = al[i].companyAcc; if (companyAcc === true) { myArray[i]["CompanyAccomodation"] = "Yes"; } else { myArray[i]["CompanyAccomodation"] = "No"; };
                    myArray[i]["PermanentAdd1"] = al[i].perAdd1; myArray[i]["PermanentAdd2"] = al[i].perAdd2; myArray[i]["PermanentAdd3"] = al[i].perAdd3; myArray[i]["PermanentAdd4"] = al[i].perAdd4;
                    myArray[i]["PermanentCity"] = al[i].perCity; myArray[i]["PermanentDistrict"] = al[i].perDistrict; myArray[i]["PermanentState"] = al[i].perState;
                    myArray[i]["PermanentPinCode"] = al[i].perPin; myArray[i]["PermanentPhone"] = al[i].perPhone; myArray[i]["location"] = al[i].location;
                    var hrverified = al[i].hrVerified; if (hrverified === true) { myArray[i]["HRVerified"] = "Yes"; } else { myArray[i]["HRVerified"] = "No"; };
                    var updatedate = al[i].updDt; if (updatedate === null) { myArray[i]["UpdateDate"] = ''; } else { myArray[i]["UpdateDate"] = al[i].updDt.replace('T', ' '); };
                }; $scope.alldata = myArray; $scope.jsondata = $scope.alldata; $scope.$digest();
            };
        }; empdtl.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; }; $scope.exportAllData = function () { setTimeout(function () { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var d = new Date(); d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = "User_Address_Report_" + d; $scope.JSONToCSVConvertor($scope.jsondata, FileName, true); $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); }, 100); }; $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData; var CSV = ''; CSV += ReportTitle + '\r\n\n'; if (ShowLabel) { var row = ""; for (var index in arrData[0]) { row += index + ','; } row = row.slice(0, -1); CSV += row + '\r\n'; }; for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; } row.slice(0, row.length - 1); CSV += row + '\r\n'; } if (CSV === '') { alert("Invalid data"); return; } var fileName = ReportTitle.replace(/ /g, "_"); var uri = 'data:text/csv;charset=utf-8,' + escape(CSV); var link = document.createElement("a"); link.href = uri; link.style = "visibility:hidden"; link.download = fileName + ".csv"; document.body.appendChild(link); link.click(); document.body.removeChild(link); };
});
