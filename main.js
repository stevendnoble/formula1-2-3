// wait for DOM to load before running JS
$(document).ready(function() {

	// Define global variables
	var $gamesetup = $('.gamesetup'),
			$messages = $('.messages'),
			$questions = $('.questions'),
			$gameselect = $('.gameselect'),
			$playgame = $('.playgame');

	var p1name = 'Player 1',
			p2name = 'Player 2',
			player1avatar = 1,
			player2avatar = 2,
			currentGame,
			currentQuestion;

	function changeName1(event) {
		p1name = $('#p1namebox').val();
		if (p1name === '') {
			alert("You must enter a name first.");
		} else {
			$('#p1hide').hide();
			$('.p1name > h2').append(p1name);
		}
	}

	function changeName2(event) {
			p2name = $('#p2namebox').val();
		if (p2name === '') {
			alert("You must enter a name first.");
		} else {
			$('#p2hide').hide();
			$('.p2name > h2').append(p2name);
		}
	}

	function changeBack1(event) {
		p2name = $('#p1namebox').val();
		$('#p1hide').show();
		$('.p1name > h2').empty();
	}

	function changeBack2(event) {
		p2name = $('#p2namebox').val();
		$('#p2hide').show();
		$('.p2name > h2').empty();
	}

	function changeAvatar1(event) {
		do {
			player1avatar = (player1avatar + 1) % 20;	
		} while (player1avatar === player2avatar);
		var player1avatarstr = 'avatars/avatar' + player1avatar + '.png';
		$('#player1avatar').attr("src", player1avatarstr);
	}

	function changeAvatar2(event) {
		do {
			player2avatar = (player2avatar + 1) % 20;	
		} while (player1avatar === player2avatar);
		var player2avatarstr = 'avatars/avatar' + player2avatar + '.png';
		$('#player2avatar').attr("src", player2avatarstr);
	}

	function setBoard() {
		$('#p1btn').click(changeName1);
		$('#p2btn').click(changeName2);
		$('.p1name > h2').click(changeBack1);
		$('.p2name > h2').click(changeBack2);
		$('#player1avatar').click(changeAvatar1);
		$('#player2avatar').click(changeAvatar2);
		$gameselect.click(gameSelect);
		$questions.hide();
		$messages.hide();
	}

	function gameSelect(event){
		$gamesetup.hide();
		$messages.show();
		currentGame = $(this).text();  // i.e. 'Simple Addition'
		$('.messages span#game').text(currentGame);
		$('.messages span#player1').text(p1name);
		$('.messages span#player2').text(p2name);
		$playgame.click(playGame);
	}

	function playGame () {
		$messages.hide();
		$questions.show();
		$('#countdown > h1').hide();
		$('#countdown > h1:nth-child(1)').fadeIn(500).fadeOut(500);
		$('#countdown > h1:nth-child(2)').delay(1000).fadeIn(500).fadeOut(500);
		$('#countdown > h1:nth-child(3)').delay(2000).fadeIn(500).fadeOut(500);

		var currentQuestion = createQuestion(currentGame);
		console.log(currentQuestion);

	}

	function createQuestion(currentGame) {
		var question;
		switch(currentGame) {
			case 'Simple Addition':
				question = createAdditionProblem(0, 9, 3);
				console.log(question);
				break;
			case 'Double Digit Addition':
				question = createAdditionProblem(10, 99, 3);
				console.log(question);
				break;
			case 'Simple Subtraction':
				do{
						question = createSubtractionProblem(0, 19, 3);
					} while ((question[1] > 9) || (question[2] > 9));
				console.log(question);
				break;
			case 'Double Digit Subtraction':
				question = createSubtractionProblem(10, 99, 3);
				console.log(question);
				break;
			case 'Single Digit Multiplication':
				question = createMultiplicationProblem(1, 9, 3);
				console.log(question);
				break;
			case 'Double Digit Multiplication':
				question = createMultiplicationProblem(10, 99, 3);
				console.log(question);
				break;
			case 'Simple Division':
				question = createSimpleDivisionProblem(3);
				console.log(question);
				break;
		}
	}

	function checkWinner () {
		console.log("CONGRATS!");
	}

	setBoard();

	// TO CHANGE TO CUSTOM CSS FOR OTHER OPTIONS
	// $('.selectcss').attr('href', 'popprincess.css');
	// $('.selectcss').attr('href', 'geography.css');

	// $('#search').on('submit', function(event) {
 //  	event.preventDefault();

 //  	$('#results').empty();
 //    $loading.show();
 //    alert('check');
 //  	var searchedTrack = $('#track').val();
 //  	var trackurl = 'https://api.spotify.com/v1/search?type=track&q=' + searchedTrack;

	// 	$.get(trackurl, function(data) {
	// 		console.log(data.tracks.items);
	// 		var trackResults = data.tracks.items;
	// 		$loading.hide();

	// 		var trackHTML = template({ tracks: trackResults });

	// 		$('#results').append(trackHTML);
	// 	});
	// });
});