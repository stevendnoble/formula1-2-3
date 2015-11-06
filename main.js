// wait for DOM to load before running JS
$(document).ready(function() {

	// compile handlebars template
	// var source = $('#tracks-template').html();
	// var template = Handlebars.compile(source);
	var $gamesetup = $('.gamesetup');
	var $messages = $('.messages');
	var $questions = $('.questions');

	var p1name = 'Player 1';
	var p2name = 'Player 2';
	var currentGame;

	function createQuestion(currentGame) {
		var question;
		switch(currentGame) {
			case 'Simple Addition':
				question = createAdditionProblem(0, 9, 3);
				break;
			case 'Double Digit Addition':
				question = createAdditionProblem(10, 99, 3);
				break;
			case 'Simple Subtraction':
				do{
						question = createSubtractionProblem(0, 19, 3);
					} while ((question[1] > 9) && (question[2] > 9));
				break;
			case 'Double Digit Subtraction':

				break;
			case 'Single Digit Multiplication':

				break;
			case 'Double Digit Multiplication':

				break;
			case 'Simple Division':

				break;
		}
	}

	$questions.hide();
	$messages.hide();

	$('#p1btn').click(function(event) {
		p1name = $('#p1namebox').val();
		$('#p1hide').hide();
		$('.p1name > h2').append(p1name);
	});

	$('.p1name > h2').click(function(event) {
		p1name = $('#p1namebox').val();
		$('#p1hide').show();
		$('.p1name > h2').empty();
	});

	$('#p2btn').click(function(event) {
		p2name = $('#p2namebox').val();
		$('#p2hide').hide();
		$('.p2name > h2').append(p2name);
	});

	$('.p2name > h2').click(function(event) {
		p2name = $('#p2namebox').val();
		$('#p2hide').show();
		$('.p2name > h2').empty();
	});

	$('.gameselect').click(function(event){
		currentGame = $(this).text();
		console.log(currentGame);
	});

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