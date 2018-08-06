function Redirect() {
    window.location.href = "/Login/Logout";
}

function DatabaseBackUp() {
    $('#MessageBox').hide();
    $('#loadingb').removeClass("deactivediv");
    $('#loadingb').addClass("activediv");
    $.ajax({
        url: "/Api/MasterData/GetDatabaseBackup",
        type: 'GET',
        success: function (response) {
            $('#loadingb').removeClass("activediv");
            $('#loadingb').addClass("deactivediv");
            alert('Database Backup Saved successfully..');
        },
        error: function (data) {
            $('#loadingb').removeClass("activediv");
            $('#loadingb').addClass("deactivediv");
        }
    });
}

function DatabaseBackUpNew() {
    $('#MessageBox').hide();
    $('#loadingbnew').removeClass("deactivediv");
    $('#loadingbnew').addClass("activediv");
    $.ajax({
        url: "/Api/MasterData/GetDatabaseBackup",
        type: 'GET',
        success: function (response) {
            $('#loadingbnew').removeClass("activediv");
            $('#loadingbnew').addClass("deactivediv");
            alert('Database Backup Saved successfully..');
        },
        error: function (data) {
            $('#loadingbnew').removeClass("activediv");
            $('#loadingbnew').addClass("deactivediv");
        }
    });
}