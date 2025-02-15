﻿var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('GatePassCntroller', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 25; $scope.alluserlist = [];
    var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; var url_port = url.port;
    $scope._Conpath = ''; var loc = $("#myLoc").val();
    $(document).ready(function () {
        if (typeof (_ConPath) === "undefined") { return; } else {
            if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else {
                $scope._Conpath = urlprotocol + "//" + urlhost + "/api/";
            }
        };
    });
    $scope.gpno; $scope.gpdate; $scope.GPInfo; $scope.GPWRkGRP; var d = new Date(); var rlsarr = []; $('#txtEmpCode').val($('#myEmpUnqId').val());
    $scope.ResetView = function () { window.location.reload(true); }; jQuery.support.cors = true;
    $scope.GetRelesaseStratey = function () { var rel = new XMLHttpRequest(); rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() + '&empUnqId=' + $('#myEmpUnqId').val(), true); rel.setRequestHeader('Accept', 'application/json'); rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); rlsarr = jsonvar1; $scope.rlsdata = jsonvar1; $scope.$digest(); }; }; rel.send(); };
    $scope.GetEmpInfo = function () {
        var LoginUserWG = $('#myWrkGrp').val();
        var PageWG = $('#empWrkGrp').val();
        var outsrcPageWG = $('#OutsrcempWrkGrp').val();
        var e_Code = $('#txtEmpCode').val(); if (e_Code === '') {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Employee Code First.. </strong>" + "</div>"; $('#MessageBox').show(); return false;
        }; var emp = new XMLHttpRequest(); emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + e_Code, true);
        emp.setRequestHeader('Accept', 'application/json'); emp.onreadystatechange = function () {
            if (emp.readyState === 4) {
                if (emp.responseText === "") {
                    alert("Please Enter Valid Employee Code .."); document.getElementById("txtEmpCode").value = "";
                    document.getElementById("txtPlace").value = ""; document.getElementById("txtPurpose").value = ""; $scope.GPWRkGRP = "";
                }; var json = JSON.parse(emp.responseText); $scope.empdata = json; $scope.$digest(); $scope.GPWRkGRP = $scope.empdata[0].wrkGrp; var SelUserWG = $scope.GPWRkGRP;
                if ((LoginUserWG === "COMP" || LoginUserWG === "OUTSOURCE") &&
                    (PageWG === "COMP" && outsrcPageWG === "OUTSOURCE") &&
                    (SelUserWG !== "COMP" && SelUserWG !== "OUTSOURCE")) {
                    document.getElementById("txtEmpCode").value = ""; document.getElementById("txtPlace").value = "";
                    document.getElementById("txtPurpose").value = ""; $scope.GPWRkGRP = "";
                    alert("User not Allow to Add in this gate pass list");
                }//Validation For Company Regular Employee / OutSourec Employee GatePass List
                else if ((LoginUserWG === "COMP" || LoginUserWG === "OUTSOURCE") &&
                    (SelUserWG === "COMP" || SelUserWG === "OUTSOURCE") &&
                    PageWG === "CONT") {
                    document.getElementById("txtEmpCode").value = ""; document.getElementById("txtPlace").value = "";
                    document.getElementById("txtPurpose").value = ""; $scope.GPWRkGRP = "";
                    if (PageWG !== LoginUserWG) { return; }
                    else { alert("User not Allow to Add in this gate pass list"); };
                }//Validation For Contractual Labour GatePass List
                else {
                    $('#txtEmpCode').val($scope.empdata[0].empUnqId);
                    $('#txtEmpName').val($scope.empdata[0].empName); $('#txtStat').val($scope.empdata[0].statName);
                };
            };
        }; emp.send();
    };          //Get Employee details
    $scope.ToValidate = function () { var chkFrom = document.getElementById('FromDt'); var chkTo = document.getElementById('ToDt'); var FromDate = chkFrom.value; var ToDate = chkTo.value; var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; } else { return true; }; };//Check Validation From Date & To Date Range
    var AddFirst = false; var c = 0;
    $scope.AddNewPerson = function (entity) {
        var EmpUnqId = $('#txtEmpCode').val(); if (c >= 1) {
            var tblData = gpvalues(); function gpvalues() {
                var tbl = new Array(); $('#aliasTable tr').each(function (row, tr) {
                    tbl[row] = { "empUnqId": $(tr).find('td:eq(1)').text() }
                }); tbl.shift(); return tbl;
            }; for (var i = 0; i < tblData.length; i++) {
                var userid = tblData[i].empUnqId; if (EmpUnqId === userid) {
                    alert("Same Employee not Allow in one GatePass ..");
                    document.getElementById("txtEmpCode").value = ""; document.getElementById("txtEmpName").value = "";
                    document.getElementById("txtStat").value = ""; document.getElementById("txtPlace").value = ""; document.getElementById("txtPurpose").value = ""; $("#Mode option:first").attr("selected", true); return false;
                };
            };
        }; if (EmpUnqId === "") {
            alert("Please Select Employee .. "); document.getElementById("txtPlace").value = "";
            document.getElementById("txtPurpose").value = ""; return false;
        }; if ((typeof (entity.Mode) === "undefined") || (typeof (entity.PlaceofVisit) === "undefined") || (typeof (entity.Reason) === "undefined")) {
            alert("Please Fill All Required Details .. "); return false;
        }; var Mode = entity.Mode; var PlaceofVisit = entity.PlaceofVisit.toUpperCase(); var Reason = entity.Reason.toUpperCase(); var AddUser = $('#myEmpUnqId').val(); document.getElementById("txtEmpCode").value = ""; document.getElementById("txtEmpName").value = ""; document.getElementById("txtStat").value = ""; document.getElementById("txtPlace").value = ""; document.getElementById("txtPurpose").value = ""; document.getElementById("txtEmpCode").disabled = false; $("#Mode option:first").attr("selected", true); var TableData = storeTblValues(); TableData = JSON.stringify(TableData); function storeTblValues() { c = c + 1; $('.tempRow').remove(); var row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + c + "'>" + c + "</td>" + "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + EmpUnqId + "'>" + EmpUnqId + "</td>" + "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + Mode + "'>" + Mode + "</td>" + "<td style='text-align:center;'><input type='hidden' name='AliasMiddleNames' value='" + PlaceofVisit + "'>" + PlaceofVisit + "</td>" + "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + Reason + "'>" + Reason + "</td>" + "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + AddUser + "'>" + AddUser + "</td>" + "</tr>"); $("#aliasTable").append(row); var TableData = new Array(); $('#aliasTable tr').each(function (row, tr) { TableData[row] = { "gatePassItem": c, "empUnqId": $(tr).find('td:eq(1)').text(), "mode": $(tr).find('td:eq(2)').text(), "placeOfVisit": $(tr).find('td:eq(3)').text(), "reason": $(tr).find('td:eq(4)').text(), "addUser": $(tr).find('td:eq(5)').text() }; }); TableData.shift(); return TableData; };
    };  //Add Out Gate Pass Person List in Grid //Validation For Same Employee Sholuld not be Add to List
    $scope.CreateGatePass = function () {
        var d1 = new Date(); var dt = d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate() + " " + d1.getHours() + ":" + d1.getMinutes(); var year = d1.getFullYear().toString(); var month = d1.getMonth() + 1; var yearmonth = year + (month.toString()); var TableData = storeTblValues(); TableData = JSON.stringify(TableData); function storeTblValues() { var tbl = new Array(); $('#aliasTable tr').each(function (row, tr) { tbl[row] = { "gatePassItem": $(tr).find('td:eq(0)').text(), "empUnqId": $(tr).find('td:eq(1)').text(), "mode": $(tr).find('td:eq(2)').text(), "placeOfVisit": $(tr).find('td:eq(3)').text(), "reason": $(tr).find('td:eq(4)').text(), "addUser": $(tr).find('td:eq(5)').text(), "releaseGroupCode": "GP", "yearMonth": yearmonth } }); tbl.shift(); return tbl; }; document.getElementById("btnSubmit").disabled = true; var PageWG = $('#empWrkGrp').val(); var xhr = new XMLHttpRequest(); if (PageWG === "COMP") { xhr.open('POST', $scope._Conpath + 'GatePass/CreateGatePass', true); } else { xhr.open('POST', $scope._Conpath + 'GatePass/CreateLabourGatePass?workGroup=' + PageWG, true); }; xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var loc = $('#myLoc').val();
                //send mail for Gatepass only in bellary location
                if ((PageWG === "COMP") && (loc == "BEL" || loc == "NSK")) { var json = JSON.parse(xhr.responseText); var maildata = json; for (var i = 0; i < maildata.length; i++) { var rlsmail = new XMLHttpRequest(); rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMail?releaseGroupCode=' + maildata[i]["releaseGroupCode"] + '&id=' + maildata[i]["applicationId"] + '&releaseAuth=' + maildata[i]["releaseAuth"], true); rlsmail.setRequestHeader("Content-type", "application/json"); rlsmail.send(); }; };
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Gate Pass Generated. Pls. contact your Releasing Authority..</strong>" + "</div>"; $('#MessageBox').show(); $("#aliasTable").find("tr:not(:first)").remove(); document.getElementById("txtEmpCode").value = $('#myEmpUnqId').val(); document.getElementById("txtEmpName").value = ""; document.getElementById("txtStat").value = ""; document.getElementById("txtPlace").value = ""; document.getElementById("txtPurpose").value = ""; $("#Mode option:first").attr("selected", true); $scope.GetEmpInfo();
                //var json = JSON.parse(xhr.responseText);$scope.tmpdta = json;$scope.$digest();$scope.gpno = $scope.tmpdta[0]['gatePassNo']; $scope.gpdate = $scope.tmpdta[0]['gatePassDate']; var gpdt = $scope.gpdate; gpdt = (gpdt).slice(0, 10);
            } else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Gate Pass Not Generated.. </strong>" + "</div>"; $('#MessageBox').show(); document.getElementById("txtEmpCode").value = ""; document.getElementById("txtEmpName").value = ""; document.getElementById("txtStat").value = ""; document.getElementById("txtPlace").value = ""; document.getElementById("txtPurpose").value = ""; $("#Mode option:first").attr("selected", true); document.getElementById("btnSubmit").disabled = false;
            };
        }; xhr.send(TableData);
    };  //Generate List of Employees Gate Pass
    $scope.GetGPLists = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var gplst = new XMLHttpRequest();
        gplst.open('GET', $scope._Conpath + 'AppRelease/GetApplReleaseStatus?empUnqId=' + $('#myEmpUnqId').val() +
            '&releaseGroupCode=GP', true); gplst.setRequestHeader('Accept', 'application/json');
        gplst.onreadystatechange = function () {
            if (gplst.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(gplst.responseText); rlsarr = json; $scope.relalldata = json;
                $scope.relalldata = $filter('orderBy')($scope.relalldata, '-id'); $scope.curPage1 = 0;
                $scope.pageSize1 = 10; $scope.$digest();
            };
        }; gplst.send();
    };     //Get Pending Gate Pass List
    $scope.UpdateGPStatus = function (releaseStatusCode, rlsgpid) {
        var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var detailarr = []; for (var r = 0; r <= rlsarr.length; r++) { var ecode = rlsarr[r]["id"]; if (ecode === rlsgpid) { detailarr = rlsarr[r]["applReleaseStatus"]; break; }; };
        //Get ReleaseCode of Releaser
        var dataarr = []; for (i = 0; i < detailarr.length; i++) { var r_auth = detailarr[i]["releaseAuth"]; if (r_auth === $('#myEmpUnqId').val()) { dataarr = detailarr[i]; break; }; };
        var jsonObj = {}; jsonObj.YearMonth = detailarr[0].yearMonth; jsonObj.ReleaseGroupCode = detailarr[0].releaseGroupCode; jsonObj.ApplicationId = rlsgpid; jsonObj.ReleaseStrategy = detailarr[0].releaseStrategy; jsonObj.ReleaseStrategyLevel = detailarr[0].releaseStrategyLevel; jsonObj.ReleaseCode = dataarr.releaseCode; jsonObj.ReleaseStatusCode = detailarr[0].releaseStatusCode; jsonObj.ReleaseDate = strDate; jsonObj.ReleaseAuth = dataarr.releaseAuth; jsonObj.IsFinalRelease = dataarr.isFinalRelease; jsonObj.Remarks = ""; jsonObj.LeaveApplications_YearMonth = null; jsonObj.LeaveApplications_LeaveAppId = null; jsonObj = JSON.stringify(jsonObj);
        var xhr2 = new XMLHttpRequest(); xhr2.open('POST', $scope._Conpath + 'AppRelease/UpdateGpStatus?empUnqId=' + $('#myEmpUnqId').val() + '&releaseStatusCode=' + releaseStatusCode + '&releaseGroupCode=GP', true); xhr2.setRequestHeader("Content-type", "application/json"); xhr2.onreadystatechange = function () { if (xhr2.readyState === 4 && xhr2.status === 200) { if (releaseStatusCode === 'F') { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Gate Pass Approved Sucesfully.. </strong></div>"; }; if (releaseStatusCode === 'R') { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Gate Pass Rejected Sucesfully.. </strong></div>"; }; $('#MessageBox').show(); $scope.GetGPLists(); } else { if (releaseStatusCode === 'F') { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> Gate Pass Not Approved .. </strong></div>"; }; if (releaseStatusCode === 'R') { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> Gate Pass Not Rejected .. </strong></div>"; }; $('#MessageBox').show(); $scope.GetGPLists(); }; }; xhr2.send(jsonObj);
    };  //Update Gate Pass With Approve / Reject
    $scope.LoadData = function (str) { if (str === "OUT") { $('#divOUT').show(); $('#divIN').hide(); $('#outinmsg').text("OUT"); } if (str === "IN") { $('#divOUT').hide(); $('#divIN').show(); $('#outinmsg').text("IN"); }; };    //IN - OUt wise Div Show / Hide
    $scope.GateINOUT = function (barcode, empid, empname) { var retVal = confirm(empid + ":" + empname); if (retVal === true) { var gpio = new XMLHttpRequest(); gpio.open('GET', $scope._Conpath + 'GatePass/GetGatePass?request=' + barcode, true); gpio.setRequestHeader("Content-type", "application/json"); gpio.onreadystatechange = function () { if (gpio.readyState === 4 && gpio.status === 200) { var json = JSON.parse(gpio.responseText); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + json.errorMessage + "</strong></div>"; $('#MessageBox').show(); } else if (gpio.status === 400) { var json1 = JSON.parse(gpio.responseText); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> " + json1.errorMessage + " </strong></div>"; $('#MessageBox').show(); }; $scope.NewGPInfo(); $scope.OutGPInfo(); }; gpio.send(); } else { $scope.AllGatePassInfo(); return false; }; };     //Gate Pass IN/OUT
    $scope.GetGatePassInfo = function (gpno, gpdate) { if (typeof (gpno) === "undefined" || typeof (gpdate) === "undefined") { var url_string = window.location.href; var url = new URL(url_string); var tmpurl1 = url.search; var url_1 = tmpurl1.split("?"); var tmpurl2 = tmpurl1; var url_2 = tmpurl2.split("&"); var tmpurl3 = url_2[0]; var url_3 = tmpurl3.split("="); var tmpurl4 = url_2[1]; var url_4 = tmpurl4.split("="); gpno = url_3[1]; gpdate = url_4[1]; }; var prnt = new XMLHttpRequest(); prnt.open('GET', $scope._Conpath + 'GatePass/GetGatePass?gpNo=' + gpno + '&gpDate=' + gpdate, true); prnt.setRequestHeader("Content-type", "application/json"); prnt.onreadystatechange = function () { if (prnt.readyState === 4 && prnt.status === 200) { var json = JSON.parse(prnt.responseText); $scope.pdata = json; $scope.$digest(); JsBarcode(".barcode").init(); }; }; prnt.send(); };//Print out of Gate Pass
    $scope.GetUserGatePassInfo = function (data) { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var FromDate, ToDate; if ((typeof (data) === "undefined") || (typeof (data.FromDt) === "undefined") || (typeof (data.ToDt) === "undefined")) { var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth(), 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); FromDate = (firstDay.getFullYear()) + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate(); ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate()); } else { FromDate = data.FromDt; ToDate = data.ToDt; }; var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; } var puser = new XMLHttpRequest(); puser.open('GET', $scope._Conpath + 'GatePass/GetGatePass?empUnqId=' + $('#myEmpUnqId').val() + '&fromDt=' + FromDate + '&toDt=' + ToDate, true); puser.setRequestHeader("Content-type", "application/json"); puser.onreadystatechange = function () { if (puser.readyState === 4 && puser.status === 200) { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); var json = JSON.parse(puser.responseText); $scope.pUdata = json; $scope.$digest(); }; }; puser.send(); };//Get Details of Gate PAss of Login User
    $scope.ReleaserGatePassInfo = function (entity) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var FromDate, ToDate; if ((typeof (entity) === "undefined") || (typeof (entity.FromDt) === "undefined") || (typeof (entity.ToDt) === "undefined")) {
            var d = new Date(); FromDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
            ToDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
        } else {
            FromDate = entity.FromDt; ToDate = entity.ToDt;
        };
        var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false;
        };
        var relall = new XMLHttpRequest();
        relall.open('GET', $scope._Conpath + 'GatePass/GetGatePass?empUnqId=' +
            $('#myEmpUnqId').val() + '&fromDt=' + FromDate + '&toDt=' + ToDate + '&reportType=s', true);
        relall.setRequestHeader("Content-type", "application/json"); relall.onreadystatechange = function () {
            if (relall.readyState === 4 && relall.status === 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(relall.responseText); $scope.relalldata = json; $scope.relalldata = $filter('orderBy')($scope.relalldata, '-gateOutDateTime');
                $scope.$digest();
            }
        }; relall.send();
    };//Get All Gate Pass Informatinon for Releaser Report
    $scope.AllGatePassInfo = function (gpdata) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var FromDate, ToDate; if ((typeof (gpdata) === "undefined") || (typeof (gpdata.FromDt) === "undefined") || (typeof (gpdata.ToDt) === "undefined")) { var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth(), 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); FromDate = (firstDay.getFullYear()) + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate(); ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate()); } else { FromDate = gpdata.FromDt; ToDate = gpdata.ToDt; }; if (gpdata === 'Sec') { var d2 = new Date(); var today = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()); FromDate = (today.getFullYear()) + '/' + (today.getMonth() + 1) + '/' + today.getDate(); ToDate = FromDate; }; if (gpdata === 'GPIO') { var d3 = new Date(); var iodate = new Date(d3.getFullYear(), d3.getMonth(), d3.getDate()); FromDate = (iodate.getFullYear()) + '/' + (iodate.getMonth() + 1) + '/' + (iodate.getDate() - 1); ToDate = (iodate.getFullYear()) + '/' + (iodate.getMonth() + 1) + '/' + iodate.getDate(); }; var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; }; var all = new XMLHttpRequest(); all.open('GET', $scope._Conpath + 'GatePass/GetGatePass?fromDt=' + FromDate + '&toDt=' + ToDate, true); all.setRequestHeader("Content-type", "application/json"); all.onreadystatechange = function () {
            if (all.readyState === 4 && all.status === 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); var json = JSON.parse(all.responseText); var la = new Array; la = json;
                var myArray = []; for (var i = 0; i < la.length; i++) {
                    myArray.push([]); myArray[i]["gatePassNo"] = la[i].gatePassNo; myArray[i]["gatePassDate"] = la[i].gatePassDate.substring(0, la[i].gatePassDate.indexOf("T"));
                    myArray[i]["empUnqId"] = la[i].empUnqId; myArray[i]["empName"] = la[i].empName;
                    myArray[i]["wrkGrp"] = la[i].wrkGrp; myArray[i]["catName"] = la[i].catName;
                    myArray[i]["desgName"] = la[i].desgName;
                    myArray[i]["deptName"] = la[i].deptName;
                    myArray[i]["statName"] = la[i].statName;
                    var outtime = la[i].gateOutDateTime; if (outtime !== null) {
                        outtime = outtime.split("T"); outtime = outtime[1]; outtime = outtime.substr(0, 5);
                        myArray[i]["gateOutDateTime"] = outtime; myArray[i]["gateOutDateTimeORG"] = la[i].gateOutDateTime.replace("T", " ");
                    } else { myArray[i]["gateOutDateTime"] = outtime; myArray[i]["gateOutDateTimeORG"] = outtime; }; var intime = la[i].gateInDateTime; if (intime !== null) { intime = intime.split("T"); intime = intime[1]; intime = intime.substr(0, 5); myArray[i]["gateInDateTime"] = intime; myArray[i]["gateInDateTimeORG"] = la[i].gateInDateTime.replace("T", " "); } else { myArray[i]["gateInDateTime"] = intime; myArray[i]["gateInDateTimeORG"] = intime; }; myArray[i]["gpTotalCount"] = ""; myArray[i]["reason"] = la[i].reason; myArray[i]["typeofGatePass"] = la[i].modeName; myArray[i]["placeOfVisit"] = la[i].placeOfVisit; myArray[i]["statusName"] = la[i].statusName; myArray[i]["addUser"] = la[i].addUser; myArray[i]["gpRemarks"] = la[i].gpRemarks; myArray[i]["attdGpOutTime"] = la[i].attdGpOutTime ? la[i].attdGpOutTime.replace("T", " ") : la[i].attdGpOutTime; myArray[i]["attdGpInTime"] = la[i].attdGpInTime ? la[i].attdGpInTime.replace("T", " ") : la[i].attdGpInTime;
                };
                //Count Hours & Minutes & Add in SAcope Object
                for (var j = 0; j < la.length; j++) {
                    var GateOutTime = la[j].gateOutDateTime; var GateInTime = la[j].gateInDateTime; if (GateOutTime === null || GateInTime === null) { continue; } else {
                        var timeStart = new Date(GateOutTime).getTime(); var timeEnd = new Date(GateInTime).getTime(); var hourDiff = timeEnd - timeStart; //in ms
                        var minDiff = hourDiff / 60 / 1000; //in minutes
                        var hDiff = hourDiff / 3600 / 1000; //in hours
                        var humanReadable = {}; humanReadable.hours = Math.floor(hDiff); humanReadable.minutes = minDiff - 60 * humanReadable.hours; myArray[j]["gpTotalCount"] = humanReadable.hours + ":" + Math.floor(humanReadable.minutes);
                    };
                }; $scope.alldata = myArray; $scope.alldata = $filter('orderBy')($scope.alldata, '-gateOutDateTimeORG'); $scope.GPInfo = $scope.alldata; $scope.$digest();
            };
        }; all.send();
    };//Get All Gate Pass Informatinon for HR Department
    var loc = $('#myLoc').val();
    $scope.NewGPInfo = function () { var prev = new Date(); var FromDate = new Date(prev); FromDate.setDate(prev.getDate() - 1); var dd = FromDate.getDate(); var mm = FromDate.getMonth() + 1; var yyyy = FromDate.getFullYear(); if (dd < 10) { dd = '0' + dd; } if (mm < 10) { mm = '0' + mm; }; FromDate = yyyy + '/' + mm + '/' + dd; var today = new Date(); var ToDate = new Date(today); ToDate.setDate(today.getDate()); var dd2 = ToDate.getDate(); var mm2 = ToDate.getMonth() + 1; var yyyy2 = ToDate.getFullYear(); if (dd2 < 10) { dd2 = '0' + dd2; } if (mm2 < 10) { mm2 = '0' + mm2; }; ToDate = yyyy2 + '/' + mm2 + '/' + dd2; var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; }; var count = 0; var out = new XMLHttpRequest(); out.open('GET', $scope._Conpath + 'GatePass/GetGatePass?fromDt=' + FromDate + '&toDt=' + ToDate, true); out.setRequestHeader("Content-type", "application/json"); out.onreadystatechange = function () { if (out.readyState === 4 && out.status === 200) { var json = JSON.parse(out.responseText); var la = new Array; la = json; var outArray = []; for (var i = 0; i < la.length; i++) { var rlssts = la[i].releaseStatusCode; var gpsts = la[i].statusName; if (rlssts === 'F' && gpsts === 'New') { outArray.push([]); outArray[count]["gatePassNo"] = la[i].gatePassNo; outArray[count]["unitName"] = la[i].unitName; outArray[count]["empUnqId"] = la[i].empUnqId; outArray[count]["empName"] = la[i].empName; outArray[count]["typeofGatePass"] = la[i].modeName; outArray[count]["barCode"] = la[i].barCode; count++; }; }; $scope.outdata = outArray; if (loc === "NSK") { $scope.outdata = $filter('orderBy')($scope.outdata, '-unitName'); } else { $scope.outdata = $filter('orderBy')($scope.outdata, '-gatePassNo'); }; $scope.$digest(); }; }; out.send(); };
    $scope.OutGPInfo = function () { var prev = new Date(); var FromDate = new Date(prev); FromDate.setDate(prev.getDate() - 1); var dd = FromDate.getDate(); var mm = FromDate.getMonth() + 1; var yyyy = FromDate.getFullYear(); if (dd < 10) { dd = '0' + dd; } if (mm < 10) { mm = '0' + mm; }; FromDate = yyyy + '/' + mm + '/' + dd; var today = new Date(); var ToDate = new Date(today); ToDate.setDate(today.getDate()); var dd2 = ToDate.getDate(); var mm2 = ToDate.getMonth() + 1; var yyyy2 = ToDate.getFullYear(); if (dd2 < 10) { dd2 = '0' + dd2; } if (mm2 < 10) { mm2 = '0' + mm2; }; ToDate = yyyy2 + '/' + mm2 + '/' + dd2; var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; }; var count1 = 0; var ingp = new XMLHttpRequest(); ingp.open('GET', $scope._Conpath + 'GatePass/GetGatePass?fromDt=' + FromDate + '&toDt=' + ToDate, true); ingp.setRequestHeader("Content-type", "application/json"); ingp.onreadystatechange = function () { if (ingp.readyState === 4 && ingp.status === 200) { var json = JSON.parse(ingp.responseText); var la = new Array; la = json; var inArray = []; for (var i = 0; i < la.length; i++) { var gpsts = la[i].statusName; var mode = la[i].modeName; if (gpsts === 'Out' && mode !== 'Duty Off') { inArray.push([]); inArray[count1]["gatePassNo"] = la[i].gatePassNo; inArray[count1]["unitName"] = la[i].unitName; inArray[count1]["empUnqId"] = la[i].empUnqId; inArray[count1]["empName"] = la[i].empName; inArray[count1]["typeofGatePass"] = mode; var outtime = la[i].gateOutDateTime; if (outtime !== null) { outtime = outtime.split("T"); outtime = outtime[1]; outtime = outtime.substr(0, 5); inArray[count1]["gateOutDateTime"] = outtime; inArray[count1]["gateOutDateTimeORG"] = la[i].gateOutDateTime; } inArray[count1]["barCode"] = la[i].barCode; count1++; }; }; $scope.indata = inArray; if (loc === "NSK") { $scope.indata = $filter('orderBy')($scope.indata, '-unitName'); } else { $scope.indata = $filter('orderBy')($scope.indata, '-gateOutDateTimeORG'); } $scope.$digest(); }; }; ingp.send(); };
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };   //Using For DIR Pagintaiton Sorting
    $scope.exportAllData = function () { setTimeout(function () { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var d = new Date(); d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = "Gate_Pass_Report_" + d; $scope.JSONToCSVConvertor($scope.GPInfo, FileName, true); $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); }, 100); }; $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData; var CSV = ''; CSV += ReportTitle + '\r\n\n'; if (ShowLabel) { var row = ""; for (var index in arrData[0]) { row += index + ','; }; row = row.slice(0, -1); CSV += row + '\r\n'; }; for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; } row.slice(0, row.length - 1); CSV += row + '\r\n'; }; if (CSV === '') { alert("Invalid data"); return; }; var fileName = "MyReport_"; fileName += ReportTitle.replace(/ /g, "_"); var uri = 'data:text/csv;charset=utf-8,' + escape(CSV); var link = document.createElement("a"); link.href = uri; link.style = "visibility:hidden"; link.download = fileName + ".csv"; document.body.appendChild(link); link.click(); document.body.removeChild(link); };
}); app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });