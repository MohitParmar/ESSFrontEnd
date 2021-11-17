var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("HomeCntrloller", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(); $scope.currentPage = 1; $scope.itemsPerPage = 10; $scope.alluserlist = []; $scope._Conpath = ""; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") });
    $scope.ResetView = function () { window.location.reload(!0) }; jQuery.support.cors = true;
    $scope.changePassword = function (entity) { var jsonObj = {}; jsonObj.EmpUnqId = $("#myEmpUnqId").val(), jsonObj.Pass = entity.Pass, jsonObj = JSON.stringify(jsonObj); var xhr2 = new XMLHttpRequest; xhr2.open("POST", $scope._Conpath + "Employee/ChangePassword", !0), xhr2.setRequestHeader("Content-type", "application/json"), xhr2.onreadystatechange = function () { 4 === xhr2.readyState ? window.location.href = "/Login/UserLogin/" : 400 === xhr2.status && (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Password Not Updated .. </strong></div>", $("#MessageBox").show(), document.getElementById("eCode").value = "", document.getElementById("ePass").value = "", jQuery("#btnClose").click()) }, xhr2.send(jsonObj) };
    $scope.ResetPass = function () { var e_Code = $("#eCode").val(); if ("" === e_Code) return document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Employee Code First.. </strong></div>", $("#MessageBox").show(), !1; var jsonObj = {}; jsonObj.EmpUnqId = $("#eCode").val(), jsonObj.Pass = $("#eCode").val(), jsonObj = JSON.stringify(jsonObj); var xhr2 = new XMLHttpRequest; xhr2.open("POST", $scope._Conpath + "Employee/ChangePassword", !0), xhr2.setRequestHeader("Content-type", "application/json"), xhr2.onreadystatechange = function () { 4 === xhr2.readyState ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Password Changed Sucesfully..</strong></div>", $("#MessageBox").show(), document.getElementById("eCode").value = "", $("#tbl_empdtl").hide()) : 400 === xhr2.status && (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Password Not Updated .. </strong></div>", $("#MessageBox").show(), document.getElementById("eCode").value = "", $("#tbl_empdtl").hide()) }, xhr2.send(jsonObj) };
    $scope.EmpeMail = function (data) { var xhr3 = new XMLHttpRequest; xhr3.open("POST", $scope._Conpath + "Employee/updateemail?empunqid=" + $("#myEmpUnqId").val() + "&email=" + data.eMailID, !0), xhr3.setRequestHeader("Content-type", "application/json"), xhr3.onreadystatechange = function () { 4 === xhr3.readyState && 200 === xhr3.status ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Email ID Saved Sucesfully..</strong></div>", $("#MessageBox").show(), document.getElementById("eMailID").value = "", $("#tbl_empdtl").hide(), $scope.GetUserInfo()) : (400 === xhr3.status || 500 === xhr3.status) && (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Emails ID Not Saved..</strong></div>", $("#MessageBox").show(), document.getElementById("eMailID").value = "", $("#tbl_empdtl").hide()) }, xhr3.send() };
    $scope.GetUserInfo = function () {
        var e_Code = $("#eCode").val(), xhr = new XMLHttpRequest;
        "" !== e_Code && "undefined" != typeof e_Code ?
            xhr.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + e_Code, !0) :
            xhr.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + $("#myEmpUnqId").val(), !0), xhr.setRequestHeader("Accept", "application/json"), xhr.onreadystatechange = function () {
                if (4 === xhr.readyState) {
                    var json = JSON.parse(xhr.responseText);
                    $scope.Udata = json, $scope.$digest(), "" !== e_Code && "undefined" != typeof e_Code && ($scope.GetUserPerasonalInfo(), $scope.GetUserFamInfo())
                }
            }; xhr.send();
    };
    $scope.GetUserPerasonalInfo = function () {
        var e_Code = $("#eCode").val(), per = new XMLHttpRequest;
        "" !== e_Code && "undefined" != typeof e_Code ?
            per.open("GET", $scope._Conpath + "Employee/GetEmpDetails?empunqid=" + e_Code + "&mode=1", !0) :
            per.open("GET", $scope._Conpath + "Employee/GetEmpDetails?empunqid=" + $("#myEmpUnqId").val() + "&mode=1", !0),
            per.setRequestHeader("Accept", "application/json"), per.onreadystatechange = function () {
                if (4 === per.readyState) {
                    var json = JSON.parse(per.responseText); $scope.Uperdata = json, $scope.$digest()
                }
            }, per.send();
    };
    $scope.GetUserFamInfo = function () {
        var e_Code = $("#eCode").val(), fam = new XMLHttpRequest;
        "" !== e_Code && "undefined" != typeof e_Code ?
            fam.open("GET", $scope._Conpath + "Employee/GetEmpDetails?empunqid=" + e_Code + "&mode=3", !0) :
            fam.open("GET", $scope._Conpath + "Employee/GetEmpDetails?empunqid=" + $("#myEmpUnqId").val() + "&mode=3", !0),
            fam.setRequestHeader("Accept", "application/json"), fam.onreadystatechange = function () {
                if (4 === fam.readyState) {
                    var jsonfam = JSON.parse(fam.responseText); $scope.Ufamdata = jsonfam, $scope.$digest()
                }
            }, fam.send();
    };
    $scope.GetEmpInfo = function () {
        $("#tbl_empdtl").show();
        var e_Code = $("#eCode").val();
        if ("" === e_Code)
            return
        document.getElementById("MessageBox").innerHTML =
            "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Employee Code First.. </strong></div>",
            $("#MessageBox").show(), !1;
        var emp = new XMLHttpRequest;
        emp.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + $("#eCode").val(), !0),
            emp.setRequestHeader("Accept", "application/json"),
            emp.onreadystatechange = function () {
                if (4 === emp.readyState) {
                    var json1 = JSON.parse(emp.responseText);
                    $scope.empdata = json1, $scope.$digest()
                } else
                    200 !== emp.status && (document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>",
                        $("#MessageBox").show())
            },
            emp.send()
    };
    $scope.GetLeaveRequestLists = function () { var xhr1 = new XMLHttpRequest; xhr1.open("GET", $scope._Conpath + "LeaveApplication/GetLeaveApplication?empUnqId=" + $("#myEmpUnqId").val(), !0), xhr1.setRequestHeader("Accept", "application/json"), xhr1.onreadystatechange = function () { if (4 === xhr1.readyState) { var json = JSON.parse(xhr1.responseText); $scope.lappdata = json, $scope.lappdata = $filter("orderBy")($scope.lappdata, "-leaveAppId"), $scope.curPage = 0, $scope.pageSize = 10, $scope.$digest() } }, xhr1.send() };
    $scope.GetPostedLeave = function () { var pstl = (new Date, new XMLHttpRequest); pstl.open("GET", $scope._Conpath + "leaveentry?empunqid=" + $("#myEmpUnqId").val(), !0), pstl.setRequestHeader("Accept", "application/json"), pstl.onreadystatechange = function () { if (4 === pstl.readyState) { var json = JSON.parse(pstl.responseText); $scope.pladata = json, $scope.pladata = $filter("orderBy")($scope.pladata, "-fromDt"), $scope.curPage1 = 0, $scope.pageSize1 = 5, $scope.$digest() } }, pstl.send() };
    $scope.CancelLeave = function (ym, lid) { var retVal = confirm("Are You Sure to Cancel Leave Aplication ?"); if (retVal === true) { var TableData = storeTblValues(); TableData = JSON.stringify(TableData); function storeTblValues() { var TableData = new Array(); $("#aliasTable tr").each(function (row, tr) { TableData[row] = { LeaveAppId: $(tr).find("td:eq(0)").text(), LeaveAppItem: $(tr).find("td:eq(2)").text() }; }); var tbl = new Array(); tbl[0] = "test"; var count = 0; for (var i = 0; i < TableData.length; i++) { var appid = TableData[i]["LeaveAppId"]; if (appid == lid) { tbl[count] = { YearMonth: ym, LeaveAppId: lid, LeaveAppItem: TableData[i]["LeaveAppItem"], IsPosted: "R", Remarks: "Self Rejected", UserId: $("#myEmpUnqId").val() }; count++; } } return tbl; } var can = new XMLHttpRequest(); can.open("POST", $scope._Conpath + "LeavePosting/PostLeaves", true); can.setRequestHeader("Content-type", "application/json"); can.onreadystatechange = function () { if (can.readyState === 4 && can.status === 200) { $scope.GetLeaveRequestLists(); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Cancelled Sucesfully.. </strong></div>"; $("#MessageBox").show(); } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Not Cancelled Please Try again.. </strong></div>"; $("#MessageBox").show(); } $scope.GetLeaveRequestLists(); }; can.send(TableData); } else { return false; } };
    $scope.UpdateAddress = function () {
        var houseNumber = "", societyName = "", areaName = "", landMark = "", preCity = "", tehsil = "", pincode = "", phoneno = "", PreEmail = "", PrePoliceStation = "";
        houseNumber = $("#txtHouseNumber").val(); societyName = $("#txtSocietyName").val(); areaName = $("#txtAreaName").val(); landMark = $("#txtLandMark").val();
        preCity = $("#txtPreCity").val(); tehsil = $("#txtTehsil").val(); pincode = $("#pincode").val(); phoneno = $("#txtphoneno").val(); PreEmail = $("#txtemailid").val();
        PrePoliceStation = $("#txtPoliceStation").val();
        if (houseNumber === "" || societyName === "" || areaName === "" || landMark === "" || preCity === "" || tehsil === "" || pincode === "" || phoneno === "" ||
            PrePoliceStation === "") { alert("Please Fill All Required Details .. "); return false; };
        var jsonObj = {};
        jsonObj.EmpUnqId = $("#myEmpUnqId").val(); jsonObj.HouseNumber = houseNumber.toUpperCase(); jsonObj.SocietyName = societyName.toUpperCase();
        jsonObj.AreaName = areaName.toUpperCase(); jsonObj.LandMark = landMark.toUpperCase(); jsonObj.PreCity = preCity.toUpperCase();
        jsonObj.tehsil = tehsil.toUpperCase();
        jsonObj.PoliceStation = PrePoliceStation.toUpperCase(); jsonObj.PreState = $("#txtstate").val().toUpperCase();
        jsonObj.PreDistrict = $("#txtdist").val().toUpperCase();
        jsonObj.PreEmail = PreEmail.toUpperCase(); jsonObj.PrePin = pincode; jsonObj.PrePhone = phoneno; jsonObj.PreResPhone = $("#txtresno").val();
        jsonObj = JSON.stringify(jsonObj);
        var addr = new XMLHttpRequest(); addr.open("POST", $scope._Conpath + "EmpAddress/UpdateEmpAddress", true);
        addr.setRequestHeader("Content-type", "application/json");
        addr.onreadystatechange = function () {
            if (addr.readyState === 4 && addr.status === 200) {
                $scope.GetPresentAddress();
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Address / Contact Details Successfully Updated.. </strong></div>"; $("#MessageBox").show();
            } else if (addr.status === 400) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Address / Contact Details are not Saved.As no changes detected.</strong></div>"; $("#MessageBox").show(); }
        }; addr.send(jsonObj);
    };
    $scope.GetPresentAddress = function () {
        var arr = new Array; preAdd = new XMLHttpRequest; preAdd.open("GET", $scope._Conpath + "EmpAddress/GetEmpAddress?empUnqId=" + $("#myEmpUnqId").val(), !0);
        preAdd.setRequestHeader("Accept", "application/json"); preAdd.onreadystatechange = function () {
            if (4 === preAdd.readyState) {
                var l = $("#myLoc").val(); json = JSON.parse(preAdd.responseText); tmparr = json;
                arr[0] = {
                    empUnqId: tmparr.empUnqId, houseNumber: tmparr.houseNumber, societyName: tmparr.societyName, areaName: tmparr.areaName, landMark: tmparr.landMark,
                    preCity: tmparr.preCity, tehsil: tmparr.tehsil, preDistrict: tmparr.preDistrict, preState: tmparr.preState, prePin: tmparr.prePin,
                    preEmail: tmparr.preEmail, prePhone: tmparr.prePhone, preResPhone: tmparr.preResPhone, policeStation: tmparr.policeStation
                };
                $("#txtHouseNumber").val(arr[0].houseNumber), $("#txtSocietyName").val(arr[0].societyName), $("#txtAreaName").val(arr[0].areaName);
                $("#txtLandMark").val(arr[0].landMark), $("#txtPreCity").val(arr[0].preCity), $("#txtTehsil").val(arr[0].tehsil), $("#pincode").val(arr[0].prePin);
                $("#txtemailid").val(arr[0].preEmail), $("#txtphoneno").val(arr[0].prePhone), $("#txtresno").val(arr[0].preResPhone);
                $("#txtPoliceStation").val(arr[0].policeStation);
                var dist = arr[0].preDistrict;
                "undefined" == typeof dist ? "BEL" === l ? $("#txtdist").val("BELLARY") : "KJSAW" === l ? $("#txtdist").val("MATHURA") : $("#txtdist").val("KUTCH") : $("#txtdist").val(arr[0].preDistrict);
                var state = arr[0].preState; "undefined" == typeof state ? "BEL" === l ? $("#txtstate").val("KARNATAKA") : "KJSAW" === l ? $("#txtstate").val("UTTAR PRADESH") : $("#txtstate").val("GUJARAT") : $("#txtstate").val(arr[0].preState);
                $scope.preadddata = arr;
                $scope.$digest();
            }
        }, preAdd.send()
    };
    $scope.GetSalarySlip = function () { var slp = new XMLHttpRequest; slp.open("GET", $scope._Conpath + "SalarySlip/GetLinks?empUnqId=" + $("#myEmpUnqId").val(), !0), slp.setRequestHeader("Accept", "application/json"), slp.onreadystatechange = function () { if (4 === slp.readyState) { var json = JSON.parse(slp.responseText); $scope.slpdata = json, $scope.$digest() } }, slp.send() };
    $scope.GetSalarySlipDetails = function (yearMonth) { var jsonobj = {}; jsonobj.EmpUnqId = " 00" + $("#myEmpUnqId").val() + " ", jsonobj.yearMonth = yearMonth, jsonobj = JSON.stringify(jsonobj); var slpdls = new XMLHttpRequest; slpdls.open("POST", $scope._Conpath + "SalarySlip/GetSalarySlip", !0), slpdls.setRequestHeader("Content-type", "application/json"), slpdls.responseType = "arraybuffer", slpdls.onload = function () { if (200 == slpdls.status) { var blob = new Blob([slpdls.response], { type: "application/pdf" }), objectUrl = URL.createObjectURL(blob); window.open(objectUrl) } else document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> File Not Found...</strong></div>", $("#MessageBox").show() }, slpdls.send(jsonobj) };
    $scope.FolderUpload = function (syearMonth) {
        $("#loading").removeClass("deactivediv"); $("#loading").addClass("activediv"); var data = new FormData(); var files = $("#files").get(0).files;
        if (files.length > 0) { for (f = 0; f < files.length; f++) { data.append("UploadedImage", files[f]); } }
        $.ajax({
            type: "POST", url: $scope._Conpath + "SalarySlip/UploadPaySlip?folderName=" + syearMonth, contentType: false, processData: false, data: data,
            success: function (result) { $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv"); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>File Uploaded Successfully...</strong></div>"; $("#MessageBox").show(); },
            error: function (err) { $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv"); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Files not uploaded Successfully Please Retry...</strong></div>"; $("#MessageBox").show(); }
        });
    };
    $scope.PopupPreview = function (odData) {
        var emparr = new Array(); var e_Code = $("#myEmpUnqId").val(); emp = new XMLHttpRequest; emp.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + e_Code, !0);
        emp.setRequestHeader("Accept", "application/json"); emp.onreadystatechange = function () { if (4 === emp.readyState) { var json = JSON.parse(emp.responseText); emparr = json; $("#lblEmpName").text(emparr[0].empName); $("#lbldesgName").text(emparr[0].desgName); $("#lblempUnqId").text(emparr[0].empUnqId); } }, emp.send();
        var oddtl = odData.leaveApplicationDetails[0];
        var fdateval, fdate = new Date(oddtl.fromDt); fdateval = fdate.getMonth() + 1 < "10" ? fdate.getDate() < "10" ? "0" + fdate.getDate() + "/0" + (fdate.getMonth() + 1) + "/" + fdate.getFullYear() + " " + fdate.getHours() + ":" + fdate.getMinutes() : fdate.getDate() + "/0" + (fdate.getMonth() + 1) + "/" + fdate.getFullYear() + " " + fdate.getHours() + ":" + fdate.getMinutes() : fdate.getDate() < "10" ? "0" + fdate.getDate() + "/" + (fdate.getMonth() + 1) + "/" + fdate.getFullYear() + " " + fdate.getHours() + ":" + fdate.getMinutes() : fdate.getDate() + "/" + (fdate.getMonth() + 1) + "/" + fdate.getFullYear() + " " + fdate.getHours() + ":" + fdate.getMinutes();
        var tdateval, tdate = new Date(oddtl.toDt); tdateval = tdate.getMonth() + 1 < "10" ? tdate.getDate() < "10" ? "0" + tdate.getDate() + "/0" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear() + " " + tdate.getHours() + ":" + tdate.getMinutes() : tdate.getDate() + "/0" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear() + " " + tdate.getHours() + ":" + tdate.getMinutes() : tdate.getDate() < "10" ? "0" + tdate.getDate() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear() + " " + tdate.getHours() + ":" + tdate.getMinutes() : tdate.getDate() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear() + " " + tdate.getHours() + ":" + tdate.getMinutes();
        $("#lblFromDate").text(fdateval), $("#lblToDate").text(tdateval), $("#lblPlaceOfVisit").text(oddtl.placeOfVisit), $("#lblContactDetails").text(oddtl.contactAddress), $('#previewModel').modal("show");
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });