$(document).ready(function() {

	function getCharacters() {
		let authToken = localStorage.getItem("token");
		let settings = {
			url: '/character-sheet',
			headers: {
				Authorization: 'Bearer '+ authToken
			},
			type: 'GET',
			dataType: 'json',
			success: characterDisplay
		};
		$.ajax(settings);
	};

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
			success: getCharacters
		};
		$.ajax(settings);
	}

	function deleteCharacter(data) {
		let settings = {
			url: '/character-sheet/' + data,
			type: 'DELETE',
			dataType: 'string',
			contentType: 'text',
			success: getCharacters
		};
		$.ajax(settings);
	}

	function characterRender(character) {
		var html = `
		<div class="rendered-character" data=${character._id}>
			<button class="edit">edit</button>
			<button class="delete">delete</button>
			<h3 class="character-name">${character.name}</h3>
			<h4 class="character-level">Level:${character.level}</h4>
			<div class="stats">
				<p>influence:${character.influence}</p>
				<p>presence:${character.presence}</p>
				<p>sympathy:${character.sympathy}</p>
				<p>resolve:${character.resolve}</p>
				<p>elegance:${character.elegance}</p>
			</div>
		</div>`
		return html;
	};

	function characterDisplay(data) {
		var html = '';
		for(let i = 0; i <data.length; i++) {	
			html += 
			characterRender(data[i]);
		}
		$("#test-div").html(html);
	};

	$(".character-sheet-container").hide();
	$("#update-character").hide()


	$(document).on("click",".edit", function() {
		$("#update-character").show();
		let selectedCharacter = $(this).parent().attr("data");
		$("#update-character").attr("data-woohoo", selectedCharacter);
	});

	$(document).on("click",".delete", function() {
		deleteCharacter($(this).parent().attr("data"));
	});

	$("#character-form").submit(function(e) {
		console.log("what");
		e.preventDefault();
		let character = {};
		character.name = $("#new-name").val();
		character.species = $("#new-species").val();
		character.level = parseInt($("#new-level").val());
		character.influence = parseInt($("#new-influence").val());
		character.presence = parseInt($("#new-presence").val());
		character.sympathy = parseInt($("#new-sympathy").val());
		character.resolve = parseInt($("#new-resolve").val());
		character.elegance = parseInt($("#new-elegance").val());
		console.log(character);
		postCharacter(character);
	});

	$("#update-character-form").submit(function(e) {
		e.preventDefault();
		let updatedCharacter = {
			_id : $("#update-character").attr("data-woohoo"),
		};
		updatedCharacter.level = parseInt($("#level").val());
		updatedCharacter.influence = parseInt($("#influence").val());
		updatedCharacter.presence = parseInt($("#presence").val());
		updatedCharacter.sympathy = parseInt($("#sympathy").val());
		updatedCharacter.resolve = parseInt($("#resolve").val());
		updatedCharacter.elegance = parseInt($("#elegance").val());
		console.log(updatedCharacter);
		putCharacter(updatedCharacter);
		$("#update-character").hide();
	})

	getCharacters();

	$("#splash-page-container").click(() => {
		$("#splash-page-container").hide();
		$(".character-sheet-container").show();
	});
});