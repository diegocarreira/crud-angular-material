var app = angular.module('app', ['ngRoute','ngMaterial', 'firebase']);

app.config(function($mdThemingProvider, $mdIconProvider, $routeProvider, $locationProvider){

	$routeProvider
    .when('/cadastrar', {
        controller: "CadastraController",
        templateUrl: "partials/cursos/cadastrar.html",
    })
    .when('/cursos', {
        controller: "CursosController",
        templateUrl: "partials/cursos/listar.html",
    })
    .otherwise({
        redirectTo: '/cursos'
    });


	$mdIconProvider
	.defaultIconSet("./assets/svg/menu.svg", 24)
	.icon("menu"       , "./assets/svg/menu.svg"        , 24);

	$mdThemingProvider.theme('default')
	.primaryPalette('green')
	.accentPalette('blue');

});


app.controller('AppController', function($scope, $mdSidenav,$location){

	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	$scope.navigateTo = function(url){
  		$location.path(url);
	}

});

app.controller('CadastraController', function($scope, $mdSidenav, $location, $firebaseArray){

	$scope.curso = {};
	$scope.curso.universidade = "MIT University";

	$scope.save = function(univ){
		console.log(univ);
	};

	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	$scope.navigateTo = function(url){
  		$location.path(url);
	}


	var fire = new Firebase("https://{{link_da_sua_conta_no_firebase}}.firebaseio.com/cursos");

	$scope.cursos = $firebaseArray(fire);

	$scope.addCurso = function() {
		$scope.cursos.$add({
			universidade: $scope.curso.universidade,
			nome: $scope.curso.nome,
			duracao: $scope.curso.duracao
		}).then(function(x) {
		    $location.path('/cursos');
		  }).catch(function(error) {
		    console.log("Alert:", error);
		  });
	};


});

app.controller('CursosController', function($scope, $mdSidenav, $location, $firebaseArray){

	var fire = new Firebase("https://{{link_da_sua_conta_no_firebase}}.firebaseio.com/cursos");

	$scope.cursos = $firebaseArray(fire);

	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	$scope.navigateTo = function(url){
  		$location.path(url);
	}

});
