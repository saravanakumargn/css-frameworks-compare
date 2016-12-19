angular.module('cssApp', ['angular.filter'])
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{#');
        $interpolateProvider.endSymbol('#}');
    })
    .controller('cssPageController', function ($http, $scope) {
        var cssScope = this;
        cssScope.sortType = 'label';
        cssScope.reverse = false;
        cssScope.listData = [];

        cssScope.sortBy = function (sortType) {
            cssScope.reverse = (cssScope.sortType === sortType) ? !cssScope.reverse : false;
            cssScope.sortType = sortType;
        };
        $scope.reset = function () {
            $scope.search.projType = '';
            $scope.searchName = '';
            $scope.search.written = '';
        };
        $scope.search = {
            projType: '',
            written: ''
        };
        $scope.reset();
        $scope.written = function (tag) {
            if ($scope.search.written == '') {
                return true;
            }
            return tag.written[$scope.search.written];
        };

        function getDataJSON() {
            $http.get('assets/data.json?' + window.pageTime).then(successData, errorData);
        }

        function successData(result) {
            cssScope.listData = result.data;
        }

        function errorData(error) {
            console.log(error);
        }
        getDataJSON();
    });