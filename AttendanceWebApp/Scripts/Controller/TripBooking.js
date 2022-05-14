var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
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
        var chkFrom = $("#tripDate").val();
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
        if (diff > 91) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please Enter date under 90 days.</strong></div>";
            $('#MessageBox').show();
            document.getElementById("tripDate").value = "";
            return false;
        }
        if (date1 < date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please enter valid date.</strong></div>";
            $('#MessageBox').show();
            document.getElementById("tripDate").value = "";
            return false;
        }
    };
    //validate on selected date or slot.
    $scope.GetReqOnDate = function () {
        var trpdate = $("#tripDate").val();
        var slot = $("#cmbSlot").val();
        var grd = new XMLHttpRequest;
        grd.open("GET", $scope._Conpath + "VehicleReq/GetReqOnDate?date=" + trpdate + "&slot=" + slot, true);
        grd.setRequestHeader("Accept", "application/json");
        grd.onreadystatechange = function () {
            if (grd.readyState === 4 && grd.status === 200) { debugger; }
            else if (grd.status === 400 || grd.status === 403 || grd.status === 404 || grd.status === 408 || grd.status === 500) {
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
                document.getElementById("txtpickupLocation").value = "";
                document.getElementById("txtdropLocation").value = "";
                document.getElementById("txtremarks").value = "";
            };
        };
        grd.send();
    };
    //Create Trip
    $scope.TripBooking = function (data) {
        /*document.getElementById("btnSubmit").disabled = true;*/
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
                jsonObj.PickupTime = dt;
                jsonObj.PickupLocation = data.pickupLocation; jsonObj.DropLocation = data.dropLocation;
                jsonObj.Remarks = data.remarks; jsonObj.AddDt = dt;
                jsonObj.AddUser = $("#myEmpUnqId").val(); jsonObj = JSON.stringify(jsonObj);
                var gtd = new XMLHttpRequest;
                gtd.open("POST", $scope._Conpath + "VehicleReq/CreateReq", true);
                gtd.setRequestHeader("Content-Type", "application/json");
                gtd.onreadystatechange = function () {
                    if (gtd.readyState === 4 && gtd.status === 200) {
                        document.getElementById("btnSubmit").disabled = false;
                        document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + " <strong>Submit Successfully.. </strong></div>"; $("#MessageBox").show();
                        document.getElementById("tripDate").value = "";
                        $("#cmbSlot option:first").attr("selected", true);
                        document.getElementById("txtpickupLocation").value = "";
                        document.getElementById("txtdropLocation").value = "";
                        document.getElementById("txtremarks").value = "";
                    } else {
                        document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + " <strong>Not Submited.. </strong></div>"; $("#MessageBox").show();
                    }
                };
                gtd.send(jsonObj);
            } else if (vhr.status === 400 || vhr.status === 403 || vhr.status === 404 || vhr.status === 408 || vhr.status === 500) {
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
                document.getElementById("btnSubmit").disabled = false;
            };
        };
        vhr.send();
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
                    if (1 == parseInt(slot)) { myArray[i].bookingSlot = "Morning"; };
                    if (2 == parseInt(slot)) { myArray[i].bookingSlot = "Evening"; };
                    if (3 == parseInt(slot)) { myArray[i].bookingSlot = "Night"; };
                    myArray[i].reqId = arr[i].reqId;
                    myArray[i].empUnqId = arr[i].empUnqId;
                    myArray[i].empName = "Mohit Parmar";
                    myArray[i].reqDate = arr[i].reqDate;
                    myArray[i].bookingDate = arr[i].bookingDate;
                    myArray[i].pickupTime = arr[i].pickupTime;
                    myArray[i].pickupLocation = arr[i].pickupLocation;
                    myArray[i].dropLocation = arr[i].dropLocation;
                    myArray[i].remarks = arr[i].remarks;
                    myArray[i].addDt = arr[i].addDt.substring(0, arr[i].addDt.indexOf("T"));
                    myArray[i].addUser = arr[i].addUser;
                    myArray[i].releaseGroupCode = arr[i].releaseGroupCode;
                    myArray[i].releaseStrategy = arr[i].releaseStrategy;
                    myArray[i].releaseCode = arr[i].releaseCode;
                    myArray[i].releaseStatusCode = arr[i].releaseStatusCode;
                    myArray[i].releaseRemarks = arr[i].releaseRemarks;
                    myArray[i].releaseAuth = arr[i].releaseAuth;
                    myArray[i].releaseDate = arr[i].releaseDate;
                    myArray[i].adminReleaseStatusCode = arr[i].adminReleaseStatusCode;
                    myArray[i].adminUser = arr[i].adminUser;
                    myArray[i].adminReleaseDate = arr[i].adminReleaseDate;
                    myArray[i].adminReleaseRemarks = arr[i].adminReleaseRemarks;
                };
                $scope.tripData = myArray; $scope.$digest();
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
            }
            else if (gtd.status === 400 || gtd.status === 403 || gtd.status === 404 || gtd.status === 408 || gtd.status === 500) {
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
        var rmks = "";
        if (status === "R") {
            if ((typeof (obj) === "undefined") || (typeof (obj.Remarks) === "undefined")) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Please Enter Remarks First For Rejection</strong></div>";
                $('#MessageBox').show();
                return false;
            } else { rmks = obj.Remarks; };
        } else { if ((typeof (obj) === "undefined")) { rmks = ""; } else { rmks = obj.Remarks; }; };
        var jsonObj = {}; jsonObj.ReqId = reqId; jsonObj.EmpUnqId = empid;
        if (isAdm === true) {
            jsonObj.AdminReleaseStatusCode = status;
            jsonObj.AdminUser = $("#myEmpUnqId").val()
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
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Release Successfully.. </strong></div>";
                $("#MessageBox").show();
                if (flg === true) {
                    var index = $scope.allData.findIndex(function (item, i) { return item.reqId === reqId });
                    $scope.allData.splice(index, 1); $scope.$digest();
                } else { $scope.GetReqForRel(isAdm); }
            } else if (rel.status === 400 || rel.status === 403 || rel.status === 404 || rel.status === 408 || rel.status === 500) {
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
    //Get all vehicel req in date range
    $scope.GetVehicleReq = function () {
        var all = new XMLHttpRequest;
        all.open("GET", $scope._Conpath + "VehicleReq/GetVehicleReq?fromDt=" + $("#fromDt").val() + "&toDt=" + $("#toDt").val(), true);
        all.setRequestHeader("Accept", "application/json");
        all.onreadystatechange = function () {
            if (all.readyState === 4 && all.status === 200) {
                var json = JSON.parse(all.responseText);
                var arr = new Array(); arr = json;
                for (var i = 0; i < arr.length; i++) {
                    var slot = arr[i].bookingSlot;
                    if (1 == parseInt(slot)) { arr[i].bookingSlot = "Morning"; };
                    if (2 == parseInt(slot)) { arr[i].bookingSlot = "Evening"; };
                    if (3 == parseInt(slot)) { arr[i].bookingSlot = "Night"; };
                };
                $scope.allData = arr;
                $scope.$digest();
            };
        };
        all.send();
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