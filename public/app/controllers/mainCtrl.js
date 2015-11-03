angular.module ('mainCtrl', []) 

//including the Auth factory!
.controller ('mainController', function($rootScope, $location, $scope, Auth){
	
	var vm = this;
	
	vm.processing = false;
	vm.retrievedUser = false;
		
	
	vm.postData = {};
	
	//check if user logged in on EACH request
	//subscribing to rootScope objects changeStart event!
	//when new request sent, it fires
	$rootScope.$on('$routeChangeStart', function() {
		
		
		//make sure logged in
		vm.loggedIn = Auth.isLoggedIn();
		
		//get user info on route change to display
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});	

	});
	
	vm.openLogin = function() {
		console.log("OPEN LOGIN!");
		
		swal({  
			title: "<b>Login</b>!",
			text: '<form ng-submit="login.doLogin()" ng-controller="userController as login">' +
				  	'<div class="form-group">' + 
						'<input type="text" class="form-control" ng-model="login.loginData.username" placeholder="username...">' +
				  	'</div>' +
					'<button type="submit" class="btn btn-primary text-center">Login</button>' +
					'</form>',
			showConfirmButton: false,   
			html: true
			});
		
	};
	
	//handle login form submission
	vm.doLogin = function() {
		
		//set to processing, clear previous error msg
		vm.processing = true;
		vm.error = '';
		
		//if form valid
		if (vm.loginData && vm.loginData.username &&
			vm.loginData.password) {
				
			//call Auth.login() with form data
			Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;			

				// if a user successfully logs in, redirect to users page
				if (data.success)			
					$location.path('/users');
				else 
					vm.error = data.message;
				
			});
		} 
		else {
			vm.processing = false;
			vm.error = "Username & Password Required";
		}
	
		
		
	};
	
	//function to handle log out
	vm.doLogout = function() {
	
		Auth.logout();
		
		//reset user data
		vm.user = {};
		
		//redirect to login page
		$location.path('/login');
		
	};
	
});