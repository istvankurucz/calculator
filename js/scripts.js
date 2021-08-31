$(document).ready(function () {
	const display = $(".display .result");
	const previous = $(".display .previous");
	const deleteLast = $(".backspace");

	let num1 = "";
	let num2 = "";
	let operator = "";

	function solveOperation() {
		num2 = parseFloat(num2);
		switch (operator) {
			case "^":
				previous.text(`${num1}^${num2} =`);
				num1 = num1 ** num2;
				display.text(`${num1.toString().substr(0, 17)}`);
				break;

			case "*":
				previous.text(`${num1}*${num2} =`);
				num1 *= num2;
				display.text(`${num1.toString().substr(0, 17)}`);
				break;

			case "/":
				previous.text(`${num1}/${num2} =`);
				num1 /= num2;
				display.text(`${num1.toString().substr(0, 17)}`);
				break;

			case "-":
				previous.text(`${num1}-${num2} =`);
				num1 -= num2;
				display.text(`${num1.toString().substr(0, 17)}`);
				break;

			case "+":
				previous.text(`${num1}+${num2} =`);
				num1 += num2;
				display.text(`${num1.toString().substr(0, 17)}`);
				break;

			default:
				console.log("You have to add the second number.");
		}
		num2 = "";
		operator = "";
	}

	function reset() {
		num1 = num2 = "";
		previous.text("");
		display.text("0");
	}

	// Here can be added the numbers
	$(".light").click(function () {
		if (operator) {
			if ($(this).html() === '<i class="fas fa-circle"></i>') {
				if (num2.indexOf(".") === -1) num2 += ".";
				else console.log("You can't add more points!");
			} else if ($(this).html() !== "C") num2 += $(this).html();

			display.text(num2);
		} else {
			if ($(this).html() === '<i class="fas fa-circle"></i>') {
				if (num1.indexOf(".") === -1) num1 += ".";
				else console.log("You can't add more points!");
			} else if ($(this).html() !== "C") num1 += $(this).html();

			display.text(num1);
		}
	});

	// Selects the operator
	$(".dark").click(function () {
		if (num1 === "") console.log("First you have to add a number!");
		else {
			num1 = parseFloat(num1);
			if ($(this).hasClass("percent")) {
				num1 *= 100;
				display.text(`${num1.toString().substr(0, 14)} %`);
			} else if ($(this).hasClass("superscript")) {
				previous.text(`${num1}^`);
				operator = "^";
			} else if ($(this).hasClass("root")) {
				previous.text(`sqrt(${num1})`);
				num1 = Math.sqrt(num1);
				display.text(`${num1.toString().substr(0, 17)}`);
			} else if ($(this).hasClass("times")) {
				previous.text(`${num1}*`);
				operator = "*";
			} else if ($(this).hasClass("divide")) {
				previous.text(`${num1}/`);
				operator = "/";
			} else if ($(this).hasClass("minus")) {
				previous.text(`${num1}-`);
				operator = "-";
			} else if ($(this).hasClass("plus")) {
				previous.text(`${num1}+`);
				operator = "+";
			}
		}
	});

	// Deletes the last character of the number
	deleteLast.click(function () {
		if (operator) {
			num2 = num2.toString();
			num2 = num2.substring(0, num2.length - 1);
			display.text(num2);
			isNan(num2) ? 0 : parseFloat(num2);
		} else {
			num1 = num1.toString();
			num1 = num1.substring(0, num1.length - 1);
			display.text(num1);
			isNaN(num1) ? 0 : parseFloat(num1);
		}
		if (display.text() === "") display.text("0");
	});
	// It totally resets the calculator
	deleteLast.dblclick(reset);
	$(".light.clear").click(reset);

	// If there's an operator it solves
	$(".orange").click(solveOperation);

	$("body").keypress(function (e) {
		// If there's an operator it solves
		if (e.keyCode == 13 || e.keyCode === 32) solveOperation();
		// Adding numbers by pressing the keyboard
		if (e.keyCode > 47 && e.keyCode < 58) {
			if (operator) {
				num2 += (e.keyCode - 48).toString();
				display.text(num2);
			} else {
				num1 += (e.keyCode - 48).toString();
				display.text(num1);
			}
		}
		if (e.keyCode === 46 || e.keyCode === 44) {
			if (operator) {
				num2 += ".";
				display.text(num2);
			} else {
				num1 += ".";
				display.text(num1);
			}
		}
		// Adding the operator by pressing the proper key
		num1 = parseFloat(num1);
		if (e.keyCode === 43) {
			previous.text(`${num1}+`);
			operator = "+";
		} else if (e.keyCode === 45) {
			previous.text(`${num1}-`);
			operator = "-";
		} else if (e.keyCode === 42) {
			previous.text(`${num1}*`);
			operator = "*";
		} else if (e.keyCode === 47) {
			previous.text(`${num1}/`);
			operator = "/";
		} else if (e.keyCode === 94) {
			previous.text(`${num1}^`);
			operator = "^";
		} else if (e.keyCode === 37) {
			num1 *= 100;
			display.text(`${num1.toString().substr(0, 14)} %`);
		}
	});
});
