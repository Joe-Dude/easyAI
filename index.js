const aiHELLO = [
  "Hello there!",
  "Something on ur mind?",
  "Ready when u r!",
  "Bonjoir!",
  "Hola!!!"
];

const more2say = [
  "What's next?",
  "Anything else?",
  "Follow up!"
];

function say(SOMETHING) {
  return SOMETHING[Math.floor(Math.random() * SOMETHING.length)];
}

const textInput = document.getElementById("input");
textInput.placeholder = say(aiHELLO);

const form = document.getElementById("prompty-prompty");
form.addEventListener("submit", function(event) {
  event.preventDefault();

  textInput.value = "";
  textInput.placeholder = say(more2say);
  textInput.focus();
});