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

    jQuery.support.cors = true;
    $('#txtEmpCode').val($('#myEmpUnqId').val());
    //Reload Page
    $scope.ResetView = function () { window.location.reload(true); };

    //Get Employee details from employee code entered by user for Reset Password 
    $scope.GetEmpInfo = function () {

        var e_Code = $('#txtEmpCode').val();
        if (e_Code === '') {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Employee Code First.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }

        var emp = new XMLHttpRequest();
        emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + e_Code, true);
        emp.setRequestHeader('Accept', 'application/json');
        emp.onreadystatechange = function () {
            if (emp.readyState === 4) {
                var json = JSON.parse(emp.responseText);
                $scope.empdata = json;
                $scope.$digest();
                $('#txtEmpCode').val($scope.empdata[0].empUnqId);
                $('#txtEmpName').val($scope.empdata[0].empName);
                $('#txtStat').val($scope.empdata[0].statName);
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

    //Print Perview of Gate Pass
    $scope.PrintTable = function () {
        var prtContent = document.getElementById("tblPrint");
        var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        WinPrint.document.write(prtContent.innerHTML);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    }

    var AddFirst = false;
    //Add Out Gate Pass Person List in Grid
    var c = 0;
    $scope.AddNewPerson = function (entity) {

        if ((typeof (entity.Mode) === "undefined") ||
            (typeof (entity.PlaceofVisit) === "undefined") ||
            (typeof (entity.Reason) === "undefined")) {
            alert("Please Fill All Required Details .. ");
            return false;
        }

        var EmpUnqId = $('#txtEmpCode').val();
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
                }
            });
            tbl.shift();// first row will be empty - so remove
            return tbl;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', $scope._Conpath + 'GatePass/CreateGatePass', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                $scope.tmpdta = json;
                $scope.$digest();

                $scope.gpno = $scope.tmpdta[0]['gatePassNo'];

                $scope.gpdate = $scope.tmpdta[0]['gatePassDate'];
                var gpdt = $scope.gpdate;
                gpdt = (gpdt).slice(0, 10);

                document.getElementById("MessageBox").innerHTML =
                                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Gate Pass Generated Sucesfully..</strong>" +
                                    "<div style='float:right;'>" +
                                    "<strong>" +
                                    "<a style='float: right;' target='_blank' href='/Report/PrintPreviewGatePass?gpno=" + $scope.gpno + "&gpdate=" + gpdt + "'>Print Preview</a></strong></div></div>";
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
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Gate Pass Not Generated.. </strong></div>";
                $('#MessageBox').show();
                document.getElementById("txtEmpCode").value = "";
                document.getElementById("txtEmpName").value = "";
                document.getElementById("txtStat").value = "";
                document.getElementById("txtPlace").value = "";
                document.getElementById("txtPurpose").value = "";
                $("#Mode option:first").attr("selected", true);
            }
        };
        xhr.send(TableData);
    };

    //Print out of Gate Pass
    $scope.GetGatePassInfo = function (gpno, gpdate) {
        if (typeof (gpno) === "undefined" ||
            typeof (gpdate) === "undefined") {
            var url_string = window.location.href
            var url = new URL(url_string);
            gpno = url.searchParams.get("gpno");
            gpdate = url.searchParams.get("gpdate");
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
            else {

                var ss = prnt.responseText;
            }
        };
        prnt.send();
    };

    //Get Details of Gate PAss of Login USer
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

    //Get All Gate Pass Informatinon for HR Department
    $scope.AllGatePassInfo = function () {
        var FromDate, ToDate;

        if ((typeof (entity) === "undefined") ||
            (typeof (entity.FromDt) === "undefined") ||
            (typeof (entity.ToDt) === "undefined")) {

            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            FromDate = (firstDay.getFullYear()) + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate();
            ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate());
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

        var all = new XMLHttpRequest();
        all.open('GET', $scope._Conpath + 'GatePass/GetGatePass?fromDt=' + FromDate + '&toDt=' + ToDate, true);
        all.setRequestHeader("Content-type", "application/json");
        all.onreadystatechange = function () {
            if (all.readyState === 4 && all.status === 200) {
                var json = JSON.parse(all.responseText);
                $scope.alldata = json;
                $scope.alldata = $filter('orderBy')($scope.alldata, '-addDateTime');
                $scope.$digest();
            }
        };
        all.send();
    };

    //Get All Gate Pass Informatinon for HR Department
    $scope.ReleaserGatePassInfo = function (entity) {

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
                $scope.relalldata = $filter('orderBy')($scope.relalldata, '-addDateTime');
                $scope.$digest();
            }
        };
        relall.send();
    };

    //Using For DIR Pagintaiton Sorting
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
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