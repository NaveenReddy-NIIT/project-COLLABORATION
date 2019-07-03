myApp.controller("ApplyJobController", function($scope,$http,$route,$location,$rootScope) {
	$scope.applyJob={applyJobId:0, jobId:0, username:''};
	$scope.applyjobdata;
	
	$scope.addApplyJob=function(jobId) {
		  $scope.applyJob.jobId=jobId;
		  $scope.applyJob.username=$rootScope.currentUser.username;
	      $http.post('http://localhost:8009/collaborationMiddleware/addApplyJob',$scope.applyJob)
	      .then(function(response) {
	    	  console.log(" succefully Applied Job  ");
	    	  alert("applied successfully");
	    	  listApplyJobs();
	          $location.path("/showJob");
	      },
	      function(errresponse) {
	    	  console.log("Error while adding ApplyJob");
	    	  alert("Error while applying Job");
	    	  $location.path("/showJob");
	      });
    }
	function listApplyJobs() 
	{
		console.log("list ApplyJob method");
		$http.get('http://localhost:8009/collaborationMiddleware/getApplyJobs/'+$rootScope.currentUser.username)
		.then(function(response) {
			console.log("Showing all ApplyJobs");
			$scope.applyjobdata=response.data;
			console.log($scope.applyjobdata);
		},
		function(errresponse) {
			console.log("Error while showing Applied Jobs");
			$scope.applyjobdata=errresponse.data;
			console.log($scope.applyjobdata);
		});	
	}
	
	listApplyJobs();
});