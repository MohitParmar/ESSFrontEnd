var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("LeaveReportCntrloller", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), $scope.currentPage = 1, $scope.itemsPerPage = 25, $scope.alluserlist = [];
    $scope._Conpath = ""; var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol;
    $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") });
    $scope.InfoPL;
    $scope.ToValidate = function () { var chkFrom = document.getElementById("FromDt"), chkTo = document.getElementById("ToDt"), FromDate = chkFrom.value, ToDate = chkTo.value, date1 = new Date(FromDate), date2 = new Date(ToDate); return date1 > date2 ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>", $("#MessageBox").show(), !1) : !0 };
    $scope.GetLeaveInfo = function (entity) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var FromDate, ToDate; if ("undefined" == typeof entity || "undefined" == typeof entity.FromDt || "undefined" == typeof entity.ToDt) { var date = new Date, firstDay = new Date(date.getFullYear(), date.getMonth(), 1), lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate(), ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate() } else FromDate = entity.FromDt, ToDate = entity.ToDt; var date1 = new Date(FromDate), date2 = new Date(ToDate); if (date1 > date2) return document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Valid Date Range.. </strong></div>", $("#MessageBox").show(), !1; var xhr = new XMLHttpRequest; xhr.open("GET", $scope._Conpath + "LeaveReport/GetLeaves?empunqid=" + $("#myEmpUnqId").val() + "&fromDt=" + FromDate + "&toDt=" + ToDate, !0), xhr.setRequestHeader("Accept", "application/json"), xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                var json = JSON.parse(xhr.responseText), la = new Array; la = json;
                for (var empName, statName, releaseDate, releaseAuth, releaserName, releaserRemarks, applReleaseStatus = new Array, leaveApplicationDetails = new Array, cnt = 0, myArray = [], i = 0; i < la.length; i++) {
                    empName = la[i].employee.empName, statName = la[i].stations.statName, applReleaseStatus = la[i].applReleaseStatus;
                    leaveApplicationDetails = la[i].leaveApplicationDetails;
                    for (var j = 0; j < applReleaseStatus.length; j++) {
                        releaseDate = applReleaseStatus[j].releaseDate,
                            releaseAuth = applReleaseStatus[j].releaseAuth,
                            releaserName = applReleaseStatus[j].releaserName,
                            releaserRemarks = applReleaseStatus[j].remarks;
                    };
                    for (var l = 0; l < leaveApplicationDetails.length; l++) {
                        myArray.push([]);
                        myArray[cnt].leaveAppId = la[i].leaveAppId;
                        myArray[cnt].addDt = la[i].addDt.substring(0, la[i].addDt.indexOf("T"));
                        myArray[cnt].releaseStatusCode = la[i].releaseStatusCode;
                        myArray[cnt].releaseDate = releaseDate ? releaseDate.substring(0, releaseDate.indexOf("T")) : "";
                        myArray[cnt].finalReleaser = releaseAuth || "";
                        myArray[cnt].releaserName = releaserName;
                        myArray[cnt].releaserRemarks = releaserRemarks;
                        myArray[cnt].releaseStatusCode = la[i].releaseStatusCode;
                        myArray[cnt].empUnqId = la[i].empUnqId;
                        myArray[cnt].empName = empName;
                        myArray[cnt].statName = statName;
                        if (leaveApplicationDetails[l].leaveTypeCode === "OD") { myArray[cnt].remarks = leaveApplicationDetails[l].placeOfVisit; } else { myArray[cnt].remarks = leaveApplicationDetails[l].remarks; };
                        myArray[cnt].leaveAppItem = leaveApplicationDetails[l].leaveAppItem;
                        myArray[cnt].leaveTypeCode = leaveApplicationDetails[l].leaveTypeCode;
                        myArray[cnt].fromDt = leaveApplicationDetails[l].fromDt.substring(0, leaveApplicationDetails[l].fromDt.indexOf("T"));
                        myArray[cnt].toDt = leaveApplicationDetails[l].toDt.substring(0, leaveApplicationDetails[l].toDt.indexOf("T"));
                        myArray[cnt].totalDays = leaveApplicationDetails[l].totalDays;
                        myArray[cnt].halfDayFlag = leaveApplicationDetails[l].halfDayFlag;
                        cnt++;
                    }; leaveApplicationDetails = "";
                }; $scope.data = myArray, $scope.InfoPL = $scope.data, $scope.data = $filter("orderBy")($scope.data, "-leaveAppId"), $scope.curPage = 0, $scope.pageSize = 25, $scope.$digest(), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv")
            };
        }; xhr.send();
    };
    $scope.GetPendingLeaveInfo = function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var xhr = new XMLHttpRequest; xhr.open("GET", $scope._Conpath + "LeaveReport/GetLeaves", !0), xhr.setRequestHeader("Accept", "application/json"), xhr.onreadystatechange = function () { if (4 === xhr.readyState) { var json = JSON.parse(xhr.responseText), la = new Array; la = json; for (var empName, statName, releaseDate1, releaseDate2, releaseDate3, applReleaseStatus = new Array, leaveApplicationDetails = new Array, releaseAuth1 = "", releaserName1 = "", releaserRemarks1 = "", releaseStatusCode1 = "", releaseAuth2 = "", releaserName2 = "", releaserRemarks2 = "", releaseStatusCode2 = "", releaseAuth3 = "", releaserName3 = "", releaserRemarks3 = "", releaseStatusCode3 = "", cnt = 0, myArray = [], i = 0; i < la.length; i++) { empName = la[i].employee.empName, statName = la[i].stations.statName, applReleaseStatus = la[i].applReleaseStatus, leaveApplicationDetails = la[i].leaveApplicationDetails; for (var j = 0; j < applReleaseStatus.length; j++)0 == j && (releaseDate1 = applReleaseStatus[j].releaseDate || null, releaseAuth1 = applReleaseStatus[j].releaseAuth || "", releaserName1 = applReleaseStatus[j].releaserName || "", releaserRemarks1 = applReleaseStatus[j].remarks || "", releaseStatusCode1 = applReleaseStatus[j].releaseStatusCode || ""), 1 == j && (releaseDate2 = applReleaseStatus[j].releaseDate || null, releaseAuth2 = applReleaseStatus[j].releaseAuth || "", releaserName2 = applReleaseStatus[j].releaserName || "", releaserRemarks2 = applReleaseStatus[j].remarks || "", releaseStatusCode2 = applReleaseStatus[j].releaseStatusCode || ""), 2 == j && (releaseDate3 = applReleaseStatus[j].releaseDate || null, releaseAuth3 = applReleaseStatus[j].releaseAuth || "", releaserName3 = applReleaseStatus[j].releaserName || "", releaserRemarks3 = applReleaseStatus[j].remarks || "", releaseStatusCode3 = applReleaseStatus[j].releaseStatusCode || ""); for (var l = 0; l < leaveApplicationDetails.length; l++)myArray.push([]), myArray[cnt].leaveAppId = la[i].leaveAppId, myArray[cnt].addDt = la[i].addDt.substring(0, la[i].addDt.indexOf("T")), myArray[cnt].releaseStatusCode = la[i].releaseStatusCode, myArray[cnt].releaseDate1 = releaseDate1 ? releaseDate1.substring(0, releaseDate1.indexOf("T")) : "", myArray[cnt].Releaser1 = releaseAuth1 || "", myArray[cnt].releaserName1 = releaserName1 || "", myArray[cnt].releaserRemarks1 = releaserRemarks1 || "", myArray[cnt].releaseStatusCode1 = releaseStatusCode1 || "", myArray[cnt].releaseDate2 = releaseDate2 ? releaseDate2.substring(0, releaseDate2.indexOf("T")) : "", myArray[cnt].Releaser2 = releaseAuth2 || "", myArray[cnt].releaserName2 = releaserName2 || "", myArray[cnt].releaserRemarks2 = releaserRemarks2 || "", myArray[cnt].releaseStatusCode2 = releaseStatusCode2 || "", myArray[cnt].releaseDate3 = releaseDate3 ? releaseDate3.substring(0, releaseDate3.indexOf("T")) : "", myArray[cnt].Releaser3 = releaseAuth3 || "", myArray[cnt].releaserName3 = releaserName3 || "", myArray[cnt].releaserRemarks3 = releaserRemarks3 || "", myArray[cnt].releaseStatusCode3 = releaseStatusCode3 || "", myArray[cnt].empUnqId = la[i].empUnqId, myArray[cnt].empName = empName, myArray[cnt].statName = statName, myArray[cnt].remarks = leaveApplicationDetails[l].remarks, myArray[cnt].leaveAppItem = leaveApplicationDetails[l].leaveAppItem, myArray[cnt].leaveTypeCode = leaveApplicationDetails[l].leaveTypeCode, myArray[cnt].fromDt = leaveApplicationDetails[l].fromDt.substring(0, leaveApplicationDetails[l].fromDt.indexOf("T")), myArray[cnt].toDt = leaveApplicationDetails[l].toDt.substring(0, leaveApplicationDetails[l].toDt.indexOf("T")), myArray[cnt].totalDays = leaveApplicationDetails[l].totalDays, myArray[cnt].halfDayFlag = leaveApplicationDetails[l].halfDayFlag, cnt++; leaveApplicationDetails = "" } $scope.data = myArray, $scope.InfoPL = $scope.data, $scope.data = $filter("orderBy")($scope.data, "-leaveAppId"), $scope.curPage = 0, $scope.pageSize = 25, $scope.$digest(), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv") } }, xhr.send() };
    $scope.GetPostedLeaveInfo = function (data) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var FromDate, ToDate;
        if ("undefined" == typeof data || "undefined" == typeof data.FromDt || "undefined" == typeof data.ToDt) {
            var date = new Date(),
                firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1),
                lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate(),
                ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { FromDate = data.FromDt, ToDate = data.ToDt; };
        var date1 = new Date(FromDate), date2 = new Date(ToDate);
        if (date1 > date2) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Valid Date Range.. </strong></div>";
            $("#MessageBox").show(); return false;
        };
        var sel = $("#cmbIsPosted").val(); xhr1 = new XMLHttpRequest();
        xhr1.open("GET", $scope._Conpath + "LeavePosting/GetLeaves?fromDt=" + FromDate + "&toDt=" + ToDate + "&postingFlg=" + sel, !0);
        xhr1.setRequestHeader("Accept", "application/json"), xhr1.onreadystatechange = function () {
            if (4 === xhr1.readyState) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
                var json = JSON.parse(xhr1.responseText), la = new Array();
                la = json;
                for (var empName, statName, releaseDate, releaseAuth, releaserName, releaserRemarks, location, applReleaseStatus = new Array(), leaveApplicationDetails = new Array(), cnt = 0, myArray = [], i = 0; i < la.length; i++) {
                    empName = la[i].employee.empName, location = la[i].employee.location, statName = la[i].stations.statName,
                        applReleaseStatus = la[i].applReleaseStatus;
                    for (var j = 0; j < applReleaseStatus.length; j++) {
                        releaseDate = applReleaseStatus[j].releaseDate,
                            releaseAuth = applReleaseStatus[j].releaseAuth, releaserName = applReleaseStatus[j].releaserName,
                            releaserRemarks = applReleaseStatus[j].remarks;
                    };
                    leaveApplicationDetails = la[i].leaveApplicationDetails;
                    for (var l = 0; l < leaveApplicationDetails.length; l++) {
                        myArray.push([]);
                        myArray[cnt].yearMonth = la[i].yearMonth;
                        myArray[cnt].location = location;
                        myArray[cnt].leaveAppId = la[i].leaveAppId;
                        myArray[cnt].addDt = la[i].addDt.substring(0, la[i].addDt.indexOf("T"));
                        myArray[cnt].releaseStatusCode = la[i].releaseStatusCode;
                        myArray[cnt].releaseDate = releaseDate ? releaseDate.substring(0, releaseDate.indexOf("T")) : "";
                        myArray[cnt].finalReleaser = releaseAuth || "", myArray[cnt].releaserName = releaserName;
                        myArray[cnt].releaserRemarks = releaserRemarks;
                        "" != leaveApplicationDetails[l].postedDt && null != leaveApplicationDetails[l].postedDt ? myArray[cnt].postedDt = leaveApplicationDetails[l].postedDt.substring(0, leaveApplicationDetails[l].postedDt.indexOf("T")) : myArray[cnt].postedDt = "";
                        myArray[cnt].empUnqId = la[i].empUnqId;
                        myArray[cnt].empName = empName;
                        myArray[cnt].statName = statName;
                        if (leaveApplicationDetails[l].leaveTypeCode === "OD") { myArray[cnt].remarks = leaveApplicationDetails[l].placeOfVisit; } else { myArray[cnt].remarks = leaveApplicationDetails[l].remarks; };
                        myArray[cnt].additionalRemarks = leaveApplicationDetails[l].additionalRemarks;
                        myArray[cnt].leaveAppItem = leaveApplicationDetails[l].leaveAppItem;
                        myArray[cnt].leaveTypeCode = leaveApplicationDetails[l].leaveTypeCode;
                        myArray[cnt].isPosted = leaveApplicationDetails[l].isPosted;
                        myArray[cnt].fromDt = leaveApplicationDetails[l].fromDt.substring(0, leaveApplicationDetails[l].fromDt.indexOf("T"));
                        myArray[cnt].toDt = leaveApplicationDetails[l].toDt.substring(0, leaveApplicationDetails[l].toDt.indexOf("T"));
                        myArray[cnt].totalDays = leaveApplicationDetails[l].totalDays;
                        myArray[cnt].halfDayFlag = leaveApplicationDetails[l].halfDayFlag;
                        if (leaveApplicationDetails[l].leaveTypeCode === "CO" || leaveApplicationDetails[l].leaveTypeCode === "CO") {
                            myArray[cnt].coMode = leaveApplicationDetails[l].coMode;
                            var codt1 = leaveApplicationDetails[l].coDate1;
                            if (codt1 !== null && codt1 !== '') {
                                myArray[cnt].coDate1 = leaveApplicationDetails[l].coDate1.substring(0, leaveApplicationDetails[l].coDate1.indexOf("T"));
                            } else { myArray[cnt].coDate1 = ""; };
                            /*if (location === "JFL") {*/
                            var codt2 = leaveApplicationDetails[l].coDate2;
                            if (codt2 !== null && codt2 !== '') {
                                myArray[cnt].coDate2 = leaveApplicationDetails[l].coDate2.substring(0, leaveApplicationDetails[l].coDate2.indexOf("T"));
                            } else { myArray[cnt].coDate2 = ""; };
                            /*} else { myArray[cnt].coDate2 = ""; }*/
                        } else { myArray[cnt].coMode = ""; myArray[cnt].coDate1 = ""; myArray[cnt].coDate2 = ""; }
                        cnt++;
                    }; leaveApplicationDetails = "";
                }; $scope.pdata = myArray, $scope.InfoPL = $scope.pdata, $scope.curPage1 = 0, $scope.pageSize1 = 25, $scope.$digest();
            };
        }; xhr1.send();
    };
    $scope.GetDeptLeaveInfo = function (data) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var FromDate, ToDate;
        if ("undefined" == typeof data || "undefined" == typeof data.FromDt || "undefined" == typeof data.ToDt) {
            var date = new Date,
                firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1),
                lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate();
            ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else FromDate = data.FromDt, ToDate = data.ToDt;
        var date1 = new Date(FromDate), date2 = new Date(ToDate);
        if (date1 > date2) return document.getElementById("MessageBox").innerHTML =
            "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
            "<strong>Please Enter Valid Date Range.. </strong></div>",
            $("#MessageBox").show(), !1;
        var newArr = ["008", "013"];
        var jsonObj = new Array();
        jsonObj = JSON.stringify(newArr);
        xhr1 = new XMLHttpRequest;
        xhr1.open("PUT", $scope._Conpath + "LeavePosting/GetDeptLeaves?fromDt=" + FromDate + "&toDt=" + ToDate, !0);
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.onreadystatechange = function () {
            if (4 === xhr1.readyState) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
                var json = JSON.parse(xhr1.responseText);
                la = new Array;
                la = json;
                for (var empName, statName, releaseDate, releaseAuth, releaserName, releaserRemarks, location, applReleaseStatus = new Array, leaveApplicationDetails = new Array, cnt = 0, myArray = [], i = 0; i < la.length; i++) {
                    empName = la[i].employee.empName, location = la[i].employee.location, statName = la[i].stations.statName;
                    applReleaseStatus = la[i].applReleaseStatus;
                    for (var j = 0; j < applReleaseStatus.length; j++)
                        releaseDate = applReleaseStatus[j].releaseDate,
                            releaseAuth = applReleaseStatus[j].releaseAuth,
                            releaserName = applReleaseStatus[j].releaserName,
                            releaserRemarks = applReleaseStatus[j].remarks;
                    leaveApplicationDetails = la[i].leaveApplicationDetails;
                    for (var l = 0; l < leaveApplicationDetails.length; l++)
                        myArray.push([]),
                            myArray[cnt].yearMonth = la[i].yearMonth,
                            myArray[cnt].location = location,
                            myArray[cnt].leaveAppId = la[i].leaveAppId,
                            myArray[cnt].addDt = la[i].addDt.substring(0, la[i].addDt.indexOf("T")),
                            myArray[cnt].releaseStatusCode = la[i].releaseStatusCode,
                            myArray[cnt].releaseDate = releaseDate ? releaseDate.substring(0, releaseDate.indexOf("T")) : "",
                            myArray[cnt].finalReleaser = releaseAuth || "",
                            myArray[cnt].releaserName = releaserName,
                            myArray[cnt].releaserRemarks = releaserRemarks,
                            "" != leaveApplicationDetails[l].postedDt && null != leaveApplicationDetails[l].postedDt ? myArray[cnt].postedDt = leaveApplicationDetails[l].postedDt.substring(0, leaveApplicationDetails[l].postedDt.indexOf("T")) : myArray[cnt].postedDt = "",
                            myArray[cnt].empUnqId = la[i].empUnqId,
                            myArray[cnt].empName = empName,
                            myArray[cnt].statName = statName,
                            myArray[cnt].remarks = leaveApplicationDetails[l].remarks,
                            myArray[cnt].additionalRemarks = leaveApplicationDetails[l].additionalRemarks,
                            myArray[cnt].leaveAppItem = leaveApplicationDetails[l].leaveAppItem,
                            myArray[cnt].leaveTypeCode = leaveApplicationDetails[l].leaveTypeCode,
                            myArray[cnt].isPosted = leaveApplicationDetails[l].isPosted,
                            myArray[cnt].fromDt = leaveApplicationDetails[l].fromDt.substring(0, leaveApplicationDetails[l].fromDt.indexOf("T")),
                            myArray[cnt].toDt = leaveApplicationDetails[l].toDt.substring(0, leaveApplicationDetails[l].toDt.indexOf("T")),
                            myArray[cnt].totalDays = leaveApplicationDetails[l].totalDays,
                            myArray[cnt].halfDayFlag = leaveApplicationDetails[l].halfDayFlag,
                            cnt++;
                    leaveApplicationDetails = ""
                };
                $scope.pdata = myArray; $scope.InfoPL = $scope.pdata; $scope.curPage1 = 0; $scope.pageSize1 = 25; $scope.$digest();
            };
        }; xhr1.send(jsonObj);
    };
    $scope.PostLeaveReject = function (data, value, value1) { function storeTblValues() { var TableData = new Array; $("#aliasTable tr").each(function (row, tr) { TableData[row] = { LeaveAppId: $(tr).find("td:eq(1)").text(), LeaveAppItem: $(tr).find("td:eq(11)").text() } }); var tbl = new Array; tbl[0] = "test"; for (var count = 0, i = 0; i < TableData.length; i++) { var appid = TableData[i].LeaveAppId; if (appid == value) { if ("undefined" == typeof data || "undefined" == typeof data.Remarks) return document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Remarks First For Rejection</strong></div>", void $("#MessageBox").show(); tbl[count] = { YearMonth: value1, LeaveAppId: value, LeaveAppItem: TableData[i].LeaveAppItem, IsPosted: "R", Remarks: data.Remarks, UserId: $("#myEmpUnqId").val() }, count++ } } return tbl } var TableData = storeTblValues(); TableData = JSON.stringify(TableData); var xhr1 = new XMLHttpRequest; xhr1.open("POST", $scope._Conpath + "LeavePosting/PostLeaves", !0), xhr1.setRequestHeader("Content-type", "application/json"), xhr1.onreadystatechange = function () { if (4 === xhr1.readyState && 200 === xhr1.status) { var rlsmail = new XMLHttpRequest; rlsmail.open("GET", $scope._Conpath + "AutoMail/SendMail?releaseGroupCode=LA&id=" + value, !0), rlsmail.setRequestHeader("Content-type", "application/json"), rlsmail.send(), document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Rejected Sucesfully.. </strong></div>", $("#MessageBox").show() } else document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Not Rejected Please Try again.. </strong></div>", $("#MessageBox").show(); $scope.GetPostedLeaveInfo() }, xhr1.send(TableData) };
    $scope.PerformanceAttendanceRpt = function (str) { var date = new Date, firstDay = new Date(date.getFullYear(), date.getMonth() - 2, 25), lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()), FromDate = firstDay.getFullYear() + "-" + (firstDay.getMonth() + 1) + "-" + firstDay.getDate(), ToDate = lastDay.getFullYear() + "-" + (lastDay.getMonth() + 1) + "-" + lastDay.getDate(); "PERF" === str && ($("#rptPerformance").show(), $("#rptPunching").hide()), "PUNCH" === str && ($("#rptPerformance").hide(), $("#rptPunching").show()); var pr = new XMLHttpRequest; pr.open("GET", $scope._Conpath + "Employee/PerfAttd?empunqid=" + $("#myEmpUnqId").val() + "&flag=" + str + "&fromdate=" + FromDate + "&todate=" + ToDate, !0), pr.setRequestHeader("Accept", "application/json"), pr.onreadystatechange = function () { if (4 === pr.readyState) { var json = JSON.parse(pr.responseText); if ($scope.prdata = json, "PERF" === str) { for (var newarr = $scope.prdata, cnt1 = 0, myAttdArray = [], i = 0; i < newarr.length; i++) { myAttdArray.push([]), myAttdArray[cnt1].EmpUnqId = newarr[i].empUnqId, myAttdArray[cnt1].AttdDate = newarr[i].attdDate.substring(0, newarr[i].attdDate.indexOf("T")), myAttdArray[cnt1].ScheDuleShift = newarr[i].scheDuleShift, myAttdArray[cnt1].ConsShift = newarr[i].consShift; var consin = newarr[i].consIn; null === consin ? myAttdArray[cnt1].ConsIn = "" : myAttdArray[cnt1].ConsIn = newarr[i].consIn.replace("T", " "); var consOut = newarr[i].consOut; null === consOut ? myAttdArray[cnt1].ConsOut = "" : myAttdArray[cnt1].ConsOut = newarr[i].consOut.replace("T", " "), myAttdArray[cnt1].ConsWrkHrs = newarr[i].consWrkHrs, myAttdArray[cnt1].ConsOverTime = newarr[i].consOverTime, myAttdArray[cnt1].Status = newarr[i].status, myAttdArray[cnt1].HalfDay = newarr[i].halfDay, myAttdArray[cnt1].LeaveType = newarr[i].leaveType, myAttdArray[cnt1].LeaveHalf = newarr[i].leaveHalf, myAttdArray[cnt1].Earlycome = newarr[i].earlycome, myAttdArray[cnt1].EarlyGoing = newarr[i].earlyGoing, myAttdArray[cnt1].LateCome = newarr[i].lateCome, cnt1++ } $scope.prdata = myAttdArray, $scope.prdata = $filter("orderBy")($scope.prdata, "-AttdDate"), $scope.InfoPL = $scope.prdata } "PUNCH" === str && ($scope.prdata = $filter("orderBy")($scope.prdata, "-punchDate")), $scope.curPage = 0, $scope.pageSize = 31, $scope.$digest() } }, pr.send() };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    $scope.exportAllData = function (name) { setTimeout(function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = name + d; $scope.JSONToCSVConvertor($scope.InfoPL, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv") }, 100) };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) {
            var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n"
        } if ("" === CSV) return void alert("Invalid data"); var fileName = ""; fileName += ReportTitle.replace(/ /g, "_"); var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link)
    };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });

//$scope.GetPostedLeaveInfo = function (data) { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var FromDate, ToDate; if ("undefined" == typeof data || "undefined" == typeof data.FromDt || "undefined" == typeof data.ToDt) { var date = new Date, firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1), lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0); FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate(), ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate() } else FromDate = data.FromDt, ToDate = data.ToDt; var date1 = new Date(FromDate), date2 = new Date(ToDate); if (date1 > date2) return document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Valid Date Range.. </strong></div>", $("#MessageBox").show(), !1; var sel = $("#cmbIsPosted").val(), xhr1 = new XMLHttpRequest; xhr1.open("GET", $scope._Conpath + "LeavePosting/GetLeaves?fromDt=" + FromDate + "&toDt=" + ToDate + "&postingFlg=" + sel, !0), xhr1.setRequestHeader("Accept", "application/json"), xhr1.onreadystatechange = function () { if (4 === xhr1.readyState) { $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"); var json = JSON.parse(xhr1.responseText), la = new Array; la = json; for (var empName, statName, releaseDate, releaseAuth, releaserName, releaserRemarks, location, applReleaseStatus = new Array, leaveApplicationDetails = new Array, cnt = 0, myArray = [], i = 0; i < la.length; i++) { empName = la[i].employee.empName, location = la[i].employee.location, statName = la[i].stations.statName, applReleaseStatus = la[i].applReleaseStatus; for (var j = 0; j < applReleaseStatus.length; j++)releaseDate = applReleaseStatus[j].releaseDate, releaseAuth = applReleaseStatus[j].releaseAuth, releaserName = applReleaseStatus[j].releaserName, releaserRemarks = applReleaseStatus[j].remarks; leaveApplicationDetails = la[i].leaveApplicationDetails; for (var l = 0; l < leaveApplicationDetails.length; l++)myArray.push([]), myArray[cnt].yearMonth = la[i].yearMonth, myArray[cnt].location = location, myArray[cnt].leaveAppId = la[i].leaveAppId, myArray[cnt].addDt = la[i].addDt.substring(0, la[i].addDt.indexOf("T")), myArray[cnt].releaseStatusCode = la[i].releaseStatusCode, myArray[cnt].releaseDate = releaseDate ? releaseDate.substring(0, releaseDate.indexOf("T")) : "", myArray[cnt].finalReleaser = releaseAuth || "", myArray[cnt].releaserName = releaserName, myArray[cnt].releaserRemarks = releaserRemarks, "" != leaveApplicationDetails[l].postedDt && null != leaveApplicationDetails[l].postedDt ? myArray[cnt].postedDt = leaveApplicationDetails[l].postedDt.substring(0, leaveApplicationDetails[l].postedDt.indexOf("T")) : myArray[cnt].postedDt = "", myArray[cnt].empUnqId = la[i].empUnqId, myArray[cnt].empName = empName, myArray[cnt].statName = statName, myArray[cnt].remarks = leaveApplicationDetails[l].remarks, myArray[cnt].additionalRemarks = leaveApplicationDetails[l].additionalRemarks, myArray[cnt].leaveAppItem = leaveApplicationDetails[l].leaveAppItem, myArray[cnt].leaveTypeCode = leaveApplicationDetails[l].leaveTypeCode, myArray[cnt].isPosted = leaveApplicationDetails[l].isPosted, myArray[cnt].fromDt = leaveApplicationDetails[l].fromDt.substring(0, leaveApplicationDetails[l].fromDt.indexOf("T")), myArray[cnt].toDt = leaveApplicationDetails[l].toDt.substring(0, leaveApplicationDetails[l].toDt.indexOf("T")), myArray[cnt].totalDays = leaveApplicationDetails[l].totalDays, myArray[cnt].halfDayFlag = leaveApplicationDetails[l].halfDayFlag, cnt++; leaveApplicationDetails = "" } $scope.pdata = myArray, $scope.InfoPL = $scope.pdata, $scope.curPage1 = 0, $scope.pageSize1 = 25, $scope.$digest() } }, xhr1.send() };