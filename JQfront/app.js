$(document).ready(function() {
	
	function getCharacters() {
		let settings = {
			url: '/character-sheet',
			type: 'GET',
			dataType: 'json',
			success: showCharacters
		};
		$.ajax(settings);
	};

	function showCharacters(data) {
		console.log(data);
		let options = "";
		for(let i =0; i < data.length; i++) {
			options += `<option value="${data[i]._id}"> ${data[i].name}</option>`
		}
		$("#character-dropdown").html(options);
	};

	$("#character-form").submit(function(e) {
		console.log("what");
		e.preventDefault();
		let character = {};
		character.name = $("#new-name").val();
		character.level = parseInt($("#new-level").val());
		console.log(character);
		postCharacter(character);
	});

	$("#update-character-form").submit(function(e) {
		e.preventDefault();
		let updatedCharacter = {
			_id : $("#character-dropdown").find(":selected").val(),
		};
		updatedCharacter.name = $("#name").val();
		updatedCharacter.level = $("#level").val();
		console.log(updatedCharacter);
		putCharacter(updatedCharacter);
	})

	function postCharacter(data) {
		let settings = {
			url: '/character-sheet',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: getCharacters
		};
		console.log(settings);
		$.ajax(settings);
	}

	function putCharacter(data) {
		let settings = {
			url: '/character-sheet/' + data._id,
			type: 'PUT',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: showCharacters
		};
		$.ajax(settings);
	}

	getCharacters();
});