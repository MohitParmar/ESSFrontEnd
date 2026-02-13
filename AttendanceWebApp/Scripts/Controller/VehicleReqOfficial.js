var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);
app.controller("VehicleReqOfficialController", function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = "Basic " + $("#myEmpUnqId").val(); $scope._Conpath = "";
    var url_string = window.location.href; url = new URL(url_string); urlhost = url.hostname; urlprotocol = url.protocol;
    $(document).ready(function () {
        "undefined" != typeof _ConPath &&
            (urlhost === _URLHostName ?
                $scope._Conpath = _ConPath :
                $scope._Conpath = urlprotocol + "//" + urlhost + "/api/")
    });
    $scope.currentPage = 1, $scope.itemsPerPage = 50; $scope.exportObj;
    $scope.ResetView = function () { window.location.reload(true) };
    var d = new Date(); var dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
    //To validate a booking date
    $scope.ToValidate = function () {
        var now = new Date();
        var dtnow = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(); var firstDay = now;
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
                "<strong>Please select booking Date...</strong></div>";
            $('#MessageBox').show();
            document.getElementById("tripDate").value = "";
            return false;
        };
        var date1 = new Date(chkFrom);
        var date2 = new Date(chkTo);
        if (date1 < date2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please enter valid date.</strong></div>";
            $('#MessageBox').show();
            document.getElementById("tripDate").value = "";
            return false;
        }
    };
    //To validate a booking time
    $scope.ToValidateTime = function () {
        var reqDate = $("#tripDate").val();
        var tripStartDate = $("#tripStartDate").val();
        var pickupLocation = $("#txtpickupLocation").val().toLowerCase();
        var dropLocation = $("#txtdropLocation").val().toLowerCase();
        var pickupTime = $("#txtpickupTime").val();

        // Combine date and time for pickup
        var pickupDateTime = new Date(tripStartDate + " " + pickupTime);
        var now = new Date();

        // Calculate difference in hours between pickup and current datetime
        var diffHours = (pickupDateTime - now) / (1000 * 60 * 60);

        // New: Enforce minimum 2 hours for all bookings
        if (diffHours < 2) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Trip booking must be at least 2 hours in advance.</strong></div>";
            $('#MessageBox').show();
            document.getElementById("txtpickupTime").value = "";
            return false;
        }

        // Use .includes() for substring check
        var specialLocations =
            ["ahmedabad", "rajkot", "gandhidham", "bhuj", "mandvi", "kera", "anjar", "airport", "bidra", "kandla",
                "nanakapaya", "kapaya", "bidda", "port", "adipur", "RTO"];
        var isSpecialPickup = specialLocations.some(function (loc) { return pickupLocation.includes(loc); });
        var isSpecialDrop = specialLocations.some(function (loc) { return dropLocation.includes(loc); });

        //change booking time from 8 hours to 4 hours if special location is involved in pickup or drop : 2025-09-20
        if (diffHours < 4 && (isSpecialPickup || isSpecialDrop)) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Pickup time must be at least 4 hours before from now for special locations.</strong></div>";
            $('#MessageBox').show();
            document.getElementById("txtpickupTime").value = "";
            return false;
        }

        return true;
    };
    //Create Trip
    $scope.TripBooking = function (data) {
        document.getElementById("btnSubmit").disabled = true;
        // Validate all required fields
        if (!data ||
            !data.tripDate ||
            !data.tripStartDate ||
            !data.tripEndDate ||
            !data.pickupLocation ||
            !data.pickupTime ||
            !data.dropLocation ||
            !data.numberOfPass ||
            !data.visitorName ||
            !data.visitorDesg ||
            !data.contactNo) {
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                "<strong>Please fill all the mandatory details.</strong></div>";
            $("#MessageBox").show();
            document.getElementById("btnSubmit").disabled = false;
            return;
        }

        // Validate date and time logic
        if ($scope.ToValidate && $scope.ToValidate() === false) {
            document.getElementById("btnSubmit").disabled = false;
            return;
        }

        if ($scope.ToValidateTime && $scope.ToValidateTime() === false) {
            document.getElementById("btnSubmit").disabled = false;
            return;
        }

        var jsonObj = {};
        jsonObj.EmpUnqId = $("#myEmpUnqId").val();
        jsonObj.ReqDate = dt;
        jsonObj.BookingDate = data.tripDate;
        jsonObj.PickupLocation = data.pickupLocation;
        jsonObj.PickupTime = data.pickupTime;
        jsonObj.DropLocation = data.dropLocation;
        jsonObj.ExpReturnTime = data.tripEndDate;           //not usable from 19-07-2025.
        jsonObj.NumberOfPass = data.numberOfPass;
        jsonObj.VisitorName = data.visitorName;
        jsonObj.VisitorDesg = data.visitorDesg;
        jsonObj.ContactNo = data.contactNo;
        jsonObj.Remarks = data.remarks;
        jsonObj.AddDt = dt;
        jsonObj.AddUser = $("#myEmpUnqId").val();
        jsonObj.TripStartDate = data.tripStartDate;
        jsonObj.TripEndDate = data.tripEndDate;
        jsonObj = JSON.stringify(jsonObj);
        var gtd = new XMLHttpRequest;
        gtd.open("POST", $scope._Conpath + "VehicleReqOfficial/CreateReq", true);
        gtd.setRequestHeader("Content-Type", "application/json");
        gtd.onreadystatechange = function () {
            if (gtd.readyState === 4 && gtd.status === 200) {
                document.getElementById("btnSubmit").disabled = false;
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    " <strong>Submission Completed Successfully.</strong></div>";
                $("#MessageBox").show();
                document.getElementById("tripDate").value = "";
                document.getElementById("tripStartDate").value = "";
                document.getElementById("tripEndDate").value = "";
                document.getElementById("txtpickupLocation").value = "";
                document.getElementById("txtpickupTime").value = "";
                document.getElementById("txtdropLocation").value = "";
                //document.getElementById("dtexpReturnTime").value = "";
                document.getElementById("txtnumberOfPass").value = "";
                document.getElementById("txtvisitorName").value = "";
                $("#cmbvisitorDesg").val("");
                document.getElementById("txtcontactNo").value = "";
                document.getElementById("txtremarks").value = "";
                document.getElementById("btnSubmit").disabled = false;

                //Auto Mail Start
                var json = JSON.parse(gtd.responseText); var maildata = []; maildata = json;
                var releaseStatusCode = maildata.releaseStatusCode;
                var rlsmail = new XMLHttpRequest();
                if (releaseStatusCode === "F") {
                    //Auto release - Mail Sending to Admin if HOD created
                    rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMailVehReqOfficial?reqId=' + maildata.reqId +
                        "&flag=false&isOfficial=N", true);
                } else {
                    //Auto Mail Sending to HOD
                    rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMailVehReqOfficial?reqId=' + maildata.reqId +
                        "&flag=true&isOfficial=N", true);
                }
                rlsmail.setRequestHeader("Content-type", "application/json");
                rlsmail.send();
                //Auto Mail End

            } else if (gtd.status === 400 || gtd.status === 403 || gtd.status === 404 || gtd.status === 408 || gtd.status === 500) {
                var str =
                    gtd.responseText.replace("[", '').replace("]", '').toString().replace("{", '').toString().replace("}", '').toString();
                var fields = str.split(',');
                var er = "";
                for (var i = 0; i < fields.length; i++) {
                    er = er + fields[i] + "<br/>";
                };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er +
                    "</strong></div>";
                $('#MessageBox').show();
                document.getElementById("tripDate").value = "";
                document.getElementById("tripStartDate").value = "";
                document.getElementById("tripEndDate").value = "";
                document.getElementById("txtpickupLocation").value = "";
                document.getElementById("txtpickupTime").value = "";
                document.getElementById("txtdropLocation").value = "";
                //document.getElementById("dtexpReturnTime").value = "";
                document.getElementById("txtnumberOfPass").value = "";
                document.getElementById("txtvisitorName").value = "";
                $("#cmbvisitorDesg").val("");
                document.getElementById("txtcontactNo").value = "";
                document.getElementById("txtremarks").value = "";
                document.getElementById("btnSubmit").disabled = false;
                //setTimeout($scope.ResetView(), 5000);
            };
        };
        gtd.send(jsonObj);
    };
    //Get pending req for release 
    $scope.GetReqForRel = function (isAdmin, isUH) {
        $("#loading").removeClass("deactivediv"); $("#loading").addClass("activediv");
        var gtd = new XMLHttpRequest;
        if (isUH) {
            gtd.open("GET", $scope._Conpath + "VehicleReqOfficial/GetReqForRelUH?empUnqId=" + $("#myEmpUnqId").val() +
                "&isUH=" + isUH, true);
        }
        else {
            gtd.open("GET", $scope._Conpath + "VehicleReqOfficial/GetReqForRel?empUnqId=" + $("#myEmpUnqId").val() +
                "&isAdmin=" + isAdmin, true);
        }
        gtd.setRequestHeader("Accept", "application/json");
        gtd.onreadystatechange = function () {
            if (gtd.readyState === 4 && gtd.status === 200) {
                var json = JSON.parse(gtd.responseText); var myArray = []; var arr = new Array(); arr = json;
                for (var i = 0; i < arr.length; i++) {
                    myArray.push([]);
                    myArray[i].ReqId = arr[i].reqId;
                    myArray[i].EmpUnqId = arr[i].empUnqId;
                    myArray[i].EmpName = arr[i].empName;
                    myArray[i].ReqDate = arr[i].reqDate;
                    myArray[i].BookingDate = arr[i].bookingDate;
                    myArray[i].BookingStatus = arr[i].bookingStatus;
                    myArray[i].PlaceOfBoarding = arr[i].pickupLocation;
                    myArray[i].PickupTime = arr[i].pickupTime;
                    myArray[i].PlaceOfVisit = arr[i].dropLocation;
                    myArray[i].TripStartDate = arr[i].tripStartDate;
                    myArray[i].TripEndDate = arr[i].tripEndDate;
                    myArray[i].NumberOfPass = arr[i].numberOfPass;
                    myArray[i].VisitorName = arr[i].visitorName;
                    myArray[i].VisitorDesg = arr[i].visitorDesg;
                    myArray[i].ContactNo = arr[i].contactNo;
                    myArray[i].Remarks = arr[i].remarks;
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
                    myArray[i].UnitHead = arr[i].unitHead;
                    myArray[i].UhApprovalFlag = arr[i].uhApprovalFlag;
                    myArray[i].UhApprovalDate = arr[i].uhApprovalDate;
                    myArray[i].UhApprovedBy = arr[i].uhApprovedBy;
                };
                $scope.tripData = myArray; $scope.$digest();
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
            }
            else if (gtd.status === 400 || gtd.status === 403 || gtd.status === 404 || gtd.status === 408 || gtd.status === 500) {
                $("#loading").removeClass("activediv"); $("#loading").addClass("deactivediv");
                var str = gtd.responseText.replace("[", '').replace("]", '').toString().replace("{", '').toString().replace("}", '').toString();
                var fields = str.split(','); var er = ""; for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er + "</strong></div>"; $('#MessageBox').show();
            };
        };
        gtd.send();
    };
    //Release Requisition Approve/Reject
    $scope.ReleaseReq = function (empid, reqId, isAdm, status, obj, flg) {
        
        var rmks = $("#txtRemarks").val();
        if (status === "R") {
            if ((typeof (obj) === "undefined")) {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Please Enter Remarks First For Rejection</strong></div>";
                $('#MessageBox').show();
                return false;
            };
            if (typeof (obj.Remarks) === "undefined" || rmks === "") {
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Please Enter Remarks First For Rejection</strong></div>";
                $('#MessageBox').show();
                return false;
            } else { rmks = obj.Remarks; };
        };

        var jsonObj = {};
        jsonObj.ReqId = reqId;
        jsonObj.EmpUnqId = empid;

        if (isAdm === true) {
            
            jsonObj.AdminReleaseStatusCode = status;
            jsonObj.AdminUser = $("#myEmpUnqId").val();
            jsonObj.AdminReleaseRemarks = rmks;
            jsonObj.UhApprovalFlag = obj.UHflag;
        } else {
            jsonObj.ReleaseAuth = $("#myEmpUnqId").val();
            jsonObj.ReleaseStatusCode = status;
            jsonObj.ReleaseRemarks = rmks;
        };

        jsonObj = JSON.stringify(jsonObj);

        var rel = new XMLHttpRequest;
        rel.open("PUT", $scope._Conpath + "VehicleReqOfficial/ReleaseReq?isAdmin=" + isAdm, true);
        rel.setRequestHeader("Content-Type", "application/json");
        rel.onreadystatechange = function () {
            if (rel.readyState === 4 && rel.status === 200) {
                if (flg === true || flg === "true") {
                    var index = $scope.allData.findIndex(function (item, i) {
                        return item.reqId === reqId
                    });
                    $scope.allData.splice(index, 1);
                    $scope.$digest();
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Cancelled Successfully.. </strong></div>";
                } else {
                    ////Auto mail start
                    ////Auto Mail Sending Admin
                    //if (isAdm === false && status === "F") {
                    //    var rlsmail = new XMLHttpRequest();
                    //    rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMailVehReqOfficial?reqId=' + reqId + "&flag=false&isOfficial=N", true);
                    //    rlsmail.setRequestHeader("Content-type", "application/json");
                    //    rlsmail.send();
                    //}
                    ////Auto Mail Sending to Admin
                    //if (isAdm === true && status === "F") {
                    //    var rlsmail = new XMLHttpRequest();
                    //    rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMailVehReqOfficial?reqId=' + reqId + "&flag=false&isOfficial=Y", true);
                    //    rlsmail.setRequestHeader("Content-type", "application/json");
                    //    rlsmail.send();
                    //}
                    ////Auto Mail Sending to Unit Head
                    //if (isAdm === true && obj.UHflag === true) {
                    //    var rlsmail = new XMLHttpRequest();
                    //    rlsmail.open('GET', $scope._Conpath + 'AutoMail/SendMailVehReqOfficial?reqId=' + reqId + "&flag=true&isOfficial=Y", true);
                    //    rlsmail.setRequestHeader("Content-type", "application/json");
                    //    rlsmail.send();
                    //}
                    ////Auto Mail End

                    var index = $scope.tripData.findIndex(function (item, i) { return item.reqId === reqId });
                    $scope.tripData.splice(index, 1);
                    $scope.$digest();
                    document.getElementById("MessageBox").innerHTML =
                        "<div class='alert alert-success alert-dismissable'>" +
                        "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                        "<strong>Approve/Rejected Successfully.. </strong></div>";
                };
                $("#MessageBox").show();
            } else if (rel.readyState === 4 &&
                rel.status === 400 || rel.status === 403 || rel.status === 404 || rel.status === 408 || rel.status === 500) {
                var str =
                    rel.responseText.replace("[", '').replace("]", '').toString().replace("{", '').toString().replace("}", '').toString();
                var fields = str.split(',');
                var er = "";
                for (var i = 0; i < fields.length; i++) {
                    er = er + fields[i] + "<br/>";
                };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er +
                    "</strong></div>";
                $('#MessageBox').show();
            };
        };
        rel.send(jsonObj);
    };
    //Release Requisition Approve/Reject
    $scope.ReleaseReqUH = function (empid, reqId, isUH) {
        var jsonObj = {};
        jsonObj.ReqId = reqId;
        jsonObj.EmpUnqId = empid;
        jsonObj.UhApprovalDate = dt;
        jsonObj.UhApprovedBy = $("#myEmpUnqId").val();
        jsonObj = JSON.stringify(jsonObj);

        var rel = new XMLHttpRequest;
        rel.open("PUT", $scope._Conpath + "VehicleReqOfficial/ReleaseReqUH?isUH=" + isUH, true);
        rel.setRequestHeader("Content-Type", "application/json");
        rel.onreadystatechange = function () {
            if (rel.readyState === 4 && rel.status === 200) {
                var index = $scope.tripData.findIndex(function (item, i) { return item.reqId === reqId });
                $scope.tripData.splice(index, 1);
                $scope.$digest();
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-success alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
                    "<strong>Approved Successfully.. </strong></div>";
                $("#MessageBox").show();
            } else if (rel.readyState === 4 &&
                rel.status === 400 || rel.status === 403 || rel.status === 404 || rel.status === 408 || rel.status === 500) {
                var str =
                    rel.responseText.replace("[", '').replace("]", '').toString().replace("{", '').toString().replace("}", '').toString();
                var fields = str.split(',');
                var er = "";
                for (var i = 0; i < fields.length; i++) {
                    er = er + fields[i] + "<br/>";
                };
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
        all.open("GET", $scope._Conpath + "VehicleReqOfficial/GetVehicleReq?fromDt=" + $("#fromDt").val() + "&toDt=" + $("#toDt").val(), true);
        all.setRequestHeader("Accept", "application/json");
        all.onreadystatechange = function () {
            if (all.readyState === 4 && all.status === 200) {
                var json = JSON.parse(all.responseText);
                var myArray = [];
                var arr = new Array();
                
                var tmpflg = url.searchParams.get("flg");
                var count = 0;
                var temparr = new Array();
                if (tmpflg === "V") {
                    //for (var key in json) {//if (json.hasOwnProperty(key)) {
                    for (var key in json) {
                        var tmpadminrelease = json[key].adminReleaseStatusCode;     //Not Posted/Partially Posted
                        if (tmpadminrelease === 'F') { temparr[count] = json[key]; count++; }
                    };
                    //};//};
                    arr = temparr;
                }
                else { arr = json; }
                for (var i = 0; i < arr.length; i++) {
                    myArray.push([]);
                    myArray[i].ReqId = arr[i].reqId;
                    myArray[i].EmpUnqId = arr[i].empUnqId;
                    myArray[i].EmpName = arr[i].empName;
                    myArray[i].Department = arr[i].deptName;
                    myArray[i].Station = arr[i].statName;
                    myArray[i].Designation = arr[i].desgName;
                    myArray[i].AddDate = arr[i].reqDate;
                    myArray[i].BookingDate = arr[i].bookingDate.substring(0, arr[i].bookingDate.indexOf("T"));

                    var bStatus = arr[i].bookingStatus;
                    if (bStatus === true || bStatus === 'true') { myArray[i].BookingStatus = 'Confirmed'; }
                    else { myArray[i].BookingStatus = 'Not Confirmed'; };

                    myArray[i].PlaceOfBoarding = arr[i].pickupLocation;

                    var ptime = arr[i].pickupTime;
                    if (ptime !== null) {
                        ptime = ptime.split("T"); ptime = ptime[1]; ptime = ptime.substr(0, 5);
                        myArray[i].PickupTime = ptime;
                    } else { myArray[i].PickupTime = ptime; };

                    myArray[i].PlaceOfVisit = arr[i].dropLocation;
                    myArray[i].TripStartDate = arr[i].tripStartDate.substring(0, arr[i].tripStartDate.indexOf("T"));
                    myArray[i].TripEndDate = arr[i].tripEndDate.substring(0, arr[i].tripEndDate.indexOf("T"));
                    myArray[i].NumberOfPass = arr[i].numberOfPass;
                    myArray[i].VisitorName = arr[i].visitorName;
                    myArray[i].VisitorDesg = arr[i].visitorDesg;
                    myArray[i].ContactNo = arr[i].contactNo;
                    myArray[i].Remarks = arr[i].remarks;
                    myArray[i].AddDt = arr[i].addDt;
                    myArray[i].AddUser = arr[i].addUser;
                    myArray[i].ReleaseStatusCode = arr[i].releaseStatusCode;
                    myArray[i].ReleaseRemarks = arr[i].releaseRemarks;
                    myArray[i].ReleaseAuth = arr[i].releaseAuth;
                    myArray[i].ReleaserName = arr[i].releaserName;

                    var relDt = arr[i].releaseDate;
                    if (relDt == null || relDt == "") { myArray[i].ReleaseDate = ''; }
                    else { myArray[i].ReleaseDate = arr[i].releaseDate; };

                    myArray[i].AdminReleaseStatusCode = arr[i].adminReleaseStatusCode;
                    myArray[i].AdminUser = arr[i].adminUser;
                    myArray[i].AdminUserName = arr[i].auName;

                    var admReldt = arr[i].adminReleaseDate;
                    if (admReldt == null || admReldt == "") { myArray[i].AdminReleaseDate = ''; }
                    else { myArray[i].AdminReleaseDate = arr[i].adminReleaseDate; };

                    myArray[i].AdminReleaseRemarks = arr[i].adminReleaseRemarks;
                    myArray[i].UnitHead = arr[i].unitHead;
                    myArray[i].UhApprovalFlag = arr[i].uhApprovalFlag;

                    var uhrelDt = arr[i].uhApprovalDate;
                    if (uhrelDt == null || uhrelDt == "") { myArray[i].UhApprovalDate = ''; }
                    else { myArray[i].UhApprovalDate = arr[i].uhApprovalDate; };

                    myArray[i].UhApprovedBy = arr[i].uhApprovedBy || '';
                    if (arr[i].uhApprovedBy === "true" || arr[i].uhApprovedBy === true) {
                        myArray[i].UnitHeadName = arr[i].uhName || '';
                    }
                };
                $scope.allData = myArray; $scope.allData = $filter('orderBy')($scope.allData, 'BookingDate');
                $scope.exportObj = $scope.allData; $scope.$digest();
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
            };
        }; all.send();
    };
    //Get Employee vehicle requisition in date range
    $scope.GetByEmpVehicleReq = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var evr = new XMLHttpRequest;
        evr.open("GET", $scope._Conpath + "VehicleReqOfficial/GetByEmployee?empUnqId=" + $("#myEmpUnqId").val() +
            "&fromDt=" + $("#fromDt").val() + "&toDt=" + $("#toDt").val(), true);
        evr.setRequestHeader("Accept", "application/json");
        evr.onreadystatechange = function () {
            if (evr.readyState === 4 && evr.status === 200) {
                var json = JSON.parse(evr.responseText); var arr = new Array(); arr = json;
                $scope.evrData = arr;
                $scope.$digest();
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
            } else if (evr.readyState === 4 && evr.status === 400 || evr.status === 403 || evr.status === 404 || evr.status === 408 || evr.status === 500) {
                var str =
                    evr.responseText.replace("[", '').replace("]", '').toString().replace("{", '').toString().replace("}", '').toString();
                var fields = str.split(',');
                var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML =
                    "<div class='alert alert-danger alert-dismissable'>" +
                    "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er +
                    "</strong></div>";
                $('#MessageBox').show();
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
            };
        }; evr.send();
    };
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname, $scope.reverse = !$scope.reverse
    };
    $scope.exportAllData = function (name) {
        setTimeout(function () {
            $("#loading").removeClass("deactivediv");
            $("#loading").addClass("activediv");
            var d = new Date; d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var FileName = name + d;
            $scope.JSONToCSVConvertor($scope.exportObj, FileName, !0);
            $("#loading").removeClass("activediv");
            $("#loading").addClass("deactivediv");
        }, 100)
    };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
        var arrData = "object" != typeof JSONData ? JSON.parse(JSONData) : JSONData, CSV = "";
        if (CSV += ReportTitle + "\r\n\n", ShowLabel) {
            var row = "";
            for (var index in arrData[0])
                row += index + ",";
            row = row.slice(0, -1),
                CSV += row + "\r\n"
        }
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i])
                row += '"' + arrData[i][index] + '",';
            row.slice(0, row.length - 1),
                CSV += row + "\r\n"
        }
        if ("" === CSV)
            return void alert("Invalid data");
        var fileName = "";
        fileName += ReportTitle.replace(/ /g, "_");
        var uri = "data:text/csv;charset=utf-8," + escape(CSV),
            link = document.createElement("a");
        link.href = uri,
            link.style = "visibility:hidden",
            link.download = fileName + ".csv",
            document.body.appendChild(link),
            link.click(),
            document.body.removeChild(link)
    };
});