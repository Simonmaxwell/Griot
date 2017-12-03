$(document).ready(function() {
	
	function getCharacters() {
		let settings = {
			url: 'http://localhost:8090/character-sheet',
			type: 'GET',
			dataType: 'json',
			success: showCharacters
		};
		$.ajax(settings);
	};

	function showCharacters(data) {
		console.log(data);
	};

	$("#character-form").submit(function(e) {
		console.log("what");
		e.preventDefault();
		let character = {};
		character.name = $("#name").val();
		character.level = parseInt($("#level").val());
		console.log(character);
		postCharacter(character);
	});

	function postCharacter(data) {
		let settings = {
			url: 'http://localhost:8090/character-sheet',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: showCharacters
		};
		console.log(settings);
		$.ajax(settings);
	}

	getCharacters();
});