var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]); app.controller("ReimbursementController", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), $scope.currentPage = 1, $scope.itemsPerPage = 10, $scope._Conpath = ""; var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol; $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") });
    var rlsarr = []; $scope.jsondata; var c = 0;
    $scope.GetEmpInfo = function () { var emp = new XMLHttpRequest; emp.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + $("#myEmpUnqId").val(), !0), emp.setRequestHeader("Accept", "application/json"), emp.onreadystatechange = function () { if (4 === emp.readyState) { var json = JSON.parse(emp.responseText); $scope.empdata = json, $scope.$digest() } }, emp.send() };
    $scope.AddtoListConv = function (Conv) { function storeTblValues() { var TableData = new Array; return $("#aliasTable tr").each(function (row, tr) { TableData[row] = { sr: $(tr).find("td:eq(0)").text(), convDate: $(tr).find("td:eq(1)").text(), vehicleNo: $(tr).find("td:eq(2)").text(), particulars: $(tr).find("td:eq(3)").text(), meterFrom: $(tr).find("td:eq(4)").text(), distance: $(tr).find("td:eq(5)").text(), meterTo: $(tr).find("td:eq(6)").text(), rate: $(tr).find("td:eq(7)").text(), amount: $(tr).find("td:eq(8)").text() } }), TableData.shift(), TableData } if ("undefined" == typeof Conv) return alert("Please Fill All Required Details Step by Step..."), !1; c++ , $(".tempRow").remove(); var row = $("<tr><td style='text-align:center;'><input type='hidden' name='SrNo' value='" + c + "'>" + c + "</td><td style='text-align:center;'><input type='hidden' name='Date' value='" + Conv.Dt + "'>" + Conv.Dt + "</td><td style='text-align:center;'><input type='hidden' name='VNo' value='" + Conv.VNo + "'>" + Conv.VNo + "</td><td style='text-align:center;'><input type='hidden' name='Perticular' value='" + Conv.Perticular + "'>" + Conv.Perticular + "</td><td style='text-align:center;'><input type='hidden' name='MFrom' value='" + Conv.MFrom + "'>" + Conv.MFrom + "</td><td style='text-align:center;'><input type='hidden' name='KM' value='" + Conv.KM + "'>" + Conv.KM + "</td><td style='text-align:center;'><input type='hidden' name='MTo' value='" + $("#txtMeterTo").val() + "'>" + $("#txtMeterTo").val() + "</td><td style='text-align:center;'><input type='hidden' name='Rate' value='" + Conv.Rate + "'>" + Conv.Rate + "</td><td style='text-align:center;'><input type='hidden' name='Amt' value='" + $("#txtAmount").val() + "'>" + $("#txtAmount").val() + "</td></tr>"); $("#aliasTable").append(row), document.getElementById("Dt").value = "", document.getElementById("txtVehicleNo").value = "", document.getElementById("txtParticulars").value = "", document.getElementById("txtMeterFrom").value = "", document.getElementById("txtMeterTo").value = "", document.getElementById("txtDistance").value = "", document.getElementById("txtRate").value = "", document.getElementById("txtAmount").value = ""; for (var TableData = storeTblValues(), TotalAmount = 0, i = 0; i < TableData.length; i++)TotalAmount += parseFloat(TableData[i].amount); document.getElementById("txtAmountClaimed").value = TotalAmount };
    $scope.CalMeterTo = function () { var MeterFrom = parseInt(document.getElementById("txtMeterFrom").value) || 0, Distance = parseInt(document.getElementById("txtDistance").value) || 0, MeterTo = MeterFrom + Distance; document.getElementById("txtMeterTo").value = MeterTo };
    $scope.CalAmount = function () { var Rate = parseFloat(document.getElementById("txtRate").value) || 0, Distance = parseInt(document.getElementById("txtDistance").value) || 0; $("#txtAmount").val(parseFloat(Distance * Rate)) };
    $scope.PopulateData = function (id) { $("#ConformModel").modal("show"), $scope.PopupDetails(id) };
    $scope.PopupDetails = function (reimbId) { var newArray = {}; newArray = $scope.jsondata; for (var i = 0; i < newArray.length; i++) { var id = newArray[i].reimbId; if (reimbId === id) { var tmparray = [0]; tmparray[0] = newArray[i], $scope.convData = tmparray } } };
    $scope.GetReimbursementReport = function (dates) { var FromDate = dates.FromDt, ToDate = dates.ToDt, reimbType = dates.reimbType, REM = new XMLHttpRequest; REM.open("GET", $scope._Conpath + "Reimbursement/GetReimb?reimbType=" + reimbType + "&fromDate=" + FromDate + "&toDate=" + ToDate, !0), REM.setRequestHeader("Accept", "application/json"), REM.onreadystatechange = function () { if (4 === REM.readyState && 200 === REM.status) { $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"); var json = JSON.parse(REM.responseText); $scope.REMdata = json, $scope.REMdata = $filter("orderBy")($scope.REMdata, "empUnqId"), $scope.jsondata = $scope.REMdata, $scope.curPage1 = 0, $scope.pageSize1 = 10, $scope.$digest() } }, REM.send() };
    $scope.CreateReimbursement = function (Conv) {
        document.getElementById("btnAddtoList").disabled = true;
        document.getElementById("btnSubmit").disabled = true;
        var d = new Date();
        var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var year = d.getFullYear().toString();
        var month = "";
        if (d.getMonth() + 1 < "10") {
            month = "0" + (d.getMonth() + 1);
        } else {
            month = d.getMonth() + 1;
        }
        var yearmonth = year + month.toString();
        var PeriodFrom = Conv.PeriodFromYear + Conv.PeriodFromMonth.toString();
        var PeriodTo = Conv.PeriodToYear + Conv.PeriodToMonth.toString();
        var jsonObj = {};
        var TableData = storeTblValues();
        TableData = JSON.stringify(TableData);
        function storeTblValues() {
            var TableData = new Array();
            $("#aliasTable tr").each(function (row, tr) {
                TableData[row] = {
                    yearMonth: yearmonth,
                    reimbId: 0,
                    sr: $(tr).find("td:eq(0)").text(),
                    reimbType: "CON",
                    empUnqId: $("#myEmpUnqId").val(),
                    convDate: $(tr).find("td:eq(1)").text(),
                    vehicleNo: $(tr).find("td:eq(2)").text(),
                    particulars: $(tr).find("td:eq(3)").text(),
                    meterFrom: $(tr).find("td:eq(4)").text(),
                    distance: $(tr).find("td:eq(5)").text(),
                    meterTo: $(tr).find("td:eq(6)").text(),
                    rate: $(tr).find("td:eq(7)").text(),
                    amount: $(tr).find("td:eq(8)").text(),
                    remarks: ""
                };
            });
            TableData.shift();
            jsonObj.yearMonth = yearmonth;
            jsonObj.reimbId = 0;
            jsonObj.reimbType = "CON";
            jsonObj.empUnqId = $("#myEmpUnqId").val();
            jsonObj.reimbDate = dt;
            jsonObj.periodFrom = PeriodFrom;
            jsonObj.periodTo = PeriodTo;
            jsonObj.invoiceNo = $("#txtInvoiceNo").val();
            jsonObj.amountClaimed = $("#txtAmountClaimed").val();
            jsonObj.amountReleased = 0;
            jsonObj.amountReleaseRemarks = null;
            jsonObj.addUser = $("#myEmpUnqId").val();
            jsonObj.addDateTime = dt;
            jsonObj.releaseGroupCode = $("#releaseGroupCode").val();
            jsonObj.releaseStrategy = $("#myEmpUnqId").val();
            jsonObj.releaseStatusCode = null;
            jsonObj.remarks = null;
            jsonObj.applReleaseStatus = null;
            jsonObj.reimbConv = TableData;
            return jsonObj;
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", $scope._Conpath + "Reimbursement/CreateReimb", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Created Sucesfully.. </strong></div>";
                $("#MessageBox").show();
                $("#aliasTable").find("tr:not(:first)").remove();
                $("#PeriodToYear option:first").attr("selected", true);
                $("#PeriodToMonth option:first").attr("selected", true);
                $("#PeriodFromYear option:first").attr("selected", true);
                $("#PeriodFromMonth option:first").attr("selected", true);
                document.getElementById("txtInvoiceNo").value = "";
                document.getElementById("txtAmountClaimed").value = "0";
            } else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Not Created.. </strong></div>";
                $("#MessageBox").show();
            }
        };
        xhr.send(TableData);
    };
    $scope.GetPendingForRelease = function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var lst = new XMLHttpRequest; lst.open("GET", $scope._Conpath + "AppRelease/GetApplReleaseStatus?empUnqId=" + $("#myEmpUnqId").val() + "&releaseGroupCode=" + $("#releaseGroupCode").val(), !0), lst.setRequestHeader("Accept", "application/json"), lst.onreadystatechange = function () { if (4 === lst.readyState && 200 === lst.status) { $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"); var json = JSON.parse(lst.responseText); rlsarr = json, $scope.lstdata = json, $scope.lstdata = $filter("orderBy")($scope.lstdata, "empUnqId"), $scope.jsondata = $scope.lstdata, $scope.curPage1 = 0, $scope.pageSize1 = 10, $scope.$digest() } }, lst.send() };
    $scope.ReimbursementRelease = function (releaseStatusCode, rlsappid, data) {
        if (releaseStatusCode === "F") {
            if (typeof data === "undefined" || typeof data.amountReleased === "undefined") {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Enter Release Amount First.</strong></div>";
                $("#MessageBox").show();
                return false;
            }
        }
        var rmks = "";
        if (releaseStatusCode === "R") {
            if (typeof data === "undefined" || typeof data.releaseRemarks === "undefined") {
                $("#btnClose").click();
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Enter Remarks First For Rejection</strong></div>";
                $("#MessageBox").show();
                return false;
            } else {
                rmks = data.releaseRemarks;
            }
        } else {
            if (typeof data === "undefined") {
                rmks = "";
            } else {
                rmks = data.releaseRemarks;
            }
        }
        var d = new Date();
        var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        var detailarr = [];
        for (var r = 0; r <= rlsarr.length; r++) {
            var id = rlsarr[r]["reimbId"];
            if (id == rlsappid) {
                var reimheaderarr = [];
                reimheaderarr = rlsarr[r];
                detailarr = rlsarr[r]["applReleaseStatus"];
                break;
            }
        }
        var dataarr = [];
        for (i = 0; i < detailarr.length; i++) {
            var release_auth = detailarr[i]["releaseAuth"];
            if (release_auth === $("#myEmpUnqId").val()) {
                dataarr = detailarr[i];
                break;
            }
        }
        var jsonObj = {};
        jsonObj.YearMonth = dataarr.yearMonth;
        jsonObj.ReleaseGroupCode = dataarr.releaseGroupCode;
        jsonObj.ApplicationId = rlsappid;
        jsonObj.ReleaseStrategy = dataarr.releaseStrategy;
        jsonObj.ReleaseStrategyLevel = dataarr.releaseStrategyLevel;
        jsonObj.ReleaseCode = dataarr.releaseCode;
        jsonObj.ReleaseStatusCode = dataarr.releaseStatusCode;
        jsonObj.ReleaseDate = strDate;
        jsonObj.ReleaseAuth = dataarr.releaseAuth;
        jsonObj.IsFinalRelease = dataarr.isFinalRelease;
        jsonObj.Remarks = rmks;
        jsonObj.LeaveApplications_YearMonth = null;
        jsonObj.LeaveApplications_LeaveAppId = null;
        jsonObj = JSON.stringify(jsonObj);
        var xhr2 = new XMLHttpRequest();
        xhr2.open("POST", $scope._Conpath + "AppRelease/UpdateGpStatus?empUnqId=" + $("#myEmpUnqId").val() + "&releaseStatusCode=" + releaseStatusCode + "&releaseGroupCode=" + dataarr.releaseGroupCode, true);
        xhr2.setRequestHeader("Content-type", "application/json");
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4) {
                $("#btnClose").click();
                if (releaseStatusCode === "F") {
                    var jsonObj1 = {};
                    jsonObj1.ReimbId = rlsappid;
                    jsonObj1.AmountReleased = data.amountReleased;
                    jsonObj1 = JSON.stringify(jsonObj1);
                    var xhr3 = new XMLHttpRequest();
                    xhr3.open("POST", $scope._Conpath + "Reimbursement/UpdateReimb?flag=" + true, true);
                    xhr3.setRequestHeader("Content-type", "application/json");
                    xhr3.onreadystatechange = function () {
                        if (xhr3.readyState === 4) {
                            document.getElementById("txtamountReleased").value = "";
                            document.getElementById("txtreleaseRemarks").value = "";
                            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong> Reimbursement Approved Successfully.. </strong></div>";
                        }
                    };
                    xhr3.send(jsonObj1);
                }
                if (releaseStatusCode === "R") {
                    document.getElementById("txtamountReleased").value = "";
                    document.getElementById("txtreleaseRemarks").value = "";
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong> Reimbursement Rejected Successfully.. </strong></div>";
                }
                $("#MessageBox").show();
            } else {
                $("#btnClose").click();
                if (releaseStatusCode === "F") {
                    document.getElementById("txtamountReleased").value = "";
                    document.getElementById("txtreleaseRemarks").value = "";
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong> Reimbursement Application Not Approved .. </strong></div>";
                }
                if (releaseStatusCode === "R") {
                    document.getElementById("txtamountReleased").value = "";
                    document.getElementById("txtreleaseRemarks").value = "";
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong> Reimbursement Application Not Rejected .. </strong></div>";
                }
                $("#MessageBox").show();
            }
            $scope.GetPendingForRelease();
        };
        xhr2.send(jsonObj);
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse }; $scope.exportAllData = function () { setTimeout(function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = "Gate_Pass_Report_" + d; $scope.JSONToCSVConvertor($scope.GPAdviceInfo, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv") }, 100) }; $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n" } if ("" === CSV) return void alert("Invalid data"); var fileName = "MyReport_"; fileName += ReportTitle.replace(/ /g, "_"); var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link) };
}); app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });