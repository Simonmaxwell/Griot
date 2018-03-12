$(document).ready(function() {

	$("#login-form").submit(function(e) {
		console.log("what");
		e.preventDefault();
		let user = {};
		user.username = $("#username").val();
		user.password = $("#password").val();
		loginUser(user);
	});
	
	function loginUser(data) {
		let settings = {
			url: '/login',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: function(data) { 
				localStorage.setItem("token", data.authToken)
			}
		};
		console.log(settings);
		$.ajax(settings);
	};
});