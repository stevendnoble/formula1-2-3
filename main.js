// wait for DOM to load before running JS
$(document).ready(function() {

	// Define global variables
	var $gamesetup = $('.gamesetup'),
			$messages = $('.messages'),
			$questions = $('.questions'),
			$gameselect = $('.gameselect'),
			$playgame = $('.playgame'),
			$countdown = $('.countdown');

	var p1name = 'Player 1',
			p2name = 'Player 2',
			player1avatar = 3,
			player2avatar = 6,
			currentGame,
			question,
			operator;

	// Event Handlers
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

	// Call click handlers and allow user to choose a game
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
		$countdown.hide();
	}

	// Upon choosing game, shows instructions which have the click handler to playGame
	function gameSelect(event){
		$gamesetup.hide();
		$messages.show();
		currentGame = $(this).text();  // i.e. 'Simple Addition'
		$('.messages span#game').text(currentGame);
		$('.messages span#player1').text(p1name);
		$('.messages span#player2').text(p2name);
		$playgame.click(playGame);	
	}

	// Starts the (nonfunctioning) countdown, generates a question, and sets click
	// handler for keypress (needs animation still)
	function playGame () {
		var keycode;
		$messages.hide();
		$('.countdown > h1:nth-child(1)').fadeIn(500).fadeOut(500);
		$('.countdown > h1:nth-child(2)').delay(1000).fadeIn(500).fadeOut(500);
		$('.countdown > h1:nth-child(3)').delay(2000).fadeIn(500).fadeOut(500);
		$questions.show();
		createQuestion(currentGame);
		$(document).keypress(pressKey);
	}

	// Click handler for keypress (still needs checkWinner function and animation)
	function pressKey() {
		$(document).off('keypress');
		keycode = event.which;
		switch(keycode) {
			case 97:
				$('#97').addClass('highlight');
				if(question[2]==question[3][0]) {
					$('#answer1').css('color', 'green');
					$('.p1results').prepend('<p>You answered correctly. Way to go!</p>');
					//Move forward
				} else {
					$('#answer1').css('color', 'red');
					$('.p1results').prepend('<p>You answered incorrectly. Better luck next time.</p>');
				}
				break;
			case 106:
				$('#106').addClass('highlight');
				if(question[2]==question[3][0]) {
					$('#answer1').css('color', 'green');
					$('.p2results').prepend('<p>You answered correctly. Way to go!</p>');
					//Move forward
				} else {
					$('#answer1').css('color', 'red');
					$('.p2results').prepend('<p>You answered incorrectly. Better luck next time.</p>');
				}
				break;
			case 115:
				$('#115').addClass('highlight');
				if(question[2]==question[3][1]) {
					$('#answer2').css('color', 'green');
					$('.p1results').prepend('<p>You answered correctly. Nice job, ' + p1name + '!</p>');
					//Move forward
				} else {
					$('#answer2').css('color', 'red');
					$('.p1results').prepend('<p>Sorry, ' + p1name + ', you answered incorrectly</p>');
				}
				break;
			case 107:
				$('#107').addClass('highlight');
				if(question[2]==question[3][1]) {
					$('#answer2').css('color', 'green');
					$('.p2results').prepend('<p>You answered correctly!  Excellent, ' + p2name + '!</p>');
					//Move forward
				} else {
					$('#answer2').css('color', 'red');
					$('.p2results').prepend('<p>You answered incorrectly!  Frowny face.</p>');
				}
				break;
			case 100:
				$('#100').addClass('highlight');
				if(question[2]==question[3][2]) {
					$('#answer3').css('color', 'green');
					$('.p1results').prepend('<p>You answered correctly!  Woohoo!</p>');
					//Move forward
				} else {
					$('#answer3').css('color', 'red');
					$('.p1results').prepend("<p>You answered incorrectly.  That's no good!</p>");
				}
				break;
			case 108:
				$('#108').addClass('highlight');
				if(question[2]==question[3][2]) {
					$('#answer3').css('color', 'green');
					$('.p2results').prepend('<p>You answered correctly!</p>');
					//Move forward
				} else {
					$('#answer3').css('color', 'red');
					$('.p2results').prepend('<p>You answered incorrectly!  Boo, ' + p2name + '.</p>');
				}
				break;
		}
		// if (checkWinner()) {


		// 	setBoard();
		// } else {
			createQuestion();
		// }
	}

	// Function for generating questions and appending the information to the page
	function createQuestion() {
		$('.answer').css('color', 'yellow');
		$('.gamebutton').css('background-color', 'orange');
		switch(currentGame) {
			case 'Simple Addition':
				question = createAdditionProblem(0, 9, 3);
				operator = '+';
				console.log(question, operator);
				break;
			case 'Double Digit Addition':
				question = createAdditionProblem(10, 99, 3);
				operator = '+';
				console.log(question, operator);
				break;
			case 'Simple Subtraction':
				do{
						question = createSubtractionProblem(0, 19, 3);
					} while ((question[1] > 9) || (question[2] > 9));
				operator = '-';
				console.log(question, operator);
				break;
			case 'Double Digit Subtraction':
				question = createSubtractionProblem(10, 99, 3);
				operator = '-';
				console.log(question, operator);
				break;
			case 'Single Digit Multiplication':
				question = createMultiplicationProblem(1, 9, 3);
				operator = String.fromCharCode(215);
				console.log(question, operator);
				break;
			case 'Double Digit Multiplication':
				question = createMultiplicationProblem(10, 99, 3);
				operator = String.fromCharCode(215);
				console.log(question, operator);
				break;
			case 'Simple Division':
				question = createSimpleDivisionProblem(3);
				operator = String.fromCharCode(247);
				console.log(question, operator);
				break;
		}
		question[3] = randomizeArray(question[3]);
		var answers = question[3];
		console.log(answers);
		$('.num1').append(question[0]);
		$('.num2').append(operator + ' ' + question[1]);
		$('#answer1').append(answers[0]);
		$('#answer2').append(answers[1]);
		$('#answer3').append(answers[2]);
	}

	// Still needs to be written
	function checkWinner () {
		console.log("CONGRATS!");
	}

	// Starts the game
	setBoard();

	// TO CHANGE TO CUSTOM CSS FOR OTHER OPTIONS
	// $('.selectcss').attr('href', 'popprincess.css');
	// $('.selectcss').attr('href', 'geography.css');

});