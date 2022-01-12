// Get references to needed elements
var generateBtn = document.getElementById("generate");
var pwAttributes = document.getElementById("password-attributes");
var passwordText = document.getElementById("password");
var numOfChar = document.getElementById("numOfChar");
var confirmBtn = document.getElementById("confirmBtn");
var checkBoxes = document.querySelectorAll("ul input");
// Default valid character amount entered to false; for later use.
var validCharNum = false;
//Temporary location for the list of special characters
var specialChars = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";

// Setting the unordered list style because I don't want to create a CSS file
document.getElementById("dialogList").style.listStyle = "none";
document.getElementById("dialogList").style.display = "none";

// Not displaying confirm button in dialog by default
document.getElementById("confirmBtn").style.visibility = "hidden";

function displayDialogList() {
  var numOfChar = document.getElementById("numOfChar").value;
	var lCaseEl = document.getElementById("lCase");
	var uCaseEl = document.getElementById("uCase");
	var number = document.getElementById("number");
	var special = document.getElementById("special");
}

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
  }
  else {
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
      console.log(checkedCount);
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

// Sends the value of the dialog element to the generated password display area
function onClose() {
	passwordText.value = pwAttributes.returnValue;
}

// Event Listeners
generateBtn.addEventListener("click", onOpen);
numOfChar.addEventListener("input", onNumValueChange)

// Checkbox event listeners
for (var i = 0; i < checkBoxes.length; i++) {
	checkBoxes[i].addEventListener("click", getNumChecked);
}

// Display password on dialog confirm
pwAttributes.addEventListener("close", onClose);
