// Get all the text on the page
var allText = document.body.textContent;

// Split the text into phrases at line breaks, full stops, commas, semi-colons, colons and pipes
var phrases = allText.split(/[\n|.|,|;|:|\|]/);

// Initialize an empty array to store the text to be spoken
var textToSpeak = [];

// Loop through the phrases and add them to the textToSpeak array
for (var i = 0; i < phrases.length; i++) {
    if (phrases[i] !== "") {
        textToSpeak.push(phrases[i]);
    }
}

// Initialize the Web Speech API
var speech = new SpeechSynthesisUtterance();

// Set the voice, rate and pitch of the speech
speech.voice = window.speechSynthesis.getVoices()[0];
speech.rate = 1;
speech.pitch = 1;

// Initialize a counter to keep track of the current phrase
var counter = 0;

// Initialize a variable to store the highlighting mode
var highlightMode = "phrase"; // can be "phrase" or "word"

// Function to speak the next phrase
function speakNextPhrase() {
    // Check if there are more phrases to speak
    if (counter < textToSpeak.length) {
        // Get the next phrase and highlight it on the page
        var currentPhrase = textToSpeak[counter];
        if (highlightMode === "phrase") {
            highlightPhrase(currentPhrase);
        } else if (highlightMode === "word") {
            highlightWords(currentPhrase);
        }

        // Set the text of the speech to the current phrase
        speech.text = currentPhrase;

        // Speak the current phrase
        window.speechSynthesis.speak(speech);

        // Increment the counter
        counter++;
    }
}

// Function to highlight a phrase on the page
function highlightPhrase(phrase) {
    // Get all the text on the page
    var allText = document.body.innerHTML;

    // Replace the current phrase with a highlighted version
    var highlightedText = allText.replace(phrase, "<span class='highlight'>" + phrase + "</span>");

    // Update the page with the highlighted text
    document.body.innerHTML = highlightedText;
}

// Function to highlight words in a phrase on the page
function highlightWords(phrase) {
    // Split the phrase into words
    var words = phrase.split(" ");

    // Initialize a variable to store the highlighted phrase
    var highlightedPhrase = "";

    // Loop through the words and add them to the highlighted phrase with a span
    for (var i = 0; i < words.length; i++) {
        highlightedPhrase += "<span class='highlight'>" + words[i] + "</span> ";
    }

    // Get all the text on the page
    var allText = document.body.innerHTML;

    // Replace the current phrase with the highlighted phrase
    var highlightedText = allText.replace(phrase, highlightedPhrase);

    // Update the page with the highlighted text
    document.body.innerHTML = highlightedText;
}
