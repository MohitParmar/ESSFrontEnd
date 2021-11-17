var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('Form16Cntroller', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 10; $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; }); $scope.ResetView = function () { window.location.reload(true); }; jQuery.support.cors = true;
    $scope.GetForm16Link = function () {
        var f16 = new XMLHttpRequest(); f16.open('GET', $scope._Conpath + 'form16/GetLinks?empunqid=' + $('#myEmpUnqId').val(), true);
        f16.setRequestHeader('Accept', 'application/json'); f16.onreadystatechange = function () {
            if (f16.readyState === 4) {
                var json = JSON.parse(f16.responseText); $scope.f16data = json; $scope.$digest();
            };
        }; f16.send();
    };
    $scope.GetFrom16Details = function (ydata, frmno) {
        var jsonobj = {}; jsonobj.assYear = ydata.assYear; jsonobj.empUnqId = $('#myEmpUnqId').val(); jsonobj.formNumber = frmno; jsonobj = JSON.stringify(jsonobj);
        var slpdls = new XMLHttpRequest(); slpdls.open('POST', $scope._Conpath + 'form16/GetForm16', true);
        slpdls.setRequestHeader("Content-type", "application/json"); slpdls.responseType = "arraybuffer";
        slpdls.onload = function () {
            if (slpdls.status == 200) {
                var blob = new Blob([slpdls.response], {
                    type: "application/pdf"
                }); var objectUrl = URL.createObjectURL(blob); window.open(objectUrl);
            } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong> File Not Found...</strong></div>"; $('#MessageBox').show(); };
        }; slpdls.send(jsonobj);
    };
    $scope.FromUpload = function (fyear, frmname) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var fyearpath = fyear + "/" + frmname; var data = new FormData();
        if (frmname === "form16") { var files = $("#files").get(0).files; if (files.length > 0) { for (f = 0; f < files.length; f++) { data.append("UploadedImage", files[f]); }; }; };
        if (frmname === "form16B") { var files1 = $("#files1").get(0).files; if (files1.length > 0) { for (f1 = 0; f1 < files1.length; f1++) { data.append("UploadedImage", files1[f1]); }; }; };// Add the uploaded file to the form data collection
        if (frmname === "form12") { var files2 = $("#files2").get(0).files; if (files2.length > 0) { for (f2 = 0; f2 < files2.length; f2++) { data.append("UploadedImage", files2[f2]); }; }; };
        $.ajax({ type: "POST", url: $scope._Conpath + 'Form16/UploadForm?folderName=' + fyearpath, contentType: false, processData: false, data: data, success: function (result) { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>File Uploaded Successfully...</strong></div>"; $('#MessageBox').show(); }, error: function (err) { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Files not uploaded Successfully Please Retry...</strong></div>"; $('#MessageBox').show(); } });//Ajax upload
    };
}); app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });
