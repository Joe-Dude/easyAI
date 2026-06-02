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
const typeBox = document.querySelector(".typeee");

let hasMovedToBottom = false;

form.addEventListener("submit", function(event) {
  event.preventDefault();

  textInput.value = "";
  textInput.placeholder = say(more2say);
  textInput.focus();

  if (!hasMovedToBottom) {
    hasMovedToBottom = true;
    typeBox.classList.add("fixed-bottom");
  }
});