// wait for DOM to load before running JS
$(document).ready(function() {

// Define global variables and paths for jQuery
var $gamesetup = $('.gamesetup'),
		$instructions = $('.instructions'),
		$questions = $('.questions'),
		$gameselect = $('.gameselect'),
		$playgame = $('.playgame'),
		$countdown = $('.countdown'),
		$choosegame = $('.choosegame'),
		$gameresults = $('.gameresults');

var $changePlayer = $('.change-player'),
		$nameLocation = $('.name-location'),
		$avatar = $('.avatar');

var Player = function (name, avatar, nameInput, hide, nameHeading, button, avatarLocation) {
	this.name = name;
	this.avatar = avatar;
	this.nameInput = nameInput;
	this.hide = hide;          // This should have a better name!
	this.nameHeading = nameHeading;
	this.button = button;
	this.avatarLocation = avatarLocation;
};

var players = [
			new Player('Player 1',
								 3,
								 $('#player0-name-input'),
								 $('#player0hide'),
								 $('.player0name > h2'),
								 $('#player0btn'),
								 $('#avatar0')),
			new Player('Player 2',
								 6,
								 $('#player1-name-input'),
								 $('#player1hide'),
								 $('.player1name > h2'),
								 $('#player1btn'),
								 $('#avatar1')),
		],
		currentGame,
		question,
		operator;

/////////////////////////////
// Event Handler Functions //
/////////////////////////////

// Allows players to change their name
function changeName() {
	event.preventDefault();
	var num = Number($(this).attr('player-id'));
	players[num].name = players[num].nameInput.val();
	if (players[num].name === '') {
		alert("You must enter a name first.");
	} else {
		players[num].hide.hide();
		players[num].nameHeading.append(players[num].name);
	}
}

// Allows players to click on their name to change again
function changeBack() {
	event.preventDefault();
	var num = Number($(this).attr('player-id'));
	players[num].hide.show();
	players[num].nameHeading.empty();
}

// Allows players to click on avatars to change the avatars
function changeAvatar() {
	var num = Number($(this).attr('player-id'));
	do {
		players[num].avatar = (players[num].avatar + 1) % 10;	
	} while (players[num].avatar === players[(num + 1) % 2].avatar);
	var avatarstr = 'avatars/avatar' + players[num].avatar + '.png';
	players[num].avatarLocation.attr("src", avatarstr);
}

	// Call click handlers and allow user to choose a game
	function setBoard() {
		$changePlayer.on('click', changeName);
		$nameLocation.on('click', changeBack);
		$avatar.on('click', changeAvatar);

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
		$('.instructions span#player0').text(player0name);
		$('.instructions span#player1').text(player1name);

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
		keycodes.push(new KeycodeConvert( 97,  '#97', '#answer1', 'player0', 0));
		keycodes.push(new KeycodeConvert(106, '#106', '#answer1', 'player1', 0));
		keycodes.push(new KeycodeConvert(115, '#115', '#answer2', 'player0', 1));
		keycodes.push(new KeycodeConvert(107, '#107', '#answer2', 'player1', 1));
		keycodes.push(new KeycodeConvert(100, '#100', '#answer3', 'player0', 2));
		keycodes.push(new KeycodeConvert(108, '#108', '#answer3', 'player1', 2));

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
				do {
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
		var avatarwidth = $('#player1avatar').width();
		var winningCondition = racetrack - avatarwidth;
		var avatar1traveled = Number($('#player0avatar').css('left').slice(0, -2));
		var avatar2traveled = Number($('#player1avatar').css('left').slice(0, -2));

		// If one player wins, updates the wins and losses columns
		var count;
		if (avatar1traveled >= winningCondition) {
			winner = player0name;
			count = Number($('#player0wins').text())+1;
			$('#player0wins').text(count);
			count = Number($('#player1losses').text())+1;
			$('#player1losses').text(count);
		} else if (avatar2traveled >= winningCondition) {
			winner = player1name;
			count = Number($('#player1wins').text())+1;
			$('#player1wins').text(count);
			count = Number($('#player0losses').text())+1;
			$('#player0losses').text(count);
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
				$('#player0avatar').css('left', '0px');
				$('#player1avatar').css('left', '0px');
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