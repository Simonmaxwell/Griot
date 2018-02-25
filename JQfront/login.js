$(document).ready(function() {

	$("#login-form").submit(function(e) {
		console.log("what");
		e.preventDefault();
		let user = {};
		user.name = $("#username").val();
		user.password = $("#password").val();
		console.log(character);
		loginUser(user);
	});
	
	function loginUser(data) {
		let settings = {
			url: '/login',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: 
		};
		console.log(settings);
		$.ajax(settings);
	}
};