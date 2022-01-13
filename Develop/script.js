// Get references to needed elements
var generateBtn = document.getElementById("generate");
var pwAttributes = document.getElementById("password-attributes");
var passwordText = document.getElementById("password");
var numOfChar = document.getElementById("numOfChar");
var confirmBtn = document.getElementById("confirmBtn");
var checkBoxes = document.querySelectorAll("ul input");
// Default valid character amount entered to false; for later use.
var validCharNum = false;
//Initializing number of password characters to 0 for later use;
var numOfChars = 0;
//Temporary location for the list of characters

// Setting the unordered list style because I don't want to create a CSS file
document.getElementById("dialogList").style.listStyle = "none";
document.getElementById("dialogList").style.display = "none";

// Not displaying confirm button in dialog by default
document.getElementById("confirmBtn").style.visibility = "hidden";

function displayDialogList() {}

// Displays the dialog modal for selecting desired password attributes
function onOpen() {
	if (typeof pwAttributes.showModal === "function") {
		pwAttributes.showModal();
	} else {
		alert("The <dialog> API is not supported by this browser");
	}
}

// If the number of characters is between 8-128, display the checkboxes option list
function onNumValueChange() {
	if (numOfChar.value >= 8 && numOfChar.value <= 128) {
		document.getElementById("dialogList").style.display = "contents";
		validCharNum = true;
	} else {
		document.getElementById("dialogList").style.display = "none";
		validCharNum = false;
	}
}

//Tracks number of checkboxes checked
function getNumChecked() {
	var checkedCount = 0;
	for (var i = 0; i < checkBoxes.length; i++) {
		if (checkBoxes[i].checked) {
			checkedCount++;
		}
	}
	if (checkedCount > 0) {
		//Don't allow generation if no boxes are checked
		document.getElementById("confirmBtn").style.visibility = "visible";
	} else {
		//TODO Logic for password creation here

		//Submit created password for display
		document.getElementById("confirmBtn").style.visibility = "hidden";
	}
}

//Logic for generating password
function generatePassword() {
	var newPW = "";
	var availableLetters = "";
	var numOfChar = document.getElementById("numOfChar").value;
	var lCaseEl = document.getElementById("lCase");
	var uCaseEl = document.getElementById("uCase");
	var number = document.getElementById("number");
	var special = document.getElementById("special");
	var lCaseChars = "abcdefghijklmnopqrstuvwxyz";
	var uCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var numChars = "012345678";
	var specialChars = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
	var randomCharacter;
	var charTypes = 0;

	if (lCaseEl.checked) {
		availableLetters = availableLetters + lCaseChars;
		charTypes = charTypes++;
	}
	if (uCaseEl.checked) {
		availableLetters = availableLetters + uCaseChars;
		charTypes = charTypes++;
	}
	if (number.checked) {
		availableLetters = availableLetters + numChars;
		charTypes = charTypes++;
	}
	if (special.checked) {
		availableLetters = availableLetters + specialChars;
		charTypes = charTypes++;
	}
	for (var i = 0; i < numOfChar; ++i) {
		var randomNumber = Math.floor(Math.random() * availableLetters.length);
		randomCharacter = availableLetters[randomNumber];
		newPW += randomCharacter;
	}

	//Checks to see if at least 1 of each checked character type exists and inserts it if it doesn't
	var randomPWLCaseIndex = false;
	var randomPWUCaseIndex = false;
	var randomPWNumIndex = false;
	var randomPWSpecIndex = false;

	if (lCaseEl.checked) {
		var hasLower = false;
		for (var l in lCaseChars) {
			if (newPW.includes(l)) {
				hasLower = true;
			}
		}
		if (!hasLower) {
			randomPWLCaseIndex = Math.floor(Math.random() * lCaseChars.length);
			var randomLCaseChar = lCaseChars[randomPWLCaseIndex];
			var randomPWIndex = Math.floor(Math.random() * newPW.length);
			newPW[randomPWIndex] = randomLCaseChar;
		}
	}

	if (uCaseEl.checked) {
		var hasUpper = false;
		for (var u in uCaseChars) {
			if (newPW.includes(u)) {
				hasUpper = true;
			}
		}
		if (!hasUpper) {
			randomPWUCaseIndex = Math.floor(Math.random() * uCaseChars.length);
			var randomUCaseChar = uCaseChars[randomPWUCaseIndex];
			var randomPWIndex = Math.floor(Math.random() * newPW.length);
			newPW[randomPWIndex] = randomUCaseChar;
		}
	}
	if (number.checked) {
		var hasNumber = false;
		for (var n in numChars) {
			if (newPW.includes(n)) {
				hasNumber = true;
			}
		}
		if (!hasNumber) {
			randomPWNumIndex = Math.floor(Math.random() * numChars.length);
			var randomNumChar = numChars[randomPWNumIndex];
			var randomPWIndex = Math.floor(Math.random() * newPW.length);
			newPW[randomPWIndex] = randomNumChar;
		}
	}
	if (special.checked) {
		var hasSpecial = false;
		for (var s in specialChars) {
			if (newPW.includes(s)) {
				hasSpecial = true;
			}
		}
		if (!hasSpecial) {
			randomPWLCaseIndex = Math.floor(Math.random() * specialChars.length);
			var randomSpecChar = specialChars[randomPWSpecIndex];
			var randomPWIndex = Math.floor(Math.random() * newPW.length);
			newPW[randomPWIndex] = randomSpecChar;
		}
	}

	console.log(newPW);
	pwAttributes.returnValue = newPW;
}

// Sends the value of the dialog element to the generated password display area
function onClose() {
	passwordText.value = pwAttributes.returnValue;
}

// Event Listeners
generateBtn.addEventListener("click", onOpen);
numOfChar.addEventListener("input", onNumValueChange);

// Checkbox event listeners
for (var i = 0; i < checkBoxes.length; i++) {
	checkBoxes[i].addEventListener("click", getNumChecked);
}

// Generate password and set pwAttributes to that value
confirmBtn.addEventListener("click", generatePassword);

// Display password on dialog close, after cancel or confirm are clicked
pwAttributes.addEventListener("close", onClose);