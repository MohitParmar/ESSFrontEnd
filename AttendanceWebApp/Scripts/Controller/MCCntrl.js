var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("MCController", function ($scope, $http) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), $scope._Conpath = ""; var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol; $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") });
    $scope.currentPage = 1, $scope.itemsPerPage = 50; $scope.exportObj;
    $scope.ResetView = function () { window.location.reload(true) };
    var d = new Date();
    var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
    var c = 0;
    //Remove all rows from table
    /*$("#table_of_items tr").remove();*/
    $scope.empDetails = function () {
        var e_Code = $("#eCode").val();
        var usr = new XMLHttpRequest;
        usr.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + e_Code, !0);
        usr.setRequestHeader("Accept", "application/json");
        usr.onreadystatechange = function () {
            if (usr.readyState === 4) {
                var json = JSON.parse(usr.responseText);
                $scope.empObj = json;
                $scope.$digest();
                $("#txtdepName").val($scope.empObj[0].empName);
                var dhf = new Date($scope.empObj[0].birthDate);
                var s = dhf.getDate() + "-" + (dhf.getMonth() + 1) + "-" + dhf.getFullYear();
                $("#dtbirthDate").val(s);
                $('select[id^="cmbReleation"] option[value="SELF"]').attr("selected", "selected");
                $("#txtpan").val($scope.empObj[0].pan);
            };
        }; usr.send();
    };
    $scope.DepArr;
    $scope.GetDependentDetails = function (mode) {
        var empCode = $("#eCode").val();
        if (mode === "false") {
            if (empCode === "" || empCode === null || (typeof (empCode) === "undefined")) {
                empCode = $("#myEmpUnqId").val();
            }
        }
        var ds = (new Date().getFullYear()) + (new Date().getFullYear() + 1).toString().substr(-2);
        $("#loading").removeClass("deactivediv");
        $("#loading").addClass("activediv");
        var emp = new XMLHttpRequest;
        if (mode === "true") {
            emp.open("GET", $scope._Conpath + "MedDependent/GetDependents?mode=" + mode + "&policyYear=" + ds + "&empunqid=null", true)
        } else {
            emp.open("GET", $scope._Conpath + "MedDependent/GetDependents?mode=" + mode + "&policyYear=" + ds + "&empunqid=" + empCode, true);
        }
        emp.setRequestHeader("Accept", "application/json");
        emp.onreadystatechange = function () {
            if (emp.readyState === 4 && emp.status === 200) {
                $("#loading").removeClass("activediv");
                $("#loading").addClass("deactivediv");
                var json1 = JSON.parse(emp.responseText);
                $scope.depData = json1;
                $scope.DepArr = json1;
                if (mode === "true") {
                    var f = new Array();
                    f = $scope.DepArr;
                    for (var l = 0; l < f.length; l++) {
                        var uh = f[l].uhIds;
                        if (uh !== null && uh !== "undefined") {
                            $scope.DepArr[l]["uhid"] = uh.uhid;
                        } else {
                            $scope.DepArr[l]["uhid"] = "";
                        };
                    };
                    var depArr = new Array();
                    depArr = $scope.DepArr;
                    var cnt = 0;
                    myArray = [];
                    for (var i = 0; i < depArr.length; i++) {
                        myArray.push([]);
                        if (depArr[i].addDate !== null) {
                            myArray[cnt].ApplicationDate = depArr[i].addDate.substring(0, depArr[i].addDate.indexOf("T"));
                        } else {
                            myArray[cnt].ApplicationDate = "";
                        };
                        if (depArr[i].releaseDt !== null) {
                            myArray[cnt].ReleaseDate = depArr[i].releaseDt.substring(0, depArr[i].releaseDt.indexOf("T"));
                        } else {
                            myArray[cnt].ReleaseDate = "";
                        };
                        myArray[cnt].EmpCode = depArr[i].empUnqId;
                        myArray[cnt].DepSr = depArr[i].depSr;
                        myArray[cnt].DepName = depArr[i].depName;
                        myArray[cnt].Relation = depArr[i].relation;
                        if (depArr[i].birthDate !== null) {
                            myArray[cnt].BirthDate = depArr[i].birthDate.substring(0, depArr[i].birthDate.indexOf("T"));
                        } else {
                            myArray[cnt].BirthDate = "";
                        };
                        myArray[cnt].Gender = depArr[i].gender;
                        if (depArr[i].pan !== null) {
                            myArray[cnt].PAN = depArr[i].pan;
                        } else {
                            myArray[cnt].PAN = "";
                        };
                        if (depArr[i].aadhar !== null) {
                            myArray[cnt].Aadhar = depArr[i].aadhar;
                        } else {
                            myArray[cnt].Aadhar = "";
                        };
                        if (depArr[i].birthCertificateNo !== null) {
                            myArray[cnt].BirthCertificateNo = depArr[i].birthCertificateNo;
                        } else {
                            myArray[cnt].BirthCertificateNo = "";
                        };
                        if (depArr[i].effectiveDate !== null) {
                            myArray[cnt].EffectiveDate = depArr[i].effectiveDate.substring(0, depArr[i].effectiveDate.indexOf("T"));
                        } else {
                            myArray[cnt].EffectiveDate = "";
                        };
                        myArray[cnt].Uhid = depArr[i].uhid;
                        cnt++;
                    };
                    $scope.DepArr = myArray;
                    $scope.exportObj = $scope.DepArr;
                };
                $scope.$digest();
                if (mode === "false") {
                    const arr = $scope.depData;
                    var table = document.getElementById('commonTable');
                    var rowCount = table.rows.length;
                    for (var i = rowCount - 1; i > 0; i--) {
                        table.deleteRow(i);
                    }
                    for (let i = 0; i < arr.length; i++) {
                        var bDate = arr[i].birthDate === null ? "" : arr[i].birthDate.substring(0, arr[i].birthDate.indexOf("T"));
                        var mDate = arr[i].marriageDate === null ? "" : arr[i].marriageDate.substring(0, arr[i].marriageDate.indexOf("T"));
                        var bNo = arr[i].birthCertificateNo === null ? "" : arr[i].birthCertificateNo;
                        var pan = arr[i].pan === null ? "" : arr[i].pan;
                        var aadhar = arr[i].aadhar === null ? "" : arr[i].aadhar; var isChanged = false;
                        if (arr[i].depSr === 0) {
                            row = $("<tr>" +
                                "<td style='text-align:center;'><input type='hidden' name='srno' value='" + arr[i].depSr + "'>" + arr[i].depSr + "</td>" +
                                "<td style='text-align:left;'><input type='hidden' name='name' value='" + arr[i].depName + "'>" + arr[i].depName + "</td>" +
                                "<td style='text-align:left;'><input type='hidden' name='relation' value='" + arr[i].relation + "'>" + arr[i].relation + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='bDate' value='" + bDate + "'>" + bDate + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='gender' value='" + arr[i].gender + "'>" + arr[i].gender + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='mDate' value='" + mDate + "'>" + mDate + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='pan' value='" + pan + "'>" + pan + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='aadhar' value='" + aadhar + "'>" + aadhar + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='bcno' value='" + bNo + "'>" + bNo + "</td>" +
                                "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='isChanged(this)' class='btn btn-danger' disabled></td>" +
                                "<td style='text-align:center;' hidden><input type='hidden' name='isChanged' value='" + isChanged + "'>" + isChanged + "</td>" +
                                "<td style='text-align:center;' hidden><input type='hidden' name='Active' value='" + arr[i].active + "'>" + arr[i].active + "</td>" +
                                "</tr>");
                        } else if (arr[i].active === true) {
                            row = $("<tr>" +
                                "<td style='text-align:center;'><input type='hidden' name='srno' value='" + arr[i].depSr + "'>" + arr[i].depSr + "</td>" +
                                "<td style='text-align:left;'><input type='hidden' name='name' value='" + arr[i].depName + "'>" + arr[i].depName + "</td>" +
                                "<td style='text-align:left;'><input type='hidden' name='relation' value='" + arr[i].relation + "'>" + arr[i].relation + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='bDate' value='" + bDate + "'>" + bDate + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='gender' value='" + arr[i].gender + "'>" + arr[i].gender + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='mDate' value='" + mDate + "'>" + mDate + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='pan' value='" + pan + "'>" + pan + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='aadhar' value='" + aadhar + "'>" + aadhar + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='bcno' value='" + bNo + "'>" + bNo + "</td>" +
                                "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='isChanged(this)' class='btn btn-danger'></td>" +
                                "<td style='text-align:center;' hidden><input type='hidden' name='isChanged' value='" + isChanged + "'>" + isChanged + "</td>" +
                                "<td style='text-align:center;' hidden><input type='hidden' name='Active' value='" + arr[i].active + "'>" + arr[i].active + "</td>" +
                                "</tr>");
                        };
                        $("#commonTable").append(row);
                        c = i;
                    }
                }
            } else if (200 !== emp.status) {
                $("#loading").removeClass("activediv");
                $("#loading").addClass("deactivediv");
                $scope.empDetails();
            };
        }; emp.send();
    };
    $scope.GetReleasedDependentList = function () {
        var fromDt = $("#FromDt").val();
        var toDt = $("#ToDt").val();
        $("#loading").removeClass("deactivediv");
        $("#loading").addClass("activediv");
        var rdd = new XMLHttpRequest;
        rdd.open("GET", $scope._Conpath + "MedDependent?fromDt=" + fromDt + "&toDt=" + toDt, true);
        rdd.setRequestHeader("Accept", "application/json");
        rdd.onreadystatechange = function () {
            if (rdd.readyState === 4 && rdd.status === 200) {
                var json1 = JSON.parse(rdd.responseText);
                $scope.relDepData = json1;
                var f = new Array();
                f = $scope.relDepData;
                for (var l = 0; l < f.length; l++) {
                    var uh = f[l].uhIds;
                    if (uh !== null && uh !== "undefined") {
                        $scope.relDepData[l]["uhid"] = uh.uhid;
                    } else {
                        $scope.relDepData[l]["uhid"] = "";
                    };
                };
                for (var i = 0; i < $scope.relDepData.length; i++) {
                    var Active = $scope.relDepData[i].active;
                    if (Active) {
                        $scope.relDepData[i]["Add_Del"] = "Addition";
                    } else {
                        $scope.relDepData[i]["Add_Del"] = "Deletion";
                    }
                };
                var arr = new Array(); arr = $scope.relDepData; var cnt = 0, myArray = [];
                for (var i = 0; i < arr.length; i++) {
                    myArray.push([]);
                    myArray[cnt].empUnqId = arr[i].empUnqId;
                    myArray[cnt].depSr = arr[i].depSr;
                    myArray[cnt].depName = arr[i].depName;
                    myArray[cnt].relation = arr[i].relation;
                    var bdate = arr[i].birthDate; if (bdate === null) { myArray[cnt].birthDate = ""; } else { myArray[cnt].birthDate = arr[i].birthDate.substring(0, arr[i].birthDate.indexOf("T")); };
                    myArray[cnt].gender = arr[i].gender;
                    var mdate = arr[i].marriageDate; if (mdate === null) { myArray[cnt].marriageDate = ""; } else { myArray[cnt].marriageDate = arr[i].marriageDate.substring(0, arr[i].marriageDate.indexOf("T")); };
                    var panno = arr[i].pan; if (panno === null || panno === 0 || panno === "0") { myArray[cnt].pan = ""; } else { myArray[cnt].pan = arr[i].pan; };
                    var adhno = arr[i].aadhar; if (adhno === null || adhno === 0 || adhno === "0") { myArray[cnt].aadhar = ""; } else { myArray[cnt].pan = arr[i].aadhar; };
                    var bcerno = arr[i].birthCertificateNo; if (bcerno === null || bcerno === 0 || bcerno === "0") { myArray[cnt].birthCertificateNo = ""; } else { myArray[cnt].birthCertificateNo = arr[i].birthCertificateNo; };
                    var edate = arr[i].effectiveDate; if (edate === null) { myArray[cnt].effectiveDate = ""; } else { myArray[cnt].effectiveDate = arr[i].effectiveDate.substring(0, arr[i].effectiveDate.indexOf("T")); };
                    var rStatus = arr[i].releaseStatusCode; if (rStatus === null) { myArray[cnt].releaseStatusCode = ""; } else { myArray[cnt].releaseStatusCode = arr[i].releaseStatusCode; };
                    var reldate = arr[i].releaseDt; if (reldate === null) { myArray[cnt].releaseDt = ""; } else { myArray[cnt].releaseDt = arr[i].releaseDt.substring(0, arr[i].releaseDt.indexOf("T")); };
                    var dStatus = arr[i].delReleaseStatusCode; if (dStatus === null) { myArray[cnt].delReleaseStatusCode = ""; } else { myArray[cnt].delReleaseStatusCode = arr[i].delReleaseStatusCode; };
                    var deldate = arr[i].delReleaseDt; if (deldate === null) { myArray[cnt].delReleaseDt = ""; } else { myArray[cnt].delReleaseDt = arr[i].delReleaseDt.substring(0, arr[i].delReleaseDt.indexOf("T")); };
                    myArray[cnt].remarks = arr[i].remarks;
                    myArray[cnt].active = arr[i].active;
                    myArray[cnt].addUser = arr[i].addUser;
                    myArray[cnt].addDate = arr[i].addDate.substring(0, arr[i].addDate.indexOf("T"));
                    myArray[cnt].isChanged = arr[i].isChanged;
                    myArray[cnt].Add_Del = arr[i].Add_Del;
                    cnt++;
                }
                $scope.exportObj = myArray;
                $scope.$digest();
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
            } else if (200 !== rdd.status) {
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Record Not Found.. </strong></div>";
                $("#MessageBox").show();
            };
        }; rdd.send();
    };
    //Intimation Addmission Date Validation Start
    $scope.ToValidate = function () {
        var now = new Date();
        var dtnow = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        var firstDay = now;
        if (firstDay.getMonth() + 1 < '10') {
            if (firstDay.getDate() < '10') {
                firstDay = (firstDay.getFullYear()) + '-' + '0' + (firstDay.getMonth() + 1) + '-' + '0' + firstDay.getDate();
            } else {
                firstDay = (firstDay.getFullYear()) + '-' + '0' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate();
            }
        } else {
            if (firstDay.getDate() < '10') {
                firstDay = (firstDay.getFullYear()) + '-' + (firstDay.getMonth() + 1) + '-' + '0' + firstDay.getDate();
            } else {
                firstDay = (firstDay.getFullYear()) + '-' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate();
            }
        };
        dtnow = firstDay;
        var chkFrom = $("#addmissionDate").val();
        var chkTo = dtnow;
        if (chkFrom === "") {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Select Admission Date...</strong></div>";
            $('#MessageBox').show();
            document.getElementById("addmissionDate").value = "";
            return false;
        };
        var date1 = new Date(chkFrom);
        var date2 = new Date(chkTo);
        var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1;
        if (diff > 3) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please contact to HR, If intimation is late by more than two days.</strong></div>";
            $('#MessageBox').show();
            document.getElementById("addmissionDate").value = "";
            return false;
        }
        if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Future Date not allowed.</strong></div>";
            $('#MessageBox').show();
            document.getElementById("addmissionDate").value = "";
            return false;
        }
    };
    //Intimation Addmission Date Validation End
    $scope.setGender = function (data) {
        if (data === "SON") {
            $('select[name^="cmbGender"] option[value="M"]').attr("selected", "selected");
        } else {
            $('select[name^="cmbGender"] option[value="F"]').attr("selected", "selected");
        };
    };
    $scope.SetRelation = function (value) {
        $("#txtRelation").val(value);
    };
    $scope.CalAge = function (dateString, rel) {
        if (typeof (rel) === "undefined") {
            document.getElementById("ModelMessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Select First Releation.</strong></div>"; $("#ModelMessageBox").show();
            return false;
        };
        var today = new Date();
        var birthDate = new Date(dateString);
        var birthnow = birthDate.getFullYear() + "-" + (birthDate.getMonth() + 1) + "-" + birthDate.getDate();
        var now = new Date();
        var dtnow = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        var firstDay = now;
        if (firstDay.getMonth() + 1 < '10') {
            if (firstDay.getDate() < '10') {
                firstDay = (firstDay.getFullYear()) + '-' + '0' + (firstDay.getMonth() + 1) + '-' + '0' + firstDay.getDate();
            } else {
                firstDay = (firstDay.getFullYear()) + '-' + '0' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate();
            }
        } else {
            if (firstDay.getDate() < '10') {
                firstDay = (firstDay.getFullYear()) + '-' + (firstDay.getMonth() + 1) + '-' + '0' + firstDay.getDate();
            } else {
                firstDay = (firstDay.getFullYear()) + '-' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate();
            }
        };
        dtnow = firstDay;
        if (birthnow < dtnow) {
            document.getElementById("ModelMessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Future Date not allowed.</strong></div>";
            $('#MessageBox').show();
            return false;
        }
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (rel === "SPOUSE") {
            if (age < 21 && age <= 0) {
                document.getElementById("ModelMessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Below 21 year age not allowed.</strong></div>"; $("#ModelMessageBox").show();
                return false;
            }
        }
        if (rel === "DAUGHTER" || rel === "SON") {
            if (age > 25 && age <= 0) {
                document.getElementById("ModelMessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Greater of 25 Year age not allowed.</strong></div>"; $("#ModelMessageBox").show();
                return false;
            }
        }
    };
    $scope.AddtoListDependentDetails = function (depData) {
        debugger;
        var table = document.getElementById("commonTable");
        var rowCount = table.rows.length;
        if ((rowCount - 1) === 4) {
            document.getElementById("ModelMessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Only Four Persons are Covered in Policy.</strong></div>";
            $("#ModelMessageBox").show();
            return false;
        };
        if ((typeof (depData) === "undefined") ||
            (typeof (depData.depName) === "undefined") ||
            (typeof (depData.relation) === "undefined") ||
            (typeof (depData.birthDate) === "undefined")) {
            document.getElementById("ModelMessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Fill All Required Details Step by Step...</strong></div>";
            $("#ModelMessageBox").show();
            return false;
        };
        var relation = "", marriageDate = "", aadhar = "", pan = "", csno = "";
        relation = depData.relation;
        if (relation === "SPOUSE") {
            if (typeof (depData.marriageDate) === "undefined") {
                document.getElementById("ModelMessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Marriage Date is Mandatory</strong></div>";
                $("#ModelMessageBox").show();
                return false;
            } else {
                marriageDate = depData.marriageDate;
            };
            if (typeof (depData.aadhar) === "undefined") {
                document.getElementById("ModelMessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Aadhar Number is Mandatory.</strong></div>"; $("#ModelMessageBox").show();
                return false;
            } else {
                aadhar = depData.aadhar;
            };
        } else {
            marriageDate = (typeof (depData.marriageDate) === "undefined") ? '' : depData.marriageDate;
        };
        if ((typeof (depData.pan) === "undefined") || depData.pan === null) {
            pan = "";
        } else {
            pan = depData.pan;
        };
        if ((typeof (depData.aadhar) === "undefined") || depData.aadhar === null) {
            aadhar = "";
        } else {
            aadhar = depData.aadhar;
        };
        if ((typeof (depData.birthCertificateNo) === "undefined") || depData.birthCertificateNo === null) {
            csno = "";
        } else {
            csno = depData.birthCertificateNo;
        };
        var dpname = $("#txtdepName").val();
        var isChanged = true;
        var active = true;
        c++;
        if (relation === "SELF") {
            row =
                $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='srno' value='" + 0 + "'>" + 0 + "</td>" +
                    "<td style='text-align:left;'><input type='hidden' name='name' value='" + dpname + "'>" + dpname + "</td>" +
                    "<td style='text-align:left;'><input type='hidden' name='relation' value='" + relation + "'>" + relation + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='bDate' value='" + depData.birthDate + "'>" + depData.birthDate + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='gender' value='" + $("#cmbGender").val() + "'>" + $("#cmbGender").val() + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='mDate' value='" + marriageDate + "'>" + marriageDate + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='pan' value='" + pan + "'>" + pan + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='aadhar' value='" + aadhar + "'>" + aadhar + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='bcno' value='" + csno + "'>" + csno + "</td>" +
                    "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='isChanged(this)' class='btn btn-danger' disabled></td>" +
                    "<td style='text-align:center;' hidden><input type='hidden' name='isChanged' value='" + isChanged + "'>" + isChanged + "</td>" +
                    "<td style='text-align:center;' hidden><input type='hidden' name='Active' value='" + active + "'>" + active + "</td>" + "</tr>");
            $("#commonTable").append(row);
        } else {
            row =
                $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='srno' value='" + c + "'>" + c + "</td>" +
                    "<td style='text-align:left;'><input type='hidden' name='name' value='" + dpname + "'>" + dpname + "</td>" +
                    "<td style='text-align:left;'><input type='hidden' name='relation' value='" + relation + "'>" + relation + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='bDate' value='" + depData.birthDate + "'>" + depData.birthDate + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='gender' value='" + $("#cmbGender").val() + "'>" + $("#cmbGender").val() + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='mDate' value='" + marriageDate + "'>" + marriageDate + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='pan' value='" + pan + "'>" + pan + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='aadhar' value='" + aadhar + "'>" + aadhar + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='bcno' value='" + csno + "'>" + csno + "</td>" +
                    "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='isChanged(this)' class='btn btn-danger' disabled></td>" +
                    "<td style='text-align:center;' hidden><input type='hidden' name='isChanged' value='" + isChanged + "'>" + isChanged + "</td>" +
                    "<td style='text-align:center;' hidden><input type='hidden' name='Active' value='" + active + "'>" + active + "</td>" + "</tr>");
            $("#commonTable").append(row);
        }
        //document.getElementById("txtremarks").value = "";
        $("#txtdepName").val("");
        $("#dtbirthDate").val("");
        $("#txtbirthCertificateNo").val("");
        $("#dtmarriageDate").val("");
        $("#txtpan").val("");
        $("#txtaadhar").val("");
        $("#cmbReleation option:first").attr("selected", true);
        $("#cmbGender option:first").attr("selected", true);
    };
    $scope.ManageDependent = function () {
        var e_Code = $("#eCode").val();
        if (e_Code === "" || (typeof (e_Code) === "undefined")) {
            e_Code = $("#myEmpUnqId").val();
        };
        var TableData = storeTblValues();
        function storeTblValues() {
            var TableData = new Array();
            $("#commonTable tr").each(function (row, tr) {
                TableData[row] = {
                    "empUnqId": e_Code,
                    "depSr": $(tr).find('td:eq(0)').text(),
                    "depName": $(tr).find('td:eq(1)').text(),
                    "relation": $(tr).find('td:eq(2)').text(),
                    "birthDate": $(tr).find('td:eq(3)').text(),
                    "gender": $(tr).find('td:eq(4)').text(),
                    "marriageDate": $(tr).find('td:eq(5)').text(),
                    "pan": $(tr).find('td:eq(6)').text(),
                    "aadhar": $(tr).find('td:eq(7)').text(),
                    "birthCertificateNo": $(tr).find('td:eq(8)').text(),
                    "effectiveDate": dt,
                    "releaseGroupCode": null,
                    "releaseStrategy": null,
                    "releaseStatusCode": null,
                    "releaseDt": dt,
                    "releaseUser": null,
                    "delReleaseGroupCode": null,
                    "delReleaseStrategy": null,
                    "delReleaseStatusCode": null,
                    "delReleaseDt": null,
                    "delReleaseUser": null,
                    "active": $(tr).find('td:eq(11)').text(),
                    "addUser": $("#myEmpUnqId").val(),
                    "addDate": dt,
                    "isChanged": $(tr).find('td:eq(10)').text(),
                    "uhIds": null
                };
            });
            TableData.shift();
            return TableData;
        };

        var depsrno = TableData[0].depSr;
        if (depsrno === "") {
            TableData.shift();
        };

        //for (var m = 0; m < TableData.length; m++) {
        //    TableData[m].depSr = m;
        //};

        for (var l = 0; l < TableData.length; l++) {
            var mDate = TableData[l].marriageDate;
            if (mDate === "") {
                TableData[l].marriageDate = null;
            }
        };

        TableData = JSON.stringify(TableData);

        var ddl = new XMLHttpRequest();
        ddl.open("POST", $scope._Conpath + "MedDependent/CreateDependents", true);
        ddl.setRequestHeader("Content-type", "application/json");
        ddl.onreadystatechange = function () {
            if (ddl.readyState === 4 && ddl.status === 200) {
                jQuery('#btnClose').click();
                $scope.GetDependentDetails('false');
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Submit Successfully.. </strong></div>";
                $("#MessageBox").show();
                $("#txtdepName").val("");
                $("#dtbirthDate").val("");
                $("#txtbirthCertificateNo").val("");
                $("#dtmarriageDate").val("");
                $("#txtpan").val("");
                $("#txtaadhar").val("");
                $("#cmbReleation option:first").attr("selected", true);
                $("#cmbGender option:first").attr("selected", true);
                $("#commonTable").find("tr:not(:first)").remove();
                TableData = "";
            } else {
                jQuery('#btnClose').click();
                /*$("#commonTable").find("tr:not(:first)").remove();*/
                //$scope.GetDependentDetails('false');
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Not Submited.. </strong></div>";
                $("#MessageBox").show();
            };
        };
        ddl.send(TableData);
    };
    $scope.RelArr;
    //Get All Pending list for addition or deletion release required.
    $scope.GetRelease = function () {
        $("#loading").removeClass("deactivediv");
        $("#loading").addClass("activediv");
        var rel = new XMLHttpRequest;
        rel.open("GET", $scope._Conpath + "MedDependent/GetRelease?releaser=" + $("#myEmpUnqId").val(), true);
        rel.setRequestHeader("Accept", "application/json");
        rel.onreadystatechange = function () {
            if (4 === rel.readyState && rel.status === 200) {
                var json2 = JSON.parse(rel.responseText);
                $scope.RelArr = json2;
                $scope.relData = json2;
                var arr = new Array(); arr = $scope.relData; var cnt = 0, myArray = [];
                for (var i = 0; i < arr.length; i++) {
                    myArray.push([]);
                    myArray[cnt].empUnqId = arr[i].empUnqId;
                    myArray[cnt].depSr = arr[i].depSr;
                    myArray[cnt].depName = arr[i].depName;
                    myArray[cnt].relation = arr[i].relation;
                    var bdate = arr[i].birthDate; if (bdate === null) { myArray[cnt].birthDate = ""; } else { myArray[cnt].birthDate = arr[i].birthDate.substring(0, arr[i].birthDate.indexOf("T")); };
                    myArray[cnt].gender = arr[i].gender;
                    var mdate = arr[i].marriageDate; if (mdate === null) { myArray[cnt].marriageDate = ""; } else { myArray[cnt].marriageDate = arr[i].marriageDate.substring(0, arr[i].marriageDate.indexOf("T")); };
                    var panno = arr[i].pan; if (panno === null || panno === 0 || panno === "0") { myArray[cnt].pan = ""; } else { myArray[cnt].pan = arr[i].pan; };
                    var adhno = arr[i].aadhar; if (adhno === null || adhno === 0 || adhno === "0") { myArray[cnt].aadhar = ""; } else { myArray[cnt].pan = arr[i].aadhar; };
                    var bcerno = arr[i].birthCertificateNo; if (bcerno === null || bcerno === 0 || bcerno === "0") { myArray[cnt].birthCertificateNo = ""; } else { myArray[cnt].birthCertificateNo = arr[i].birthCertificateNo; };
                    var edate = arr[i].effectiveDate; if (edate === null) { myArray[cnt].effectiveDate = ""; } else { myArray[cnt].effectiveDate = arr[i].effectiveDate.substring(0, arr[i].effectiveDate.indexOf("T")); };
                    var rStatus = arr[i].releaseStatusCode; if (rStatus === null) { myArray[cnt].releaseStatusCode = ""; } else { myArray[cnt].releaseStatusCode = arr[i].releaseStatusCode; };
                    var reldate = arr[i].releaseDt; if (reldate === null) { myArray[cnt].releaseDt = ""; } else { myArray[cnt].releaseDt = arr[i].releaseDt.substring(0, arr[i].releaseDt.indexOf("T")); };
                    var dStatus = arr[i].delReleaseStatusCode; if (dStatus === null) { myArray[cnt].delReleaseStatusCode = ""; } else { myArray[cnt].delReleaseStatusCode = arr[i].delReleaseStatusCode; };
                    var deldate = arr[i].delReleaseDt; if (deldate === null) { myArray[cnt].delReleaseDt = ""; } else { myArray[cnt].delReleaseDt = arr[i].delReleaseDt.substring(0, arr[i].delReleaseDt.indexOf("T")); };
                    var rmks = arr[i].remarks; if (rmks === null) { myArray[cnt].remarks = ""; } else { myArray[cnt].remarks = arr[i].remarks; };
                    myArray[cnt].active = arr[i].active;
                    myArray[cnt].addUser = arr[i].addUser;
                    myArray[cnt].addDate = arr[i].addDate.substring(0, arr[i].addDate.indexOf("T"));
                    myArray[cnt].isChanged = arr[i].isChanged;
                    cnt++;
                };
                $scope.exportObj = myArray;
                $scope.$digest();
                $("#loading").removeClass("activediv");
                $("#loading").addClass("deactivediv");
            } else {
                $("#loading").removeClass("activediv");
                $("#loading").addClass("deactivediv");
                var errer = rel.responseText.replace(/\"/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\[/g, "").replace(/\]/g, "");
                if (rel.status === 400) {
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>" +
                        errer + "</strong></div>"; $("#MessageBox").show();
                }
            };
        }; rel.send();
    };
    $scope.ReleaseDependents = function (releaseStatusCode, empid, srno, data) {
        var rmks = '';
        if (releaseStatusCode === "R") {
            if ((typeof (data) === "undefined") || (typeof (data.Remarks) === "undefined")) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Remarks First For Rejection</strong></div>";
                $('#MessageBox').show();
                return false;
            } else {
                rmks = data.Remarks;
            };
        } else {
            if ((typeof (data) === "undefined")) {
                rmks = "";
            } else {
                rmks = data.Remarks;
            };
        };
        var newArr = new Array();
        newArr = $scope.RelArr;
        var cnt = 0;
        var myArray = [];
        if (newArr.length > 0) {
            for (var i = 0; i < newArr.length; i++) {
                if (empid === parseInt(newArr[i]["empUnqId"])) {
                    myArray.push([]);
                    myArray[cnt] = newArr[i];
                    if (newArr[i]["active"] === true && newArr[i]["isChanged"] === true) {
                        myArray[cnt]["delReleaseStatusCode"] = releaseStatusCode;
                        myArray[cnt]["delReleaseUser"] = $("#myEmpUnqId").val();
                        myArray[cnt]["remarks"] = rmks; //remove exist dependent
                    } else if (newArr[i]["active"] === false && newArr[i]["isChanged"] === true) {
                        myArray[cnt]["releaseStatusCode"] = releaseStatusCode;
                        myArray[cnt]["releaseUser"] = $("#myEmpUnqId").val();
                        myArray[cnt]["remarks"] = rmks; //New Dependent
                    }; cnt++;
                }
            }
        };
        myArray = JSON.stringify(myArray);
        var rdd = new XMLHttpRequest();
        rdd.open("PUT", $scope._Conpath + "MedDependent/ReleaseDependents", true);
        rdd.setRequestHeader("Content-type", "application/json");
        rdd.onreadystatechange = function () {
            if (rdd.readyState === 4 && rdd.status === 200) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Release Successfully.. </strong></div>";
                $("#MessageBox").show();
            } else {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Not Released.. </strong></div>";
                $("#MessageBox").show();
            }; $scope.GetRelease();
        }; rdd.send(myArray);
    };
    $scope.PopupModel = function () { $("#ConformModel").modal("show"); };
    $scope.GetUserInfo = function (e_Code) {
        usr = new XMLHttpRequest;
        if ((typeof (e_Code) !== "undefined")) {
            if (e_Code.length === 6) {
                usr.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + e_Code, !0);
            }
            else {
                return false;
            }
        }
        else {
            usr.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + $("#myEmpUnqId").val(), !0);
        }
        usr.setRequestHeader("Accept", "application/json");
        usr.onreadystatechange = function () {
            if (usr.readyState === 4) {
                var json = JSON.parse(usr.responseText);
                $scope.Udata = json;
                $scope.$digest();
                if ((typeof (e_Code) !== "undefined") && e_Code !== "") {
                    if (e_Code.length === 6) {
                        $("#empName").val($scope.Udata[0].empName);
                        $("#insuredMobNo").val($scope.Udata[0].prePhone);
                    }
                } else {
                    $("#eCode").val($scope.Udata[0].empUnqId);
                    $("#empName").val($scope.Udata[0].empName);
                    $("#insuredMobNo").val($scope.Udata[0].prePhone);
                    $("#intimatorEmpUnqId").val($scope.Udata[0].empUnqId);
                    $("#intimatorName").val($scope.Udata[0].empName);
                    $("#intimatorMobNo").val($scope.Udata[0].prePhone);
                };
                $scope.GetPatientDetails();
            };
        };
        usr.send();
    };
    $scope.SelfRejectDependents = function (sts) {
        var newArr = new Array(); newArr = $scope.DepArr; var cnt = 0; var myArray = [];
        for (var i = 0; i < newArr.length; i++) {
            myArray.push([]);
            myArray[cnt] = newArr[i];
            if (newArr[i]["active"] === true && newArr[i]["isChanged"] === true) {
                myArray[cnt]["delReleaseStatusCode"] = sts; myArray[cnt]["delReleaseUser"] = $("#myEmpUnqId").val(); myArray[cnt]["remarks"] = "Self Reject";//remove exist dependent
            } else if (newArr[i]["active"] === false && newArr[i]["isChanged"] === true) {
                myArray[cnt]["releaseStatusCode"] = sts; myArray[cnt]["releaseUser"] = $("#myEmpUnqId").val(); myArray[cnt]["remarks"] = "Self Reject";//remove New Dependent
            }; cnt++;
        }
        myArray = JSON.stringify(myArray);
        var rdd = new XMLHttpRequest();
        rdd.open("PUT", $scope._Conpath + "MedDependent/ReleaseDependents", true);
        rdd.setRequestHeader("Content-type", "application/json");
        rdd.onreadystatechange = function () {
            if (rdd.readyState === 4 && rdd.status === 200) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Rejected Successfully.. </strong></div>"; $("#MessageBox").show();
            } else {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Not Rejected..</strong></div>"; $("#MessageBox").show();
            }; $scope.GetDependentDetails('false');
        }; rdd.send(myArray);
    };
    $scope.GetPatientDetails = function () {
        var empid = $("#eCode").val();
        var ds = (new Date().getFullYear()) + (new Date().getFullYear() + 1).toString().substr(-2);
        var pei = new XMLHttpRequest;
        pei.open("GET", $scope._Conpath + "MedDependent/GetDependents?mode=false&policyYear=" + ds + "&empunqid=" + empid, true);
        pei.setRequestHeader("Accept", "application/json");
        pei.onreadystatechange = function () {
            if (4 === pei.readyState) {
                var json = JSON.parse(pei.responseText);
                var s = new Array();
                s = json;
                var sr = new Array();
                var cnt = 0;
                for (var i = 0; i < s.length; i++) {
                    if (s[i].active === true) {
                        sr[cnt] = s[i]; cnt++;
                    }
                }
                $scope.pData = sr;
                $scope.$digest();
            }
        }; pei.send();
    };
    ///Intimations Start
    $scope.CreateIntimation = function (entity) {
        var err = "", empUnqId = "", insuredMobNo = "", patientName = "", relation = "", intimatorEmpUnqId = "", intimatorName = "", intimatorMobNo = "";
        empUnqId = $("#eCode").val();
        insuredMobNo = $("#insuredMobNo").val();
        relation = $("#txtRelation").val();
        intimatorEmpUnqId = $("#intimatorEmpUnqId").val();
        intimatorName = $("#intimatorName").val();
        intimatorMobNo = $("#intimatorMobNo").val();
        patientName = $("#patientRelation option:selected").text();
        if (typeof (entity) === "undefined") { err = "Please Fill all mandatory details with *" + "<br/>"; }
        else if (empUnqId === "undefined" || empUnqId === "") { err += "Please Enter Employee Code." + "<br/>"; }
        else if (insuredMobNo === "undefined" || insuredMobNo === "") { err += "Please Enter Insured Mobile Number." + "<br/>"; }
        else if (typeof (entity.patientRelation) === "undefined") { err += "Please Select Patient." + "<br/>"; }//patient
        else if (intimatorMobNo === "undefined" || intimatorMobNo === "") { err += "Please Enter Intimator Mobile Number." + "<br/>"; }
        else if (typeof (entity.addmissionDate) === "undefined") { err += "Please Select Admission Date." + "<br/>"; }
        else if (typeof (entity.doctorName) === "undefined") { err += "Please Enter Doctor Name." + "<br/>"; }
        else if (typeof (entity.dignosisDetails) === "undefined") { err += "Please Enter Dignosis Details." + "<br/>"; }
        else if (typeof (entity.hospitalName) === "undefined") { err += "Please Enter Hospital Name." + "<br/>"; }
        else if (typeof (entity.hospitalAddress) === "undefined") { err += "Please Enter Hospital Address." + "<br/>"; }
        else if (typeof (entity.pinCode) === "undefined") { err += "Please Enter Pincode."; }

        var now = new Date(); var dtnow = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        var firstDay = now;
        if (firstDay.getMonth() + 1 < '10') {
            if (firstDay.getDate() < '10') {
                firstDay = (firstDay.getFullYear()) + '-' + '0' + (firstDay.getMonth() + 1) + '-' + '0' + firstDay.getDate();
            } else {
                firstDay = (firstDay.getFullYear()) + '-' + '0' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate();
            }
        } else {
            if (firstDay.getDate() < '10') {
                firstDay = (firstDay.getFullYear()) + '-' + (firstDay.getMonth() + 1) + '-' + '0' + firstDay.getDate();
            } else {
                firstDay = (firstDay.getFullYear()) + '-' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate();
            }
        };
        dtnow = firstDay;
        var chkFrom = $("#addmissionDate").val();
        var chkTo = dtnow;
        var date1 = new Date(chkFrom); var date2 = new Date(chkTo);
        var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1;
        if (diff > 3) {
            err += "Please contact to HR, If intimation is late by more than two days."; document.getElementById("addmissionDate").value = "";
        }
        if (date2 < date1) {
            err += "Future Date not allowed."; document.getElementById("addmissionDate").value = "";
        }

        if (err !== "") {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                " <strong>" + err + "</strong></div>";
            $("#MessageBox").show();
            return false;
        }

        document.getElementById("btnSubmit").disabled = true;
        var jsonObj = {};
        jsonObj.id = 0;
        jsonObj.intimationDate = dt;
        jsonObj.empUnqId = empUnqId;
        jsonObj.insuredMobileNo = insuredMobNo;
        jsonObj.patientName = patientName.toUpperCase();
        jsonObj.relation = relation.toUpperCase();
        jsonObj.intimatorEmpUnqId = intimatorEmpUnqId;
        jsonObj.intimatorName = intimatorName.toUpperCase();
        jsonObj.intimatorMobileNo = intimatorMobNo;
        jsonObj.admissionDate = entity.addmissionDate;
        jsonObj.doctorName = entity.doctorName.toUpperCase();
        jsonObj.doctorRegistrationNumber = null;
        jsonObj.diagnosis = entity.dignosisDetails.toUpperCase();
        jsonObj.hospitalName = entity.hospitalName.toUpperCase();
        jsonObj.hospitalRegistrationNumber = null;
        jsonObj.hospitalAddress = entity.hospitalAddress.toUpperCase();
        jsonObj.pin = entity.pinCode;
        jsonObj.addUser = $("#myEmpUnqId").val();
        jsonObj.hrUser = null;
        jsonObj.hrApproveDate = null;
        jsonObj.hrRemarks = null;
        jsonObj.releaseStatusCode = "I";
        jsonObj = JSON.stringify(jsonObj);
        var int = new XMLHttpRequest(); int.open("POST", $scope._Conpath + "MedIntimation/CreateIntimation", true);
        int.setRequestHeader("Content-type", "application/json"); int.onreadystatechange = function () {
            if (int.readyState === 4 && int.status === 200) {
                document.getElementById("btnSubmit").disabled = false;
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Submit Successfully.. </strong></div>";
                $("#MessageBox").show();
                $("#eCode").val(""); $("#empName").val(""); $("#insuredMobNo").val(""); $("#txtRelation").val(""); $("#addmissionDate").val("");
                $("#doctorName").val(""); $("#dignosisDetails").val(""); $("#hospitalName").val(""); $("#hospitalAddress").val(""); $("#pin").val("");
            }
            else {
                document.getElementById("btnSubmit").disabled = false;
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Not Submited.. </strong></div>"; $("#MessageBox").show();
            };
        };
        int.send(jsonObj);
    }
    $scope.GetIntimations = function (data) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var FromDate, ToDate;
        if ("undefined" == typeof data || "undefined" == typeof data.FromDt || "undefined" == typeof data.ToDt) {
            var date = new Date; firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate();
            ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { FromDate = data.FromDt, ToDate = data.ToDt; };
        var date1 = new Date(FromDate), date2 = new Date(ToDate);
        if (date1 > date2) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Valid Date Range.. </strong></div>", $("#MessageBox").show(); return false; };
        inm = new XMLHttpRequest; inm.open("GET", $scope._Conpath + "MedIntimation/GetIntimations?fromDt=" + FromDate + "&toDt=" + ToDate, !0);
        inm.setRequestHeader("Accept", "application/json"); inm.onreadystatechange = function () {
            if (4 === inm.readyState && 200 === inm.status) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
                var json = JSON.parse(inm.responseText); var arr = new Array(); arr = json; var cnt = 0, myArray = [];
                for (var i = 0; i < arr.length; i++) {
                    var emp = new Array();
                    emp = arr[i].employee;
                    myArray.push([]);
                    myArray[cnt].IntimationDate = arr[i].intimationDate.substring(0, arr[i].intimationDate.indexOf("T"));
                    myArray[cnt].EmpCode = arr[i].empUnqId;
                    myArray[cnt].EmpName = emp.empName;
                    myArray[cnt].StatName = emp.statName;
                    myArray[cnt].GradeName = emp.gradeName;
                    myArray[cnt].DesgName = emp.desgName;
                    myArray[cnt].InsuredMobileNo = arr[i].insuredMobileNo;
                    myArray[cnt].PatientName = arr[i].patientName;
                    myArray[cnt].Relation = arr[i].relation;
                    myArray[cnt].IntimatorEmpCode = arr[i].intimatorEmpUnqId
                    myArray[cnt].IntimatorName = arr[i].intimatorName;
                    myArray[cnt].IntimatorMobileNo = arr[i].intimatorMobileNo;
                    myArray[cnt].AdmissionDate = arr[i].admissionDate.substring(0, arr[i].admissionDate.indexOf("T"));
                    myArray[cnt].DoctorName = arr[i].doctorName;
                    myArray[cnt].Diagnosis = arr[i].diagnosis;
                    myArray[cnt].HospitalName = arr[i].hospitalName;
                    myArray[cnt].HospitalAddress = arr[i].hospitalAddress;
                    myArray[cnt].Pin = arr[i].pin;
                    cnt++;
                }
                $scope.intiData = myArray; $scope.exportObj = myArray; $scope.$digest();
            };
        }; inm.send();
    };
    $scope.GetEmpIntimations = function () {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        ein = new XMLHttpRequest; ein.open("GET", $scope._Conpath + "MedIntimation/GetIntimationByEmp?empUnqId=" + $("#myEmpUnqId").val(), !0);
        ein.setRequestHeader("Accept", "application/json"); ein.onreadystatechange = function () {
            if (4 === ein.readyState && 200 === ein.status) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"); var json = JSON.parse(ein.responseText); $scope.einData = json;
                $scope.$digest();
            } else { $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"); };
        }; ein.send();
    }
    ///Intimation End
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    //Export Start
    $scope.exportAllData = function (name) {
        setTimeout(function () {
            $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
            var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = name + d;
            $scope.JSONToCSVConvertor($scope.exportObj, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv")
        }, 100)
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) {
            var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n"
        } if ("" === CSV) return void alert("Invalid data"); var fileName = ""; fileName += ReportTitle.replace(/ /g, "_"); var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link)
    };
    //Export End
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });
//$scope.relationvalid = function (relat) {
//    if (relat === "HUSBAND" || relat === "WIFE") {
//        var relationArr = new Array(); relationArr = $scope.DepArr;
//        if (relationArr.length > 0) {
//            for (var i = 0; i < relationArr.length; i++) {
//                var r = relationArr[i]["relation"];
//                if (i === 0) {
//                    var gender = relationArr[i]["gender"];
//                    if (gender === "M" && relat === "HUSBAND") {
//                        document.getElementById("ModelMessageBox").innerHTML =
//                            "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
//                            "<strong>This relation are not to allow.</strong></div>"; $("#ModelMessageBox").show();
//                        return false;
//                    } else if (gender === "F" && relat === "WIFE") {
//                        document.getElementById("ModelMessageBox").innerHTML =
//                            "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
//                            "<strong>This relation are not to allow.</strong></div>"; $("#ModelMessageBox").show();
//                        return false;
//                    }
//                }
//                if (relat === r) {
//                    document.getElementById("ModelMessageBox").innerHTML =
//                        "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
//                        "<strong>no more relations are allow to add for husband /wife.</strong></div>"; $("#ModelMessageBox").show();
//                    return false;
//                }
//                if (r === "HUSBAND" || r === "WIFE") {
//                    if (relat === "HUSBAND" || relat === "WIFE") {
//                        document.getElementById("ModelMessageBox").innerHTML =
//                            "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
//                            "<strong>This relation are not to allow.</strong></div>"; $("#ModelMessageBox").show();
//                        return false;
//                    }
//                }
//            }
//        }
//    }
//};