// wait for DOM to load before running JS
$(document).ready(function() {

	// Define global variables
	var $gamesetup = $('.gamesetup'),
			$instructions = $('.instructions'),
			$questions = $('.questions'),
			$gameselect = $('.gameselect'),
			$playgame = $('.playgame'),
			$countdown = $('.countdown');
			$choosegame = $('.choosegame');
			$gameresults = $('.gameresults');

	var player1name = 'Player 1',
			player2name = 'Player 2',
			player1avatar = 3,
			player2avatar = 6,
			currentGame,
			question,
			operator;

				// OOP ATTEMPT
				// var Player = function (name, avatar, namebox, hide) {
				// 	this.name = name;
				// 	this.avatar = avatar;
				// 	this.namebox = namebox;
				// 	this.hide = hide;
				// };
				// var player = [
				// 	0,
				// 	new Player(player1name, player1avatar, player1namebox, player1hide),
				// 	new Player(player2name, player2avatar, player2namebox, player2hide)
				// ];

	// Event Handlers

				// OOP ATTEMPT
				// function changeName(event) {
				// 	var playernum = Number($(this).attr('id').slice(6, 7));  // player1btn
				// 	if (player[playernum][name] === '') {
				// 		alert("You must enter a name first.");
				// 	} else {
				// 		$('#' + player[playernum][hide]).hide();
				// 		$('.' + player[playernum][name] + ' > h2').append(player[playernum][name]);
				// 	}  
				// }

	function changeName1(event) {
		player1name = $('#player1namebox').val();
		if (player1name === '') {
			alert("You must enter a name first.");
		} else {
			$('#player1hide').hide();
			$('.player1name > h2').append(player1name);
		}
	}
	function changeName2(event) {
		player2name = $('#player2namebox').val();
		if (player2name === '') {
			alert("You must enter a name first.");
		} else {
			$('#player2hide').hide();
			$('.player2name > h2').append(player2name);
		}
	}
	function changeBack1(event) {
		player2name = $('#player1namebox').val();
		$('#player1hide').show();
		$('.player1name > h2').empty();
	}
	function changeBack2(event) {
		player2name = $('#player2namebox').val();
		$('#player2hide').show();
		$('.player2name > h2').empty();
	}
	function changeAvatar1(event) {
		do {
			player1avatar = (player1avatar + 1) % 10;	
		} while (player1avatar === player2avatar);
		var player1avatarstr = 'avatars/avatar' + player1avatar + '.png';
		$('#player1avatar').attr("src", player1avatarstr);
	}
	function changeAvatar2(event) {
		do {
			player2avatar = (player2avatar + 1) % 10;	
		} while (player1avatar === player2avatar);
		var player2avatarstr = 'avatars/avatar' + player2avatar + '.png';
		$('#player2avatar').attr("src", player2avatarstr);
	}

	// Call click handlers and allow user to choose a game
	function setBoard() {
		$('#player1btn').click(changeName1);
		$('#player2btn').click(changeName2);
		// $('button.playername').click(changeName);
		$('.player1name > h2').click(changeBack1);
		$('.player2name > h2').click(changeBack2);
		$('#player1avatar').click(changeAvatar1);
		$('#player2avatar').click(changeAvatar2);
		$choosegame.click(setBoard);
		$gameselect.click(gameSelect);
		$questions.hide();
		$instructions.hide();
		$countdown.hide();
		$gameresults.hide();
	}

	// Upon choosing game, shows instructions which have the click handler to playGame
	function gameSelect(event){
		$gamesetup.hide();
		$instructions.show();
		currentGame = $(this).text();  // i.e. 'Simple Addition'
		$('.instructions span#game').text(currentGame);
		$('.instructions span#player1').text(player1name);
		$('.instructions span#player2').text(player2name);
		$playgame.click(playGame);	
	}

	// Starts the (NONFUNCTIONING - needs some timer to keep from going too quickly) countdown, generates a question, and sets click
	// handler for keypress (needs animation still)
	function playGame () {
		var keycode;
		$questions.hide();
		$instructions.hide();
		// $('.countdown').show();
		var fadetime = 200;
		$('.countdown > h1:nth-child(1)').fadeIn(fadetime).fadeOut(fadetime);
		$('.countdown > h1:nth-child(2)').delay(2*fadetime).fadeIn(fadetime).fadeOut(fadetime);
		$('.countdown > h1:nth-child(3)').delay(4*fadetime).fadeIn(fadetime).fadeOut(fadetime);
		window.setTimeout(function() { 
			$questions.show(); 
			createQuestion(currentGame);
			$(document).keypress(pressKey);
		}, 3000);
	}

	function pressKey() {
		$(document).off('keypress');
		keycode = event.which;
		function KeycodeConvert(keycode, keycodestr, answer, player, arraynumber) {
			this.keycode = keycode;
			this.keycodestr = keycodestr;
			this.answer = answer;
			this.player = player;
			this.arraynumber = arraynumber;
		}
		var keycodes = [];
		keycodes.push(new KeycodeConvert( 97,  '#97', '#answer1', 'player1', 0));
		keycodes.push(new KeycodeConvert(106, '#106', '#answer1', 'player2', 0));
		keycodes.push(new KeycodeConvert(115, '#115', '#answer2', 'player1', 1));
		keycodes.push(new KeycodeConvert(107, '#107', '#answer2', 'player2', 1));
		keycodes.push(new KeycodeConvert(100, '#100', '#answer3', 'player1', 2));
		keycodes.push(new KeycodeConvert(108, '#108', '#answer3', 'player2', 2));

		// Determines index of keycodes array which corresponds to the keypress
		var index;
		keycodes.forEach(function(element, i) {
			if (element.keycode === keycode) { index = i; }
		});
		console.log(index);

		$(keycodes[index].keycodestr).addClass('highlight');
		console.log(keycodes[index].keycodestr);

		if(question[2]==question[3][keycodes[index].arraynumber]) {
			$(keycodes[index].answer).addClass('correct');
			$('.'+ keycodes[index].player + 'results').prepend('<p>You answered correctly. Way to go!</p>');
			$('img#'+ keycodes[index].player +'avatar').animate({left: '+=200'});
		} else {
			$(keycodes[index].answer).addClass('incorrect');
			$('.'+ keycodes[index].player + 'results').prepend('<p>You answered incorrectly. Better luck next time.</p>');
			$('img#'+ keycodes[index].player +'avatar').animate({left: '-=120'});
		}
		// Old expanded code for this function - Can remove once everything is working properly.
		// switch(keycode) {
		// 	case 97:
		// 		$('#97').addClass('highlight');
		// 		if(question[2]==question[3][0]) {
		// 			$('#answer1').addClass('correct');
		// 			$('.player1results').prepend('<p>You answered correctly. Way to go!</p>');
		// 			$('img#player1avatar').animate({left: '+=40'});
		// 		} else {
		// 			$('#answer1').addClass('incorrect');
		// 			$('.player1results').prepend('<p>You answered incorrectly. Better luck next time.</p>');
		// 			$('img#player2avatar').animate({left: '+=25'});
		// 		}
		// 		break;
		// 	case 106:
		// 		$('#106').addClass('highlight');
		// 		if(question[2]==question[3][0]) {
		// 			$('#answer1').addClass('correct');
		// 			$('.player2results').prepend('<p>You answered correctly. Way to go!</p>');
		// 			$('img#player2avatar').animate({left: '+=40'});
		// 		} else {
		// 			$('#answer1').addClass('incorrect');
		// 			$('.player2results').prepend('<p>You answered incorrectly. Better luck next time.</p>');
		// 			$('img#player1avatar').animate({left: '+=25'});
		// 		}
		// 		break;
		// 	case 115:
		// 		$('#115').addClass('highlight');
		// 		if(question[2]==question[3][1]) {
		// 			$('#answer2').addClass('correct');
		// 			$('.player1results').prepend('<p>You answered correctly. Nice job, ' + player1name + '!</p>');
		// 			$('img#player1avatar').animate({left: '+=40'});
		// 		} else {
		// 			$('#answer2').addClass('incorrect');
		// 			$('.player1results').prepend('<p>Sorry, ' + player1name + ', you answered incorrectly</p>');
		// 			$('img#player2avatar').animate({left: '+=25'});
		// 		}
		// 		break;
		// 	case 107:
		// 		$('#107').addClass('highlight');
		// 		if(question[2]==question[3][1]) {
		// 			$('#answer2').addClass('correct');
		// 			$('.player2results').prepend('<p>You answered correctly!  Excellent, ' + player2name + '!</p>');
		// 			$('img#player2avatar').animate({left: '+=40'});
		// 		} else {
		// 			$('#answer2').addClass('incorrect');
		// 			$('.player2results').prepend('<p>You answered incorrectly!  Frowny face.</p>');
		// 			$('img#player1avatar').animate({left: '+=25'});
		// 		}
		// 		break;
		// 	case 100:
		// 		$('#100').addClass('highlight');
		// 		if(question[2]==question[3][2]) {
		// 			$('p.answer:nth-of-type(3)').addClass('correct');
		// 			$('.player1results').prepend('<p>You answered correctly!  Woohoo!</p>');
		// 			$('img#player1avatar').animate({left: '+=40'});
		// 		} else {
		// 			$('p.answer:nth-of-type(3)').addClass('incorrect');
		// 			$('.player1results').prepend("<p>You answered incorrectly.  That's no good!</p>");
		// 			$('img#player2avatar').animate({left: '+=25'});
		// 		}
		// 		break;
		// 	case 108:
		// 		$('#108').addClass('highlight');
		// 		if(question[2]==question[3][2]) {
		// 			$('#answer3').addClass('correct');
		// 			$('.player2results').prepend('<p>You answered correctly!</p>');
		// 			$('img#player2avatar').animate({left: '+=40'});
		// 		} else {
		// 			$('#answer3').addClass('incorrect');
		// 			$('.player2results').prepend('<p>You answered incorrectly!  Boo, ' + player2name + '.</p>');
		// 			$('img#player1avatar').animate({left: '+=25'});
		// 		}
		// 		break;
		// }
		window.setTimeout(checkWinner, 1000);
		playGame();
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
		$('.num1').text(question[0]);
		$('.num2').text(operator + ' ' + question[1]);
		$('#answer1').text(answers[0]);
		$('#answer2').text(answers[1]);
		$('#answer3').text(answers[2]);
	}

	// *************************
	// Still needs to be written
	function checkWinner () {
		var racetrack = $('.racetrack').width() - 2 * Number($('.racetrack').css('padding').slice(0,-2));
		var avatarwidth = $('#player2avatar').width();
		var avatar1traveled = Number($('#player1avatar').css('left').slice(0, -2));
		var avatar2traveled = Number($('#player2avatar').css('left').slice(0, -2));
		var winningCondition = racetrack - avatarwidth;
		console.log(winningCondition, player1name, avatar1traveled, player2name, avatar2traveled);
		if (avatar1traveled >= winningCondition) {
			winner = 'player1';
			console.log(player1name + ' wins the game!');
		} else if (avatar2traveled >= winningCondition) {
			winner = 'player2';
			console.log(player2name + ' wins the game!');
		} else {
			winner = false;
			console.log('Nobody wins yet. Play on, my friend!');
		}
		if (winner) {
			// animation
			$questions.hide();
			$gameresults.show();
		}
	}

	// Starts the game
	setBoard();

	// TO CHANGE TO CUSTOM CSS FOR OTHER OPTIONS
	// $('.selectcss').attr('href', 'popprincess.css');
	// $('.selectcss').attr('href', 'geography.css');

});