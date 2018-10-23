var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('GatePassCntroller', function ($scope, $http, $filter) {

    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1;
    $scope.itemsPerPage = 25;
    $scope.alluserlist = [];
    $scope._Conpath = '';
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });

    $scope.gpno;
    $scope.gpdate;
    $scope.GPInfo;

    $scope.GPWRkGRP;

    var rlsarr = [];

    jQuery.support.cors = true;

    //Get Current Date
    var d = new Date();

    $('#txtEmpCode').val($('#myEmpUnqId').val());

    //Get Release Strategy
    $scope.GetRelesaseStratey = function () {
        var rel = new XMLHttpRequest();
        rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() + '&empUnqId=' + $('#myEmpUnqId').val(), true);
        rel.setRequestHeader('Accept', 'application/json');
        rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.$digest(); } };
        rel.send();
    };

    //Reload Page
    $scope.ResetView = function () { window.location.reload(true); };

    //Get Employee details from employee code entered by user
    $scope.GetEmpInfo = function () {

        var LoginUserWG = $('#myWrkGrp').val();
        var PageWG = $('#empWrkGrp').val();

        var e_Code = $('#txtEmpCode').val();
        if (e_Code === '') {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-info alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter Employee Code First.. </strong>" +
                "</div>";
            $('#MessageBox').show();
            return false;
        }

        var emp = new XMLHttpRequest();
        emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + e_Code, true);
        emp.setRequestHeader('Accept', 'application/json');
        emp.onreadystatechange = function () {
            if (emp.readyState === 4) {
                if (emp.responseText === "") {
                    alert("Please Enter Valid Employee Code ..");
                    document.getElementById("txtEmpCode").value = "";
                    document.getElementById("txtPlace").value = "";
                    document.getElementById("txtPurpose").value = "";
                    $scope.GPWRkGRP = "";
                }
                var json = JSON.parse(emp.responseText);
                $scope.empdata = json;
                $scope.$digest();

                $scope.GPWRkGRP = $scope.empdata[0].wrkGrp;
                var SelUserWG = $scope.GPWRkGRP;

                if (LoginUserWG === "COMP" && PageWG === "COMP" && SelUserWG !== "COMP") {
                    //Validation For Company Regular Employee GatePass List
                    debugger;
                    document.getElementById("txtEmpCode").value = "";
                    document.getElementById("txtPlace").value = "";
                    document.getElementById("txtPurpose").value = "";
                    $scope.GPWRkGRP = "";
                    alert("User not Allow to Add in this gate pass list");
                }
                else if (LoginUserWG === "COMP" && SelUserWG === "COMP" && PageWG === "CONT") {
                    debugger;
                    //Validation For Contractual Labur GatePass List
                    document.getElementById("txtEmpCode").value = "";
                    document.getElementById("txtPlace").value = "";
                    document.getElementById("txtPurpose").value = "";
                    $scope.GPWRkGRP = "";
                    alert("User not Allow to Add in this gate pass list");
                }
                else {
                    debugger;
                    //Fill the Details
                    $('#txtEmpCode').val($scope.empdata[0].empUnqId);
                    $('#txtEmpName').val($scope.empdata[0].empName);
                    $('#txtStat').val($scope.empdata[0].statName);
                }
            }
        };
        emp.send();
    };

    //Check Validation From Date & To Date Range
    $scope.ToValidate = function () {

        var chkFrom = document.getElementById('FromDt');
        var chkTo = document.getElementById('ToDt');

        var FromDate = chkFrom.value;
        var ToDate = chkTo.value;

        var date1 = new Date(FromDate);
        var date2 = new Date(ToDate);
        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }
        else { return true; }
    }

    var AddFirst = false;
    //Add Out Gate Pass Person List in Grid
    var c = 0;
    $scope.AddNewPerson = function (entity) {

        var EmpUnqId = $('#txtEmpCode').val();

        //Validation For Same Employee Sholuld not be Add to List 
        if (c >= 1) {
            var tblData = gpvalues();
            //Get data from the Gate Pass List
            function gpvalues() {
                var tbl = new Array();
                $('#aliasTable tr').each(function (row, tr) {
                    tbl[row] = {
                        "empUnqId": $(tr).find('td:eq(1)').text()
                    }
                });
                tbl.shift();// first row will be empty - so remove
                return tbl;
            };

            for (var i = 0; i < tblData.length; i++) {
                var userid = tblData[i].empUnqId;
                if (EmpUnqId === userid) {
                    alert("Same Employee not Allow in one GatePass ..");
                    document.getElementById("txtEmpCode").value = "";
                    document.getElementById("txtEmpName").value = "";
                    document.getElementById("txtStat").value = "";
                    document.getElementById("txtPlace").value = "";
                    document.getElementById("txtPurpose").value = "";
                    $("#Mode option:first").attr("selected", true);
                    return false;
                };
            };
        };

        if (EmpUnqId === "") {
            alert("Please Select Employee .. ");
            document.getElementById("txtPlace").value = "";
            document.getElementById("txtPurpose").value = "";
            return false;
        }

        if ((typeof (entity.Mode) === "undefined") ||
            (typeof (entity.PlaceofVisit) === "undefined") ||
            (typeof (entity.Reason) === "undefined")) {
            alert("Please Fill All Required Details .. ");
            return false;
        }

        var Mode = entity.Mode;
        var PlaceofVisit = entity.PlaceofVisit;
        var Reason = entity.Reason;
        var AddUser = $('#myEmpUnqId').val();

        document.getElementById("txtEmpCode").value = "";
        document.getElementById("txtEmpName").value = "";
        document.getElementById("txtStat").value = "";
        document.getElementById("txtPlace").value = "";
        document.getElementById("txtPurpose").value = "";
        document.getElementById("txtEmpCode").disabled = false;
        $("#Mode option:first").attr("selected", true);

        var TableData = storeTblValues()
        TableData = JSON.stringify(TableData);

        //Get DAta From the Leae Application Form & store into Array
        function storeTblValues() {

            c = c + 1;

            $('.tempRow').remove();

            var row = $("<tr>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + c + "'>" + c + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + EmpUnqId + "'>" + EmpUnqId + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + Mode + "'>" + Mode + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasMiddleNames' value='" + PlaceofVisit + "'>" + PlaceofVisit + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + Reason + "'>" + Reason + "</td>" +
                "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + AddUser + "'>" + AddUser + "</td>" +
                "</tr>");

            $("#aliasTable").append(row);

            var TableData = new Array();
            $('#aliasTable tr').each(function (row, tr) {
                TableData[row] = {
                    "gatePassItem": c
                    , "empUnqId": $(tr).find('td:eq(1)').text()
                    , "mode": $(tr).find('td:eq(2)').text()
                    , "placeOfVisit": $(tr).find('td:eq(3)').text()
                    , "reason": $(tr).find('td:eq(4)').text()
                    , "addUser": $(tr).find('td:eq(5)').text()
                }
            });
            TableData.shift();
            return TableData;
        }
    };

    //Generate List Employees Gate Pass
    $scope.CreateGatePass = function () {

        var d1 = new Date();
        var dt = d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate() + " " + d1.getHours() + ":" + d1.getMinutes();
        var year = d1.getFullYear().toString()
        var month = d1.getMonth() + 1
        var yearmonth = year + (month.toString());

        var TableData = storeTblValues();
        TableData = JSON.stringify(TableData);

        //Get data from the Leave List Grid
        function storeTblValues() {
            var tbl = new Array();
            $('#aliasTable tr').each(function (row, tr) {
                tbl[row] = {
                    "gatePassItem": $(tr).find('td:eq(0)').text()
                    , "empUnqId": $(tr).find('td:eq(1)').text()
                    , "mode": $(tr).find('td:eq(2)').text()
                    , "placeOfVisit": $(tr).find('td:eq(3)').text()
                    , "reason": $(tr).find('td:eq(4)').text()
                    , "addUser": $(tr).find('td:eq(5)').text()
                    , "releaseGroupCode": "GP"
                    , "yearMonth": yearmonth
                }
            });
            tbl.shift();// first row will be empty - so remove
            return tbl;
        }

        document.getElementById("btnSubmit").disabled = true;

        var PageWG = $('#empWrkGrp').val();

        var xhr = new XMLHttpRequest();

        if (PageWG === "COMP") { xhr.open('POST', $scope._Conpath + 'GatePass/CreateGatePass', true); }
        else { xhr.open('POST', $scope._Conpath + 'GatePass/CreateLabourGatePass?workGroup=' + PageWG, true); }

        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                //
                //var json = JSON.parse(xhr.responseText);
                //$scope.tmpdta = json;
                //$scope.$digest();

                //$scope.gpno = $scope.tmpdta[0]['gatePassNo'];
                //$scope.gpdate = $scope.tmpdta[0]['gatePassDate'];
                //var gpdt = $scope.gpdate;
                //gpdt = (gpdt).slice(0, 10);

                document.getElementById("MessageBox").innerHTML =
                                    "<div class='alert alert-success alert-dismissable'>" +
                                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                                    "<strong>Gate Pass Generated Sucesfully..</strong>" +
                                    "</div>";
                //"<div style='float:right;'><strong><a style='float: right;' target='_blank' href='/Report/PrintPreviewGatePass?gpno=" + $scope.gpno + "&gpdate=" + gpdt + "'>Print Preview</a></strong></div>";
                $('#MessageBox').show();

                $("#aliasTable").find("tr:not(:first)").remove();
                document.getElementById("txtEmpCode").value = "";
                document.getElementById("txtEmpName").value = "";
                document.getElementById("txtStat").value = "";
                document.getElementById("txtPlace").value = "";
                document.getElementById("txtPurpose").value = "";
                $("#Mode option:first").attr("selected", true);
            }
            else {

                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Gate Pass Not Generated.. </strong>" +
                    "</div>";
                $('#MessageBox').show();

                document.getElementById("txtEmpCode").value = "";
                document.getElementById("txtEmpName").value = "";
                document.getElementById("txtStat").value = "";
                document.getElementById("txtPlace").value = "";
                document.getElementById("txtPurpose").value = "";
                $("#Mode option:first").attr("selected", true);
                document.getElementById("btnSubmit").disabled = false;
            }
        };
        xhr.send(TableData);
    };

    //Get Pending Gate Pass List
    $scope.GetGPLists = function () {
        debugger;
        var gplst = new XMLHttpRequest();
        gplst.open('GET', $scope._Conpath + 'AppRelease/GetApplReleaseStatus?empUnqId=' + $('#myEmpUnqId').val() + '&releaseGroupCode=GP', true);
        gplst.setRequestHeader('Accept', 'application/json');
        gplst.onreadystatechange = function () {
            if (gplst.readyState === 4) {
                var json = JSON.parse(gplst.responseText);
                rlsarr = json;
                $scope.relalldata = json;
                $scope.relalldata = $filter('orderBy')($scope.relalldata, '-id');
                $scope.curPage1 = 0;
                $scope.pageSize1 = 10;
                $scope.$digest();
            }
        };
        gplst.send();
    };

    //Update Gate Pass With Approve / Reject
    $scope.UpdateGPStatus = function (releaseStatusCode, rlsgpid) {

        //Set Current Date
        var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();

        // Get Releaser Details From AppReleaseStatus Table 
        var detailarr = [];
        for (var r = 0; r <= rlsarr.length; r++) { var ecode = rlsarr[r]["id"]; if (ecode === rlsgpid) { detailarr = rlsarr[r]["applReleaseStatus"]; break; } }

        //Get ReleaseCode of Releaser
        var dataarr = [];
        for (i = 0; i < detailarr.length; i++) { var r_auth = detailarr[i]["releaseAuth"]; if (r_auth === $('#myEmpUnqId').val()) { dataarr = detailarr[i]; break; } };

        var jsonObj = {};
        jsonObj.YearMonth = dataarr.yearMonth;
        jsonObj.ReleaseGroupCode = dataarr.releaseGroupCode;
        jsonObj.ApplicationId = rlsgpid;
        jsonObj.ReleaseStrategy = dataarr.releaseStrategy;
        jsonObj.ReleaseStrategyLevel = dataarr.releaseStrategyLevel;
        jsonObj.ReleaseCode = dataarr.releaseCode;
        jsonObj.ReleaseStatusCode = dataarr.releaseStatusCode;
        jsonObj.ReleaseDate = strDate;
        jsonObj.ReleaseAuth = dataarr.releaseAuth;
        jsonObj.IsFinalRelease = dataarr.isFinalRelease;
        jsonObj.Remarks = "";
        jsonObj.LeaveApplications_YearMonth = null;
        jsonObj.LeaveApplications_LeaveAppId = null;
        jsonObj = JSON.stringify(jsonObj);

        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST', $scope._Conpath +
            'AppRelease/UpdateGpStatus?empUnqId=' + $('#myEmpUnqId').val() +
            '&releaseStatusCode=' + releaseStatusCode +
            '&releaseGroupCode=' + dataarr.releaseGroupCode, true);
        xhr2.setRequestHeader("Content-type", "application/json");
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4) {
                if (releaseStatusCode === 'F') {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Gate Pass Approved Sucesfully.. </strong></div>";
                }
                if (releaseStatusCode === 'R') {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Gate Pass Rejected Sucesfully.. </strong></div>";
                }
                $('#MessageBox').show();
                $scope.GetGPLists();
            }
            else {
                if (releaseStatusCode === 'F') {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> Gate Pass Not Approved .. </strong></div>";
                }
                if (releaseStatusCode === 'R') {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> Gate Pass Not Rejected .. </strong></div>";
                }
                $('#MessageBox').show();
                $scope.GetGPLists();
            }
        };
        xhr2.send(jsonObj);
    };

    //Show / Hide Div
    $scope.LoadData = function (str) {
        if (str === "OUT") {
            $('#divOUT').show();
            $('#divIN').hide();
            $('#outinmsg').text("OUT");
            //document.getElementById("outinmsg").innerHTML == "OUT";
        }
        if (str === "IN") {
            $('#divOUT').hide();
            $('#divIN').show();
            $('#outinmsg').text("IN");
            //document.getElementById("outinmsg").innerHTML == "IN";
        }
    };

    //Gate Pass IN/OUT 
    $scope.GateINOUT = function (barcode, empid, empname) {

        var retVal = confirm(empid + ":" + empname);
        if (retVal === true) {
            var gpio = new XMLHttpRequest();
            gpio.open('GET', $scope._Conpath + 'GatePass/GetGatePass?request=' + barcode, true);
            gpio.setRequestHeader("Content-type", "application/json");
            gpio.onreadystatechange = function () {
                if (gpio.readyState === 4 && gpio.status === 200) {
                    var json = JSON.parse(gpio.responseText);
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + json.errorMessage + "</strong></div>";
                    $('#MessageBox').show();
                    $scope.AllGatePassInfo();
                }
                else if (gpio.status === 400) {
                    var json1 = JSON.parse(gpio.responseText);
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> " + json1.errorMessage + " </strong></div>";
                    $('#MessageBox').show();
                    $scope.AllGatePassInfo();
                }
            };
            gpio.send();
        } else { $scope.AllGatePassInfo(); return false; }
    };

    //Print out of Gate Pass
    $scope.GetGatePassInfo = function (gpno, gpdate) {
        if (typeof (gpno) === "undefined" ||
            typeof (gpdate) === "undefined") {
            var url_string = window.location.href
            var url = new URL(url_string);
            var tmpurl1 = url.search; var url_1 = tmpurl1.split("?");
            var tmpurl2 = tmpurl1; var url_2 = tmpurl2.split("&");
            var tmpurl3 = url_2[0]; var url_3 = tmpurl3.split("=");
            var tmpurl4 = url_2[1]; var url_4 = tmpurl4.split("=");
            gpno = url_3[1];
            gpdate = url_4[1];
            // gpno = url.searchParams.get("gpno");
            // gpdate = url.searchParams.get("gpdate");
        }

        var prnt = new XMLHttpRequest();
        prnt.open('GET', $scope._Conpath + 'GatePass/GetGatePass?gpNo=' + gpno + '&gpDate=' + gpdate, true);
        prnt.setRequestHeader("Content-type", "application/json");
        prnt.onreadystatechange = function () {
            if (prnt.readyState === 4 && prnt.status === 200) {
                var json = JSON.parse(prnt.responseText);
                $scope.pdata = json;
                $scope.$digest();
                JsBarcode(".barcode").init();
            }
        };
        prnt.send();
    };

    //Get Details of Gate PAss of Login User
    $scope.GetUserGatePassInfo = function (data) {

        var FromDate, ToDate;

        if ((typeof (data) === "undefined") ||
            (typeof (data.FromDt) === "undefined") ||
            (typeof (data.ToDt) === "undefined")) {

            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            FromDate = (firstDay.getFullYear()) + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate();
            ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate());
        }
        else {
            FromDate = data.FromDt;
            ToDate = data.ToDt;
        }

        var date1 = new Date(FromDate);
        var date2 = new Date(ToDate);

        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }

        var puser = new XMLHttpRequest();
        puser.open('GET', $scope._Conpath + 'GatePass/GetGatePass?empUnqId=' + $('#myEmpUnqId').val() + '&fromDt=' + FromDate + '&toDt=' + ToDate, true);
        puser.setRequestHeader("Content-type", "application/json");
        puser.onreadystatechange = function () {
            if (puser.readyState === 4 && puser.status === 200) {
                var json = JSON.parse(puser.responseText);
                $scope.pUdata = json;
                $scope.$digest();
            }
        };
        puser.send();
    };

    //Get All Gate Pass Informatinon for Releaser Report
    $scope.ReleaserGatePassInfo = function (entity) {
        debugger;
        var FromDate, ToDate;

        if ((typeof (entity) === "undefined") ||
            (typeof (entity.FromDt) === "undefined") ||
            (typeof (entity.ToDt) === "undefined")) {

            var d = new Date();
            FromDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
            ToDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
        }
        else {
            FromDate = entity.FromDt;
            ToDate = entity.ToDt;
        }

        var date1 = new Date(FromDate);
        var date2 = new Date(ToDate);

        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }

        var relall = new XMLHttpRequest();
        relall.open('GET', $scope._Conpath + 'GatePass/GetGatePass?empUnqId=' + $('#myEmpUnqId').val() + '&fromDt=' + FromDate + '&toDt=' + ToDate + '&reportType=s', true);
        relall.setRequestHeader("Content-type", "application/json");
        relall.onreadystatechange = function () {
            if (relall.readyState === 4 && relall.status === 200) {
                var json = JSON.parse(relall.responseText);
                $scope.relalldata = json;
                $scope.relalldata = $filter('orderBy')($scope.relalldata, '-gateOutDateTime');
                $scope.$digest();
            }
        };
        relall.send();
    };

    //Get All Gate Pass Informatinon for HR Department
    $scope.AllGatePassInfo = function (gpdata) {

        var FromDate, ToDate;
        if ((typeof (gpdata) === "undefined") ||
            (typeof (gpdata.FromDt) === "undefined") ||
            (typeof (gpdata.ToDt) === "undefined")) {

            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            FromDate = (firstDay.getFullYear()) + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate();
            ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate());
        }
        else {
            FromDate = gpdata.FromDt;
            ToDate = gpdata.ToDt;
        }

        //For Gate 1 Security Gate Pass Report
        if (gpdata === 'Sec') {
            debugger;
            var d2 = new Date();
            var today = new Date(d2.getFullYear(), d2.getMonth() + 1, d2.getDate());
            FromDate = (today.getFullYear()) + '/' + (today.getMonth()) + '/' + today.getDate();
            ToDate = FromDate;
        }

        var date1 = new Date(FromDate);
        var date2 = new Date(ToDate);

        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }

        var all = new XMLHttpRequest();
        all.open('GET', $scope._Conpath + 'GatePass/GetGatePass?fromDt=' + FromDate + '&toDt=' + ToDate, true);
        all.setRequestHeader("Content-type", "application/json");
        all.onreadystatechange = function () {
            if (all.readyState === 4 && all.status === 200) {
                //$scope.GPInfo = all.responseText;

                var json = JSON.parse(all.responseText);

                var la = new Array; la = json;
                var myArray = [];
                for (var i = 0; i < la.length; i++) {
                    myArray.push([]);
                    myArray[i]["releaseStatusCode"] = la[i].releaseStatusCode;
                    myArray[i]["gatePassNo"] = la[i].gatePassNo;
                    myArray[i]["gatePassDate"] = la[i].gatePassDate.replace("T00:00:00", "");
                    myArray[i]["empUnqId"] = la[i].empUnqId;
                    myArray[i]["empName"] = la[i].empName;
                    myArray[i]["deptName"] = la[i].deptName;
                    myArray[i]["statName"] = la[i].statName;

                    var outtime = la[i].gateOutDateTime;
                    if (outtime !== null) {
                        outtime = outtime.split("T"); outtime = outtime[1]; outtime = outtime.substr(0, 5); myArray[i]["gateOutDateTime"] = outtime;
                        myArray[i]["gateOutDateTimeORG"] = la[i].gateOutDateTime;
                    }
                    else { myArray[i]["gateOutDateTime"] = outtime; }

                    var intime = la[i].gateInDateTime;
                    if (intime !== null) { intime = intime.split("T"); intime = intime[1]; intime = intime.substr(0, 5); myArray[i]["gateInDateTime"] = intime; }
                    else { myArray[i]["gateInDateTime"] = intime; }

                    myArray[i]["gpTotalCount"] = "";
                    myArray[i]["reason"] = la[i].reason;
                    myArray[i]["typeofGatePass"] = la[i].modeName; //Type Of GatePAss
                    myArray[i]["placeOfVisit"] = la[i].placeOfVisit;
                    myArray[i]["statusName"] = la[i].statusName;
                    myArray[i]["barCode"] = la[i].barCode;

                    myArray[i]["catName"] = la[i].catName;
                    myArray[i]["desgName"] = la[i].desgName;
                    myArray[i]["wrkGrp"] = la[i].wrkGrp;
                    myArray[i]["addUser"] = la[i].addUser;
                }

                //Count Hours & Minutes & Add in SAcope Object
                for (var j = 0; j < la.length; j++) {

                    var GateOutTime = la[j].gateOutDateTime;
                    var GateInTime = la[j].gateInDateTime;
                    if (GateOutTime === null || GateInTime === null) { continue; }
                    else {
                        var timeStart = new Date(GateOutTime).getTime(); var timeEnd = new Date(GateInTime).getTime();
                        var hourDiff = timeEnd - timeStart; //in ms
                        var minDiff = hourDiff / 60 / 1000; //in minutes
                        var hDiff = hourDiff / 3600 / 1000; //in hours
                        var humanReadable = {}; humanReadable.hours = Math.floor(hDiff); humanReadable.minutes = minDiff - 60 * humanReadable.hours;
                        myArray[j]["gpTotalCount"] = humanReadable.hours + ":" + Math.floor(humanReadable.minutes);
                    }
                }

                $scope.alldata = myArray;
                $scope.alldata = $filter('orderBy')($scope.alldata, '-gatePassNo');
                $scope.GPInfo = $scope.alldata;
                $scope.$digest();
            }
        };
        all.send();
    };

    //Using For DIR Pagintaiton Sorting
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };

    //Export to Excel CSV File Grid Data
    $scope.exportAllData = function () {
        setTimeout(function () {

            $('#loading').removeClass("deactivediv");
            $('#loading').addClass("activediv");

            var d = new Date();
            d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = "Gate_Pass_Report_" + d;

            $scope.JSONToCSVConvertor($scope.GPInfo, FileName, true);

            $('#loading').removeClass("activediv");
            $('#loading').addClass("deactivediv");
        }, 100);
    };

    //Convert Json Data to CSV 
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {

        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';
        CSV += ReportTitle + '\r\n\n'; //Set Report title in first row or line

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";
            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n'; //append Label row with line break
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n'; //add a line break after each row
        }

        if (CSV === '') { alert("Invalid data"); return; }
        var fileName = "MyReport_"; //Generate a file name

        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, "_");
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV); //Initialize file format you want csv or xls

        // Now the little tricky part.// you can use either>> window.open(uri);// but this will not work in some browsers// or you will not get the correct file extension    
        // this trick will generate a temp <a /> tag

        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden"; //set the visibility hidden so it will not effect on your web-layout
        link.download = fileName + ".csv";
        document.body.appendChild(link); //this part will append the anchor tag and remove it after automatic click
        link.click();
        document.body.removeChild(link);
    };
});

//Date Picker
app.directive("datepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); };
            var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } };
            elem.datepicker(options);
        }
    }
});

////Generate Gatepass BarCode
//$scope.GenerateBarCode = function () { JsBarcode("#barcode", '20010915:000001', { width: 1, height: 50 }); };

////Print Perview of Gate Pass
//$scope.PrintTable = function () {
//    var prtContent = document.getElementById("tblPrint");
//    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
//    WinPrint.document.write(prtContent.innerHTML);
//    WinPrint.document.close();
//    WinPrint.focus();
//    WinPrint.print();
//    WinPrint.close();
//}