angular.module('myApp.Controllers').controller('LoginController', ['$scope', '$http', function ($scope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.alluserlist = [];
    $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; var url_port = url.port; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.UserLogin = function (entity) {
        var jsonObj = {}; jsonObj.EmpUnqId = entity.EmpUnqId; jsonObj.Pass = entity.Pass; jsonObj = JSON.stringify(jsonObj);
        jQuery.support.cors = true;
        var xhr = new XMLHttpRequest(); xhr.open('POST', $scope._Conpath + 'Login/GetLogin', true); xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //var headerdetail = xhr.getResponseHeaders("content-type");
                var json = JSON.parse(xhr.responseText); $scope.Udata = json; var act = $scope.Udata[0]["active"];
                if (act === false) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> You are not Authorized. </strong></div>"; $('#MessageBox').show(); document.getElementById("EmpUnqId").value = ""; document.getElementById("Pass").value = ""; return false; }
                var jsonObj1 = {}; jsonObj1.EmpUnqId = $scope.Udata[0]["empUnqId"]; jsonObj1.EmpName = $scope.Udata[0]["empName"]; jsonObj1.Pass = $scope.Udata[0]["pass"]; jsonObj1.CompCode = $scope.Udata[0]["compCode"]; jsonObj1.WrkGrp = $scope.Udata[0]["wrkGrp"]; jsonObj1.UnitCode = $scope.Udata[0]["unitCode"]; jsonObj1.DeptCode = $scope.Udata[0]["deptCode"]; jsonObj1.StatCode = $scope.Udata[0]["statCode"]; jsonObj1.GradeCode = $scope.Udata[0]["gradeCode"]; jsonObj1.OtFlag = $scope.Udata[0]["otFlag"]; jsonObj1.CatCode = $scope.Udata[0]["catCode"]; jsonObj1.isReleaser = $scope.Udata[0]["isReleaser"]; jsonObj1.isHrUser = $scope.Udata[0]["isHrUser"]; jsonObj1.isHod = $scope.Udata[0]["isHod"]; jsonObj1.isGpReleaser = $scope.Udata[0]["isGpReleaser"]; jsonObj1.isSecUser = $scope.Udata[0]["isSecUser"]; jsonObj1.isAdmin = $scope.Udata[0]["isAdmin"]; jsonObj1.Location = $scope.Udata[0]["location"]; jsonObj1 = JSON.stringify(jsonObj1);
                //jsonObj1.headerdetail = headerdetail;
                //Go to Login Controller for Set Session Values
                var reqs = new XMLHttpRequest(); reqs.open('POST', '/Login/Users', true); reqs.setRequestHeader("Content-type", "application/json");
                reqs.onreadystatechange = function () {
                    if (reqs.readyState === 4) {
                        if ($scope.Udata[0]["isReleaser"] === true) { window.location.href = "ReleaseLeave/LeaveRelease"; } else if ($scope.Udata[0]["wrkGrp"] === "COMP") { window.location.href = "Home/Index"; } else if ($scope.Udata[0]["wrkGrp"] !== "COMP") { window.location.href = "Report/PerformanceReport"; }//IS Releaser/IS User/Another User
                        if ($scope.Udata[0]["isReleaser"] === true && $scope.Udata[0]["isGpReleaser"] === true) { window.location.href = "ReleaseLeave/LeaveRelease"; } else if ($scope.Udata[0]["isGpReleaser"] === true) { window.location.href = "GatePass/GatePassRelease"; }//IS Releaser /IS GPReleaser
                        if ($scope.Udata[0]["isSecUser"] === true) { window.location.href = "GatePass/GatePassInOut"; }//IS Security USer
                    }
                }; reqs.send(jsonObj1);
            }
            else if (xhr.status === 400 || xhr.status === 500) { if (xhr.status === 500) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> Internal Server Error Please try after some time..</strong></div>"; } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> Incorrect Password / Employee code. </strong></div>"; } $('#MessageBox').show(); document.getElementById("EmpUnqId").value = ""; document.getElementById("Pass").value = ""; }
        }; xhr.send(jsonObj);
    }
    $scope.ChangePassword = function () { $('#ConformModel').modal('show'); };
    $scope.updatePassword = function (data) { var jsonObj = {}; jsonObj.EmpUnqId = data.empUnqId; jsonObj.Pass = data.pass; jsonObj = JSON.stringify(jsonObj); var xhr2 = new XMLHttpRequest(); xhr2.open('POST', $scope._Conpath + 'Employee/ChangePassword', true); xhr2.setRequestHeader("Content-type", "application/json"); xhr2.onreadystatechange = function () { if (xhr2.readyState === 4) { document.getElementById("eCode").value = ""; document.getElementById("ePass").value = ""; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> Password Changed Sucesfully.. </strong></div>"; $('#MessageBox').show(); jQuery('#btnClose').click(); } else if (xhr2.status === 400) { document.getElementById("eCode").value = ""; document.getElementById("ePass").value = ""; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> Password Not Updated .. </strong></div>"; $('#MessageBox').show(); jQuery('#btnClose').click(); } }; xhr2.send(jsonObj); };
}]);