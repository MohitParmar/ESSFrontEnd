﻿var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("TripController", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val();
    $scope._Conpath = ""; var url_string = window.location.href; url = new URL(url_string); urlhost = url.hostname;
    urlprotocol = url.protocol;
    $(document).ready(function () {
        "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/")
    });
    $scope.currentPage = 1, $scope.itemsPerPage = 50; $scope.exportObj;
    $scope.ResetView = function () { window.location.reload(true) };
    var d = new Date(); var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
    //To validate a booking date under 90 days or not booked in previous days.
    $scope.ToValidate = function () {
        debugger;
        var now = new Date(); var dtnow = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(); var firstDay = now;
        if (firstDay.getMonth() + 1 < '10') {
            if (firstDay.getDate() < '10') {
                firstDay = (firstDay.getFullYear()) + '-' + '0' + (firstDay.getMonth() + 1) + '-' + '0' + firstDay.getDate();
            }
            else {
                firstDay = (firstDay.getFullYear()) + '-' + '0' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate();
            }
        } else {
            if (firstDay.getDate() < '10') {
                firstDay = (firstDay.getFullYear()) + '-' + (firstDay.getMonth() + 1) + '-' + '0' + firstDay.getDate();
            }
            else {
                firstDay = (firstDay.getFullYear()) + '-' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate();
            }
        };
        dtnow = firstDay;
        var chkFrom = $("#tripDate").val();
        var chkTo = dtnow;
        if (chkFrom === "") {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please select booking Date...</strong></div>"; $('#MessageBox').show();
            document.getElementById("tripDate").value = ""; return false;
        };
        var date1 = new Date(chkFrom); var date2 = new Date(chkTo);
        var diff = ((date2 - date1) / (1000 * 60 * 60 * 24) * -1) + 1;
        if (diff > 91) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter date under 90 days.</strong></div>"; $('#MessageBox').show();
            document.getElementById("tripDate").value = ""; return false;
        }
        if (date1 < date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please enter valid date.</strong></div>"; $('#MessageBox').show();
            document.getElementById("tripDate").value = ""; return false;
        }
    };
    //validate on selected date or slot.
    $scope.GetReqOnDate = function () {
        var trpdate = $("#tripDate").val(); var slot = $("#cmbSlot").val();
        var grd = new XMLHttpRequest;
        grd.open("GET", $scope._Conpath + "VehicleReq/GetReqOnDate?date=" + trpdate + "&slot=" + slot, true);
        grd.setRequestHeader("Accept", "application/json");
        grd.onreadystatechange = function () {
            if (grd.readyState === 4 && grd.status === 200) { }
            else {
                if (grd.status === 400 || grd.status === 403 || grd.status === 404 || grd.status === 408 || grd.status === 500) {
                    debugger;
                    var str =
                        grd.responseText.replace("[", '').replace("]", '').toString().replace("{", '').toString().replace("}", '').toString();
                    var fields = str.split(',');
                    var er = "";
                    for (var i = 0; i < fields.length; i++) {
                        er = er + fields[i] + "<br/>";
                    };

                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er +
                        "</strong></div>"; $('#MessageBox').show();
                    document.getElementById("tripDate").value = "";
                    $("#cmbSlot option:first").attr("selected", true);
                    document.getElementById("txtpickupTime").value = "";
                    document.getElementById("txtpickupLocation").value = "";
                    document.getElementById("txtdropLocation").value = "";
                    document.getElementById("txtremarks").value = "";
                };
            };
        };
        grd.send();
    };
    //Before 24 hours only
    $scope.tValidate = function () {
        var bdate = $("#tripDate").val(); var ptime = $("#txtpickupTime").val();
        var pickupdatetime = bdate + " " + ptime; pickupdatetime = new Date(pickupdatetime);
        var now = new Date();
        var dtnow = new Date(now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
        var diff = Math.abs(dtnow - pickupdatetime) / 36e5;
        diff = parseInt(diff);
        if (diff <= 24) {
            $scope.ResetView();
            alert("Booking not allowed before 24 hours.");
        };
        // Slot 1 : Morning (00:00 to 08:59) | Slot 2 : Day (09:00 to 17:59) | Slot 3 : Night (18:00 to 23:59)
        var slot = $("#cmbSlot").val();
        if (slot === "1" || slot === 1) {
            var s1_startTime = "00:00"; var s1_endTime = "08:59";
            if (ptime > s1_startTime && ptime < s1_endTime) { return; } else {
                alert("As per selected pickup time wrong slot selected");
                $("#cmbSlot option:first").attr("selected", true);
                document.getElementById("txtpickupTime").value = "";
            }
        } else if (slot === "2" || slot === 2) {
            var s2_startTime = "09:00"; var s1_endTime = "17:59";
            if (ptime > s2_startTime && ptime < s2_endTime) { return; } else {
                alert("As per selected pickup time wrong slot selected");
                $("#cmbSlot option:first").attr("selected", true);
                document.getElementById("txtpickupTime").value = "";
            }
        } else if (slot === "3" || slot === 3) {
            var s3_startTime = "18:00"; var s1_endTime = "23:59";
            if (ptime > s3_startTime && ptime < s3_endTime) { return; } else {
                alert("As per selected pickup time wrong slot selected");
                $("#cmbSlot option:first").attr("selected", true);
                document.getElementById("txtpickupTime").value = "";
            }
        };
    };
    //Create Trip
    $scope.TripBooking = function (data) {
        debugger;
        document.getElementById("btnSubmit").disabled = true;
        var jsonObj = {};
        jsonObj.EmpUnqId = $("#myEmpUnqId").val();
        jsonObj.ReqDate = dt;
        jsonObj.BookingDate = data.tripDate;
        jsonObj.BookingSlot = parseInt(data.slot);
        var vhr = new XMLHttpRequest;
        vhr.open("GET", $scope._Conpath + "VehicleReq/GetReqOnDate?date=" + data.tripDate + "&slot=" + parseInt(data.slot), true);
        vhr.setRequestHeader("Accept", "application/json");
        vhr.onreadystatechange = function () {
            if (vhr.readyState === 4 && vhr.status === 200) {
                debugger;
                jsonObj.PickupTime = data.pickupTime;
                jsonObj.PickupLocation = data.pickupLocation;
                jsonObj.DropLocation = data.dropLocation;
                jsonObj.Remarks = data.remarks;
                jsonObj.NumberOfPass = data.numberOfPass;
                jsonObj.AddDt = dt;
                jsonObj.AddUser = $("#myEmpUnqId").val();
                jsonObj = JSON.stringify(jsonObj);
                var gtd = new XMLHttpRequest;
                gtd.open("POST", $scope._Conpath + "VehicleReq/CreateReq", true);
                gtd.setRequestHeader("Content-Type", "application/json");
                gtd.onreadystatechange = function () {
                    if (gtd.readyState === 4 && gtd.status === 200) {
                        debugger;
                        document.getElementById("btnSubmit").disabled = false;
                        document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + " <strong>Submit Successfully.. </strong></div>"; $("#MessageBox").show();
                        document.getElementById("tripDate").value = "";
                        $("#cmbSlot option:first").attr("selected", true);
                        document.getElementById("txtpickupLocation").value = "";
                        document.getElementById("txtdropLocation").value = "";
                        document.getElementById("txtremarks").value = "";
                        document.getElementById("txtpickupTime").value = "";
                        document.getElementById("txtnumberOfPass").value = "";
                        ////Auto Mail Sending
                        //var gCode = $("#myGradeCode").val();
                        //var json = JSON.parse(gtd.responseText); var maildata = []; maildata = json;
                        //var rlsmail = new XMLHttpRequest();
                        //if (gCode > '010') {
                        //    rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMailVehReq?reqId=' + maildata.reqId +
                        //        "&flag=true", true);
                        //}
                        //else {
                        //    rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMailVehReq?reqId=' + maildata.reqId +
                        //        "&flag=false", true);
                        //}
                        //rlsmail.setRequestHeader("Content-type", "application/json");
                        //rlsmail.send();
                        ////Auto Mail End
                    } else if (gtd.status === 400 || gtd.status === 403 || gtd.status === 404 || gtd.status === 408 || gtd.status === 500) {
                        debugger;
                        var str =
                            gtd.responseText.replace("[", '').replace("]", '').toString().replace("{", '').toString().replace("}", '').toString();
                        var fields = str.split(',');
                        var er = "";
                        for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                        document.getElementById("MessageBox").innerHTML =
                            "<div class='alert alert-danger alert-dismissable'>" +
                            "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er +
                            "</strong></div>"; $('#MessageBox').show();
                        setTimeout($scope.ResetView(), 5000);
                    };
                }; gtd.send(jsonObj);
            } else if (vhr.status === 400 || vhr.status === 403 || vhr.status === 404 || vhr.status === 408 || vhr.status === 500) {
                debugger;
                var str =
                    vhr.responseText.replace("[", '').replace("]", '').toString().replace("{", '').toString().replace("}", '').toString();
                var fields = str.split(','); var er = ""; for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er +
                    "</strong></div>"; $('#MessageBox').show();
                document.getElementById("tripDate").value = "";
                document.getElementById("txtpickupLocation").value = "";
                document.getElementById("txtdropLocation").value = "";
                document.getElementById("txtremarks").value = "";
                $("#cmbSlot option:first").attr("selected", true);
                document.getElementById("txtpickupTime").value = "";
                document.getElementById("txtnumberOfPass").value = "";
                document.getElementById("btnSubmit").disabled = false;
                setTimeout($scope.ResetView(), 5000);
            };
        }; vhr.send();
    };
    //Get pending req for release 
    $scope.GetReqForRel = function (isAdmin) {
        $("#loading").removeClass("deactivediv"), $("#loading").addClass("activediv");
        var gtd = new XMLHttpRequest;
        gtd.open("GET", $scope._Conpath + "VehicleReq/GetReqForRel?empUnqId=" + $("#myEmpUnqId").val() + "&isAdmin=" + isAdmin, true);
        gtd.setRequestHeader("Accept", "application/json");
        gtd.onreadystatechange = function () {
            if (gtd.readyState === 4 && gtd.status === 200) {
                var json = JSON.parse(gtd.responseText);
                var myArray = []; var arr = new Array(); arr = json;
                for (var i = 0; i < arr.length; i++) {
                    myArray.push([]);
                    var slot = arr[i].bookingSlot;
                    if (1 == parseInt(slot)) { myArray[i].BookingSlot = "Morning"; };
                    if (2 == parseInt(slot)) { myArray[i].BookingSlot = "Day"; };
                    if (3 == parseInt(slot)) { myArray[i].BookingSlot = "Night"; };
                    myArray[i].ReqId = arr[i].reqId;
                    myArray[i].EmpUnqId = arr[i].empUnqId;
                    myArray[i].EmpName = arr[i].empName;
                    myArray[i].ReqDate = arr[i].reqDate;
                    myArray[i].BookingDate = arr[i].bookingDate;
                    myArray[i].PickupTime = arr[i].pickupTime;
                    myArray[i].PickupLocation = arr[i].pickupLocation;
                    myArray[i].DropLocation = arr[i].dropLocation;
                    myArray[i].Remarks = arr[i].remarks;
                    myArray[i].NumberOfPass = arr[i].numberOfPass;
                    myArray[i].AddDt = arr[i].addDt.substring(0, arr[i].addDt.indexOf("T"));
                    myArray[i].AddUser = arr[i].addUser;
                    myArray[i].ReleaseGroupCode = arr[i].releaseGroupCode;
                    myArray[i].ReleaseStrategy = arr[i].releaseStrategy;
                    myArray[i].ReleaseCode = arr[i].releaseCode;
                    myArray[i].ReleaseStatusCode = arr[i].releaseStatusCode;
                    myArray[i].ReleaseRemarks = arr[i].releaseRemarks;
                    myArray[i].ReleaseAuth = arr[i].releaseAuth;
                    myArray[i].ReleaseDate = arr[i].releaseDate;
                    myArray[i].AdminReleaseStatusCode = arr[i].adminReleaseStatusCode;
                    myArray[i].AdminUser = arr[i].adminUser;
                    myArray[i].AdminReleaseDate = arr[i].adminReleaseDate;
                    myArray[i].AdminReleaseRemarks = arr[i].adminReleaseRemarks;
                };
                $scope.tripData = myArray; $scope.$digest();
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
            } else if (gtd.status === 400 || gtd.status === 403 || gtd.status === 404 || gtd.status === 408 || gtd.status === 500) {
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
                var str =
                    gtd.responseText.replace("[", '').replace("]", '').toString().replace("{", '').toString().replace("}", '').toString();
                var fields = str.split(','); var er = ""; for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er +
                    "</strong></div>"; $('#MessageBox').show();
            };
        };
        gtd.send();
    };
    //Release Requisition Approve/Reject
    $scope.ReleaseReq = function (empid, reqId, isAdm, status, obj, flg) {
        debugger;
        var rmks = "";
        if (status === "R") {
            if ((typeof (obj) === "undefined") || (typeof (obj.Remarks) === "undefined")) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Please Enter Remarks First For Rejection</strong></div>"; $('#MessageBox').show(); return false;
            } else { rmks = obj.Remarks; };
        } else { if ((typeof (obj) === "undefined")) { rmks = ""; } else { rmks = obj.Remarks; }; };
        var jsonObj = {}; jsonObj.ReqId = reqId; jsonObj.EmpUnqId = empid;
        if (isAdm === true) {
            jsonObj.AdminReleaseStatusCode = status;
            jsonObj.AdminUser = $("#myEmpUnqId").val();
            jsonObj.AdminReleaseRemarks = rmks;
        } else {
            jsonObj.ReleaseAuth = $("#myEmpUnqId").val();
            jsonObj.ReleaseStatusCode = status;
            jsonObj.ReleaseRemarks = rmks;
        };
        jsonObj = JSON.stringify(jsonObj);
        var rel = new XMLHttpRequest;
        rel.open("PUT", $scope._Conpath + "VehicleReq/ReleaseReq?isAdmin=" + isAdm, true);
        rel.setRequestHeader("Content-Type", "application/json");
        rel.onreadystatechange = function () {
            if (rel.readyState === 4 && rel.status === 200) {
                debugger;
                if (flg === true || flg === "true") {
                    var index = $scope.allData.findIndex(function (item, i) { return item.reqId === reqId });
                    $scope.allData.splice(index, 1); $scope.$digest();
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Cancelled Successfully.. </strong></div>";
                } else {
                    if (isAdm === false && status === "F") {
                        //Auto Mail Sending
                        var rlsmail = new XMLHttpRequest();
                        rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMailVehReq?reqId=' + reqId + "&flag=false", true);
                        rlsmail.setRequestHeader("Content-type", "application/json");
                        rlsmail.send();
                        //Auto Mail End
                    }
                    var index = $scope.tripData.findIndex(function (item, i) { return item.reqId === reqId });
                    $scope.tripData.splice(index, 1); $scope.$digest();
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Approve/Rejected Successfully.. </strong></div>";
                }
                $("#MessageBox").show();
            } else if (rel.readyState === 4 && rel.status === 400 || rel.status === 403 || rel.status === 404 || rel.status === 408 || rel.status === 500) {
                var str =
                    rel.responseText.replace("[", '').replace("]", '').toString().replace("{", '').toString().replace("}", '').toString();
                var fields = str.split(','); var er = ""; for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er +
                    "</strong></div>";
                $('#MessageBox').show();
            };
        };
        rel.send(jsonObj);
    };
    //Get all vehicle requisition in date range
    $scope.GetVehicleReq = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var all = new XMLHttpRequest;
        all.open("GET", $scope._Conpath + "VehicleReq/GetVehicleReq?fromDt=" + $("#fromDt").val() + "&toDt=" + $("#toDt").val(), true);
        all.setRequestHeader("Accept", "application/json");
        all.onreadystatechange = function () {
            if (all.readyState === 4 && all.status === 200) {
                var json = JSON.parse(all.responseText);
                var myArray = []; var arr = new Array(); arr = json;
                for (var i = 0; i < arr.length; i++) {
                    myArray.push([]);
                    myArray[i].ReqId = arr[i].reqId;
                    myArray[i].EmpUnqId = arr[i].empUnqId;
                    myArray[i].EmpName = arr[i].empName;
                    myArray[i].DeptName = arr[i].deptName;
                    myArray[i].StatName = arr[i].statName;
                    myArray[i].CatName = arr[i].catName;
                    myArray[i].GradeName = arr[i].gradeName;
                    myArray[i].BookingDate = arr[i].bookingDate.substring(0, arr[i].bookingDate.indexOf("T"));
                    var slot = arr[i].bookingSlot;
                    if (1 == parseInt(slot)) { myArray[i].BookingSlot = "Morning"; };
                    if (2 == parseInt(slot)) { myArray[i].BookingSlot = "Day"; };
                    if (3 == parseInt(slot)) { myArray[i].BookingSlot = "Night"; };
                    myArray[i].BookingStatus = arr[i].bookingStatus;
                    myArray[i].NumberOfPass = arr[i].numberOfPass;
                    myArray[i].PickupTime = arr[i].pickupTime;
                    myArray[i].PickupLocation = arr[i].pickupLocation;
                    myArray[i].DropLocation = arr[i].dropLocation;
                    myArray[i].Remarks = arr[i].remarks;
                    myArray[i].AddDt = arr[i].addDt.substring(0, arr[i].addDt.indexOf("T"));
                    myArray[i].AddUser = arr[i].addUser;
                    myArray[i].ReleaseAuth = arr[i].releaseAuth;
                    myArray[i].ReleaseStatusCode = arr[i].releaseStatusCode;
                    var relDt = arr[i].releaseDate;
                    if (relDt == null || relDt == "") { myArray[i].ReleaseDate = ''; }
                    else { myArray[i].ReleaseDate = arr[i].releaseDate.substring(0, arr[i].releaseDate.indexOf("T")); };
                    myArray[i].ReleaseRemarks = arr[i].releaseRemarks;
                    myArray[i].AdminUser = arr[i].adminUser;
                    myArray[i].AdminReleaseStatusCode = arr[i].adminReleaseStatusCode;
                    var admReldt = arr[i].adminReleaseDate;
                    if (admReldt == null || admReldt == "") { myArray[i].AdminReleaseDate = ''; }
                    else { myArray[i].AdminReleaseDate = arr[i].adminReleaseDate.substring(0, arr[i].adminReleaseDate.indexOf("T")); };
                    myArray[i].AdminReleaseRemarks = arr[i].adminReleaseRemarks;
                };
                $scope.allData = myArray; $scope.allData = $filter('orderBy')($scope.allData, 'BookingDate');
                $scope.exportObj = $scope.allData;
                $scope.$digest();
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
            };
        }; all.send();
    };
    //Get Employee vehicle requisition in date range
    $scope.GetByEmpVehicleReq = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var evr = new XMLHttpRequest;
        evr.open("GET", $scope._Conpath + "VehicleReq/GetByEmployee?empUnqId=" + $("#myEmpUnqId").val() +
            "&fromDt=" + $("#fromDt").val() + "&toDt=" + $("#toDt").val(), true);
        evr.setRequestHeader("Accept", "application/json");
        evr.onreadystatechange = function () {
            if (evr.readyState === 4 && evr.status === 200) {
                var json = JSON.parse(evr.responseText);
                var arr = new Array(); arr = json;
                for (var i = 0; i < arr.length; i++) {
                    var slot = arr[i].bookingSlot;
                    if (1 == parseInt(slot)) { arr[i].t_bookingSlot = "Morning"; };
                    if (2 == parseInt(slot)) { arr[i].t_bookingSlot = "Day"; };
                    if (3 == parseInt(slot)) { arr[i].t_bookingSlot = "Night"; };
                }; $scope.evrData = arr; $scope.$digest();
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
            } else if (evr.readyState === 4 && evr.status === 400 || evr.status === 403 || evr.status === 404 || evr.status === 408 || evr.status === 500) {
                var str =
                    evr.responseText.replace("[", '').replace("]", '').toString().replace("{", '').toString().replace("}", '').toString();
                var fields = str.split(','); var er = ""; for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er +
                    "</strong></div>";
                $('#MessageBox').show();
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
            };
        }; evr.send();
    };
    $scope.sort = function (keyname) { $scope.sortKey = keyname, $scope.reverse = !$scope.reverse };
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
});