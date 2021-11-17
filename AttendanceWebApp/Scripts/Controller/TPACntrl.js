var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("TPAController", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val();
    $scope.currentPage = 1; $scope.itemsPerPage = 10;
    var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $scope._Conpath = "";
    "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/")
    $scope.ResetView = function () {
        window.location.reload(!0)
    };
    jQuery.support.cors = true; $scope.exportObj;
    var d = new Date();
    var now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
    $scope.backDateCheck = function () {
        var fromDate = $("#fromDt").val();
        var tpaDate = new Date(fromDate);
        tpaDate = tpaDate.toISOString().split('T')[0];
        var now = new Date();
        now = now.toISOString().split('T')[0];
        if (tpaDate < now) {
            //$("#fromDt").val("");
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Back Date Entry not allowed.</strong>" + "</div>";
            $('#MessageBox').show();
            //alert("Back Date Entry not allowed.");
            /*return false;*/
        }
    };
    $scope.GetPreTpa = function (dtFlg) {
        document.getElementById("btnSearch").disabled = true;
        /*$("#tblTPAData").find("tr:not(:first)").remove();*/
        $scope.tpaData = "";
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var fromDate, toDate; fromDate = $("#fromDt").val(); toDate = $("#toDt").val();
        if (dtFlg) { if (fromDate === "" || toDate === "") { alert("Please Select From and to Date."); return false; }; }
        else {
            if (fromDate === "") { alert("Please Select TPA Date."); return false; } else { toDate = fromDate; };
            var tpaDate = new Date(fromDate); tpaDate = tpaDate.toISOString().split('T')[0];
            var now = new Date(); now = now.toISOString().split('T')[0];
            if (tpaDate < now) {
                //$("#fromDt").val("");
                alert("Back Date Entry not allowed.");
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Back Date Entry not allowed.</strong>" + "</div>";
                $('#MessageBox').show();
                //return false;
            };
        };
        var tpa = new XMLHttpRequest();
        tpa.open("GET", $scope._Conpath +
            "Tpa/getpretpa?fromDate=" + fromDate + "&toDate=" + toDate + "&empUnqId=" + $("#myEmpUnqId").val(), true);
        tpa.setRequestHeader("Accept", "application/json");
        tpa.onreadystatechange = function () {
            if (tpa.readyState === 4 && tpa.status === 200) {
                document.getElementById("btnSearch").disabled = false;
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(tpa.responseText);
                if (dtFlg) {
                    var newArr = json, myArray = [];
                    myArray.push([]);
                    myArray[0]["empUnqId"] = "EmpCode"; myArray[0]["empName"] = "EmpName";
                    var row = ''; row += "<tr><th>EmpCode</th><th>EmpName</th><th>Justification</th>";
                    for (var loopDate = new Date(fromDate); loopDate <= new Date(toDate); loopDate.setDate(loopDate.getDate() + 1)) {
                        var MyDateString = ('0' + loopDate.getDate()).slice(-2);
                        myArray[0][MyDateString] = MyDateString;
                        row += "<th>" + MyDateString + "</th>";
                    }; row += "</tr>";
                    var cnt = 1;
                    //var prevempid = ""; var loopDate = new Date();
                    //DINSTINCT EMPUNQID from json
                    var lookup = {}; var items = json; var result = [];
                    for (var item, i = 0; item = items[i++];) {
                        var emp = item.empUnqId;
                        if (!(emp in lookup)) {
                            lookup[emp] = 1;
                            result.push(emp);
                        }
                    }
                    //EMP ARR FOR LOOP
                    for (var e = 0; e < result.length; e++) {
                        //Get Employee wise date records
                        var empRowArr = [];
                        for (var m = 0; m < newArr.length; m++) {
                            var eid = newArr[m].empUnqId;
                            if (eid === result[e]) {
                                empRowArr.push(newArr[m]);
                            }
                        }
                        myArray.push([]);
                        myArray[cnt].empUnqId = empRowArr[e].empUnqId;
                        myArray[cnt].empName = empRowArr[e].empName;
                        row += "<tr>";
                        row += "<td>" + empRowArr[e].empUnqId + "</td><td>" + empRowArr[e].empName + "</td>";
                        row += "<td><input id='txtJustification' style='width:100px;' class='form-control'></td>";
                        //EMP DATE LOOP
                        for (var p = 0; p < empRowArr.length; p++) {
                            var loopDate = new Date(empRowArr[p].tpaDate)
                            var MyDateString = ('0' + loopDate.getDate()).slice(-2);
                            myArray[cnt][MyDateString] = "";
                            var g = cnt + MyDateString;
                            var f = empRowArr[p].id;
                            var rhours = empRowArr[p].requiredHours;
                            if (f !== 0) {
                                row += "<td><input id='" + g + "' style='width:45px;' class='form-control' value=" + rhours + " disabled><input type='hidden' id='hidId" + g + "' value=" + f + "></td>";
                            } else {
                                row += "<td><input id='" + g + "' style='width:45px;' class='form-control'><input type='hidden' id='hidId" + g + "' value='0'></td>";
                            };
                        };
                        row += "</tr>";
                        cnt++;
                        empRowArr = "";
                    }
                    //for (var i = 0; i < newArr.length; i++) {
                    //    var eid = newArr[i].empUnqId;
                    //    if (eid !== prevempid) {
                    //        myArray.push([]);
                    //        myArray[cnt].empUnqId = newArr[i].empUnqId;
                    //        myArray[cnt].empName = newArr[i].empName;
                    //        row += "<tr><td>" + myArray[cnt].empUnqId + "</td><td>" + myArray[cnt].empName + "</td>";
                    //        row += "<td><input id='txtJustification' style='width:100px;' class='form-control'></td>";
                    //        for (var loopDate = new Date(fromDate); loopDate <= new Date(toDate); loopDate.setDate(loopDate.getDate() + 1)) {
                    //            var MyDateString = ('0' + loopDate.getDate()).slice(-2);
                    //            myArray[cnt][MyDateString] = "";
                    //            var g = cnt + MyDateString;
                    //            //var f = newArr[dsb].id;
                    //            //if (f !== 0) {
                    //            row += "<td><input id='" + g + "' style='width:45px;' class='form-control' disabled></td>";
                    //            //} else {
                    //            //row += "<td><input id='" + g + "' style='width:45px;' class='form-control'></td>";
                    //            //}
                    //            //f++;
                    //        };
                    //        
                    //        cnt++;
                    //    }; prevempid = eid;
                    //};
                    row = $(row);
                    $("#tblTPAData").append(row);
                    $scope.tpaData = myArray;
                } else {
                    $scope.tpaData = json;
                }; $scope.$digest();
            } else if (tpa.status !== 200) {
                document.getElementById("btnSearch").disabled = false;
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var str = tpa.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString();
                var fields = str.split(','); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er + "</strong></div>";
                $("#MessageBox").show();
            }
        }; tpa.send();
    };
    $scope.PreTpaRequest = function (dtFlg) {
        document.getElementById("btnOK").disabled = true;
        var fromDate, toDate;
        fromDate = $("#fromDt").val();
        toDate = $("#toDt").val();
        var fdate = new Date(fromDate);
        fdate = fdate.toISOString().split('T')[0];
        var TableData = storeTblValues();
        function storeTblValues() {
            var TableData = new Array();
            var ind = 0, cnt = 0;
            if (dtFlg) {
                $('#tblTPAData tr').each(function (row, tr) {
                    for (var loopDate = new Date(fromDate); loopDate <= new Date(toDate); loopDate.setDate(loopDate.getDate() + 1)) {
                        var tpaDate = loopDate.toISOString().split('T')[0];
                        var MyDateString = ('0' + loopDate.getDate()).slice(-2);
                        var f = cnt + MyDateString;
                        TableData[ind] = {
                            "id": 0,
                            "empUnqId": $(tr).find('td:eq(0)').text(),
                            "tpaDate": tpaDate,
                            "tpaShiftCode": '',
                            "requiredHours": $("#" + f).val(),
                            "hidId": $("#hidId" + f).val(),
                            "preJustification": $(tr).find("td:eq(2) input").val(),
                            "releaseGroupCode": "OT",
                            "releaseStrategy": $(tr).find('td:eq(0)').text(),
                            "preReleaseStatusCode": "I",
                            "preRemarks": null,
                            "addDt": now,
                            "addUser": $("#myEmpUnqId").val()
                        }
                        ind++;
                    }
                    cnt++;
                });
                //TableData.shift(); TableData.shift(); TableData.shift();
                //TableData.splice(-3);
            } else {
                $('#tblTPAData tr').each(function (row, tr) {
                    TableData[row] = {
                        "id": 0,
                        "empUnqId": $(tr).find('td:eq(1)').text(),
                        "tpaDate": fdate,
                        "tpaShiftCode": $(tr).find('td:eq(6)').text(),
                        "requiredHours": $(tr).find("td:eq(7) input").val(),
                        "preJustification": $(tr).find("td:eq(8) input").val(),
                        "releaseGroupCode": "OT",
                        "releaseStrategy": $(tr).find('td:eq(1)').text(),
                        "preReleaseStatusCode": "I",
                        "preRemarks": null,
                        "addDt": now,
                        "addUser": $("#myEmpUnqId").val()
                    }
                });
                //TableData.shift();
                //TableData.splice(-1);
            }
            var jsonObj = new Array();
            var cnt = 0;
            for (var i = 0; i < TableData.length; i++) {
                if (TableData[i].empUnqId !== "") {
                    if (TableData[i].requiredHours !== "" &&
                        (typeof (TableData[i].requiredHours) !== "undefined") &&
                        parseInt(TableData[i].requiredHours) !== 0 &&
                        parseInt(TableData[i].requiredHours) > 1
                    ) {
                        if (dtFlg) {
                            if (parseInt(TableData[i].hidId) === 0) {
                                jsonObj[cnt] = TableData[i]; cnt++;
                            }
                        } else {
                            jsonObj[cnt] = TableData[i]; cnt++;
                        }

                    };
                };
            };
            return jsonObj;
        };

        var e = "";
        for (var i = 0; i < TableData.length; i++) {
            if (TableData[i].preJustification === "") {
                e += "Justification required for this Employee " + TableData[i].empUnqId + " TPA.";
            }
        }

        if (e !== "") {
            alert("Justification Required.");
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>" + e + "</strong></div>";
            $('#MessageBox').show();
            document.getElementById("btnOK").disabled = false;
            return false;
        }

        TableData = JSON.stringify(TableData);
        var xhr1 = new XMLHttpRequest();
        xhr1.open('POST', $scope._Conpath + 'Tpa/pretparequest?empUnqId=' + $("#myEmpUnqId").val(), true);
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4 && xhr1.status === 200) { TableData = ""; alert("Submitted"); $scope.ResetView(); }
            else if (xhr1.status === 400 || xhr1.status === 403 || xhr1.status === 404 || xhr1.status === 408 || xhr1.status === 500) {
                var str = xhr1.responseText.replace("[", '').replace("]", '').toString();
                var fields = str.split(',');
                var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>" + er + "</strong>" + "</div>";
                $('#MessageBox').show();
                document.getElementById("btnOK").disabled = false;
            };
        }; xhr1.send(TableData);
    };
    $scope.preData;
    $scope.GetPreRequestedList = function () {
        var pre = new XMLHttpRequest();
        pre.open("GET", $scope._Conpath + "Tpa/getprerequestedlist?empUnqId=" + $("#myEmpUnqId").val(), true);
        pre.setRequestHeader("Accept", "application/json");
        pre.onreadystatechange = function () {
            if (pre.readyState === 4 && pre.status === 200) {
                $('#loading').removeClass("activediv");
                $('#loading').addClass("deactivediv");
                var json = JSON.parse(pre.responseText);
                $scope.preData = json; $scope.$digest();
            } else if (pre.status !== 200) {
                $('#loading').removeClass("activediv");
                $('#loading').addClass("deactivediv");
                var str = pre.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString();
                var fields = str.split(',');
                var er = "";
                for (var i = 0; i < fields.length; i++) {
                    er = er + fields[i] + "<br/>";
                };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er +
                    "</strong></div>";
                $("#MessageBox").show();
            }
        }; pre.send();
    };
    $scope.PreApproval = function () {
        document.getElementById("btnOK").disabled = true;
        var preDataArr = new Array();
        preDataArr = $scope.preData;
        var TableData = storeTblValues();
        function storeTblValues() {
            var TableData = new Array();
            $('#tblTPAData tr').each(function (row, tr) {
                TableData[row] = {
                    "id": $(tr).find('td:eq(11)').text(),
                    "empUnqId": $(tr).find('td:eq(1)').text(),
                    "tpaDate": $(tr).find('td:eq(0)').text(),
                    "tpaShiftCode": $(tr).find('td:eq(6)').text(),
                    "requiredHours": $(tr).find("td:eq(7)").text(),
                    "preJustification": $(tr).find("td:eq(8)").text(),
                    "releaseGroupCode": "OT",
                    "releaseStrategy": $(tr).find('td:eq(1)').text(),
                    "preReleaseStatusCode": $(tr).find('td:eq(9) input').prop("checked"),
                    "preRemarks": $(tr).find('td:eq(10) input').val()
                }
            }); TableData.shift();
            TableData.splice(-1);
            return TableData;
        };
        for (var i = 0; i < TableData.length; i++) {
            var chkReleased = TableData[i].preReleaseStatusCode;
            var preRemarks = TableData[i].preRemarks;
            if (chkReleased === false && preRemarks === "") {
                alert("Remarks is mandatory if release check removed."); return false;
            }
        };   //Check Release Flag
        var approvedTPAArr = new Array(); var cnt = 0;
        for (var j = 0; j < preDataArr.length; j++) {
            var tpaRelStatus; tpaRelStatus = preDataArr[j].tpaReleaseStatus;
            for (var k = 0; k < TableData.length; k++) {
                if (parseInt(TableData[k].id) === tpaRelStatus[0].tpaSanctionId) {
                    approvedTPAArr[cnt] = tpaRelStatus[0];
                    if (TableData[k].preReleaseStatusCode === true) {
                        approvedTPAArr[cnt].preReleaseStatusCode = "F";
                    } else {
                        approvedTPAArr[cnt].preReleaseStatusCode = "R";
                    };
                    approvedTPAArr[cnt].preReleaseDate = now;
                    approvedTPAArr[cnt].preRemarks = TableData[k].preRemarks;
                    cnt++;
                    break;
                }
            }
        }
        var jsonObj = JSON.stringify(approvedTPAArr);
        var xhr1 = new XMLHttpRequest();
        xhr1.open('POST', $scope._Conpath + 'Tpa/preapproval', true);
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4 && xhr1.status === 200) {
                document.getElementById("btnOK").disabled = false;
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Approved..</strong>" + "</div>";
                $('#MessageBox').show();
                TableData = "";
                jsonObj = "";
                $scope.GetPreRequestedList();
            }
            else if (xhr1.status === 400 || xhr1.status === 403 || xhr1.status === 404 || xhr1.status === 408 || xhr1.status === 500) {
                document.getElementById("btnOK").disabled = false;
                TableData = "";
                jsonObj = "";
                var str = xhr1.responseText.replace("[", '').replace("]", '').toString();
                var fields = str.split(',');
                var er = "";
                for (var i = 0; i < fields.length; i++) {
                    er = er + fields[i] + "<br/>";
                };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>" + er + "</strong>" + "</div>";
                $('#MessageBox').show();
            };
        };
        xhr1.send(jsonObj);
    };
    $scope.GetPostTpa = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var gpt = new XMLHttpRequest();
        gpt.open("GET", $scope._Conpath + "Tpa/getposttpa?fromDate=" + $("#fromDt").val() + "&toDate=" + $("#toDt").val() + "&empUnqId=" + $("#myEmpUnqId").val(), true);
        gpt.setRequestHeader("Accept", "application/json");
        gpt.onreadystatechange = function () {
            if (gpt.readyState === 4 && gpt.status === 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(gpt.responseText);
                $scope.gptData = json;
                $scope.$digest();
            } else if (gpt.status !== 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var str = gpt.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString(); var fields = str.split(','); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er +
                    "</strong></div>"; $("#MessageBox").show();
            }
        }; gpt.send();
    };
    $scope.SanctionTpa = function () {
        var TableData = storeTblValues();
        function storeTblValues() {
            var TableData = new Array();
            $('#tblTPAData tr').each(function (row, tr) {
                TableData[row] = {
                    "id": $(tr).find("td:eq(13)").text(), "empUnqId": $(tr).find('td:eq(1)').text(),
                    "tpaDate": $(tr).find('td:eq(0)').text(), "requiredHours": $(tr).find('td:eq(4)').text(),
                    "actShiftCode": $(tr).find('td:eq(6)').text(), "wrkHours": $(tr).find('td:eq(7)').text(),
                    "sanctionTpa": $(tr).find("td:eq(11) input").val(), "postJustification": $(tr).find("td:eq(12) input").val(),
                    "releaseGroupCode": "OT", "releaseStrategy": $(tr).find('td:eq(1)').text(), "postReleaseStatusCode": "I",
                    "postRemarks": null, "calcOverTime": $(tr).find("td:eq(10)").text()
                }
            }); TableData.shift(); TableData.splice(-1);
            return TableData;
        };
        var jsonObj = new Array(); var cnt = 0;
        for (var i = 0; i < TableData.length; i++) {
            if (TableData[i].sanctionTpa >= 2) {
                jsonObj[cnt] = TableData[i]; cnt++;
            };
        };
        for (var j = 0; j < jsonObj.length; j++) {
            var requiredTPA = parseInt(jsonObj[j].requiredHours); var sanctionTPA = parseInt(jsonObj[j].sanctionTpa);
            var calcOverTime = parseInt(jsonObj[j].calcOverTime); var empUnqId = jsonObj[j].empUnqId;
            var tpaDate = jsonObj[j].tpaDate;
            var postJustification = jsonObj[j].postJustification;
            if (sanctionTPA > calcOverTime) {
                alert("Sanction TPA is not allow to greater of actual tpa hours for this Employee " + empUnqId + " TPA Date " + tpaDate);
                return false; break;
            }
            if (sanctionTPA > requiredTPA && postJustification === "") {
                alert("Justification required for this Employee " + empUnqId + " TPA Date " + tpaDate); return false; break;
            }
        };
        TableData = JSON.stringify(jsonObj);
        var san = new XMLHttpRequest(); san.open('POST', $scope._Conpath + 'Tpa/sanctiontpa?empUnqId=' + $("#myEmpUnqId").val(), true);
        san.setRequestHeader("Content-type", "application/json"); san.onreadystatechange = function () {
            if (san.readyState === 4 && san.status === 200) { TableData = ""; alert("Submitted.."); $scope.ResetView(); }
            else if (san.status === 400 || san.status === 403 || san.status === 404 || san.status === 408 || san.status === 500) {
                var str = san.responseText.replace("[", '').replace("]", '').toString(); var fields = str.split(','); var er = ""; for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; }; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>" + er + "</strong>" + "</div>"; $('#MessageBox').show();
            };
        }; san.send(TableData);
    };
    $scope.posData; $scope.GetSanctionList = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var pos = new XMLHttpRequest();
        pos.open("GET", $scope._Conpath + "Tpa/getsanctionlist?empUnqId=" + $("#myEmpUnqId").val(), true);
        pos.setRequestHeader("Accept", "application/json");
        pos.onreadystatechange = function () {
            if (pos.readyState === 4 && pos.status === 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(pos.responseText); $scope.posData = json; $scope.$digest();
            } else if (pos.status !== 200) { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); var str = pos.responseText.replace("[", '').replace("]", '').replace("{", '').replace("}", '').toString(); var fields = str.split(','); var er = ""; for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; }; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er + "</strong></div>"; $("#MessageBox").show(); };
        }; pos.send();
    };
    $scope.PostApproval = function () {
        var postDataArr = new Array(); postDataArr = $scope.posData;
        var TableData = storeTblValues(); function storeTblValues() { var TableData = new Array(); $('#tblTPAData tr').each(function (row, tr) { TableData[row] = { "id": $(tr).find('td:eq(0)').text(), "empUnqId": $(tr).find('td:eq(2)').text(), "tpaDate": $(tr).find('td:eq(1)').text(), "postReleaseStatusCode": $(tr).find('td:eq(11) input').prop("checked"), "postRemarks": $(tr).find('td:eq(12) input').val() } }); TableData.shift(); TableData.shift(); TableData.splice(-1); return TableData; };
        for (var i = 0; i < TableData.length; i++) { var chkReleased = TableData[i].postReleaseStatusCode; var postRemarks = TableData[i].postRemarks; if (chkReleased === false && postRemarks === "") { alert("Remarks is mandatory if release check removed."); return false; } }; //Check Release Flag
        var approvedTPAArr = new Array(); var cnt = 0;
        for (var j = 0; j < postDataArr.length; j++) {
            var tpaRelStatus; tpaRelStatus = postDataArr[j].tpaReleaseStatus;
            for (var k = 0; k < TableData.length; k++) {
                if (parseInt(TableData[k].id) === tpaRelStatus[0].tpaSanctionId) {
                    approvedTPAArr[cnt] = tpaRelStatus[0];
                    if (TableData[k].postReleaseStatusCode === true) { approvedTPAArr[cnt].postReleaseStatusCode = "F"; } else { approvedTPAArr[cnt].postReleaseStatusCode = "R"; };
                    approvedTPAArr[cnt].postReleaseDate = now; approvedTPAArr[cnt].postRemarks = TableData[k].postRemarks; cnt++; break;
                }
            }
        }
        var jsonObj = JSON.stringify(approvedTPAArr);
        var xhr2 = new XMLHttpRequest(); xhr2.open('POST', $scope._Conpath + 'Tpa/postapproval', true); xhr2.setRequestHeader("Content-type", "application/json"); xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4 && xhr2.status === 200) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Approved..</strong>" + "</div>"; $('#MessageBox').show(); TableData = ""; jsonObj = ""; $scope.GetSanctionList(); }
            else if (xhr2.status === 400 || xhr2.status === 403 || xhr2.status === 404 || xhr2.status === 408 || xhr2.status === 500) { var str = xhr2.responseText.replace("[", '').replace("]", '').toString(); var fields = str.split(','); var er = ""; for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; }; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>" + er + "</strong>" + "</div>"; $('#MessageBox').show(); };
        }; xhr2.send(jsonObj);
    };
    $scope.sanctionreport = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var fromDt = $("#fromDt").val();
        var toDt = $("#toDt").val();
        var san = new XMLHttpRequest();
        san.open("GET", $scope._Conpath + "Tpa/sanctionreport?fromDate=" + fromDt + "&toDate=" + toDt, true);
        san.setRequestHeader("Accept", "application/json");
        san.onreadystatechange = function () {
            if (san.readyState === 4 && san.status === 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(san.responseText);
                $scope.sanData = json;
                $scope.$digest();
                var sanArr = json; var myArray = []; var Reason = "";
                for (var l = 0; l < sanArr.length; l++) {
                    myArray.push([]);
                    myArray[l]["EmpUnqID"] = sanArr[l].empUnqId;
                    myArray[l]["SanctionTPAReleaseDate"] = sanArr[l].tpaReleaseStatus[0].postReleaseDate.substring(0, sanArr[l].tpaReleaseStatus[0].postReleaseDate.indexOf("T"));
                    myArray[l]["SanDate"] = sanArr[l].tpaDate.substring(0, sanArr[l].tpaDate.indexOf("T"));
                    myArray[l]["InTime"] = "";
                    myArray[l]["OutTime"] = "";
                    myArray[l]["ShiftCode"] = "";
                    myArray[l]["TPAHours"] = sanArr[l].sanctionTpa;
                    Reason = sanArr[l].preJustification;
                    if (Reason === null || Reason === "") {
                        myArray[l]["Reason"] = sanArr[l].postJustification;
                    } else {
                        myArray[l]["Reason"] = sanArr[l].preJustification;
                    }
                };
                $scope.sanObj = myArray;
                $scope.sanObj = $filter('orderBy')($scope.sanObj, 'SanDate');
                $scope.exportObj = $scope.sanObj;
                $scope.$digest();
            } else { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); };
        }; san.send();
    };
    $scope.TpaReport = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var fromDt = $("#fromDt").val();
        var toDt = $("#toDt").val();
        var san = new XMLHttpRequest();
        san.open("GET", $scope._Conpath + "Tpa/TpaReport?fromDate=" + fromDt + "&toDate=" + toDt + "&empUnqId=" + $("#myEmpUnqId").val(), true);
        san.setRequestHeader("Accept", "application/json");
        san.onreadystatechange = function () {
            if (san.readyState === 4 && san.status === 200) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                var json = JSON.parse(san.responseText);
                $scope.relTPAData = json;
                $scope.$digest();
                var sanArr = json; var myArray = []; var appreleasearr = new Array();
                for (var l = 0; l < sanArr.length; l++) {
                    appreleasearr = sanArr[l].tpaReleaseStatus;
                    myArray.push([]);
                    myArray[l]["AppDate"] = sanArr[l].addDt.substring(0, sanArr[l].addDt.indexOf("T"));
                    myArray[l]["EmpUnqID"] = sanArr[l].empUnqId;
                    myArray[l]["EmpName"] = sanArr[l].empName;
                    myArray[l]["Station"] = sanArr[l].statName;
                    myArray[l]["Category"] = sanArr[l].catName;
                    myArray[l]["Designation"] = sanArr[l].desgName;
                    myArray[l]["TPADate"] = sanArr[l].tpaDate.substring(0, sanArr[l].tpaDate.indexOf("T"));
                    var actShiftCode = sanArr[l].actShiftCode;
                    if (actShiftCode === null) { myArray[l]["ActualShift"] = ""; } else { myArray[l]["ActualShift"] = actShiftCode; };
                    myArray[l]["RequiredHours"] = sanArr[l].requiredHours;
                    myArray[l]["PreJustification"] = sanArr[l].preJustification;
                    myArray[l]["PreReleaseStatus"] = sanArr[l].preReleaseStatusCode;
                    myArray[l]["SanctionTpa"] = sanArr[l].sanctionTpa;
                    var postJustification = sanArr[l].postJustification;
                    if (postJustification === null) { myArray[l]["SanctionJustification"] = ""; } else { myArray[l]["SanctionJustification"] = postJustification; };
                    var postReleaseStatusCode = sanArr[l].postReleaseStatusCode;
                    if (postReleaseStatusCode === null) { myArray[l]["SanctionReleaseStatus"] = ""; } else { myArray[l]["SanctionReleaseStatus"] = postReleaseStatusCode; };
                    for (var i = 0; i < appreleasearr.length; i++) {
                        var r_preReleaseDate, r_postReleaseDate, r_postReleaseStatusCode = "";
                        r_preReleaseDate = appreleasearr[i].preReleaseDate;
                        if (r_preReleaseDate === null) { r_preReleaseDate = ""; };
                        r_postReleaseDate = appreleasearr[i].postReleaseDate;
                        if (r_postReleaseDate === null) { r_postReleaseDate = ""; };
                        r_postReleaseStatusCode = appreleasearr[i].postReleaseStatusCode;
                        if (r_postReleaseStatusCode === null) { r_postReleaseStatusCode = ""; };
                        if (i === 0) {
                            myArray[l]["1_ReleaseLevel"] = appreleasearr[i].releaseStrategyLevel;
                            myArray[l]["1_PreReleaser"] = appreleasearr[i].preReleaseAuth;
                            myArray[l]["1_PreReleaserName"] = appreleasearr[i].preReleaseName;
                            myArray[l]["1_PreReleaseDate"] = r_preReleaseDate;
                            myArray[l]["1_PreReleaseStatus"] = appreleasearr[i].preReleaseStatusCode;
                            myArray[l]["1_SanctionReleaser"] = appreleasearr[i].postReleaseAuth;
                            myArray[l]["1_SanctionReleaserName"] = appreleasearr[i].postReleaseName;
                            myArray[l]["1_SanctionReleaseDate"] = r_postReleaseDate;
                            myArray[l]["1_SanctionReleaseStatus"] = r_postReleaseStatusCode;
                        } else if (i === 1) {
                            myArray[l]["2_ReleaseLevel"] = appreleasearr[i].releaseStrategyLevel;
                            myArray[l]["2_PreReleaser"] = appreleasearr[i].preReleaseAuth;
                            myArray[l]["2_PreReleaserName"] = appreleasearr[i].preReleaseName;
                            myArray[l]["2_PreReleaseDate"] = r_preReleaseDate;
                            myArray[l]["2_PreReleaseStatus"] = appreleasearr[i].preReleaseStatusCode;
                            myArray[l]["2_SanctionReleaser"] = appreleasearr[i].postReleaseAuth;
                            myArray[l]["2_SanctionReleaserName"] = appreleasearr[i].postReleaseName;
                            myArray[l]["2_SanctionReleaseDate"] = r_postReleaseDate;
                            myArray[l]["2_SanctionReleaseStatus"] = r_postReleaseStatusCode;
                        } else if (i === 2) {
                            myArray[l]["3_ReleaseLevel"] = appreleasearr[i].releaseStrategyLevel;
                            myArray[l]["3_PreReleaser"] = appreleasearr[i].preReleaseAuth;
                            myArray[l]["3_PreReleaserName"] = appreleasearr[i].preReleaseName;
                            myArray[l]["3_PreReleaseDate"] = r_preReleaseDate;
                            myArray[l]["3_PreReleaseStatus"] = appreleasearr[i].preReleaseStatusCode;
                            myArray[l]["3_SanctionReleaser"] = appreleasearr[i].postReleaseAuth;
                            myArray[l]["3_SanctionReleaserName"] = appreleasearr[i].postReleaseName;
                            myArray[l]["3_SanctionReleaseDate"] = r_postReleaseDate;
                            myArray[l]["3_SanctionReleaseStatus"] = r_postReleaseStatusCode;
                        }
                    }
                };
                $scope.sanObj = myArray;
                $scope.sanObj = $filter('orderBy')($scope.sanObj, 'TPADate');
                $scope.exportObj = $scope.sanObj;
                $scope.$digest();
            } else { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); };
        }; san.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    $scope.exportAllData = function (name) { setTimeout(function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = name + d; $scope.JSONToCSVConvertor($scope.exportObj, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv") }, 100) };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (CSV += ReportTitle + "\r\n\n", ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) row += '"' + arrData[i][index] + '",'; row.slice(0, row.length - 1), CSV += row + "\r\n" } if ("" === CSV) return void alert("Invalid data"); var fileName = ""; fileName += ReportTitle.replace(/ /g, "_"); var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link) };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });