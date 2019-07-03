myApp.controller("BlogCommentController", function($scope,$location,$rootScope,$http,$route) {
	
	$scope.blogComment={commentId:0, blogId:0, blogComment:'', commentDate:'', username:''};
	$scope.blogcomment={commentId:0, blogId:0, blogComment:'', commentDate:'', username:''};
	$scope.blogcommentdata;
	$rootScope.commentId;
	$rootScope.blogComId;
	
	$scope.showComments=function(blogId)
	{
		console.log("Showing  blog");
		$rootScope.blogComId=blogId;
		getBlogComments();
		$location.path("/blogComment");
	}
	
	function getBlogComments()
	{
		$http.get('http://localhost:8009/collaborationMiddleware/getBlogComments/'+$rootScope.blogComId)
		.then(function(response) {
			$scope.blogcommentdata=response.data;
			console.log("getting blog comments");
		},
		function(errresponse)
		{
			console.log("error while getting blog comments");
		});
	}
	
	$scope.deleteBlogComment=function(commentId) {
		 $http.get('http://localhost:8009/collaborationMiddleware/deleteBlogComment/'+commentId)
		 .then(function(response) {
			 console.log("Blog Comment deleted");
			 getBlogComments();
			 $location.path("/blogComment");
		 },
		 function(errresponse) {
			 console.log("Error while deleting Blog Comment");
		 });
	}
	
	$scope.updateComment=function(commentId)
	{
		console.log("updating a blog comment");
		$rootScope.commentId=commentId;
		$location.path("/updateBlogComment");
	}
	
	$scope.updateBlogComment=function() {
		 $http.post('http://localhost:8009/collaborationMiddleware/updateBlogComment',$scope.blogcomment)
		 .then(function(response) {
			 console.log("Blog Comment updated");
			 $location.path("/updateBlogComment");
		 },
		 function(errresponse) {
			 console.log("Error updating Blog Comment");
			 alert("Error while updating Blog Comment");
	    	 $location.path("/updateBlogComment");
		 });
	}
	
	$scope.addComment=function(blogId) {
	      
	      $scope.blogComment.username=$rootScope.currentUser.username;
	      $scope.blogComment.blogId=blogId;
	      $http.post('http://localhost:8009/collaborationMiddleware/addBlogComment',$scope.blogComment)
	      .then(function(response) {
	    	  alert("Blog Comment added");
	    	  $route.reload();
	          $location.path("/showBlog");
	      },
	      function(errresponse) {
	    	  alert("Error while adding Blog Comment");
	    	  $location.path("/showBlog");
	      });
    }
	
	function getBlogComment()
	{
		$http.get('http://localhost:8009/collaborationMiddleware/getBlogComment/'+$rootScope.commentId)
		.then(function(response) {
			$scope.blogcomment=response.data;
			console.log("getting blog comment");
		},
		function(errresponse)
		{
			console.log("error while getting blog comment");
		});
	}
	
	getBlogComment();
	getBlogComments();

});