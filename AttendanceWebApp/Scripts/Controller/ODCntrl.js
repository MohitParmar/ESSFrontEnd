var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]); app.controller("ODController", function ($scope, $http) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), $scope._Conpath = ""; var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol;
    $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"); });
    $scope.currentPage = 1, $scope.itemsPerPage = 10;
    $scope.ResetView = function () { window.location.reload(!0); };
    $scope.GetRelesaseStratey = function () { var rel = new XMLHttpRequest(); rel.open("GET", $scope._Conpath + "ReleaseStrategy/GetReleaseStrategy?releaseGroup=" + $("#releaseGroupCode").val() + "&empUnqId=" + $("#myEmpUnqId").val(), !0); rel.setRequestHeader("Accept", "application/json"); rel.onreadystatechange = function () { if (4 === rel.readyState) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1, $scope.$digest(); } }; rel.send(); };
    $scope.GetEmpInfo = function () { document.getElementById("btnPrint").disabled = !0; var e_Code = $("#myEmpUnqId").val(); emp = new XMLHttpRequest(); emp.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + e_Code, !0); emp.setRequestHeader("Accept", "application/json"); emp.onreadystatechange = function () { if (4 === emp.readyState) { var json = JSON.parse(emp.responseText); $scope.empdata = json, $scope.$digest(); var date = new Date(), timeOptions = { hour: "2-digit", minute: "2-digit" }, currentTime = date.toLocaleTimeString("it-IT", timeOptions); document.getElementById("FromTm").value = currentTime, document.getElementById("ToTm").value = currentTime; } }; emp.send(); };
    $scope.YearValidate = function () {
        var chkFrom = document.getElementById("FromDt"), FromDate = chkFrom.value, date1 = new Date(FromDate), fyear = date1.getFullYear(), d = new Date(), tyear = d.getFullYear();
        return fyear > tyear || tyear > fyear ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Valid Date of Current Month/Year.. </strong></div>",
            $("#MessageBox").show(), document.getElementById("FromDt").value = "", !1) : ($("#ToDt").val(FromDate),
                void $scope.ToValidate());
    };
    $scope.ToValidate = function () {
        var chkFrom = document.getElementById("FromDt"), chkTo = document.getElementById("ToDt"), FromDate = chkFrom.value, ToDate = chkTo.value;
        if ("" === FromDate) return document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Select From Date First...</strong></div>",
            $("#MessageBox").show(), document.getElementById("FromDt").value = "", document.getElementById("ToDt").value = "",
            document.getElementById("TotalDays").value = "", $("#HalfFlag").prop("checked", !1),
            !1;
        var date1 = new Date(FromDate), date2 = new Date(ToDate);
        //year validate
        fyear = date2.getFullYear(), d = new Date(), tyear = d.getFullYear();if (fyear > tyear) return alert("Please Enter Valid Date of Current Month/Year.. "),document.getElementById("ToDt").value = "", !1;
        var diff = (date1 - date2) / 864e5 * -1 + 1;
        return "NaN" === diff || 0 >= diff ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Select Proper Dates for OD apply.</strong></div>",
            $("#MessageBox").show(), document.getElementById("FromDt").value = "", document.getElementById("ToDt").value = "",
            document.getElementById("TotalDays").value = "", $("#HalfFlag").prop("checked", !1),
            !1) : ($("#TotalDays").text = diff, document.getElementById("TotalDays").value = diff,
                diff > 1 ? ($("#HalfFlag").attr("disabled", !0), $("#HalfFlag").attr("checked", !1)) : $("#HalfFlag").removeAttr("disabled"),
                date1 > date2 ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Valid Date Range.. </strong></div>",
                    $("#MessageBox").show(), !1) : !0);
    };
    $scope.CreateOD = function (entity) {
        document.getElementById("BtnSave").disabled = !0;
        var d = new Date(),
            dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes(),
            year = d.getFullYear().toString(),
            month = d.getMonth() + 1,
            yearmonth = year + month.toString(),
            FromDateTime = entity.FromDt + " " + (entity.FromTm || "00:00:00"),
            chkTo = document.getElementById("ToDt").value,
            ToDateTime = chkTo + " " + (entity.ToTm || "00:00:00"),
            TotalDays = "",
            HalfDayFlag = !1;
        $("#HalfFlag").prop("checked") === !0 ? (HalfDayFlag = !0, TotalDays = "0.5") : (HalfDayFlag = !1, TotalDays = $("#TotalDays").val());
        var jsonObj = {}, TableData = storeTblValues();
        function storeTblValues() {
            var TableData = new Array();
            TableData[0] = {
                yearMonth: yearmonth, leaveAppId: 0, compCode: $("#myCompCode").val(), wrkGrp: $("#myWrkGrp").val(), leaveAppItem: "1", leaveTypeCode: "OD",
                fromDt: FromDateTime, toDt: ToDateTime, totalDays: TotalDays, halfdayflag: HalfDayFlag, remarks: "", placeOfVisit: entity.Place,
                contactAddress: entity.Details
            };
            jsonObj.yearMonth = yearmonth, jsonObj.leaveAppId = 0, jsonObj.empUnqId = $("#myEmpUnqId").val(), jsonObj.compCode = $("#myCompCode").val();
            jsonObj.wrkGrp = $("#myWrkGrp").val(), jsonObj.unitCode = $("#myUnitCode").val(), jsonObj.deptCode = $("#myDeptCode").val();
            jsonObj.statCode = $("#myStatCode").val(), jsonObj.catCode = $("#myCatCode").val(), jsonObj.isHOD = $("#myIsHod").val(), jsonObj.releaseGroupCode = "OD";
            jsonObj.releaseStrategy = "", jsonObj.releaseStatusCode = "", jsonObj.addDt = dt, jsonObj.addUser = $("#myEmpUnqId").val();
            jsonObj.clientIp = $("#myIPAddress").val(), jsonObj.updDt = dt, jsonObj.updUser = null, jsonObj.remarks = 'OD_', jsonObj.parentId = 0;
            jsonObj.leaveApplicationDetails = TableData;
            return jsonObj;
        }
        TableData = JSON.stringify(TableData);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", $scope._Conpath + "LeaveApplication/CreateLeaveApplication", !0);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState && 201 === xhr.status) {
                document.getElementById("btnPrint").disabled = !1;
                var fdateval, fdate = new Date(FromDateTime); fdateval = fdate.getMonth() + 1 < "10" ? fdate.getDate() < "10" ? "0" + fdate.getDate() + "/0" + (fdate.getMonth() + 1) + "/" + fdate.getFullYear() + " " + fdate.getHours() + ":" + fdate.getMinutes() : fdate.getDate() + "/0" + (fdate.getMonth() + 1) + "/" + fdate.getFullYear() + " " + fdate.getHours() + ":" + fdate.getMinutes() : fdate.getDate() < "10" ? "0" + fdate.getDate() + "/" + (fdate.getMonth() + 1) + "/" + fdate.getFullYear() + " " + fdate.getHours() + ":" + fdate.getMinutes() : fdate.getDate() + "/" + (fdate.getMonth() + 1) + "/" + fdate.getFullYear() + " " + fdate.getHours() + ":" + fdate.getMinutes();
                var tdateval, tdate = new Date(ToDateTime); tdateval = tdate.getMonth() + 1 < "10" ? tdate.getDate() < "10" ? "0" + tdate.getDate() + "/0" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear() + " " + tdate.getHours() + ":" + tdate.getMinutes() : tdate.getDate() + "/0" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear() + " " + tdate.getHours() + ":" + tdate.getMinutes() : tdate.getDate() < "10" ? "0" + tdate.getDate() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear() + " " + tdate.getHours() + ":" + tdate.getMinutes() : tdate.getDate() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear() + " " + tdate.getHours() + ":" + tdate.getMinutes();
                $("#lblFromDate").text(fdateval), $("#lblToDate").text(tdateval), $("#lblPlaceOfVisit").text(entity.Place), $("#lblContactDetails").text(entity.Details);
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>OD Application Created Sucessfully.. </strong></div>", $("#MessageBox").show();
                document.getElementById("FromDt").value = "", document.getElementById("FromTm").value = "", document.getElementById("ToDt").value = "", document.getElementById("ToTm").value = "", document.getElementById("TotalDays").value = "", document.getElementById("Place").value = "", document.getElementById("Details").value = "", $("#HalfFlag").prop("checked", !1);
            }
            else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Leave Application Not Created.. </strong></div>"; $("#MessageBox").show(); document.getElementById("FromDt").value = "", document.getElementById("FromTm").value = ""; document.getElementById("ToDt").value = "", document.getElementById("ToTm").value = ""; document.getElementById("TotalDays").value = "", document.getElementById("Place").value = ""; document.getElementById("Details").value = "", $("#HalfFlag").prop("checked", !1); };
        }, xhr.send(TableData);
    };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } }; });