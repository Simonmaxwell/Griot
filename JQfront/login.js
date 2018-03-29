$(document).ready(function() {

	$("#login-form").submit(function(e) {
		console.log("what");
		e.preventDefault();
		loginUser();
	});

	$("#registration-form").submit(function(e) {
		console.log("what");
		e.preventDefault();
		registerUser();
	});
	
	function loginUser() {
		let user = {};
		user.username = $("#username").val();
		user.password = $("#password").val();
		let settings = {
			url: '/login',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(user),
			success: function(data) { 
				localStorage.setItem("token", data.authToken),
				localStorage.setItem("user", user.username)
			}
		};
		console.log(settings);
		$.ajax(settings);
	};

	function registerUser() {
		let user = {};
		user.username = $("#new-username").val();
		user.password = $("#new-password").val();
		let settings = {
			url: '/register',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(user),
			success: loginUser
		};
		$.ajax(settings);
	};
});