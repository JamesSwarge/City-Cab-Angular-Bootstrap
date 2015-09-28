'use strict';

/**
 * @ngdoc function
 * @name jschallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jschallengeApp
 */
jschallengeApp

.controller('MainCtrl', function($scope,$rootScope, $http) {

  // Query for a booking in 1 day from now, for 2 hours.
  var start = Date.now() + 24 * 3600 * 1000;
  var end = start + 2 * 3600 * 1000;
  var url = 'http://jschallenge.smove.sg/provider/1/availability?book_start=' + start + '&book_end=' + end;

  $http.get(url).success(function(result) {
    console.log('Result from the API call:', result);
    $rootScope.taxiData = result;
  }).error(function(err) {
    // Hum, this is odd ... contact us...
    console.error(err);
  });

  $scope.bookRideModal = {};
  $scope.checked = false;
  $scope.nearByTaxiFunc = function(taxi){

    //Booking now
    var now = new Date();
    
    $scope.bookRideModal.bookingConfirmDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
    $scope.bookRideModal.bookingConfirmStartDestination = taxi.parking_name;
    $scope.bookRideModal.bookingConfirmEndDestination = '';
    $scope.bookRideModal.bookingConfirmTelephone = '';
    $('#myModal').modal('show');
  }

  $scope.bookRideFunc  = function (bookRide) {
    
    //Setting Content to Modal
    $scope.bookRideModal.bookingConfirmDateTime = bookRide.bookingDateTime;
    $scope.bookRideModal.bookingConfirmStartDestination = bookRide.startDestination;
    $scope.bookRideModal.bookingConfirmEndDestination = bookRide.endDestination;    
    $scope.bookRideModal.bookingConfirmTelephone = bookRide.telephone;
    $('#myModal').modal('show');
  }

  $scope.confirmingCab = function (bookRideModal) {

    // bookRideModal : could be used to send data to server.
    var el = document.getElementById('loading'),
    bookingConfirmed = document.getElementById('bookingConfirmed');
    el.style.display = 'block';

    setTimeout(function(){
      el.style.display = 'none';
      //$('#myModal').modal('hide');
      bookingConfirmed.style.display = 'block';
      $scope.checked = true;
    }, 2000);
  }
// 1st form - bookingDateTime  startDestination  endDestination telephone
//confirm popup - bookingConfirmDateTime  bookingConfirmStartDestination  bookingConfirmEndDestination  bookingConfirmTelephone

});