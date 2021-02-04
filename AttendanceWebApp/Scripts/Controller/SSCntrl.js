var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("ShiftScheduleCntroller", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(); $scope.currentPage = 1; $scope.itemsPerPage = 50; $scope.alluserlist = []; $scope.jsondata; $scope._Conpath = ""; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof _ConPath === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } } });
    $scope.jsondata; var rlsarr = [];
    $scope.GetEmpInfo = function () { var e_Code = $('#txtEmpCode').val(); if (e_Code === '') { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Enter Employee Code First.. </strong>" + "</div>"; $('#MessageBox').show(); return false; }; var emp = new XMLHttpRequest(); emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + e_Code, true); emp.setRequestHeader('Accept', 'application/json'); emp.onreadystatechange = function () { if (emp.readyState === 4) { if (emp.responseText === "" && e_Code.length === 6) { alert("Please Enter Valid Employee Code .."); document.getElementById("txtEmpCode").value = ""; return false; }; var json = JSON.parse(emp.responseText); $scope.empdata = json; $scope.$digest(); $('#lblEmpName').text($scope.empdata[0].empName); }; }; emp.send(); };
    $scope.GetRelesaseStratey = function () { var rel = new XMLHttpRequest; rel.open("GET", $scope._Conpath + "ReleaseStrategy/GetReleaseStrategy?releaseGroup=" + $("#releaseGroupCode").val() + "&empUnqId=" + $("#myEmpUnqId").val(), !0), rel.setRequestHeader("Accept", "application/json"), rel.onreadystatechange = function () { if (4 === rel.readyState) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1, $scope.$digest() } }, rel.send() };
    $scope.Download = function (mode) {
        if (mode !== "0") { $("#loading").removeClass("deactivediv"); $("#loading").addClass("activediv"); };
        var ssd = new XMLHttpRequest(); ssd.open("GET", $scope._Conpath + "ShiftSchedule/GetSchedule?empunqid=" + $("#myEmpUnqId").val() + "&mode=" + mode, true); ssd.setRequestHeader("Accept", "application/json"); ssd.onreadystatechange = function () {
            if (ssd.readyState === 4 && ssd.status === 200) {
                var json1 = JSON.parse(ssd.responseText); $scope.jsondata = json1; var la = new Array; la = json1; var ReportName = "";
                if (mode === "0") { ReportName = "ShiftSchedule_"; $scope.exportAllData(ReportName); }; if (mode === "1") { ReportName = "CurrentMonthAll_"; }; if (mode === "2") { ReportName = "CurrentMonthReleased_"; }; if (mode === "3") { ReportName = "PreviousMonthAll_"; }; if (mode === "4") { ReportName = "PreviousMonthReleased_"; };
                var cnt = 0; var myArray = []; for (var i = 0; i < la.length; i++) { myArray.push([]); let counter = 1; for (let key in la[i]) { myArray[cnt]["d" + ('00' + counter).slice(-2)] = la[i][key]; counter++; }; cnt++; };
                $scope.ssddata = myArray; $scope.$digest(); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Save File where you want...</strong></div>"; $("#MessageBox").show();
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
            } else {
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
                var json1 = JSON.parse(ssd.responseText);
                if (ssd.status === 400) {
                    $scope.sslddata = json1; $scope.$digest(); $("#divDL").show();
                    if (mode !== "0") {
                        document.getElementById("MessageBox").innerHTML =
                            "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                            "<strong>" + ssd.responseText + "</strong ></div> ";
                    };
                } else if (ssd.status === 500) {
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>" + ssd.responseText + "</strong ></div> ";
                } else {
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong> Shift Schedule for the month is already uploaded which is displayed below." + " Used Appropriate Option to change already uploaded shift schedule. " + "</strong ></div> ";
                }; $("#MessageBox").show();
            };
        }; ssd.send();
    };
    $scope.Upload = function () {
        $("#loading").removeClass("deactivediv"); $("#loading").addClass("activediv"); var data = new FormData(); var files = $("#files").get(0).files; if (files.length > 0) { for (f = 0; f < files.length; f++) { data.append("UploadedImage", files[f]); } }
        $.ajax({
            type: "POST", url: $scope._Conpath + "ShiftSchedule/UploadSchedule?empUnqId=" + $("#myEmpUnqId").val(), contentType: false, processData: false, data: data,
            success: function (result) {
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
                //Auto Mail Sending
                var maildata = []; maildata = result;
                var relsdata = []; relsdata = maildata[0]["applReleaseStatus"];
                var relsauth = ""; relsauth = relsdata[1]["releaseCode"];
                var rlsmail = new XMLHttpRequest();
                rlsmail.open('GET',
                    $scope._Conpath +
                    'AutoMail/SendMail?releaseGroupCode=' + maildata[0]["releaseGroupCode"] + '&id=' + maildata[0]["scheduleId"] + '&releaseAuth=' + relsauth, true);
                rlsmail.setRequestHeader("Content-type", "application/json");
                rlsmail.send();
                //Auto Mail End
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>File Uploaded Successfully...</strong></div>"; $("#MessageBox").show();
            },
            error: function (err) { $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv"); var errer = err.responseText.replace(/\"/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\[/g, "").replace(/\]/g, ""); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong> Error :~ " + errer + "<br/>" + "</strong></div>"; $("#MessageBox").show(); }
        });
    };
    $scope.GetSSList = function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var ssl = new XMLHttpRequest; ssl.open("GET", $scope._Conpath + "AppRelease/GetApplReleaseStatus?empUnqId=" + $("#myEmpUnqId").val() + "&releaseGroupCode=" + $("#releaseGroupCode").val(), !0), ssl.setRequestHeader("Accept", "application/json"), ssl.onreadystatechange = function () { if (4 === ssl.readyState) { $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"); var json = JSON.parse(ssl.responseText); rlsarr = json, $scope.ssdata = json, $scope.ssdata = $filter("orderBy")($scope.ssdata, "-scheduleId"), $scope.curPage1 = 0, $scope.pageSize1 = 10, $scope.$digest() } }, ssl.send() };
    $scope.GetSchedule = function (data) { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var FromDate, ToDate; if ("undefined" == typeof data || "undefined" == typeof data.FromDt || "undefined" == typeof data.ToDt) { $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"); var date = new Date, firstDay = new Date(date.getFullYear(), date.getMonth(), 1), lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate(), ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate() } else FromDate = data.FromDt, ToDate = data.ToDt; var GSL = new XMLHttpRequest; GSL.open("GET", $scope._Conpath + "ShiftSchedule/GetSchedule?fromDate=" + FromDate + "&toDate=" + ToDate + "&OpenMonth=" + data.yearMonth, !0), GSL.setRequestHeader("Accept", "application/json"), GSL.onreadystatechange = function () { if (4 === GSL.readyState && 200 === GSL.status) { $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"); var json = JSON.parse(GSL.responseText); $scope.GSLdata = json, $scope.GSLdata = $filter("orderBy")($scope.GSLdata, "empUnqId"), $scope.jsondata = $scope.GSLdata, $scope.curPage1 = 0, $scope.pageSize1 = 10, $scope.$digest() } }, GSL.send() };
    $scope.GetOpenMonth = function () { const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; var mon = new XMLHttpRequest; mon.open("GET", $scope._Conpath + "ShiftSchedule/GetOpenMonth", !0), mon.setRequestHeader("Content-type", "application/json"), mon.onreadystatechange = function () { if (4 === mon.readyState && 200 === mon.status) { var msg = mon.responseText, pretemp = msg.slice(1, 11), p = pretemp.split("-"), pdate = new Date(p[0], p[1] - 1, p[2]), pdate1 = monthNames[pdate.getMonth()]; document.getElementById("CurOpenMonth").innerHTML = "<div><h4>Current Open Month is : " + pdate1 + ", " + pdate.getFullYear() + "</h4></div>" } }, mon.send() };
    $scope.ChangeOpenMonth = function (openMonth) { var yearmonth, opmnth = openMonth.yearMonth; d = new Date(opmnth); yearmonth = d.getMonth() + 1 < "10" ? d.getFullYear() + "0" + (d.getMonth() + 1) : d.getFullYear().toString() + (d.getMonth() + 1); var opm = new XMLHttpRequest; opm.open("PUT", $scope._Conpath + "ShiftSchedule/ChangeOpenMonth?yearMonth=" + yearmonth, !0); opm.setRequestHeader("Content-type", "application/json"); opm.onreadystatechange = function () { if (4 === opm.readyState && 200 === opm.status) { $scope.GetOpenMonth(); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Open Month Changed Successfully.. </strong></div>"; $("#MessageBox").show(); document.getElementById("openMonth").value = ""; } else if (400 === opm.status) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Open Month not Changed.. </strong></div>"; $("#MessageBox").show(); document.getElementById("openMonth").value = ""; }; }; opm.send() };
    $scope.UpdateDownload = function () {
        var ssd = new XMLHttpRequest(); ssd.open("GET", $scope._Conpath + "ShiftScheduleUpdate/GetSchedule?empunqid=" + $("#myEmpUnqId").val(), true); ssd.setRequestHeader("Accept", "application/json");
        ssd.onreadystatechange = function () {
            if (ssd.readyState === 4 && ssd.status === 200) {
                var json1 = JSON.parse(ssd.responseText); $scope.jsondata = json1; $scope.ssddata = json1; $scope.$digest(); var la = new Array; la = json1; $scope.exportAllData("ShiftSchedule_");
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Save File where you want...</strong></div>"; $("#MessageBox").show();
            } else {
                var json1 = JSON.parse(ssd.responseText);
                if (ssd.status === 400) { $scope.sslddata = json1; $scope.$digest(); $("#divDL").show(); }
                else if (ssd.status === 500) {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>" + ssd.responseText + "</strong ></div> ";
                } else {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong> Shift Schedule for the month is already uploaded which is displayed below." + " Used Appropriate Option to change already uploaded shift schedule. " + "</strong ></div> ";
                }; $("#MessageBox").show();
            };
        };
        ssd.send();
    };
    $scope.UpdateUpload = function () {
        $("#loading").removeClass("deactivediv"); $("#loading").addClass("activediv"); var data = new FormData(); var files = $("#files").get(0).files;
        if (files.length > 0) { for (f = 0; f < files.length; f++) { data.append("UploadedImage", files[f]); } }
        $.ajax({
            type: "POST", url: $scope._Conpath + "ShiftScheduleUpdate/UpldateSchedule?empUnqId=" + $("#myEmpUnqId").val(), contentType: false, processData: false, data: data,
            success: function (result) {
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
                //Auto Mail Sending
                var maildata = []; maildata = result;
                var relsdata = []; relsdata = maildata[0]["applReleaseStatus"];
                var relsauth = ""; relsauth = relsdata[1]["releaseCode"];
                var rlsmail = new XMLHttpRequest();
                rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMail?releaseGroupCode=' + maildata[0]["releaseGroupCode"] + '&id=' + maildata[0]["scheduleId"] +
                    '&releaseAuth=' + relsauth, true);
                rlsmail.setRequestHeader("Content-type", "application/json"); rlsmail.send();
                //Auto Mail End
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>File Uploaded Successfully...</strong></div>";
                $("#MessageBox").show();
            },
            error: function (err) {
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
                var errer = err.responseText.replace(/\"/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\[/g, "").replace(/\]/g, "");
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong> Error :~ " + errer + "<br/>" + "</strong></div>";
                $("#MessageBox").show();
            }
        });
    };
    $scope.UpdateSSReleaseStatus = function (releaseStatusCode, rlsssid) {
        var d = new Date(); var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        var detailarr = [];
        for (var r = 0; r <= rlsarr.length; r++) { var ssid = rlsarr[r]["scheduleId"]; if (ssid === rlsssid) { detailarr = rlsarr[r]["schedules"][0].applReleaseStatus; break; } }
        var dataarr = [];
        for (i = 0; i < detailarr.length; i++) { var r_auth = detailarr[i]["releaseAuth"]; if (r_auth === $("#myEmpUnqId").val()) { dataarr = detailarr[i]; break; } }
        var jsonObj = {};
        jsonObj.YearMonth = detailarr[0].yearMonth; jsonObj.ReleaseGroupCode = detailarr[0].releaseGroupCode; jsonObj.ApplicationId = rlsssid;
        jsonObj.ReleaseStrategy = detailarr[0].releaseStrategy; jsonObj.ReleaseStrategyLevel = detailarr[0].releaseStrategyLevel; jsonObj.ReleaseCode = dataarr.releaseCode;
        jsonObj.ReleaseStatusCode = detailarr[0].releaseStatusCode; jsonObj.ReleaseDate = strDate; jsonObj.ReleaseAuth = dataarr.releaseAuth;
        jsonObj.IsFinalRelease = dataarr.isFinalRelease; jsonObj.Remarks = ""; jsonObj.LeaveApplications_YearMonth = null; jsonObj.LeaveApplications_LeaveAppId = null;
        jsonObj = JSON.stringify(jsonObj);
        var xhr2 = new XMLHttpRequest();
        xhr2.open("POST", $scope._Conpath + "AppRelease/UpdateGpStatus?empUnqId=" + $("#myEmpUnqId").val() + "&releaseStatusCode=" + releaseStatusCode + "&releaseGroupCode=" + $("#releaseGroupCode").val(), true);
        xhr2.setRequestHeader("Content-type", "application/json"); xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4 && xhr2.status === 200) {
                if (releaseStatusCode === "F") { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Shift Schedule Approved Sucesfully.. </strong></div>"; }
                if (releaseStatusCode === "R") { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Shift Schedule Rejected Sucesfully.. </strong></div>"; }
                $("#MessageBox").show(); $scope.GetSSList();
            } else {
                if (releaseStatusCode === "F") { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Shift Schedule Not Approved .. </strong></div>"; }
                if (releaseStatusCode === "R") { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Shift Schedule Not Rejected .. </strong></div>"; }
                $("#MessageBox").show(); $scope.GetSSList();
            }
        }; xhr2.send(jsonObj);
    };
    $scope.GetEmployeeSS = function () {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var sse = new XMLHttpRequest; sse.open("GET", $scope._Conpath + "ShiftSchedule/GetSchedule?empUnqId=" + $("#myEmpUnqId").val(), true);
        sse.setRequestHeader("Accept", "application/json");
        sse.onreadystatechange = function () {
            if (4 === sse.readyState) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
                const json = JSON.parse(sse.responseText); $scope.sseData = json; $scope.$digest();
            };
        }; sse.send();
    };
    var c = 0;
    $scope.ToValidate = function () {
        var chkFrom = document.getElementById("FromDt");
        var chkTo = document.getElementById("ToDt");
        var FromDate = chkFrom.value;
        var ToDate = chkTo.value;
        if (FromDate === "") {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Select From Date First...</strong></div>";
            $("#MessageBox").show();
            document.getElementById("FromDt").value = "";
            document.getElementById("ToDt").value = "";
            return false;
        }
        var date1 = new Date(FromDate);
        var date2 = new Date(ToDate);
        var diff = (date1 - date2) / (1e3 * 60 * 60 * 24) * -1 + 1;
        if (diff === "NaN" || diff <= 0) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Select valid dates</strong></div>";
            $("#MessageBox").show();
            document.getElementById("FromDt").value = "";
            document.getElementById("ToDt").value = "";
            return false;
        }
        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>";
            $("#MessageBox").show();
            return false;
        }
        var today = new Date();
        if (date1 > today || date2 > today) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Future date selection are not allowed.</strong></div>";
            $("#MessageBox").show();
            return false;
        }

    };
    $scope.AddtoList = function (scData) {
        document.getElementById("txtEmpCode").disabled = true; document.getElementById("txtRemarks").disabled = true;
        c = c + 1; $(".tempRow").remove();
        row = $("<tr>" +
            "<td style='text-align:center;'><input type='hidden' name='EmpUnqID' value='" + $("#txtEmpCode").val() + "'>" + $("#txtEmpCode").val() + "</td>" +
            "<td style='text-align:center;'><input type='hidden' name='Sr' value='" + c + "'>" + c + "</td>" +
            "<td style='text-align:center;'><input type='hidden' name='FromDate' value='" + scData.FromDt + "'>" + scData.FromDt + "</td>" +
            "<td style='text-align:center;'><input type='hidden' name='ToDate' value='" + scData.ToDt + "'>" + scData.ToDt + "</td>" +
            "<td style='text-align:center;'><input type='hidden' name='ShiftCode' value='" + scData.ShiftCode + "'>" + scData.ShiftCode + "</td>" +
            "<td style='text-align:center;'><input type='hidden' name='Reason' value='" + scData.Reason + "'>" + scData.Reason + "</td>" +
            "</tr>");
        $("#aliasTable").append(row);
        document.getElementById("FromDt").value = ""; document.getElementById("ToDt").value = ""; document.getElementById("txtReason").value = "";
        $("#cmbShift option:first").attr("selected", true);
    };
    $scope.CreateShiftChange = function () {
        var d = new Date(); var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var jsonObj = {}; var TableData = storeTblValues(); TableData = JSON.stringify(TableData);
        function storeTblValues() {
            var TableData = new Array();
            $('#aliasTable tr').each(function (row, tr) {
                TableData[row] = {
                    "RequestId": 0, "EmpUnqId": $(tr).find('td:eq(0)').text(), "Sr": $(tr).find('td:eq(1)').text(), "FromDt": $(tr).find('td:eq(2)').text(),
                    "ToDt": $(tr).find('td:eq(3)').text(), "ShiftCode": $(tr).find('td:eq(4)').text(), "Reason": $(tr).find('td:eq(5)').text()
                }
            }); TableData.shift();
            jsonObj.RequestId = 0; jsonObj.EmpUnqId = $("#txtEmpCode").val(); jsonObj.RequestDate = dt; jsonObj.Remarks = $("#txtRemarks").val();
            jsonObj.ReleaseGroupCode = $("#releaseGroupCode").val(); jsonObj.ReleaseStrategy = $("#txtEmpCode").val(); jsonObj.AddDt = dt;
            jsonObj.AddUser = $("#myEmpUnqId").val(); jsonObj.RequestDetails = TableData; jsonObj.RequestReleases = null; return jsonObj;
        };
        var sch = new XMLHttpRequest(); sch.open('POST', $scope._Conpath + 'Request/CreateRequest', true); sch.setRequestHeader("Content-type", "application/json");
        sch.onreadystatechange = function () {
            if (sch.readyState === 4 && sch.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Created Sucesfully.. </strong></div>"; $('#MessageBox').show();
                document.getElementById("txtEmpCode").value = ""; document.getElementById("FromDt").value = ""; document.getElementById("ToDt").value = "";
                document.getElementById("txtReason").value = ""; document.getElementById("txtRemarks").value = ""; $("#cmbShift option:first").attr("selected", true);
                $("#aliasTable").find("tr:not(:first)").remove();
            } else {
                var errer = sch.responseText.replace(/\"/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\[/g, "").replace(/\]/g, "");
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + errer +
                    " </strong></div>"; $('#MessageBox').show();
            }
        };
        sch.send(TableData);
    };
    var sclArray = new Array();
    $scope.GetShiftChangeList = function (mode) {
        var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if (firstDay.getMonth() + 1 < '10') { firstDay = (firstDay.getFullYear()) + '-' + '0' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate(); } else { firstDay = (firstDay.getFullYear()) + '-' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate(); }
        if (lastDay.getMonth() + 1 < '10') { lastDay = (lastDay.getFullYear()) + '-' + '0' + (lastDay.getMonth() + 1) + '-' + lastDay.getDate(); } else { lastDay = (lastDay.getFullYear()) + '-' + (lastDay.getMonth() + 1) + '-' + lastDay.getDate(); }
        var scl = new XMLHttpRequest();
        scl.open('GET', $scope._Conpath + "Request/GetRequest?fromDt=" + firstDay + "&toDt=" + lastDay + "&mode=" + mode + "&empUnqId=" + $("#myEmpUnqId").val(), true); scl.setRequestHeader("Accept", "application/json");
        scl.onreadystatechange = function () { if (scl.readyState === 4 && scl.status === 200) { var json = JSON.parse(scl.responseText); $scope.sclData = json; sclArray = $scope.sclData; for (var i = 0; i < $scope.sclData.length; i++) { $scope.sclData[i].sanDate = "'" + $scope.sclData[i].sanDate.substring(0, $scope.sclData[i].sanDate.indexOf("T")); }; $scope.jsondata = $scope.sclData; $scope.$digest(); }; };
        scl.send();
    };
    $scope.PopulateData = function (requestId) { var scDt = new Array(); for (var i = 0; i < sclArray.length; i++) { if (requestId === sclArray[i].requestId) { var scDt = sclArray[i].requestDetails; } }; $scope.scDetails = scDt; $("#ConformModel").modal("show"); };
    $scope.ReleaseShiftChange = function (ssChange, rmkData, sts) {
        var rmks = "";
        if (sts === "R") {
            if ((typeof (rmkData) === "undefined") || (typeof (rmkData.remarks) === "undefined")) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Please Enter Remarks For Rejection</strong></div>"; $('#MessageBox').show(); return false;
            } else { rmks = rmkData.remarks; };
        } else { if ((typeof (rmkData) === "undefined")) { rmks = ""; } else { rmks = rmkData.remarks; }; };
        var d = new Date(); var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var requestReleases = ssChange.requestReleases; var releaser = $("#myEmpUnqId").val(); var finalRelease, releaseLevel, releaseCode;
        for (var i = 0; i < requestReleases.length; i++) {
            var levelReleaser = requestReleases[i].releaseCode;
            if (levelReleaser === releaser) {
                finalRelease = requestReleases[i].isFinalRelease; releaseLevel = requestReleases[i].releaseStrategyLevel; releaseCode = requestReleases[i].releaseCode;
            }
        }
        var jsonObj = {}; jsonObj.RequestId = ssChange.requestId; jsonObj.EmpUnqId = ssChange.empUnqId; jsonObj.ReleaseGroupCode = ssChange.releaseGroupCode;
        jsonObj.ReleaseStrategy = ssChange.releaseStrategy; jsonObj.ReleaseStrategyLevel = releaseLevel; jsonObj.ReleaseCode = releaseCode;
        jsonObj.ReleaseStatusCode = sts; jsonObj.ReleaseDate = dt; jsonObj.ReleaseAuth = $("#myEmpUnqId").val(); jsonObj.IsFinalRelease = finalRelease;
        jsonObj.Remarks = rmks || ""; jsonObj = JSON.stringify(jsonObj);
        var rsc = new XMLHttpRequest(); rsc.open('POST', $scope._Conpath + 'Request/ReleaseRequest?releaser=' + $("#myEmpUnqId").val(), true);
        rsc.setRequestHeader("Content-type", "application/json"); rsc.onreadystatechange = function () {
            if (rsc.readyState === 4 && rsc.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Release Sucesfully.. </strong></div>"; $('#MessageBox').show();
                $scope.GetShiftChangeList(2);
            } else {
                var errer = rsc.responseText.replace(/\"/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\[/g, "").replace(/\]/g, "");
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + errer +
                    " </strong></div>"; $('#MessageBox').show();
            }
        };
        rsc.send(jsonObj);
    };
    $scope.PostRequest = function (requestId, postingFlag, rmkData) {
        var rmks = ""; if (postingFlag === "R") {
            if ((typeof (rmkData) === "undefined") || (typeof (rmkData.remarks) === "undefined")) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Please Enter Remarks For Rejection</strong></div>"; $('#MessageBox').show(); return false;
            } else { rmks = rmkData.remarks; };
        } else { if ((typeof (rmkData) === "undefined")) { rmks = ""; } else { rmks = rmkData.remarks; }; };
        var scp = new XMLHttpRequest();
        scp.open("PUT", $scope._Conpath + "Request/PostRequest?requestId=" + requestId + "&postingFlag=" + postingFlag + "&postUser=" + $("#myEmpUnqId").val() + "&remarks=" + rmks, true);
        scp.setRequestHeader("Content-type", "application/json"); scp.onreadystatechange = function () {
            if (scp.readyState === 4 && scp.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Post Sucesfully.. </strong></div>"; $('#MessageBox').show();
                $scope.GetShiftChangeList(3);
            } else {
                var errer = scp.responseText.replace(/\"/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\[/g, "").replace(/\]/g, "");
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + errer +
                    " </strong></div>"; $('#MessageBox').show();
            }
        };
        scp.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse }, $scope.exportAllData = function (ReportName) { setTimeout(function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = ReportName + d; $scope.JSONToCSVConvertor($scope.jsondata, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv") }, 100) }, $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) { var f = arrData[i][index]; null === f && (f = ""), row += '"' + f + '",' } row.slice(0, row.length - 1), CSV += row + "\r\n" } if ("" === CSV) return void alert("Invalid data"); var fileName = ReportTitle.replace(/ /g, "_"), uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link) };
}); app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });