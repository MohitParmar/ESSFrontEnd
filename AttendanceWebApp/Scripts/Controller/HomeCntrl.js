var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("HomeCntrloller", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(); $scope.currentPage = 1; $scope.itemsPerPage = 10; $scope.alluserlist = [];
    var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; var url_port = url.port;
    $scope._Conpath = ''; $scope._AttdConPath = ""; var loc = $("#myLoc").val(); var wrkgrp = $("#myWrkGrp").val();
    //$(document).ready(function () {
    //    "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/");
    //});
    $(document).ready(function () {
        "undefined" != typeof _ConPath &&
            (urlhost === _URLHostName ?
                $scope._Conpath = _ConPath :
                $scope._Conpath = urlprotocol + "//" + urlhost + "/api/",
                "undefined" != typeof _AttdConPath &&
                (urlhost === _URLHostName ?
                    $scope._AttdConPath = _AttdConPath :
                    $scope._AttdConPath = urlprotocol + "//" + urlhost + "/api/")
            )
    });

    jQuery.support.cors = true; $scope.ResetView = function () { window.location.reload(!0) };
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
        var l = $("#myLoc").val();
        var arr = new Array; preAdd = new XMLHttpRequest; preAdd.open("GET", $scope._Conpath + "EmpAddress/GetEmpAddress?empUnqId=" + $("#myEmpUnqId").val(), !0);
        preAdd.setRequestHeader("Accept", "application/json"); preAdd.onreadystatechange = function () {
            if (4 === preAdd.readyState) {

                var l = $("#myLoc").val(); json = JSON.parse(preAdd.responseText); tmparr = json;
                var counter = tmparr.counter;
                if (l === "IPU" && counter > 0) {
                    document.getElementById("txtHouseNumber").disabled = true; document.getElementById("txtPoliceStation").disabled = true;
                    document.getElementById("txtSocietyName").disabled = true; document.getElementById("txtemailid").disabled = true;
                    document.getElementById("txtAreaName").disabled = true; document.getElementById("txtphoneno").disabled = true;
                    document.getElementById("txtLandMark").disabled = true; document.getElementById("txtresno").disabled = true;
                    document.getElementById("txtPreCity").disabled = true; document.getElementById("txtTehsil").disabled = true;
                    document.getElementById("txtdist").disabled = true; document.getElementById("txtstate").disabled = true;
                    document.getElementById("pincode").disabled = true; document.getElementById("btnSave").disabled = true;
                    document.getElementById("BtnCancel").disabled = true;
                };
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
    $scope.GetSalarySlipDetails = function (yearMonth) {
        var jsonobj = {};
        jsonobj.EmpUnqId = " 00" + $("#myEmpUnqId").val() + " ";
        jsonobj.yearMonth = yearMonth;
        jsonobj = JSON.stringify(jsonobj);
        var slpdls = new XMLHttpRequest;
        slpdls.open("POST", $scope._Conpath + "SalarySlip/GetSalarySlip", !0);
        slpdls.setRequestHeader("Content-type", "application/json");
        slpdls.responseType = "arraybuffer";
        slpdls.onload = function () {
            if (200 == slpdls.status) {
                var blob = new Blob([slpdls.response], { type: "application/pdf" }), objectUrl = URL.createObjectURL(blob); window.open(objectUrl)
            } else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> File Not Found...</strong></div>", $("#MessageBox").show()
            };
        };
        slpdls.send(jsonobj);
    };
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
    $scope.PopupConsent = function () { $scope.GetUserInfo(); $('#ConsentModel').modal("show"); };
    /*--Use below method only for new joining Employee Servay--*/
    $scope.newData;
    $scope.GetNewEmpInfo = function () {
        var cat = $("#myCatCode").val();
        if (loc === "IPU" && wrkgrp === "COMP" && (cat === "001" || cat === "002")) {
            var eml = new XMLHttpRequest;
            eml.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + $("#myEmpUnqId").val(), !0);
            eml.setRequestHeader("Accept", "application/json");
            eml.onreadystatechange = function () {
                if (4 === eml.readyState) {
                    var json = JSON.parse(eml.responseText); $scope.newData = json; $scope.$digest();
                    var joindt = $scope.newData[0].joinDate; var da = new Date(joindt); var dtnow = new Date();
                    var diff = ((da - dtnow) / (1000 * 60 * 60 * 24) * -1) + 1;
                    var ser = new XMLHttpRequest;
                    ser.open("GET", $scope._AttdConPath + "Survey/GetEmpHeaders?EmpUnqID=" + $("#myEmpUnqId").val(), !0);
                    ser.setRequestHeader("Accept", "application/json");
                    ser.onreadystatechange = function () {
                        if (4 === ser.readyState) {
                            var json = JSON.parse(ser.responseText); $scope.serData = json;
                            var stDate = new Date("2023-08-01");
                            if (da >= stDate) {
                                if ($scope.serData.length <= 0 && diff >= 8) {
                                    debugger;
                                    $('#FirstImpression').modal("show");
                                    jQuery(document).keyup(function (e) {
                                        if (e.keyCode == 27 && popupStatus == 1) {
                                            // alert('not allowed !!!');
                                            // or any other code
                                            return false;
                                        }
                                    });
                                }
                                else if ($scope.serData.length >= 0) {
                                    var serd, serdt; for (var i = 0; i < $scope.serData.length; i++) {
                                        serd = $scope.serData[i].SurveyID; serdt = $scope.serData[i].SubmitDate;
                                        if (serd === 30 && !serdt && diff >= 31) { $('#30DaysSurvay').modal("show"); break; }
                                        else if (serd === 60 && !serdt && diff >= 61) { $('#60DaysSurvay').modal("show"); break; }
                                        else if (serd === 90 && !serdt && diff >= 91) { $('#90DaysSurvay').modal("show"); break; };
                                    };
                                }; $scope.$digest();
                            };
                        };
                    }; ser.send();
                };
            }; eml.send();
        }
        //else {
        //    $("#p_amountofinterest").attr("disabled", true);
        //    document.getElementById("btn7Days").disabled = true;
        //    document.getElementById("btn30Days").disabled = true;
        //    document.getElementById("btn60Days").disabled = true;
        //    document.getElementById("btn90Days").disabled = true;
        //}
    };
    $scope.Survey = function (surData, daysData) {
        if ((typeof (surData) === "undefined")) { alert("Please Fill All Required Details"); return false; }
        var s = 0;
        var d = new Date();
        var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var QID = 68;
        if (daysData === "7") { s = 14; }
        else if (daysData === "30") { s = 17; QID = 81 + 1; }
        else if (daysData === "60") { s = 13; QID = 98 + 1; }
        else if (daysData === "90") { s = 21; QID = 111 + 1; };
        var HeaderArr = {};
        HeaderArr.EmpUnqID = $("#myEmpUnqId").val();
        HeaderArr.SurveyID = daysData;
        HeaderArr.JoinDate = $scope.newData[0].joinDate;
        HeaderArr.DueDate = dt;
        HeaderArr.SubmitDate = dt;
        HeaderArr.Score = "0";
        HeaderArr.Remarks = "";
        var tmpArr = new Array();
        tmpArr.push([]);
        tmpArr[0] = surData;
        var dtlArr = new Array();
        for (var i = 1; i <= s; i++) {
            var si = "sel" + i + "_" + daysData;
            dtlArr.push({});
            dtlArr[i - 1].EmpUnqID = $("#myEmpUnqId").val();
            dtlArr[i - 1].SurveyID = daysData;
            dtlArr[i - 1].QuestionID = QID;
            dtlArr[i - 1].QuestionTypeID = 3;
            dtlArr[i - 1].QuestionAns = tmpArr[0][si];
            dtlArr[i - 1].SubmitDt = new Date();
            QID++;
        };

        /*GET MULTIPLE SELECTION VALUES START*/
        if (daysData === "30") {
            var s30_15 = new Array();
            s30_15 = $("#cmb30sel15").val();
            var sel15 = "";
            if ((typeof (s30_15) !== "undefined")) {
                for (var p = 0; p < s30_15.length; p++) {
                    var s3015 = s30_15[p];
                    if (s3015 === "4") { sel15 = "4," };
                    if (s3015 === "3") { sel15 += "3," };
                    if (s3015 === "2") { sel15 += "2," };
                    if (s3015 === "1") { sel15 += "1," };
                }
            }
            sel15 = sel15.substring(0, sel15.length - 1);
            dtlArr[14].QuestionAns = sel15;
        }

        if (daysData === "60") {
            var s60_11 = new Array();
            s60_11 = $("#cmb60sel10").val();
            var sel11 = "";
            if ((typeof (s60_11) !== "undefined")) {
                for (var p = 0; p < s60_11.length; p++) {
                    var s6011 = s60_11[p];
                    if (s6011 === "4") { sel11 = "4," };
                    if (s6011 === "3") { sel11 += "3," };
                    if (s6011 === "2") { sel11 += "2," };
                    if (s6011 === "1") { sel11 += "1," };
                }
            }
            sel11 = sel11.substring(0, sel11.length - 1);
            dtlArr[10].QuestionAns = sel11;
        }

        if (daysData === "90") {
            var s90_3 = new Array();
            s90_3 = $("#cmb90sel2").val();
            var sel3 = "";
            if ((typeof (s90_3) !== "undefined")) {
                for (var p = 0; p < s90_3.length; p++) {
                    var s903 = s90_3[p];
                    if (s903 === "3") { sel3 += "3," };
                    if (s903 === "2") { sel3 += "2," };
                    if (s903 === "1") { sel3 += "1," };
                }
            }
            sel3 = sel3.substring(0, sel3.length - 1);
            dtlArr[2].QuestionAns = sel3;

            var s90_18 = new Array();
            s90_18 = $("#cmb90sel17").val();
            var sel18 = "";
            if ((typeof (s90_18) !== "undefined")) {
                for (var p = 0; p < s90_18.length; p++) {
                    var s9018 = s90_18[p];
                    if (s9018 === "4") { sel18 = "4," };
                    if (s9018 === "3") { sel18 += "3," };
                    if (s9018 === "2") { sel18 += "2," };
                    if (s9018 === "1") { sel18 += "1," };
                }
            }
            sel18 = sel18.substring(0, sel18.length - 1);
            dtlArr[17].QuestionAns = sel18;
        }
        /*SET MULTIPLE SELECTION VALUES END*/

        var jsonObj = {};
        jsonObj.header = HeaderArr;
        jsonObj.details = dtlArr;
        jsonObj = JSON.stringify(jsonObj);
        var ESR = new XMLHttpRequest();
        ESR.open("POST", $scope._AttdConPath + "Survey/PostEmpSurvey", true);
        ESR.setRequestHeader("Content-type", "application/json");
        ESR.onreadystatechange = function () {
            if (ESR.readyState === 4 && ESR.status === 200) {
                if (daysData === "7") { jQuery("#btnClose_7").click(); }
                else if (daysData === "30") { jQuery("#btnClose_30").click(); }
                else if (daysData === "60") { jQuery("#btnClose_60").click(); }
                else if (daysData === "90") { jQuery("#btnClose_90").click(); };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Submitted Successfully.</strong></div>"; $("#MessageBox").show();
            }
            //else if (ESR.status === 400 || ESR.status === 404) {
            //if (daysData === "7") { jQuery("#btnClose_7").click(); }
            //else if (daysData === "30") { jQuery("#btnClose_30").click(); }
            //else if (daysData === "60") { jQuery("#btnClose_60").click(); }
            //else if (daysData === "90") { jQuery("#btnClose_90").click(); };
            //};
            else if (ESR.status === 400 || ESR.status === 403 || ESR.status === 404 || ESR.status === 408 ||
                ESR.status === 500) {
                var str = ESR.responseText.replace("[", "").replace("]", "").toString();
                var fields = str.split(","); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                //document.getElementById("MessageBox").innerHTML =
                //    "<div class='alert alert-danger alert-dismissable'>" +
                //    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                //    "<strong>" + er + "</strong></div>"; $("#MessageBox").show();
                alert("Please ensure that all details are completed and submitted as they are mandatory.");
            };
        }; ESR.send(jsonObj);
    };
    /*--END--*/
    $scope.exportObj; $scope.GetSAPID = function () {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var sap = new XMLHttpRequest;
        sap.open("GET", $scope._Conpath + "Employee/GetSapId", !0);
        sap.setRequestHeader("Accept", "application/json");
        sap.onreadystatechange = function () {
            if (4 === sap.readyState) {
                var jsonsap = JSON.parse(sap.responseText);
                $scope.sapData = jsonsap;
                $scope.exportObj = jsonsap;
                $scope.curPage = 0;
                $scope.pageSize = 10;
                $scope.$digest();
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
            } else if (200 !== sap.status) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>";
                $("#MessageBox").show();
            };
        };
        sap.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    $scope.exportAllData = function (name) {
        setTimeout(function () {
            $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
            var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = name + d;
            $scope.JSONToCSVConvertor($scope.exportObj, FileName, !0);
            $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
        }, 100);
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) {
            var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n"
        } if ("" === CSV) return void alert("Invalid data"); var fileName = ""; fileName += ReportTitle.replace(/ /g, "_"); var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link)
    };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });