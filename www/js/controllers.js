angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('GendersController', function($scope,$ionicPopup,$state,$timeout,$location,$stateParams,GendersFactory){

  $scope.id = $stateParams.id;

  /**
   * Funcion Listar
   * @return {[type]} [description]
   */
  $scope.list = function(){

    GendersFactory.list()
      .then(function(res){
        $scope.error = false;
        $scope.ready = false;
        $scope.genders = res.data;
        $scope.ready = true;
      })
      .catch(function(err){
        
        $scope.error = true;
        $scope.ready = true;
        $scope.message = "Status "+err.status+" - "+err.data;
      })
      .finally(function(){

        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    /**
     * Funcion Destroy
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
  $scope.destroy = function(id){


    var confirmPopup = $ionicPopup.confirm({
      title: 'Eliminar Genero Musical',
      template: '¿Desea usted eliminar este registro?'
    });
    confirmPopup.then(function(res){
      if (res) {

        GendersFactory.destroy(id)
          .then(function(res){

            var alertPopup = $ionicPopup.alert({
              title: 'Registro Eliminado',
              template: res.data
            });
            alertPopup.then(function(res){

              $state.go($state.current, {}, {reload: true});
            });
          })
          .catch(function(err){

            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: 'No se pudo eliminar el registro. Error: '+err.status+' - '+err.data
            });
            alertPopup.then(function(res){
              console.error('Error', err.status, err.data);
            });
          });
      }
    });
  };

/**
 * Funcion Crear
 * @param  {[type]} gender [description]
 * @return {[type]}        [description]
 */
  $scope.create = function(gender){

    $scope.noReady = true;
    $scope.error = false;

    GendersFactory.create(gender)
      .then(function(res){

        $scope.noReady = false;
        $scope.success = true;
        $timeout(function(){
          $location.path('/tab/genders');
        }, 1500);
      })
      .catch(function(err){

        $scope.noReady = false;
        $scope.error = true;
        $scope.status = "Error: "+err.status;
        $scope.message = err.data;
      });
  };

/**
 * Funcion Actualizar
 * @param  {[type]} gender [description]
 * @return {[type]}        [description]
 */
  $scope.update = function(gender){

    $scope.noReady = true;
    $scope.error = false;

    GendersFactory.update(gender)
      .then(function(res){

        $scope.noReady = false;
        $scope.success = true;
        $timeout(function(){
          $location.path('/tab/genders');
        }, 1500);
      })
      .catch(function(err){

        $scope.noReady = false;
        $scope.error = true;
        $scope.status = "Error: "+err.status;
        $scope.message = err.data;
      });
  };

  $scope.show = function(id){

    $scope.noReady = true;
    $scope.error = false;

    GendersFactory.show(id)
      .then(function(res){
        $scope.noReady = false;
        $scope.gender = res.data;
      })
      .catch(function(err){

        console.error('Error', err.status, err.data);
      });
  };

})

; // Cierra el codigo