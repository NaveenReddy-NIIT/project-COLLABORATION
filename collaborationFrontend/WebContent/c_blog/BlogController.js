myApp.controller("BlogController", function($scope,$location,$rootScope,$http,$route) {
	
	$scope.blog={blogId:0,blogName:'', blogContent:'',username:'',createDate:'',status:'',likes:0,dislikes:0};
	$scope.blogdata;
	$rootScope.blogId;
	
	$scope.addBlog=function() {
	      
	      $scope.blog.username=$rootScope.currentUser.username;
	      $http.post('http://localhost:8009/collaborationMiddleware/addBlog',$scope.blog)
	      .then(function(response) {
	    	  console.log("Blog added");
	    	  alert("Blog added");
	    	  $route.reload();
	          $location.path("/addBlog");
	      },
	      function(errresponse) {
	    	  console.log("Error in adding Blog");
	    	  alert("Error while adding Blog");
	    	  $location.path("/addBlog");
	      });
      }
	
	$scope.updateMyBlog=function(blogId)
	{
		console.log("Editing a blog");
		$rootScope.blogId=blogId;
		$location.path("/updateBlog");
	}
	
	$scope.updateBlog=function()
	{
		$http.post('http://localhost:8009/collaborationMiddleware/updateBlog',$scope.blog)
		.then(function(response) {
			 console.log("Blog updated");
	    	 alert("Blog updated");
	    	 $route.reload();
		     $location.path("/updateBlog");
		},
		 function(errresponse) {
	    	  console.log("Error in updating Blog");
	    	  alert("Error while updating Blog");
	    	  $location.path("/updateBlog");
	      });
	   
	}
	
	$scope.incrementLikes=function(blogId) {
		 $http.get('http://localhost:8009/collaborationMiddleware/incrementLikes/'+blogId)
		 .then(function(response) {
			 console.log("Incremented Likes");
			 listBlogs();
			 $location.path("/showBlog");
		 },
		 function(errresponse) {
			 console.log("Error in Incrementing Likes");
		 });
	}
	
	$scope.incrementDislikes=function(blogId) {
		 $http.get('http://localhost:8009/collaborationMiddleware/incrementDislikes/'+blogId)
		 .then(function(response) {
			 console.log("Incremented Dislikes");
			 listBlogs();
			 $location.path("/showBlog");
		 },
		 function(errresponse) {
			 console.log("Error in Incrementing Dislikes");
		 });
	}
	
	$scope.deleteBlog=function(blogId) {
		 $http.get('http://localhost:8009/collaborationMiddleware/deleteBlog/'+blogId)
		 .then(function(response) {
			 console.log("Blog deleted");
			 listBlogs();
			 $location.path("/showBlog");
		 },
		 function(errresponse) {
			 console.log("Error in deleting Blog");
		 });
	}
	
	$scope.adminDeleteBlog=function(blogId) {
		 $http.get('http://localhost:8009/collaborationMiddleware/deleteBlog/'+blogId)
		 .then(function(response) {
			 console.log("Blog deleted successfully");
			 listBlogs();
			 $location.path("/manageBlog");
		 },
		 function(errresponse) {
			 console.log("Error in deleting Blog");
		 });
	}
	
	$scope.deleteMyBlog=function(blogId) {
		 $http.get('http://localhost:8009/collaborationMiddleware/deleteBlog/'+blogId)
		 .then(function(response) {
			 console.log("Blog deleted");
			 listBlogs();
			 $location.path("/myBlog");
		 },
		 function(errresponse) {
			 console.log("Error in deleting Blog");
		 });
	}
	
	$scope.approveBlog=function(blogId) {
		 $http.get('http://localhost:8009/collaborationMiddleware/approveBlog/'+blogId)
		 .then(function(response) {
			 console.log("Blog approved");
			 listBlogs();
			 $location.path("/manageBlog");
		 },
		 function(errresponse) {
			 console.log("Error in approving Blog");
		 });
	}
	
	$scope.rejectBlog=function(blogId) {
		 $http.get('http://localhost:8009/collaborationMiddleware/rejectBlog/'+blogId)
		 .then(function(response) {
			 console.log("Blog rejected");
			 listBlogs();
			 $location.path("/manageBlog");
		 },
		 function(errresponse) {
			 console.log("Error in rejecting Blog");
		 });
	}
	
	function listBlogs() 
	{
		console.log("list blogs");
		$http.get('http://localhost:8009/collaborationMiddleware/getBlogs')
		.then(function(response) {
			console.log("Showing all Blogs");
			$scope.blogdata=response.data;
		},
		function(errresponse) {
			console.log("Error in showing Blogs");
		});	
	}
	
	function getBlog()
	{
		$http.get('http://localhost:8009/collaborationMiddleware/getBlog/'+$rootScope.blogId)
		.then(function(response) {
			$scope.blog=response.data;
			console.log("getting blog");
		},
		function(errresponse)
		{
			console.log("error in getting blog");
		});
	}
	getBlog();
	listBlogs();
});