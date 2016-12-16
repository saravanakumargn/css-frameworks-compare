angular.module('cssApp', [])
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{#');
        $interpolateProvider.endSymbol('#}');
    })
.filter('bytes', function() {
	return function(bytes, precision) {
		if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
		if (typeof precision === 'undefined') precision = 1;
		var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
			number = Math.floor(Math.log(bytes) / Math.log(1024));
		return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
	}
})
    .controller('cssPageController', function ($http) {
        var cssScope = this;
        cssScope.sortType = 'label';
        cssScope.reverse = false;
        cssScope.listData = [];


        cssScope.sortBy = function (sortType) {
//            console.log('sortBy');
            cssScope.reverse = (cssScope.sortType === sortType) ? !cssScope.reverse : false;
            cssScope.sortType = sortType;
        };


        function getDataJSON() {
            $http.get('assets/data.json').then(successData, errorData);
        }

        function successData(result) {
            console.log(result.data);
            cssScope.listData = result.data;
        }

        function errorData(error) {
            console.log(error);
        }
        getDataJSON();
    });