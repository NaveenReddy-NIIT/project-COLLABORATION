myApp.controller("UserController", function($scope,$location,$rootScope,$http,$cookieStore) {
	
$scope.userDetail={username:'', firstname:'', lastname:'', password:'', emailId:'', role:'', status:'', isOnline:''};
    
$rootScope.currentUser;

$scope.checkUser=function() {
	      
	      $http.post('http://localhost:8009/collaborationMiddleware/checkUser',$scope.userDetail)
	      .then(function(response) {
	    	  console.log("User checked successfully");
	    	  console.log(response.statusCode);
	    	  $rootScope.currentUser=response.data;
	    	  $cookieStore.put('userDetail',response.data);
	    	  console.log($rootScope.currentUser);
	    	  $location.path("/userHome");
	      },
	      function(errresponse) {
	    	  $scope.error="Username or password is wrong";
	    	  console.log("Error while checking user");
	    	  $location.path("/login");
	      });
        }
     
$scope.addUser= function() {
	  $scope.userDetail.role="ROLE_USER";
	  $scope.userDetail.status='A';
      $scope.userDetail.isOnline='Y';
      
      $http.post('http://localhost:8009/collaborationMiddleware/addUser',$scope.userDetail)
      .then(function(response) {
    	  console.log("User added succesfully");
    	  console.log(response.data);
    	  $location.path("/login");
      }, 
      function(errresponse) {
    	  $scope.error="Error in adding";
    	  console.log("Error while adding user");
    	  console.log(errresponse.data);
    	  $location.path("/register");
     });
   }

$scope.upload=function()  {
	 $http.post('http://localhost:8009/collaborationMiddleware/doUpload')
	 .then(function(response) {
		 console.log("Profile Picture Updated");
		 alert("Updated Profile Picture");
		 $location.path("/profile");
	 },
	 function(errresponse) {
		 console.log("Profile Picture not Updated");
	 });
}

$scope.logout=function()
{
console.log("Logged out");
delete $rootScope.currentUser;
$cookieStore.remove('userDetail');
alert("Logged out");
$location.path("/login");
}

});