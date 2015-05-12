(function () {
    angular.module('Doctor', [])
    .service('doctorService', ['$http', function ($http) {
        return {
            getData: function () {
                return $http.get('/api/Practicioner/')
                .success(function (data, status) {
                    return data;
                });
            },
            sendMail: function (mailId) {
                return $http.get('/api/SendMail/?recipient=' + mailId)
                .success(function (data, status) {
                    return data;
                });
            }
        };
    }])
    .controller('doctorController', ['$scope', 'doctorService', function ($scope, doctorService) {
        doctorService.getData().then(function (result) {
            $scope.Results = result.data;
        });

        $scope.SendMail = function () {
            doctorService.sendMail($scope.email);
            $scope.file = '';
            $scope.email = '';
            $scope.diag = '';
        };
    }]);
})();