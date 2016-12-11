angular.module('cssApp', [])
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{#');
        $interpolateProvider.endSymbol('#}');
    })
    .controller('cssPageController', function ($http) {
        var cssScope = this;
        cssScope.page = "test";
        var pageUrl = $(location).attr('href');
        var a = pageUrl.split('/');
        var segment = a[a.length - 2];
        var latestUrl = "",
            repUrl = "";
        var pageData;
        cssScope.repoData = null;
        cssScope.latestData = null;

        function getDataJSON() {
            $http.get('../assets/data.json').then(successData, errorData);
        }

        function successData(result) {
            angular.forEach(result.data, function (value, key) {
                if (segment == key) {
                    latestUrl = "https://api.github.com/repos/";
                    repUrl = "https://api.github.com/repos/";

                    latestUrl += value + "/releases/latest";
                    repUrl += value;
                    getPageData();
                }
            });
        }

        function errorData(error) {
            console.log(error);
        }

        function getPageData() {
            $http.get(latestUrl).then(successLatest, errorLatest);
            $http.get(repUrl).then(successRep, errorRep);
        }

        function successLatest(result) {
            cssScope.latestData = result.data;
        }

        function errorLatest(error) {

        }

        function successRep(result) {
            cssScope.repoData = result.data;
            //            console.log($scope.repoData);
        }

        function errorRep(error) {

        }


        getDataJSON();


    });