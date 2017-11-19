$(document).ready(function() {
	let settings = {
		url: 'http://localhost:8090/character-sheet',
		type: 'GET',
		dataType: 'json',
		success: showCharacters
	};

	$.ajax(settings);

	function showCharacters(data) {
		console.log(data);
	};

});