angular.module('cssApp', ['angular.filter', 'checklist-model'])
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{#');
        $interpolateProvider.endSymbol('#}');
    })
    .controller('cssPageController', function ($http, $scope) {
        var cssScope = this;
        cssScope.sortType = 'label';
        cssScope.reverse = false;
        cssScope.listData = [];


        $scope.css = {
            compare: []
        };
        $scope.isReachLimit = false;
        $scope.compareParams = '';
        $scope.$watchCollection('css.compare', function (newValue, oldValue) {
            var compareItems = '';
            angular.forEach(newValue, function (value) {
                compareItems += value.url + ",";
            })
            $scope.compareParams = compareItems.replace(/,(?=[^,]*$)/, '');
            if (newValue.length >= 4) {

                $scope.isReachLimit = true;
            } else {
                $scope.isReachLimit = false;
            }
        })


        cssScope.sortBy = function (sortType) {
            cssScope.reverse = (cssScope.sortType === sortType) ? !cssScope.reverse : false;
            cssScope.sortType = sortType;
        };
        $scope.reset = function () {
            $scope.search.projType = '';
            $scope.searchName = '';
            $scope.search.written = '';
            $scope.search.templates = '';
            $scope.search.design = '';
            $scope.search.feature = '';
            $scope.css.compare = [];
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
        $scope.design = function (tag) {   
            var isFilterd = true;
            if ($scope.search.design == '') {
                return true;
            }
            for(var i=0;i<tag.design.length;i++) {
                if(tag.design[i] == $scope.search.design) {
                    isFilterd = true;
                    return isFilterd;
                    break;
                }
                else {
                    isFilterd = false;
                }
            }
            return isFilterd;
        };
        $scope.feature = function (tag) {   
            var feature = true;
            if ($scope.search.feature == '') {
                return true;
            }
            if(!tag.hasOwnProperty('feature')) {
                return false;
            }
            for(var i=0;i<tag.feature.length;i++) {
                if(tag.feature[i] == $scope.search.feature) {
                    feature = true;
                    return feature;
                    break;
                }
                else {
                    feature = false;
                }
            }
            return feature;
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
    })
    .controller('CompareController', function ($scope, $http, $location) {
            var cssScope = this;
            cssScope.listData = [];
            cssScope.compareData = [];

            var url = $location.absUrl();
            var params = url.substr(url.indexOf('?') + 1).split('&');
            var namesList = [];
            var names = params[0].split('=');
            if (names[0] == "names") {
                namesList = names[1].split(',');
            }

            function getDataJSON() {
                $http.get('assets/data.json?' + window.pageTime).then(successData, errorData);
            }

            function successData(result) {
                var compareList = [];
                angular.forEach(namesList, function (value, key) {
                    angular.forEach(result.data, function (rvalue, rkey) {
                        if (value == rvalue.url) {
                            compareList.push(rvalue);
                        }
                    })
                })

            cssScope.compareData = compareList;
            var _newComparedArray = [];
            cssScope.compareItems = [
                {id:'full_name',text:'Owner'},
                {id:'written',text:'Written'},
                {id:'has_templates',text:'Templates'},
                {id:'doc_rating',text:'Document rating'},
                {id:'published_at',text:'Latest release'},
                {id:'latest_size',text:'Release size'},
                {id:'download_count',text:'Total downloads'},
                {id:'updated_at',text:'Last commit'},
                {id:'created_at',text:'Created at'},
                {id:'size',text:'Branch size'},
                {id:'stargazers_count',text:'Star'},
                {id:'forks_count',text:'Forks'},
                {id:'open_issues_count',text:'Open issues'},
                {id:'type',text:'Project type'},
                {id:'prerelease',text:'production ready'},
                {id:'url',text:'More'}
            ];

}

        function errorData(error) {
            console.log(error);
        }
        getDataJSON();
})
;