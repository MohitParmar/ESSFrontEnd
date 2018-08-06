// declare a main-angular module and submodule
var myApp = angular.module('myApp',
    [
    "ngTable",
    "myApp.Controllers",
    "myApp.Services"
    ]);
//Sub modules
angular.module("myApp.Controllers", []);
angular.module("myApp.Services", []);

//Initialize variable when dom is ready
angular.module("myApp").run([
    "$rootScope",
    function ($rootScope) {

        $rootScope.$safeApply = function ($scope, fn) {
            fn = fn || function () { };
            if ($scope.$$phase) {
                fn();
            }
            else {
                $scope.$apply(fn);
            }
        };

        $rootScope.IsAjaxLoading = true;
        $rootScope.isFormVisible = false;

        $rootScope.keydown = function ($event) {
            var a = $event.keyCode;
            if (a == 27) {
                if ($rootScope.isFormVisible == true) {
                    $rootScope.isFormVisible = false;
                }
                $rootScope.$emit('onEscape');
            }
        }

        $rootScope.redirectToLogin = function () {
            window.location.href = "/login";
        };

        $rootScope.range = function (n) {
            return new Array(n);
        };
    }
]);