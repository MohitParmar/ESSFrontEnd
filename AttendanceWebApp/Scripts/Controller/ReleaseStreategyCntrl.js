﻿angular.module('myApp.Controllers').controller("ReleaseStreategyCntrloller", ['$scope', '$http', function ($scope, $http) {

    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.alluserlist = [];
    $scope._Conpath = '';
    $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });

    $scope.ResetView = function () { window.location.reload(true); }//Releoad From

    jQuery.support.cors = true;

    //Get Employee details entered by user
    $scope.GetEmpInfo = function () {

        $('#tbl_empdtl').show();

        var e_Code = $('#eCode').val();
        if (e_Code === '') {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Employee Code First.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }

        var emp = new XMLHttpRequest();
        emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + e_Code, true);
        emp.setRequestHeader('Accept', 'application/json');
        emp.onreadystatechange = function () {
            if (emp.readyState === 4) {
                var json1 = JSON.parse(emp.responseText);
                $scope.empdata = json1;

                //Get Release Strategy
                var rel = new XMLHttpRequest();
                rel.open('GET', $scope._Conpath + 'ReleaseStrategy/GetReleaseStrategy?releaseGroup=LA&empUnqId=' + e_Code, true);
                rel.setRequestHeader('Accept', 'application/json');
                rel.onreadystatechange = function () {
                    if (rel.readyState === 4) {
                        var jsonvar1 = JSON.parse(rel.responseText);
                        $scope.rlsdata = jsonvar1;
                        $scope.$digest();
                    }
                };
                rel.send();
                $scope.$digest();
            }
            else if (emp.status !== 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>";
                $('#MessageBox').show();
            }
        };
        emp.send();
    };

    //Popup Model
    $scope.PopulateData = function () { $('#ConformModel').modal('show'); };

    //Get Employee details entered by user
    $scope.GetReleaserInfo = function () {

        $('#tbl_rlsdtl').show();

        var rls_Code = $('#Rel_Empid').val();
        if (rls_Code === '') {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Releaser Employee Code.. </strong></div>";
            $('#MessageBox').show();
            return false;
        }

        var rls = new XMLHttpRequest();
        rls.open('GET', $scope._Conpath + 'ChangeRelease/GetReleaseAuth?empunqid=' + rls_Code, true);
        rls.setRequestHeader('Accept', 'application/json');
        rls.onreadystatechange = function () {
            if (rls.readyState === 4) {
                var json2 = JSON.parse(rls.responseText);
                $scope.rdata = json2;
                $scope.$digest();
            }
            else if (rls.status !== 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>";
                $('#MessageBox').show();
            }
        };
        rls.send();
    };

    //Add New Releaser
    $scope.AddReleaser = function (data) {

        var tables = document.getElementById('aliasTable');
        var rowCounts = tables.rows.length;
        if ($scope.rdata.length > 0) {

            var rls = $scope.rdata;
            var rlscode = data;
            var rls_Code = $('#Rel_Empid').val();

            for (var i = 0; i <= rls.length; i++) {

                var r_code = rls[i]["releaseCode"];
                var r_empid = rls[i]["empUnqId"];
                if (r_code === rlscode && r_empid === rls_Code) {
                    var row = $("<tr>" +
                        "<td style='text-align:center;'><input type='hidden' name='releaseStrategy' value='" + $('#eCode').val() + "'>" + $('#eCode').val() + "</td>" +
                        "<td style='text-align:center;'><input type='hidden' name='releaseStrategyLevel' value='" + rowCounts + "'>" + rowCounts + "</td>" +
                        "<td style='text-align:center;'><input type='hidden' name='releaseCode' value='" + $scope.rdata[i]["releaseCode"] + "'>" + $scope.rdata[i]["releaseCode"] + "</td>" +
                        "<td style='text-align:center;'><input type='hidden' name='empName' value='" + $scope.rdata[i]["empName"] + "'>" + $scope.rdata[i]["empName"] + "</td>" +
                        "</tr>");

                    $("#aliasTable").append(row);
                    jQuery('#btnClose').click();
                    document.getElementById("Rel_Empid").value = "";
                    $("#tbl_rlsdtl").find("tr:not(:first)").remove();
                    return;
                }
            }
        }
    };

    //Remove one row from the Last
    $scope.RemoveReleaser = function () {
        var index = $scope.rlsdata.releaseStrategyLevels.indexOf($scope.rlsdata.releaseStrategyLevels.releaseStrategyLevel);
        $scope.rlsdata.releaseStrategyLevels.splice(index, 1);
    };

    //Create / Update Release Strategy
    $scope.CreateReleaseStrategy = function () {

        var tables = document.getElementById('aliasTable');
        var rowCounts = tables.rows.length;

        if (rowCounts <= 1) {
            document.getElementById("MessageBox").innerHTML = "<div class='alert alert-info alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Select At least One Releaser..</strong></div>";
            $('#MessageBox').show();
            return false;
        }

        var jsonObj = {};
        var TableData = storeTblValues()
        TableData = JSON.stringify(TableData);

        function storeTblValues() {

            var TableData = new Array();

            $('#aliasTable tr').each(function (row, tr) {
                TableData[row] = {
                    "releaseGroupCode": "LA"
                    , "releaseStrategy": $(tr).find('td:eq(0)').text()
                    , "releaseStrategyLevel": $(tr).find('td:eq(1)').text()
                    , "releaseCode": $(tr).find('td:eq(2)').text()
                    , "isFinalRelease": "false"
                }
            });
            TableData.shift();// first row will be empty - so remove

            jsonObj.releaseGroupCode = 'LA';
            jsonObj.releaseStrategy = $scope.empdata[0]['empUnqId'];
            jsonObj.releaseStrategyName = $scope.empdata[0]['empName'];
            jsonObj.releaseStrategyLevels = TableData;
            return jsonObj;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', $scope._Conpath + 'ChangeRelease/ChangeReleaseStrategy', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Release Strategy Saved..</strong></div>";
                $('#MessageBox').show();
                $("#aliasTable").find("tr:not(:first)").remove();
                $("#tbl_rlsdtl").find("tr:not(:first)").remove();
                document.getElementById("eCode").value = "";
                document.getElementById("Rel_Empid").value = "";
            }
            else {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Release Strategy Not Saved..</strong></div>";
                $('#MessageBox').show();
                document.getElementById("eCode").value = "";
                document.getElementById("Rel_Empid").value = "";
            }
        };
        xhr.send(TableData);
    };
}]);