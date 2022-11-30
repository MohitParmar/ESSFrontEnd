var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("MissPunchController", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(); $scope._Conpath = ""; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") });
    $scope.ResetView = function () { window.location.reload(!0) }; $scope.currentPage = 1; $scope.itemsPerPage = 10; $scope.exportObj;
    jQuery.support.cors = true; var d = new Date(); var rlsarr = [];
    $scope.GetRelesaseStrategy = function () {
        var rel = new XMLHttpRequest();
        rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() +
            '&empUnqId=' + $('#myEmpUnqId').val(), true);
        rel.setRequestHeader('Accept', 'application/json');
        rel.onreadystatechange = function () {
            if (rel.readyState === 4) {
                var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.$digest();
            }
        }; rel.send();
    };
    $scope.GetEmpInfo = function () {
        $("#MessageBox").hide();
        $("#tbl_empdtl").show();
        var e_Code = $("#eCode").val();
        if ("" === e_Code) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Employee Code First.. </strong></div>";
            $("#MessageBox").show();
            return false;
        };
        var emp = new XMLHttpRequest;
        emp.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + e_Code, !0);
        emp.setRequestHeader("Accept", "application/json");
        emp.onreadystatechange = function () {
            if (4 === emp.readyState && 200 === emp.status) {
                var json1 = JSON.parse(emp.responseText);
                $scope.empdata = json1;
                $scope.$digest();
                $scope.GetEmpBlock(e_Code);
            } else if (200 !== emp.status) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>";
                $("#MessageBox").show();
            };
        }; emp.send();
    };
    //Get Employee Block Information
    $scope.GetEmpBlock = function (empcode) {
        var blk = new XMLHttpRequest;
        blk.open("GET", $scope._Conpath + "MedicalFitness/GetEmpBlock?empUnqId=" + empcode, !0);
        blk.setRequestHeader("Accept", "application/json");
        blk.onreadystatechange = function () {
            if (4 === blk.readyState) {
                var json = JSON.parse(blk.responseText); var blockArr = []; blockArr[0] = json;
                if (blockArr[0].punchingBlocked === true) {
                    $("#tbl_empblkdtl").show(); $scope.blockData = blockArr;
                    $scope.$digest();
                } else { $("#tbl_empblkdtl").hide(); };
            }
        }; blk.send();
    };
    //Creation of punch entry.
    $scope.CreateMissPunch = function (entity, hrflg) {
        if (hrflg && (typeof (entity.IO) === "undefined")) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Select Punch Type.</strong></div>";
            $('#MessageBox').show();
            return false;
        };
        if ((typeof (entity) === "undefined") || (typeof (entity.Reason) === "undefined")) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Fill All Details.</strong></div>";
            $('#MessageBox').show();
            return false;
        };
        var rmks = ""; if (entity.Reason === "Other") {
            if (typeof (entity.Remarks) === "undefined" || entity.Remarks === "") {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Please Enter Remarks</strong></div>";
                $('#MessageBox').show();
                return false;
            } else { rmks = entity.Remarks; };
        } else { rmks = entity.Remarks; };
        var now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var e_Code = $("#eCode").val();
        var IO = ""; if ((typeof (entity.IO) !== "undefined")) { IO = entity.IO; } else { IO = ""; };
        jsonObj = {}; jsonObj.Id = 0; jsonObj.AddDate = now; jsonObj.EmpUnqId = e_Code; jsonObj.Reason = entity.Reason;
        jsonObj.Remarks = rmks; jsonObj.ReleaseStrategy = e_Code; jsonObj.ReleaseStatusCode = "N";
        var tm = ""; if (typeof (entity.time) === "undefined") { tm = now; } else { tm = entity.time; };
        if (IO !== "") {
            if (IO === "I") {
                jsonObj.InTime = tm; jsonObj.InTimeUser = $("#myEmpUnqId").val(); jsonObj.OutTime = null; jsonObj.OutTimeUser = null;
            } else if (IO === "O") {
                jsonObj.InTime = null; jsonObj.InTimeUser = null; jsonObj.OutTime = tm; jsonObj.OutTimeUser = $("#myEmpUnqId").val();
            }
        } else {
            jsonObj.InTime = tm; jsonObj.InTimeUser = $("#myEmpUnqId").val(); jsonObj.OutTime = null; jsonObj.OutTimeUser = null;
        };
        jsonObj.PunchType = "M"; jsonObj.InOutFlag = IO; jsonObj.AttdPunchTime = null;
        jsonObj.PostingFlag = false; jsonObj.MissedPunchReleaseStatus = null; jsonObj = JSON.stringify(jsonObj);
        var xhr = new XMLHttpRequest(); xhr.open('POST', $scope._Conpath + 'MissedPunch/CreateMissedPunch', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("time").value = ""; document.getElementById("txtRemarks").value = "";
                document.getElementById("eCode").value = ""; $("#tbl_empdtl").find("tr:not(:first)").remove();
                $("#cmbReason option:first").attr("selected", true);
                if (IO !== "") { $("#cmbIOflag option:first").attr("selected", true); };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Miss Punch Application Created.. </strong></div>";
                $('#MessageBox').show();
            } else {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Miss Punch Application Not Created.. </strong></div>";
                $('#MessageBox').show();
            };
        }; xhr.send(jsonObj);
    };
    //get pending for release by hod.
    $scope.GetPendingRelease = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var mpr = new XMLHttpRequest; mpr.open("GET", $scope._Conpath + "MissedPunch/GetApplReleaseStatus?empUnqId=" + $("#myEmpUnqId").val(), true);
        mpr.setRequestHeader("Accept", "application/json");
        mpr.onreadystatechange = function () {
            if (mpr.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");

                var json = JSON.parse(mpr.responseText); rlsarr = json; $scope.msData = json;
                for (var i = 0; i < $scope.msData.length; i++) {
                    var emp = $scope.msData[i].employee.empName; $scope.msData[i]["empName"] = emp;
                    var yCount = $scope.msData[i].employee.yearlyCount | 0; $scope.msData[i]["yearlyCount"] = yCount;
                }
                $scope.$digest();
            };
        }; mpr.send();
    };
    //released by hod
    $scope.ReleaseMissPunch = function (releaseStatusCode, appId, data) {
        var now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var rmks = '';
        if (releaseStatusCode === "R") {
            if ((typeof (data) === "undefined") || (typeof (data.Remarks) === "undefined")) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Please Enter Remarks First For Rejection</strong></div>";
                $('#MessageBox').show();
                return false;
            } else { rmks = data.Remarks; };
        } else { if ((typeof (data) === "undefined")) { rmks = ""; } else { rmks = data.Remarks; }; };
        // Get Releaser Details From AppReleaseStatus Table
        var detailarr = []; for (var r = 0; r <= rlsarr.length; r++) { var id = rlsarr[r]["id"]; if (id == appId) { detailarr = rlsarr[r]["missedPunchReleaseStatus"]; break; }; };
        //Get ReleaseCode of Releaser
        var dataarr = []; for (i = 0; i < detailarr.length; i++) { var release_auth = detailarr[i]["releaseAuth"]; if (release_auth === $('#myEmpUnqId').val()) { dataarr = detailarr[i]; break; }; };
        var jsonObj = {}; jsonObj.ApplicationId = appId; jsonObj.ReleaseStrategy = dataarr.releaseStrategy; jsonObj.ReleaseStrategyLevel = dataarr.releaseStrategyLevel;
        jsonObj.ReleaseCode = dataarr.releaseCode; jsonObj.ReleaseStatusCode = dataarr.releaseStatusCode; jsonObj.ReleaseDate = now; jsonObj.ReleaseAuth = dataarr.releaseAuth;
        jsonObj.IsFinalRelease = dataarr.isFinalRelease; jsonObj.Remarks = rmks; jsonObj = JSON.stringify(jsonObj);
        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST', $scope._Conpath + 'MissedPunch/AppRelease?empUnqId=' + $('#myEmpUnqId').val() + '&releaseStatusCode=' + releaseStatusCode, true);
        xhr2.setRequestHeader("Content-type", "application/json");
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4) {
                if (releaseStatusCode === 'F') {
                    document.getElementById("txtRemarks").value = "";
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Application Approved..</strong></div>";
                };
                if (releaseStatusCode === 'R') {
                    document.getElementById("txtRemarks").value = "";
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Application Rejected..</strong></div>";
                };
                $('#MessageBox').show();
                $scope.GetPendingRelease();
            } else {
                if (releaseStatusCode === 'F') {
                    document.getElementById("txtRemarks").value = "";
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Application Not Approved .. </strong></div>";
                };
                if (releaseStatusCode === 'R') {
                    document.getElementById("txtRemarks").value = "";
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Application Not Rejected .. </strong></div>";
                };
                $('#MessageBox').show();
            };
        }; xhr2.send(jsonObj);
    };
    $scope.GetMissedPunch = function (data) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var FromDate, ToDate;
        if ("undefined" == typeof data || "undefined" == typeof data.FromDt || "undefined" == typeof data.ToDt) {
            var date = new Date;
            firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate();
            ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { FromDate = data.FromDt, ToDate = data.ToDt; };
        var date1 = new Date(FromDate), date2 = new Date(ToDate);
        if (date1 > date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Valid Date Range.. </strong></div>",
                $("#MessageBox").show();
            return false;
        };
        var xhr4 = new XMLHttpRequest();
        xhr4.open('GET', $scope._Conpath + 'MissedPunch/GetMissedPunch?fromDt=' + FromDate + '&toDt=' + ToDate + '&isPostedOnly=false', true);
        xhr4.setRequestHeader("Content-type", "application/json");
        xhr4.onreadystatechange = function () {
            if (xhr4.readyState === 4) {
                $('#loading').removeClass("activediv");
                $('#loading').addClass("deactivediv");
                var json = JSON.parse(xhr4.responseText);
                $scope.mpaData = json;
                for (var i = 0; i < $scope.mpaData.length; i++) {
                    $scope.mpaData[i]["empName"] = $scope.mpaData[i].employee.empName;
                    var applres = $scope.mpaData[i].missedPunchReleaseStatus;
                    for (var k = 0; k < applres.length; k++) {
                        if (applres[k].releaseStatusCode === 'F' && applres[k].isFinalRelease === true) {
                            $scope.mpaData[i]["relDate"] = applres[k].releaseDate;
                        }
                    }
                };
                var arr = new Array(); arr = $scope.mpaData;
                var cnt = 0, myArray = [];
                var releaseArr = new Array(), releaseDate;
                for (var j = 0; j < arr.length; j++) {
                    releaseArr = $scope.mpaData[j].missedPunchReleaseStatus;
                    for (var k = 0; k < releaseArr.length; k++) {
                        if (releaseArr[k].isFinalRelease === true) {
                            releaseDate = releaseArr[k].releaseDate;
                        }
                    };
                    var pType = $scope.mpaData[j].punchType;
                    var ioflg = $scope.mpaData[j].inOutFlag;
                    var intime = $scope.mpaData[j].inTime;
                    var outtime = $scope.mpaData[j].outTime;
                    var attdTime = $scope.mpaData[j].attdPunchTime;
                    myArray.push([]);
                    if (releaseDate !== null) {
                        myArray[cnt]["ReleaseDate"] = releaseDate.substring(0, releaseDate.indexOf("T"));
                    } else { myArray[cnt]["ReleaseDate"] = ""; };
                    myArray[cnt]["ReleaseStatus"] = $scope.mpaData[j].releaseStatusCode;
                    myArray[cnt]["EmpUnqID"] = $scope.mpaData[j].empUnqId;
                    myArray[cnt]["SanDate"] = $scope.mpaData[j].addDate.substring(0, $scope.mpaData[j].addDate.indexOf("T"));
                    myArray[cnt]["InTime"] = "";
                    myArray[cnt]["OutTime"] = "";
                    if (pType === "M") {
                        if (intime !== null) {
                            intime = intime.split("T"); intime = intime[1]; intime = intime.substr(0, 5);
                            myArray[cnt]["InTime"] = intime;
                        } else { myArray[cnt]["InTime"] = ""; };
                        if (outtime !== null) {
                            outtime = outtime.split("T"); outtime = outtime[1]; outtime = outtime.substr(0, 5);
                            myArray[cnt]["OutTime"] = outtime;
                        } else { myArray[cnt]["OutTime"] = ""; };
                    }
                    if (pType === "A") {
                        if (attdTime !== null) {
                            myArray[cnt]["SanDate"] = attdTime.substring(0, attdTime.indexOf("T"));
                            attdTime = attdTime.split("T");
                            attdTime = attdTime[1];
                            attdTime = attdTime.substr(0, 5);
                        }
                        if (ioflg === "I" && attdTime !== null) {
                            myArray[cnt]["InTime"] = attdTime;
                        } else { myArray[cnt]["InTime"] = ""; }
                        if (ioflg === "O" && attdTime !== null) {
                            myArray[cnt]["OutTime"] = attdTime;
                        } else { myArray[cnt]["OutTime"] = ""; };
                    }
                    myArray[cnt]["ShiftCode"] = "";
                    myArray[cnt]["TPAHours"] = "";
                    myArray[cnt]["Reason"] = $scope.mpaData[j].reason.toUpperCase();
                    cnt++;
                };
                $scope.exportObj = myArray;
                $scope.$digest();
            };
        }; xhr4.send();
    };
    $scope.GetEmployeeMissedPunch = function (data) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var FromDate, ToDate;
        if ("undefined" == typeof data || "undefined" == typeof data.FromDt || "undefined" == typeof data.ToDt) {
            var date = new Date;
            firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate();
            ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { FromDate = data.FromDt, ToDate = data.ToDt; };
        var date1 = new Date(FromDate), date2 = new Date(ToDate);
        if (date1 > date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Valid Date Range.. </strong></div>",
                $("#MessageBox").show();
            return false;
        };
        var xhr5 = new XMLHttpRequest();
        xhr5.open('GET', $scope._Conpath + 'MissedPunch/GetMissedPunch?fromDt=' + FromDate + '&toDt=' + ToDate + '&isPostedOnly=false&empUnqId=' + $('#myEmpUnqId').val(), true);
        xhr5.setRequestHeader("Content-type", "application/json");
        xhr5.onreadystatechange = function () {
            if (xhr5.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(xhr5.responseText);
                $scope.emrData = json;
                $scope.$digest();
            }
        }; xhr5.send();
    };
    $scope.MissPunchInfo = function () {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var prev = new Date(); var FromDate = new Date(prev); FromDate.setDate(prev.getDate() - 1);
        var dd = FromDate.getDate(); var mm = FromDate.getMonth() + 1; var yyyy = FromDate.getFullYear();
        if (dd < 10) { dd = '0' + dd; } if (mm < 10) { mm = '0' + mm; };
        FromDate = yyyy + '/' + mm + '/' + dd;
        var today = new Date(); var ToDate = new Date(today); ToDate.setDate(today.getDate());
        var dd2 = ToDate.getDate(); var mm2 = ToDate.getMonth() + 1; var yyyy2 = ToDate.getFullYear(); var h = ToDate.getHours(); var m = ToDate.getMinutes(); var s = ToDate.getSeconds();
        if (dd2 < 10) { dd2 = '0' + dd2; } if (mm2 < 10) { mm2 = '0' + mm2; };
        ToDate = yyyy2 + '/' + mm2 + '/' + dd2 + ' ' + h + ':' + m + ':' + s;
        var xhr6 = new XMLHttpRequest();
        xhr6.open('GET', $scope._Conpath + 'MissedPunch/GetMissedPunch?fromDt=' + FromDate + '&toDt=' + ToDate +
            '&isPostedOnly=false&punchType=M', true);
        xhr6.setRequestHeader("Content-type", "application/json");
        xhr6.onreadystatechange = function () {
            if (xhr6.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(xhr6.responseText);
                var dtl = new Array; dtl = json; var inArray = [];
                var count = 0;
                for (var i = 0; i < dtl.length; i++) {
                    var outTime = dtl[i].outTime;
                    var status = dtl[i].releaseStatusCode;
                    if (outTime == null && status !== "R") {
                        inArray.push([]);
                        inArray[count]["Id"] = dtl[i].id;
                        inArray[count]["EmpUnqId"] = dtl[i].empUnqId;
                        inArray[count]["EmpName"] = dtl[i].employee.empName;
                        inArray[count]["Reason"] = dtl[i].reason;
                        inArray[count]["Remarks"] = dtl[i].remarks;
                        inArray[count]["InTime"] = dtl[i].inTime;
                        count++;
                    }
                };
                $scope.inData = inArray;
                $scope.$digest();
            }
        }; xhr6.send();
    }
    //Miss Punch Out
    $scope.MissPunchOut = function (id, io) {
        var now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var out = new XMLHttpRequest();
        out.open('PUT', $scope._Conpath + 'MissedPunch/UpdateTime?id=' + id + "&inOut=" + io + "&empUnqId=" + $('#myEmpUnqId').val() + "&punchTime=" + now, true);
        out.setRequestHeader("Content-type", "application/json");
        out.onreadystatechange = function () {
            if (out.readyState === 4 && out.status === 200) {
                alert("Out Successfully..");
                $scope.MissPunchInfo();
            };
        }; out.send();
    };
    $scope.MissedPunchReportReleaser = function (data) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var FromDate, ToDate;
        if ("undefined" == typeof data || "undefined" == typeof data.FromDt || "undefined" == typeof data.ToDt) {
            var date = new Date;
            firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate();
            ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { FromDate = data.FromDt, ToDate = data.ToDt; };
        var date1 = new Date(FromDate), date2 = new Date(ToDate);
        if (date1 > date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Valid Date Range.. </strong></div>",
                $("#MessageBox").show();
            return false;
        };
        var rpt = new XMLHttpRequest();
        rpt.open('GET', $scope._Conpath + 'MissedPunch/GetMissedPunchReleaser?fromDt=' + FromDate + '&toDt=' + ToDate + '&empUnqId=' + $("#myEmpUnqId").val(), true);
        rpt.setRequestHeader("Content-type", "application/json");
        rpt.onreadystatechange = function () {
            if (rpt.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(rpt.responseText);
                $scope.rptData = json;
                for (var i = 0; i < $scope.rptData.length; i++) {
                    var emp = $scope.rptData[i].employee.empName;
                    $scope.rptData[i]["empName"] = emp;
                };
                $scope.$digest();
            };
        }; rpt.send();
    };
    /*-----ATTENDANCE CORRECTION-----*/
    var loc = $("#myLoc").val();
    $scope.initload = function () {
        if (loc === "IPU") {
            $("#divPunchTbl").show();
            $("#time").show();
            $("#punchTime").hide();
        }
        else {
            $("#divPunchTbl").hide();
            $("#time").hide();
            $("#punchTime").show();
        };
    };
    $scope.ToValidate = function (valid) {
        if ((typeof (valid.IO) === "undefined")) {
            document.getElementById("punchTime").value = "";
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Select Punch Type.</strong></div>";
            $('#MessageBox').show();
            return false;
        };
        var d = new Date(); var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        dt = new Date(dt);
        if ((typeof (valid.punchTime) !== "undefined")) {
            var ptime = valid.punchTime;
            ptime = new Date(ptime);
            if (ptime >= dt) {
                document.getElementById("punchTime").value = "";
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Punch Time is Greater then Current time.</strong></div>";
                $('#MessageBox').show();
                return false;
            };
        };
        var date1 = new Date(valid.punchTime);
        var date2 = new Date(dt);
        var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1;
        if (diff >= 8) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Limit for applying for missed punch is 7 days.</strong ></div > ";
            $('#MessageBox').show();
            document.getElementById("punchTime").value = "";
            return false;
        };
    };
    $scope.GetTripodPunch = function (gt) {
        document.getElementById("cmbIOflag").disabled = true;
        document.getElementById("time").disabled = true;
        if ((typeof (gt.IO) === "undefined")) {
            document.getElementById("time").value = "";
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Select Punch Type.</strong></div>";
            $('#MessageBox').show();
            return false;
        };
        var d = new Date();
        var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        dt = new Date(dt);
        if ((typeof (gt.time) !== "undefined")) {
            var ptime = gt.time; ptime = new Date(ptime);
            if (ptime >= dt) {
                document.getElementById("time").value = "";
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Punch Date is Greater then Date.</strong></div>";
                $('#MessageBox').show();
                return false;
            };
        };
        var date1 = new Date(gt.time);
        var date2 = new Date(dt);
        var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1;
        if (diff >= 61) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Limit for applying for missed punch is 60 days.</strong></div>";
            $('#MessageBox').show();
            document.getElementById("time").value = "";
            return false;
        };
        var GTP = new XMLHttpRequest();
        GTP.open('GET', $scope._Conpath + 'Employee/gettripodpunch?empUnqId=' + $("#myEmpUnqId").val() + '&tDate=' +
            gt.time + '&ioFlag=' + gt.IO, true);
        GTP.setRequestHeader("Content-type", "application/json");
        GTP.onreadystatechange = function () {
            if (GTP.readyState === 4) {
                var json = JSON.parse(GTP.responseText); $scope.gtpData = json; $scope.$digest();
                $scope.PerformanceAttendanceRpt(gt.time);
            };
        }; GTP.send();
    };
    $scope.PerformanceAttendanceRpt = function (str) {
        var pDate = str; var pr = new XMLHttpRequest;
        pr.open("GET", $scope._Conpath + "Employee/PerfAttd?empunqid=" + $("#myEmpUnqId").val() + "&flag=PERF&fromdate=" +
            pDate + "&todate=" + pDate, !0);
        pr.setRequestHeader("Accept", "application/json"); pr.onreadystatechange = function () {
            if (4 === pr.readyState) { var json = JSON.parse(pr.responseText); $scope.prdata = json; $scope.$digest(); };
        }; pr.send();
    };
    $scope.pTime; $scope.SelectPunchTime = function (pTime, ioflg) {
        var startdate = new Date(pTime); var durationInMinutes = 5;
        if (ioflg === "I") { startdate.setMinutes(startdate.getMinutes() + durationInMinutes); }
        else if (ioflg === "O") { startdate.setMinutes(startdate.getMinutes() - durationInMinutes); }
        var pdate = startdate;
        if (startdate.getMonth() + 1 < '10') {
            if (startdate.getDate() < '10') {
                pdate = (startdate.getFullYear()) + '-' + '0' + (startdate.getMonth() + 1) + '-' + '0' + startdate.getDate()
                    + " " + startdate.getHours() + ":" + startdate.getMinutes() + ":" + startdate.getSeconds();
            } else {
                pdate = (startdate.getFullYear()) + '-' + '0' + (startdate.getMonth() + 1) + '-' + startdate.getDate()
                    + " " + startdate.getHours() + ":" + startdate.getMinutes() + ":" + startdate.getSeconds();
            }
        } else {
            if (firstDay.getDate() < '10') {
                pdate = (startdate.getFullYear()) + '-' + (startdate.getMonth() + 1) + '-' + '0' + startdate.getDate()
                    + " " + startdate.getHours() + ":" + startdate.getMinutes() + ":" + startdate.getSeconds();
            } else {
                pdate = (startdate.getFullYear()) + '-' + (startdate.getMonth() + 1) + '-' + startdate.getDate()
                    + " " + startdate.getHours() + ":" + startdate.getMinutes() + ":" + startdate.getSeconds();
            }
        };
        $scope.pTime = pdate;
        $("#lblSelPunch").text(pdate);
        $("#divPunchTbl *").attr("disabled", "disabled").off("click");
    };
    $scope.CreateAttdCorrEntry = function (data) {
        document.getElementById("btnSubmit").disabled = true;
        if ((typeof (data) === "undefined") || (typeof (data.Reason) === "undefined") || (typeof (data.IO) === "undefined")) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Fill All Details.</strong></div>";
            $('#MessageBox').show();
            document.getElementById("btnSubmit").disabled = false;
            return false;
        };
        var puncht = $scope.pTime;
        if (loc === "IPU" && (typeof (puncht) === "undefined")) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Select Punch Date Time</strong></div>";
            $('#MessageBox').show();
            document.getElementById("btnSubmit").disabled = false;
            return false;
        } else if (loc !== "IPU" && (typeof (data.punchTime) === "undefined")) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Select Punch Date Time</strong></div>";
            $('#MessageBox').show();
            document.getElementById("btnSubmit").disabled = false;
            return false;
        };
        var now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        jsonObj = {};
        jsonObj.Id = 0;
        jsonObj.AddDate = now;
        jsonObj.EmpUnqId = $("#myEmpUnqId").val();
        jsonObj.Reason = data.Reason;
        jsonObj.Remarks = "";
        jsonObj.ReleaseStrategy = $("#myEmpUnqId").val();
        jsonObj.ReleaseStatusCode = "N";
        jsonObj.InTime = null;
        jsonObj.InTimeUser = null;
        jsonObj.OutTime = null;
        jsonObj.OutTimeUser = null;
        jsonObj.PunchType = "A";
        jsonObj.InOutFlag = data.IO;
        if (loc === "IPU") { jsonObj.AttdPunchTime = puncht; } else { jsonObj.AttdPunchTime = data.punchTime; };
        jsonObj.PostingFlag = false;
        jsonObj.MissedPunchReleaseStatus = null;
        jsonObj = JSON.stringify(jsonObj);
        var ace = new XMLHttpRequest();
        ace.open('POST', $scope._Conpath + 'MissedPunch/CreateMissedPunch', true);
        ace.setRequestHeader("Content-type", "application/json");
        ace.onreadystatechange = function () {
            if (ace.readyState === 4 && ace.status === 200) {
                if (data.Reason === "Punched but not accepted by M/C" || data.Reason === "Error in the Punching Card") {
                    document.getElementById("InfoMessageBox").innerHTML =
                        "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<h2>Report in Time Office.</h2></div>";
                    $('#InfoMessageBox').show();
                };
                $("#cmbIOflag option:first").attr("selected", true);
                document.getElementById("cmbIOflag").disabled = false;
                document.getElementById("time").value = "";
                document.getElementById("time").disabled = false;
                document.getElementById("punchTime").value = "";
                document.getElementById("punchTime").disabled = false;
                $("#tblAttd").find("tr:not(:first)").remove();
                $("#lblSelPunch").text("");
                $("#tblTripod").find("tr:not(:first)").remove();
                $("#cmbReason option:first").attr("selected", true);
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Submited Successfully..</strong></div>";
                $('#MessageBox').show();
            } else if (ace.status === 400 || ace.status === 403 || ace.status === 404 || ace.status === 408 || ace.status === 500) {
                var str = ace.responseText.replace("[", "").replace("]", "").replace("{", "").replace("}", "").toString();
                var fields = str.split(",");
                var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er +
                    "</strong></div>";
                $("#MessageBox").show();
            };
        }; ace.send(jsonObj);
    };
    /*-----END ATTENDANCE CORRECTION-----*/
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    $scope.exportAllData = function (name) {
        setTimeout(function () {
            $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
            var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = name + d;
            $scope.JSONToCSVConvertor($scope.exportObj, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv")
        }, 100)
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) {
            var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n"
        } if ("" === CSV) return void alert("Invalid data"); var fileName = ""; fileName += ReportTitle.replace(/ /g, "_"); var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link)
    };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });