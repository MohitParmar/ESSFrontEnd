var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('LeavePostingController', function ($scope, $http, $filter) {

    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1;
    $scope.itemsPerPage = 25;
    $scope.alluserlist = [];
    $scope.popupid = '';
    $scope._Conpath = '';
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });
    $scope.InfoPL;

    //Reload Page
    $scope.ResetView = function () { window.location.reload(true); };

    jQuery.support.cors = true;

    //Get All Checkboxes Value
    //var arr = $('#myTable [name=chkbox[]]:checked').map(function () { return $(this).val(); }).get();

    //Leave Posting Method with Parameteer data(Remarks for Rejection),value(Leave Application ID),value1(YearMonth),value2(IS Posted Flag)
    $scope.CostLeave = function (data, value, value1, value2) {

        var TableData = storeTblValues();
        TableData = JSON.stringify(TableData);

        function storeTblValues() {

            var TableData = new Array();

            $('#aliasTable tr').each(function (row, tr) {
                TableData[row] = {
                    "LeaveAppId": $(tr).find('td:eq(0)').text(),
                    "LeaveAppItem": $(tr).find('td:eq(1)').text()
                    , "IsPosted": $(tr).find("select").val()
                }
            });

            var tbl = new Array();
            tbl[0] = "test";

            var count = 0;

            for (var i = 0; i < TableData.length; i++) {

                var appid = TableData[i]["LeaveAppId"];

                //var ispst = TableData[i]["IsPosted"];

                if (appid == value) {
                    if (value2 === "R") {
                        if ((typeof (data) === "undefined") || (typeof (data.Remarks) === "undefined")) {
                            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Remarks First For Rejection</strong></div>";
                            $('#MessageBox').show();

                            return;
                        }
                    }

                    //For Rejection
                    if (value2 === "R") {
                        tbl[count] = {
                            "YearMonth": value1
                            , "LeaveAppId": value
                            , "LeaveAppItem": TableData[i]["LeaveAppItem"]
                            , "IsPosted": value2
                            , "Remarks": data.Remarks
                            , "UserId": $('#myEmpUnqId').val()
                        }
                        count++;
                    }

                    //P For Posting 
                    if (value2 === "P") {
                        tbl[count] = {
                            "YearMonth": value1
                            , "LeaveAppId": value
                            , "LeaveAppItem": TableData[i]["LeaveAppItem"]
                            , "IsPosted": TableData[i]["IsPosted"]
                            , "UserId": $('#myEmpUnqId').val()
                        }
                        count++;
                    }
                }
            }
            return tbl;
        }

        var xhr1 = new XMLHttpRequest();
        xhr1.open('POST', $scope._Conpath + 'LeavePosting/PostLeaves', true);
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4 && xhr1.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Leave Posted / Rejected Sucesfully.. </strong></div>";
                $('#MessageBox').show();
            }
            else if (xhr1.status === 400 || xhr1.status === 403 || xhr1.status === 404 || xhr1.status === 408 || xhr1.status === 500) {
                var str = xhr1.responseText.replace("[", '').replace("]", '').toString();
                var fields = str.split(',');
                var er = "";
                for (var i = 0; i < fields.length ; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er + "</strong></div>";
                $('#MessageBox').show();
            }
            $scope.GetPostingLeaveApplicationLists();
        };
        xhr1.send(TableData);
    };

    //Get Pending Leave Application List for Posting
    $scope.GetPostingLeaveApplicationLists = function (data) {

        $('#loading').removeClass("deactivediv");
        $('#loading').addClass("activediv");

        var hidfdt = $('#hidfromdt').val();
        var hidtdt = $('#hidtodt').val();

        var FromDate, ToDate;

        if (hidfdt !== '' && hidtdt !== '' && (typeof (data) === "undefined")) {
            FromDate = hidfdt;
            ToDate = hidtdt;
        }
        else if ((typeof (data) === "undefined") ||
                (typeof (data.FromDt) === "undefined") ||
                (typeof (data.ToDt) === "undefined")) {

            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);

            FromDate = firstDay.getFullYear() + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate() + ' 00:00:00';
            ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + lastDay.getDate() + ' 23:59:59';
        }
        else {
            FromDate = data.FromDt;
            document.getElementById("hidfromdt").value = data.FromDt;

            ToDate = data.ToDt;
            document.getElementById("hidtodt").value = data.ToDt;
        }

        var date1 = new Date(FromDate);
        var date2 = new Date(ToDate);
        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }

        var flg = true;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', $scope._Conpath + 'LeavePosting/GetLeaves?fromDt=' + FromDate + '&toDt=' + ToDate + '&flag=' + flg, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                $('#loading').removeClass("activediv");
                $('#loading').addClass("deactivediv");
                $scope.InfoPL = xhr.responseText;
                var json = JSON.parse(xhr.responseText);

                var temparr = new Array();
                var url_string = window.location.href
                var url = new URL(url_string);
                var tmpflg = url.searchParams.get("flg");
                var count = 0;
                for (var key in json) {
                    if (json.hasOwnProperty(key)) {
                        for (var key2 in json[key].leaveApplicationDetails) {
                            
                            var tmpisPosted = json[key].leaveApplicationDetails[key2].isPosted;     //Not Posted / Partially Posted
                            var tmpcancelled = json[key].leaveApplicationDetails[key2].cancelled;   //Short Leave Cancelled
                            var tmpparentId = json[key].leaveApplicationDetails[key2].parentId;     //Full Leavea Cancelled

                            if (tmpflg === 'N') {
                                if (tmpisPosted === 'N' && tmpcancelled === false && tmpparentId === 0) {
                                    temparr[count] = json[key];
                                    count++;
                                    break;
                                }
                            }
                            else if (tmpflg === 'P') {
                                if (tmpisPosted === 'P') {
                                    temparr[count] = json[key];
                                    count++;
                                    break;
                                }
                            }
                            else if (tmpflg === 'C') {
                                if (tmpcancelled === true || tmpparentId !== 0) {
                                    temparr[count] = json[key];
                                    count++;
                                    break;
                                }
                            }
                        }
                    }
                }

                $scope.lappdata = temparr;
                $scope.lappdata = $filter('orderBy')($scope.lappdata, '-leaveAppId');
                $scope.curPage = 0;
                $scope.pageSize = 25;
                $scope.$digest();
            }
        };
        xhr.send();
    };

    //Populate Model for Attendance Report by Leave Application User
    $scope.PopulateData = function (id) {
        document.getElementById("FDt").value = "";
        document.getElementById("TDt").value = "";
        $scope.popupid = id;
        document.getElementById("eid").innerHTML = $scope.popupid;
        $('#ConformModel').modal('show');

        var d = new Date();
        var req = new XMLHttpRequest();
        req.open('GET', $scope._Conpath + 'LeaveBalance/GetLeaveBalance?empUnqId=' + id + '&yearmonth=' + d.getFullYear() + '&flag=true', true);
        req.setRequestHeader('Accept', 'application/json');
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                var json = JSON.parse(req.responseText);
                $scope.lbaldata = json;
                $scope.$digest();
            }
        };
        req.send();

        $scope.PerformanceAttendanceRpt(id);
    };

    //Performance Report Method with Employee Code / SEarch Dates
    $scope.PerformanceAttendanceRpt = function (data) {

        var str = $scope.popupid;

        if (str === "") { return false; }

        var pr = new XMLHttpRequest();

        if ((typeof (data) === "undefined") ||
            (typeof (data.fdt) === "undefined") ||
            (typeof (data.tdt) === "undefined")) {
            pr.open('GET', $scope._Conpath + 'Employee/PerfAttd?empunqid=' + str + '&flag=PERF', true);
        }
        else {
            pr.open('GET', $scope._Conpath + 'Employee/PerfAttd?empunqid=' + str + '&flag=PERF&fromdate=' + data.fdt + '&todate=' + data.tdt, true);
        }

        pr.setRequestHeader('Accept', 'application/json');
        pr.onreadystatechange = function () {
            if (pr.readyState === 4) {

                var json = JSON.parse(pr.responseText);
                $scope.prdata = json;
                $scope.prdata = $filter('orderBy')($scope.prdata, '-attdDate');
                $scope.curPage1 = 0;
                $scope.pageSize1 = 31;
                $scope.$digest();
            }
        };
        pr.send();
    };

    //Using For DIR Pagintaiton Sorting
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; }

    //Export to Excel CSV File Grid Data
    $scope.exportAllData = function () {
        setTimeout(function () {

            $('#loading').removeClass("deactivediv");
            $('#loading').addClass("activediv");

            var d = new Date();
            d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = "Posting_Leave_Application_List_" + d;

            $scope.JSONToCSVConvertor($scope.InfoPL, FileName, true);

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
    }
});

//Date Time Picker
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