var app = angular.module('Desafio',['ngBrowser','ngCordova'])
app.controller('Contra-IA',['$scope','appBrowser',
function($scope,appBrowser){
$scope.verificar_plataforma = function(){
    var theads  = []
    if(appBrowser.getBrowserInfo().platform == "Android"){
     
    }
    else{
    
    }
};
$scope.verificar_plataforma();
}]);
