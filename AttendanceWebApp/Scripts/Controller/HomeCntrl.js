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

    //Change Password of Login Member
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

    //Reset Password (employee code required)
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

    //Update Login Member Email Address
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

    //Get Employee details from employee code (Method Use for Reset Password)
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

    //Get Login Member Leave Applications List
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

    //Get Actual Posted Leave Application List by HR Department
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

    //Cancel Leave Before First Release from member it self
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

    //Update Present Address in ESS Database of Login Member
    $scope.UpdateAddress = function () {

        var PreAdd1 = "", PreAdd2 = "", PreAdd3 = "", PreAdd4 = "", pincode = "", phoneno = "";

        PreAdd1 = $('#txtadd1').val();      //Add1
        PreAdd2 = $('#txtadd2').val();      //Add2
        PreAdd3 = $('#txtvlg').val();       //Village
        PreAdd4 = $('#txttlk').val();       //Taluka
        pincode = $('#pincode').val();      //PinCode
        phoneno = $('#txtphoneno').val();   //Mobile No

        if ((PreAdd1 === "") || (PreAdd2 === "") || (PreAdd3 === "") || (PreAdd4 === "") || (pincode === "") || (phoneno === "")) {
            alert("Please Fill All Required Details .. ");
            return false;
        }

        var jsonObj = {};

        jsonObj.EmpUnqId = $('#myEmpUnqId').val();
        jsonObj.PreAdd1 = PreAdd1;
        jsonObj.PreAdd2 = PreAdd2;
        jsonObj.PreAdd3 = PreAdd3;
        jsonObj.PreAdd4 = PreAdd4;
        jsonObj.PreState = $('#txtstate').val();
        jsonObj.PreDistrict = $('#txtdist').val();
        jsonObj.PreCity = $('#txtcity').val();
        jsonObj.PrePin = pincode;
        jsonObj.PrePhone = phoneno;
        jsonObj.PreResPhone = $('#txtresno').val();

        jsonObj = JSON.stringify(jsonObj);

        var addr = new XMLHttpRequest();
        addr.open('POST', $scope._Conpath + 'EmpAddress/UpdateEmpAddress', true);
        addr.setRequestHeader("Content-type", "application/json");
        addr.onreadystatechange = function () {
            if (addr.readyState === 4 && addr.status === 200) {
                $scope.GetPresentAddress();
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Address Details Successfully Updated.. </strong></div>";
                $('#MessageBox').show();
                document.getElementById("txtadd1").value = "";
                document.getElementById("txtadd2").value = "";
                document.getElementById("txtvlg").value = "";
                document.getElementById("txttlk").value = "";
                document.getElementById("txtcity").value = "";
                document.getElementById("txtdist").value = "";
                document.getElementById("txtState").value = "";
                document.getElementById("txtpincode").value = "";
                document.getElementById("txtphoneno").value = "";
                document.getElementById("txtresno").value = "";
            }
            else if (addr.status === 400) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Address Details are not Saved.. </strong></div>";
                $('#MessageBox').show();
            }
        };
        addr.send(jsonObj);
    };

    //Get Present Addres Information from ESS Database of Login Memeber
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

                $('#txtadd1').val(arr[0].preAdd1);     //Add1
                $('#txtadd2').val(arr[0].preAdd2);     //Add2
                $('#txtvlg').val(arr[0].preAdd3);      //Village
                $('#txttlk').val(arr[0].preAdd4);      //Taluka
                $('#txtcity').val(arr[0].preCity);     //City
                $('#pincode').val(arr[0].prePin);      //PinCode
                $('#txtphoneno').val(arr[0].prePhone);    //Mobile No
                $('#txtresno').val(arr[0].preResPhone);   //Alternate Mobile No

                debugger;
                var dist = arr[0].preDistrict;
                if ((typeof (dist) === "undefined")) { $('#txtdist').val('KUTCH'); } else { $('#txtdist').val(arr[0].preDistrict); }

                var state = arr[0].preState;
                if ((typeof (state) === "undefined")) { $('#txtstate').val('GUJARAT'); } else { $('#txtstate').val(arr[0].preState); }

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


////Change Open Month master
//$scope.ChangeOpenMonth = function (openMonth) {

//    var opmnth = openMonth.yearMonth;
//    var d = new Date(opmnth);

//    var yearmonth;
//    if (d.getMonth() < '10') { yearmonth = (d.getFullYear()) + '0' + (d.getMonth() + 1); }

//    var opm = new XMLHttpRequest();
//    opm.open('POST', $scope._Conpath + 'OpenMonth/ChangeOpenMonth?yearMonth=' + yearmonth, true);
//    opm.setRequestHeader("Content-type", "application/json");
//    opm.onreadystatechange = function () {
//        if (opm.readyState === 4 && opm.status === 200) {
//            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Open Month Changed Successfully.. </strong></div>";
//            $('#MessageBox').show();
//            document.getElementById("openMonth").value = "";
//        }
//        else if (opm.status === 400) {
//            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Open Month not Changed.. </strong></div>";
//            $('#MessageBox').show();
//            document.getElementById("openMonth").value = "";
//        }
//    };
//    opm.send();
//};