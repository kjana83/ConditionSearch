(function () {
    angular.module('Condition', [])
    .service('conditionService', ['$http', function ($http) {
        return {
            getData: function (keyword) {
                return $http.get('/api/Search/' + keyword)
                .success(function (data, status) {
                    return data;
                });
            }
        };
    }])
    .controller('conditionController', ['$scope', 'conditionService', function ($scope, conditionService) {
        $scope.Search = function () {
            conditionService.getData($scope.condition).then(function(result){
                $scope.Results = result.data;
            });
        };
        
    }])
})();