const API_URL = "https://project--c7237b6a-ebb6-4b56-9707-fca22763621d.lovable.app/api/public/chat";

async function ask(message) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return res.json();
}

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

const CHAT_KEY = "easyAI_chatHistory";
let chatHistory = JSON.parse(localStorage.getItem(CHAT_KEY)) || [];

function saveHistory() {
  localStorage.setItem(CHAT_KEY, JSON.stringify(chatHistory));
}

function buildPrompt(newUserMessage) {
  const last10 = chatHistory.slice(-10);
  const transcript = last10
    .map(msg => `${msg.role.toUpperCase()}: ${msg.text}`)
    .join("\n");

  return transcript
    ? `${transcript}\nUSER: ${newUserMessage}`
    : `USER: ${newUserMessage}`;
}

const textInput = document.getElementById("input");
const form = document.getElementById("prompty-prompty");
const typeBox = document.querySelector(".typeee");
const title = document.querySelector("h1");
const chatMessages = document.getElementById("chat-messages");
const NEWCHAT = document.getElementById("NEWCHAT");
const submitButton = form.querySelector(`input[type="submit"]`);

textInput.placeholder = say(aiHELLO);

let hasMovedLayout = false;

function addMessage(text, role) {
  const div = document.createElement("div");
  div.classList.add("message", role);
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const prompt = textInput.value.trim();
  if (!prompt) return;

  textInput.disabled = true;
  submitButton.disabled = true;

  if (!hasMovedLayout) {
    hasMovedLayout = true;
    typeBox.classList.add("fixed-bottom");
    title.classList.add("top-title");
  }

  addMessage(prompt, "user");
  chatHistory.push({ role: "user", text: prompt });
  saveHistory();

  const thinkingDiv = document.createElement("div");
  thinkingDiv.classList.add("message", "system");
  thinkingDiv.textContent = "Thinking...";
  chatMessages.appendChild(thinkingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const fullPrompt = buildPrompt(prompt);
    const data = await ask(fullPrompt);

    const aiText = data.response || "No response.";

    thinkingDiv.remove();

    addMessage(aiText, "ai");
    chatHistory.push({ role: "ai", text: aiText });
    saveHistory();
  } catch (err) {
    console.error("Error calling backend:", err);
    thinkingDiv.remove();
    addMessage("Error getting response.", "system");
  } finally {
    textInput.disabled = false;
    submitButton.disabled = false;
    textInput.focus();
  }

  textInput.value = "";
  textInput.placeholder = say(more2say);
});

if (NEWCHAT) {
  NEWCHAT.addEventListener("click", () => {
    chatHistory = [];
    localStorage.removeItem(CHAT_KEY);
    window.location.reload();
  });
}