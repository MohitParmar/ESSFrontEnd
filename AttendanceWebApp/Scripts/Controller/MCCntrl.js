var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]); app.controller("MCController", function ($scope, $http) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), $scope._Conpath = ""; var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol; $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") }); $scope.currentPage = 1, $scope.itemsPerPage = 50;
    $scope.ResetView = function () { window.location.reload(true) };
    var d = new Date(); var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes(); var c = 0;
    $scope.DepArr; $scope.GetDependentDetails = function (mode) {
        var ds = (new Date().getFullYear()) + (new Date().getFullYear() + 1).toString().substr(-2);
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var emp = new XMLHttpRequest;
        "true" === mode
            ? emp.open("GET", $scope._Conpath + "MedDependent/GetDependents?mode=" + mode + "&policyYear=" + ds + "&empunqid=null", true)
            : emp.open("GET", $scope._Conpath + "MedDependent/GetDependents?mode=" + mode + "&policyYear=" + ds + "&empunqid=" + $("#myEmpUnqId").val(), true);
        emp.setRequestHeader("Accept", "application/json");
        emp.onreadystatechange = function () {
            if (4 === emp.readyState) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
                var json1 = JSON.parse(emp.responseText); $scope.DepArr = json1, $scope.depData = json1, $scope.$digest(); const arr = $scope.depData; $(".tempRow").remove();
                for (let i = 0; i < arr.length; i++) {
                    var bDate = arr[i].birthDate === null ? "" : arr[i].birthDate.substring(0, arr[i].birthDate.indexOf("T"));
                    var mDate = arr[i].marriageDate === null ? "" : arr[i].marriageDate.substring(0, arr[i].marriageDate.indexOf("T"));
                    var bNo = arr[i].birthCertificateNo === null ? "" : arr[i].birthCertificateNo; var isChanged = false;
                    if (arr[i].depSr === 0) {
                        row = $("<tr>" +
                            "<td style='text-align:center;'><input type='hidden' name='srno' value='" + arr[i].depSr + "'>" + arr[i].depSr + "</td>" +
                            "<td style='text-align:left;'><input type='hidden' name='name' value='" + arr[i].depName + "'>" + arr[i].depName + "</td>" +
                            "<td style='text-align:left;'><input type='hidden' name='relation' value='" + arr[i].relation + "'>" + arr[i].relation + "</td>" +
                            "<td style='text-align:center;'><input type='hidden' name='bDate' value='" + bDate + "'>" + bDate + "</td>" +
                            "<td style='text-align:center;'><input type='hidden' name='gender' value='" + arr[i].gender + "'>" + arr[i].gender + "</td>" +
                            "<td style='text-align:center;'><input type='hidden' name='mDate' value='" + mDate + "'>" + mDate + "</td>" +
                            "<td style='text-align:center;'><input type='hidden' name='pan' value='" + arr[i].pan + "'>" + arr[i].pan + "</td>" +
                            "<td style='text-align:center;'><input type='hidden' name='aadhar' value='" + arr[i].aadhar + "'>" + arr[i].aadhar + "</td>" +
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
                            "<td style='text-align:center;'><input type='hidden' name='pan' value='" + arr[i].pan + "'>" + arr[i].pan + "</td>" +
                            "<td style='text-align:center;'><input type='hidden' name='aadhar' value='" + arr[i].aadhar + "'>" + arr[i].aadhar + "</td>" +
                            "<td style='text-align:center;'><input type='hidden' name='bcno' value='" + bNo + "'>" + bNo + "</td>" +
                            "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='isChanged(this)' class='btn btn-danger'></td>" +
                            "<td style='text-align:center;' hidden><input type='hidden' name='isChanged' value='" + isChanged + "'>" + isChanged + "</td>" +
                            "<td style='text-align:center;' hidden><input type='hidden' name='Active' value='" + arr[i].active + "'>" + arr[i].active + "</td>" +
                            "</tr>");
                    }; $("#commonTable").append(row); c = i;
                }
            } else if (200 !== emp.status) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Record Not Found.. </strong></div>";
                $("#MessageBox").show();
            };
        }, emp.send();
    };
    $scope.setRelation = function (data) {
        $scope.relationvalid(data);
        if (data === "SON" || data === "HUSBAND") { $('select[name^="cmbGender"] option[value="M"]').attr("selected", "selected"); }
        else { $('select[name^="cmbGender"] option[value="F"]').attr("selected", "selected"); }
    };
    $scope.relationvalid = function (relat) {
        if (relat === "HUSBAND" || relat === "WIFE") {
            var relationArr = new Array(); relationArr = $scope.DepArr;
            if (relationArr.length > 0) {
                for (var i = 0; i < relationArr.length; i++) {
                    var r = relationArr[i]["relation"];
                    if (i === 0) {
                        var gender = relationArr[i]["gender"];
                        if (gender === "M" && relat === "HUSBAND") {
                            document.getElementById("ModelMessageBox").innerHTML =
                                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                                "<strong>This relation are not to allow.</strong></div>"; $("#ModelMessageBox").show();
                            return false;
                        } else if (gender === "F" && relat === "WIFE") {
                            document.getElementById("ModelMessageBox").innerHTML =
                                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                                "<strong>This relation are not to allow.</strong></div>"; $("#ModelMessageBox").show();
                            return false;
                        }
                    }
                    if (relat === r) {
                        document.getElementById("ModelMessageBox").innerHTML =
                            "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                            "<strong>no more relations are allow to add for husband /wife.</strong></div>"; $("#ModelMessageBox").show();
                        return false;
                    }
                    if (r === "HUSBAND" || r === "WIFE") {
                        if (relat === "HUSBAND" || relat === "WIFE") {
                            document.getElementById("ModelMessageBox").innerHTML =
                                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                                "<strong>This relation are not to allow.</strong></div>"; $("#ModelMessageBox").show();
                            return false;
                        }
                    }
                }
            }
        }
    };
    $scope.CalAge = function (dateString, rel) {
        if (typeof (rel) === "undefined") {
            document.getElementById("ModelMessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Select First Releation.</strong></div>"; $("#ModelMessageBox").show();
            return false;
        };
        if (rel === "DAUGHTER" && rel === "SON") {
            var today = new Date(); var birthDate = new Date(dateString); var age = today.getFullYear() - birthDate.getFullYear(); var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
            if (age > 25) {
                document.getElementById("ModelMessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Greater of 25 Year age is not allow to Add.</strong></div>"; $("#ModelMessageBox").show();
                return false;
            }
        }
    };
    $scope.AddtoListDependentDetails = function (depData) {
        var table = document.getElementById("commonTable"); var rowCount = table.rows.length; if ((rowCount - 1) === 4) {
            document.getElementById("ModelMessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Only Four Persons are Covered in Policy.</strong></div>"; $("#ModelMessageBox").show();
            return false;
        };
        if ((typeof (depData) === "undefined") || (typeof (depData.depName) === "undefined") || (typeof (depData.relation) === "undefined") || (typeof (depData.birthDate) === "undefined")) {
            document.getElementById("ModelMessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Fill All Required Details Step by Step...</strong></div>"; $("#ModelMessageBox").show();
            return false;
        };
        var marriageDate = ""; if (depData.relation === "HUSBAND" || depData.relation === "WIFE") {
            if (typeof (depData.marriageDate) === "undefined") {
                document.getElementById("ModelMessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Marriage Date required</strong></div>"; $("#ModelMessageBox").show();
                return false;
            } else { marriageDate = depData.marriageDate; };
        } else { marriageDate = (typeof (depData.marriageDate) === "undefined") ? "" : depData.marriageDate; };
        var pan = (typeof (depData.pan) === "undefined") ? "" : depData.pan; var aadhar = (typeof (depData.aadhar) === "undefined") ? "" : depData.aadhar;
        var csno = (typeof (depData.birthCertificateNo) === "undefined") ? "" : depData.birthCertificateNo; var isChanged = true; var active = true; c++;
        row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='srno' value='" + c + "'>" + c + "</td>" +
            "<td style='text-align:left;'><input type='hidden' name='name' value='" + depData.depName + "'>" + depData.depName + "</td>" +
            "<td style='text-align:left;'><input type='hidden' name='relation' value='" + depData.relation + "'>" + depData.relation + "</td>" +
            "<td style='text-align:center;'><input type='hidden' name='bDate' value='" + depData.birthDate + "'>" + depData.birthDate + "</td>" +
            "<td style='text-align:center;'><input type='hidden' name='gender' value='" + $("#cmbGender").val() + "'>" + $("#cmbGender").val() + "</td>" +
            "<td style='text-align:center;'><input type='hidden' name='mDate' value='" + marriageDate + "'>" + marriageDate + "</td>" +
            "<td style='text-align:center;'><input type='hidden' name='pan' value='" + pan + "'>" + pan + "</td>" +
            "<td style='text-align:center;'><input type='hidden' name='aadhar' value='" + aadhar + "'>" + aadhar + "</td>" +
            "<td style='text-align:center;'><input type='hidden' name='bcno' value='" + csno + "'>" + csno + "</td>" +
            "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='isChanged(this)' class='btn btn-danger' disabled></td>" +
            "<td style='text-align:center;' hidden><input type='hidden' name='isChanged' value='" + isChanged + "'>" + isChanged + "</td>" +
            "<td style='text-align:center;' hidden><input type='hidden' name='Active' value='" + active + "'>" + active + "</td>" + "</tr>"); $("#commonTable").append(row);
        $scope.ResetModel();
    };
    //$scope.ResetModel = function () {
    //    document.getElementById("txtdepName").value = ""; $("#cmbReleation option:first").attr("selected", true); document.getElementById("dtbirthDate").value = "";
    //    document.getElementById("txtbirthCertificateNo").value = ""; $("#cmbGender option:first").attr("selected", true);
    //    document.getElementById("dtmarriageDate").value = ""; document.getElementById("txtpan").value = ""; document.getElementById("txtaadhar").value = "";
    //};
    $scope.ManageDependent = function () {
        var TableData = storeTblValues(); debugger; TableData = JSON.stringify(TableData); function storeTblValues() { var TableData = new Array(); $("#commonTable tr").each(function (row, tr) { TableData[row] = { "empUnqId": $("#myEmpUnqId").val(), "depSr": $(tr).find("td:eq(0)").text(), "depName": $(tr).find("td:eq(1)").text(), "relation": $(tr).find("td:eq(2)").text(), "birthDate": $(tr).find("td:eq(3)").text(), "gender": $(tr).find('td:eq(4)').text(), "marriageDate": $(tr).find('td:eq(5)').text(), "pan": $(tr).find('td:eq(6)').text(), "aadhar": $(tr).find('td:eq(7)').text(), "birthCertificateNo": $(tr).find("td:eq(8)").text(), "effectiveDate": dt, "releaseGroupCode": null, "releaseStrategy": null, "releaseStatusCode": null, "releaseDt": dt, "releaseUser": null, "delReleaseGroupCode": null, "delReleaseStrategy": null, "delReleaseStatusCode": null, "delReleaseDt": null, "delReleaseUser": null, "active": $(tr).find("td:eq(11)").text(), "addUser": $("#myEmpUnqId").val(), "addDate": dt, "isChanged": $(tr).find("td:eq(10)").text(), "uhIds": null }; }); TableData.shift(); return TableData; };
        var ddl = new XMLHttpRequest(); ddl.open("POST", $scope._Conpath + "MedDependent/CreateDependents", true); ddl.setRequestHeader("Content-type", "application/json"); ddl.onreadystatechange = function () {
            if (ddl.readyState === 4 && ddl.status === 200) { $scope.ResetModel(); $("#commonTable").find("tr:not(:first)").remove(); jQuery('#btnClose').click(); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + " <strong>Submit Successfully.. </strong></div>"; $("#MessageBox").show(); }
            else { $scope.ResetModel(); $("#commonTable").find("tr:not(:first)").remove(); jQuery('#btnClose').click(); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + " <strong>Not Submit Successfully.. </strong></div>"; $("#MessageBox").show(); };
            $scope.GetDependentDetails('false');
        }; ddl.send(TableData);
    };
    $scope.RelArr; $scope.GetRelease = function () {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var rel = new XMLHttpRequest; rel.open("GET", $scope._Conpath + "MedDependent/GetRelease?releaser=" + $("#myEmpUnqId").val(), true); rel.setRequestHeader("Accept", "application/json");
        rel.onreadystatechange = function () {
            if (4 === rel.readyState && rel.status === 200) { $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv"); var json2 = JSON.parse(rel.responseText); $scope.RelArr = json2; $scope.relData = json2, $scope.$digest(); }
            else { $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv"); var errer = rel.responseText.replace(/\"/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\[/g, "").replace(/\]/g, ""); if (rel.status === 400) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>" + errer + "</strong></div>"; $("#MessageBox").show(); } };
        }; rel.send();
    };
    $scope.ReleaseDependents = function (sts, empid, srno, rText) {
        var newArr = new Array(); newArr = $scope.RelArr; var cnt = 0; var myArray = [];
        if (newArr.length > 0) {
            for (var i = 0; i < newArr.length; i++) {
                if (empid === parseInt(newArr[i]["empUnqId"])) {
                    myArray.push([]); myArray[cnt] = newArr[i];
                    if (newArr[i]["active"] === true && newArr[i]["isChanged"] === true) {
                        myArray[cnt]["delReleaseStatusCode"] = sts; myArray[cnt]["delReleaseUser"] = $("#myEmpUnqId").val();//remove exist dependent
                    } else if (newArr[i]["active"] === false && newArr[i]["isChanged"] === true) {
                        myArray[cnt]["releaseStatusCode"] = sts; myArray[cnt]["releaseUser"] = $("#myEmpUnqId").val();//New Dependent
                    }; cnt++;
                }
            }
        }; myArray = JSON.stringify(myArray);
        var rdd = new XMLHttpRequest(); rdd.open("PUT", $scope._Conpath + "MedDependent/ReleaseDependents", true); rdd.setRequestHeader("Content-type", "application/json");
        rdd.onreadystatechange = function () {
            if (rdd.readyState === 4 && rdd.status === 200) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Release Successfully.. </strong></div>"; $("#MessageBox").show();
            } else {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Not Release Successfully.. </strong></div>"; $("#MessageBox").show();
            }; $scope.GetRelease();
        }; rdd.send(myArray);
    };
    $scope.PopupModel = function () { $("#ConformModel").modal("show"); };
}), app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });