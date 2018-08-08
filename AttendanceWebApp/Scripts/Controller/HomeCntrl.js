var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('HomeCntrloller', function ($scope, $http, $filter) {

    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.alluserlist = [];
    $scope._Conpath = '';
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });

    //Reload Page
    $scope.ResetView = function () { window.location.reload(true); };

    //Enable Jquery Support FOR XML HTTP Request Objet to execute Cross Domain Object
    jQuery.support.cors = true;

    //Change Password
    $scope.changePassword = function (entity) {

        var jsonObj = {};

        jsonObj.EmpUnqId = $('#myEmpUnqId').val();
        jsonObj.Pass = entity.Pass;
        jsonObj = JSON.stringify(jsonObj);

        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST', $scope._Conpath + 'Employee/ChangePassword', true);
        xhr2.setRequestHeader("Content-type", "application/json");
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4) {
                window.location.href = '/Login/UserLogin/';
            }
            else if (xhr2.status === 400) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Password Not Updated .. </strong></div>";
                $('#MessageBox').show();
                document.getElementById("eCode").value = "";
                document.getElementById("ePass").value = "";
                jQuery('#btnClose').click();
            }
        };
        xhr2.send(jsonObj);
    };

    //Reset Password
    $scope.ResetPass = function () {

        var e_Code = $('#eCode').val();
        if (e_Code === '') {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Employee Code First.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }

        var jsonObj = {};

        jsonObj.EmpUnqId = $('#eCode').val();
        jsonObj.Pass = $('#eCode').val();

        jsonObj = JSON.stringify(jsonObj);

        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST', $scope._Conpath + 'Employee/ChangePassword', true);
        xhr2.setRequestHeader("Content-type", "application/json");
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Password Changed Sucesfully..</strong></div>";
                $('#MessageBox').show();
                document.getElementById("eCode").value = "";
                $('#tbl_empdtl').hide();
            }
            else if (xhr2.status === 400) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Password Not Updated .. </strong></div>";
                $('#MessageBox').show();
                document.getElementById("eCode").value = "";
                $('#tbl_empdtl').hide();
            }
        };
        xhr2.send(jsonObj);
    };

    //Update Email Address
    $scope.EmpeMail = function (data) {
        var xhr3 = new XMLHttpRequest();
        xhr3.open('POST', $scope._Conpath + 'Employee/updateemail?empunqid=' + $('#myEmpUnqId').val() + '&email=' + data.eMailID, true);
        xhr3.setRequestHeader("Content-type", "application/json");
        xhr3.onreadystatechange = function () {
            if (xhr3.readyState === 4) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Email ID Saved Sucesfully..</strong></div>";
                $('#MessageBox').show();
                document.getElementById("eMailID").value = "";
                $('#tbl_empdtl').hide();
            }
            else if (xhr3.status === 400) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Emails ID Not Saved..</strong></div>";
                $('#MessageBox').show();
                document.getElementById("eMailID").value = "";
                $('#tbl_empdtl').hide();
            }
        };
        xhr3.send();
    };

    //Get User JOB Profile Details
    $scope.GetUserInfo = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + $('#myEmpUnqId').val(), true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var json = JSON.parse(xhr.responseText);
                $scope.Udata = json;
                $scope.$digest();
            }
        };
        xhr.send();
    };

    //Get User Personal Details from Attendance Database
    $scope.GetUserPerasonalInfo = function () {
        var per = new XMLHttpRequest();
        per.open('GET', $scope._Conpath + 'Employee/GetEmpDetails?empunqid=' + $('#myEmpUnqId').val() + '&mode=1', true);
        per.setRequestHeader('Accept', 'application/json');
        per.onreadystatechange = function () {
            if (per.readyState === 4) {
                var json = JSON.parse(per.responseText);
                $scope.Uperdata = json;
                $scope.$digest();
            }
        };
        per.send();
    };

    //Get User Educational Details
    $scope.GetUserEducationalInfo = function () {
        var edu = new XMLHttpRequest();
        edu.open('GET', $scope._Conpath + 'Employee/GetEmpDetails?empunqid=' + $('#myEmpUnqId').val() + '&mode=2', true);
        edu.setRequestHeader('Accept', 'application/json');
        edu.onreadystatechange = function () {
            if (edu.readyState === 4) {
                var json = JSON.parse(edu.responseText);
                $scope.Uedudata = json;
                $scope.$digest();
            }
        };
        edu.send();
    };

    //Get User Family Details
    $scope.GetUserFamilyInfo = function () {
        var fml = new XMLHttpRequest();
        fml.open('GET', $scope._Conpath + 'Employee/GetEmpDetails?empunqid=' + $('#myEmpUnqId').val() + '&mode=3', true);
        fml.setRequestHeader('Accept', 'application/json');
        fml.onreadystatechange = function () {
            if (fml.readyState === 4) {
                var json = JSON.parse(fml.responseText);
                $scope.Ufmldata = json;
                $scope.$digest();
            }
        };
        fml.send();
    };

    //Get Employee details from employee code entered by user for Reset Password 
    $scope.GetEmpInfo = function () {

        $('#tbl_empdtl').show();

        var e_Code = $('#eCode').val();
        if (e_Code === '') {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Employee Code First.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }

        var emp = new XMLHttpRequest();
        emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + $('#eCode').val(), true);
        emp.setRequestHeader('Accept', 'application/json');
        emp.onreadystatechange = function () {
            if (emp.readyState === 4) {
                var json1 = JSON.parse(emp.responseText);
                $scope.empdata = json1;
                $scope.$digest();
            }
            else if (emp.status !== 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>";
                $('#MessageBox').show();
            }
        };
        emp.send();
    };

    //Get Login User Leave Applications List
    $scope.GetLeaveRequestLists = function () {
        var xhr1 = new XMLHttpRequest();
        xhr1.open('GET', $scope._Conpath + 'LeaveApplication/GetLeaveApplication?empUnqId=' + $('#myEmpUnqId').val(), true);
        xhr1.setRequestHeader('Accept', 'application/json');
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                var json = JSON.parse(xhr1.responseText);
                $scope.lappdata = json;
                $scope.lappdata = $filter('orderBy')($scope.lappdata, '-leaveAppId');
                $scope.curPage = 0;
                $scope.pageSize = 10;
                $scope.$digest();
            }
        };
        xhr1.send();
    };

    //Get Actual Posted Leave List by HR Department
    $scope.GetPostedLeave = function () {

        var d = new Date();

        var pstl = new XMLHttpRequest();
        pstl.open('GET', $scope._Conpath + 'leaveentry?empunqid=' + $('#myEmpUnqId').val() + '&year=' + d.getFullYear(), true);
        pstl.setRequestHeader('Accept', 'application/json');
        pstl.onreadystatechange = function () {
            if (pstl.readyState === 4) {
                var json = JSON.parse(pstl.responseText);
                $scope.pladata = json;
                $scope.pladata = $filter('orderBy')($scope.pladata, '-fromDt');
                $scope.curPage1 = 0;
                $scope.pageSize1 = 5;
                $scope.$digest();
            }
        };
        pstl.send();
    };

    //Change Open Month
    $scope.ChangeOpenMonth = function (openMonth) {

        var opmnth = openMonth.yearMonth;
        var d = new Date(opmnth);

        var yearmonth;
        if (d.getMonth() < '10') { yearmonth = (d.getFullYear()) + '0' + (d.getMonth() + 1); }

        var opm = new XMLHttpRequest();
        opm.open('POST', $scope._Conpath + 'OpenMonth/ChangeOpenMonth?yearMonth=' + yearmonth, true);
        opm.setRequestHeader("Content-type", "application/json");
        opm.onreadystatechange = function () {
            if (opm.readyState === 4 && opm.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Open Month Changed Successfully.. </strong></div>";
                $('#MessageBox').show();
                document.getElementById("openMonth").value = "";
            }
            else if (opm.status === 400) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Open Month not Changed.. </strong></div>";
                $('#MessageBox').show();
                document.getElementById("openMonth").value = "";
            }
        };
        opm.send();
    };

    //Cancel Leave Before First Release from User Side
    $scope.CancelLeave = function (ym, lid) {

        var retVal = confirm("Are You Sure to Cancel Leave Aplication ?");

        if (retVal === true) {

            var TableData = storeTblValues();
            TableData = JSON.stringify(TableData);

            function storeTblValues() {

                var TableData = new Array();

                $('#aliasTable tr').each(function (row, tr) {
                    TableData[row] = {
                        "LeaveAppId": $(tr).find('td:eq(0)').text(),
                        "LeaveAppItem": $(tr).find('td:eq(2)').text()
                    }
                });

                var tbl = new Array();
                tbl[0] = "test";

                var count = 0;

                for (var i = 0; i < TableData.length; i++) {
                    var appid = TableData[i]["LeaveAppId"];
                    if (appid == lid) {
                        tbl[count] = {
                            "YearMonth": ym
                            , "LeaveAppId": lid
                            , "LeaveAppItem": TableData[i]["LeaveAppItem"]
                            , "IsPosted": "R"
                            , "Remarks": "Self Rejected"
                            , "UserId": $('#myEmpUnqId').val()
                        }
                        count++;
                    }
                }
                return tbl;
            }

            var can = new XMLHttpRequest();
            can.open('POST', $scope._Conpath + 'LeavePosting/PostLeaves', true);
            can.setRequestHeader("Content-type", "application/json");
            can.onreadystatechange = function () {
                if (can.readyState === 4 && can.status === 200) {
                    $scope.GetLeaveRequestLists();
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Cancelled Sucesfully.. </strong></div>";
                    $('#MessageBox').show();
                }
                else {
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Not Cancelled Please Try again.. </strong></div>";
                    $('#MessageBox').show();
                }
                $scope.GetLeaveRequestLists();
            };
            can.send(TableData);
        }
        else { return false; }
    };

    //Update Present Address in ESS Database
    $scope.UpdateAddress = function (entity) {

        if ((typeof (entity) === "undefined") ||
            (typeof (entity.add1) === "undefined") ||
            (typeof (entity.phoneno) === "undefined")) {

            alert("Please Fill All Required Details .. ");
            return false;
        }

        var jsonObj = {};

        jsonObj.EmpUnqId = $('#myEmpUnqId').val();
        jsonObj.PreAdd1 = entity.add1;
        jsonObj.PreAdd2 = entity.add2;
        jsonObj.PreAdd3 = entity.vlg;
        jsonObj.PreAdd4 = entity.tlk;
        jsonObj.PreState = $('#txtstate').val();
        jsonObj.PreDistrict = $('#txtdist').val();
        jsonObj.PreCity = entity.city;
        jsonObj.PrePin = entity.pincode;
        jsonObj.PrePhone = entity.phoneno;
        jsonObj.PreResPhone = entity.resno;

        jsonObj = JSON.stringify(jsonObj);

        var addr = new XMLHttpRequest();
        addr.open('POST', $scope._Conpath + 'EmpAddress/UpdateEmpAddress', true);
        addr.setRequestHeader("Content-type", "application/json");
        addr.onreadystatechange = function () {
            if (addr.readyState === 4 && addr.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Address Details Successfully Updated.. </strong></div>";
                $('#MessageBox').show();
                document.getElementById("txtadd1").value = "";
                document.getElementById("txtadd2").value = "";
                document.getElementById("txtvlg").value = "";
                document.getElementById("txtcity").value = "";
                document.getElementById("txttlk").value = "";
                document.getElementById("txtdist").value = "";
                document.getElementById("txtState").value = "";
                document.getElementById("txtpincode").value = "";
                document.getElementById("txtphoneno").value = "";
                document.getElementById("txtresno").value = "";

                $scope.GetPresentAddress();
            }
            else if (addr.status === 400) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Address Details are not Saved.. </strong></div>";
                $('#MessageBox').show();
            }
        };
        addr.send(jsonObj);
    };

    //Get Present Addres Information from ESS Database
    $scope.GetPresentAddress = function () {
        var arr = new Array();
        var preAdd = new XMLHttpRequest();
        preAdd.open('GET', $scope._Conpath + 'EmpAddress/GetEmpAddress?empUnqId=' + $('#myEmpUnqId').val(), true);
        preAdd.setRequestHeader('Accept', 'application/json');
        preAdd.onreadystatechange = function () {
            if (preAdd.readyState === 4) {
                var json = JSON.parse(preAdd.responseText);
                var tmparr = json;

                arr[0] = {
                    "empUnqId": tmparr["empUnqId"]
                    , "preAdd1": tmparr["preAdd1"]
                    , "preAdd2": tmparr["preAdd2"]
                    , "preAdd3": tmparr["preAdd3"]
                    , "preAdd4": tmparr["preAdd4"]
                    , "preCity": tmparr["preCity"]
                    , "preDistrict": tmparr["preDistrict"]
                    , "prePhone": tmparr["prePhone"]
                    , "prePin": tmparr["prePin"]
                    , "preResPhone": tmparr["preResPhone"]
                    , "preState": tmparr["preState"]
                };

                $scope.preadddata = arr;
                $scope.$digest();
            }
        };
        preAdd.send();
    };

    //Using For DIR Pagintaiton Sorting
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
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