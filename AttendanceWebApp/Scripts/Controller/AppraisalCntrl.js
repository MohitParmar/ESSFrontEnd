var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('AppraisalCntroller', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 10;
    var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; var url_port = url.port;
    $scope._Conpath = ''; jQuery.support.cors = true; var loc = $("#myLoc").val();
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.ResetView = function () { window.location.reload(true); };
    $scope.GetAppraisalLink = function () {
        var apr = new XMLHttpRequest();
        apr.open('GET', $scope._Conpath + 'AppraisalLetter/GetLinks?empUnqId=' + $('#myEmpUnqId').val().trim(), true);
        apr.setRequestHeader('Accept', 'application/json');
        apr.onreadystatechange = function () {
            if (apr.readyState === 4) {
                var json = JSON.parse(apr.responseText);
                $scope.aprdata = json;
                $scope.$digest();
            };
        }; apr.send();
    };
    $scope.GetAppraisalDetails = function (ydata) {
        var jsonobj = {};
        /*jsonobj.appraisalYear = ydata.appraisalYear;*/
        jsonobj.appraisalYear = ydata;
        jsonobj.empUnqId = $('#myEmpUnqId').val().trim();
        jsonobj = JSON.stringify(jsonobj);
        var aapldls = new XMLHttpRequest();
        aapldls.open('POST', $scope._Conpath + 'AppraisalLetter/GetAppraisal', true);
        aapldls.setRequestHeader("Content-type", "application/json");
        aapldls.responseType = "arraybuffer";
        aapldls.onload = function () {
            if (aapldls.status == 200) {
                var blob = new Blob([aapldls.response], { type: "application/pdf" });
                var objectUrl = URL.createObjectURL(blob);
                window.open(objectUrl);
            } else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong> File Not Found...</strong></div>"; $('#MessageBox').show();
            };
        }; aapldls.send(jsonobj);
    };
    $scope.FormUpload = function (fyear) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var fyearpath = "app_" + fyear;
        var data = new FormData();
        var files = $("#files").get(0).files;
        if (files.length > 0) { for (f = 0; f < files.length; f++) { data.append("UploadedFile", files[f]); }; };
        $.ajax({
            type: "POST",
            url: $scope._Conpath + 'AppraisalLetter/UploadForm?folderName=' + fyearpath,
            contentType: false,
            processData: false,
            data: data,
            success: function (result) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>File Uploaded Successfully...</strong></div>"; $('#MessageBox').show();
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
            },
            error: function (err) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Files not uploaded Successfully Please Retry...</strong></div>"; $('#MessageBox').show();
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
            }
        });//Ajax upload
    };
});