﻿var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('IncomeTaxController', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 50; $scope.alluserlist = [];
    $scope._Conpath = '';
    var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; var url_port = url.port;
    $(document).ready(function () {
        if (typeof (_ConPath) === "undefined") { return; } else {
            if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else {
                $scope._Conpath = urlprotocol + "//" + urlhost + "/api/";
            }
        };
    });
    jQuery.support.cors = true;
    $('.btnNext').click(function () { $('.nav-tabs > .active').next('li').find('a').trigger('click'); });
    $('.btnPrevious').click(function () { $('.nav-tabs > .active').prev('li').find('a').trigger('click'); });
    $scope.ITDInfo; $scope.ResetView = function () { window.location.reload(true); };
    $scope.SetBankPan = function (value) { $scope.bankPan = value.bankPan; $scope.bankName = value.bankName; var act = $('#hidactualFlag').val(); if ($scope.bankName !== "") { if (act === "true") { $('#a_amountofinterest').attr("disabled", false); $('#p_amountofinterest').attr("disabled", true); } else { $('#p_amountofinterest').attr("disabled", false); $('#a_amountofinterest').attr("disabled", true); }; }; };
    $scope.SetBankPan2 = function (value) { $scope.bankPan2 = value.bankPan; $scope.bankName2 = value.bankName; var act = $('#hidactualFlag').val(); if ($scope.bankName2 !== "") { if (act === "true") { $('#a_amountofinterest2').attr("disabled", false); $('#p_amountofinterest2').attr("disabled", true); } else { $('#p_amountofinterest2').attr("disabled", false); $('#a_amountofinterest2').attr("disabled", true); }; }; };
    //Calculation Method Rent and Mediclaim
    $scope.calcRent = function () { var renttotal = storeTblValues(); function storeTblValues() { var renttotal = new Array(); $('#renttable tr').each(function (row, tr) { if (row > 0) { renttotal[row] = { "rentpm1": $(tr).find('td:eq(1) input[type="text"]').val(), "rentpm2": $(tr).find('td:eq(2) input[type="text"]').val(), "rentpm3": $(tr).find('td:eq(3) input[type="text"]').val(), "rentpm4": $(tr).find('td:eq(4) input[type="text"]').val(), "rentpm5": $(tr).find('td:eq(5) input[type="text"]').val(), "rentpm6": $(tr).find('td:eq(6) input[type="text"]').val(), "rentpm7": $(tr).find('td:eq(7) input[type="text"]').val(), "rentpm8": $(tr).find('td:eq(8) input[type="text"]').val(), "rentpm9": $(tr).find('td:eq(9) input[type="text"]').val(), "rentpm10": $(tr).find('td:eq(10) input[type="text"]').val(), "rentpm11": $(tr).find('td:eq(11) input[type="text"]').val(), "rentpm12": $(tr).find('td:eq(12) input[type="text"]').val() } } }); renttotal.shift(); return renttotal; }; if (renttotal.length > 0) { var rentPM = 0; var act = $('#hidactualFlag').val(); if (act === "true") { rentPM = (parseInt(renttotal[1].rentpm1) || 0) + (parseInt(renttotal[1].rentpm2) || 0) + (parseInt(renttotal[1].rentpm3) || 0) + (parseInt(renttotal[1].rentpm4) || 0) + (parseInt(renttotal[1].rentpm5) || 0) + (parseInt(renttotal[1].rentpm6) || 0) + (parseInt(renttotal[1].rentpm7) || 0) + (parseInt(renttotal[1].rentpm8) || 0) + (parseInt(renttotal[1].rentpm9) || 0) + (parseInt(renttotal[1].rentpm10) || 0) + (parseInt(renttotal[1].rentpm11) || 0) + (parseInt(renttotal[1].rentpm12) || 0); } else { rentPM = (parseInt(renttotal[0].rentpm1) || 0) + (parseInt(renttotal[0].rentpm2) || 0) + (parseInt(renttotal[0].rentpm3) || 0) + (parseInt(renttotal[0].rentpm4) || 0) + (parseInt(renttotal[0].rentpm5) || 0) + (parseInt(renttotal[0].rentpm6) || 0) + (parseInt(renttotal[0].rentpm7) || 0) + (parseInt(renttotal[0].rentpm8) || 0) + (parseInt(renttotal[0].rentpm9) || 0) + (parseInt(renttotal[0].rentpm10) || 0) + (parseInt(renttotal[0].rentpm11) || 0) + (parseInt(renttotal[0].rentpm12) || 0); }; document.getElementById("renttotal").value = rentPM; var landlord = $('#landlord').val(); var rentalpan = $('#rentalpan').val(); if (rentPM > 100000 && (landlord === '' || rentalpan === '')) { alert("Landlord Name & PAN Number is Required."); } }; };
    $scope.calmediclaim = function () { var act = $('#hidactualFlag').val(); var mediclaimpremiumforfamily = 0, mediclaimpremiumforparents = 0, mediclaimpremiumforhealth = 0; if (act === "true") { mediclaimpremiumforfamily = parseInt(document.getElementById('a_mediclaimpremiumforfamily').value) || 0; mediclaimpremiumforparents = parseInt(document.getElementById('a_mediclaimpremiumforparents').value) || 0; mediclaimpremiumforhealth = parseInt(document.getElementById('a_mediclaimpremiumforhealth').value) || 0; document.getElementById("tot_a_mediclaimpremium").value = mediclaimpremiumforfamily + mediclaimpremiumforparents + mediclaimpremiumforhealth; } else { mediclaimpremiumforfamily = parseInt(document.getElementById('p_mediclaimpremiumforfamily').value) || 0; mediclaimpremiumforparents = parseInt(document.getElementById('p_mediclaimpremiumforparents').value) || 0; mediclaimpremiumforhealth = parseInt(document.getElementById('p_mediclaimpremiumforhealth').value) || 0; document.getElementById("tot_p_mediclaimpremium").value = mediclaimpremiumforfamily + mediclaimpremiumforparents + mediclaimpremiumforhealth; }; };
    //Check Limits under setion 80 c
    $scope.CheckPDisability = function () { var act = $('#hidactualFlag').val(); var limit = 0; if (act === "true") { limit = document.getElementById("a_disablity").value; if (limit > 75000) { document.getElementById("a_disablity").value = "75000"; alert("System will consider 75000 only"); }; } else { limit = document.getElementById("p_disablity").value; if (limit > 75000) { document.getElementById("p_disablity").value = "75000"; alert("System will consider 75000 only"); }; }; }; $scope.CheckSevereDisability = function () { var act = $('#hidactualFlag').val(); var limit = 0; if (act === "true") { limit = document.getElementById("a_severedisablity").value; if (limit > 125000) { document.getElementById("a_severedisablity").value = "125000"; alert("System will Consider 125000 only"); }; } else { limit = document.getElementById("p_severedisablity").value; if (limit > 125000) { document.getElementById("p_severedisablity").value = "125000"; alert("System will Consider 125000 only"); }; }; }; $scope.CheckNPSLimit = function () { var act = $('#hidactualFlag').val(); var limit = 0; if (act === "true") { limit = document.getElementById("a_NPS").value; if (limit > 50000) { document.getElementById("a_NPS").value = "50000"; alert("System will consider 50000 only"); }; } else { limit = document.getElementById("p_NPS").value; if (limit > 50000) { document.getElementById("p_NPS").value = "50000"; alert("System will consider 50000 only"); }; }; };
    $scope.CheckLoanInterest = function () { var act = $('#hidactualFlag').val(); var limit = 0; if (act === "true") { limit = document.getElementById("a_amountofinterest").value; } else { limit = document.getElementById("p_amountofinterest").value; }; if (limit > 0) { var bank = $scope.bankName; if (bank === "" || bank === "undefined") { alert("Please Select your Housing Loan Bank First"); document.getElementById("p_amountofinterest").value = 0; }; if (limit > 200000) { alert("System will consider 2,00,000 Only.."); if (act === "true") { $('#a_amountofinterest').val("200000"); } else { $('#p_amountofinterest').val("200000"); } }; }; };
    $scope.Populateipmodel = function () { $('#model1').modal('show'); $scope.calPolicy(); }; $scope.Populatemfmodel = function () { $('#model2').modal('show'); $scope.calMFUND(); }; $scope.PopulateNSCpmodel = function () { $('#model3').modal('show'); $scope.calNSC(); }; $scope.Populateppfmodel = function () { $('#model4').modal('show'); $scope.calPPF(); }; $scope.PopulateFDModel = function () { $('#model5').modal('show'); $scope.calFD(); }; $scope.PopulateULIPModel = function () { $('#model6').modal('show'); $scope.calUlip(); }; $scope.PopulateSSModel = function () { $('#model7').modal('show'); $scope.calSS(); };    //POPUP MODELS
    $scope.GetBankDetails = function () { var pan = new XMLHttpRequest(); pan.open('GET', $scope._Conpath + 'TaxDeclaration/GetBankNames?flag=BC', true); pan.setRequestHeader('Accept', 'application/json'); pan.onreadystatechange = function () { if (pan.readyState === 4) { var json = JSON.parse(pan.responseText); $scope.bdata = json; $scope.$digest(); }; }; pan.send(); };
    $scope.GetEmpInfo = function () { var emp = new XMLHttpRequest(); emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + $('#eCode').val(), true); emp.setRequestHeader('Accept', 'application/json'); emp.onreadystatechange = function () { if (emp.readyState === 4) { var json1 = JSON.parse(emp.responseText); $scope.empdata = json1; $scope.$digest(); document.getElementById("btnSearch").disabled = true; $scope.GetActualInfo(); } else if (emp.status !== 200) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>"; $('#MessageBox').show(); }; }; emp.send(); };
    $scope.GetActualInfo = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var req = new XMLHttpRequest(); req.open('GET', $scope._Conpath + 'TaxDeclaration/GetTaxDeclarationConfig', true); req.setRequestHeader('Accept', 'application/json'); req.onreadystatechange = function () {
            if (req.readyState === 4) {
                var json = JSON.parse(req.responseText);
                $scope.configdata = json; $scope.$digest(); $('#hidactualFlag').val($scope.configdata.actualFlag); $('#hidyearMonth').val($scope.configdata.yearMonth);
                $('#hidcloseFlag').val($scope.configdata.closeFlag); var clsflg = $scope.configdata.closeFlag; var str = $scope.configdata.yearMonth.toString();
                var res = str.substring(0, 4); var res2 = str.substring(4, 6);
                $('#lblyearmonth1').text(res + "-" + res2); $('#lblyearmonth3').text(res + "-" + res2);
                $('#lblyearmonth4').text(res + "-" + res2); $('#lblyearmonth5').text(res + "-" + res2); $('#lblyearmonth6').text(res + "-" + res2);
                $('#lblyearmonth4_2').text(res + "-" + res2); $('#lblyearmonth5_2').text(res + "-" + res2); $('#lblyearmonth6_2').text(res + "-" + res2);
                var ecode = $('#eCode').val() || 0; if (clsflg === true) { if (ecode === 0) { document.getElementById("btnsave").disabled = true; $("#maindiv *").attr("readonly", "readonly").off('click'); }; };
                $scope.GetBankDetails(); $scope.GetTaxDeclaration();
            } else { $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); };
        }; req.send();
    };
    $scope.ChangeTaxRegimefromPOPUP = function () {
        var TaxRegime = $('#cmb_taxRegime1').val(); $('#cmb_taxRegime').val(TaxRegime);
        if (TaxRegime === 'N') {
            $("#homenext *").attr("readonly", true).off('click'); $("#menu1Prevnext *").attr("readonly", true).off('click');
            $("#menu2Prevnext *").attr("readonly", true).off('click'); $("#menu3Prevnext *").attr("readonly", true).off('click');
            $("#menu4Prevnext *").attr("readonly", true).off('click'); $("#menu5Prevnext *").attr("readonly", true).off('click');
            $("#menu6Prevnext *").attr("readonly", true).off('click'); $("#menu6Prevnext1 *").attr("readonly", true).off('click');
            $("#menu7Prevnext *").attr("readonly", true).off('click');
        } else {
            $("#homenext *").attr("readonly", false).off('click'); $("#menu1Prevnext *").attr("readonly", false).off('click');
            $("#menu2Prevnext *").attr("readonly", false).off('click'); $("#menu3Prevnext *").attr("readonly", false).off('click');
            $("#menu4Prevnext *").attr("readonly", false).off('click'); $("#menu5Prevnext *").attr("readonly", false).off('click');
            $("#menu6Prevnext *").attr("readonly", false).off('click'); $("#menu6Prevnext1 * ").attr("readonly", false).off('click');
            $("#menu7Prevnext *").attr("readonly", false).off('click');
        }
        var act = $('#hidactualFlag').val(); $scope.EnableCntrl(act); var companyacco = $('#hidCompanyaccoFlag').val();
        if (companyacco === true || companyacco === 'true') {
            $('#a_rentpm1').attr("readonly", true); $('#a_rentpm2').attr("readonly", true); $('#a_rentpm3').attr("readonly", true);
            $('#a_rentpm4').attr("readonly", true); $('#a_rentpm5').attr("readonly", true); $('#a_rentpm6').attr("readonly", true);
            $('#a_rentpm7').attr("readonly", true); $('#a_rentpm8').attr("readonly", true); $('#a_rentpm9').attr("readonly", true);
            $('#a_rentpm10').attr("readonly", true); $('#a_rentpm11').attr("readonly", true); $('#a_rentpm12').attr("readonly", true);
            $('#p_rentpm1').attr("readonly", true); $('#p_rentpm2').attr("readonly", true); $('#p_rentpm3').attr("readonly", true);
            $('#p_rentpm4').attr("readonly", true); $('#p_rentpm5').attr("readonly", true); $('#p_rentpm6').attr("readonly", true);
            $('#p_rentpm7').attr("readonly", true); $('#p_rentpm8').attr("readonly", true); $('#p_rentpm9').attr("readonly", true);
            $('#p_rentpm10').attr("readonly", true); $('#p_rentpm11').attr("readonly", true); $('#p_rentpm12').attr("readonly", true);
            $("#presentAddress").attr("readonly", true); $("#landlord").attr("readonly", true); $("#rentalpan").attr("readonly", true);
        };
    };
    $scope.ChangeTaxRegimefromtbl = function () {
        var TaxRegime = $('#cmb_taxRegime').val();
        if (TaxRegime === 'N') {
            $("#homenext *").attr("readonly", true).off('click'); $("#menu1Prevnext *").attr("readonly", true).off('click');
            $("#menu2Prevnext *").attr("readonly", true).off('click'); $("#menu3Prevnext *").attr("readonly", true).off('click');
            $("#menu4Prevnext *").attr("readonly", true).off('click'); $("#menu5Prevnext *").attr("readonly", true).off('click');
            $("#menu6Prevnext *").attr("readonly", true).off('click'); $("#menu6Prevnext1 *").attr("readonly", true).off('click');
            $("#menu7Prevnext *").attr("readonly", true).off('click');
        } else {
            $("#homenext *").attr("readonly", false).off('click'); $("#menu1Prevnext *").attr("readonly", false).off('click');
            $("#menu2Prevnext *").attr("readonly", false).off('click'); $("#menu3Prevnext *").attr("readonly", false).off('click');
            $("#menu4Prevnext *").attr("readonly", false).off('click'); $("#menu5Prevnext *").attr("readonly", false).off('click');
            $("#menu6Prevnext *").attr("readonly", false).off('click'); $("#menu6Prevnext1 * ").attr("readonly", false).off('click');
            $("#menu7Prevnext *").attr("readonly", false).off('click');
        }
        var act = $('#hidactualFlag').val(); $scope.EnableCntrl(act); var companyacco = $('#hidCompanyaccoFlag').val();
        if (companyacco === true || companyacco === 'true') {
            $('#a_rentpm1').attr("readonly", true); $('#a_rentpm2').attr("readonly", true); $('#a_rentpm3').attr("readonly", true);
            $('#a_rentpm4').attr("readonly", true); $('#a_rentpm5').attr("readonly", true); $('#a_rentpm6').attr("readonly", true);
            $('#a_rentpm7').attr("readonly", true); $('#a_rentpm8').attr("readonly", true); $('#a_rentpm9').attr("readonly", true);
            $('#a_rentpm10').attr("readonly", true); $('#a_rentpm11').attr("readonly", true); $('#a_rentpm12').attr("readonly", true);
            $('#p_rentpm1').attr("readonly", true); $('#p_rentpm2').attr("readonly", true); $('#p_rentpm3').attr("readonly", true);
            $('#p_rentpm4').attr("readonly", true); $('#p_rentpm5').attr("readonly", true); $('#p_rentpm6').attr("readonly", true);
            $('#p_rentpm7').attr("readonly", true); $('#p_rentpm8').attr("readonly", true); $('#p_rentpm9').attr("readonly", true);
            $('#p_rentpm10').attr("readonly", true); $('#p_rentpm11').attr("readonly", true); $('#p_rentpm12').attr("readonly", true);
            $("#presentAddress").attr("readonly", true); $("#landlord").attr("readonly", true); $("#rentalpan").attr("readonly", true);
        };
    };
    $scope.GetTaxDeclaration = function () {
        var ecode = $('#eCode').val() || 0;
        var act = $('#hidactualFlag').val();
        var YearMonth = $('#hidyearMonth').val();
        $scope.EnableCntrl(act);
        //Get Address Details
        var addr = "";
        var Udata1;
        var Uperdata2;
        var xy = {};
        var xhr = new XMLHttpRequest();
        if (ecode === 0) {
            xhr.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + $('#myEmpUnqId').val(), true);
        } else {
            xhr.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + ecode, true);
        };
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json1 = JSON.parse(xhr.responseText);
                $scope.Udata = json1;
                var per = new XMLHttpRequest();
                if (ecode === 0) {
                    per.open('GET',
                        $scope._Conpath + 'Employee/GetEmpDetails?empunqid=' + $('#myEmpUnqId').val() + '&mode=1',
                        true);
                } else {
                    per.open('GET', $scope._Conpath + 'Employee/GetEmpDetails?empunqid=' + ecode + '&mode=1', true);
                };
                per.setRequestHeader('Accept', 'application/json');
                per.onreadystatechange = function () {
                    if (per.readyState === 4 && per.status === 200) {
                        var json = JSON.parse(per.responseText);
                        $scope.Uperdata = json;
                        Uperdata2 = $scope.Uperdata;
                        Udata1 = $scope.Udata;
                        angular.merge(xy, Udata1, Uperdata2);
                        $scope.UserInfo = xy;
                        $scope.$digest();
                        $('#lblMono').text($scope.UserInfo[0].prePhone);
                        if ($scope.taxdata.length <= 0) {
                            addr = $scope.UserInfo[0].houseNumber +
                                " " +
                                $scope.UserInfo[0].societyName +
                                " " +
                                $scope.UserInfo[0].areaName +
                                " " +
                                $scope.UserInfo[0].landMark +
                                " " +
                                $scope.UserInfo[0].preCity +
                                " " +
                                $scope.UserInfo[0].tehsil +
                                " " +
                                $scope.UserInfo[0].preDistrict +
                                " " +
                                $scope.UserInfo[0].preState +
                                " " +
                                $scope.UserInfo[0].prePin;
                            $('#presentAddress').val(addr);
                        };
                        $('#p_amountofinterest').attr("disabled", true); $('#a_amountofinterest').attr("disabled", true);
                        $('#p_amountofinterest2').attr("disabled", true); $('#a_amountofinterest2').attr("disabled", true);
                        var companyacco = $scope.UserInfo[0].companyAcc;
                        $('#hidCompanyaccoFlag').val(companyacco);
                        if (companyacco === true) {
                            if (act === "true") {
                                $('#a_rentpm1').attr("readonly", true);
                                $('#a_rentpm2').attr("readonly", true);
                                $('#a_rentpm3').attr("readonly", true);
                                $('#a_rentpm4').attr("readonly", true);
                                $('#a_rentpm5').attr("readonly", true);
                                $('#a_rentpm6').attr("readonly", true);
                                $('#a_rentpm7').attr("readonly", true);
                                $('#a_rentpm8').attr("readonly", true);
                                $('#a_rentpm9').attr("readonly", true);
                                $('#a_rentpm10').attr("readonly", true);
                                $('#a_rentpm11').attr("readonly", true);
                                $('#a_rentpm12').attr("readonly", true);
                            } else {
                                $('#p_rentpm1').attr("readonly", true);
                                $('#p_rentpm2').attr("readonly", true);
                                $('#p_rentpm3').attr("readonly", true);
                                $('#p_rentpm4').attr("readonly", true);
                                $('#p_rentpm5').attr("readonly", true);
                                $('#p_rentpm6').attr("readonly", true);
                                $('#p_rentpm7').attr("readonly", true);
                                $('#p_rentpm8').attr("readonly", true);
                                $('#p_rentpm9').attr("readonly", true);
                                $('#p_rentpm10').attr("readonly", true);
                                $('#p_rentpm11').attr("readonly", true);
                                $('#p_rentpm12').attr("readonly", true);
                            };
                            $("#presentAddress").attr("readonly", true);
                            $("#landlord").attr("readonly", true);
                            $("#rentalpan").attr("readonly", true);
                        };
                    };
                };
                per.send();
            };
        };
        xhr.send();
        //Get Tax Declaration Details
        var rentDetails = new Array();
        var ppfDetails = new Array();
        var bankDeposits = new Array();
        var insuranceDetails = new Array();
        var nscDetails = new Array();
        var mutualFundDetails = new Array();
        var ulipDetails = new Array();
        var sukanyaDetails = new Array();
        var xhr1 = new XMLHttpRequest();
        if (ecode === 0) {
            xhr1.open('GET',
                $scope._Conpath +
                'TaxDeclaration/GetTaxDeclaration?empUnqId=' +
                $('#myEmpUnqId').val() +
                '&yearMonth=' +
                $('#hidyearMonth').val() +
                '&actualFlag=' +
                $('#hidactualFlag').val(),
                true);
        } else {
            xhr1.open('GET',
                $scope._Conpath +
                'TaxDeclaration/GetTaxDeclaration?empUnqId=' +
                ecode +
                '&yearMonth=' +
                $('#hidyearMonth').val() +
                '&actualFlag=' +
                $('#hidactualFlag').val(),
                true);
        };
        xhr1.setRequestHeader('Accept', 'application/json');
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                var json = JSON.parse(xhr1.responseText);
                $scope.taxdata = json;
                $scope.$digest();
                var lockEntry = false;
                if ($scope.taxdata.length > 0) {
                    for (var d = 0; d < $scope.taxdata.length; d++) {
                        var taxdeclarationactualflag = $scope.taxdata[d].actualFlag;
                        rentDetails = $scope.taxdata[d].rentDetails;
                        ppfDetails = $scope.taxdata[d].ppfDetails;
                        bankDeposits = $scope.taxdata[d].bankDeposits;
                        insuranceDetails = $scope.taxdata[d].insuranceDetails;
                        nscDetails = $scope.taxdata[d].nscDetails;
                        mutualFundDetails = $scope.taxdata[d].mutualFundDetails;
                        ulipDetails = $scope.taxdata[d].ulipDetails;
                        sukanyaDetails = $scope.taxdata[d].sukanyaDetails;
                        if (taxdeclarationactualflag) {
                            if (ppfDetails.length > 0) { $('#tot_a_ppf').val($scope.taxdata[d].totalPpfAmt); };
                            if (bankDeposits.length > 0) { $('#tot_a_fd').val($scope.taxdata[d].totalBankDepositAmount); };
                            if (insuranceDetails.length > 0) { $('#tot_a_premium').val($scope.taxdata[d].totalInsurancePremium); };
                            if (nscDetails.length > 0) { $('#tot_a_nsc').val($scope.taxdata[d].totalNscAmount); };
                            if (mutualFundDetails.length > 0) { $('#tot_a_mfund').val($scope.taxdata[d].totalMutualFund); };
                            if (ulipDetails.length > 0) { $('#tot_a_ulip').val($scope.taxdata[d].totalUlip); };
                            if (sukanyaDetails.length > 0) { $('#tot_a_ssAmt').val($scope.taxdata[d].totalSukanya); };
                            $('#a_houseloan').val($scope.taxdata[d].houseLoanPrincipal);
                            $('#a_houseloan2').val($scope.taxdata[d].houseLoanPrincipal2);
                            $('#a_childfees1').val($scope.taxdata[d].tuitionFeeChild1);
                            $('#a_childfees2').val($scope.taxdata[d].tuitionFeeChild2);
                            $('#a_mediclaimpremiumforfamily').val($scope.taxdata[d].medicalPremiumSelf);
                            $('#a_mediclaimpremiumforparents').val($scope.taxdata[d].medicalPremiumParents);
                            $('#a_mediclaimpremiumforhealth').val($scope.taxdata[d].medicalPreventiveHealthCheckup);
                            $('#a_eduloan').val($scope.taxdata[d].educationLoanInterest);
                            $('#a_disablity').val($scope.taxdata[d].physicalDisability);
                            $('#a_severedisablity').val($scope.taxdata[d].severeDisability);
                            $('#a_NPS').val($scope.taxdata[d].nationalPensionScheme);
                            $('#a_disdependent').val($scope.taxdata[d].disableDependent);
                            $('#a_medicalexpenditure').val($scope.taxdata[d].medicalExpenditure);

                            $('#a_amountofinterest').val($scope.taxdata[d].interestOnLoan);
                            $('#a_amountofinterest2').val($scope.taxdata[d].interestOnLoan2);
                            $('#a_amountofinterestasperit').val($scope.taxdata[d].interestPreConstruction);
                            $('#a_amountofinterestasperit2').val($scope.taxdata[d].interestPreConstruction2);

                            $('#a_optionalinterest').val($scope.taxdata[d].otherInterest);
                            $('#a_optionalotherincome').val($scope.taxdata[d].otherIncomeAmount);
                            $scope.calmediclaim();
                            if (rentDetails.length > 0) {
                                $('#renttotal').val($scope.taxdata[d].totalRentPaid);
                                $("#a_rentpm1").val(rentDetails[0].april);
                                $("#a_rentpm2").val(rentDetails[0].may);
                                $("#a_rentpm3").val(rentDetails[0].june);
                                $("#a_rentpm4").val(rentDetails[0].july);
                                $("#a_rentpm5").val(rentDetails[0].august);
                                $("#a_rentpm6").val(rentDetails[0].september);
                                $("#a_rentpm7").val(rentDetails[0].october);
                                $("#a_rentpm8").val(rentDetails[0].november);
                                $("#a_rentpm9").val(rentDetails[0].december);
                                $("#a_rentpm10").val(rentDetails[0].january);
                                $("#a_rentpm11").val(rentDetails[0].february);
                                $("#a_rentpm12").val(rentDetails[0].march);
                            };
                            $('#presentAddress').val($scope.taxdata[d].rentHouseAddress);
                            $('#landlord').val($scope.taxdata[d].landLordName); $('#rentalpan').val($scope.taxdata[d].landLordPan);
                            $scope.calcRent();
                            $('#p_salary').val($scope.taxdata[d].prevCompSalary); $('#p_taxdeduct').val($scope.taxdata[d].prevCompTds);
                            $('#txt_childname1').val($scope.taxdata[d].child1Name); $('#txt_childname2').val($scope.taxdata[d].child2Name);
                            $('#txt_addofproperty').val($scope.taxdata[d].propertyAddress); $('#txt_addofproperty2').val($scope.taxdata[d].propertyAddress2);
                        } else {
                            if (ppfDetails.length > 0) { $('#tot_p_ppf').val($scope.taxdata[d].totalPpfAmt); };
                            if (bankDeposits.length > 0) { $('#tot_p_fd').val($scope.taxdata[d].totalBankDepositAmount); };
                            if (insuranceDetails.length > 0) { $('#tot_p_premium').val($scope.taxdata[d].totalInsurancePremium); };
                            if (nscDetails.length > 0) { $('#tot_p_nsc').val($scope.taxdata[d].totalNscAmount); };
                            if (mutualFundDetails.length > 0) { $('#tot_p_mfund').val($scope.taxdata[d].totalMutualFund); };
                            if (ulipDetails.length > 0) { $('#tot_p_ulip').val($scope.taxdata[d].totalUlip); };
                            if (sukanyaDetails.length > 0) { $('#tot_p_ssAmt').val($scope.taxdata[d].totalSukanya); };
                            $('#p_houseloan').val($scope.taxdata[d].houseLoanPrincipal);
                            $('#p_houseloan2').val($scope.taxdata[d].houseLoanPrincipal2);

                            $('#p_childfees1').val($scope.taxdata[d].tuitionFeeChild1);
                            $('#p_childfees2').val($scope.taxdata[d].tuitionFeeChild2);
                            $('#p_mediclaimpremiumforfamily').val($scope.taxdata[d].medicalPremiumSelf);
                            $('#p_mediclaimpremiumforparents').val($scope.taxdata[d].medicalPremiumParents);
                            $('#p_mediclaimpremiumforhealth').val($scope.taxdata[d].medicalPreventiveHealthCheckup);
                            $('#p_eduloan').val($scope.taxdata[d].educationLoanInterest);
                            $('#p_disablity').val($scope.taxdata[d].physicalDisability);
                            $('#p_severedisablity').val($scope.taxdata[d].severeDisability);
                            $('#p_NPS').val($scope.taxdata[d].nationalPensionScheme);
                            $('#p_disdependent').val($scope.taxdata[d].disableDependent);
                            $('#p_medicalexpenditure').val($scope.taxdata[d].medicalExpenditure);
                            //Loan Bank details
                            $('#p_amountofinterest').val($scope.taxdata[d].interestOnLoan);
                            $('#p_amountofinterest2').val($scope.taxdata[d].interestOnLoan2);
                            $('#p_amountofinterestasperit').val($scope.taxdata[d].interestPreConstruction);
                            $('#p_amountofinterestasperit2').val($scope.taxdata[d].interestPreConstruction2);

                            $('#p_optionalinterest').val($scope.taxdata[d].otherInterest);
                            $('#p_optionalotherincome').val($scope.taxdata[d].otherIncomeAmount);
                            $scope.calmediclaim();
                            if (rentDetails.length > 0) {
                                $('#renttotal').val($scope.taxdata[d].totalRentPaid);
                                $("#p_rentpm1").val(rentDetails[0].april);
                                $("#p_rentpm2").val(rentDetails[0].may);
                                $("#p_rentpm3").val(rentDetails[0].june);
                                $("#p_rentpm4").val(rentDetails[0].july);
                                $("#p_rentpm5").val(rentDetails[0].august);
                                $("#p_rentpm6").val(rentDetails[0].september);
                                $("#p_rentpm7").val(rentDetails[0].october);
                                $("#p_rentpm8").val(rentDetails[0].november);
                                $("#p_rentpm9").val(rentDetails[0].december);
                                $("#p_rentpm10").val(rentDetails[0].january);
                                $("#p_rentpm11").val(rentDetails[0].february);
                                $("#p_rentpm12").val(rentDetails[0].march);
                            };
                            $('#presentAddress').val($scope.taxdata[d].rentHouseAddress);
                            $('#landlord').val($scope.taxdata[d].landLordName);
                            $('#rentalpan').val($scope.taxdata[d].landLordPan);
                            $scope.calcRent();
                            $('#p_salary').val($scope.taxdata[d].prevCompSalary);
                            $('#p_taxdeduct').val($scope.taxdata[d].prevCompTds);
                            $('#txt_childname1').val($scope.taxdata[d].child1Name); $('#txt_childname2').val($scope.taxdata[d].child2Name);
                            $('#txt_addofproperty').val($scope.taxdata[d].propertyAddress); $('#txt_addofproperty2').val($scope.taxdata[d].propertyAddress2);
                        };
                        if (act === taxdeclarationactualflag.toString()) {
                            //Detail Table PPF
                            for (var j = 0; j < ppfDetails.length; j++) {
                                var d_ppf = "<tr>" +
                                    "<td style='text-align:center;'><input type='hidden' name='ppf1' value='" +
                                    ppfDetails[j].ppfAcNo +
                                    "'>" +
                                    ppfDetails[j].ppfAcNo +
                                    "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='ppf2' value='" +
                                    ppfDetails[j].ppfDepositeDate.substring(0,
                                        ppfDetails[j].ppfDepositeDate.indexOf("T")) +
                                    "'>" +
                                    ppfDetails[j].ppfDepositeDate.substring(0,
                                        ppfDetails[j].ppfDepositeDate.indexOf("T")) +
                                    "</td>";
                                if (act === "true") {
                                    d_ppf +=
                                        "<td style='text-align:center;'><input type='hidden' name='p_ppf' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_ppf' value='" +
                                        ppfDetails[j].ppfAmt +
                                        "'>" +
                                        ppfDetails[j].ppfAmt +
                                        "</td>";
                                } else {
                                    d_ppf +=
                                        "<td style='text-align:center;'><input type='hidden' name='p_ppf' value='" +
                                        ppfDetails[j].ppfAmt +
                                        "'>" +
                                        ppfDetails[j].ppfAmt +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_ppf' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>";
                                };
                                d_ppf +=
                                    "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemovePPF(this)' class='btn btn-danger'></td>";
                                d_ppf += "</tr>";
                                var dtlppf = $(d_ppf);
                                $("#aliasTable4").append(dtlppf);
                                $scope.calPPF();
                            };
                            //Detail Table Insurance
                            for (var i = 0; i < insuranceDetails.length; i++) {
                                var d_insurance = "<tr>" +
                                    "<td style='text-align:center;'><input type='hidden' name='i1' value='" +
                                    insuranceDetails[i].policyNo +
                                    "'>" +
                                    insuranceDetails[i].policyNo +
                                    "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='i5' value='" +
                                    insuranceDetails[i].policyDate.substring(0,
                                        insuranceDetails[i].policyDate.indexOf("T")) +
                                    "'>" +
                                    insuranceDetails[i].policyDate.substring(0,
                                        insuranceDetails[i].policyDate.indexOf("T")) +
                                    "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='i2' value='" +
                                    insuranceDetails[i].sumInsured +
                                    "'>" +
                                    insuranceDetails[i].sumInsured +
                                    "</td>";
                                if (act === "true") {
                                    d_insurance +=
                                        "<td style='text-align:center;'><input type='hidden' name='p_i3' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_i3' value='" +
                                        insuranceDetails[i].annualPremiumAmount +
                                        "'>" +
                                        insuranceDetails[i].annualPremiumAmount +
                                        "</td>";
                                } else {
                                    d_insurance +=
                                        "<td style='text-align:center;'><input type='hidden' name='p_i3' value='" +
                                        insuranceDetails[i].annualPremiumAmount +
                                        "'>" +
                                        insuranceDetails[i].annualPremiumAmount +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_i3' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>";
                                };
                                var ipdate = insuranceDetails[i].premiumPaidDate || '';
                                d_insurance += "<td style='text-align:center;'><input type='hidden' name='i6' value='" +
                                    insuranceDetails[i].premiumPaidDate.substring(0,
                                        insuranceDetails[i].premiumPaidDate.indexOf("T")) +
                                    "'>" +
                                    insuranceDetails[i].premiumPaidDate.substring(0,
                                        insuranceDetails[i].premiumPaidDate.indexOf("T")) +
                                    "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='i4' value='" +
                                    insuranceDetails[i].premiumDueDate.substring(0,
                                        insuranceDetails[i].premiumDueDate.indexOf("T")) +
                                    "'>" +
                                    insuranceDetails[i].premiumDueDate.substring(0,
                                        insuranceDetails[i].premiumDueDate.indexOf("T")) +
                                    "</td>" +
                                    "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveINS(this)' class='btn btn-danger'></td>";
                                d_insurance += "</tr>";
                                var dtlinsurance = $(d_insurance);
                                $("#aliasTable").append(dtlinsurance);
                                $scope.calPolicy();
                            };
                            //Detail Table NSC
                            for (var k = 0; k < nscDetails.length; k++) {
                                var d_nsc = "<tr>" +
                                    "<td style='text-align:center;'><input type='hidden' name='nsc1' value='" +
                                    nscDetails[k].nscNumber +
                                    "'>" +
                                    nscDetails[k].nscNumber +
                                    "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='nsc2' value='" +
                                    nscDetails[k].nscPurchaseDate.substring(0,
                                        nscDetails[k].nscPurchaseDate.indexOf("T")) +
                                    "'>" +
                                    nscDetails[k].nscPurchaseDate.substring(0,
                                        nscDetails[k].nscPurchaseDate.indexOf("T")) +
                                    "</td>";
                                if (act === "true") {
                                    d_nsc +=
                                        "<td style='text-align:center;'><input type='hidden' name='p_nsc3' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_nsc3' value='" +
                                        nscDetails[k].nscAmount +
                                        "'>" +
                                        nscDetails[k].nscAmount +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='i_nsc4 value='" +
                                        nscDetails[k].nscInterestAmount +
                                        "'>" +
                                        nscDetails[k].nscInterestAmount +
                                        "</td>";
                                } else {
                                    d_nsc +=
                                        "<td style='text-align:center;'><input type='hidden' name='p_nsc3' value='" +
                                        nscDetails[k].nscAmount +
                                        "'>" +
                                        nscDetails[k].nscAmount +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_nsc3' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='i_nsc4 value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>";
                                };
                                d_nsc +=
                                    "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveNSC(this)' class='btn btn-danger'></td>";
                                d_nsc += "</tr>";
                                var dtlnsc = $(d_nsc);
                                $("#aliasTable2").append(dtlnsc);
                                $scope.calNSC();
                            };
                            //Detail Table Mutual Fund
                            for (var l = 0; l < mutualFundDetails.length; l++) {
                                var d_mf = "<tr>" +
                                    "<td style='text-align:center;'><input type='hidden' name='mf1' value='" +
                                    mutualFundDetails[l].mutualFundName +
                                    "'>" +
                                    mutualFundDetails[l].mutualFundName +
                                    "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='mf4' value='" +
                                    mutualFundDetails[l].mutualFundDate.substring(0,
                                        mutualFundDetails[l].mutualFundDate.indexOf("T")) +
                                    "'>" +
                                    mutualFundDetails[l].mutualFundDate.substring(0,
                                        mutualFundDetails[l].mutualFundDate.indexOf("T")) +
                                    "</td>";
                                if (act === "true") {
                                    d_mf += "<td style='text-align:center;'><input type='hidden' name='p_mf' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_mf' value='" +
                                        mutualFundDetails[l].mutualFundAmount +
                                        "'>" +
                                        mutualFundDetails[l].mutualFundAmount +
                                        "</td>";
                                } else {
                                    d_mf += "<td style='text-align:center;'><input type='hidden' name='p_mf' value='" +
                                        mutualFundDetails[l].mutualFundAmount +
                                        "'>" +
                                        mutualFundDetails[l].mutualFundAmount +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_mf' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>";
                                };
                                d_mf +=
                                    "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveMUF(this)' class='btn btn-danger'></td>";
                                d_mf += "</tr>";
                                var dtlmf = $(d_mf);
                                $("#aliasTable1").append(dtlmf);
                                $scope.calMFUND();
                            };
                            //Detail Table Bank Deposits
                            for (var f = 0; f < bankDeposits.length; f++) {
                                var d_fd = "<tr>" +
                                    "<td style='text-align:center;'><input type='hidden' name='txt_FDAccno' value='" +
                                    bankDeposits[f].bankAccountNo +
                                    "'>" +
                                    bankDeposits[f].bankAccountNo +
                                    "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='fddate' value='" +
                                    bankDeposits[f].depositDate.substring(0, bankDeposits[f].depositDate.indexOf("T")) +
                                    "'>" +
                                    bankDeposits[f].depositDate.substring(0, bankDeposits[f].depositDate.indexOf("T")) +
                                    "</td>";
                                if (act === "true") {
                                    d_fd += "<td style='text-align:center;'><input type='hidden' name='p_fd' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_fd' value='" +
                                        bankDeposits[f].depositAmount +
                                        "'>" +
                                        bankDeposits[f].depositAmount +
                                        "</td>";
                                } else {
                                    d_fd += "<td style='text-align:center;'><input type='hidden' name='p_fd' value='" +
                                        bankDeposits[f].depositAmount +
                                        "'>" +
                                        bankDeposits[f].depositAmount +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_fd' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>";
                                };
                                d_fd +=
                                    "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveFD(this)' class='btn btn-danger'></td>";
                                d_fd += "</tr>";
                                var dtlfd = $(d_fd);
                                $("#aliasTable5").append(dtlfd);
                                $scope.calFD();
                            };
                            //Detail Table ULIP
                            for (var u = 0; u < ulipDetails.length; u++) {
                                var d_ulip = "<tr>" +
                                    "<td style='text-align:center;'><input type='hidden' name='txt_ulipAccno' value='" +
                                    ulipDetails[u].ulipNo +
                                    "'>" +
                                    ulipDetails[u].ulipNo +
                                    "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='ulipdate' value='" +
                                    ulipDetails[u].ulipDate.substring(0, ulipDetails[u].ulipDate.indexOf("T")) +
                                    "'>" +
                                    ulipDetails[u].ulipDate.substring(0, ulipDetails[u].ulipDate.indexOf("T")) +
                                    "</td>";
                                if (act === "true") {
                                    d_ulip +=
                                        "<td style='text-align:center;'><input type='hidden' name='p_ulip' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_ulip' value='" +
                                        ulipDetails[u].ulipAmount +
                                        "'>" +
                                        ulipDetails[u].ulipAmount +
                                        "</td>";
                                } else {
                                    d_ulip +=
                                        "<td style='text-align:center;'><input type='hidden' name='p_ulip' value='" +
                                        ulipDetails[u].ulipAmount +
                                        "'>" +
                                        ulipDetails[u].ulipAmount +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_ulip' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>";
                                };
                                d_ulip +=
                                    "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveULIP(this)' class='btn btn-danger'></td>";
                                d_ulip += "</tr>";
                                var dtlulip = $(d_ulip);
                                $("#aliasTable6").append(dtlulip);
                                $scope.calUlip();
                            };
                            //Detail Table Sukanya Samridhi
                            for (var s = 0; s < sukanyaDetails.length; s++) {
                                var d_ss = "<tr>" +
                                    "<td style='text-align:center;'><input type='hidden' name='txt_SSAccName' value='" +
                                    sukanyaDetails[s].sukanyaName +
                                    "'>" +
                                    sukanyaDetails[s].sukanyaName +
                                    "</td>" +
                                    "<td style='text-align:center;'><input type='hidden' name='ssdate' value='" +
                                    sukanyaDetails[s].sukanyaDate.substring(0,
                                        sukanyaDetails[s].sukanyaDate.indexOf("T")) +
                                    "'>" +
                                    sukanyaDetails[s].sukanyaDate.substring(0,
                                        sukanyaDetails[s].sukanyaDate.indexOf("T")) +
                                    "</td>";
                                if (act === "true") {
                                    d_ss +=
                                        "<td style='text-align:center;'><input type='hidden' name='p_ssAmount' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_ssAmount' value='" +
                                        sukanyaDetails[s].sukanyaAmount +
                                        "'>" +
                                        sukanyaDetails[s].sukanyaAmount +
                                        "</td>";
                                } else {
                                    d_ss +=
                                        "<td style='text-align:center;'><input type='hidden' name='p_ssAmount' value='" +
                                        sukanyaDetails[s].sukanyaAmount +
                                        "'>" +
                                        sukanyaDetails[s].sukanyaAmount +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='a_ssAmount' value='" +
                                        0 +
                                        "'>" +
                                        0 +
                                        "</td>";
                                };
                                d_ss +=
                                    "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveSS(this)' class='btn btn-danger'></td>";
                                d_ss += "</tr>";
                                var dtlss = $(d_ss);
                                $("#aliasTable7").append(dtlss);
                                $scope.calSS();
                            };
                            $('#cmb_taxRegime1').val($scope.taxdata[d].taxRegime); $('#cmb_taxRegime').val($scope.taxdata[d].taxRegime);
                            //loan bank details
                            $('#cmb_statusofproperty').val($scope.taxdata[d].propertyStatus); $('#cmb_statusofproperty2').val($scope.taxdata[d].propertyStatus2);
                            $('#bankname').text("Existing Bank :~ " + $scope.taxdata[d].loanBank); $scope.bankName = $scope.taxdata[d].loanBank; $scope.bankPan = $scope.taxdata[d].loanBankPan;
                            $('#bankname2').text("Existing Bank :~ " + $scope.taxdata[d].loanBank2); $scope.bankName2 = $scope.taxdata[d].loanBank2; $scope.bankPan2 = $scope.taxdata[d].loanBankPan2;
                            $('#hloanAforesaid').val($scope.taxdata[d].loanAmount); $('#hloanAforesaid2').val($scope.taxdata[d].loanAmount2);
                            if ($scope.taxdata[d].loanDate != "" && $scope.taxdata[d].loanDate != null) { $('#loantakendate').val($scope.taxdata[d].loanDate.substring(0, $scope.taxdata[d].loanDate.indexOf("T"))); };
                            if ($scope.taxdata[d].loanDate2 != "" && $scope.taxdata[d].loanDate2 != null) { $('#loantakendate2').val($scope.taxdata[d].loanDate2.substring(0, $scope.taxdata[d].loanDate2.indexOf("T"))); };
                            $('#cmb_purposeofloan').val($scope.taxdata[d].purpose); $('#cmb_purposeofloan2').val($scope.taxdata[d].purpose2);
                            if ($scope.taxdata[d].constructionCompDate != "" && $scope.taxdata[d].constructionCompDate != null) { $('#datecontcomplete').val($scope.taxdata[d].constructionCompDate.substring(0, $scope.taxdata[d].constructionCompDate.indexOf("T"))); };
                            if ($scope.taxdata[d].constructionCompDate2 != "" && $scope.taxdata[d].constructionCompDate2 != null) { $('#datecontcomplete2').val($scope.taxdata[d].constructionCompDate2.substring(0, $scope.taxdata[d].constructionCompDate2.indexOf("T"))); };
                            if ($scope.taxdata[d].possessionDate != "" && $scope.taxdata[d].possessionDate != null) { $('#datepsproperty').val($scope.taxdata[d].possessionDate.substring(0, $scope.taxdata[d].possessionDate.indexOf("T"))); };
                            if ($scope.taxdata[d].possessionDate2 != "" && $scope.taxdata[d].possessionDate2 != null) { $('#datepsproperty2').val($scope.taxdata[d].possessionDate2.substring(0, $scope.taxdata[d].possessionDate2.indexOf("T"))); };
                            $('#cmb_ownership').val($scope.taxdata[d].ownership); $('#cmb_ownership2').val($scope.taxdata[d].ownership2);
                            $('#txt_jointownername').val($scope.taxdata[d].jointOwnerName); $('#txt_jointownername2').val($scope.taxdata[d].jointOwnerName2);
                            $('#txt_jointownerrelationship').val($scope.taxdata[d].jointOwnerRelation); $('#txt_jointownerrelationship2').val($scope.taxdata[d].jointOwnerRelation2);
                            $('#txt_jointownershare').val($scope.taxdata[d].jointOwnerShare); $('#txt_jointownershare2').val($scope.taxdata[d].jointOwnerShare2);
                            $('#rentalincome').val($scope.taxdata[d].rentalIncomePerMonth); $('#rentalincome2').val($scope.taxdata[d].rentalIncomePerMonth2);
                            $('#muntax').val($scope.taxdata[d].municipalTax); $('#muntax2').val($scope.taxdata[d].municipalTax2);

                            $('#txt_otherincometext').val($scope.taxdata[d].otherIncomeDesc);
                            var taxregime = $scope.taxdata[d].taxRegime;
                            if (taxregime === "N") {
                                $("#maindiv *").attr("readonly", "readonly").off('click');
                            };
                        } else {
                            var ln = $scope.taxdata.length;
                            var scr = "false";
                            if (ln > 1) {
                                scr = $scope.taxdata[1].actualFlag.toString();
                            }
                            if (act === "true" && scr === "false") {
                                //Detail Table PPF
                                for (var j = 0; j < ppfDetails.length; j++) {
                                    var d_ppf = "<tr>" +
                                        "<td style='text-align:center;'><input type='hidden' name='ppf1' value='" +
                                        ppfDetails[j].ppfAcNo +
                                        "'>" +
                                        ppfDetails[j].ppfAcNo +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='ppf2' value='" +
                                        ppfDetails[j].ppfDepositeDate.substring(0,
                                            ppfDetails[j].ppfDepositeDate.indexOf("T")) +
                                        "'>" +
                                        ppfDetails[j].ppfDepositeDate.substring(0,
                                            ppfDetails[j].ppfDepositeDate.indexOf("T")) +
                                        "</td>";
                                    if (act === "true") {
                                        d_ppf +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_ppf' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_ppf' value='" +
                                            ppfDetails[j].ppfAmt +
                                            "'>" +
                                            ppfDetails[j].ppfAmt +
                                            "</td>";
                                    } else {
                                        d_ppf +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_ppf' value='" +
                                            ppfDetails[j].ppfAmt +
                                            "'>" +
                                            ppfDetails[j].ppfAmt +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_ppf' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>";
                                    };
                                    d_ppf +=
                                        "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemovePPF(this)' class='btn btn-danger'></td>";
                                    d_ppf += "</tr>";
                                    var dtlppf = $(d_ppf);
                                    $("#aliasTable4").append(dtlppf);
                                    $scope.calPPF();
                                };
                                //Detail Table Insurance
                                for (var i = 0; i < insuranceDetails.length; i++) {
                                    var d_insurance = "<tr>" +
                                        "<td style='text-align:center;'><input type='hidden' name='i1' value='" +
                                        insuranceDetails[i].policyNo +
                                        "'>" +
                                        insuranceDetails[i].policyNo +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='i5' value='" +
                                        insuranceDetails[i].policyDate.substring(0,
                                            insuranceDetails[i].policyDate.indexOf("T")) +
                                        "'>" +
                                        insuranceDetails[i].policyDate.substring(0,
                                            insuranceDetails[i].policyDate.indexOf("T")) +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='i2' value='" +
                                        insuranceDetails[i].sumInsured +
                                        "'>" +
                                        insuranceDetails[i].sumInsured +
                                        "</td>";
                                    if (act === "true") {
                                        d_insurance +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_i3' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_i3' value='" +
                                            insuranceDetails[i].annualPremiumAmount +
                                            "'>" +
                                            insuranceDetails[i].annualPremiumAmount +
                                            "</td>";
                                    } else {
                                        d_insurance +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_i3' value='" +
                                            insuranceDetails[i].annualPremiumAmount +
                                            "'>" +
                                            insuranceDetails[i].annualPremiumAmount +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_i3' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>";
                                    };
                                    var ipdate = insuranceDetails[i].premiumPaidDate || '';
                                    d_insurance +=
                                        "<td style='text-align:center;'><input type='hidden' name='i6' value='" +
                                        insuranceDetails[i].premiumPaidDate.substring(0,
                                            insuranceDetails[i].premiumPaidDate.indexOf("T")) +
                                        "'>" +
                                        insuranceDetails[i].premiumPaidDate.substring(0,
                                            insuranceDetails[i].premiumPaidDate.indexOf("T")) +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='i4' value='" +
                                        insuranceDetails[i].premiumDueDate.substring(0,
                                            insuranceDetails[i].premiumDueDate.indexOf("T")) +
                                        "'>" +
                                        insuranceDetails[i].premiumDueDate.substring(0,
                                            insuranceDetails[i].premiumDueDate.indexOf("T")) +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveINS(this)' class='btn btn-danger'></td>";
                                    d_insurance += "</tr>";
                                    var dtlinsurance = $(d_insurance);
                                    $("#aliasTable").append(dtlinsurance);
                                    $scope.calPolicy();
                                };
                                //Detail Table NSC
                                for (var k = 0; k < nscDetails.length; k++) {
                                    var d_nsc = "<tr>" +
                                        "<td style='text-align:center;'><input type='hidden' name='nsc1' value='" +
                                        nscDetails[k].nscNumber +
                                        "'>" +
                                        nscDetails[k].nscNumber +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='nsc2' value='" +
                                        nscDetails[k].nscPurchaseDate.substring(0,
                                            nscDetails[k].nscPurchaseDate.indexOf("T")) +
                                        "'>" +
                                        nscDetails[k].nscPurchaseDate.substring(0,
                                            nscDetails[k].nscPurchaseDate.indexOf("T")) +
                                        "</td>";
                                    if (act === "true") {
                                        d_nsc +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_nsc3' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_nsc3' value='" +
                                            nscDetails[k].nscAmount +
                                            "'>" +
                                            nscDetails[k].nscAmount +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='i_nsc4 value='" +
                                            nscDetails[k].nscInterestAmount +
                                            "'>" +
                                            nscDetails[k].nscInterestAmount +
                                            "</td>";
                                    } else {
                                        d_nsc +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_nsc3' value='" +
                                            nscDetails[k].nscAmount +
                                            "'>" +
                                            nscDetails[k].nscAmount +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_nsc3' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='i_nsc4 value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>";
                                    };
                                    d_nsc +=
                                        "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveNSC(this)' class='btn btn-danger'></td>";
                                    d_nsc += "</tr>";
                                    var dtlnsc = $(d_nsc);
                                    $("#aliasTable2").append(dtlnsc);
                                    $scope.calNSC();
                                };
                                //Detail Table Mutual Fund
                                for (var l = 0; l < mutualFundDetails.length; l++) {
                                    var d_mf = "<tr>" +
                                        "<td style='text-align:center;'><input type='hidden' name='mf1' value='" +
                                        mutualFundDetails[l].mutualFundName +
                                        "'>" +
                                        mutualFundDetails[l].mutualFundName +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='mf4' value='" +
                                        mutualFundDetails[l].mutualFundDate.substring(0,
                                            mutualFundDetails[l].mutualFundDate.indexOf("T")) +
                                        "'>" +
                                        mutualFundDetails[l].mutualFundDate.substring(0,
                                            mutualFundDetails[l].mutualFundDate.indexOf("T")) +
                                        "</td>";
                                    if (act === "true") {
                                        d_mf +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_mf' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_mf' value='" +
                                            mutualFundDetails[l].mutualFundAmount +
                                            "'>" +
                                            mutualFundDetails[l].mutualFundAmount +
                                            "</td>";
                                    } else {
                                        d_mf +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_mf' value='" +
                                            mutualFundDetails[l].mutualFundAmount +
                                            "'>" +
                                            mutualFundDetails[l].mutualFundAmount +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_mf' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>";
                                    };
                                    d_mf +=
                                        "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveMUF(this)' class='btn btn-danger'></td>";
                                    d_mf += "</tr>";
                                    var dtlmf = $(d_mf);
                                    $("#aliasTable1").append(dtlmf);
                                    $scope.calMFUND();
                                };
                                //Detail Table Bank Deposits
                                for (var f = 0; f < bankDeposits.length; f++) {
                                    var d_fd = "<tr>" +
                                        "<td style='text-align:center;'><input type='hidden' name='txt_FDAccno' value='" +
                                        bankDeposits[f].bankAccountNo +
                                        "'>" +
                                        bankDeposits[f].bankAccountNo +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='fddate' value='" +
                                        bankDeposits[f].depositDate.substring(0,
                                            bankDeposits[f].depositDate.indexOf("T")) +
                                        "'>" +
                                        bankDeposits[f].depositDate.substring(0,
                                            bankDeposits[f].depositDate.indexOf("T")) +
                                        "</td>";
                                    if (act === "true") {
                                        d_fd +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_fd' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_fd' value='" +
                                            bankDeposits[f].depositAmount +
                                            "'>" +
                                            bankDeposits[f].depositAmount +
                                            "</td>";
                                    } else {
                                        d_fd +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_fd' value='" +
                                            bankDeposits[f].depositAmount +
                                            "'>" +
                                            bankDeposits[f].depositAmount +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_fd' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>";
                                    };
                                    d_fd +=
                                        "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveFD(this)' class='btn btn-danger'></td>";
                                    d_fd += "</tr>";
                                    var dtlfd = $(d_fd);
                                    $("#aliasTable5").append(dtlfd);
                                    $scope.calFD();
                                };
                                //Detail Table ULIP
                                for (var u = 0; u < ulipDetails.length; u++) {
                                    var d_ulip = "<tr>" +
                                        "<td style='text-align:center;'><input type='hidden' name='txt_ulipAccno' value='" +
                                        ulipDetails[u].ulipNo +
                                        "'>" +
                                        ulipDetails[u].ulipNo +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='ulipdate' value='" +
                                        ulipDetails[u].ulipDate.substring(0, ulipDetails[u].ulipDate.indexOf("T")) +
                                        "'>" +
                                        ulipDetails[u].ulipDate.substring(0, ulipDetails[u].ulipDate.indexOf("T")) +
                                        "</td>";
                                    if (act === "true") {
                                        d_ulip +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_ulip' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_ulip' value='" +
                                            ulipDetails[u].ulipAmount +
                                            "'>" +
                                            ulipDetails[u].ulipAmount +
                                            "</td>";
                                    } else {
                                        d_ulip +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_ulip' value='" +
                                            ulipDetails[u].ulipAmount +
                                            "'>" +
                                            ulipDetails[u].ulipAmount +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_ulip' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>";
                                    };
                                    d_ulip +=
                                        "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveULIP(this)' class='btn btn-danger'></td>";
                                    d_ulip += "</tr>";
                                    var dtlulip = $(d_ulip);
                                    $("#aliasTable6").append(dtlulip);
                                    $scope.calUlip();
                                };
                                //Detail Table Sukanya Samridhi
                                for (var s = 0; s < sukanyaDetails.length; s++) {
                                    var d_ss = "<tr>" +
                                        "<td style='text-align:center;'><input type='hidden' name='txt_SSAccName' value='" +
                                        sukanyaDetails[s].sukanyaName +
                                        "'>" +
                                        sukanyaDetails[s].sukanyaName +
                                        "</td>" +
                                        "<td style='text-align:center;'><input type='hidden' name='ssdate' value='" +
                                        sukanyaDetails[s].sukanyaDate.substring(0,
                                            sukanyaDetails[s].sukanyaDate.indexOf("T")) +
                                        "'>" +
                                        sukanyaDetails[s].sukanyaDate.substring(0,
                                            sukanyaDetails[s].sukanyaDate.indexOf("T")) +
                                        "</td>";
                                    if (act === "true") {
                                        d_ss +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_ssAmount' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_ssAmount' value='" +
                                            sukanyaDetails[s].sukanyaAmount +
                                            "'>" +
                                            sukanyaDetails[s].sukanyaAmount +
                                            "</td>";
                                    } else {
                                        d_ss +=
                                            "<td style='text-align:center;'><input type='hidden' name='p_ssAmount' value='" +
                                            sukanyaDetails[s].sukanyaAmount +
                                            "'>" +
                                            sukanyaDetails[s].sukanyaAmount +
                                            "</td>" +
                                            "<td style='text-align:center;'><input type='hidden' name='a_ssAmount' value='" +
                                            0 +
                                            "'>" +
                                            0 +
                                            "</td>";
                                    };
                                    d_ss +=
                                        "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveSS(this)' class='btn btn-danger'></td>";
                                    d_ss += "</tr>";
                                    var dtlss = $(d_ss);
                                    $("#aliasTable7").append(dtlss);
                                    $scope.calSS();
                                };

                                $('#cmb_taxRegime1').val($scope.taxdata[d].taxRegime); $('#cmb_taxRegime').val($scope.taxdata[d].taxRegime);
                                //Loan Bank Details
                                $('#cmb_statusofproperty').val($scope.taxdata[d].propertyStatus); $('#cmb_statusofproperty2').val($scope.taxdata[d].propertyStatus2);
                                $('#bankname').text("Existing Bank :~ " + $scope.taxdata[d].loanBank); $scope.bankName = $scope.taxdata[d].loanBank; $scope.bankPan = $scope.taxdata[d].loanBankPan;
                                $('#bankname2').text("Existing Bank :~ " + $scope.taxdata[d].loanBank2); $scope.bankName2 = $scope.taxdata[d].loanBank2; $scope.bankPan2 = $scope.taxdata[d].loanBankPan2;
                                $('#hloanAforesaid').val($scope.taxdata[d].loanAmount); if ($scope.taxdata[d].loanDate != "" && $scope.taxdata[d].loanDate != null) { $('#loantakendate').val($scope.taxdata[d].loanDate.substring(0, $scope.taxdata[d].loanDate.indexOf("T"))); };
                                $('#hloanAforesaid2').val($scope.taxdata[d].loanAmount2); if ($scope.taxdata[d].loanDate2 != "" && $scope.taxdata[d].loanDate2 != null) { $('#loantakendate2').val($scope.taxdata[d].loanDate2.substring(0, $scope.taxdata[d].loanDate2.indexOf("T"))); };
                                $('#cmb_purposeofloan').val($scope.taxdata[d].purpose); if ($scope.taxdata[d].constructionCompDate != "" && $scope.taxdata[d].constructionCompDate != null) { $('#datecontcomplete').val($scope.taxdata[d].constructionCompDate.substring(0, $scope.taxdata[d].constructionCompDate.indexOf("T"))); };
                                $('#cmb_purposeofloan2').val($scope.taxdata[d].purpose2); if ($scope.taxdata[d].constructionCompDate2 != "" && $scope.taxdata[d].constructionCompDate2 != null) { $('#datecontcomplete2').val($scope.taxdata[d].constructionCompDate2.substring(0, $scope.taxdata[d].constructionCompDate2.indexOf("T"))); };
                                if ($scope.taxdata[d].possessionDate != "" && $scope.taxdata[d].possessionDate != null) { $('#datepsproperty').val($scope.taxdata[d].possessionDate.substring(0, $scope.taxdata[d].possessionDate.indexOf("T"))); };
                                if ($scope.taxdata[d].possessionDate2 != "" && $scope.taxdata[d].possessionDate2 != null) { $('#datepsproperty2').val($scope.taxdata[d].possessionDate2.substring(0, $scope.taxdata[d].possessionDate2.indexOf("T"))); };
                                $('#cmb_ownership').val($scope.taxdata[d].ownership); $('#cmb_ownership2').val($scope.taxdata[d].ownership2);
                                $('#txt_jointownername').val($scope.taxdata[d].jointOwnerName); $('#txt_jointownername2').val($scope.taxdata[d].jointOwnerName2);
                                $('#txt_jointownerrelationship').val($scope.taxdata[d].jointOwnerRelation); $('#txt_jointownerrelationship2').val($scope.taxdata[d].jointOwnerRelation2);
                                $('#txt_jointownershare').val($scope.taxdata[d].jointOwnerShare); $('#txt_jointownershare2').val($scope.taxdata[d].jointOwnerShare2);

                                $('#rentalincome').val($scope.taxdata[d].rentalIncomePerMonth); $('#rentalincome2').val($scope.taxdata[d].rentalIncomePerMonth2);
                                $('#muntax').val($scope.taxdata[d].municipalTax); $('#muntax2').val($scope.taxdata[d].municipalTax2);

                                $('#txt_otherincometext').val($scope.taxdata[d].otherIncomeDesc);

                                var taxregime = $scope.taxdata[d].taxRegime; if (taxregime === "N") { $("#maindiv *").attr("readonly", "readonly").off('click'); };
                            }
                        }
                        rentDetails = ""; ppfDetails = ""; bankDeposits = ""; insuranceDetails = ""; nscDetails = ""; mutualFundDetails = ""; ulipDetails = ""; sukanyaDetails = "";
                        lockEntry = $scope.taxdata[d].lockEntry;
                    }; $scope.Total80c();
                } else {
                    document.getElementById("cmb_taxRegime").disabled = false;   //Page Combo Box
                };
                if (ecode === 0 && lockEntry === true && act === "false") {
                    document.getElementById("btnsave").disabled = true;
                    $("#maindiv *").attr("readonly", "readonly").off('click');
                    $("#cmb_taxRegime1").attr("disabled", "disabled").off('click');
                    $("#cmb_taxRegime").attr("disabled", "disabled").off('click');
                };
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
            };
        };
        xhr1.send();
    }; //Get TAX Declaration Details
    $scope.EnableCntrl = function (d) {
        if (d === "true" || d === true) {
            $("#p_rentpm1").attr("readonly", true); $("#p_rentpm2").attr("readonly", true); $("#p_rentpm3").attr("readonly", true);
            $("#p_rentpm4").attr("readonly", true); $("#p_rentpm5").attr("readonly", true); $("#p_rentpm6").attr("readonly", true);
            $("#p_rentpm7").attr("readonly", true); $("#p_rentpm8").attr("readonly", true); $("#p_rentpm9").attr("readonly", true);
            $("#p_rentpm10").attr("readonly", true); $("#p_rentpm11").attr("readonly", true); $("#p_rentpm12").attr("readonly", true);
            $("#p_fd").attr("readonly", true); $("#p_ppf").attr("readonly", true); $("#p_i3").attr("readonly", true);
            $("#p_nsc3").attr("readonly", true); $("#mf2").attr("readonly", true); $("#p_ulip").attr("readonly", true);
            $("#p_ssAmount").attr("readonly", true); $("#p_houseloan").attr("readonly", true); $("#p_houseloan2").attr("readonly", true);
            $("#p_childfees1").attr("readonly", true); $("#p_childfees2").attr("readonly", true);
            $("#p_mediclaimpremiumforfamily").attr("readonly", true); $("#p_mediclaimpremiumforparents").attr("readonly", true);
            $("#p_mediclaimpremiumforhealth").attr("readonly", true); $("#p_eduloan").attr("readonly", true); $("#p_disablity").attr("readonly", true);
            $("#p_severedisablity").attr("readonly", true); $("#p_NPS").attr("readonly", true); $("#p_disdependent").attr("readonly", true);
            $("#p_medicalexpenditure").attr("readonly", true);
            $("#p_amountofinterest").attr("disabled", true); $("#p_amountofinterestasperit").attr("readonly", true);
            $("#p_amountofinterest2").attr("disabled", true); $("#p_amountofinterestasperit2").attr("readonly", true);
            $("#p_optionalinterest").attr("readonly", true); $("#p_optionalotherincome").attr("readonly", true);
        } else {
            $("#a_rentpm1").attr("readonly", true); $("#a_rentpm2").attr("readonly", true); $("#a_rentpm3").attr("readonly", true);
            $("#a_rentpm4").attr("readonly", true); $("#a_rentpm5").attr("readonly", true); $("#a_rentpm6").attr("readonly", true);
            $("#a_rentpm7").attr("readonly", true); $("#a_rentpm8").attr("readonly", true); $("#a_rentpm9").attr("readonly", true);
            $("#a_rentpm10").attr("readonly", true); $("#a_rentpm11").attr("readonly", true); $("#a_rentpm12").attr("readonly", true);
            $("#a_fd").attr("readonly", true); $("#a_ppf").attr("readonly", true); $("#a_i3").attr("readonly", true); $("#a_nsc3").attr("readonly", true);
            $("#i_nsc4").attr("readonly", true); $("#mf3").attr("readonly", true); $("#a_ulip").attr("readonly", true); $("#a_ssAmount").attr("readonly", true);
            $("#a_houseloan").attr("readonly", true);
            $("#a_houseloan2").attr("readonly", true);
            $("#a_childfees1").attr("readonly", true); $("#a_childfees2").attr("readonly", true);
            $("#a_mediclaimpremiumforfamily").attr("readonly", true);
            $("#a_mediclaimpremiumforparents").attr("readonly", true); $("#a_mediclaimpremiumforhealth").attr("readonly", true); $("#a_eduloan").attr("readonly", true);
            $("#a_disablity").attr("readonly", true); $("#a_severedisablity").attr("readonly", true); $("#a_NPS").attr("readonly", true);
            $("#a_disdependent").attr("readonly", true); $("#a_medicalexpenditure").attr("readonly", true);
            $("#a_amountofinterest").attr("disabled", true); $("#a_amountofinterestasperit").attr("readonly", true);
            $("#a_amountofinterest2").attr("disabled", true); $("#a_amountofinterestasperit2").attr("readonly", true);
            $("#a_optionalinterest").attr("readonly", true); $("#a_optionalotherincome").attr("readonly", true);
        };
    };    //Controls readonly Provisional or Actual Wise
    $scope.AddPPF = function () {
        var ppf1 = document.getElementById('ppf1').value || 0; var ppf2 = document.getElementById('ppf2').value; var p_ppf = document.getElementById('p_ppf').value || 0; var a_ppf = document.getElementById('a_ppf').value || 0; if (ppf1 === 0) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Fill the PPF Details</strong></div>"; $('#MessageBox').show(); return false; }; var tables = document.getElementById('aliasTable4'); var rowCounts = tables.rows.length; for (var i = 0; i <= rowCounts; i++) { var row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='ppf1' value='" + ppf1 + "'>" + ppf1 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='ppf2' value='" + ppf2 + "'>" + ppf2 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='p_ppf' value='" + p_ppf + "'>" + p_ppf + "</td>" + "<td style='text-align:center;'><input type='hidden' name='a_ppf' value='" + a_ppf + "'>" + a_ppf + "</td>" + "<td style='text-align:center;'><input type='button' name='Del4' value='Del' onclick='RemovePPF(this)' class='btn btn-danger'></td>" + "</tr>"); $("#aliasTable4").append(row); document.getElementById('ppf1').value = ""; document.getElementById('ppf2').value = ""; document.getElementById('p_ppf').value = ""; document.getElementById('a_ppf').value = ""; break; }; $scope.calPPF();
    };
    $scope.calPPF = function () {
        var PPF = storeTblValues(); function storeTblValues() {
            var PPF = new Array(); $('#aliasTable4 tr').each(function (row, tr) {
                PPF[row] = { "ppf1": $(tr).find('td:eq(0)').text(), "ppf1": $(tr).find('td:eq(1)').text(), "p_ppf": $(tr).find('td:eq(2)').text(), "a_ppf": $(tr).find('td:eq(3)').text() };
            }); PPF.shift(); return PPF;
        }; var p_ppfcount = 0; var a_ppfcount = 0; var act = $('#hidactualFlag').val();
        if (act === "true") {
            for (var i = 0; i < PPF.length; i++) {
                a_ppfcount += parseInt(PPF[i]["a_ppf"]) || 0;
                document.getElementById('tot_a_ppf').value = a_ppfcount || 0;
            };
        }
        else { for (var i = 0; i < PPF.length; i++) { p_ppfcount += parseInt(PPF[i]["p_ppf"]) || 0; document.getElementById('tot_p_ppf').value = p_ppfcount || 0; }; };
        $scope.Total80c();
    };
    $scope.AddFD = function () {
        var txt_FDAccno = document.getElementById('txt_FDAccno').value || 0; var fddate = document.getElementById('fddate').value; var p_fd = document.getElementById('p_fd').value || 0; var a_fd = document.getElementById('a_fd').value || 0; if (txt_FDAccno === 0) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Fill the Fixed Deposit Details</strong></div>"; $('#MessageBox').show(); return false; }; var tables = document.getElementById('aliasTable5'); var rowCounts = tables.rows.length; for (var i = 0; i <= rowCounts; i++) { var row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='txt_FDAccno' value='" + txt_FDAccno + "'>" + txt_FDAccno + "</td>" + "<td style='text-align:center;'><input type='hidden' name='fddate' value='" + fddate + "'>" + fddate + "</td>" + "<td style='text-align:center;'><input type='hidden' name='p_fd' value='" + p_fd + "'>" + p_fd + "</td>" + "<td style='text-align:center;'><input type='hidden' name='a_fd' value='" + a_fd + "'>" + a_fd + "</td>" + "<td style='text-align:center;'><input type='button' name='Del5' value='Del' onclick='RemoveFD(this)' class='btn btn-danger'></td>" + "</tr>"); $("#aliasTable5").append(row); document.getElementById('txt_FDAccno').value = ""; document.getElementById('fddate').value = ""; document.getElementById('p_fd').value = ""; document.getElementById('a_fd').value = ""; break; }; $scope.calFD();
    };
    $scope.calFD = function () {
        var FD = storeTblValues(); function storeTblValues() {
            var FD = new Array(); $('#aliasTable5 tr').each(function (row, tr) { FD[row] = { "txt_FDAccno": $(tr).find('td:eq(0)').text(), "fddate": $(tr).find('td:eq(1)').text(), "p_fd": $(tr).find('td:eq(2)').text(), "a_fd": $(tr).find('td:eq(3)').text() }; }); FD.shift(); return FD;
        }; var p_fdcount = 0; var a_fdcount = 0; var act = $('#hidactualFlag').val();
        if (act === "true") { for (var i = 0; i < FD.length; i++) { a_fdcount += parseInt(FD[i]["a_fd"]) || 0; document.getElementById('tot_a_fd').value = a_fdcount || 0; }; }
        else { for (var i = 0; i < FD.length; i++) { p_fdcount += parseInt(FD[i]["p_fd"]) || 0; document.getElementById('tot_p_fd').value = p_fdcount || 0; }; };
        $scope.Total80c();
    };
    $scope.AddPolicy = function () {
        var act = $('#hidactualFlag').val();
        var i1 = document.getElementById('i1').value || 0; var i5 = document.getElementById('i5').value; if (i5 === "") { alert("Please Select Policy Date"); return false; }; var i2 = document.getElementById('i2').value || 0;
        var premium = 0; var Policydate = i5; var con_Policydate = new Date(Policydate); var new_Date = new Date("2012-04-01"); if (con_Policydate > new_Date) { premium = (i2) * 10 / 100; } else { premium = (i2) * 20 / 100; };
        var p_i3 = document.getElementById('p_i3').value || 0; var a_i3 = document.getElementById('a_i3').value || 0; if (act === "true") { if (premium <= a_i3) { a_i3 = premium; } } else { if (premium <= p_i3) { p_i3 = premium; } };
        var i6 = document.getElementById('i6').value; var i4 = document.getElementById('i4').value;
        var tables = document.getElementById('aliasTable'); var rowCounts = tables.rows.length;
        for (var i = 0; i < rowCounts; i++) {
            var row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='i1' value='" + i1 + "'>" + i1 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='i5' value='" + i5 + "'>" + i5 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='i2' value='" + i2 + "'>" + i2 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='p_i3' value='" + p_i3 + "'>" + p_i3 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='a_i3' value='" + a_i3 + "'>" + a_i3 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='i6' value='" + i6 + "'>" + i6 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='i4' value='" + i4 + "'>" + i4 + "</td>" + "<td style='text-align:center;'><input type='button' name='Del' value='Del' onclick='RemoveINS(this)' class='btn btn-danger'></td>" + "</tr>"); $("#aliasTable").append(row);
            document.getElementById('i1').value = ""; document.getElementById('i5').value = ""; document.getElementById('i2').value = ""; document.getElementById("p_i3").value = ""; document.getElementById("a_i3").value = ""; document.getElementById('i6').value = ""; document.getElementById('i4').value = ""; break;
        }; $scope.calPolicy();
    };
    $scope.calPolicy = function () {
        var PremiumData = storeTblValues(); function storeTblValues() {
            var PremiumData = new Array(); $('#aliasTable tr').each(function (row, tr) { PremiumData[row] = { "i1": $(tr).find('td:eq(0)').text(), "i5": $(tr).find('td:eq(1)').text(), "i2": $(tr).find('td:eq(2)').text(), "p_i3": $(tr).find('td:eq(3)').text(), "a_i3": $(tr).find('td:eq(4)').text(), "i6": $(tr).find('td:eq(5)').text(), "i4": $(tr).find('td:eq(6)').text() } }); PremiumData.shift(); return PremiumData;
        }; var p_premiumCount = 0; var a_premiumCount = 0; var act = $('#hidactualFlag').val();
        if (act === "true") { for (var i = 0; i < PremiumData.length; i++) { a_premiumCount += parseInt(PremiumData[i]["a_i3"]) || 0; document.getElementById('tot_a_premium').value = a_premiumCount || 0; }; }
        else { for (var i = 0; i < PremiumData.length; i++) { p_premiumCount += parseInt(PremiumData[i]["p_i3"]) || 0; document.getElementById('tot_p_premium').value = p_premiumCount || 0; }; };
        $scope.Total80c();
    };
    $scope.AddNSC = function () {
        var nsc1 = document.getElementById('nsc1').value || 0; var nsc2 = document.getElementById('nsc2').value; var p_nsc3 = document.getElementById('p_nsc3').value || 0; var a_nsc3 = document.getElementById('a_nsc3').value || 0; var i_nsc4 = document.getElementById('i_nsc4').value || 0; var tables = document.getElementById('aliasTable2'); var rowCounts = tables.rows.length; for (var i = 0; i < rowCounts; i++) { var row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='nsc1' value='" + nsc1 + "'>" + nsc1 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='nsc2' value='" + nsc2 + "'>" + nsc2 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='p_nsc3' value='" + p_nsc3 + "'>" + p_nsc3 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='a_nsc3' value='" + a_nsc3 + "'>" + a_nsc3 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='i_nsc4 value='" + i_nsc4 + "'>" + i_nsc4 + "</td>" + "<td style='text-align:center;'><input type='button' name='Del2' value='Del' onclick='RemoveNSC(this)' class='btn btn-danger'></td>" + "</tr>"); $("#aliasTable2").append(row); document.getElementById('nsc1').value = ""; document.getElementById('nsc2').value = ""; document.getElementById("p_nsc3").value = ""; document.getElementById("a_nsc3").value = ""; document.getElementById('i_nsc4').value = ""; break; }; $scope.calNSC();
    };
    $scope.calNSC = function () {
        var NSCData = storeTblValues(); function storeTblValues() {
            var NSCData = new Array(); $('#aliasTable2 tr').each(function (row, tr) { NSCData[row] = { "nsc1": $(tr).find('td:eq(0)').text(), "nsc2": $(tr).find('td:eq(1)').text(), "p_nsc3": $(tr).find('td:eq(2)').text(), "a_nsc3": $(tr).find('td:eq(3)').text(), "i_nsc4": $(tr).find('td:eq(4)').text() } }); NSCData.shift(); return NSCData;
        }; var p_nsc = 0; var a_nsc = 0; var act = $('#hidactualFlag').val();
        if (act === "true") { for (var i = 0; i < NSCData.length; i++) { a_nsc += parseInt(NSCData[i]["a_nsc3"]) || 0; document.getElementById('tot_a_nsc').value = a_nsc; }; }
        else { for (var i = 0; i < NSCData.length; i++) { p_nsc += parseInt(NSCData[i]["p_nsc3"]) || 0; document.getElementById('tot_p_nsc').value = p_nsc; }; };
        $scope.Total80c();
    };
    $scope.AddMFUND = function () {
        var mf1 = document.getElementById('mf1').value; var mf4 = document.getElementById('mf4').value; var p_mf = document.getElementById('mf2').value || 0; var a_mf = document.getElementById('mf3').value || 0; var tables = document.getElementById('aliasTable1'); var rowCounts = tables.rows.length; for (var i = 0; i <= rowCounts; i++) { var row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='mf1' value='" + mf1 + "'>" + mf1 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='mf4' value='" + mf4 + "'>" + mf4 + "</td>" + "<td style='text-align:center;'><input type='hidden' name='p_mf' value='" + p_mf + "'>" + p_mf + "</td>" + "<td style='text-align:center;'><input type='hidden' name='a_mf' value='" + a_mf + "'>" + a_mf + "</td>" + "<td style='text-align:center;'><input type='button' name='Del1' value='Del' onclick='RemoveMUF(this)' class='btn btn-danger'></td>" + "</tr>"); $("#aliasTable1").append(row); document.getElementById('mf1').value = ""; document.getElementById('mf4').value = ""; document.getElementById('mf2').value = ""; document.getElementById('mf3').value = ""; break; }; $scope.calMFUND();
    };
    $scope.calMFUND = function () {
        var MutualFund = storeTblValues(); function storeTblValues() {
            var MutualFund = new Array(); $('#aliasTable1 tr').each(function (row, tr) { MutualFund[row] = { "mf1": $(tr).find('td:eq(0)').text(), "mf4": $(tr).find('td:eq(1)').text(), "p_mf": $(tr).find('td:eq(2)').text(), "a_mf": $(tr).find('td:eq(3)').text() } }); MutualFund.shift(); return MutualFund;
        } var p_mfcount = 0; var a_mfcount = 0; var act = $('#hidactualFlag').val();
        if (act === "true") { for (var i = 0; i < MutualFund.length; i++) { a_mfcount += parseInt(MutualFund[i]["a_mf"]) || 0; document.getElementById('tot_a_mfund').value = a_mfcount; }; }
        else { for (var i = 0; i < MutualFund.length; i++) { p_mfcount += parseInt(MutualFund[i]["p_mf"]) || 0; document.getElementById('tot_p_mfund').value = p_mfcount; }; };
        $scope.Total80c();
    };
    $scope.AddUlip = function () {
        var txt_ulipAccno = document.getElementById('txt_ulipAccno').value || 0; var ulipdate = document.getElementById('ulipdate').value; var p_ulip = document.getElementById('p_ulip').value || 0; var a_ulip = document.getElementById('a_ulip').value || 0; if (txt_ulipAccno === 0) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Fill ULIP Details</strong></div>"; $('#MessageBox').show(); return false; }; var tables = document.getElementById('aliasTable6'); var rowCounts = tables.rows.length; for (var i = 0; i <= rowCounts; i++) { var row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='txt_ulipAccno' value='" + txt_ulipAccno + "'>" + txt_ulipAccno + "</td>" + "<td style='text-align:center;'><input type='hidden' name='ulipdate' value='" + ulipdate + "'>" + ulipdate + "</td>" + "<td style='text-align:center;'><input type='hidden' name='p_ulip' value='" + p_ulip + "'>" + p_ulip + "</td>" + "<td style='text-align:center;'><input type='hidden' name='a_ulip' value='" + a_ulip + "'>" + a_ulip + "</td>" + "<td style='text-align:center;'><input type='button' name='Del6' value='Del' onclick='RemoveUlip(this)' class='btn btn-danger'></td>" + "</tr>"); $("#aliasTable6").append(row); document.getElementById('txt_ulipAccno').value = ""; document.getElementById('ulipdate').value = ""; document.getElementById('p_ulip').value = ""; document.getElementById('a_ulip').value = ""; break; }; $scope.calUlip();
    };
    $scope.calUlip = function () {
        var Ulip = storeTblValues(); function storeTblValues() {
            var Ulip = new Array(); $('#aliasTable6 tr').each(function (row, tr) { Ulip[row] = { "txt_ulipAccno": $(tr).find('td:eq(0)').text(), "ulipdate": $(tr).find('td:eq(1)').text(), "p_ulip": $(tr).find('td:eq(2)').text(), "a_ulip": $(tr).find('td:eq(3)').text() }; }); Ulip.shift(); return Ulip;
        }; var p_ulipcount = 0; var a_ulipcount = 0; var act = $('#hidactualFlag').val();
        if (act === "true") { for (var i = 0; i < Ulip.length; i++) { a_ulipcount += parseInt(Ulip[i]["a_ulip"]) || 0; document.getElementById('tot_a_ulip').value = a_ulipcount || 0; }; }
        else { for (var i = 0; i < Ulip.length; i++) { p_ulipcount += parseInt(Ulip[i]["p_ulip"]) || 0; document.getElementById('tot_p_ulip').value = p_ulipcount || 0; }; };
        $scope.Total80c();
    };
    $scope.AddSS = function () {
        var txt_SSAccName = document.getElementById('txt_SSAccName').value || 0; var ssdate = document.getElementById('ssdate').value; var p_ssAmount = document.getElementById('p_ssAmount').value || 0; var a_ssAmount = document.getElementById('a_ssAmount').value || 0; if (txt_SSAccName === '') { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Fill Sukanya Samridhi Details</strong></div>"; $('#MessageBox').show(); return false; }; var tables = document.getElementById('aliasTable7'); var rowCounts = tables.rows.length; for (var i = 0; i <= rowCounts; i++) { var row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='txt_SSAccName' value='" + txt_SSAccName + "'>" + txt_SSAccName + "</td>" + "<td style='text-align:center;'><input type='hidden' name='ssdate' value='" + ssdate + "'>" + ssdate + "</td>" + "<td style='text-align:center;'><input type='hidden' name='p_ssAmount' value='" + p_ssAmount + "'>" + p_ssAmount + "</td>" + "<td style='text-align:center;'><input type='hidden' name='a_ssAmount' value='" + a_ssAmount + "'>" + a_ssAmount + "</td>" + "<td style='text-align:center;'><input type='button' name='Del7' value='Del' onclick='RemoveSS(this)' class='btn btn-danger'></td>" + "</tr>"); $("#aliasTable7").append(row); document.getElementById('txt_SSAccName').value = ""; document.getElementById('ssdate').value = ""; document.getElementById('p_ssAmount').value = ""; document.getElementById('a_ssAmount').value = ""; break; }; $scope.calSS();
    };
    $scope.calSS = function () {
        var SS = storeTblValues(); function storeTblValues() {
            var SS = new Array(); $('#aliasTable7 tr').each(function (row, tr) { SS[row] = { "txt_SSAccName": $(tr).find('td:eq(0)').text(), "ssdate": $(tr).find('td:eq(1)').text(), "p_ssAmount": $(tr).find('td:eq(2)').text(), "a_ssAmount": $(tr).find('td:eq(3)').text() }; }); SS.shift(); return SS;
        }; var p_ssAmount = 0; var a_ssAmount = 0; var act = $('#hidactualFlag').val();
        if (act === "true") { for (var i = 0; i < SS.length; i++) { a_ssAmount += parseInt(SS[i]["a_ssAmount"]) || 0; document.getElementById('tot_a_ssAmt').value = a_ssAmount || 0; }; }
        else { for (var i = 0; i < SS.length; i++) { p_ssAmount += parseInt(SS[i]["p_ssAmount"]) || 0; document.getElementById('tot_p_ssAmt').value = p_ssAmount || 0; }; };
        $scope.Total80c();
    };
    $scope.Total80c = function () {
        var act = $('#hidactualFlag').val(); if (act === "true") {
            var tot_a_ppf = parseInt(document.getElementById('tot_a_ppf').value) || 0;
            var tot_a_fd = parseInt(document.getElementById('tot_a_fd').value) || 0;
            var tot_a_premium = parseInt(document.getElementById('tot_a_premium').value) || 0;
            var tot_a_nsc = parseInt(document.getElementById('tot_a_nsc').value) || 0;
            var tot_a_mfund = parseInt(document.getElementById('tot_a_mfund').value) || 0;
            var tot_a_ulip = parseInt(document.getElementById('tot_a_ulip').value) || 0;
            var tot_a_ssAmt = parseInt(document.getElementById('tot_a_ssAmt').value) || 0;
            var a_houseloan = parseInt(document.getElementById('a_houseloan').value) || 0;
            var a_houseloan2 = parseInt(document.getElementById('a_houseloan2').value) || 0;
            var a_childfees1 = parseInt(document.getElementById('a_childfees1').value) || 0;
            var a_childfees2 = parseInt(document.getElementById('a_childfees2').value) || 0;
            var a_total = tot_a_ppf + tot_a_fd + tot_a_premium + tot_a_nsc + tot_a_mfund + tot_a_ulip + tot_a_ssAmt +
                a_houseloan + a_houseloan2 + a_childfees1 + a_childfees2;
            document.getElementById("a_total").value = a_total;
        } else {
            var tot_p_ppf = parseInt(document.getElementById('tot_p_ppf').value) || 0;
            var tot_p_fd = parseInt(document.getElementById('tot_p_fd').value) || 0;
            var tot_p_premium = parseInt(document.getElementById('tot_p_premium').value) || 0;
            var tot_p_nsc = parseInt(document.getElementById('tot_p_nsc').value) || 0;
            var tot_p_mfund = parseInt(document.getElementById('tot_p_mfund').value) || 0;
            var tot_p_ulip = parseInt(document.getElementById('tot_p_ulip').value) || 0;
            var tot_p_ssAmt = parseInt(document.getElementById('tot_p_ssAmt').value) || 0;
            var p_houseloan = parseInt(document.getElementById('p_houseloan').value) || 0;
            var p_houseloan2 = parseInt(document.getElementById('p_houseloan2').value) || 0;
            var p_childfees1 = parseInt(document.getElementById('p_childfees1').value) || 0;
            var p_childfees2 = parseInt(document.getElementById('p_childfees2').value) || 0;
            var p_total = tot_p_ppf + tot_p_fd + tot_p_premium + tot_p_nsc + tot_p_mfund + tot_p_ulip + tot_p_ssAmt +
                p_houseloan + p_houseloan2 + p_childfees1 + p_childfees2;
            document.getElementById("p_total").value = p_total;
        };
    };
    $scope.AddDetails = function () {
        var act = $('#hidactualFlag').val();            //true=Actual and false=Provisional
        //TAX REGIME//
        var TaxRegime = $('#cmb_taxRegime').val(); var strchl = TaxRegime.includes("undefined");
        if (TaxRegime === "X" || strchl === true) { alert("Please Select TAX Regime OLD / NEW."); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Select TAX Regime OLD / NEW." + "</strong></div>"; $('#MessageBox').show(); return false; }
        var rnttotal = $('#renttotal').val() || 0; if (rnttotal > 100000) { var rntpan = $('#rentalpan').val() || ''; var rntname = $('#landlord').val() || ''; if (rntname === '' || rntpan === '') { alert("Landlord Name & PAN Number is Required Please fill Details."); return false; }; };
        var loan = 0; if (act === "true") { loan = $('#a_amountofinterest').val() || 0; } else { loan = $('#p_amountofinterest').val() || 0; };
        if (loan > 200000) { if (act === "true") { $('#a_amountofinterest').val("200000"); } else { $('#p_amountofinterest').val("200000"); }; };
        if ((loan !== 0 && loan !== "0") && ($scope.bankName === "" || $scope.bankName === "undefined")) { alert("Please Select Your Housing Loan Bank before enter housing loan interest"); return false; };
        var loan2 = 0; if (act === "true") { loan2 = $('#a_amountofinterest2').val() || 0; } else { loan2 = $('#p_amountofinterest2').val() || 0; };
        if (loan2 > 200000) { if (act === "true") { $('#a_amountofinterest2').val("200000"); } else { $('#p_amountofinterest2').val("200000"); }; };
        if ((loan2 !== 0 && loan2 !== "0") && ($scope.bankName2 === "" || $scope.bankName2 === "undefined")) { alert("Please Select Your Second Housing Loan Bank before enter housing loan interest"); return false; };
        var jsonObj = {}; var TableData = storeTblValues(); TableData = JSON.stringify(TableData);
        function storeTblValues() {
            jsonObj.yearMonth = $('#hidyearMonth').val(); jsonObj.empUnqId = $('#myEmpUnqId').val(); jsonObj.actualFlag = $('#hidactualFlag').val();
            jsonObj.taxRegime = TaxRegime; jsonObj.totalRentPaid = $('#renttotal').val() || 0; jsonObj.rentHouseAddress = $('#presentAddress').val() || 0;
            jsonObj.landLordName = $('#landlord').val() || ''; jsonObj.landLordPan = $('#rentalpan').val() || ''; jsonObj.prevCompSalary = $('#p_salary').val() || 0;
            jsonObj.prevCompTds = $('#p_taxdeduct').val() || 0; jsonObj.child1Name = $('#txt_childname1').val() || ''; jsonObj.child2Name = $('#txt_childname2').val() || '';
            jsonObj.medicalPremiumParentsAge = 0;
            jsonObj.propertyAddress = $('#txt_addofproperty').val() || ''; jsonObj.propertyAddress2 = $('#txt_addofproperty2').val() || '';
            jsonObj.propertyStatus = $('#cmb_statusofproperty').val() || ''; jsonObj.propertyStatus2 = $('#cmb_statusofproperty2').val() || '';
            if ((loan !== 0 && loan !== "0") && ($scope.bankName === "" || $scope.bankName === "undefined")) { alert("Please Select Your Housing Loan Bank"); return false; } else { jsonObj.loanBank = $scope.bankName; jsonObj.loanBankPan = $scope.bankPan; };
            if ((loan2 !== 0 && loan2 !== "0") && ($scope.bankName2 === "" || $scope.bankName2 === "undefined")) { alert("Please Select Your Second Housing Loan Bank"); return false; } else { jsonObj.loanBank2 = $scope.bankName2; jsonObj.loanBankPan2 = $scope.bankPan2; };
            jsonObj.loanAmount = $('#hloanAforesaid').val() || 0; jsonObj.loanAmount2 = $('#hloanAforesaid2').val() || 0;
            jsonObj.loanDate = $('#loantakendate').val() || ''; jsonObj.loanDate2 = $('#loantakendate2').val() || '';
            jsonObj.purpose = $('#cmb_purposeofloan').val() || ''; jsonObj.purpose2 = $('#cmb_purposeofloan2').val() || '';
            jsonObj.constructionCompDate = $('#datecontcomplete').val() || ''; jsonObj.constructionCompDate2 = $('#datecontcomplete2').val() || '';
            jsonObj.possessionDate = $('#datepsproperty').val() || ''; jsonObj.possessionDate2 = $('#datepsproperty2').val() || '';
            jsonObj.ownership = $('#cmb_ownership').val() || ''; jsonObj.ownership2 = $('#cmb_ownership2').val() || '';
            jsonObj.jointOwnerName = $('#txt_jointownername').val() || ''; jsonObj.jointOwnerName2 = $('#txt_jointownername2').val() || '';
            jsonObj.jointOwnerRelation = $('#txt_jointownerrelationship').val() || ''; jsonObj.jointOwnerRelation2 = $('#txt_jointownerrelationship2').val() || '';
            jsonObj.jointOwnerShare = $('#txt_jointownershare').val() || 0; jsonObj.jointOwnerShare2 = $('#txt_jointownershare2').val() || 0;
            jsonObj.rentalIncomePerMonth = $('#rentalincome').val() || 0; jsonObj.rentalIncomePerMonth2 = $('#rentalincome2').val() || 0;
            jsonObj.municipalTax = $('#muntax').val() || 0; jsonObj.municipalTax2 = $('#muntax2').val() || 0;
            jsonObj.otherIncomeDesc = $('#txt_otherincometext').val() || ''; jsonObj.updateUserId = $('#myEmpUnqId').val(); jsonObj.updateDate = new Date();
            if (jsonObj.actualFlag === "true") {
                jsonObj.totalPpfAmt = $('#tot_a_ppf').val() || 0; jsonObj.totalBankDepositAmount = $('#tot_a_fd').val() || 0;
                jsonObj.totalInsurancePremium = $('#tot_a_premium').val() || 0; jsonObj.totalNscAmount = $('#tot_a_nsc').val() || 0;
                jsonObj.totalMutualFund = $('#tot_a_mfund').val() || 0; jsonObj.totalUlip = $('#tot_a_ulip').val() || 0; jsonObj.totalSukanya = $('#tot_a_ssAmt').val() || 0;
                jsonObj.houseLoanPrincipal = $('#a_houseloan').val() || 0; jsonObj.houseLoanPrincipal2 = $('#a_houseloan2').val() || 0;
                jsonObj.tuitionFeeChild1 = $('#a_childfees1').val() || 0; jsonObj.tuitionFeeChild2 = $('#a_childfees2').val() || 0;
                jsonObj.medicalPremiumSelf = $('#a_mediclaimpremiumforfamily').val() || 0; jsonObj.medicalPremiumParents = $('#a_mediclaimpremiumforparents').val() || 0;
                jsonObj.medicalPreventiveHealthCheckup = $('#a_mediclaimpremiumforhealth').val() || 0; jsonObj.educationLoanInterest = $('#a_eduloan').val() || 0;
                jsonObj.physicalDisability = $('#a_disablity').val() || 0; jsonObj.severeDisability = $('#a_severedisablity').val() || 0;
                jsonObj.nationalPensionScheme = $('#a_NPS').val() || 0; jsonObj.disableDependent = $('#a_disdependent').val() || 0;
                jsonObj.medicalExpenditure = $('#a_medicalexpenditure').val() || 0; jsonObj.interestOnLoan = $('#a_amountofinterest').val() || 0;
                jsonObj.interestOnLoan2 = $('#a_amountofinterest2').val() || 0; jsonObj.interestPreConstruction = $('#a_amountofinterestasperit').val() || 0;
                jsonObj.interestPreConstruction2 = $('#a_amountofinterestasperit2').val() || 0; jsonObj.otherInterest = $('#a_optionalinterest').val() || 0;
                jsonObj.otherIncomeAmount = $('#a_optionalotherincome').val() || 0;
            } else {
                jsonObj.totalPpfAmt = $('#tot_p_ppf').val() || 0; jsonObj.totalBankDepositAmount = $('#tot_p_fd').val() || 0;
                jsonObj.totalInsurancePremium = $('#tot_p_premium').val() || 0; jsonObj.totalNscAmount = $('#tot_p_nsc').val() || 0;
                jsonObj.totalMutualFund = $('#tot_p_mfund').val() || 0; jsonObj.totalUlip = $('#tot_p_ulip').val() || 0; jsonObj.totalSukanya = $('#tot_p_ssAmt').val() || 0;
                jsonObj.houseLoanPrincipal = $('#p_houseloan').val() || 0; jsonObj.houseLoanPrincipal2 = $('#p_houseloan2').val() || 0;
                jsonObj.tuitionFeeChild1 = $('#p_childfees1').val() || 0; jsonObj.tuitionFeeChild2 = $('#p_childfees2').val() || 0;
                jsonObj.medicalPremiumSelf = $('#p_mediclaimpremiumforfamily').val() || 0; jsonObj.medicalPremiumParents = $('#p_mediclaimpremiumforparents').val() || 0;
                jsonObj.medicalPreventiveHealthCheckup = $('#p_mediclaimpremiumforhealth').val() || 0; jsonObj.educationLoanInterest = $('#p_eduloan').val() || 0;
                jsonObj.physicalDisability = $('#p_disablity').val() || 0; jsonObj.severeDisability = $('#p_severedisablity').val() || 0;
                jsonObj.nationalPensionScheme = $('#p_NPS').val() || 0; jsonObj.disableDependent = $('#p_disdependent').val() || 0;
                jsonObj.medicalExpenditure = $('#p_medicalexpenditure').val() || 0; jsonObj.interestOnLoan = $('#p_amountofinterest').val() || 0;
                jsonObj.interestOnLoan2 = $('#p_amountofinterest2').val() || 0; jsonObj.interestPreConstruction = $('#p_amountofinterestasperit').val() || 0;
                jsonObj.interestPreConstruction2 = $('#p_amountofinterestasperit2').val() || 0; jsonObj.otherInterest = $('#p_optionalinterest').val() || 0;
                jsonObj.otherIncomeAmount = $('#p_optionalotherincome').val() || 0;
            };
            //Add Details Table Records on actual flag wise
            var RentData = new Array(); var PPFData = new Array(); var FDData = new Array(); var PremiumData = new Array(); var NSCData = new Array(); var MutualFund = new Array(); var ULIPData = new Array(); var SSData = new Array(); var companyaccomodation = $('#hidCompanyaccoFlag').val();
            if (jsonObj.actualFlag === "true") {
                if (companyaccomodation === "false") {
                    $('#renttable tr').each(function (row, tr) {
                        if (row === 2) {
                            RentData[row] = {
                                "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "empUnqIdYear": $('#myEmpUnqId').val() + $('#hidyearMonth').val(),
                                "april": $(tr).find('td:eq(1) input[type="text"]').val() || "0", "may": $(tr).find('td:eq(2) input[type="text"]').val() || "0", "june": $(tr).find('td:eq(3) input[type="text"]').val() || "0", "july": $(tr).find('td:eq(4) input[type="text"]').val() || "0",
                                "august": $(tr).find('td:eq(5) input[type="text"]').val() || "0", "september": $(tr).find('td:eq(6) input[type="text"]').val() || "0", "october": $(tr).find('td:eq(7) input[type="text"]').val() || "0", "november": $(tr).find('td:eq(8) input[type="text"]').val() || "0",
                                "december": $(tr).find('td:eq(9) input[type="text"]').val() || "0", "january": $(tr).find('td:eq(10) input[type="text"]').val() || "0", "february": $(tr).find('td:eq(11) input[type="text"]').val() || "0", "march": $(tr).find('td:eq(12) input[type="text"]').val() || "0"
                            }
                        };
                    }); RentData.shift();
                };
                $('#aliasTable4 tr').each(function (row, tr) { if (row > 1) { PPFData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "ppfAcNo": $(tr).find('td:eq(0)').text(), "ppfDepositeDate": $(tr).find('td:eq(1)').text(), "ppfAmt": $(tr).find('td:eq(3)').text() } }; }); PPFData.shift();
                $('#aliasTable5 tr').each(function (row, tr) { if (row > 1) { FDData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "bankAccountNo": $(tr).find('td:eq(0)').text(), "depositDate": $(tr).find('td:eq(1)').text(), "depositAmount": $(tr).find('td:eq(3)').text() } }; }); FDData.shift();
                $('#aliasTable tr').each(function (row, tr) { if (row > 1) { PremiumData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "policyNo": $(tr).find('td:eq(0)').text(), "policyDate": $(tr).find('td:eq(1)').text(), "sumInsured": $(tr).find('td:eq(2)').text(), "annualPremiumAmount": $(tr).find('td:eq(4)').text(), "premiumPaidDate": $(tr).find('td:eq(5)').text(), "premiumDueDate": $(tr).find('td:eq(6)').text() } }; }); PremiumData.shift();
                $('#aliasTable2 tr').each(function (row, tr) { if (row > 1) { NSCData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "nscNumber": $(tr).find('td:eq(0)').text(), "nscPurchaseDate": $(tr).find('td:eq(1)').text(), "nscAmount": $(tr).find('td:eq(3)').text(), "nscInterestAmount": $(tr).find('td:eq(4)').text() } }; }); NSCData.shift();
                $('#aliasTable1 tr').each(function (row, tr) { if (row > 1) { MutualFund[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "mutualFundName": $(tr).find('td:eq(0)').text(), "mutualFundDate": $(tr).find('td:eq(1)').text(), "mutualFundAmount": $(tr).find('td:eq(3)').text() } }; }); MutualFund.shift();
                $('#aliasTable6 tr').each(function (row, tr) { if (row > 1) { ULIPData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "ulipNo": $(tr).find('td:eq(0)').text(), "ulipDate": $(tr).find('td:eq(1)').text(), "ulipAmount": $(tr).find('td:eq(3)').text() } }; }); ULIPData.shift();
                $('#aliasTable7 tr').each(function (row, tr) { if (row > 1) { SSData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "sukanyaName": $(tr).find('td:eq(0)').text(), "sukanyaDate": $(tr).find('td:eq(1)').text(), "sukanyaAmount": $(tr).find('td:eq(3)').text() } }; }); SSData.shift();
            } else {
                if (companyaccomodation === "false") {
                    $('#renttable tr').each(function (row, tr) {
                        if (row === 1) {
                            RentData[row] = {
                                "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "empUnqIdYear": $('#myEmpUnqId').val() + $('#hidyearMonth').val(),
                                "april": $(tr).find('td:eq(1) input[type="text"]').val() || "0", "may": $(tr).find('td:eq(2) input[type="text"]').val() || "0", "june": $(tr).find('td:eq(3) input[type="text"]').val() || "0", "july": $(tr).find('td:eq(4) input[type="text"]').val() || "0",
                                "august": $(tr).find('td:eq(5) input[type="text"]').val() || "0", "september": $(tr).find('td:eq(6) input[type="text"]').val() || "0", "october": $(tr).find('td:eq(7) input[type="text"]').val() || "0", "november": $(tr).find('td:eq(8) input[type="text"]').val() || "0",
                                "december": $(tr).find('td:eq(9) input[type="text"]').val() || "0", "january": $(tr).find('td:eq(10) input[type="text"]').val() || "0", "february": $(tr).find('td:eq(11) input[type="text"]').val() || "0", "march": $(tr).find('td:eq(12) input[type="text"]').val() || "0"
                            }
                        };
                    }); RentData.shift();
                };
                $('#aliasTable4 tr').each(function (row, tr) { if (row > 1) { PPFData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "ppfAcNo": $(tr).find('td:eq(0)').text(), "ppfDepositeDate": $(tr).find('td:eq(1)').text(), "ppfAmt": $(tr).find('td:eq(2)').text() } }; }); PPFData.shift();
                $('#aliasTable5 tr').each(function (row, tr) { if (row > 1) { FDData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "bankAccountNo": $(tr).find('td:eq(0)').text(), "depositDate": $(tr).find('td:eq(1)').text(), "depositAmount": $(tr).find('td:eq(2)').text() } }; }); FDData.shift();
                $('#aliasTable tr').each(function (row, tr) { if (row > 1) { PremiumData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "policyNo": $(tr).find('td:eq(0)').text(), "policyDate": $(tr).find('td:eq(1)').text(), "sumInsured": $(tr).find('td:eq(2)').text(), "annualPremiumAmount": $(tr).find('td:eq(3)').text(), "premiumPaidDate": $(tr).find('td:eq(5)').text(), "premiumDueDate": $(tr).find('td:eq(6)').text() } }; }); PremiumData.shift();
                $('#aliasTable2 tr').each(function (row, tr) { if (row > 1) { NSCData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "nscNumber": $(tr).find('td:eq(0)').text(), "nscPurchaseDate": $(tr).find('td:eq(1)').text(), "nscAmount": $(tr).find('td:eq(2)').text(), "nscInterestAmount": 0 } }; }); NSCData.shift();
                $('#aliasTable1 tr').each(function (row, tr) { if (row > 1) { MutualFund[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "mutualFundName": $(tr).find('td:eq(0)').text(), "mutualFundDate": $(tr).find('td:eq(1)').text(), "mutualFundAmount": $(tr).find('td:eq(2)').text() } }; }); MutualFund.shift();
                $('#aliasTable6 tr').each(function (row, tr) { if (row > 1) { ULIPData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "ulipNo": $(tr).find('td:eq(0)').text(), "ulipDate": $(tr).find('td:eq(1)').text(), "ulipAmount": $(tr).find('td:eq(2)').text() } }; }); ULIPData.shift();
                $('#aliasTable7 tr').each(function (row, tr) { if (row > 1) { SSData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(), "sukanyaName": $(tr).find('td:eq(0)').text(), "sukanyaDate": $(tr).find('td:eq(1)').text(), "sukanyaAmount": $(tr).find('td:eq(2)').text() } }; }); SSData.shift();
            };
            if (RentData.length > 1) { RentData.shift(); };
            if (PPFData.length > 1) { PPFData.shift(); };
            if (FDData.length > 1) { FDData.shift(); };
            if (PremiumData.length > 1) { PremiumData.shift(); };
            if (NSCData.length > 1) { NSCData.shift(); };
            if (MutualFund.length > 1) { MutualFund.shift(); };
            if (ULIPData.length > 1) { ULIPData.shift(); };
            if (SSData.length > 1) { SSData.shift(); };
            jsonObj.rentDetails = RentData; jsonObj.ppfDetails = PPFData; jsonObj.bankDeposits = FDData; jsonObj.insuranceDetails = PremiumData;
            jsonObj.nscDetails = NSCData; jsonObj.mutualFundDetails = MutualFund; jsonObj.ulipDetails = ULIPData; jsonObj.sukanyaDetails = SSData;
            if (TaxRegime === "N") {
                var n = new Array();
                jsonObj.totalRentPaid = "0", jsonObj.landLordName = "", jsonObj.landLordPan = "", jsonObj.prevCompSalary = "0", jsonObj.prevCompTds = "0",
                    jsonObj.child1Name = "", jsonObj.child2Name = "", jsonObj.others1Desc = "", jsonObj.others2Desc = "", jsonObj.medicalPremiumParentsAge = "0",
                    jsonObj.propertyAddress = "", jsonObj.propertyStatus = "x", jsonObj.loanAmount = "0", jsonObj.loanDate = "", jsonObj.purpose = "x",
                    jsonObj.constructionCompDate = "", jsonObj.possessionDate = "", jsonObj.ownership = "x", jsonObj.jointOwnerName = "",
                    jsonObj.jointOwnerRelation = "", jsonObj.jointOwnerShare = "0", jsonObj.rentalIncomePerMonth = "0", jsonObj.municipalTax = "0",
                    jsonObj.propertyAddress2 = "", jsonObj.propertyStatus2 = "x", jsonObj.loanAmount2 = "0", jsonObj.loanDate2 = "", jsonObj.purpose2 = "x",
                    jsonObj.constructionCompDate2 = "", jsonObj.possessionDate2 = "", jsonObj.ownership2 = "x", jsonObj.jointOwnerName2 = "",
                    jsonObj.jointOwnerRelation2 = "", jsonObj.jointOwnerShare2 = "0", jsonObj.rentalIncomePerMonth2 = "0", jsonObj.municipalTax2 = "0",
                    jsonObj.otherIncomeDesc = "", jsonObj.totalPpfAmt = "0", jsonObj.totalBankDepositAmount = "0", jsonObj.totalInsurancePremium = "0",
                    jsonObj.totalNscAmount = "0", jsonObj.totalMutualFund = "0", jsonObj.totalUlip = "0", jsonObj.totalSukanya = "0", jsonObj.houseLoanPrincipal = "0",
                    jsonObj.houseLoanPrincipal2 = "0", jsonObj.tuitionFeeChild1 = "0", jsonObj.tuitionFeeChild2 = "0", jsonObj.notifiedPensionScheme = "0",
                    jsonObj.others1Amount = "0", jsonObj.others2Amount = "0", jsonObj.rajivGandhiEquity = "0", jsonObj.medicalPremiumSelf = "0",
                    jsonObj.medicalPremiumParents = "0", jsonObj.medicalPreventiveHealthCheckup = "0", jsonObj.educationLoanInterest = "0",
                    jsonObj.physicalDisability = "0", jsonObj.severeDisability = "0", jsonObj.nationalPensionScheme = "0", jsonObj.disableDependent = "0",
                    jsonObj.medicalExpenditure = "0", jsonObj.interestOnLoan = "0", jsonObj.interestPreConstruction = "0", jsonObj.interestOnLoan2 = "0",
                    jsonObj.interestPreConstruction2 = "0", jsonObj.otherInterest = "0", jsonObj.otherIncomeAmount = "0",
                    jsonObj.rentDetails = [
                        {
                            "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(),
                            "empUnqIdYear": $('#myEmpUnqId').val() + $('#hidyearMonth').val(), "april": "0", "may": "0", "june": "0", "july": "0", "august": "0", "september": "0",
                            "october": "0", "november": "0", "december": "0", "january": "0", "february": "0", "march": "0"
                        }
                    ],
                    jsonObj.ppfDetails = n, jsonObj.bankDeposits = n, jsonObj.insuranceDetails = n, jsonObj.nscDetails = n, jsonObj.mutualFundDetails = n,
                    jsonObj.ulipDetails = n, jsonObj.sukanyaDetails = n
            };
            return jsonObj;
        };
        var tax = new XMLHttpRequest(); tax.open('POST', $scope._Conpath + 'TaxDeclaration/CreateTaxDeclaration', true);
        tax.setRequestHeader('Content-type', 'application/json'); tax.onreadystatechange = function () {
            if (tax.readyState === 4 && tax.status === 200) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Your Tax Declaration Details Saved Successfully.</strong></div>"; $('#MessageBox').show(); alert("Your Tax Declaration Details Saved Successfully."); $scope.ResetView(); }
            else if (tax.status === 400 || tax.status === 403 || tax.status === 404 || tax.status === 408 || tax.status === 500) {
                var str = tax.responseText.replace("[", "").replace("]", "").toString(); var fields = str.split(","); var er = "";
                for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er + "</strong></div>"; $("#MessageBox").show();
            };
        }; tax.send(TableData);
    };            //Submit Method For User
    $scope.UpdateDetailsFin = function () {
        var ecode = $('#eCode').val() || 0; if (ecode === 0) { alert("Records not Updated"); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record not Updated.</strong></div>"; $('#MessageBox').show(); return false; };
        var act = $('#hidactualFlag').val();            //true=Actual and false=Provisional
        //TAX REGIME//
        var TaxRegime = $('#cmb_taxRegime').val();
        var strchl = TaxRegime.includes("undefined");
        if (TaxRegime === "X" || strchl === true) {
            alert("Please Select TAX Regime OLD / NEW.");
            document.getElementById("MessageBox").innerHTML =
                "<div class='alert alert-danger alert-dismissable'>" +
                "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Select TAX Regime OLD / NEW." +
                "</strong></div>"; $('#MessageBox').show();
            return false;
        }
        var rnttotal = $('#renttotal').val() || 0; if (rnttotal > 100000) { var rntpan = $('#rentalpan').val() || ''; var rntname = $('#landlord').val() || ''; if (rntname === '' || rntpan === '') { alert("Landlord Name & PAN Number is Required Please fill Details."); return false; }; };
        var loan = 0; if (act === "true") { loan = $('#a_amountofinterest').val() || 0; } else { loan = $('#p_amountofinterest').val() || 0; };
        if (loan > 200000) { if (act === "true") { $('#a_amountofinterest').val("200000"); } else { $('#p_amountofinterest').val("200000"); }; };
        if ((loan !== 0 && loan !== "0") && ($scope.bankName === "" || $scope.bankName === "undefined")) { alert("Please Select Your Housing Loan Bank before enter housing loan interest"); return false; };
        var jsonObj = {}; var TableData = storeTblValues(); TableData = JSON.stringify(TableData);
        function storeTblValues() {
            jsonObj.yearMonth = $('#hidyearMonth').val(); jsonObj.empUnqId = ecode; jsonObj.actualFlag = $('#hidactualFlag').val(); jsonObj.taxRegime = TaxRegime;
            jsonObj.totalRentPaid = $('#renttotal').val() || 0; jsonObj.rentHouseAddress = $('#presentAddress').val() || 0; jsonObj.landLordName = $('#landlord').val() || '';
            jsonObj.landLordPan = $('#rentalpan').val() || ''; jsonObj.prevCompSalary = $('#p_salary').val() || 0; jsonObj.prevCompTds = $('#p_taxdeduct').val() || 0;
            jsonObj.child1Name = $('#txt_childname1').val() || ''; jsonObj.child2Name = $('#txt_childname2').val() || '';
            jsonObj.medicalPremiumParentsAge = 0; jsonObj.propertyAddress = $('#txt_addofproperty').val() || '';
            jsonObj.propertyStatus = $('#cmb_statusofproperty').val() || '';
            if ((loan !== 0 && loan !== "0") && ($scope.bankName === "" || $scope.bankName === "undefined")) { alert("Please Select Your Housing Loan Bank"); return false; } else { jsonObj.loanBank = $scope.bankName; jsonObj.loanBankPan = $scope.bankPan; };
            jsonObj.loanAmount = $('#hloanAforesaid').val() || 0; jsonObj.loanDate = $('#loantakendate').val() || ''; jsonObj.purpose = $('#cmb_purposeofloan').val() || '';
            jsonObj.constructionCompDate = $('#datecontcomplete').val() || ''; jsonObj.possessionDate = $('#datepsproperty').val() || ''; jsonObj.ownership = $('#cmb_ownership').val() || '';
            jsonObj.jointOwnerName = $('#txt_jointownername').val() || ''; jsonObj.jointOwnerRelation = $('#txt_jointownerrelationship').val() || '';
            jsonObj.jointOwnerShare = $('#txt_jointownershare').val() || 0; jsonObj.rentalIncomePerMonth = $('#rentalincome').val() || 0;
            jsonObj.otherIncomeDesc = $('#txt_otherincometext').val() || ''; jsonObj.updateUserId = $('#myEmpUnqId').val(); jsonObj.updateDate = new Date();
            if (jsonObj.actualFlag === "true") {
                jsonObj.totalPpfAmt = $('#tot_a_ppf').val() || 0; jsonObj.totalBankDepositAmount = $('#tot_a_fd').val() || 0;
                jsonObj.totalInsurancePremium = $('#tot_a_premium').val() || 0; jsonObj.totalNscAmount = $('#tot_a_nsc').val() || 0;
                jsonObj.totalMutualFund = $('#tot_a_mfund').val() || 0; jsonObj.totalUlip = $('#tot_a_ulip').val() || 0;
                jsonObj.totalSukanya = $('#tot_a_ssAmt').val() || 0;
                jsonObj.houseLoanPrincipal = $('#a_houseloan').val() || 0; jsonObj.houseLoanPrincipal2 = $('#a_houseloan2').val() || 0;
                jsonObj.tuitionFeeChild1 = $('#a_childfees1').val() || 0;
                jsonObj.tuitionFeeChild2 = $('#a_childfees2').val() || 0;
                jsonObj.medicalPremiumSelf = $('#a_mediclaimpremiumforfamily').val() || 0;
                jsonObj.medicalPremiumParents = $('#a_mediclaimpremiumforparents').val() || 0;
                jsonObj.medicalPreventiveHealthCheckup = $('#a_mediclaimpremiumforhealth').val() || 0; jsonObj.educationLoanInterest = $('#a_eduloan').val() || 0;
                jsonObj.physicalDisability = $('#a_disablity').val() || 0; jsonObj.severeDisability = $('#a_severedisablity').val() || 0;
                jsonObj.nationalPensionScheme = $('#a_NPS').val() || 0; jsonObj.disableDependent = $('#a_disdependent').val() || 0;
                jsonObj.medicalExpenditure = $('#a_medicalexpenditure').val() || 0;
                jsonObj.interestOnLoan = $('#a_amountofinterest').val() || 0; jsonObj.interestPreConstruction = $('#a_amountofinterestasperit').val() || 0;
                jsonObj.otherInterest = $('#a_optionalinterest').val() || 0; jsonObj.otherIncomeAmount = $('#a_optionalotherincome').val() || 0;
            } else {
                jsonObj.totalPpfAmt = $('#tot_p_ppf').val() || 0; jsonObj.totalBankDepositAmount = $('#tot_p_fd').val() || 0;
                jsonObj.totalInsurancePremium = $('#tot_p_premium').val() || 0; jsonObj.totalNscAmount = $('#tot_p_nsc').val() || 0;
                jsonObj.totalMutualFund = $('#tot_p_mfund').val() || 0; jsonObj.totalUlip = $('#tot_p_ulip').val() || 0;
                jsonObj.totalSukanya = $('#tot_p_ssAmt').val() || 0;
                jsonObj.houseLoanPrincipal = $('#p_houseloan').val() || 0; jsonObj.houseLoanPrincipal2 = $('#p_houseloan2').val() || 0;
                jsonObj.tuitionFeeChild1 = $('#p_childfees1').val() || 0;
                jsonObj.tuitionFeeChild2 = $('#p_childfees2').val() || 0;
                jsonObj.medicalPremiumSelf = $('#p_mediclaimpremiumforfamily').val() || 0;
                jsonObj.medicalPremiumParents = $('#p_mediclaimpremiumforparents').val() || 0;
                jsonObj.medicalPreventiveHealthCheckup = $('#p_mediclaimpremiumforhealth').val() || 0; jsonObj.educationLoanInterest = $('#p_eduloan').val() || 0;
                jsonObj.physicalDisability = $('#p_disablity').val() || 0; jsonObj.severeDisability = $('#p_severedisablity').val() || 0;
                jsonObj.nationalPensionScheme = $('#p_NPS').val() || 0; jsonObj.disableDependent = $('#p_disdependent').val() || 0;
                jsonObj.medicalExpenditure = $('#p_medicalexpenditure').val() || 0;
                jsonObj.interestOnLoan = $('#p_amountofinterest').val() || 0; jsonObj.interestPreConstruction = $('#p_amountofinterestasperit').val() || 0;
                jsonObj.otherInterest = $('#p_optionalinterest').val() || 0; jsonObj.otherIncomeAmount = $('#p_optionalotherincome').val() || 0;
            };
            //Add Details Table Records on actual flag wise
            var RentData = new Array(); var PPFData = new Array(); var FDData = new Array(); var PremiumData = new Array(); var NSCData = new Array(); var MutualFund = new Array(); var ULIPData = new Array(); var SSData = new Array(); var companyaccomodation = $('#hidCompanyaccoFlag').val();
            if (jsonObj.actualFlag === "true") {
                if (companyaccomodation === "false") {
                    $('#renttable tr').each(function (row, tr) {
                        if (row === 2) {
                            RentData[row] = {
                                "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "empUnqIdYear": ecode + $('#hidyearMonth').val(),
                                "april": $(tr).find('td:eq(1) input[type="text"]').val() || "0", "may": $(tr).find('td:eq(2) input[type="text"]').val() || "0", "june": $(tr).find('td:eq(3) input[type="text"]').val() || "0", "july": $(tr).find('td:eq(4) input[type="text"]').val() || "0",
                                "august": $(tr).find('td:eq(5) input[type="text"]').val() || "0", "september": $(tr).find('td:eq(6) input[type="text"]').val() || "0", "october": $(tr).find('td:eq(7) input[type="text"]').val() || "0", "november": $(tr).find('td:eq(8) input[type="text"]').val() || "0",
                                "december": $(tr).find('td:eq(9) input[type="text"]').val() || "0", "january": $(tr).find('td:eq(10) input[type="text"]').val() || "0", "february": $(tr).find('td:eq(11) input[type="text"]').val() || "0", "march": $(tr).find('td:eq(12) input[type="text"]').val() || "0"
                            }
                        };
                    }); RentData.shift();
                }
                $('#aliasTable4 tr').each(function (row, tr) { if (row > 1) { PPFData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "ppfAcNo": $(tr).find('td:eq(0)').text(), "ppfDepositeDate": $(tr).find('td:eq(1)').text(), "ppfAmt": $(tr).find('td:eq(3)').text() } }; }); PPFData.shift();
                $('#aliasTable5 tr').each(function (row, tr) { if (row > 1) { FDData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "bankAccountNo": $(tr).find('td:eq(0)').text(), "depositDate": $(tr).find('td:eq(1)').text(), "depositAmount": $(tr).find('td:eq(3)').text() } }; }); FDData.shift();
                $('#aliasTable tr').each(function (row, tr) { if (row > 1) { PremiumData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "policyNo": $(tr).find('td:eq(0)').text(), "policyDate": $(tr).find('td:eq(1)').text(), "sumInsured": $(tr).find('td:eq(2)').text(), "annualPremiumAmount": $(tr).find('td:eq(4)').text(), "premiumPaidDate": $(tr).find('td:eq(5)').text(), "premiumDueDate": $(tr).find('td:eq(6)').text() } }; }); PremiumData.shift();
                $('#aliasTable2 tr').each(function (row, tr) { if (row > 1) { NSCData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "nscNumber": $(tr).find('td:eq(0)').text(), "nscPurchaseDate": $(tr).find('td:eq(1)').text(), "nscAmount": $(tr).find('td:eq(3)').text(), "nscInterestAmount": $(tr).find('td:eq(4)').text() } }; }); NSCData.shift();
                $('#aliasTable1 tr').each(function (row, tr) { if (row > 1) { MutualFund[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "mutualFundName": $(tr).find('td:eq(0)').text(), "mutualFundDate": $(tr).find('td:eq(1)').text(), "mutualFundAmount": $(tr).find('td:eq(3)').text() } }; }); MutualFund.shift();
                $('#aliasTable6 tr').each(function (row, tr) { if (row > 1) { ULIPData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "ulipNo": $(tr).find('td:eq(0)').text(), "ulipDate": $(tr).find('td:eq(1)').text(), "ulipAmount": $(tr).find('td:eq(3)').text() } }; }); ULIPData.shift();
                $('#aliasTable7 tr').each(function (row, tr) { if (row > 1) { SSData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "sukanyaName": $(tr).find('td:eq(0)').text(), "sukanyaDate": $(tr).find('td:eq(1)').text(), "sukanyaAmount": $(tr).find('td:eq(3)').text() } }; }); SSData.shift();
            } else {
                if (companyaccomodation === "false") {
                    $('#renttable tr').each(function (row, tr) {
                        if (row === 1) {
                            RentData[row] = {
                                "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "empUnqIdYear": ecode + $('#hidyearMonth').val(),
                                "april": $(tr).find('td:eq(1) input[type="text"]').val() || "0", "may": $(tr).find('td:eq(2) input[type="text"]').val() || "0", "june": $(tr).find('td:eq(3) input[type="text"]').val() || "0", "july": $(tr).find('td:eq(4) input[type="text"]').val() || "0",
                                "august": $(tr).find('td:eq(5) input[type="text"]').val() || "0", "september": $(tr).find('td:eq(6) input[type="text"]').val() || "0", "october": $(tr).find('td:eq(7) input[type="text"]').val() || "0", "november": $(tr).find('td:eq(8) input[type="text"]').val() || "0",
                                "december": $(tr).find('td:eq(9) input[type="text"]').val() || "0", "january": $(tr).find('td:eq(10) input[type="text"]').val() || "0", "february": $(tr).find('td:eq(11) input[type="text"]').val() || "0", "march": $(tr).find('td:eq(12) input[type="text"]').val() || "0"
                            }
                        };
                    }); RentData.shift();
                }
                $('#aliasTable4 tr').each(function (row, tr) { if (row > 1) { PPFData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "ppfAcNo": $(tr).find('td:eq(0)').text(), "ppfDepositeDate": $(tr).find('td:eq(1)').text(), "ppfAmt": $(tr).find('td:eq(2)').text() } }; }); PPFData.shift();
                $('#aliasTable5 tr').each(function (row, tr) { if (row > 1) { FDData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "bankAccountNo": $(tr).find('td:eq(0)').text(), "depositDate": $(tr).find('td:eq(1)').text(), "depositAmount": $(tr).find('td:eq(2)').text() } }; }); FDData.shift();
                $('#aliasTable tr').each(function (row, tr) { if (row > 1) { PremiumData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "policyNo": $(tr).find('td:eq(0)').text(), "policyDate": $(tr).find('td:eq(1)').text(), "sumInsured": $(tr).find('td:eq(2)').text(), "annualPremiumAmount": $(tr).find('td:eq(3)').text(), "premiumPaidDate": $(tr).find('td:eq(5)').text(), "premiumDueDate": $(tr).find('td:eq(6)').text() } }; }); PremiumData.shift();
                $('#aliasTable2 tr').each(function (row, tr) { if (row > 1) { NSCData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "nscNumber": $(tr).find('td:eq(0)').text(), "nscPurchaseDate": $(tr).find('td:eq(1)').text(), "nscAmount": $(tr).find('td:eq(2)').text(), "nscInterestAmount": 0 } }; }); NSCData.shift();
                $('#aliasTable1 tr').each(function (row, tr) { if (row > 1) { MutualFund[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "mutualFundName": $(tr).find('td:eq(0)').text(), "mutualFundDate": $(tr).find('td:eq(1)').text(), "mutualFundAmount": $(tr).find('td:eq(2)').text() } }; }); MutualFund.shift();
                $('#aliasTable6 tr').each(function (row, tr) { if (row > 1) { ULIPData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "ulipNo": $(tr).find('td:eq(0)').text(), "ulipDate": $(tr).find('td:eq(1)').text(), "ulipAmount": $(tr).find('td:eq(2)').text() } }; }); ULIPData.shift();
                $('#aliasTable7 tr').each(function (row, tr) { if (row > 1) { SSData[row] = { "yearMonth": $('#hidyearMonth').val(), "empUnqId": ecode, "actualFlag": $('#hidactualFlag').val(), "sukanyaName": $(tr).find('td:eq(0)').text(), "sukanyaDate": $(tr).find('td:eq(1)').text(), "sukanyaAmount": $(tr).find('td:eq(2)').text() } }; }); SSData.shift();
            };
            if (RentData.length > 1) { RentData.shift(); }; if (PPFData.length > 1) { PPFData.shift(); }; if (FDData.length > 1) { FDData.shift(); }; if (PremiumData.length > 1) { PremiumData.shift(); }; if (NSCData.length > 1) { NSCData.shift(); }; if (MutualFund.length > 1) { MutualFund.shift(); }; if (ULIPData.length > 1) { ULIPData.shift(); }; if (SSData.length > 1) { SSData.shift(); };
            jsonObj.rentDetails = RentData; jsonObj.ppfDetails = PPFData; jsonObj.bankDeposits = FDData; jsonObj.insuranceDetails = PremiumData; jsonObj.nscDetails = NSCData; jsonObj.mutualFundDetails = MutualFund; jsonObj.ulipDetails = ULIPData; jsonObj.sukanyaDetails = SSData;
            if (TaxRegime === "N") {
                var n = new Array();
                jsonObj.totalRentPaid = "0", jsonObj.landLordName = "", jsonObj.landLordPan = "", jsonObj.prevCompSalary = "0", jsonObj.prevCompTds = "0",
                    jsonObj.child1Name = "", jsonObj.child2Name = "", jsonObj.others1Desc = "", jsonObj.others2Desc = "", jsonObj.medicalPremiumParentsAge = "0",
                    jsonObj.propertyAddress = "", jsonObj.propertyStatus = "x", jsonObj.loanAmount = "0", jsonObj.loanDate = "", jsonObj.purpose = "x",
                    jsonObj.constructionCompDate = "", jsonObj.possessionDate = "", jsonObj.ownership = "x", jsonObj.jointOwnerName = "", jsonObj.jointOwnerRelation = "",
                    jsonObj.jointOwnerShare = "0", jsonObj.rentalIncomePerMonth = "0", jsonObj.municipalTax = "0", jsonObj.otherIncomeDesc = "", jsonObj.totalPpfAmt = "0",
                    jsonObj.totalBankDepositAmount = "0", jsonObj.totalInsurancePremium = "0", jsonObj.totalNscAmount = "0", jsonObj.totalMutualFund = "0",
                    jsonObj.totalUlip = "0", jsonObj.totalSukanya = "0", jsonObj.houseLoanPrincipal = "0", jsonObj.tuitionFeeChild1 = "0", jsonObj.tuitionFeeChild2 = "0",
                    jsonObj.notifiedPensionScheme = "0", jsonObj.others1Amount = "0", jsonObj.others2Amount = "0", jsonObj.rajivGandhiEquity = "0",
                    jsonObj.medicalPremiumSelf = "0", jsonObj.medicalPremiumParents = "0", jsonObj.medicalPreventiveHealthCheckup = "0",
                    jsonObj.educationLoanInterest = "0", jsonObj.physicalDisability = "0", jsonObj.severeDisability = "0", jsonObj.nationalPensionScheme = "0",
                    jsonObj.disableDependent = "0", jsonObj.medicalExpenditure = "0", jsonObj.interestOnLoan = "0", jsonObj.interestPreConstruction = "0",
                    jsonObj.otherInterest = "0", jsonObj.otherIncomeAmount = "0",
                    jsonObj.rentDetails = [
                        {
                            "yearMonth": $('#hidyearMonth').val(), "empUnqId": $('#myEmpUnqId').val(), "actualFlag": $('#hidactualFlag').val(),
                            "empUnqIdYear": $('#myEmpUnqId').val() + $('#hidyearMonth').val(), "april": "0", "may": "0", "june": "0", "july": "0",
                            "august": "0", "september": "0", "october": "0", "november": "0", "december": "0", "january": "0", "february": "0", "march": "0"
                        }
                    ],
                    jsonObj.ppfDetails = n, jsonObj.bankDeposits = n, jsonObj.insuranceDetails = n, jsonObj.nscDetails = n, jsonObj.mutualFundDetails = n,
                    jsonObj.ulipDetails = n, jsonObj.sukanyaDetails = n
            };
            return jsonObj;
        };
        var tax = new XMLHttpRequest(); tax.open('POST', $scope._Conpath + 'TaxDeclaration/CreateTaxDeclaration', true); tax.setRequestHeader('Content-type', 'application/json');
        tax.onreadystatechange = function () {
            if (tax.readyState === 4 && tax.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Your Tax Declaration Details Saved Successfully.</strong></div>"; $('#MessageBox').show(); alert("Your Tax Declaration Details Saved Successfully."); $scope.ResetView();
            } else if (tax.status === 400 || tax.status === 403 || tax.status === 404 || tax.status === 408 || tax.status === 500) {
                var str = tax.responseText.replace("[", '').replace("]", '').toString(); var fields = str.split(','); var er = ""; for (var i = 0; i < fields.length; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + er + "</strong></div>"; $('#MessageBox').show();
            };
        }; tax.send(TableData);
    };      //Edit Details by Finance and Submit
    $scope.GetITReport = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var gac = new XMLHttpRequest(); gac.open('GET', $scope._Conpath + 'TaxDeclaration/GetTaxDeclarationConfig', true); gac.setRequestHeader('Accept', 'application/json');
        gac.onreadystatechange = function () {
            if (gac.readyState === 4) {
                var json = JSON.parse(gac.responseText); $scope.configdata = json; $scope.$digest();
                var itd = new XMLHttpRequest(); itd.open('GET', $scope._Conpath + 'TaxDeclaration/GetTaxDeclarations?yearMonth=' + $scope.configdata.yearMonth, true);
                itd.setRequestHeader('Accept', 'application/json');
                itd.onreadystatechange = function () {
                    if (itd.readyState === 4 && itd.status === 200) {
                        var json = JSON.parse(itd.responseText); $scope.itddata = json; var it = new Array; it = json; var myArray = [];
                        var dtStart = it[0].startDt.substring(0, it[0].startDt.indexOf("T"));
                        dtStart = new Date(dtStart); dtStart = "0" + dtStart.getDate() + '.' + '0' + (dtStart.getMonth() + 1) + '.' + dtStart.getFullYear();
                        var dtEnd = it[0].endDt.substring(0, it[0].endDt.indexOf("T"));
                        dtEnd = new Date(dtEnd); dtEnd = dtEnd.getDate() + '.' + (dtEnd.getMonth() + 1) + '.' + dtEnd.getFullYear();
                        for (var i = 0; i < it.length; i++) {
                            myArray.push([]);
                            myArray[i]["Actual"] = it[i].actualFlag; myArray[i]["TaxRegime"] = it[i].taxRegime; myArray[i]["SapID"] = it[i].empUnqId;
                            myArray[i]["Name"] = it[i].empName; myArray[i]["StartDate"] = dtStart; myArray[i]["EndDate"] = dtEnd;
                            //LIC
                            myArray[i]["LIC_Code"] = it[i].insCode; myArray[i]["LIC_Pro"] = it[i].insPro; myArray[i]["LIC_Act"] = it[i].insAct;
                            //Contribution to ULIP 
                            myArray[i]["ULIP_Code"] = it[i].ulipCode; myArray[i]["ULIP_Pro"] = it[i].ulipPro; myArray[i]["ULIP_Act"] = it[i].ulipAct;
                            //Subscription to approved mutual fund (Infrastructure)
                            myArray[i]["MutualFund_Code"] = it[i].mfCode; myArray[i]["MutualFund_Pro"] = it[i].mfPro; myArray[i]["MutualFund_Act"] = it[i].mfAct;
                            //Contribution to Public Provident Fund
                            myArray[i]["PPF_Code"] = it[i].ppfCode; myArray[i]["PPF_Pro"] = it[i].ppfPro; myArray[i]["PPF_Act"] = it[i].ppfAct;
                            //Subscr to notified Central Govmt Savings certificate (NSC VIII issue)
                            myArray[i]["NSC_Code"] = it[i].nscCode; myArray[i]["NSC_Pro"] = it[i].nscPro; myArray[i]["NSC_Act"] = it[i].nscAct;
                            //Repayment of Housing loan
                            myArray[i]["HousingLoan_Code"] = it[i].homeLoanCode; myArray[i]["HousingLoan_Pro"] = it[i].homeLoanPro; myArray[i]["HousingLoan_Act"] = it[i].homeLoanAct;
                            //Repayment of Housing loan 2
                            myArray[i]["HousingLoan_Code2"] = it[i].homeLoanCode2; myArray[i]["HousingLoan_Pro2"] = it[i].homeLoanPro2; myArray[i]["HousingLoan_Act2"] = it[i].homeLoanAct2;
                            //Subscription to notified mutual fund
                            myArray[i]["Notified_M_Fund_Code"] = it[i].notifiedMfCode; myArray[i]["Notified_M_Fund_Pro"] = it[i].notifiedMfPro; myArray[i]["Notified_M_Fund_Act"] = it[i].notifiedMfAct;
                            //Tuition fee - child 1
                            myArray[i]["TutionFee_Child1_Code"] = it[i].child1Code; myArray[i]["TutionFee_Child1_Pro"] = it[i].child1Pro; myArray[i]["TutionFee_Child1_Act"] = it[i].child1Act;
                            //Tuition fee - child 2
                            myArray[i]["TutionFee_Child2_Code"] = it[i].child2Code; myArray[i]["TutionFee_Child2_Pro"] = it[i].child2Pro; myArray[i]["TutionFee_Child2_Act"] = it[i].child2Act;
                            //Term Deposits under Section 80C
                            myArray[i]["TermDeposit_Code"] = it[i].termDepoCode; myArray[i]["TermDeposit_Pro"] = it[i].termDepoPro; myArray[i]["TermDeposit_Act"] = it[i].termDepoAct;
                            myArray[i]["b_1"] = "";
                            //Calculation of 80 c for finance Personal Use
                            myArray[i]["CodeNo"] = it[i].empUnqId; myArray[i]["EmpName"] = it[i].empName; myArray[i]["Total80C"] = it[i].total80C; myArray[i]["Provisional"] = 0;
                            myArray[i]["Total"] = 0; myArray[i]["Diff"] = 0; myArray[i]["b_2"] = "";
                            //80CCF& 80d 
                            myArray[i]["SapId_2"] = it[i].empUnqId; myArray[i]["LongTermMutualFund"] = it[i].longTermMf;
                            myArray[i]["RajivGandhiEquity"] = it[i].rajivGandhiEquity; myArray[i]["MedicalPremiumSelf"] = it[i].medicalPremiumSelf;
                            myArray[i]["MedicalPremiumParents"] = it[i].medicalPremiumParents;
                            myArray[i]["MedicalPreventiveHealthCheckup"] = it[i].medicalPreventiveHealthCheckup;
                            myArray[i]["EduLoanInterest"] = it[i].eduLoanInterest; myArray[i]["PhysicalDisability"] = it[i].physicalDisability;
                            myArray[i]["SevereDisability"] = it[i].severeDisability; myArray[i]["NPS"] = it[i].nps; 
                            myArray[i]["DisableDependent"] = it[i].disableDependent;
                            myArray[i]["MedicalExpenditure"] = it[i].medicalExpenditure;
                            myArray[i]["b_3"] = "";
                            //Int on House Loan 
                            myArray[i]["SapId_3"] = it[i].empUnqId; myArray[i]["StartDate_2"] = dtStart; myArray[i]["EndDate_2"] = dtEnd;
                            myArray[i]["InterestOnLoan"] = it[i].interestOnLoan; myArray[i]["InterestPreConstruction"] = it[i].interestPreConstruction;
                            myArray[i]["NationalRent"] = it[i].rentReceived; myArray[i]["Net"] = "";
                            var bname = it[i].bankName; if (bname === null) { myArray[i]["BankName"] = ""; } else { myArray[i]["BankName"] = it[i].bankName.replace(/(\r\n|\n|\r)/gm, ""); };
                            var bpan = it[i].bankPan; if (bpan === null) { myArray[i]["PANNO"] = ""; } else { myArray[i]["PANNO"] = it[i].bankPan; };
                            if (myArray[i]["PANNO"] === "") { myArray[i]["Others"] = ""; } else { myArray[i]["Others"] = "(c)"; }; myArray[i]["b_4"] = "";
                            //Int on House Loan 2
                            myArray[i]["SapId_4"] = it[i].empUnqId; myArray[i]["StartDate_3"] = dtStart; myArray[i]["EndDate_3"] = dtEnd;
                            myArray[i]["InterestOnLoan2"] = it[i].interestOnLoan2; myArray[i]["InterestPreConstruction2"] = it[i].interestPreConstruction2;
                            myArray[i]["NationalRent2"] = it[i].rentReceived2; myArray[i]["Net2"] = "";
                            var bname2 = it[i].bankName2; if (bname2 === null) { myArray[i]["BankName2"] = ""; } else { myArray[i]["BankName2"] = it[i].bankName2.replace(/(\r\n|\n|\r)/gm, ""); };
                            var bpan2 = it[i].bankPan2; if (bpan2 === null) { myArray[i]["PANNO2"] = ""; } else { myArray[i]["PANNO2"] = it[i].bankPan2; };
                            if (myArray[i]["PANNO2"] === "") { myArray[i]["Others2"] = ""; } else { myArray[i]["Others2"] = "(c)"; };
                            myArray[i]["b_5"] = "";
                            //HRA
                            myArray[i]["SapId_1"] = it[i].empUnqId; myArray[i]["StartDate_1"] = dtStart; myArray[i]["EndDate_1"] = dtEnd;
                            myArray[i]["Acco_Type"] = it[i].accomodationType; myArray[i]["CityCategory"] = "";
                            if ($scope.configdata.actualFlag === "true" || $scope.configdata.actualFlag === true) {
                                myArray[i]["RentPerMonth"] = it[i].rentPaidAprilAct; myArray[i]["RentPaid"] = it[i].rentPaidAct;
                            } else { myArray[i]["RentPerMonth"] = it[i].rentPaidAprilPro; myArray[i]["RentPaid"] = it[i].rentPaidPro; };
                            myArray[i]["HRA_Exempted"] = "X"; myArray[i]["LandLordName"] = it[i].landLordName; myArray[i]["LandLordPan"] = it[i].landLordPan;
                            myArray[i]["LockEntry"] = it[i].lockEntry;
                        };
                        $scope.itddata = myArray; $scope.itddata = $filter('orderBy')($scope.itddata, 'empUnqId'); $scope.ITDInfo = $scope.itddata; $scope.$digest();
                        $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                    };
                }; itd.send();
            };
        }; gac.send();
    }; //Get Income Tax Declaration Report Details
    //$scope.GetComparison = function () { var flg = new XMLHttpRequest(); flg.open('GET', $scope._Conpath + 'TaxDeclaration/GetTaxDeclarationConfig', true); flg.setRequestHeader('Accept', 'application/json'); flg.onreadystatechange = function () { if (flg.readyState === 4 && flg.status === 200) { var json = JSON.parse(flg.responseText); $scope.actflgdata = json; $scope.$digest(); $('#hidactualFlag').val($scope.actflgdata.actualFlag); $('#hidyearMonth').val($scope.actflgdata.yearMonth); var prov = new XMLHttpRequest(); prov.open('GET', $scope._Conpath + 'TaxDeclaration/GetTaxDeclaration?empUnqId=' + $('#myEmpUnqId').val() + '&yearMonth=' + $('#hidyearMonth').val() + '&actualFlag=' + $('#hidactualFlag').val(), true); prov.setRequestHeader('Accept', 'application/json'); prov.onreadystatechange = function () { if (prov.readyState === 4 && prov.status === 200) { var json1 = JSON.parse(prov.responseText); var tdata = new Array; tdata = json1; var myArray = []; myArray.push([]); for (var i = 0; i < tdata.length; i++) { if (i == 0) { myArray[0]["empUnqId"] = tdata[i].empUnqId; myArray[0]["p_totalRentPaid"] = tdata[i].totalRentPaid; myArray[0]["p_rentDetails"] = tdata[i].rentDetails; myArray[0]["p_landLordName"] = tdata[i].landLordName; myArray[0]["p_landLordPan"] = tdata[i].landLordPan; myArray[0]["p_totalPpfAmt"] = tdata[i].totalPpfAmt; myArray[0]["p_ppfDetails"] = tdata[i].ppfDetails; myArray[0]["p_totalBankDepositAmount"] = tdata[i].totalBankDepositAmount; myArray[0]["p_bankDeposits"] = tdata[i].bankDeposits; myArray[0]["p_totalInsurancePremium"] = tdata[i].totalInsurancePremium; myArray[0]["p_insuranceDetails"] = tdata[i].insuranceDetails; myArray[0]["p_totalNscAmount"] = tdata[i].totalNscAmount; myArray[0]["p_nscDetails"] = tdata[i].nscDetails; myArray[0]["p_totalMutualFund"] = tdata[i].totalMutualFund; myArray[0]["p_mutualFundDetails"] = tdata[i].mutualFundDetails; myArray[0]["p_totalUlip"] = tdata[i].totalUlip; myArray[0]["p_ulipDetails"] = tdata[i].ulipDetails; myArray[0]["p_totalSukanya"] = tdata[i].totalSukanya; myArray[0]["p_sukanyaDetails"] = tdata[i].sukanyaDetails; myArray[0]["p_houseLoanPrincipal"] = tdata[i].houseLoanPrincipal; myArray[0]["p_houseLoanPrincipal2"] = tdata[i].houseLoanPrincipal2; myArray[0]["p_child1Name"] = tdata[i].child1Name; myArray[0]["p_tuitionFeeChild1"] = tdata[i].tuitionFeeChild1; myArray[0]["p_child2Name"] = tdata[i].child2Name; myArray[0]["p_tuitionFeeChild2"] = tdata[i].tuitionFeeChild2; myArray[0]["p_others1Desc"] = tdata[i].others1Desc; myArray[0]["p_others1Amount"] = tdata[i].others1Amount; myArray[0]["p_others2Desc"] = tdata[i].others2Desc; myArray[0]["p_others2Amount"] = tdata[i].others2Amount; myArray[0]["p_medicalPremiumSelf"] = tdata[i].medicalPremiumSelf; myArray[0]["p_medicalPremiumParents"] = tdata[i].medicalPremiumParents; myArray[0]["p_medicalPreventiveHealthCheckup"] = tdata[i].medicalPreventiveHealthCheckup; myArray[0]["p_educationLoanInterest"] = tdata[i].educationLoanInterest; myArray[0]["p_severeDisability"] = tdata[i].severeDisability; myArray[0]["p_nationalPensionScheme"] = tdata[i].nationalPensionScheme; myArray[0]["p_interestOnLoan"] = tdata[i].interestOnLoan; } else if (i == 1) { myArray[0]["a_totalRentPaid"] = tdata[i].totalRentPaid; myArray[0]["a_rentDetails"] = tdata[i].rentDetails; myArray[0]["a_landLordName"] = tdata[i].landLordName; myArray[0]["a_landLordPan"] = tdata[i].landLordPan; myArray[0]["a_totalPpfAmt"] = tdata[i].totalPpfAmt; myArray[0]["a_ppfDetails"] = tdata[i].ppfDetails; myArray[0]["a_totalBankDepositAmount"] = tdata[i].totalBankDepositAmount; myArray[0]["a_bankDeposits"] = tdata[i].bankDeposits; myArray[0]["a_totalInsurancePremium"] = tdata[i].totalInsurancePremium; myArray[0]["a_insuranceDetails"] = tdata[i].insuranceDetails; myArray[0]["a_totalNscAmount"] = tdata[i].totalNscAmount; myArray[0]["a_nscDetails"] = tdata[i].nscDetails; myArray[0]["a_totalMutualFund"] = tdata[i].totalMutualFund; myArray[0]["a_mutualFundDetails"] = tdata[i].mutualFundDetails; myArray[0]["a_totalUlip"] = tdata[i].totalUlip; myArray[0]["a_ulipDetails"] = tdata[i].ulipDetails; myArray[0]["a_totalSukanya"] = tdata[i].totalSukanya; myArray[0]["a_sukanyaDetails"] = tdata[i].sukanyaDetails; myArray[0]["a_houseLoanPrincipal"] = tdata[i].houseLoanPrincipal; myArray[0]["a_houseLoanPrincipal2"] = tdata[i].houseLoanPrincipal2; myArray[0]["a_child1Name"] = tdata[i].child1Name; myArray[0]["a_tuitionFeeChild1"] = tdata[i].tuitionFeeChild1; myArray[0]["a_child2Name"] = tdata[i].child2Name; myArray[0]["a_tuitionFeeChild2"] = tdata[i].tuitionFeeChild2; myArray[0]["a_others1Desc"] = tdata[i].others1Desc; myArray[0]["a_others1Amount"] = tdata[i].others1Amount; myArray[0]["a_others2Desc"] = tdata[i].others2Desc; myArray[0]["a_others2Amount"] = tdata[i].others2Amount; myArray[0]["a_medicalPremiumSelf"] = tdata[i].medicalPremiumSelf; myArray[0]["a_medicalPremiumParents"] = tdata[i].medicalPremiumParents; myArray[0]["a_medicalPreventiveHealthCheckup"] = tdata[i].medicalPreventiveHealthCheckup; myArray[0]["a_educationLoanInterest"] = tdata[i].educationLoanInterest; myArray[0]["a_severeDisability"] = tdata[i].severeDisability; myArray[0]["a_nationalPensionScheme"] = tdata[i].nationalPensionScheme; myArray[0]["a_interestOnLoan"] = tdata[i].interestOnLoan; }; }; $scope.provdata = myArray; $scope.$digest(); }; }; prov.send(); }; }; flg.send(); };       //Preapare Format for Compare Data Provisional and actual
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
    $scope.exportAllData = function (t) { setTimeout(function () { $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv"); var d = new Date(); var FileName = t + d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(); $scope.JSONToCSVConvertor($scope.ITDInfo, FileName, true); $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); }, 100); };
    $scope.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) { var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData; var CSV = ''; CSV += ReportTitle + '\r\n\n'; if (ShowLabel) { var row = ""; for (var index in arrData[0]) { row += index + ','; }; row = row.slice(0, -1); CSV += row + '\r\n'; }; for (var i = 0; i < arrData.length; i++) { var row = ""; for (var index in arrData[i]) { row += '"' + arrData[i][index] + '",'; } row.slice(0, row.length - 1); CSV += row + '\r\n'; }; if (CSV === '') { alert("Invalid data"); return; }; var fileName = ReportTitle.replace(/ /g, "_"); var uri = 'data:text/csv;charset=utf-8,' + escape(CSV); var link = document.createElement("a"); link.href = uri; link.style = "visibility:hidden"; link.download = fileName + ".csv"; document.body.appendChild(link); link.click(); document.body.removeChild(link); };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });//Date Picker