angular.module("myApp.Controllers").controller("ReleaseStreategyCntrloller", ["$scope", "$http", function ($scope, $http) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(), $scope.alluserlist = [];
    var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname, urlprotocol = url.protocol; var url_port = url.port;
    $scope._Conpath = ''; var loc = $("#myLoc").val();
    $(document).ready(function () {
        "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/");
    });
    $scope.ResetView = function () {
        window.location.reload(!0);
    }; jQuery.support.cors = !0;
    $scope.GetEmpInfo = function () {
        $("#tbl_empdtl").show();
        var e_Code = $("#eCode").val().trim();
        if ("" === e_Code) return document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Employee Code First.. </strong></div>",
            $("#MessageBox").show(), !1;
        var emp = new XMLHttpRequest();
        emp.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + e_Code, !0),
            emp.setRequestHeader("Accept", "application/json"), emp.onreadystatechange = function () {
                if (4 === emp.readyState) {
                    var json1 = JSON.parse(emp.responseText);
                    $scope.empdata = json1;
                    var rel = new XMLHttpRequest();
                    rel.open("GET", $scope._Conpath + "ReleaseStrategy/GetReleaseStrategy?releaseGroup=" + $("#releaseGroupCode").val() + "&empUnqId=" + e_Code, !0),
                        rel.setRequestHeader("Accept", "application/json"), rel.onreadystatechange = function () {
                            if (4 === rel.readyState) {
                                var jsonvar1 = JSON.parse(rel.responseText);
                                $scope.rlsdata = jsonvar1, $scope.$digest();
                            }
                        }, rel.send(), $scope.$digest();
                } else 200 !== emp.status && (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>",
                    $("#MessageBox").show());
            }, emp.send();
    };
    $scope.PopulateData = function () {
        $("#ConformModel").modal("show");
    };
    $scope.GetReleaserInfo = function () {
        $("#tbl_rlsdtl").show();
        var rls_Code = $("#Rel_Empid").val().trim();
        if ("" === rls_Code) return document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Releaser Employee Code.. </strong></div>",
            $("#MessageBox").show(), !1;
        var rls = new XMLHttpRequest();
        rls.open("GET", $scope._Conpath + "ChangeRelease/GetReleaseAuth?empunqid=" + rls_Code, !0),
            rls.setRequestHeader("Accept", "application/json"), rls.onreadystatechange = function () {
                if (4 === rls.readyState) for (var json2 = JSON.parse(rls.responseText), arr = json2, myArray = [], i = 0; i < arr.length; i++) {
                    var str = arr[i].releaseCode, n = str.includes("GP_");
                    if (n === !1 && (6 === str.length || 8 === str.length) && str === rls_Code) {
                        myArray.push([]),
                            myArray[0].releaseCode = arr[i].releaseCode,
                            myArray[0].empUnqId = arr[i].empUnqId,
                            myArray[0].empName = arr[i].empName,
                            $scope.rdata = myArray, $scope.$digest();
                        break;
                    }
                } else 200 !== rls.status && (document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>",
                    $("#MessageBox").show());
            }, rls.send();
    };
    $scope.AddReleaser = function (data) {
        var tables = document.getElementById("aliasTable"), rowCounts = tables.rows.length;
        if ($scope.rdata.length > 0) for (var rls = $scope.rdata, rlscode = data, rls_Code = $("#Rel_Empid").val().trim(), i = 0; i <= rls.length; i++) {
            var r_code = rls[i].releaseCode, r_empid = rls[i].empUnqId;
            if (r_code === rlscode && r_empid === rls_Code) {
                var row = $("<tr><td style='text-align:center;'><input type='hidden' name='releaseStrategy' value='" + $("#eCode").val().trim() + "'>" + $("#eCode").val().trim() + "</td><td style='text-align:center;'><input type='hidden' name='releaseStrategyLevel' value='" + rowCounts + "'>" + rowCounts + "</td><td style='text-align:center;'><input type='hidden' name='releaseCode' value='" + $scope.rdata[i].releaseCode + "'>" + $scope.rdata[i].releaseCode + "</td><td style='text-align:center;'><input type='hidden' name='empName' value='" + $scope.rdata[i].empName + "'>" + $scope.rdata[i].empName + "</td></tr>");
                return $("#aliasTable").append(row), jQuery("#btnClose").click(), document.getElementById("Rel_Empid").value = "",
                    void $("#tbl_rlsdtl").find("tr:not(:first)").remove();
            }
        }
    };
    $scope.RemoveReleaser = function () {
        var index = $scope.rlsdata.releaseStrategyLevels.indexOf($scope.rlsdata.releaseStrategyLevels.releaseStrategyLevel);
        $scope.rlsdata.releaseStrategyLevels.splice(index, 1);
    };
    $scope.CreateReleaseStrategy = function () {
        function storeTblValues() {
            var TableData = new Array();
            return $("#aliasTable tr").each(function (row, tr) {
                TableData[row] = {
                    releaseGroupCode: "LA",
                    releaseStrategy: $(tr).find("td:eq(0)").text(),
                    releaseStrategyLevel: $(tr).find("td:eq(1)").text(),
                    releaseCode: $(tr).find("td:eq(2)").text(),
                    isFinalRelease: "false"
                };
            }), TableData.shift(), same === !0 ? (TableData[0].releaseGroupCode = "LA", jsonObj.releaseGroupCode = "LA") : (TableData[0].releaseGroupCode = $("#releaseGroupCode").val(), jsonObj.releaseGroupCode = $("#releaseGroupCode").val()), jsonObj.releaseStrategy = $scope.empdata[0].empUnqId, jsonObj.releaseStrategyName = $scope.empdata[0].empName, jsonObj.releaseStrategyLevels = TableData, jsonObj.UpdDt = now, jsonObj.UpdUser = $("#myEmpUnqId").val(), jsonObj;
        }
        var d2 = new Date(), today = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes(), d2.getSeconds()), now = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(), tables = document.getElementById("aliasTable"), rowCounts = tables.rows.length;
        if (1 >= rowCounts) return document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Please Select At least One Releaser..</strong></div>", $("#MessageBox").show(), !1;
        var same = !1;
        $("#chkSameForAll").prop("checked") === !0 && (same = !0);
        var jsonObj = {}, TableData = storeTblValues(), odData = new Array();
        odData[0] = TableData, TableData = JSON.stringify(TableData);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", $scope._Conpath + "ChangeRelease/ChangeReleaseStrategy", !0),
            xhr.setRequestHeader("Content-type", "application/json"),
            xhr.onreadystatechange = function () {
                if (4 === xhr.readyState && 200 === xhr.status) {
                    var msgRls = $("#releaseGroupCode option:selected").text();
                    if (document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" +
                        msgRls + " Release Strategy Saved..</strong></div>",
                        $("#MessageBox").show(),
                        $("#aliasTable").find("tr:not(:first)").remove(),
                        $("#tbl_rlsdtl").find("tr:not(:first)").remove(),
                        document.getElementById("eCode").value = "",
                        document.getElementById("Rel_Empid").value = "",
                        same === !0) {
                        for (var i = 0; i < odData.length; i++) {
                            odData[i].releaseGroupCode = "OD";
                            for (var odRlsLvl = odData[i].releaseStrategyLevels, j = 0; j < odRlsLvl.length; j++)
                                odRlsLvl[j].releaseGroupCode = "OD";
                            odData[i].releaseStrategyLevels = odRlsLvl;
                        }
                        var ssData = new Array();
                        ssData[0] = odData[0],
                            odData = JSON.stringify(odData[0]);

                        //Ooudoor Duty
                        var odr = new XMLHttpRequest();
                        odr.open("POST", $scope._Conpath + "ChangeRelease/ChangeReleaseStrategy", !0),
                            odr.setRequestHeader("Content-type", "application/json"),
                            odr.onreadystatechange = function () {
                                if (4 === odr.readyState && 200 === odr.status) {
                                    document.getElementById("MessageBoxOD").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>OD Release Strategy Saved..</strong></div>",
                                        $("#MessageBoxOD").show();
                                    for (var k = 0; k < ssData.length; k++) {
                                        ssData[k].releaseGroupCode = "SS";
                                        for (var ssRlsLvl = ssData[k].releaseStrategyLevels, l = 0; l < ssRlsLvl.length; l++) ssRlsLvl[l].releaseGroupCode = "SS";
                                        ssData[k].releaseStrategyLevels = ssRlsLvl;
                                    }
                                    var ndData = new Array();
                                    ndData[0] = ssData[0], ssData = JSON.stringify(ssData[0]);

                                    //Shift Schedule
                                    var ssr = new XMLHttpRequest();
                                    ssr.open("POST", $scope._Conpath + "ChangeRelease/ChangeReleaseStrategy", !0), ssr.setRequestHeader("Content-type", "application/json"),
                                        ssr.onreadystatechange = function () {
                                            4 === ssr.readyState && 200 === ssr.status && (document.getElementById("MessageBoxSS").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Shift Schedule Release Strategy Saved..</strong></div>",
                                                $("#MessageBoxSS").show());
                                            for (var m = 0; m < ndData.length; m++) {
                                                ndData[m].releaseGroupCode = "ND";
                                                for (var ndRlsLvl = ndData[m].releaseStrategyLevels, n = 0; n < ndRlsLvl.length; n++) ndRlsLvl[n].releaseGroupCode = "ND";
                                                ndData[m].releaseStrategyLevels = ndRlsLvl;
                                            }
                                            ndData = JSON.stringify(ndData[0]);

                                            //NO Dues
                                            var ndr = new XMLHttpRequest();
                                            ndr.open("POST", $scope._Conpath + "ChangeRelease/ChangeReleaseStrategy", !0), ndr.setRequestHeader("Content-type", "application/json"),
                                                ndr.onreadystatechange = function () {
                                                    4 === ndr.readyState && 200 === ndr.status && (document.getElementById("MessageBoxND").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>No Dues Release Strategy Saved..</strong></div>",
                                                        $("#MessageBoxND").show());
                                                }, ndr.send(ndData);
                                        }, ssr.send(ssData);
                                }
                            }, odr.send(odData);
                    }
                } else document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Release Strategy Not Saved..</strong></div>",
                    $("#MessageBox").show(), document.getElementById("eCode").value = "", document.getElementById("Rel_Empid").value = "";
            }, xhr.send(TableData);
    };
    $scope.UploadTemplate = function (flg) {
        var data = new FormData();
        if (flg) {
            $("#loadingGP").removeClass("deactivediv"); $("#loadingGP").addClass("activediv");
            //Upload Gate pass release strategies;
            var filesGP = $("#filesGP").get(0).files; if (filesGP.length > 0) { for (g = 0; g < filesGP.length; g++) { data.append("UploadedFile", filesGP[g]); } };
            $.ajax({
                type: "POST",
                url: $scope._Conpath + "ReleaseStrategy/uploadgprel",
                contentType: false,
                processData: false,
                data: data,
                success: function (result) {
                    $("#loadingGP").removeClass("activediv"); $("#loadingGP").addClass("deactivediv");
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>File Uploaded Successfully...</strong></div>"; $("#MessageBox").show();
                },
                error: function (err) {
                    $("#loadingGP").removeClass("activediv"); $("#loadingGP").addClass("deactivediv");
                    var errer = err.responseText.replace(/\"/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\[/g, "").replace(/\]/g, "");
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong> Error :~ " + errer + "<br/>" + "</strong></div>"; $("#MessageBox").show();
                }
            });
        } else if (flg === false) {
            $("#loading").removeClass("deactivediv"); $("#loading").addClass("activediv");
            //Upload Leave, OD, Shift Schedule, No Dues. release strategies;
            var files = $("#files").get(0).files; if (files.length > 0) { for (f = 0; f < files.length; f++) { data.append("UploadedFile", files[f]); } };
            $.ajax({
                type: "POST", url: $scope._Conpath + "ReleaseStrategy/UploadRelStr", contentType: false, processData: false,
                data: data,
                success: function (result) {
                    $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
                    document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>File Uploaded Successfully...</strong></div>"; $("#MessageBox").show();
                },
                error: function (err) {
                    $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
                    var errer = err.responseText.replace(/\"/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\[/g, "").replace(/\]/g, "");
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-danger alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong> Error :~ " + errer + "<br/>" +
                        "</strong></div>";
                    $("#MessageBox").show();
                }
            });
        };
    };
}]);