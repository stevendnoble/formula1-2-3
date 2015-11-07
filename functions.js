function randDigit(min, max) {
	return Math.floor(Math.random() * (max-min + 1) + min);
}

// In game, allow for option of simple addition, double digit addition, or range.
// For single and double, just enter the range for the user

// Returns two numbers within range, their sum, and an array
// of given length of false possible solutions plus the correct solution
// Checks for possible solutions:  must be greater than the larger of the addends
//   and must be unique solutions
function createAdditionProblem(minDigit, maxDigit, numPossibleSolutions) {
	var possibleSolution;
	var possibleSolutions = [];
	var num1 = randDigit(minDigit, maxDigit);
	var num2 = randDigit(minDigit, maxDigit);
	var sum = num1 + num2;
	possibleSolutions.push(sum);
	for(i=0; i<numPossibleSolutions-1; i++) {
		do {
			possibleSolution = randDigit(minDigit, maxDigit) + randDigit(minDigit, maxDigit);
		} while ((possibleSolution <= Math.max(num1, num2)) || (possibleSolutions.indexOf(possibleSolution) != -1));
		possibleSolutions.push(possibleSolution);
	}
	return [num1, num2, sum, possibleSolutions];
}

// Returns two numbers within range, their difference, and an array
// of given length of false possible solutions plus the correct solution
// Checks for possible solutions:  must be less than the larger of the numbers,
//   must be greater than zero, and must be unique solutions
function createSubtractionProblem(minDigit, maxDigit, numPossibleSolutions) {
	var possibleSolution;
	var possibleSolutions = [];
	var num1 = randDigit(minDigit, maxDigit);
	var num2 = randDigit(minDigit, maxDigit);
	if (num2 > num1) {
		var temp = num1;
		num1 = num2;
		num2 = temp;
	}
	var difference = num1 - num2;
	possibleSolutions.push(difference);
	for(i=0; i<numPossibleSolutions-1; i++) {
		do {
			possibleSolution = randDigit(minDigit, maxDigit) - randDigit(minDigit, maxDigit);
		} while ((possibleSolution >= Math.max(num1, num2)) || (possibleSolution < 0) || (possibleSolutions.indexOf(possibleSolution) != -1));
		possibleSolutions.push(possibleSolution);
	}
	return [num1, num2, difference, possibleSolutions];
}

// Returns two numbers within range, their product, and an array
// of given length of false possible solutions plus the correct solution
// Checks for possible solutions:  must be multiple of one of the numbers,
//   must be greater than the sum of the two numbers, and must be unique solutions
// function createSDMultiplicationProblem(numPossibleSolutions) {
// 	var multiples = [],
// 			filteredmultiples = [],
// 			product,
// 			index,
// 			possibleSolutions = [],
// 			num1 = randDigit(0, 9),
// 			num2 = randDigit(0, 9);			
// 	while(num1===0 && num2===0) num2 = randDigit(0,9);
// 	product = num1 * num2;
// 	for(i=0; i<10; i++) {
// 		multiples.push(num1 * i);
// 		multiples.push(num2 * i);
// 	}
// 	// Filter repeats, multiples less than the sum of the two numbers, and the product
// 	filteredmultiples = multiples.filter(function(element, position) {
// 		return multiples.indexOf(element) == position;
// 	}); 
// 	multiples = filteredmultiples;
// 	multiples = multiples.filter(function(element) {
// 		return !(element < (num1 + num2));
// 	}); 
// 	while(multiples.indexOf(product) !== -1) {
// 		multiples.splice(multiples.indexOf(product), 1);
// 	}
// 	for(i=0; i<numPossibleSolutions - 1; i++) {
// 		index = randDigit(0, (multiples.length-1));
// 		possibleSolutions.push(multiples[index]);
// 		multiples.splice(index, 1);
// 	}
// 	possibleSolutions.unshift(product);
// 	return [num1, num2, product, possibleSolutions];
// }

// Returns two numbers within range, their produce, and an array
// of given length of false possible solutions plus the correct solution
// Checks for possible solutions:  must be less than the larger of the numbers,
//   must be greater than zero, and must be unique solutions
function createMultiplicationProblem(minDigit, maxDigit, numPossibleSolutions) {
	var possibleSolution;
	var possibleSolutions = [];
	var num1 = randDigit(minDigit, maxDigit);
	var num2 = randDigit(minDigit, maxDigit);
	while (num1 === 1 && num2 === 1) {
		num2 = randDigit(minDigit, maxDigit);
	}
	var product = num1 * num2;
	possibleSolutions.push(product);
	while(possibleSolutions.length < numPossibleSolutions) {
		possibleSolution = Math.round(product*(Math.random() + 0.5));
		if(possibleSolutions.indexOf(possibleSolution) === -1) {
			possibleSolutions.push(possibleSolution);
		}
	}
	return [num1, num2, product, possibleSolutions];
}

// Returns two numbers, their quotient, and an array of given length of false 
// possible solutions plus the correct solution. Checks for possible solutions:
//   must be unique solutions
function createSimpleDivisionProblem(numPossibleSolutions) {
	var num1,
			possibleSolution,
			possibleSolutions = [],
			num2 = randDigit(1, 9);
	quotient = randDigit(0, 9);
	num1 = quotient * num2;
	possibleSolutions.push(quotient);
	while(possibleSolutions.length < numPossibleSolutions) {
		possibleSolution = randDigit(1, 9);
		if (possibleSolutions.indexOf(possibleSolution) === -1) {
			possibleSolutions.push(possibleSolution);
		}
	}
	return [num1, num2, quotient, possibleSolutions];
}