$(document).ready(function() {

	$(".character-sheet-container").hide();
	
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
		characterDisplay(data);
	};

	function renderCharacter(character) {
		var html = `
		<div class="rendered-character" data=${character._id}>
			<button class="edit">edit</button>
			<h3 class="character-name">${character.name}</h3>
			<h4 class="character-level">${character.level}</h4>
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

	$(document).on("click",".edit", function() {
		console.log($(this).parent().attr("data"));
	});

	function characterDisplay(data) {
		var html = '';
		for(let i = 0; i <data.length; i++) {	
			html += 
			renderCharacter(data[i]);
		}
		$("#test-div").html(html);
	};

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
			_id : $("#character-dropdown").find(":selected").val(),
		};
		updatedCharacter.level = parseInt($("#level").val());
		updatedCharacter.influence = parseInt($("#influence").val());
		updatedCharacter.presence = parseInt($("#presence").val());
		updatedCharacter.sympathy = parseInt($("#sympathy").val());
		updatedCharacter.resolve = parseInt($("#resolve").val());
		updatedCharacter.elegance = parseInt($("#elegance").val());
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
			success: getCharacters
		};
		$.ajax(settings);
	}

	getCharacters();

	$("#splash-page-container").click(() => {
		$("#splash-page-container").hide();
		$(".character-sheet-container").show();
	});
});