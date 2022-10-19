var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("EmpExitProcessController", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val();
    $scope.currentPage = 1; $scope.itemsPerPage = 10;
    $scope._Conpath = ""; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol;
    $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") });
    $scope.ResetView = function () { window.location.reload(!0) };
    jQuery.support.cors = true; var rlsarr = []; var d = new Date(); $scope.resData; $scope.exportObj;
    $scope.GetReleaseStrategy = function () {
        var rel = new XMLHttpRequest();
        rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() + '&empUnqId=' + $('#myEmpUnqId').val(), true);
        rel.setRequestHeader('Accept', 'application/json');
        rel.onreadystatechange = function () {
            if (rel.readyState === 4) {
                var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.$digest();
            }
        }; rel.send();
    };
    $scope.GetEmpInfo = function () {
        $("#tbl_empdtl").show();
        var e_Code = $("#eCode").val();
        if ("" === e_Code) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Employee Code First.. </strong></div>";
            $("#MessageBox").show();
            return false;
        };
        var emp = new XMLHttpRequest;
        emp.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + $("#eCode").val(), !0);
        emp.setRequestHeader("Accept", "application/json");
        emp.onreadystatechange = function () {
            if (4 === emp.readyState) {
                var json1 = JSON.parse(emp.responseText);
                $scope.empdata = json1;
                $scope.$digest();
            } else if (200 !== emp.status) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>";
                $("#MessageBox").show();
            };
        }; emp.send();
    };
    $scope.GetUserInfo = function () {
        xhr = new XMLHttpRequest;
        xhr.open("GET", $scope._Conpath + "Employee/GetEmployee?empunqid=" + $("#myEmpUnqId").val(), !0);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                var json = JSON.parse(xhr.responseText);
                $scope.Udata = json;
                $scope.$digest();
                $scope.GetUserPerasonalInfo();
            };
        }; xhr.send();
    };
    $scope.GetUserPerasonalInfo = function () {
        per = new XMLHttpRequest;
        per.open("GET", $scope._Conpath + "Employee/GetEmpDetails?empunqid=" + $("#myEmpUnqId").val() + "&mode=1", !0);
        per.setRequestHeader("Accept", "application/json");
        per.onreadystatechange = function () {
            if (4 === per.readyState) {
                var json = JSON.parse(per.responseText);
                $scope.Uperdata = json;
                var df = $scope.Uperdata[0].joinDt;
                var k = new Date(df);
                var cs = ((k.getDate()) + "-" + (k.getMonth() + 1) + "-" + (k.getFullYear()));
                $("#lblJoinDate").text(cs);
                $scope.$digest();
            };
        };
        per.send();
    };
    $scope.setRelieveDate = function () {
        var RelieveDate = $("#relieveDate").val();
        $("#lblReleiveDate").text(RelieveDate);
    };
    $scope.setMode = function () {
        var mode = $("#cmbMode").val();
        if (mode === "M") {
            $("#divManual").show();
            $("#divTemplate").hide();
        }
        if (mode === "T") {
            $("#divTemplate").show();
            $("#divManual").hide();
            $scope.GetUserInfo();
        }
    };
    $scope.setOtherReason = function (reason) {
        var mode = $("#cmbMode").val();
        if (mode === "M") {
            if (reason === "Other") { document.getElementById("txtReasonOtherManual").disabled = false; }
            else { document.getElementById("txtReasonOtherManual").disabled = true; };
        };
        if (mode === "T") {
            if (reason === "Other") { document.getElementById("txtReasonOther").disabled = false; }
            else { document.getElementById("txtReasonOther").disabled = true; };
        };
    };
    $scope.ExitProcessGenerate = function (entity) {
        if ((typeof (entity) === "undefined") || (typeof (entity.Mode) === "undefined")) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please fill all details..</strong></div>";
            $('#MessageBox').show();
            return false;
        }
        var mode = entity.Mode;
        if (mode === "M") {
            if ((typeof (entity.ReasonManual) === "undefined") || (typeof (entity.RelieveDateManual) === "undefined") ||
                (typeof (entity.ResignText) === "undefined")) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Please fill all details.</strong></div>";
                $('#MessageBox').show();
                return false;
            }
        }
        if (mode === "T") {
            if ((typeof (entity.Reason) === "undefined") || (typeof (entity.RelieveDate) === "undefined")) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Please fill all details.</strong></div>";
                $('#MessageBox').show();
                return false;
            }
        }
        document.getElementById("btnOK").disabled = true;
        var d = new Date(); var now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        var reason = "", reasonOther = "", relieveDate, resignationText = "";
        jsonObj = {};
        jsonObj.EmpUnqId = $("#myEmpUnqId").val();
        jsonObj.ApplicationDate = now;
        jsonObj.Mode = mode;
        if (mode === "M") {
            jsonObj.Reason = entity.ReasonManual;
            if ((typeof (entity.ReasonOtherManual) === "undefined")) { jsonObj.ReasonOther = ""; } else { jsonObj.ReasonOther = entity.ReasonOtherManual; };
            jsonObj.RelieveDate = entity.RelieveDateManual;
            jsonObj.ResignText = entity.ResignText;
        }
        if (mode === "T") {
            jsonObj.Reason = entity.Reason;
            if ((typeof (entity.ReasonOther) === "undefined")) { jsonObj.ReasonOther = ""; } else { jsonObj.ReasonOther = entity.ReasonOther; };
            jsonObj.RelieveDate = entity.RelieveDate;
            jsonObj.ResignText = "";
        }
        jsonObj = JSON.stringify(jsonObj);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', $scope._Conpath + 'EmpSeparation/Resign', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //Auto Mail Sending
                var json = JSON.parse(xhr.responseText);
                var maildata = [];
                maildata = json;
                var relsdata = [];
                relsdata = maildata["applReleaseStatus"];
                var relsauth = relsdata[0]["releaseAuth"];
                var rlsmail = new XMLHttpRequest();
                rlsmail.open("GET", $scope._Conpath + "AutoMail/SendMailResignation?id=" + relsdata[0]["applicationId"] + "&furtherReleaser=false&empUnqId=" + relsauth, true);
                rlsmail.setRequestHeader("Content-type", "application/json");
                rlsmail.send();
                //Auto Mail End
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Created Sucesfully.. </strong></div>"; $('#MessageBox').show();
                $("#cmbMode option:first").attr("selected", true);
                if (mode === "M") {
                    $("#cmbReasonManual option:first").attr("selected", true); document.getElementById("txtResignationText").value = "";
                    document.getElementById("txtReasonOtherManual").value = ""; document.getElementById("relieveDateManual").value = "";
                }
                if (mode === "T") {
                    $("#cmbReason option:first").attr("selected", true); document.getElementById("txtReasonOther").value = "";
                    document.getElementById("relieveDate").value = ""; document.getElementById("lblReleiveDate").innerHTML = "";
                }
            } else {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Not Created.. </strong></div>";
                $('#MessageBox').show();
            };
        }; xhr.send(jsonObj);
    };
    $scope.GetExitProcessList = function () {
        var epl = new XMLHttpRequest();
        epl.open("GET", $scope._Conpath + "AppRelease/GetApplReleaseStatus?empUnqId=" + $("#myEmpUnqId").val() + "&releaseGroupCode=" + $("#releaseGroupCode").val(), true);
        epl.setRequestHeader('Accept', 'application/json');
        epl.onreadystatechange = function () {
            if (epl.readyState === 4) {
                var json = JSON.parse(epl.responseText);
                rlsarr = json;
                $scope.data = json;
                //$scope.data = $filter('orderBy')($scope.data, '-addDt');
                $scope.currentPage = 0;
                $scope.itemsPerPage = 10;
                $scope.$digest();
            }
        }; epl.send();
    };//Get Pending List of Exit Process
    $scope.UpdateReleaseStatus = function (releaseStatusCode, id, data) {
        var rmks = ''; if (releaseStatusCode === "R") {
            if ((typeof (data) === "undefined") || (typeof (data.Remarks) === "undefined")) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Please Enter Remarks First For Rejection</strong></div>"; $('#MessageBox').show(); return false;
            } else { rmks = data.Remarks; };
        } else { if ((typeof (data) === "undefined")) { rmks = ""; } else { rmks = data.Remarks; }; };
        var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        var detailarr = []; for (var r = 0; r <= rlsarr.length; r++) { var appid = rlsarr[r]["id"]; if (appid === id) { detailarr = rlsarr[r]["applReleaseStatus"]; break; }; };
        //Get ReleaseCode of Releaser
        var dataarr = []; for (i = 0; i < detailarr.length; i++) { var r_auth = detailarr[i]["releaseAuth"]; if (r_auth === $('#myEmpUnqId').val()) { dataarr = detailarr[i]; break; }; };
        var jsonObj = {};
        jsonObj.YearMonth = detailarr[0].yearMonth;
        jsonObj.ReleaseGroupCode = detailarr[0].releaseGroupCode;
        jsonObj.ApplicationId = id;
        jsonObj.ReleaseStrategy = detailarr[0].releaseStrategy;
        jsonObj.ReleaseStrategyLevel = detailarr[0].releaseStrategyLevel;
        jsonObj.ReleaseCode = dataarr.releaseCode;
        jsonObj.ReleaseStatusCode = detailarr[0].releaseStatusCode;
        jsonObj.ReleaseDate = strDate;
        jsonObj.ReleaseAuth = dataarr.releaseAuth;
        jsonObj.IsFinalRelease = dataarr.isFinalRelease;
        jsonObj.Remarks = rmks;
        jsonObj.LeaveApplications_YearMonth = null;
        jsonObj.LeaveApplications_LeaveAppId = null;
        jsonObj = JSON.stringify(jsonObj);
        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST', $scope._Conpath + 'AppRelease/UpdateGpStatus?empUnqId=' + $('#myEmpUnqId').val() + '&releaseStatusCode=' + releaseStatusCode + '&releaseGroupCode=ND', true);
        xhr2.setRequestHeader("Content-type", "application/json");
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4 && xhr2.status === 200) {
                if (releaseStatusCode === 'F') {
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Approved Sucesfully.. </strong></div>"; $('#MessageBox').show();
                    //Auto Mail Sending
                    var empcode = $('#myEmpUnqId').val();
                    var ind = 0;
                    var rls_final = '';
                    if (detailarr.length > 0) {
                        for (var rls = 0; rls < detailarr.length; rls++) {
                            var rls_code = detailarr[rls]["releaseAuth"];
                            rls_final = detailarr[rls]["isFinalRelease"];
                            if (rls_code === empcode && rls_final !== true) {
                                ind = rls + 1; break;
                            };
                        };
                    };
                    var relsauth = detailarr[ind]["releaseAuth"];
                    var rlsmail = new XMLHttpRequest();
                    if (rls_final !== true) { rlsmail.open("GET", $scope._Conpath + "AutoMail/SendMailResignation?id=" + id + "&furtherReleaser=false&empUnqId=" + relsauth, true); }
                    else if (rls_final === true) { rlsmail.open("GET", $scope._Conpath + "AutoMail/SendMailResignation?id=" + id + "&furtherReleaser=HR&empUnqId=" + relsauth, true); }
                    rlsmail.setRequestHeader("Content-type", "application/json"); rlsmail.send();
                //Auto Mail End
                };
                if (releaseStatusCode === 'R') {
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Rejected Sucesfully.. </strong></div>"; $('#MessageBox').show();
                };
                $scope.GetExitProcessList();
            } else {
                if (releaseStatusCode === 'F') {
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Not Approved .. </strong></div>"; $('#MessageBox').show();
                };
                if (releaseStatusCode === 'R') {
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Not Rejected .. </strong></div>"; $('#MessageBox').show();
                };
                $scope.GetExitProcessList();
            };
        }; xhr2.send(jsonObj);
    };      //Update Release Status Approve / Reject
    $scope.GetEmpResignation = function (eid) {
        var ecode;
        if ((typeof (eid) === "undefined")) { ecode = $("#myEmpUnqId").val(); } else { ecode = eid; }
        res = new XMLHttpRequest;
        res.open("GET", $scope._Conpath + "EmpSeparation/GetResignation?empunqid=" + ecode, !0);
        res.setRequestHeader("Accept", "application/json");
        res.onreadystatechange = function () {
            if (4 === res.readyState) {
                var json = JSON.parse(res.responseText);
                var arr = new Array(); arr = json;
                var cnt = 0, myArray = [];
                for (var i = 0; i < arr.length; i++) {
                    var emp = new Array();
                    emp = arr[i].employee;
                    var s = arr[i].releaseStatusCode;
                    if (s !== "R") {
                        myArray.push([]);
                        myArray[cnt].id = arr[i].id;
                        myArray[cnt].empUnqId = arr[i].empUnqId;
                        myArray[cnt].applicationDate = arr[i].applicationDate;
                        myArray[cnt].mode = arr[i].mode;
                        myArray[cnt].reason = arr[i].reason;
                        myArray[cnt].reasonOther = arr[i].reasonOther;
                        myArray[cnt].relieveDate = arr[i].relieveDate;
                        myArray[cnt].resignText = arr[i].resignText;
                        myArray[cnt].releaseStatusCode = arr[i].releaseStatusCode;
                        myArray[cnt].releaseStatus = arr[i].releaseStatus;
                        myArray[cnt].statusHr = arr[i].statusHr;
                        myArray[cnt].empName = emp.empName;
                        myArray[cnt].deptName = emp.deptName;
                        myArray[cnt].statName = emp.statName;
                        myArray[cnt].gradeName = emp.gradeName;
                        myArray[cnt].desgName = emp.desgName;
                        myArray[cnt].joinDate = emp.joinDate;
                        myArray[cnt].applReleaseStatus = arr[i].applReleaseStatus;
                        myArray[cnt].furtherReleaser = arr[i].furtherReleaser;
                        myArray[cnt].furtherReleaserName = arr[i].furtherReleaserName;
                        myArray[cnt].furtherReleaseStatusCode = arr[i].furtherReleaseStatusCode;
                        myArray[cnt].furtherReleaseDate = arr[i].furtherReleaseDate;
                        cnt++;
                    }

                }
                $scope.resData = myArray;
                //$("#hidMode").val(myArray[0].mode);
                $scope.$digest();
            };
        }; res.send();
    };
    $scope.GetResignations = function (data) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var FromDate, ToDate;
        if ("undefined" == typeof data || "undefined" == typeof data.FromDt || "undefined" == typeof data.ToDt) {
            var date = new Date;
            firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            FromDate = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate();
            ToDate = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { FromDate = data.FromDt, ToDate = data.ToDt; };
        var date1 = new Date(FromDate), date2 = new Date(ToDate);
        if (date1 > date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Valid Date Range.. </strong></div>",
                $("#MessageBox").show();
            return false;
        };
        rsg = new XMLHttpRequest;
        rsg.open("GET", $scope._Conpath + "EmpSeparation/GetResignations?fromDt=" + FromDate + "&toDt=" + ToDate, true);
        rsg.setRequestHeader("Accept", "application/json");
        rsg.onreadystatechange = function () {
            if (4 === rsg.readyState && rsg.status === 200) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
                var json = JSON.parse(rsg.responseText);
                $scope.rsgData = json;
                $scope.exportObj = json;
                $scope.$digest();
            } else if (rsg.status === 400 || rsg.status === 403 || rsg.status === 404 || rsg.status === 408 || rsg.status === 500) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
                var str = rsg.responseText.replace("[", '').replace("]", '').toString(); var fields = str.split(','); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er +
                    "</strong></div>"; $('#MessageBox').show();
            };
        }; rsg.send();
    };
    $scope.GetResignationHr = function () {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        rhr = new XMLHttpRequest;
        rhr.open("GET", $scope._Conpath + "EmpSeparation/GetResignationHr", true);
        rhr.setRequestHeader("Accept", "application/json");
        rhr.onreadystatechange = function () {
            if (4 === rhr.readyState && rhr.status === 200) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
                var json = JSON.parse(rhr.responseText); $scope.rhrData = json; $scope.$digest();
            };
        }; rhr.send();
    };
    $scope.PopUpData = function (mode, id) {
        var mode = mode; if (mode === "M") { $("#manualModel").modal("show"); }; if (mode === "T") { $("#templateModel").modal("show"); };
    };
    $scope.PopulateData = function (empid, mode) {
        if (mode === "M") { $("#manualModel").modal("show"); }; if (mode === "T") { $("#templateModel").modal("show"); };
        $scope.GetEmpResignation(empid);
    };
    $scope.HrRelease = function (id) {
        var xhr3 = new XMLHttpRequest(); xhr3.open("PUT", $scope._Conpath + "EmpSeparation/HrRelease?id=" + id + "&empUnqId=" + $("#myEmpUnqId").val(), true);
        xhr3.setRequestHeader("Content-type", "application/json"); xhr3.onreadystatechange = function () {
            if (xhr3.readyState === 4 && xhr3.status === 200) {
                $scope.GetResignationHr();
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Released Sucesfully.. </strong></div>";
            } else {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Not Released.. </strong></div>";
            };
        }; xhr3.send();
    };
    $scope.ReleaserPopUp = function (appID) { $("#ReleaserModel").modal("show"); $("#hidId").val(appID); };
    $scope.FurtherRelease = function (releasestatuscode, eId) {
        var id = $("#hidId").val();
        var xhr4 = new XMLHttpRequest();
        if (releasestatuscode === "I") { xhr4.open("PUT", $scope._Conpath + "EmpSeparation/FurtherRelease?id=" + id + "&empUnqId=" + eId + "&releasestatuscode=" + releasestatuscode, true); }
        else { xhr4.open("PUT", $scope._Conpath + "EmpSeparation/FurtherRelease?id=" + eId + "&empUnqId=" + $("#myEmpUnqId").val() + "&releasestatuscode=" + releasestatuscode, true); }
        xhr4.setRequestHeader("Content-type", "application/json"); xhr4.onreadystatechange = function () {
            if (xhr4.readyState === 4 && xhr4.status === 200) {
                //Auto Mail Sending
                var rlsmail = new XMLHttpRequest();
                rlsmail.open("GET", $scope._Conpath + "AutoMail/SendMailResignation?id=" + id + "&furtherReleaser=true&empUnqId=" + eId, true);
                rlsmail.setRequestHeader("Content-type", "application/json"); rlsmail.send();
                //Auto Mail End
                if (releasestatuscode === "I") {
                    jQuery('#btnCloseRel').click();
                    $scope.GetResignationHr();
                    $("#hidId").val("");
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Added Sucesfully.. </strong></div>";
                }
                if (releasestatuscode === "F") {
                    $scope.GetResignationHr();
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Release Sucesfully.. </strong></div>";
                }
            } else {
                if (releasestatuscode === "I") {
                    jQuery('#btnCloseRel').click(); $("#hidId").val("");
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>No Releaser Added.. </strong></div>";
                }
                if (releasestatuscode === "F") {
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Not Released.. </strong></div>";
                };
            };
        }; xhr4.send();
    };
    $scope.GetFurtherRelease = function () {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        fur = new XMLHttpRequest;
        fur.open("GET", $scope._Conpath + "EmpSeparation/GetFurtherRelease?empUnqId=" + $("#myEmpUnqId").val() + "&flag=" + true, true);
        fur.setRequestHeader("Accept", "application/json");
        fur.onreadystatechange = function () {
            if (4 === fur.readyState && fur.status === 200) {
                $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv");
                var json = JSON.parse(fur.responseText);
                $scope.furData = json;
                $scope.$digest();
            };
        }; fur.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    $scope.exportAllData = function (name) {
        setTimeout(function () {
            $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
            var d = new Date;
            d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = name + d;
            $scope.JSONToCSVConvertor($scope.exportObj, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv")
        }, 100)
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = "";
        if (CSV += ReportTitle + "\r\n\n", ShowLabel) {
            var row = "";
            for (var index in arrData[0]) row += index + ",";
            row = row.slice(0, -1), CSV += row + "\r\n"
        } for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i]) row += '"' + arrData[i][index] + '",';
            row.slice(0, row.length - 1), CSV += row + "\r\n"
        } if ("" === CSV) return void alert("Invalid data");
        var fileName = "";
        fileName += ReportTitle.replace(/ /g, "_");
        var uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a");
        link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link)
    };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText) }) }, options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText) } }; elem.datepicker(options) } } });