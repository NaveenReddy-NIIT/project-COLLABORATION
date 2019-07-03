myApp.controller("JobController", function($scope,$http,$route,$location,$rootScope) {
	$scope.job={ jobDesignation:'', companyName:'', ctc:0, jobLocation:'', lastDate:'', skills:'' };
	$scope.jobdata;
	
	$scope.addJob=function() {
		  
	      $http.post('http://localhost:8009/collaborationMiddleware/addJob',$scope.job)
	      .then(function(response) {
	    	  console.log("Job published");
	    	  alert("Job published");
	    	  $route.reload();
	          $location.path("/addJob");
	      },
	      function(errresponse) {
	    	  console.log("Error while publishing Job");
	    	  alert("Error while publishing Job");
	    	  $location.path("/addJob");
	      });
    }
	
	$scope.deleteJob=function(jobId) {
		 $http.get('http://localhost:8009/collaborationMiddleware/deleteJob/'+jobId)
		 .then(function(response) {
			 console.log("Job deleted");
			 listJobs();
			 $location.path("/showJob");
		 },
		 function(errresponse) {
			 console.log("Error while deleting Job");
		 });
	}
	
	function listJobs() 
	{
		console.log("listing all the Jobs");
		$http.get('http://localhost:8009/collaborationMiddleware/getJobs')
		.then(function(response) {
			console.log("Showing all the Jobs");
			$scope.jobdata=response.data;
			console.log($scope.jobdata);
		},
		function(errresponse) {
			console.log("Error occured while showing Jobs");
		});	
	}

$scope.applyJob={applyJobId:0, jobId:0, username:''};
$scope.applyjobdata;

$scope.addApplyJob=function(jobId) {
	  $scope.applyJob.jobId=jobId;
	  $scope.applyJob.username=$rootScope.currentUser.username;
      $http.post('http://localhost:8009/collaborationMiddleware/addApplyJob',$scope.applyJob)
      .then(function(response) {
    	  console.log("successfully Applied ");
    	  alert("Applied succesfully");
    	  listJobs();
          $location.path("/showJob");
      },
      function(errresponse) {
    	  console.log("Error while  Applying for Job");
    	  alert("Error while applying for Job");
    	  $location.path("/showJob");
      });
}
/*function listApplyJobs() 
{
	console.log("list Applied Jobs method");
	$http.get('http://localhost:8009/collaborationMiddleware/getApplyJobs/'+$rootScope.currentUser.username)
	.then(function(response) {
		console.log("Showing all Applied Jobs");
		$scope.applyjobdata=response.data;
		console.log($scope.applyjobdata);
	},
	function(errresponse) {
		console.log("Error while showing Applied Jobs");
		$scope.applyjobdata=errresponse.data;
		console.log($scope.applyjobdata);
	});	
}

listApplyJobs();*/
listJobs();
});