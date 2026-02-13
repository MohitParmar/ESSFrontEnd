/*/*var app = angular.module("myApp", ["angularUtils.directives.dirPagination"]);*/
var app = angular.module('myApp', ['ui.calendar', 'ui.bootstrap', 'ui.bootstrap.datetimepicker']);
app.controller('EventController', function ($scope, $log, uiCalendarConfig, $timeout) {
    $scope._Conpath = ""; var url_string = window.location.href; url = new URL(url_string); urlhost = url.hostname; urlprotocol = url.protocol; $(document).ready(function () { "undefined" != typeof _ConPath && (urlhost === _URLHostName ? $scope._Conpath = _ConPath : $scope._Conpath = urlprotocol + "//" + urlhost + "/api/") });
    //Get all vehicel req in date range
    $scope.allData;
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
                    if (1 == parseInt(slot)) {
                        arr[i].bookingSlot = "Morning";
                    };
                    if (2 == parseInt(slot)) {
                        arr[i].bookingSlot = "Evening";
                    };
                    if (3 == parseInt(slot)) {
                        arr[i].bookingSlot = "Night";
                    };
                };
                $scope.allData = arr;
                $scope.$digest();
            };
        };
        all.send();
    };
    $scope.events = [{
        "id": "51c54235fb4c960b37000014",
        "title": "Sample Event",
        "start": "2016-01-26T08:00:00+08:00",
        "end": "2016-01-26T10:00:00+08:00",
        "url": "http://google.com/",
        "allDay": false
    }];
    $scope.renderCalender = function (calendar) {
        
        console.log($scope.events);
        uiCalendarConfig.calendars.myCalendar.fullCalendar('removeEventSource', $scope.events);
    };
    $scope.uiCalendarConfig = uiCalendarConfig;

    $scope.eventSources = [$scope.events];
    $scope.calendarConfig = {
        selectable: true,
        selectHelper: true,
        editable: true
    };
    $scope.eventRender = function (event, element, view) {
        element.attr({
            'tooltip': event.title,
            'tooltip-append-to-body': true
        });
        $compile(element)($scope);
    };
    //$scope.addEvent = function () {
    //    $scope.events.push({
    //        title: $scope.event.Title,
    //        start: $scope.event.startDate,
    //        end: $scope.event.endDate
    //    });
    //    console.log($scope.pendingRequests);
    //};
    $scope.showIt = true;
    $scope.showCal = function () {
        $scope.showIt = !$scope.showIt;
        $scope.showIt && $timeout($scope.renderCalender);
    };
});