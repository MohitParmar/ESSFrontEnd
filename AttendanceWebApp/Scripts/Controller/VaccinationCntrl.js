var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("VaccinationCntroller", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(); $scope._Conpath = ""; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof _ConPath === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } } });
    $scope.ResetView = function () { window.location.reload(true); }; $scope.exportObj; $scope.currentPage = 1; $scope.itemsPerPage = 25; jQuery.support.cors = true;
    $scope.FirstDoseValidate = function () {
        var now = new Date();
        var chkFrom = document.getElementById('dtFirstDose'); var FromDate = chkFrom.value; var date1 = new Date(FromDate);
        var FirstDoseOn = new Date("2021-01-16");
        if (date1 < FirstDoseOn) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Correct Date of First Dose</strong></div>"; $('#MessageBox').show();
            document.getElementById("dtFirstDose").value = "";
            return false;
        };
        if (date1 > now) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Future Date not allowed.. </strong></div>"; $('#MessageBox').show();
            document.getElementById("dtFirstDose").value = "";
            return false;
        };
    };
    $scope.Validate = function () {
        var now = new Date();
        var chkFrom = document.getElementById('dtFirstDose'); var FromDate = chkFrom.value;
        var chkTo = document.getElementById('dtSecondDose'); var ToDate = chkTo.value;
        if (FromDate === "") {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>First Dose Date is Mandatory</strong></div>"; $('#MessageBox').show();
            document.getElementById("dtSecondDose").value = "";
            return false;
        };
        var date1 = new Date(FromDate); var date2 = new Date(ToDate);
        if (FromDate == ToDate) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Correct date for both Dose</strong></div>"; $('#MessageBox').show();
            document.getElementById("dtSecondDose").value = "";
            return false;
        };
        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Valid Dates.. </strong></div>"; $('#MessageBox').show();
            document.getElementById("dtSecondDose").value = "";
            return false;
        };
        if (date1 > now || date2 > now) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Future Date not allowed.. </strong></div>"; $('#MessageBox').show();
            document.getElementById("dtSecondDose").value = "";
            return false;
        };
    };
    $scope.PrecautionValidate = function () {
        var now = new Date();
        var chkFrom = document.getElementById('dtFirstDose'); var FromDate = chkFrom.value;
        var chkTo = document.getElementById('dtSecondDose'); var ToDate = chkTo.value;
        var chkPrecaution = document.getElementById('dtPrecautionDose'); var PrecautionDate = chkPrecaution.value;
        if (FromDate === "" || ToDate === "") {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>First and Second Dose Date is Mandatory</strong></div>"; $('#MessageBox').show();
            document.getElementById("dtPrecautionDose").value = "";
            return false;
        };
        var date1 = new Date(FromDate); var date2 = new Date(ToDate); var date3 = new Date(PrecautionDate);
        if (FromDate == PrecautionDate || ToDate == PrecautionDate) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Correct date.</strong></div>"; $('#MessageBox').show();
            document.getElementById("dtPrecautionDose").value = "";
            return false;
        };
        if (date3 < date2 || date3 < date1) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Valid Dates.. </strong></div>"; $('#MessageBox').show();
            document.getElementById("dtPrecautionDose").value = "";
            return false;
        };
        if (date1 > now || date2 > now || date3 > now) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Future Date not allowed.. </strong></div>"; $('#MessageBox').show();
            document.getElementById("dtPrecautionDose").value = "";
            return false;
        };
    };
    $scope.CertificateUpload = function (certData) {
        $("#loading").removeClass("deactivediv"); $("#loading").addClass("activediv");
        var firstDose = $("#dtFirstDose").val(); var secondDose = $("#dtSecondDose").val(); var thirdDose = $("#dtPrecautionDose").val();
        if ((typeof (certData) === "undefined")) {
            alert("Please Enter Details");
            $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
            return false;
        };
        var now = new Date(); var dtnow = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        var data = new FormData(); var files = $("#files").get(0).files;
        if (files.length === 0) {
            alert("Please Select Vaccination Certificate");
            $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
            return false;
        }
        var jsonObj = {};
        jsonObj.EmpUnqId = $("#myEmpUnqId").val();
        jsonObj.FirstDoseDate = firstDose;
        jsonObj.SecondDoseDate = secondDose;
        jsonObj.ThirdDoseDate = thirdDose;
        jsonObj.UpdateDate = dtnow;
        jsonObj = JSON.stringify(jsonObj);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', $scope._Conpath + 'Vaccination/AddVaccinationData', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (files.length > 0) { for (f = 0; f < files.length; f++) { data.append("UploadedImage", files[f]); } }
                $.ajax({
                    type: "PUT",
                    url: $scope._Conpath + 'Vaccination/CertificateUpload?empUnqId=' + $("#myEmpUnqId").val(),
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (result) {
                        $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                        document.getElementById("MessageBox").innerHTML =
                            "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                            "<strong>Uploaded Successfully...</strong></div>";
                        $('#MessageBox').show();
                        document.getElementById("dtFirstDose").value = ""; document.getElementById("dtSecondDose").value = "";
                        document.getElementById("dtPrecautionDose").value = "";
                        $scope.GetEmpVaccination();
                    },
                    error: function (err) {
                        $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                        document.getElementById("MessageBox").innerHTML =
                            "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                            "<strong>Please try after some time...</strong></div>";
                        $('#MessageBox').show();
                    }
                });
            } else if (xhr.status === 400 || xhr.status === 403 || xhr.status === 404 || xhr.status === 408 || xhr.status === 500) {
                var str = xhr.responseText.replace("[", '').replace("]", '').toString(); var fields = str.split(','); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er +
                    "</strong></div>"; $('#MessageBox').show();
                document.getElementById("dtFirstDose").value = ""; document.getElementById("dtSecondDose").value = "";
                document.getElementById("dtPrecautionDose").value = "";
            };
        }; xhr.send(jsonObj);
    };
    $scope.GetFile = function () {
        var slpdls = new XMLHttpRequest();
        slpdls.open('GET', $scope._Conpath + 'Vaccination/GetFile?empUnqId=' + $("#myEmpUnqId").val(), true);
        slpdls.setRequestHeader("Accept", "application/json");
        slpdls.responseType = "arraybuffer";
        slpdls.onload = function () {
            if (slpdls.status == 200) {
                var blob = new Blob([slpdls.response],
                    {
                        type: "application/pdf"
                    });
                var objectUrl = URL.createObjectURL(blob);
                window.open(objectUrl);
            } else {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong> File Not Found...</strong></div>";
                $('#MessageBox').show();
            };
        };
        slpdls.send();
    };
    $scope.GetEmpVaccination = function () {
        var eva = new XMLHttpRequest;
        eva.open("GET", $scope._Conpath + "Vaccination/GetEmpVaccination?empunqid=" + $("#myEmpUnqId").val(), true);
        eva.setRequestHeader("Accept", "application/json");
        eva.onreadystatechange = function () {
            if (eva.readyState === 4 && eva.status === 200) {
                var json = JSON.parse(eva.responseText);
                $scope.evaData = json; var s = new Array(); s[0] = $scope.evaData; $scope.evdata = s; $scope.$digest();
                var FirstDoseDate = $scope.evdata[0].firstDoseDate; if (FirstDoseDate != "" && FirstDoseDate != null) {
                    FirstDoseDate = $scope.evdata[0].firstDoseDate.substring(0, $scope.evdata[0].firstDoseDate.indexOf("T"));
                }
                var SecondDoseDate = $scope.evdata[0].secondDoseDate; if (SecondDoseDate != "" && SecondDoseDate != null) {
                    SecondDoseDate = $scope.evdata[0].secondDoseDate.substring(0, $scope.evdata[0].secondDoseDate.indexOf("T"));
                }
                var PrecautionDoseDate = $scope.evdata[0].thirdDoseDate; if (PrecautionDoseDate != "" && PrecautionDoseDate != null) {
                    PrecautionDoseDate = $scope.evdata[0].thirdDoseDate.substring(0, $scope.evdata[0].thirdDoseDate.indexOf("T"));
                }
                $("#dtFirstDose").val(FirstDoseDate); $("#dtSecondDose").val(SecondDoseDate); $("#dtPrecautionDose").val(PrecautionDoseDate);
            };
        }; eva.send();
    };
    $scope.GetVaccination = function () {
        var vac = new XMLHttpRequest;
        vac.open("GET", $scope._Conpath + "Vaccination/GetVaccination", true);
        vac.setRequestHeader("Accept", "application/json");
        vac.onreadystatechange = function () {
            if (vac.readyState === 4 && vac.status === 200) {
                var json = JSON.parse(vac.responseText);
                var arr = new Array();
                arr = json;
                var myArray = [];
                for (var i = 0; i < arr.length; i++) {
                    myArray.push([]);
                    myArray[i].EmpUnqId = arr[i].empUnqId;
                    myArray[i].EmpName = arr[i].employee.empName;
                    myArray[i].StationName = arr[i].employee.statName;
                    myArray[i].Category = arr[i].employee.catName;
                    myArray[i].Designation = arr[i].employee.desgName;
                    var FirstDoseDate = arr[i].firstDoseDate; if (FirstDoseDate != "" && FirstDoseDate != null) {
                        myArray[i].FirstDoseDate = arr[i].firstDoseDate.substring(0, arr[i].firstDoseDate.indexOf("T"));
                    } else { myArray[i].FirstDoseDate = ""; };
                    var SecondDoseDate = arr[i].secondDoseDate; if (SecondDoseDate != "" && SecondDoseDate != null) {
                        myArray[i].SecondDoseDate = arr[i].secondDoseDate.substring(0, arr[i].secondDoseDate.indexOf("T"));
                    } else { myArray[i].SecondDoseDate = ""; };
                    var PrecautionDoseDate = arr[i].thirdDoseDate; if (PrecautionDoseDate != "" && PrecautionDoseDate != null) {
                        myArray[i].PrecautionDoseDate = arr[i].thirdDoseDate.substring(0, arr[i].thirdDoseDate.indexOf("T"));
                    } else { myArray[i].PrecautionDoseDate = "" };
                    var UpdateDate = arr[i].updateDate; if (UpdateDate != "" && UpdateDate != null) {
                        myArray[i].UpdateDate = arr[i].updateDate;
                    } else { myArray[i].UpdateDate = "" };
                };
                $scope.vacData = myArray;
                $scope.vacData = $filter('orderBy')($scope.vacData, '-UpdateDate');
                $scope.exportObj = $scope.vacData;
                $scope.$digest();
            };
        }; vac.send();
    };
    $scope.GetFileEmpWise = function (eCode) {
        var slpdls = new XMLHttpRequest();
        slpdls.open('GET', $scope._Conpath + 'Vaccination/GetFile?empUnqId=' + eCode, true);
        slpdls.setRequestHeader("Accept", "application/json");
        slpdls.responseType = "arraybuffer";
        slpdls.onload = function () {
            if (slpdls.status == 200) {
                var blob = new Blob([slpdls.response],
                    {
                        type: "application/pdf"
                    });
                var objectUrl = URL.createObjectURL(blob);
                window.open(objectUrl);
            } else {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong> File Not Found...</strong></div>";
                $('#MessageBox').show();
            };
        };
        slpdls.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    $scope.exportAllData = function (name) {
        setTimeout(function () {
            $("#loading").removeClass("deactivediv"); $("#loading").addClass("activediv");
            var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = name + d;
            $scope.JSONToCSVConvertor($scope.exportObj, FileName, !0);
            $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
        }, 100);
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) {
            var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n"
        } if ("" === CSV) return void alert("Invalid data"); var fileName = ""; fileName += ReportTitle.replace(/ /g, "_"); var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link)
    };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } }; });