var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('LeaveReportCntrloller', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1; $scope.itemsPerPage = 25;
    $scope.alluserlist = [];
    $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.InfoPL;
    $scope.ToValidate = function () {
        var chkFrom = document.getElementById('FromDt'); var chkTo = document.getElementById('ToDt');
        var FromDate = chkFrom.value; var ToDate = chkTo.value;
        var date1 = new Date(FromDate); var date2 = new Date(ToDate);
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; } else { return true; }
    }
    //Get Leave Application Details report for Releaser
    $scope.GetLeaveInfo = function (entity) {
        var FromDate, ToDate;
        if ((typeof (entity) === "undefined") || (typeof (entity.FromDt) === "undefined") || (typeof (entity.ToDt) === "undefined")) {
            var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth(), 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            FromDate = (firstDay.getFullYear()) + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate();
            ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate());
        } else { FromDate = entity.FromDt; ToDate = entity.ToDt; }
        var date1 = new Date(FromDate); var date2 = new Date(ToDate);
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; }
        var xhr = new XMLHttpRequest(); xhr.open('GET', $scope._Conpath + 'LeaveReport/GetLeaves?empunqid=' + $('#myEmpUnqId').val() + '&fromDt=' + FromDate + '&toDt=' + ToDate, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () { if (xhr.readyState === 4) { var json = JSON.parse(xhr.responseText); $scope.data = json; $scope.data = $filter('orderBy')($scope.data, '-leaveAppId'); $scope.curPage = 0; $scope.pageSize = 25; $scope.$digest(); } };
        xhr.send();
    };
    //Get Fully Posted / Partillay Posted / Not Posted / Post Rejected by HR Leaves Report
    $scope.GetPostedLeaveInfo = function (data) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var FromDate, ToDate;
        if ((typeof (data) === "undefined") || (typeof (data.FromDt) === "undefined") || (typeof (data.ToDt) === "undefined")) {
            var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate();
            ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate());
        } else { FromDate = data.FromDt; ToDate = data.ToDt; }
        var date1 = new Date(FromDate); var date2 = new Date(ToDate);
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; }
        var sel = $('#cmbIsPosted').val();
        var xhr1 = new XMLHttpRequest(); xhr1.open('GET', $scope._Conpath + 'LeavePosting/GetLeaves?fromDt=' + FromDate + '&toDt=' + ToDate + '&postingFlg=' + sel, true);
        xhr1.setRequestHeader('Accept', 'application/json');
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(xhr1.responseText);
                //$scope.pdata = json; $scope.pdata = $filter('orderBy')($scope.pdata, '-leaveAppId');
                var la = new Array; la = json;
                var applReleaseStatus = new Array; var leaveApplicationDetails = new Array;
                var empName, statName, releaseDate; var cnt = 0;
                var myArray = [];
                for (var i = 0; i < la.length; i++) {
                    empName = la[i].employee.empName; statName = la[i].stations.statName;
                    applReleaseStatus = la[i].applReleaseStatus; for (var j = 0; j < applReleaseStatus.length; j++) { releaseDate = applReleaseStatus[j].releaseDate; }
                    leaveApplicationDetails = la[i].leaveApplicationDetails;
                    for (var l = 0; l < leaveApplicationDetails.length; l++) {
                        myArray.push([]);
                        //Leave Applications
                        myArray[cnt]["releaseGroupCode"] = la[i].releaseGroupCode; myArray[cnt]["leaveAppId"] = la[i].leaveAppId;
                        myArray[cnt]["yearMonth"] = la[i].yearMonth; myArray[cnt]["addDt"] = la[i].addDt; myArray[cnt]["releaseDate"] = releaseDate;
                        myArray[cnt]["updDt"] = la[i].updDt; myArray[cnt]["empUnqId"] = la[i].empUnqId; myArray[cnt]["empName"] = empName;
                        myArray[cnt]["statName"] = statName;
                        //Leave Application Details 
                        myArray[cnt]["remarks"] = leaveApplicationDetails[l].remarks; myArray[cnt]["leaveAppItem"] = leaveApplicationDetails[l].leaveAppItem;
                        myArray[cnt]["leaveTypeCode"] = leaveApplicationDetails[l].leaveTypeCode; myArray[cnt]["fromDt"] = leaveApplicationDetails[l].fromDt;
                        myArray[cnt]["toDt"] = leaveApplicationDetails[l].toDt; myArray[cnt]["totalDays"] = leaveApplicationDetails[l].totalDays;
                        myArray[cnt]["halfDayFlag"] = leaveApplicationDetails[l].halfDayFlag; myArray[cnt]["isPosted"] = leaveApplicationDetails[l].isPosted;
                        cnt++;
                    } leaveApplicationDetails = "";
                } $scope.pdata = myArray; $scope.InfoPL = $scope.pdata; $scope.curPage1 = 0; $scope.pageSize1 = 25; $scope.$digest();
            }
        };
        xhr1.send();
    };
    //Reject Force fully after Leave Application Posted 
    $scope.PostLeaveReject = function (data, value, value1) {
        var TableData = storeTblValues(); TableData = JSON.stringify(TableData);
        function storeTblValues() {
            var TableData = new Array();
            $('#aliasTable tr').each(function (row, tr) { TableData[row] = { "LeaveAppId": $(tr).find('td:eq(2)').text(), "LeaveAppItem": $(tr).find('td:eq(10)').text() } });
            var tbl = new Array(); tbl[0] = "test";
            var count = 0;
            for (var i = 0; i < TableData.length; i++) {
                var appid = TableData[i]["LeaveAppId"];
                if (appid == value) {
                    if ((typeof (data) === "undefined") || (typeof (data.Remarks) === "undefined")) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Remarks First For Rejection</strong></div>"; $('#MessageBox').show(); return; }
                    tbl[count] = { "YearMonth": value1, "LeaveAppId": value, "LeaveAppItem": TableData[i]["LeaveAppItem"], "IsPosted": "R", "Remarks": data.Remarks, "UserId": $('#myEmpUnqId').val() }
                    count++;
                }
            } return tbl;
        }
        var xhr1 = new XMLHttpRequest(); xhr1.open('POST', $scope._Conpath + 'LeavePosting/PostLeaves', true); xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4 && xhr1.status === 200) {
                window.location.reload(true);
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Rejected Sucesfully.. </strong></div>"; $('#MessageBox').show();
            } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Not Rejected Please Try again.. </strong></div>"; $('#MessageBox').show(); }
            $scope.GetPostedLeaveInfo();
        }; xhr1.send(TableData);
    };
    //Attendance Report / Cafetria Punching Report
    $scope.PerformanceAttendanceRpt = function (str) {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth() - 2, 25);           //Previous Month Date 25
        var lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());    //Current Date Today
        var FromDate = (firstDay.getFullYear()) + '-' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate();
        var ToDate = lastDay.getFullYear() + '-' + (lastDay.getMonth() + 1) + '-' + (lastDay.getDate());
        if (str === "PERF") { $('#rptPerformance').show(); $('#rptPunching').hide(); }
        if (str === "PUNCH") { $('#rptPerformance').hide(); $('#rptPunching').show(); }
        var pr = new XMLHttpRequest();
        pr.open('GET', $scope._Conpath + 'Employee/PerfAttd?empunqid=' + $('#myEmpUnqId').val() + '&flag=' + str + '&fromdate=' + FromDate + '&todate=' + ToDate, true);
        pr.setRequestHeader('Accept', 'application/json');
        pr.onreadystatechange = function () {
            if (pr.readyState === 4) {
                $scope.InfoPL = pr.responseText; var json = JSON.parse(pr.responseText); $scope.prdata = json;
                if (str === "PERF") { $scope.prdata = $filter('orderBy')($scope.prdata, '-attdDate'); }
                if (str === "PUNCH") { $scope.prdata = $filter('orderBy')($scope.prdata, '-punchDate'); }
                $scope.curPage = 0; $scope.pageSize = 31; $scope.$digest();
            }
        }; pr.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
    $scope.exportAllData = function (name) { setTimeout(function () { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var d = new Date(); d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = name + d; $scope.JSONToCSVConvertor($scope.InfoPL, FileName, true); $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); }, 100); };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = ''; CSV += ReportTitle + '\r\n\n';
        if (ShowLabel) { var row = ""; for (var index in arrData[0]) { row += index + ','; } row = row.slice(0, -1); CSV += row + '\r\n'; }
        for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; } row.slice(0, row.length - 1); CSV += row + '\r\n'; }
        if (CSV === '') { alert("Invalid data"); return; }
        var fileName = "Report_"; fileName += ReportTitle.replace(/ /g, "_"); var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a"); link.href = uri; link.style = "visibility:hidden"; link.download = fileName + ".csv";
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
    };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });