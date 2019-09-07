var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('ODController', function ($scope, $http) {
    //angular.module('myApp.Controllers').controller('ODController', ['$scope', '$http', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.alluserlist = [];    $scope.currentPage = 1; $scope.itemsPerPage = 10;
    $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.ResetView = function () { window.location.reload(true); } //Reload Page
    //Get Release Strategy
    $scope.GetRelesaseStratey = function () { var rel = new XMLHttpRequest(); rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() + '&empUnqId=' + $('#myEmpUnqId').val(), true); rel.setRequestHeader('Accept', 'application/json'); rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.curPage = 0; $scope.pageSize = 10; $scope.$digest(); } }; rel.send(); };
    //Date Validation
    $scope.ToValidate = function () { var chkFrom = document.getElementById('FromDt'); var chkTo = document.getElementById('ToDt'); var FromDate = chkFrom.value; var ToDate = chkTo.value; var date1 = new Date(FromDate); var date2 = new Date(ToDate); var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1; document.getElementById("TotalDays").value = diff; if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; } else { return true; } };
    var c = 0;
    //Create New OD Application
    $scope.createOD = function (entity) {
        if ((typeof (entity) === "undefined") || (typeof (entity.FromDt) === "undefined") || (typeof (entity.ToDt) === "undefined") || (typeof (entity.Place) === "undefined") || (typeof (entity.Details) === "undefined")) { alert("Please Fill All Required Details .. "); return false; }
        var FromDate = entity.FromDt; var ToDate = entity.ToDt; var date1 = new Date(FromDate); var date2 = new Date(ToDate);
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; }
        var d = new Date(); var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var year = d.getFullYear().toString(); var month = d.getMonth() + 1; var yearmonth = year + (month.toString());

        var jsonObj = {};
        var TableData = storeTblValues();
        TableData = JSON.stringify(TableData);
        function storeTblValues() {
            var TableData = new Array();
            TableData[0] = {
                "yearMonth": yearmonth
                , "leaveAppId": 0
                , "compCode": $('#myCompCode').val()
                , "wrkGrp": $('#myWrkGrp').val()
                , "leaveAppItem": 1
                , "leaveTypeCode": $('#LeaveTypeCode').val()
                , "fromDt": FromDate
                , "toDt": ToDate
                , "totalDays": $('#TotalDays').val()
                , "placeOfVisit": entity.Place
                , "contactAddress": entity.Details
            };
            jsonObj.yearMonth = yearmonth;
            jsonObj.leaveAppId = 0;
            jsonObj.empUnqId = $('#myEmpUnqId').val();
            jsonObj.compCode = $('#myCompCode').val();
            jsonObj.wrkGrp = $('#myWrkGrp').val();
            jsonObj.unitCode = $('#myUnitCode').val();
            jsonObj.deptCode = $('#myDeptCode').val();
            jsonObj.statCode = $('#myStatCode').val();
            jsonObj.secCode = $('#mySecCode').val();
            jsonObj.catCode = $('#myCatCode').val();
            jsonObj.isHOD = $('#myIsHod').val();
            jsonObj.releaseGroupCode = $('#releaseGroupCode').val();
            jsonObj.releaseStrategy = "";
            jsonObj.releaseStatusCode = "";
            jsonObj.addDt = dt;
            jsonObj.addUser = $('#myEmpUnqId').val();
            jsonObj.updDt = dt;
            jsonObj.updUser = null;
            jsonObj.remarks = null;
            jsonObj.leaveApplicationDetails = TableData;
            return jsonObj;
        }
        jQuery.support.cors = true;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', $scope._Conpath + 'LeaveApplication/CreateLeaveApplication', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>OD Application Created Sucesfully.. </strong></div>"; $('#MessageBox').show();
                document.getElementById("FromDt").value = "";
                document.getElementById("ToDt").value = "";
                document.getElementById("TotalDays").value = "";
                document.getElementById("Place").value = "";
                document.getElementById("ContactDetails").value = "";
            } else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Leave Application Not Created.. </strong></div>"; $('#MessageBox').show();
                document.getElementById("FromDt").value = "";
                document.getElementById("ToDt").value = "";
                document.getElementById("TotalDays").value = "";
                document.getElementById("Place").value = "";
                document.getElementById("ContactDetails").value = "";
            }
        };
        xhr.send(TableData);
    };
});
//Date Picker
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });