var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('PendingLeaveCntroller', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1; $scope.itemsPerPage = 50;
    $scope.alluserlist = [];
    $scope.jsondata;
    $scope._Conpath = ''; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });

    //Check Validation From Date & To Date Range
    $scope.ToValidate = function () {
        var chkFrom = document.getElementById('FromDt'); var chkTo = document.getElementById('ToDt');
        var FromDate = chkFrom.value; var ToDate = chkTo.value;
        var date1 = new Date(FromDate); var date2 = new Date(ToDate);
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; } else { return true; }
    }

    //Get All Pending For Posting Leave Application List
    //Export to Excel CSV File Grid Data
    $scope.GetPendingForPostLeaveAppList = function (entity) {
        var FromDate, ToDate;
        if ((typeof (entity) === "undefined") || (typeof (entity.FromDt) === "undefined") || (typeof (entity.ToDt) === "undefined")) { return false; } else { FromDate = entity.FromDt; ToDate = entity.ToDt; }
        var date1 = new Date(FromDate); var date2 = new Date(ToDate);
        if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; }
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var rls = new XMLHttpRequest();
        rls.open('GET', $scope._Conpath + 'LeavePosting/GetLeaves?fromDt=' + FromDate + '&toDt=' + ToDate, true);
        rls.setRequestHeader('Accept', 'application/json');
        rls.onreadystatechange = function () {
            if (rls.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                $scope.jsondata = rls.responseText; var json = JSON.parse(rls.responseText); $scope.rlsdata = json; $scope.$digest();
                setTimeout(function () {
                    var d = new Date(); d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
                    var FileName = "Pending_For_Post_Leave_App_List_" + d;
                    $scope.JSONToCSVConvertor($scope.jsondata, FileName, true);
                }, 100);
            }
        };
        rls.send();
    };

    //Convert Json Data to CSV 
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = ''; CSV += ReportTitle + '\r\n\n';
        if (ShowLabel) { var row = ""; for (var index in arrData[0]) { row += index + ','; } row = row.slice(0, -1); CSV += row + '\r\n'; }
        for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; } row.slice(0, row.length - 1); CSV += row + '\r\n'; }
        if (CSV === '') { alert("Invalid data"); return; }
        var fileName = "MyReport_"; fileName += ReportTitle.replace(/ /g, "_");
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a"); link.href = uri; link.style = "visibility:hidden"; link.download = fileName + ".csv"; document.body.appendChild(link); link.click(); document.body.removeChild(link);
    }
});

//Date Picker
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });