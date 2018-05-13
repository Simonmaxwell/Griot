$(document).ready(function() {

	var currentCharacter = {};

	function inCaseOfTrouble() {
		window.location.href = "/login.html";
	};

	function getCharacters() {
		let authToken = localStorage.getItem("token");
		let user = localStorage.getItem("user");
		let settings = {
			url: `/character-sheet/${user}`,
			headers: {
				Authorization: 'Bearer '+ authToken
			},
			type: 'GET',
			dataType: 'json',
			success: characterDisplay,
			error: inCaseOfTrouble
		};
		$.ajax(settings);
	};

	function getCharacterById(selectedCharacter, resolve, reject) {
		let setCurrentCharacter = function(data) {
			currentCharacter = data;
			console.log("bababa");
			resolve();
		}
		let authToken = localStorage.getItem("token");
		let user = localStorage.getItem("user");
		let settings = {
			url: `character-sheet/detail/${selectedCharacter}`,
			headers: {
				Authorization: 'Bearer ' + authToken
			},
			type: 'GET',
			dataType: 'json',
			success: setCurrentCharacter
		};
		$.ajax(settings)
	}

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
	};

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
	};

	function deleteCharacter(data) {
		let settings = {
			url: '/character-sheet/' + data,
			type: 'DELETE',
			dataType: 'string',
			contentType: 'text',
			success: getCharacters
		};
		$.ajax(settings);
	};

	function characterRender(character) {
		var html = `
		<div class="rendered-character" data=${character._id}>
			<h3 class="character-name">${character.name}</h3>
			<h4 class="character-name">${character.species}<h4>
			<h4 class="character-level">Level:${character.level}</h4>
			<div class="stats">
				<p>influence:${character.influence}</p>
				<p>presence:${character.presence}</p>
				<p>sympathy:${character.sympathy}</p>
				<p>resolve:${character.resolve}</p>
				<p>elegance:${character.elegance}</p>
			</div>
			<button class="character-buttons edit">edit</button>
			<button class="character-buttons delete">delete</button>
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


	$(document).on("click",".edit", function() {
		$("#update-character").show();
		$("#test-div").hide();
		let selectedCharacter = $(this).parent().attr("data");
		
		new Promise(function(resolve, reject) {
			getCharacterById(selectedCharacter, resolve, reject);
		})
		.then(function() {
			console.log("chachacha");
			console.log("current character:", currentCharacter);
	 		$("#name").val(currentCharacter.name);
	 		$("#level").val(currentCharacter.level);
	 		$("#influence").val(currentCharacter.influence);
	 		$("#presence").val(currentCharacter.presence);
	 		$("#sympathy").val(currentCharacter.sympathy);
	 		$("#resolve").val(currentCharacter.resolve);
	 		$("#elegance").val(currentCharacter.elegance);
	 		$("#update-character").attr("data-woohoo", selectedCharacter);
		}).catch(function() { console.log("honk"); });
	});

	$(document).on("click",".delete", function() {
		if (confirm("Are you sure?")) {
			deleteCharacter($(this).parent().attr("data"));
		};
	});

	$("#character-form").submit(function(e) {
		console.log("what");
		e.preventDefault();
		let character = {};
		character.user = localStorage.getItem("user");
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
		$("#character-form").hide();
		$("#new-character-button").show();
	});

	$("#update-character-form").submit(function(e) {
		e.preventDefault();
		let updatedCharacter = {
			_id : $("#update-character").attr("data-woohoo")
		};
		updatedCharacter.name= $("#name").val();
		updatedCharacter.level = parseInt($("#level").val());
		updatedCharacter.influence = parseInt($("#influence").val());
		updatedCharacter.presence = parseInt($("#presence").val());
		updatedCharacter.sympathy = parseInt($("#sympathy").val());
		updatedCharacter.resolve = parseInt($("#resolve").val());
		updatedCharacter.elegance = parseInt($("#elegance").val());
		console.log(updatedCharacter);
		putCharacter(updatedCharacter);
		$("#update-character").hide();
		$("#test-div").show()
	});


	$("#logout-button").click(() => {
		console.log(" logout clicked");
		localStorage.removeItem("token"),
		localStorage.removeItem("user"),
		window.location.href = "./login.html"
	});

	$("#new-character-button").click(() => {
		$("#character-form").show();
		$("#new-character-button").hide();
	});

	$("#update-character").hide();
	$("#character-form").hide();

	getCharacters();
	
});