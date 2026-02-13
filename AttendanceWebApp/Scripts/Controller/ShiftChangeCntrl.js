var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("ShiftChangeCntroller", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val();
    var url_string = window.location.href, url = new URL(url_string), urlhost = url.hostname;
    var urlprotocol = url.protocol, url_port = url.port;
    $scope.currentPage = 1; $scope.itemsPerPage = 10;
    $scope.jsondata; $scope.alluserlist = []; var rlsarr = [];
    var loc = $("#myLoc").val();
    //Set API Path
    $scope._Conpath = ''; $(document).ready(function () { if (typeof _ConPath === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } } });
    //Reset Page
    $scope.ResetView = function () { window.location.reload(true); };
    //Get All Shifts
    $scope.GetAllShifts = function () {
        var shiftreq = new XMLHttpRequest();
        shiftreq.open('GET', $scope._Conpath + 'ShiftChange/getallshifts?loc=' + loc, true);
        shiftreq.setRequestHeader('Accept', 'application/json');
        shiftreq.onreadystatechange = function () {
            if (shiftreq.readyState === 4) {
                var json = JSON.parse(shiftreq.responseText);
                $scope.shiftdata = json;
                for (var i = 0; i < $scope.shiftdata.length; i++) {
                    var index = $scope.shiftdata.findIndex(function (item) { return item.shiftCode === 'WO'; });
                    if (index !== -1) { $scope.shiftdata.splice(index, 1); };
                }; $scope.$digest();
            };
        }; shiftreq.send();
    };
    //Get Employee Info
    $scope.GetEmpInfo = function () {
        //Validate Employee Code
        var e_Code = $('#txtEmpCode').val();
        if (e_Code === '') {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-info alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Kindly provide the employee code first.</strong>" +
                "</div>";
            $('#MessageBox').show();
            return false;
        };
        //AJAX call to get employee details
        var emp = new XMLHttpRequest();
        emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + e_Code, true);
        emp.setRequestHeader('Accept', 'application/json');
        emp.onreadystatechange = function () {
            if (emp.readyState === 4) {
                if (emp.responseText === "" &&
                    (e_Code.length === 6 || e_Code.length === 8)) {
                    alert("Invalid entry. Kindly provide a valid employee code.");
                    document.getElementById("txtEmpCode").value = "";
                    return false;
                };
                var json = JSON.parse(emp.responseText);
                $scope.empdata = json; $scope.$digest();
                $('#lblEmpName').text($scope.empdata[0].empName);
            };
        }; emp.send();
    };
    //Get Release Strategy
    $scope.GetRelesaseStratey = function () {
        var rel = new XMLHttpRequest;
        rel.open("GET", $scope._Conpath + "ReleaseStrategy/GetReleaseStrategy?releaseGroup=" +
            $("#releaseGroupCode").val() + "&empUnqId=" + $("#myEmpUnqId").val(), !0);
        rel.setRequestHeader("Accept", "application/json");
        rel.onreadystatechange = function () {
            if (4 === rel.readyState) {
                var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1, $scope.$digest();
            }
        };
        rel.send();
    };
    //Get Shift Change Employee List
    $scope.GetSCEmpList = function () {
        var sce = new XMLHttpRequest();
        sce.open('GET', $scope._Conpath + 'ShiftChange/getscemplist?empUnqId=' + $("#myEmpUnqId").val(), true);
        sce.setRequestHeader('Accept', 'application/json');
        sce.onreadystatechange = function () {
            if (sce.readyState === 4) {
                var json = JSON.parse(sce.responseText);
                $scope.scempdata = json;
                $scope.$digest();
            };
        }; sce.send();
    };
    // Check if empCode exists in $scope.scempdata, else show error
    $scope.CheckEmpCodeInSCData = function () {
        var empCode = $('#txtEmpCode').val();
        if (!empCode || !$scope.scempdata || !Array.isArray($scope.scempdata)) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Employee data not loaded or employee code missing.</strong>" +
                "</div>";
            $('#MessageBox').show();
            return false;
        };

        var exists = $scope.scempdata.some(function (item) { return item.empUnqId === empCode; });

        if (!exists) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Employee code not found in shift change employee list.</strong>" +
                "</div>";
            $('#MessageBox').show();
            return false;
        };
        $('#MessageBox').hide();
        return true;
    };
    //Validate Shift Change Date
    $scope.ToValidate = function () {
        var empCode = $('#txtEmpCode').val();
        if (!empCode || empCode.trim() === "") {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Kindly provide the employee code first.</strong>" +
                "</div>";
            $('#MessageBox').show();
            $scope.ClearControls();
            return false;
        };

        var selectedDate = $scope.N.scDate;
        if (!selectedDate) return;

        var inputDate = new Date(selectedDate);
        var today = new Date(); today.setHours(0, 0, 0, 0);

        var prevDay = new Date(today); prevDay.setDate(today.getDate() - 1);

        inputDate.setHours(0, 0, 0, 0);

        if (inputDate > today || inputDate < prevDay) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Only today and one previous day are allowed for Shift Change Date.</strong>" +
                "</div>";
            $('#MessageBox').show();
            $scope.N.scDate = null;
        } else { $('#MessageBox').hide(); }

        // Check In Punch for the selected date
        var punchReq = new XMLHttpRequest();
        punchReq.open("GET", $scope._Conpath + "Employee/PerfAttd?empunqid=" + empCode +
            "&flag=PERF&fromdate=" + selectedDate + "&todate=" + selectedDate, !0);
        punchReq.setRequestHeader('Accept', 'application/json');
        punchReq.onreadystatechange = function () {
            if (punchReq.readyState === 4) {
                debugger;
                var json = JSON.parse(punchReq.responseText);
                $scope.punchData = json; $scope.$digest();
                var inpunch = $scope.punchData[0].consIn;
                if (inpunch === null || inpunch === undefined || inpunch === "") {
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-warning alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>In punch not found for the selected date.</strong>" +
                        "</div>";
                    $('#MessageBox').show();
                    $scope.ClearControls();
                    return false;
                };
            };
        };
        punchReq.send();
    };
    //Clear Controls
    $scope.ClearControls = function () {
        $scope.N = {};
        $('#txtEmpCode').val("");
        document.getElementById("scDate").value = "";
        $("#cmbShiftCode option:first").attr("selected", true);
        $('#txtReason').val("");
    };
    //Start: Shift Change Request
    //Submit Shift Change Request
    $scope.SubmitShiftChange = function () {
        if ($scope.N == null ||
            $scope.N.empUnqId == null ||
            $scope.N.scDate == null ||
            $scope.N.shiftCode == null ||
            $scope.N.reason == null) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please fill all the required fields.</strong>" +
                "</div>";
            $('#MessageBox').show();
            return false;
        }

        // Get current year and month in YYYYMM format
        var now = new Date();
        var yearMonth = now.getFullYear().toString() + ('0' + (now.getMonth() + 1)).slice(-2);
        // Example: yearMonth = "202406" for June 2024

        var scdate = $filter('date')($scope.N.scDate, 'yyyy-MM-dd');

        var scdata = {
            yearMonth: yearMonth,
            applicationId: 0,
            empUnqId: $('#txtEmpCode').val(),
            releaseGroupCode: "SS",
            releaseStrategy: $('#txtEmpCode').val(),
            releaseStatusCode: "N",
            shiftDate: scdate,
            shiftCode: $scope.N.shiftCode,
            reason: $scope.N.reason,
            addDate: new Date(),
            addUser: $('#myEmpUnqId').val()
        };

        $http.post($scope._Conpath + 'ShiftChange/createshiftchange', scdata)
            .then(function (response) {
                if (response.status === 200) {
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Shift Change request submitted successfully.</strong>" +
                        "</div>";
                    $('#MessageBox').show();
                }
            }, function (error) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>An error occurred while submitting the request. Please try again later.</strong>" +
                    "</div>";
                $('#MessageBox').show();
            });
    };
    //Get Pending Shift Change Requests
    $scope.GetPendingSCRequests = function () {
        var psc = new XMLHttpRequest();
        psc.open('GET', $scope._Conpath + 'ShiftChange/getapplreleasestatus?empUnqId=' + $("#myEmpUnqId").val(), true);
        psc.setRequestHeader('Accept', 'application/json');
        psc.onreadystatechange = function () {
            if (psc.readyState === 4) {
                var json = JSON.parse(psc.responseText);
                $scope.pscreqdata = json;
                $scope.$digest();
            }
        }; psc.send();
    };
    //Shift Change Release and auto post in attendance
    $scope.SCRelease = function (Obj, status, appId) {
        debugger;
        // Find application details from $scope.pscreqdata by applicationId
        var appDetails = null;
        if ($scope.pscreqdata && Array.isArray($scope.pscreqdata)) {
            appDetails = $scope.pscreqdata.find(function (item) {
                return item.applicationId === appId;
            });
        }

        var screl;

        // Copy all properties from appDetails and update required fields
        for (var i = 0; i < appDetails.shiftChangeReleaseStatus.length; i++) {
            // Check if it's the final release
            var x = appDetails.shiftChangeReleaseStatus[i].isFinalRelease;
            // Prepare release data
            if (x === true) {
                // Final release
                screl = Object.assign(appDetails.shiftChangeReleaseStatus[i], {
                    yearMonth: appDetails.shiftChangeReleaseStatus[i].yearMonth,
                    applicationId: appDetails.applicationId,
                    empUnqId: appDetails.empUnqId,
                    releaseStrategy: appDetails.releaseStrategy,
                    releaseStrategyLevel: appDetails.shiftChangeReleaseStatus[i].releaseStrategyLevel,
                    releaseCode: appDetails.shiftChangeReleaseStatus[i].releaseCode,
                    releaseStatusCode: status,
                    releaseDate: new Date(),
                    releaseAuth: $("#myEmpUnqId").val(),
                    isFinalRelease: x,
                    remarks: Obj.Remarks || "",
                });
                break;
            }
        }

        // Make POST request to release the application
        $http.post($scope._Conpath + 'ShiftChange/apprelease?empUnqId=' + $("#myEmpUnqId").val() +
            "&releaseStatusCode=" + status, screl)
            .then(function (response) {
                if (response.status === 200) {
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Shift Change request has been " + (status === 'F' ? 'approved' : 'rejected') + " successfully.</strong>" +
                        "</div>";
                    $('#MessageBox').show();
                    $scope.GetPendingSCRequests();
                }
            }, function (error) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>An error occurred while processing the request. Please try again later.</strong>" +
                    "</div>";
                $('#MessageBox').show();
            });
    };
    //End: Shift Change Request

    //GET All Shift Change Records for releaser
    $scope.GetAllSCRecords = function (rdata) {
        var fromDt, toDt;
        if ("undefined" == typeof rdata ||
            "undefined" == typeof rdata.FromDt ||
            "undefined" == typeof rdata.ToDt) {
            var date = new Date(),
                firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1),
                lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            fromDt = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate(),
                toDt = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { fromDt = rdata.FromDt, toDt = rdata.ToDt; };
        var date1 = new Date(fromDt), date2 = new Date(toDt);
        if (date1 > date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'>" +
                "< a href = '#' class='close' data - dismiss='alert' aria - label='close' >& times;</a >" +
                "<strong>Please Enter Valid Date Range</strong></div > ";
            $("#MessageBox").show(); return false;
        };
        var allsc = new XMLHttpRequest();
        allsc.open('GET', $scope._Conpath + 'ShiftChange/getshiftchangereleaser?fromDt=' + fromDt +
            '&toDt=' + toDt + '&empUnqId=' + $("#myEmpUnqId").val(), true);
        allsc.setRequestHeader('Accept', 'application/json');
        allsc.onreadystatechange = function () {
            if (allsc.readyState === 4) {
                var json = JSON.parse(allsc.responseText);
                $scope.scrdata = json;
                $scope.$digest();
            }
        }; allsc.send();
    };
    //Get Employees wise shift change records
    $scope.GetAllSCRecordsEmp = function (escdta) {
        var fromDt, toDt;
        if ("undefined" == typeof escdta ||
            "undefined" == typeof escdta.FromDt ||
            "undefined" == typeof escdta.ToDt) {
            var date = new Date(),
                firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1),
                lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            fromDt = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate(),
                toDt = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { fromDt = escdta.FromDt, toDt = escdta.ToDt; };
        var date1 = new Date(fromDt), date2 = new Date(toDt);
        if (date1 > date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'>" +
                "< a href = '#' class='close' data - dismiss='alert' aria - label='close' >& times;</a >" +
                "<strong>Please Enter Valid Date Range</strong></div > ";
            $("#MessageBox").show(); return false;
        };
        var scemp = new XMLHttpRequest();
        scemp.open('GET', $scope._Conpath + 'ShiftChange/getshiftchange?fromDt=' + fromDt +
            '&toDt=' + toDt + '&isPostedOnly=false&empUnqId=' + $("#myEmpUnqId").val(), true);
        scemp.setRequestHeader('Accept', 'application/json');
        scemp.onreadystatechange = function () {
            if (scemp.readyState === 4) {
                var json = JSON.parse(scemp.responseText);
                $scope.scempdata = json;
                $scope.$digest();
            }
        }; scemp.send();
    };
    //All employees shift changes
    $scope.GetAllSCRecordsHR = function (hrscd) {
        var fromDt, toDt;
        if ("undefined" == typeof hrscd ||
            "undefined" == typeof hrscd.FromDt ||
            "undefined" == typeof hrscd.ToDt) {
            var date = new Date(),
                firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1),
                lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            fromDt = firstDay.getFullYear() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getDate(),
                toDt = lastDay.getFullYear() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getDate();
        } else { fromDt = hrscd.FromDt, toDt = hrscd.ToDt; };
        var date1 = new Date(fromDt), date2 = new Date(toDt);
        if (date1 > date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-warning alert-dismissable'>" +
                "< a href = '#' class='close' data - dismiss='alert' aria - label='close' >& times;</a >" +
                "<strong>Please Enter Valid Date Range</strong></div > ";
            $("#MessageBox").show(); return false;
        };
        var scemp = new XMLHttpRequest();
        scemp.open('GET', $scope._Conpath + 'ShiftChange/getshiftchange?fromDt=' + fromDt +
            '&toDt=' + toDt + '&isPostedOnly=false', true);
        scemp.setRequestHeader('Accept', 'application/json');
        scemp.onreadystatechange = function () {
            if (scemp.readyState === 4) {
                var json = JSON.parse(scemp.responseText);
                $scope.schrdata = json;
                $scope.$digest();
            }
        }; scemp.send();
    };

    //Sorting function
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
    //Export to CSV
    $scope.exportAllData = function (ReportName) { setTimeout(function () { $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv"); var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = ReportName + d; $scope.JSONToCSVConvertor($scope.jsondata, FileName, !0), $("#loading").removeClass("activediv"), $("#loading").addClass("deactivediv") }, 100) };
    //Convert JSON to CSV
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = ""; if (ShowLabel) { var row = ""; for (var index in arrData[0]) row += index + ","; row = row.slice(0, -1), CSV += row + "\r\n" } for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) { var f = arrData[i][index]; null === f && (f = ""), row += '"' + f + '",' } row.slice(0, row.length - 1), CSV += row + "\r\n" } if ("" === CSV) return void alert("Invalid data"); var fileName = ReportTitle.replace(/ /g, "_"), uri = "data:text/csv;charset=utf-8," + escape(CSV), link = document.createElement("a"); link.href = uri, link.style = "visibility:hidden", link.download = fileName + ".csv", document.body.appendChild(link), link.click(), document.body.removeChild(link) };
});