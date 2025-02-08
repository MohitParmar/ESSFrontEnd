var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("EmpRlsStrListCntroller", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), $scope.currentPage = 1, $scope.itemsPerPage = 50, $scope.alluserlist = [];
    var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol; var url_port = url.port;
    $scope._Conpath = ""; var loc = $("#myLoc").val();
    $(document).ready(function () {
        "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/")
    });
    $scope.jsondata;
    $scope.GetEmployeeReleaseStrategy = function (dtlObj) {
        var wrkGrp = dtlObj.wrkGrp, releaseGroupCode = dtlObj.rlsGrpCode;
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var rls = new XMLHttpRequest;
        rls.open("GET", $scope._Conpath + "Employee/GetEmpRelease?flag=false&wrkGrp=" + wrkGrp + "&releaseGroupCode=" + releaseGroupCode, !0);
        rls.setRequestHeader("Accept", "application/json");
        rls.onreadystatechange = function () {
            if (4 === rls.readyState) {
                $("#loading").removeClass("activediv");
                $("#loading").addClass("deactivediv");
                var json = JSON.parse(rls.responseText);
                la = new Array;
                la = json;
                for (var cnt = 0, myArray = [], i = 0; i < la.length; i++)
                    myArray.push([]),
                        myArray[cnt].Employee_Code = la[i].empUnqId,
                        myArray[cnt].NAME = la[i].empName,
                        myArray[cnt].WORK_GROUP = la[i].wrkGrp,
                        myArray[cnt].DEPARTMENT = la[i].deptName,
                        myArray[cnt].STATION = la[i].statName,
                        myArray[cnt].EMAIL = la[i].email,
                        myArray[cnt].RELEASE_GROUP = la[i].releaseGroup,
                        myArray[cnt].RELEASE_STRATEGY = la[i].releaseStrategy,
                        myArray[cnt].RELEASER_1_CODE = la[i].releaseCode1,
                        myArray[cnt].RELEASER_1_ID = la[i].releaseEmpUnqId1,
                        myArray[cnt].RELEASER_1_NAME = la[i].releaseName1,
                        myArray[cnt].RELEASER_2_CODE = la[i].releaseCode2,
                        myArray[cnt].RELEASER_2_ID = la[i].releaseEmpUnqId2,
                        myArray[cnt].RELEASER_2_NAME = la[i].releaseName2,
                        myArray[cnt].RELEASER_3_CODE = la[i].releaseCode3,
                        myArray[cnt].RELEASER_3_ID = la[i].releaseEmpUnqId3,
                        myArray[cnt].RELEASER_3_NAME = la[i].releaseName3,
                        cnt++;
                $scope.rlsdata = myArray;
                $scope.jsondata = $scope.rlsdata, $scope.$digest(), $scope.rlsdata = $filter("orderBy")($scope.rlsdata, "Employee_Code");
            }
        }, rls.send()
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    $scope.exportAllData = function () {
        setTimeout(function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = "Employee_Wise_Release_Strategy_List_" + d; $scope.JSONToCSVConvertor($scope.jsondata, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv") }, 100)
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n" } if ("" === CSV) return void alert("Invalid data"); var fileName = ReportTitle.replace(/ /g, "_"), uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link)
    };
});