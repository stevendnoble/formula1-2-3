// wait for DOM to load before running JS
$(document).ready(function() {

	// Define global variables and paths for jQuery
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

	// Event Handler Functions
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

	// Allows players to change their name			
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

	// Allows players to click on their name to change again
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

	// Allows players to click on avatars to change the avatars
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
		// $('button.playername').click(changeName);  // Attempt to put as one handler
		$('.player1name > h2').click(changeBack1);
		$('.player2name > h2').click(changeBack2);
		$('#player1avatar').click(changeAvatar1);
		$('#player2avatar').click(changeAvatar2);
		$gameselect.click(gameSelect);

		// Hides windows that show up later in the game
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

		// Displays instructions with the game and players names
		$('.instructions span#game').text(currentGame);
		$('.instructions span#player1').text(player1name);
		$('.instructions span#player2').text(player2name);

		// Turns the click off to fix for double, triple, etc clicks on successive games
		$playgame.off('click');
		$playgame.click(playGame);	
	}

	// Starts the (NONFUNCTIONING - needs some timer to keep from going too quickly) countdown, generates a question, and sets click
	// handler for keypress (needs animation still)
	function playGame () {
		$questions.hide();
		$instructions.hide();
		// $('.countdown').show();
		var fadetime = 200;
		$('.countdown > h1:nth-child(1)').fadeIn(fadetime).fadeOut(fadetime);
		$('.countdown > h1:nth-child(2)').delay(2*fadetime).fadeIn(fadetime).fadeOut(fadetime);
		$('.countdown > h1:nth-child(3)').delay(4*fadetime).fadeIn(fadetime).fadeOut(fadetime);
		
		// Allows for a pause between questions
		window.setTimeout(function() { 
			$questions.show(); 

			// Generates a question using functions.js
			createQuestion(currentGame);
			// do {  // ATTEMPT at error handling to check for correct key
				$(document).keypress(pressKey);
			// } while ([97, 100, 115, 106, 107, 108].indexOf(event.which) === -1);
		}, 1000);
	}

	// Determines what happens when a user clicks on a key
	function pressKey() {
		$(document).off('keypress');

		// Determines which key was pressed
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

		// Not working currently
		// $(keycodes[index].keycodestr).addClass('highlight');
		// console.log(keycodes[index].keycodestr);

		// Messages to be displayed for correct or incorrect answers
		correctmessages = [
			"Gas and go!",
			"Tight in the center!",
			"You put the slide job on your opponent!",
			"Rubbin' is Racin'",
			"Reach up and pull 'em tight one more time!",
			"My Metamucil, Depends, Ensure, Poligrip, Ford Fusion was AWESOME today!",
			"Splash and go!",
			"We had a real hot rod today!"
		];

		incorrectmessages = [
			"I felt like we had a top-10 car, maybe a top-5 car.",
			"That last caution killed us.",
			"Debris on the track!",
			"You picked a fine time to leave me loose wheel.",
			"You just ran out of race track!",
			"We didn't have anything for the 20 car.",
			"We need to adjust to the harder tires.",
			"Got up into the marbles."
		];

		var count;
		// Determines if the answer is correct
		if(question[2]==question[3][keycodes[index].arraynumber]) {

			// Not working
			$(keycodes[index].answer).addClass('correct');

			// Adds a random message from the correct array to the player's message box
			$('#'+ keycodes[index].player + 'message').text(correctmessages[randDigit(0, 8)]);
			$('#'+ keycodes[index].player + 'message').fadeOut(3000, function () {
				$('#'+ keycodes[index].player + 'message').text('');
				$('#'+ keycodes[index].player + 'message').fadeIn(0);
			});

			// Moves the avatar forward 200 spaces
			$('img#' + keycodes[index].player + 'avatar').animate({left: '+=200'});

			// Updates the number of correct answers
			count = Number($('#' + keycodes[index].player + 'correct').text())+1;
			$('#' + keycodes[index].player + 'correct').text(count);

		} else {

			// Not working
			$(keycodes[index].answer).addClass('incorrect');

			// Adds a random message from the incorrect array to the player's message box
			$('#'+ keycodes[index].player + 'message').text(incorrectmessages[randDigit(0, 8)]);
			$('#'+ keycodes[index].player + 'message').fadeOut(3000, function () {
				$('#'+ keycodes[index].player + 'message').text('');
				$('#'+ keycodes[index].player + 'message').fadeIn(0);
			});

			// Moves the avatar back 120 spaces or back to the beginning
			if (Number($('img#'+ keycodes[index].player +'avatar').css('left').slice(0, -2))<120) {
				$('img#'+ keycodes[index].player +'avatar').css('left', '0px');
			} else {
				$('img#'+ keycodes[index].player +'avatar').animate({left: '-=120'});
			}

			// Updates the number of incorrect answers
			count = Number($('#' + keycodes[index].player + 'incorrect').text())+1;
			$('#' + keycodes[index].player + 'incorrect').text(count);
		}
		window.setTimeout(checkWinner, 1000);
	}

	// Function for generating questions and appending the information to the page
	function createQuestion() {

		// Not functioning - resets color and background
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

		// Randomizes the answers
		question[3] = randomizeArray(question[3]);
		var answers = question[3];

		// Displays the question and answers on the page
		$('.num1').text(question[0]);
		$('.num2').text(operator + ' ' + question[1]);
		$('#answer1').text(answers[0]);
		$('#answer2').text(answers[1]);
		$('#answer3').text(answers[2]);
	}

	// Checks the winning conditions
	function checkWinner () {
		var racetrack = $('.racetrack').width() - 2 * Number($('.racetrack').css('padding').slice(0,-2));
		var avatarwidth = $('#player2avatar').width();
		var winningCondition = racetrack - avatarwidth;
		var avatar1traveled = Number($('#player1avatar').css('left').slice(0, -2));
		var avatar2traveled = Number($('#player2avatar').css('left').slice(0, -2));

		// If one player wins, updates the wins and losses columns
		var count;
		if (avatar1traveled >= winningCondition) {
			winner = player1name;
			count = Number($('#player1wins').text())+1;
			$('#player1wins').text(count);
			count = Number($('#player2losses').text())+1;
			$('#player2losses').text(count);
		} else if (avatar2traveled >= winningCondition) {
			winner = player2name;
			count = Number($('#player2wins').text())+1;
			$('#player2wins').text(count);
			count = Number($('#player1losses').text())+1;
			$('#player1losses').text(count);
		} else {
			winner = false;
		}
		if (winner) {
			// animation
			$questions.hide();
			$gameresults.show();
			$('#winner').text(winner);
			$choosegame.click(function(event) {
				$gameresults.hide();
				$gamesetup.show();
				$('#player1avatar').css('left', '0px');
				$('#player2avatar').css('left', '0px');
			});
		} else {
			playGame();
		}
	}

	// Starts the game
	setBoard();

	// Not using
	// TO CHANGE TO CUSTOM CSS FOR OTHER OPTIONS
	// $('.selectcss').attr('href', '');
	// $('.selectcss').attr('href', '');

});