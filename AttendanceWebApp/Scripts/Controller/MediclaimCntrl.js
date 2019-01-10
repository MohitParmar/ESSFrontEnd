var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('MediclaimCntroller', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val();
    $scope.currentPage = 1; $scope.itemsPerPage = 10; $scope.alluserlist = [];
    $scope._Conpath = ''; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { $scope._Conpath = _ConPath; } });
    $scope.ResetView = function () { window.location.reload(true); };
    jQuery.support.cors = true;
    // Age Calculate
    $scope._calculateAge = function () { var birthday = document.getElementById('dtDOB').value; var d = new Date(); var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); var date1 = new Date(birthday); var date2 = new Date(today); var yearCount = diff_years(date1, date2); $('#txtAge').val(yearCount); function diff_years(dt2, dt1) { var diff = (dt2.getTime() - dt1.getTime()) / 1000; diff /= (60 * 60 * 24); return Math.abs(Math.round(diff / 365.25)); }; }

    $scope.GetEmpInfo = function () { var emp = new XMLHttpRequest(); emp.open('GET', $scope._Conpath + 'Employee/GetEmployee?empunqid=' + $('#myEmpUnqId').val(), true); emp.setRequestHeader('Accept', 'application/json'); emp.onreadystatechange = function () { if (emp.readyState === 4) { var json = JSON.parse(emp.responseText); $scope.empdata = json; $scope.$digest(); } else if (emp.status !== 200) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Record Not Found.. </strong></div>"; $('#MessageBox').show(); } }; emp.send(); };

    $scope.GetMediclaimDetails = function () { };

    var c = 0;
    $scope.GenderValidate = function () { var gender = ""; var Relation = $('#txtRelation').val().toUpperCase(); if (Relation === "SE") { gender = "M"; $('#txtGender').val(gender); } else if (Relation === "SP") { gender = "F"; $('#txtGender').val(gender); } else if (Relation === "HU") { gender = "M"; $('#txtGender').val(gender); } else if (Relation === "SO") { gender = "M"; $('#txtGender').val(gender); } else if (Relation === "DA") { gender = "F"; $('#txtGender').val(gender); } else if (Relation === "FA") { gender = "M"; $('#txtGender').val(gender); } else if (Relation === "MO") { gender = "F"; $('#txtGender').val(gender); } };

    //Get Applied Comp Off Leave Requests & Validate
    $scope.MedicalimData = function (entity) {
        var chk = false; var chktabldta = false;
        if ((typeof (entity) === "undefined") || (typeof (entity.Name) === "undefined") || (typeof (entity.DOB) === "undefined")) { alert("Please Fill All Required Details .. "); return false; };
        var Name = entity.Name.toUpperCase(); var Relation = $('#txtRelation').val().toUpperCase(); var rel = txtRelation.options[txtRelation.selectedIndex].text; var Gender = $('#txtGender').val().toUpperCase(); var DOB = entity.DOB; var date1 = new Date(DOB); var Age = $('#txtAge').val(); var Status = $('#txtStatus').val().toUpperCase(); var Remarks = $('#txtRemarks').val().toUpperCase();
        ///Get Grid Data
        var d = new Date(); var year = d.getFullYear().toString(); var month = d.getMonth() + 1; var yearmonth = year + (month.toString());
        var TableData = storeTblValues()
        TableData = JSON.stringify(TableData);
        //Get DAta From the Leae Application Form & store into Array
        function storeTblValues() {
            var count = 0; c = c + 1; count++;
            $('.tempRow').remove(); var row = $("<tr>" + "<td><input type='hidden' name='AliasLastNames' value='" + Name + "'>" + Name + "</td>" + "<td><input type='hidden' name='AliasLastNames' value='" + rel + "'>" + rel + "</td>" + "<td><input type='hidden' name='AliasLastNames' value='" + Gender + "'>" + Gender + "</td>" + "<td><input type='hidden' name='AliasLastNames' value='" + DOB + "'>" + DOB + "</td>" + "<td><input type='hidden' name='AliasLastNames' value='" + Age + "'>" + Age + "</td>" + "<td><input type='hidden' name='AliasLastNames' value='" + Status + "'>" + Status + "</td>" + "<td><input type='hidden' name='AliasLastNames' value='" + Remarks + "'>" + Remarks + "</td>" + "</tr>"); $("#aliasTable").append(row);
            var TableData = new Array();
            $('#aliasTable tr').each(function (row, tr) { TableData[row] = { "yearMonth": yearmonth, "empUnqId": $('#myEmpUnqId').val(), "name": $(tr).find('td:eq(0)').text(), "relation": Relation, "gender": $(tr).find('td:eq(2)').text(), "dob": $(tr).find('td:eq(3)').text(), "age": $(tr).find('td:eq(4)').text(), "status": $(tr).find('td:eq(5)').text(), "remarks": $(tr).find('td:eq(6)').text() } });
            TableData.shift();
            return TableData;
        };
        var xhr1 = new XMLHttpRequest(); xhr1.open('POST', $scope._Conpath + '', true); xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4 && xhr1.status === 200) {
                var json = JSON.parse(xhr1.responseText);
                //$scope.Vdata = json;var newarr = [];newarr = $scope.Vdata;var dtlarrleg = newarr.length;var table = document.getElementById('aliasTable');var rowCount = table.rows.length;table.deleteRow(rowCount - 1);dtlarrleg = dtlarrleg - 1;var fdate = new Date(newarr[dtlarrleg]["dob"]);fdate = fdate.getFullYear() + "/" + (fdate.getMonth() + 1) + "/" + fdate.getDate();
                var row = $("<tr>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + + "'>" + + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + + "'>" + + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + + "'>" + + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + + "'>" + + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + + "'>" + + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + + "'>" + + "</td>" +
                    "<td style='text-align:center;'><input type='hidden' name='AliasLastNames' value='" + + "'>" + + "</td>" +
                    "</tr>");
                $("#aliasTable").append(row);
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Successfully Added</strong></div>"; $('#MessageBox').show();
                document.getElementById("txtName").value = ""; $("#txtRelation option:first").attr("selected", true); document.getElementById("txtGender").value = ""; document.getElementById("dtDOB").value = ""; document.getElementById("txtAge").value = ""; $("#txtStatus option:first").attr("selected", true); document.getElementById("txtRemarks").value = "";
            }
            else if (xhr1.status === 400 || xhr1.status === 403 || xhr1.status === 404 || xhr1.status === 408 || xhr1.status === 500) {
                if (chk === false) { var tables = document.getElementById('aliasTable'); var rowCounts = tables.rows.length; tables.deleteRow(rowCounts - 1); chk = true; c = c - 1; };
                var str = xhr1.responseText.replace("[", '').replace("]", '').toString(); var fields = str.split(','); var er = ""; for (var i = 0; i < fields.length ; i++) { er = er + fields[i] + "<br/>"; };
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>" + er + "</strong></div>"; $('#MessageBox').show();
                document.getElementById("txtName").value = ""; $("#txtRelation option:first").attr("selected", true); document.getElementById("txtGender").value = ""; document.getElementById("dtDOB").value = ""; document.getElementById("txtAge").value = ""; $("#txtStatus option:first").attr("selected", true); document.getElementById("txtRemarks").value = "";
            }
        }
        xhr1.send(TableData);
    };

    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
});

//Date Picker
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, attrs, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });