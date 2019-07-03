myApp.controller("FriendController",function($scope,$location,$rootScope,$http,$cookieStore) {
	
	$scope.friend={friendId:0, username:'', userFirstName:'', userLastName:'', friendusername:'', friendFirstName:'', friendLastName:'', status:''};
    $scope.showFriends;
    $scope.friendRequests;
    $scope.suggestedFriends;
	
    function showFriends() {
    	 $http.get('http://localhost:8009/collaborationMiddleware/showFriendList/'+$rootScope.currentUser.username)
    	 .then(function(response) {
    		 console.log("Showing all Friends");
    		 $scope.showFriends=response.data;
    	 },
    	 function(errresponse) {
    		 console.log("Error in showing Friends");
    		 $scope.showFriends=errresponse.data;
    	 }); 			 
    }
    
    function friendRequests() {
    	 $http.get('http://localhost:8009/collaborationMiddleware/showPendingFriendRequest/'+$rootScope.currentUser.username)
    	 .then(function(response) {
    		 console.log("Showing Friend Requests");
    		 $scope.friendRequests=response.data;
    	 },
    	 function(errresponse) {
    		 console.log("Error in showing Friend Requests");
    		 $scope.friendRequests=errresponse.data;
    	 }); 			 
    }
    
    function suggestedFriends() {
    	 $http.get('http://localhost:8009/collaborationMiddleware/showSuggestedFriend/'+$rootScope.currentUser.username)
    	 .then(function(response) {
    		 console.log("Showing Suggested Friends");
    		 $scope.suggestedFriends=response.data;
    	 },
    	 function(errresponse) {
    		 console.log("Error in showing Suggested Friends");
    		 $scope.suggestedFriends=errresponse.data;
    	 }); 		
    }
    
    $scope.acceptRequest=function(friendId) {
      	 $http.get('http://localhost:8009/collaborationMiddleware/acceptFriendRequest/'+friendId)
      	 .then(function(response) {
      		 console.log("Friend request accepted");
      		 friendRequests();
      		 $location.path("/friendRequests");
      	 },
      	 function(errresponse) {
      		 console.log("Error in accepting Friend");
      	 }); 		
      }
    
    $scope.deleteRequest=function(friendId) {
   	 $http.get('http://localhost:8009/collaborationMiddleware/deleteFriendRequest/'+friendId)
   	 .then(function(response) {
   		 console.log("Friend Request deleted");
   		 friendRequests();
   		 $location.path("/friendRequests");
   	 },
   	 function(errresponse) {
   		 console.log("Error in deleting Friend Request");
   	 }); 		
   }
   
    $scope.deleteFriend=function(friendId) {
    	 $http.get('http://localhost:8009/collaborationMiddleware/deleteFriendRequest/'+friendId)
    	 .then(function(response) {
    		 console.log("Friend deleted");
    		 showFriends();
    		 $location.path("/showFriends");
    	 },
    	 function(errresponse) {
    		 console.log("Error in deleting Friend");
    	 }); 		
    }
    
    $scope.sendRequest=function(username,firstname,lastname) {
    	 $scope.friend.username=$rootScope.currentUser.username;
    	 $scope.friend.userFirstName=$rootScope.currentUser.firstname;
    	 $scope.friend.userLastName=$rootScope.currentUser.lastname;
    	 $scope.friend.friendusername=username;
    	 $scope.friend.friendFirstName=firstname;
    	 $scope.friend.friendLastName=lastname;
    	 $scope.friend.status="NA";
    	 $http.post('http://localhost:8009/collaborationMiddleware/sendFriendRequest',$scope.friend)
    	 .then(function(response) {
    		 console.log("Friend request sent");
    		 suggestedFriends();
    		 $location.path("/suggestedFriends");
    	 },
    	 function(errresponse) {
    		 console.log("Error in sending Friend request");
    	 }); 		
    }
    
    showFriends();
    friendRequests();
    suggestedFriends();

});