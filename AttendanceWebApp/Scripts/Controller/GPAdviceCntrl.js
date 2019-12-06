var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('GPAdviceController', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 10; $scope.alluserlist = []; $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.GPAdviceInfo; $scope.empdata; var rlsarr = []; var count = 0; jQuery.support.cors = true; $scope.ResetView = function () { window.location.reload(true); };
    $scope.ToValidate = function () { var FromDate = new Date(); var chkTo = document.getElementById('ApproxDt'); var ToDate = chkTo.value; var date1 = new Date(FromDate); var date2 = new Date(ToDate); var diff = ((date1 - date2) / (1000 * 60 * 60 * 24) * -1) + 1; if (diff > 181) { alert("Please Select Date of return up to 180 Days..."); $('#ApproxDt').val(''); return false; } $('#TotalDays').text = diff; document.getElementById("TotalDays").value = diff; if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Valid Date..</strong></div>"; $('#MessageBox').show(); return false; } else { return true; }; };//Date Validation
    $scope.GetEmpInfo = function () { var emp = new XMLHttpRequest(); emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + $('#myEmpUnqId').val(), true); emp.setRequestHeader('Accept', 'application/json'); emp.onreadystatechange = function () { if (emp.readyState === 4) { var json = JSON.parse(emp.responseText); $scope.empdata = json; $scope.$digest(); }; }; emp.send(); };
    $scope.GetRelesaseStrategy = function () { var rel = new XMLHttpRequest(); rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=' + $('#releaseGroupCode').val() + '&empUnqId=' + $('#myEmpUnqId').val(), true); rel.setRequestHeader('Accept', 'application/json'); rel.onreadystatechange = function () { if (rel.readyState === 4) { var jsonvar1 = JSON.parse(rel.responseText); $scope.rlsdata = jsonvar1; $scope.$digest(); }; }; rel.send(); };
    //Add New Material
    $scope.AddMaterial = function (entity, editflag) {
        var MaterialDesc = $('#txtMaterialDesc').val();
        if ((typeof (entity) === "undefined") || (typeof (entity.MaterialCode) === "undefined") || (typeof (entity.MaterialQty) === "undefined") ||
            (typeof (entity.ApproxValue) === "undefined")) { alert("Please Fill All Required Details Step by Step..."); return false; };
        if (editflag === false) {
            var tables = document.getElementById('aliasTable'); var rowCounts = tables.rows.length; for (var i = 0; i < rowCounts; i++) {
                count++; $('.tempRow').remove();
                var row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='GpAdviceItem' value='" + count + "'>" + count + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='MaterialCode' value='" + entity.MaterialCode + "'>" + entity.MaterialCode + "</td>" +
                    "<td style='text-align:left;'><input type='hidden' name='MaterialDesc' value='" + $('#txtMaterialDesc').val() + "'>" + $('#txtMaterialDesc').val() + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='MaterialQty' value='" + entity.MaterialQty + "'>" + entity.MaterialQty + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='ApproxValue' value='" + entity.ApproxValue + "'>" + entity.ApproxValue + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='HsnCode' value='" + $('#txtHsnCode').val() + "'>" + $('#txtHsnCode').val() + "</td>" +
                    "</tr>"); $("#aliasTable").append(row); break;
            };
        };
        if (editflag === true) {
            var tables = document.getElementById('editTable'); var rowCounts = tables.rows.length; for (var i = 0; i <= rowCounts; i++) {
                count++; $('.tempRow').remove();
                var row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='GpAdviceItem' value='" + rowCounts + "'>" + rowCounts + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='MaterialCode' value='" + entity.MaterialCode + "'>" + entity.MaterialCode + "</td>" +
                    "<td style='text-align:left;'><input type='hidden' name='MaterialDesc' value='" + entity.MaterialDesc + "'>" + entity.MaterialDesc + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='MaterialQty' value='" + entity.MaterialQty + "'>" + entity.MaterialQty + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='ApproxValue' value='" + entity.ApproxValue + "'>" + entity.ApproxValue + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='HsnCode' value='" + entity.HsnCode + "'>" + entity.HsnCode + "</td>" + "</tr>");
                $("#editTable").append(row); break;
            };
        };
        document.getElementById("txtMaterialCode").value = ""; document.getElementById("txtMaterialDesc").value = ""; document.getElementById("txtMaterialQty").value = ""; document.getElementById("txtApproxValue").value = ""; document.getElementById("txtHsnCode").value = "";
    };
    //Generate / Update  Gate Pass Advice 
    $scope.GenerateGPAdvice = function (data, editflag) {
        //$('#txtVenderName').val(); $('#txtVenderAdd1').val();
        var d2 = new Date(); var year = d2.getFullYear().toString(); var month = d2.getMonth() + 1; var yearmonth = year + (month.toString());
        var today = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes(), d2.getSeconds());
        var now = (today.getFullYear()) + '/' + (today.getMonth() + 1) + '/' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var tables; if (editflag === false) { tables = document.getElementById('aliasTable'); }; if (editflag === true) { tables = document.getElementById('editTable'); };
        var jsonObj = {}; var TableData = storeTblValues(); TableData = JSON.stringify(TableData);
        function storeTblValues() {
            var TableData = new Array();
            if (editflag === false) {
                $('#aliasTable tr').each(function (row, tr) { TableData[row] = { "yearMonth": yearmonth, "gpAdviceNo": 0, "gpAdviceItem": $(tr).find('td:eq(0)').text(), "materialCode": $(tr).find('td:eq(1)').text(), "materialDesc": $(tr).find('td:eq(2)').text(), "materialQty": $(tr).find('td:eq(3)').text(), "approxValue": $(tr).find('td:eq(4)').text(), "hsnCode": $(tr).find('td:eq(5)').text() } });
                jsonObj.gpAdviceNo = 0; jsonObj.gpAdviceDate = now; jsonObj.gpAdviceType = data.GpAdviceType; jsonObj.purpose = data.Purpose;
                jsonObj.workOrderNo = data.WorkOrderNo; jsonObj.vendorCode = data.VenderCode; jsonObj.vendorName = $('#txtVenderName').val();
                jsonObj.vendorAddress1 = $('#txtVenderAdd1').val(); jsonObj.vendorAddress2 = $('#txtVenderAdd2').val(); jsonObj.vendorAddress3 = $('#txtVenderAdd3').val();
                jsonObj.approxDateOfReturn = data.ApproxDt; jsonObj.modeOfTransport = data.ModeOfTransport; jsonObj.transporterName = $('#txtTransporterName').val();
                jsonObj.requisitioner = data.Requisitioner; jsonObj.sapGpNumber = null; jsonObj.poTerms = data.PoTerms; jsonObj.empUnqId = $scope.empdata[0]['empUnqId'];
                jsonObj.unitCode = $scope.empdata[0]['unitCode']; jsonObj.deptCode = $scope.empdata[0]['deptCode']; jsonObj.statCode = $scope.empdata[0]['statCode'];
                jsonObj.addDt = now; jsonObj.addUser = $('#myEmpUnqId').val();
            }; if (editflag === true) {
                $('#editTable tr').each(function (row, tr) { TableData[row] = { "yearMonth": yearmonth, "gpAdviceNo": $('#gpAdviceNo').val(), "gpAdviceItem": $(tr).find('td:eq(0)').text(), "materialCode": $(tr).find('td:eq(1)').text(), "materialDesc": $(tr).find('td:eq(2)').text(), "materialQty": $(tr).find('td:eq(3)').text(), "approxValue": $(tr).find('td:eq(4)').text(), "hsnCode": $(tr).find('td:eq(5)').text() } });
                jsonObj.gpAdviceNo = $('#gpAdviceNo').val(); jsonObj.gpAdviceDate = $scope.pdata[0]['gpAdviceDate'];; jsonObj.gpAdviceType = $('#GpAdviceType').val();
                jsonObj.purpose = $('#txtPurpose').val(); jsonObj.workOrderNo = $('#txtWONO').val(); jsonObj.vendorCode = $('#txtVenderCode').val();
                jsonObj.vendorName = $('#txtVenderName').val(); jsonObj.vendorAddress1 = $('#txtVenderAdd1').val(); jsonObj.vendorAddress2 = $('#txtVenderAdd2').val();
                jsonObj.vendorAddress3 = $('#txtVenderAdd3').val(); jsonObj.approxDateOfReturn = $('#ApproxDt').val();
                jsonObj.modeOfTransport = $('#ModeOfTransport').val(); jsonObj.transporterName = $('#txtTransporterName').val();
                jsonObj.requisitioner = $('#txtRequisitioner').val(); jsonObj.sapGpNumber = null; jsonObj.poTerms = $('#txtPoTerms').val();
                jsonObj.empUnqId = $scope.pdata[0]['empUnqId']; jsonObj.unitCode = $scope.pdata[0]['unitCode']; jsonObj.deptCode = $scope.pdata[0]['deptCode'];
                jsonObj.statCode = $scope.pdata[0]['statCode']; jsonObj.updDt = now; jsonObj.updUser = $('#myEmpUnqId').val();
            }; TableData.shift();
            jsonObj.yearMonth = yearmonth; jsonObj.gpAdviceStatus = "N"; jsonObj.releaseGroupCode = "GA"; jsonObj.gaReleaseStrategy = $('#myEmpUnqId').val(); jsonObj.releaseStatusCode = "N"; jsonObj.gpAdviceDetails = TableData; return jsonObj;
        };
        var xhr = new XMLHttpRequest(); if (editflag === false) { xhr.open('POST', $scope._Conpath + 'GpAdvice/CreateGpAdvice', true); }; if (editflag === true) { xhr.open('PUT', $scope._Conpath + 'GpAdvice/UpdateGpAdvice', true); };
        xhr.setRequestHeader("Content-type", "application/json"); xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Gate Pass Advice Generated Successfully...</strong></div>"; $('#MessageBox').show();
                if (editflag === false) { $("#aliasTable").find("tr:not(:first)").remove(); }; if (editflag === true) { $("#editTable").find("tr:not(:first)").remove(); };
                document.getElementById("txtPurpose").value = ""; document.getElementById("txtWONO").value = ""; document.getElementById("txtVenderCode").value = ""; document.getElementById("txtVenderName").value = ""; document.getElementById("txtVenderAdd1").value = ""; document.getElementById("txtVenderAdd2").value = ""; document.getElementById("txtVenderAdd3").value = ""; document.getElementById("ApproxDt").value = ""; document.getElementById("txtModeOfTransport").value = ""; document.getElementById("txtTransporterName").value = ""; document.getElementById("txtMaterialCode").value = ""; document.getElementById("txtMaterialDesc").value = ""; document.getElementById("txtMaterialQty").value = ""; document.getElementById("txtApproxValue").value = ""; document.getElementById("txtHsnCode").value = ""; document.getElementById("txtRequisitioner").value = ""; document.getElementById("txtPoTerms").value = "";
            } else if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Gate Pass Advice Updated Successfully...</strong></div>"; $('#MessageBox').show();
                if (editflag === false) { $("#aliasTable").find("tr:not(:first)").remove(); }; if (editflag === true) { $("#editTable").find("tr:not(:first)").remove(); };
                document.getElementById("txtPurpose").value = ""; document.getElementById("txtWONO").value = ""; document.getElementById("txtVenderCode").value = ""; document.getElementById("txtVenderName").value = ""; document.getElementById("txtVenderAdd1").value = ""; document.getElementById("txtVenderAdd2").value = ""; document.getElementById("txtVenderAdd3").value = ""; document.getElementById("ApproxDt").value = ""; document.getElementById("txtModeOfTransport").value = ""; document.getElementById("txtTransporterName").value = ""; document.getElementById("txtMaterialCode").value = ""; document.getElementById("txtMaterialDesc").value = ""; document.getElementById("txtMaterialQty").value = ""; document.getElementById("txtApproxValue").value = ""; document.getElementById("txtHsnCode").value = ""; document.getElementById("txtRequisitioner").value = ""; document.getElementById("txtPoTerms").value = "";
                $scope.GetGPAListInfo();
            } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Gate Pass Advice not Saved..</strong></div>"; $('#MessageBox').show(); };
        }; xhr.send(TableData);
    };
    //Get GP Advice List generated by user
    $scope.GetGPAListInfo = function () { var xhr3 = new XMLHttpRequest(); xhr3.open('GET', $scope._Conpath + 'GpAdvice/GetGpAdvice?empUnqId=' + $('#myEmpUnqId').val(), true); xhr3.setRequestHeader('Accept', 'application/json'); xhr3.onreadystatechange = function () { if (xhr3.readyState === 4) { var json = JSON.parse(xhr3.responseText); $scope.gpalist = json; $scope.gpalist = $filter('orderBy')($scope.gpalist, '-gpAdviceNo'); $scope.$digest(); } }; xhr3.send(); };
    //Get Pending GP Advice List for Release
    $scope.GetGPALists = function () { var xhr1 = new XMLHttpRequest(); xhr1.open('GET', $scope._Conpath + 'AppRelease/GetApplReleaseStatus?empUnqId=' + $('#myEmpUnqId').val() + '&releaseGroupCode=GA', true); xhr1.setRequestHeader('Accept', 'application/json'); xhr1.onreadystatechange = function () { if (xhr1.readyState === 4) { var json = JSON.parse(xhr1.responseText); rlsarr = json; $scope.gparlsdata = json; $scope.gparlsdata = $filter('orderBy')($scope.gparlsdata, '-gpAdviceNo'); $scope.$digest(); } }; xhr1.send(); };
    //Popup the Model
    $scope.PopulateData = function (gpAdviceNo, yearMonth) { $scope.GetGPAdviceDetails(yearMonth, gpAdviceNo, false); $('#ConformModel').modal('show'); };
    //Popup the Model
    $scope.PopulateEdit = function (gpAdviceNo, yearMonth) { $scope.GetGPAdviceDetails(yearMonth, gpAdviceNo, true); $('#EditModel').modal('show'); };
    //Get GPAdviceDetails
    $scope.GetGPAdviceDetails = function (yearMonth, gpAdviceNo, editflag) {
        var pdata = new XMLHttpRequest();
        pdata.open('GET', $scope._Conpath + 'GpAdvice/GetGpAdvice?yearMonth=' + yearMonth + '&gpAdviceNo=' + gpAdviceNo, true);
        pdata.setRequestHeader('Accept', 'application/json'); pdata.onreadystatechange = function () {
            if (pdata.readyState === 4) {
                var jsonvar1 = JSON.parse(pdata.responseText); $scope.pdata = jsonvar1; $scope.pdata = $filter('orderBy')($scope.pdata, '-gpAdviceNo'); $scope.$digest();
                if (editflag === true) {
                    $('#GpAdviceType').val($scope.pdata[0].gpAdviceType); $('#ModeOfTransport').val($scope.pdata[0].modeOfTransport);
                    if ($scope.pdata[0].gpAdviceType = 'RGP') { $('#ApproxDt').val($scope.pdata[0].approxDateOfReturn.replace("T00:00:00", "")); };
                };
            };
        }; pdata.send();
    };
    //Release GP Advice
    $scope.ReleaseGPAdvice = function (cnt, gpAdviceNo, releaseStatusCode) {
        var rmks = ''; if (releaseStatusCode === "R") { if ((typeof (cnt) === "undefined") || (typeof (cnt.Remarks) === "undefined")) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Remarks First For Rejection</strong></div>"; $('#MessageBox').show(); return false; } else { rmks = cnt.Remarks; } } else { if ((typeof (cnt) === "undefined")) { rmks = ""; } else { rmks = cnt.Remarks; }; }; var d = new Date(); var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        // Get Releaser Details From AppReleaseStatus Table
        var detailarr = []; for (var r = 0; r <= rlsarr.length; r++) { var ecode = rlsarr[r]["gpAdviceNo"]; if (ecode == gpAdviceNo) { detailarr = rlsarr[r]["applReleaseStatus"]; break; } };
        var dataarr = []; for (i = 0; i < detailarr.length; i++) { var release_auth = detailarr[i]["releaseAuth"]; if (release_auth === $('#myEmpUnqId').val()) { dataarr = detailarr[i]; break; } };
        var jsonObj = {}; jsonObj.YearMonth = dataarr.yearMonth; jsonObj.ReleaseGroupCode = dataarr.releaseGroupCode; jsonObj.ApplicationId = gpAdviceNo; jsonObj.ReleaseStrategy = dataarr.releaseStrategy; jsonObj.ReleaseStrategyLevel = dataarr.releaseStrategyLevel; jsonObj.ReleaseCode = dataarr.releaseCode; jsonObj.ReleaseStatusCode = dataarr.releaseStatusCode; jsonObj.ReleaseDate = strDate; jsonObj.ReleaseAuth = dataarr.releaseAuth; jsonObj.IsFinalRelease = dataarr.isFinalRelease; jsonObj.Remarks = rmks; jsonObj.LeaveApplications_YearMonth = null; jsonObj.LeaveApplications_LeaveAppId = null; jsonObj = JSON.stringify(jsonObj);
        var xhr2 = new XMLHttpRequest(); xhr2.open('POST', $scope._Conpath + 'AppRelease/UpdateGpStatus?empUnqId=' + $('#myEmpUnqId').val() + '&releaseStatusCode=' + releaseStatusCode + '&releaseGroupCode=GA', true); xhr2.setRequestHeader("Content-type", "application/json");
        xhr2.onreadystatechange = function () { if (xhr2.readyState === 4) { $scope.GetGPALists(); if (releaseStatusCode === 'F') { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" + "<strong>Gate Pass Advice Releasesd Successfully...</strong></div>"; $('#MessageBox').show(); }; if (releaseStatusCode === 'R') { document.getElementById("Remarks").value = ""; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Gate Pass Advice Rejected Sucesfully.. </strong></div>"; }; $('#MessageBox').show(); } else { $scope.GetGPALists(); if (releaseStatusCode === 'F') { document.getElementById("Remarks").value = ""; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Gate Pass Advice Not Approved.. </strong></div>"; }; if (releaseStatusCode === 'R') { document.getElementById("Remarks").value = ""; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong> Gate Pass Advice Not Rejected .. </strong></div>"; }; $('#MessageBox').show(); }; }; xhr2.send(jsonObj);
    };
    //Releaser Gate Pass Advice Report
    $scope.GatePassAdviceReport = function (rptdata) { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var FromDate, ToDate; if ((typeof (rptdata) === "undefined") || (typeof (rptdata.FromDt) === "undefined") || (typeof (rptdata.ToDt) === "undefined")) { var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0); FromDate = firstDay.getFullYear() + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate(); ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate()); } else { FromDate = rptdata.FromDt; ToDate = rptdata.ToDt; }; var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false; }; var rpt = new XMLHttpRequest(); rpt.open('GET', $scope._Conpath + 'GpAdvice/GetGpAdvice?empUnqId=' + $('#myEmpUnqId').val() + '&fromDt=' + FromDate + '&toDt=' + ToDate, true); rpt.setRequestHeader('Accept', 'application/json'); rpt.onreadystatechange = function () { if (rpt.readyState === 4) { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); var json7 = JSON.parse(rpt.responseText); $scope.gparpt = json7; $scope.gparpt = $filter('orderBy')($scope.gparpt, '-gpAdviceNo'); $scope.$digest(); }; }; rpt.send(); };
    //Get Pending Gatepass Advice List For Post
    $scope.GetGPAPost = function (postdata, posted) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var FromDate, ToDate;
        if ((typeof (postdata) === "undefined") || (typeof (postdata.FromDt) === "undefined") || (typeof (postdata.ToDt) === "undefined")) {
            var date = new Date(); var firstDay = new Date(date.getFullYear(), date.getMonth(), 1); var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            FromDate = (firstDay.getFullYear()) + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate(); ToDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + (lastDay.getDate());
        } else {
            FromDate = postdata.FromDt; ToDate = postdata.ToDt;
        }; var date1 = new Date(FromDate); var date2 = new Date(ToDate); if (date2 < date1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Please Enter Valid Date Range.. </strong></div>"; $('#MessageBox').show(); return false;
        }; var xhr4 = new XMLHttpRequest();
        xhr4.open('GET', $scope._Conpath + 'GpAdvice/GetGpAdviceForPosting?fromDt=' + FromDate + '&toDt=' + ToDate + '&posted=' + posted, true);
        xhr4.setRequestHeader('Accept', 'application/json'); xhr4.onreadystatechange = function () {
            if (xhr4.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); var json = JSON.parse(xhr4.responseText); $scope.gpapostlist = json;
                $scope.gpapostlist = $filter('orderBy')($scope.gpapostlist, '-gpAdviceNo'); $scope.$digest();
            };
        }; xhr4.send();
    };
    //Post Gate Pass Advice
    $scope.PostGpAdvice = function (postdata, gpAdviceNo, yearMonth, gpAdviceStatus) {
        var rmks = ''; var pst = new XMLHttpRequest(); var jsonobj = {}; jsonobj.yearMonth = yearMonth; jsonobj.gpAdviceNo = gpAdviceNo; jsonobj.empUnqId = $('#myEmpUnqId').val(); jsonobj.postingStatus = gpAdviceStatus;
        if ((typeof (postdata) === "undefined") || (typeof (postdata.Remarks) === "undefined") || (typeof (postdata.SAPGPNumber) === "undefined")) { jsonobj.remarks = ''; jsonobj.sapGpNumber = 0; } else { jsonobj.remarks = postdata.Remarks; jsonobj.sapGpNumber = postdata.SAPGPNumber; };
        if (gpAdviceStatus === "R") { if (postdata === "Self Cancelled") { jsonobj.remarks = ''; jsonobj.sapGpNumber = 0; } else if ((typeof (postdata) === "undefined") || (typeof (postdata.Remarks) === "undefined")) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Remarks For Rejection</strong></div>"; $('#MessageBox').show(); return false; } else { jsonobj.remarks = postdata.Remarks }; };
        var TableData = JSON.stringify(jsonobj); pst.open('POST', $scope._Conpath + 'GPAdvice/PostGpAdvice?flag=true', true);
        pst.setRequestHeader("Content-type", "application/json"); pst.onreadystatechange = function () {
            if (pst.readyState === 4 && pst.status === 200) {  document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> Gate Pass Advice Post Successfully... </strong></div>"; $('#MessageBox').show(); $scope.GetGPAPost('', 'true'); } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> Gate Pass Advice not Posted... </strong></div>"; $('#MessageBox').show(); $scope.GetGPAPost('', 'true'); };
        }; pst.send(TableData);
    };
    //Read Upload File Data
    $scope.Upload = function () {
        var fileUpload = document.getElementById("fileUpload"); //Reference the FileUpload element.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;    //Validate whether File is valid Excel file.
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                //For Browsers other than IE.
                if (reader.readAsBinaryString) { reader.onload = function (e) { ProcessExcel(e.target.result); }; reader.readAsBinaryString(fileUpload.files[0]); }
                else {  //For IE Browser.
                    reader.onload = function (e) { var data = ""; var bytes = new Uint8Array(e.target.result); for (var i = 0; i < bytes.byteLength; i++) { data += String.fromCharCode(bytes[i]); }; ProcessExcel(data); }; reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else { alert("This browser does not support HTML5."); };
        } else { alert("Please upload a valid Excel file."); };
    };
    //Process Upload File Data
    function ProcessExcel(data) {
        var workbook = XLSX.read(data, { type: 'binary' });     //Read the Excel File data.
        var firstSheet = workbook.SheetNames[0];                //Fetch the name of First Sheet.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]); var TableData = new Array(); Tabledata = JSON.stringify(excelRows); //Read all rows from First Sheet into an JSON array.
        var firstcol = ''; if (excelRows.length > 0) { var columnsIn = excelRows[0]; for (var key in columnsIn) { firstcol = key; break; }; }; // here is your column name you are looking for
        var upd = new XMLHttpRequest(); if (firstcol === 'MaterialCode') { upd.open('POST', $scope._Conpath + 'MasterUpload/UploadFile?empUnqId=' + $('#myEmpUnqId').val() + "&flag=m", true); } else if (firstcol === 'VendorCode') { upd.open('POST', $scope._Conpath + 'MasterUpload/UploadFile?empUnqId=' + $('#myEmpUnqId').val() + "&flag=v", true); };
        upd.setRequestHeader("Content-type", "application/json"); upd.onreadystatechange = function () { if (upd.readyState === 4 && upd.status === 200) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Sucessfully Uploaded..." + upd.responseText + "</strong></div>"; $('#MessageBox').show(); } else { var str = upd.responseText.replace("{", '').replace("}", '').replace("'", '').toString(); var fields = str.split(','); var er = ""; for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; }; document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Not Uploaded Please Check the File..." + er + "</strong></div>"; $('#MessageBox').show(); }; }; upd.send(Tabledata);
        //Create a HTML Table element.
        /*var table = document.createElement("table"); table.border = "1"; var row = table.insertRow(-1);  //Add the header row.
        var headerCell = document.createElement("TH"); headerCell.innerHTML = "MaterialCode"; row.appendChild(headerCell);  //Add the header cells.
        headerCell = document.createElement("TH"); headerCell.innerHTML = "MaterialDescription"; row.appendChild(headerCell); for (var i = 0; i < excelRows.length; i++) { var row = table.insertRow(-1); var cell = row.insertCell(-1); cell.innerHTML = excelRows[i].MaterialCode; cell = row.insertCell(-1); cell.innerHTML = excelRows[i].MaterialDescription; };//Add the data rows from Excel file.
        var dvExcel = document.getElementById("dvExcel"); dvExcel.innerHTML = ""; dvExcel.appendChild(table);*/
    };
    //Get Master Data
    $scope.GetMasterData = function (Code) { var mst = new XMLHttpRequest(); if (Code === 'm') { mst.open('GET', $scope._Conpath + 'MasterUpload/GetObject?flag=m&objectCode=' + $('#txtMaterialCode').val(), true); }; if (Code === 'v') { mst.open('GET', $scope._Conpath + 'MasterUpload/GetObject?flag=v&objectCode=' + $('#txtVenderCode').val(), true); }; mst.setRequestHeader('Accept', 'application/json'); mst.onreadystatechange = function () { if (mst.readyState === 4) { var jsonvar1 = JSON.parse(mst.responseText); $scope.mdata = jsonvar1; $scope.$digest(); if (Code === 'm') { $('#txtMaterialDesc').val($scope.mdata.materialDesc); $('#txtHsnCode').val($scope.mdata.hsnCode); }; if (Code === 'v') { $('#txtTransporterName').val($scope.mdata.vendorCode); $('#txtVenderName').val($scope.mdata.vendorName); $('#txtVenderAdd1').val($scope.mdata.vendorAddress1); $('#txtVenderAdd2').val($scope.mdata.vendorAddress2); $('#txtVenderAdd3').val($scope.mdata.vendorAddress3); }; }; }; mst.send(); };
    //Sort Grid Data
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; }; $scope.exportAllData = function () { setTimeout(function () { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var d = new Date(); d = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); var FileName = "Gate_Pass_Report_" + d; $scope.JSONToCSVConvertor($scope.GPAdviceInfo, FileName, true); $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); }, 100); }; $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData; var CSV = ''; CSV += ReportTitle + '\r\n\n'; if (ShowLabel) { var row = ""; for (var index in arrData[0]) { row += index + ','; }; row = row.slice(0, -1); CSV += row + '\r\n'; }; for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; } row.slice(0, row.length - 1); CSV += row + '\r\n'; }; if (CSV === '') { alert("Invalid data"); return; }; var fileName = "MyReport_"; fileName += ReportTitle.replace(/ /g, "_"); var uri = 'data:text/csv;charset=utf-8,' + escape(CSV); var link = document.createElement("a"); link.href = uri; link.style = "visibility:hidden"; link.download = fileName + ".csv"; document.body.appendChild(link); link.click(); document.body.removeChild(link); };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });