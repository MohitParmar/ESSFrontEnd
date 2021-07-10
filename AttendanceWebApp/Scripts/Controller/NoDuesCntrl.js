var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("NoDuesController", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), $scope._Conpath = ""; var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol; $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"); });
    $scope.currentPage = 1; $scope.itemsPerPage = 10;
    $scope.ResetView = function () { window.location.reload(true); };
    $scope.GetRelesaseStratey = function (ecode) { var rel = new XMLHttpRequest(); rel.open("GET", $scope._Conpath + "ReleaseStrategy/GetReleaseStrategy?releaseGroup=" + $("#releaseGroupCode").val() + "&empUnqId=" + ecode, true); rel.setRequestHeader("Accept", "application/json"); rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.$digest(); } }; rel.send(); };
    $scope.empdata;
    $scope.GetEmpInfo = function () { var e_Code = $("#eCode").val(), emp = new XMLHttpRequest(); emp.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + e_Code, true), emp.setRequestHeader("Accept", "application/json"), emp.onreadystatechange = function () { if (4 === emp.readyState) { var json = JSON.parse(emp.responseText); $scope.empdata = json, $scope.$digest(); $scope.GetRelesaseStratey(e_Code); } }, emp.send(); };
    //First Submit from HR
    $scope.NoDuesSubmit = function (entity) {
        var jsonObj = {}; var empUnqId = $("#eCode").val(); jsonObj.empUnqId = $("#eCode").val(); jsonObj.joinDate = $scope.empdata[0].joinDate; jsonObj.resignDate = entity.ResignDate; jsonObj.relieveDate = entity.RelieveDate; jsonObj.noDuesStartDate = new Date(); jsonObj.addUser = $("#myEmpUnqId").val(); jsonObj.addDate = new Date(); jsonObj.closedFlag = false; jsonObj.modeofLeaving = entity.modeofLeaving; jsonObj = JSON.stringify(jsonObj);
        var xhr = new XMLHttpRequest; xhr.open("POST", $scope._Conpath + "NoDues/CreateNoDues", true);
        xhr.setRequestHeader("Content-type", "application/json"); xhr.onreadystatechange = function () {
            if (4 === xhr.readyState && 200 === xhr.status) {
                //Auto Mail Sending
                var hodmail = new XMLHttpRequest();
                hodmail.open("GET", $scope._Conpath + "AutoMail/SendMailNoDues?releaseGroupCode=ND&empUnqId=" + empUnqId + "&dept=HOD", true);
                hodmail.setRequestHeader("Content-type", "application/json"); hodmail.send();
                //Auto Mail End
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + "No Dues Submitted.</strong></div>"; $("#MessageBox").show(); document.getElementById("eCode").value = ""; document.getElementById("ResignDate").value = ""; document.getElementById("RelieveDate").value = "";
            } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + "Not Submitted</strong></div>"; $("#MessageBox").show(); document.getElementById("eCode").value = ""; document.getElementById("ResignDate").value = ""; document.getElementById("RelieveDate").value = ""; };
        }; xhr.send(jsonObj);
    };
    $scope.GetRoles = function (releasableFlag) { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var rol = new XMLHttpRequest; rol.open("GET", $scope._Conpath + "Roles/GetRoleAuth?empUnqId=" + $("#myEmpUnqId").val(), true); rol.setRequestHeader("Accept", "application/json"); rol.onreadystatechange = function () { if (rol.readyState === 4) { $scope.userRoleData = JSON.parse(rol.responseText); $scope.$digest(); var arr = $scope.userRoleData; var rflg; for (var i = 0; i < arr.length; i++) { var tmproleid = arr[i].roleId; if (tmproleid === 23 && releasableFlag === false) { rflg = false; $("#hidreleaserFlag").val(rflg); break; } if (tmproleid === 24 && releasableFlag === true) { rflg = true; $("#hidreleaserFlag").val(rflg); break; }; }; $scope.GetReleaser(rflg); }; }; rol.send(); };
    var hodRlsFLG = url.searchParams.get("flg");
    $scope.dept;
    $scope.GetReleaser = function (reflg) { if (hodRlsFLG !== null) { $scope.GetNoDues("HOD", reflg); } else { var rel = new XMLHttpRequest; rel.open("GET", $scope._Conpath + "NoDues/GetReleaser?empUnqId=" + $("#myEmpUnqId").val() + "&releaseFlag=" + reflg, true); rel.setRequestHeader("Accept", "application/json"); rel.onreadystatechange = function () { if (rel.readyState === 4 && rel.status === 200) { const relJson = JSON.parse(rel.responseText); $scope.dept = relJson; $scope.$digest(); $("#hidDept").val($scope.dept[0]); var dept = $("#hidDept").val(); $scope.GetNoDues(dept, reflg); }; }; rel.send(); }; };
    $scope.SetDeptValue = function (value) { var dept = value; $("#hidDept").val(dept); var releaserFlag = $("#hidreleaserFlag").val(); $scope.GetNoDues(dept, releaserFlag); };
    $scope.noDuesData;
    $scope.GetNoDues = function (dept, relFlg) {
        var gnd = new XMLHttpRequest;
        if (hodRlsFLG !== null) { gnd.open("GET", $scope._Conpath + "NoDues/GetNoDues?empUnqId=" + $("#myEmpUnqId").val() + "&releaseFlag=" + hodRlsFLG + "&dept=" + dept, true); }
        else { gnd.open("GET", $scope._Conpath + "NoDues/GetNoDues?empUnqId=" + $("#myEmpUnqId").val() + "&releaseFlag=" + relFlg + "&dept=" + dept, true); }
        gnd.setRequestHeader("Accept", "application/json"); gnd.onreadystatechange = function () {
            if (gnd.readyState === 4 && gnd.status === 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                const gndJson = JSON.parse(gnd.responseText); $scope.noDuesData = gndJson; $scope.gndData = gndJson; $scope.$digest();
            } else if (gnd.status === 400) {
                $scope.gndData = []; $scope.$digest();
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var str = gnd.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString(); var fields = str.split(','); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + " <strong>" + er + "</strong></div>"; $("#MessageBox").show();
            };
        };
        gnd.send();
    };
    $scope.populateEmpUnqId;
    $scope.PopulateData = function (id, flg) {

        $scope.populateEmpUnqId = id;
        $("#commonTable").find("tr:not(:first)").remove(); $("#commonTable1").find("tr:not(:first)").remove();
        var dept = $("#hidDept").val(); const rls = $("#hidreleaserFlag").val();
        if (dept === "HR" && rls === "false") {
            if (flg === false) { document.getElementById("heid").innerHTML = id; $("#HRModel").modal("show"); }
            else { document.getElementById("heid1").innerHTML = id; $("#HRModelEdit").modal("show"); }
        } else if (dept === "HR" && rls === "true") {
            document.getElementById("heid").innerHTML = id;
        } else if (dept !== "HR") {
            if (flg === false) { document.getElementById("eid").innerHTML = id; $("#ConformModel").modal("show"); }
            else { document.getElementById("eid1").innerHTML = id; $("#ConformModelEdit").modal("show"); }
        };
        const arr = $scope.noDuesData; let fg = new Array(); let empid; let row;
        if (flg === false) {
            if ((rls === "true" || hodRlsFLG === "true") && (dept !== "HR")) {
                for (let i = 0; i < arr.length; i++) {
                    empid = parseInt(arr[i].empUnqId);
                    if (empid === id) {
                        if (hodRlsFLG === "true") {
                            row = $("<tr>" +
                                "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + arr[i].empUnqId + "'>" + arr[i].empUnqId + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='HOD'>HOD</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + 1 + "'>" + 1 + "</td>" +
                                "<td style='text-align:left;'><input type='hidden' name='AliasFirstNames' value='" + arr[i].deptParticulars + "'>" + arr[i].deptParticulars + "</td>" +
                                "<td style='text-align:left;'><input type='hidden' name='AliasFirstNames' value='" + arr[i].deptRemarks + "'>" + arr[i].deptRemarks + "</td>" +
                                "<td style='text-align:right;'><input type='hidden' name='AliasMiddleNames' value='" + arr[i].deptAmount + "'>" + arr[i].deptAmount + "</td>" +
                                "</tr>");
                            $("#commonTable").append(row);
                        } else {
                            var noDuesDepts = new Array(); noDuesDepts = arr[i].noDuesDepts; if (noDuesDepts !== null) { fg = noDuesDepts[0].noDuesDeptDetails; };
                            for (var k = 0; k < fg.length; k++) {
                                row = $("<tr>" +
                                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + fg[k].empUnqId + "'>" + fg[k].empUnqId + "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + fg[k].deptId + "'>" + fg[k].deptId + "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + fg[k].sr + "'>" + fg[k].sr + "</td>" +
                                    "<td style='text-align:left;'><input type='hidden' name='AliasFirstNames' value='" + fg[k].particulars + "'>" + fg[k].particulars + "</td>" +
                                    "<td style='text-align:left;'><input type='hidden' name='AliasFirstNames' value='" + fg[k].remarks + "'>" + fg[k].remarks + "</td>" +
                                    "<td style='text-align:right;'><input type='hidden' name='AliasMiddleNames' value='" + fg[k].amount + "'>" + fg[k].amount + "</td>" +
                                    "</tr>");
                                $("#commonTable").append(row);
                            }
                        };
                        var nDDepts = arr[i]["noDuesDepts"]; var nDDetails = nDDepts[0]["noDuesDeptDetails"]; var Total = 0;
                        for (var m = 0; m < nDDetails.length; m++) { Total += parseInt(nDDetails[m]["amount"]) || 0; document.getElementById("txtTotal").value = Total || 0; }
                    }
                }
            }
        } else if (flg === true) {
            if ((rls === "false" || hodRlsFLG === "false") && (dept !== "HR")) {
                for (var j = 0; j < arr.length; j++) {
                    empid = parseInt(arr[j].empUnqId);
                    if (empid === id) {
                        if (hodRlsFLG === "false") {
                            row = $("<tr>" +
                                "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + arr[j].empUnqId + "'>" + arr[j].empUnqId + "</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='HOD'>HOD</td>" +
                                "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + 1 + "'>" + 1 + "</td>" +
                                "<td style='text-align:left;'><input type='hidden' name='AliasFirstNames' value='" + arr[j].deptParticulars + "'>" + arr[j].deptParticulars + "</td>" +
                                "<td style='text-align:left;'><input type='hidden' name='AliasFirstNames' value='" + arr[j].deptRemarks + "'>" + arr[j].deptRemarks + "</td>" +
                                "<td style='text-align:right;'><input type='hidden' name='AliasMiddleNames' value='" + arr[j].deptAmount + "'>" + arr[j].deptAmount + "</td>" +
                                "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveRowTBL2(this)' class='btn btn-danger'></td>" +
                                "</tr>");
                            $("#commonTable1").append(row);
                        } else {
                            var noDuesDepts = new Array(); noDuesDepts = arr[j].noDuesDepts; if (noDuesDepts !== null) { fg = noDuesDepts[0].noDuesDeptDetails; };
                            for (var l = 0; l < fg.length; l++) {
                                row = $("<tr>" +
                                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + fg[l].empUnqId + "'>" + fg[l].empUnqId + "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + fg[l].deptId + "'>" + fg[l].deptId + "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + fg[l].sr + "'>" + fg[l].sr + "</td>" +
                                    "<td style='text-align:left;'><input type='hidden' name='AliasFirstNames' value='" + fg[l].particulars + "'>" + fg[l].particulars + "</td>" +
                                    "<td style='text-align:left;'><input type='hidden' name='AliasFirstNames' value='" + fg[l].remarks + "'>" + fg[l].remarks + "</td>" +
                                    "<td style='text-align:right;'><input type='hidden' name='AliasMiddleNames' value='" + fg[l].amount + "'>" + fg[l].amount + "</td>" +
                                    "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveRowTBL2(this)' class='btn btn-danger'></td>" +
                                    "</tr>");
                                $("#commonTable1").append(row);
                            }
                        };
                        var nDDepts1 = arr[j]["noDuesDepts"]; var nDDetails1 = nDDepts1[0]["noDuesDeptDetails"]; var Total1 = 0;
                        for (var n = 0; n < nDDetails1.length; n++) { Total1 += parseInt(nDDetails1[n]["amount"]) || 0; document.getElementById("txtTotal1").value = Total1 || 0; }
                    }
                }
            }
        }
    };
    var c = 0;
    $scope.DeptData = function (data, flg) {
        if ((typeof (data) === "undefined") || (typeof (data.particulars) === "undefined") || (typeof (data.remarks) === "undefined") || (typeof (data.amount) === "undefined")) {
            return false;
        }; var amount = data.amount || 0; var dept;
        if (hodRlsFLG !== null) {
            dept = "HOD"; if (flg === false) { document.getElementById("btnAdd").disabled = true; } else { document.getElementById("btnAdd1").disabled = true; };
        } else { dept = $("#hidDept").val(); };
        var TableData = storeTblValues(); function storeTblValues() {
            c = c + 1; $(".tempRow").remove();
            let row;
            if (flg === false) {
                row = $("<tr>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + $("#eid").text() + "'>" + $("#eid").text() + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + dept + "'>" + dept + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + c + "'>" + c + "</td>" +
                    "<td style='text-align:left;'><input type='hidden' name='AliasFirstNames' value='" + data.particulars + "'>" + data.particulars + "</td>" +
                    "<td style='text-align:left;'><input type='hidden' name='AliasFirstNames' value='" + data.remarks + "'>" + data.remarks + "</td>" +
                    "<td style='text-align:right;'><input type='hidden' name='AliasMiddleNames' value='" + amount + "'>" + amount + "</td>" +
                    "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveRowTBL1(this)' class='btn btn-danger'></td>" +
                    "</tr>");
                $("#commonTable").append(row);
            } else {
                row = $("<tr>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + $("#eid1").text() + "'>" + $("#eid1").text() + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasFirstNames' value='" + dept + "'>" + dept + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + c + "'>" + c + "</td>" +
                    "<td style='text-align:left;'><input type='hidden' name='AliasFirstNames' value='" + data.particulars + "'>" + data.particulars + "</td>" +
                    "<td style='text-align:left;'><input type='hidden' name='AliasFirstNames' value='" + data.remarks + "'>" + data.remarks + "</td>" +
                    "<td style='text-align:right;'><input type='hidden' name='AliasMiddleNames' value='" + amount + "'>" + amount + "</td>" +
                    "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveRowTBL2(this)' class='btn btn-danger'></td>" +
                    "</tr>");
                $("#commonTable1").append(row);
            }
            var TableData = new Array();
            var Total = 0;
            if (flg === false) {
                $("#commonTable tr").each(function (row, tr) {
                    TableData[row] = {
                        "empUnqId": $("#eid").text(), "deptID": dept, "sr": c, "particulars": $(tr).find("td:eq(3)").text(), "remarks": $(tr).find('td:eq(4)').text(),
                        "amount": $(tr).find('td:eq(5)').text()
                    };
                });
                for (var i = 0; i < TableData.length; i++) {
                    Total += parseInt(TableData[i]["amount"]) || 0; document.getElementById("txtTotal").value = Total || 0;
                };
            } else {
                $("#commonTable1 tr").each(function (row, tr) {
                    TableData[row] = {
                        "empUnqId": $("#eid1").text(), "deptID": dept, "sr": c, "particulars": $(tr).find("td:eq(3)").text(), "remarks": $(tr).find('td:eq(4)').text(),
                        "amount": $(tr).find('td:eq(5)').text()
                    };
                });
                for (var j = 0; j < TableData.length; j++) {
                    Total += parseInt(TableData[j]["amount"]) || 0;
                    document.getElementById("txtTotal1").value = Total || 0;
                };
            }; TableData.shift(); return TableData;
        };
        if (flg === false) {
            document.getElementById("txtParticularsER").value = ""; document.getElementById("txtRemarksER").value = ""; document.getElementById("txtAmtER").value = "0";
        } else {
            document.getElementById("txtParticularsER1").value = ""; document.getElementById("txtRemarksER1").value = ""; document.getElementById("txtAmtER1").value = "0";
        }
    };
    $scope.ChangeNoDues = function (flg, id, direct) {
        var dept = $("#hidDept").val(); var releaserFlag = $("#hidreleaserFlag").val();
        var d = new Date(); var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var jsonObj = {}; var jsonDepts = new Array(); var empUnqId;
        var TableData = storeTblValues(); TableData = JSON.stringify(TableData);
        function storeTblValues() {
            var noDuesDeptDetails = new Array();
            if (releaserFlag === "true" || hodRlsFLG !== null && flg === false) {
                $('#commonTable tr').each(function (row, tr) {
                    noDuesDeptDetails[row] = {
                        "EmpUnqId": $(tr).find('td:eq(0)').text(), "DeptId": $(tr).find('td:eq(1)').text(), "Sr": $(tr).find('td:eq(2)').text(),
                        "Particulars": $(tr).find('td:eq(3)').text(), "Remarks": $(tr).find('td:eq(4)').text(), "Amount": $(tr).find('td:eq(5)').text(),
                        "AddUser": $("#myEmpUnqId").val(), "AddDate": dt, "ApprovalFlag": true, "ApprovalDate": dt, "ApprovedBy": $("#myEmpUnqId").val()
                    }
                });
                noDuesDeptDetails.shift();
            } else {
                if ((typeof (direct) === "undefined") && flg === false) {
                    $('#commonTable tr').each(function (row, tr) {
                        noDuesDeptDetails[row] = {
                            "EmpUnqId": $(tr).find('td:eq(0)').text(), "DeptId": $(tr).find('td:eq(1)').text(), "Sr": $(tr).find('td:eq(2)').text(),
                            "Particulars": $(tr).find('td:eq(3)').text(), "Remarks": $(tr).find('td:eq(4)').text(), "Amount": $(tr).find('td:eq(5)').text(),
                            "AddUser": $("#myEmpUnqId").val(), "AddDate": dt, "ApprovalFlag": false, "ApprovalDate": null, "ApprovedBy": $("#myEmpUnqId").val()
                        }
                    }); noDuesDeptDetails.shift();
                } else if ((typeof (direct) === "undefined") && flg === true) {
                    $('#commonTable1 tr').each(function (row, tr) {
                        noDuesDeptDetails[row] = {
                            "EmpUnqId": $(tr).find('td:eq(0)').text(), "DeptId": $(tr).find('td:eq(1)').text(), "Sr": $(tr).find('td:eq(2)').text(),
                            "Particulars": $(tr).find('td:eq(3)').text(), "Remarks": $(tr).find('td:eq(4)').text(), "Amount": $(tr).find('td:eq(5)').text(),
                            "AddUser": $("#myEmpUnqId").val(), "AddDate": dt, "ApprovalFlag": false, "ApprovalDate": null, "ApprovedBy": $("#myEmpUnqId").val()
                        }
                    });
                    noDuesDeptDetails.shift();
                }
            } d
            if (noDuesDeptDetails.length === 0 && (dept !== "HR" && dept !== "UH")) {
                document.getElementById("MessageBox1").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Please enter details of no dues and click on Plus Button and Submit to save No Dues details.</strong></div>"; $("#MessageBox1").show();
                return false;
            }

            for (var n = 0; n < noDuesDeptDetails.length; n++) { noDuesDeptDetails[n]["Sr"] = n + 1; };
            empUnqId = id; if (releaserFlag === "true") { empUnqId = direct; }
            else {
                if (id === "NaN" || id === "") {
                    if (dept === "HR") { if (flg === false) { empUnqId = parseInt(document.getElementById("heid").innerHTML); } else { empUnqId = parseInt(document.getElementById("heid1").innerHTML); } }
                    else { if (flg === false) { empUnqId = parseInt(document.getElementById("eid").innerHTML); } else { empUnqId = parseInt(document.getElementById("eid1").innerHTML); } };
                }
            }
            $scope.ndData;
            for (var i = 0; i < $scope.noDuesData.length; i++) { var f = parseInt($scope.noDuesData[i].empUnqId); if (f === empUnqId) { $scope.ndData = $scope.noDuesData[i]; break; } };
            jsonObj.empUnqId = empUnqId; jsonObj.joinDate = $scope.ndData.joinDate; jsonObj.resignDate = $scope.ndData.resignDate;
            jsonObj.relieveDate = $scope.ndData.relieveDate; jsonObj.noDuesStartDate = $scope.ndData.noDuesStartDate; jsonObj.addUser = $scope.ndData.addUser;
            jsonObj.addDate = $scope.ndData.addDate; jsonObj.closedFlag = $scope.ndData.closedFlag;
            if (hodRlsFLG !== null) {
                jsonObj.deptParticulars = noDuesDeptDetails[0]["Particulars"] || ""; jsonObj.deptRemarks = noDuesDeptDetails[0]["Remarks"] || "";
                jsonObj.deptAmount = noDuesDeptDetails[0]["Amount"] || 0;
                if (hodRlsFLG === "false") { jsonObj.deptNoDuesFlag = true; jsonObj.deptApprovalFlag = false; jsonObj.deptAddUser = $("#myEmpUnqId").val(); jsonObj.deptAddDate = dt; }
                else {
                    jsonObj.deptNoDuesFlag = $scope.ndData.deptNoDuesFlag; jsonObj.deptApprovalFlag = true; jsonObj.deptAddUser = $scope.ndData.deptAddUser;
                    jsonObj.deptAddDate = $scope.ndData.deptAddDate;
                }
            } else {
                jsonObj.deptParticulars = $scope.ndData.deptParticulars; jsonObj.deptRemarks = $scope.ndData.deptRemarks; jsonObj.deptAmount = $scope.ndData.deptAmount;
                jsonObj.deptNoDuesFlag = $scope.ndData.deptNoDuesFlag; jsonObj.deptApprovalFlag = $scope.ndData.deptApprovalFlag;
                jsonObj.deptAddUser = $scope.ndData.deptAddUser; jsonObj.deptAddDate = $scope.ndData.deptAddDate;
            }
            jsonObj.empName = $scope.ndData.empName; jsonObj.deptName = $scope.ndData.deptName; jsonObj.statName = $scope.ndData.statName;
            jsonObj.catName = $scope.ndData.catName; jsonObj.gradeName = $scope.ndData.gradeName;
            if (dept === "HR") {
                if (releaserFlag === "true") {
                    jsonObj.noticePeriod = $scope.ndData.noticePeriod; jsonObj.noticePeriodUnit = $scope.ndData.noticePeriodUnit;
                    jsonObj.lastWorkingDate = $scope.ndData.lastWorkingDate; jsonObj.modeOfLeaving = $scope.ndData.modeOfLeaving;
                    jsonObj.exitInterviewFlag = $scope.ndData.exitInterviewFlag; jsonObj.hrAddUser = $scope.ndData.hrAddUser;
                    jsonObj.hrApprovalFlag = true; jsonObj.hrApprovalDate = dt; jsonObj.hrApprovedBy = $("#myEmpUnqId").val();
                } else {
                    jsonObj.noticePeriod = direct.noticePeriod; jsonObj.noticePeriodUnit = direct.noticePeriodUnit;
                    jsonObj.lastWorkingDate = direct.lastWorkingDate; jsonObj.modeOfLeaving = direct.modeofLeaving;
                    jsonObj.exitInterviewFlag = direct.exitInterviewFlg; jsonObj.hrAddUser = $("#myEmpUnqId").val();
                    jsonObj.hrApprovalFlag = false; jsonObj.hrApprovalDate = null; jsonObj.hrApprovedBy = null;
                }
            } else {
                jsonObj.noticePeriod = $scope.ndData.noticePeriod; jsonObj.noticePeriodUnit = $scope.ndData.noticePeriodUnit;
                jsonObj.lastWorkingDate = $scope.ndData.lastWorkingDate; jsonObj.modeOfLeaving = $scope.ndData.modeOfLeaving;
                jsonObj.exitInterviewFlag = $scope.ndData.exitInterviewFlag; jsonObj.hrAddUser = $scope.ndData.hrAddUser;
                jsonObj.hrApprovalFlag = $scope.ndData.hrApprovalFlag; jsonObj.hrApprovalDate = $scope.ndData.hrApprovalDate;
                jsonObj.hrApprovedBy = $scope.ndData.hrApprovedBy;
            }
            if (dept === "UH") { jsonObj.uhApprovalFlag = true; jsonObj.uhApprovalDate = dt; jsonObj.uhApprovedBy = $("#myEmpUnqId").val(); };
            jsonObj.noDuesReleaseStatus = $scope.ndData.noDuesReleaseStatus; if (hodRlsFLG !== null) {
                if (hodRlsFLG === "true") {
                    var r = new Array();
                    r = $scope.ndData.noDuesReleaseStatus;
                    for (var e = 0; e < r.length; e++) {
                        //var isFinalrel = r[e].isFinalRelease; //if (isFinalrel === true) {
                        jsonObj.noDuesReleaseStatus[e].releaseAuth = $("#myEmpUnqId").val();
                        //}
                    }
                }
            }
            if (hodRlsFLG !== null || dept === "HR" || dept === "UH") { jsonObj.noDuesDepts = null; }
            else {
                if (releaserFlag === "true") {
                    jsonDepts[0] = {
                        "empUnqId": empUnqId, "deptId": dept, "noDuesFlag": true, "remarks": "", "approvalFlag": true, "approvalDate": dt,
                        "approvedBy": $("#myEmpUnqId").val(), "noDuesDeptDetails": noDuesDeptDetails
                    };
                } else {
                    jsonDepts[0] = {
                        "empUnqId": empUnqId, "deptId": dept, "noDuesFlag": true, "remarks": "", "approvalFlag": false, "approvalDate": null,
                        "approvedBy": null, "noDuesDeptDetails": noDuesDeptDetails
                    };
                }
                jsonObj.noDuesDepts = jsonDepts;
            }
            return jsonObj;
        };
        var nds = new XMLHttpRequest();
        if (hodRlsFLG !== null) { nds.open("PUT", $scope._Conpath + "NoDues/ChangeNoDues?releaseFlag=" + hodRlsFLG + "&dept=HOD", true); }
        else { nds.open("PUT", $scope._Conpath + "NoDues/ChangeNoDues?releaseFlag=" + releaserFlag + "&dept=" + dept, true); }
        nds.setRequestHeader("Content-type", "application/json"); nds.onreadystatechange = function () {
            if (nds.readyState === 4 && nds.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + " <strong>Submit Successfully.. </strong></div>"; $("#MessageBox").show();
                if (dept === "UH") { jQuery("#btnClose").click(); $scope.GetNoDuesUH(); } else {
                    if (hodRlsFLG !== null) {
                        //Auto Mail Sending
                        if (releaserFlag === "true") { var rlsmail = new XMLHttpRequest(); rlsmail.open("GET", $scope._Conpath + "AutoMail/SendMailNoDues?releaseGroupCode=ND&empUnqId=" + empUnqId + "&dept=aam", true); rlsmail.setRequestHeader("Content-type", "application/json"); rlsmail.send(); };
                        //Auto Mail End
                        if (flg === false) { jQuery('#btnClose').click(); $("#commonTable").find("tr:not(:first)").remove(); document.getElementById("txtParticularsER").value = ""; document.getElementById("txtRemarksER").value = ""; document.getElementById("txtAmtER").value = "0"; }
                        else { jQuery('#btnClose2').click(); $("#commonTable1").find("tr:not(:first)").remove(); document.getElementById("txtParticularsER1").value = ""; document.getElementById("txtRemarksER1").value = ""; document.getElementById("txtAmtER1").value = "0"; };
                        $scope.GetNoDues("HOD", releaserFlag);
                    } else {
                        if (flg === false) { jQuery('#btnClose').click(); $("#commonTable").find("tr:not(:first)").remove(); document.getElementById("txtParticularsER").value = ""; document.getElementById("txtRemarksER").value = ""; document.getElementById("txtAmtER").value = "0"; if (dept === "HR") { jQuery('#btnClose1').click(); }; }
                        else { jQuery('#btnClose2').click(); $("#commonTable1").find("tr:not(:first)").remove(); document.getElementById("txtParticularsER1").value = ""; document.getElementById("txtRemarksER1").value = ""; document.getElementById("txtAmtER1").value = "0"; if (dept === "HR") { jQuery('#btnClose3').click(); }; };
                        $scope.GetNoDues(dept, releaserFlag);
                    };
                }
            } else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + " <strong>Not Submited.. </strong></div>"; $("#MessageBox").show();
                if (hodRlsFLG !== null) {
                    if (flg === false) { jQuery('#btnClose').click(); } else { jQuery('#btnClose2').click(); }; $scope.GetNoDues("HOD", releaserFlag);
                }
                else {
                    if (flg === false) { jQuery('#btnClose').click(); if (dept === "HR") { jQuery('#btnClose1').click(); }; }
                    else { jQuery('#btnClose2').click(); if (dept === "HR") { jQuery('#btnClose3').click(); }; }; $scope.GetNoDues(dept, releaserFlag);
                };
            };
        }; nds.send(TableData);
    };
    $scope.ToValidate = function () { var chkFrom = document.getElementById("FromDt"), chkTo = document.getElementById("ToDt"), FromDate = chkFrom.value, ToDate = chkTo.value, date1 = new Date(FromDate), date2 = new Date(ToDate); return date1 > date2 ? (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>", $("#MessageBox").show(), !1) : !0 };
    $scope.hrdData;
    $scope.GetNoDuesHR = function (puser) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var FromDate, ToDate;
        if ("undefined" == typeof puser || "undefined" == typeof puser.FromDt || "undefined" == typeof puser.ToDt) {
            var date = new Date; firstDay = new Date(date.getFullYear(), date.getMonth(), 1); lastDay = new Date(date.getFullYear(), date.getMonth() + 3, 0);
            FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate();
            ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { FromDate = puser.FromDt, ToDate = puser.ToDt; };
        var date1 = new Date(FromDate), date2 = new Date(ToDate);
        if (date1 > date2)
            return document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>",
                $("#MessageBox").show(), !1;
        var hrd = new XMLHttpRequest; hrd.open("GET", $scope._Conpath + "NoDues/GetNoDues?fromDate=" + FromDate + "&toDate=" + ToDate, true);
        hrd.setRequestHeader("Accept", "application/json"); hrd.onreadystatechange = function () {
            if (hrd.readyState === 4 && hrd.status === 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); const hrdJson = JSON.parse(hrd.responseText); $scope.hrdData = hrdJson;
                for (var i = 0; i < $scope.hrdData.length; i++) {
                    var resigndate = $scope.hrdData[i].resignDate.substring(0, $scope.hrdData[i].resignDate.indexOf("T"));
                    if (resigndate === "0001-01-01") { $scope.hrdData[i].resignDate = ""; }
                }; $scope.$digest();
            }
            else if (hrd.status === 400) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); var str = hrd.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString(); var fields = str.split(','); var er = ""; for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; }; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + " <strong>" + er + "</strong></div>"; $("#MessageBox").show();
            };
        };
        hrd.send();
    };
    $scope.PrintPreview = function (empId) {
        const arr = $scope.hrdData; $scope.empArr; var eArr = new Array(); let noDuesDepts = new Array();
        for (let i = 0; i < arr.length; i++) {
            if (empId === parseInt(arr[i].empUnqId)) {
                eArr[0] = arr[i];
                $scope.empArr = eArr;
                noDuesDepts = $scope.empArr[0]["noDuesDepts"]; $scope.noDuesDepts = noDuesDepts;
                $scope.noDuesDepts = $filter("orderBy")($scope.noDuesDepts, "no");
                break;
            };
        };
        $scope.MobieNO(empId);
    };
    $scope.MobieNO = function (empId) {
        var mob = new XMLHttpRequest;
        mob.open("GET", $scope._Conpath + "Employee/GetEmpDetails?empunqid=" + empId + "&mode=1", !0)
        mob.setRequestHeader("Accept", "application/json");
        mob.onreadystatechange = function () {
            if (4 === mob.readyState) {
                var mobjson = JSON.parse(mob.responseText);
                $("#lblMobileNo").text(mobjson[0].prePhone);
                $("#previewModel").modal("show");
            };
        }; mob.send();
    };
    $scope.uhdData;
    $scope.GetNoDuesUH = function () {
        var rflg = true; $("#hidreleaserFlag").val(rflg); $("#hidDept").val("UH");
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var uhd = new XMLHttpRequest;
        uhd.open("GET", $scope._Conpath + "NoDues/GetNoDues?empUnqId=" + $("#myEmpUnqId").val() + "&releaseFlag=true&dept=UH", true);
        uhd.setRequestHeader("Accept", "application/json"); uhd.onreadystatechange = function () {
            if (uhd.readyState === 4 && uhd.status === 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                const uhdJson = JSON.parse(uhd.responseText); $scope.noDuesData = uhdJson; $scope.uhdData = uhdJson; $scope.$digest();
            }
            else if (uhd.status === 400) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var str = uhd.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString(); var fields = str.split(','); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" +
                    er + "</strong></div>";
                $("#MessageBox").show();
            };
        };
        uhd.send();
    };
    $scope.PopupModelUH = function (empId) {
        const arr = $scope.uhdData;
        $scope.empArr;
        var eArr = new Array(); let noDuesDepts = new Array(); for (let i = 0; i < arr.length; i++) {
            if (empId === parseInt(arr[i].empUnqId)) {
                eArr[0] = arr[i]; $scope.empArr = eArr; noDuesDepts = $scope.empArr[0]["noDuesDepts"]; $scope.noDuesDepts = noDuesDepts;
                $scope.noDuesDepts = $filter("orderBy")($scope.noDuesDepts, "no"); break;
            };
        }; $("#ConformModel").modal("show");
    };
    $scope.GetNoDuesStatus = function (status, empid) {
        $("#loading").removeClass("deactivediv"); $("#loading").addClass("activediv");
        var sts = new XMLHttpRequest;
        if (status === true) { sts.open("GET", $scope._Conpath + "NoDues/GetNoDuesStatus?empUnqId=" + $("#myEmpUnqId").val(), true); }
        else { sts.open("GET", $scope._Conpath + "NoDues/GetNoDuesStatus", true); }
        sts.setRequestHeader("Accept", "application/json");
        sts.onreadystatechange = function () {
            if (sts.readyState === 4 && sts.status === 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var stsJson = JSON.parse(sts.responseText); $scope.statusData = stsJson; $scope.$digest();
                var f = new Array(); f[0] = $scope.statusData.noDuesStatus; $scope.sEmpData = f; $scope.$digest();
            } else { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); };
        }; sts.send();
    };
    $scope.InReleaseView = function (empid) {
        var IRV = new XMLHttpRequest;
        IRV.open("GET", $scope._Conpath + "NoDues/GetNoDuesStatus?empUnqId=" + empid, true);
        IRV.setRequestHeader("Accept", "application/json");
        IRV.onreadystatechange = function () {
            if (IRV.readyState === 4 && IRV.status === 200) {
                var IRVJson = JSON.parse(IRV.responseText);
                $scope.eData = IRVJson;
                $scope.$digest();
                $scope.empArr1;
                var eArr1 = new Array();
                var noDuesDepts1 = new Array();
                eArr1[0] = $scope.eData;
                $scope.empArr1 = eArr1;
                noDuesDepts1 = $scope.empArr1[0]["noDuesDepts"];
                $scope.noDuesDepts1 = noDuesDepts1;
                $scope.noDuesDepts1 = $filter("orderBy")($scope.noDuesDepts1, "no");
                $scope.$digest();
                $scope.MobieNO(empid);
            };
        }; IRV.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } }; });