// Backend endpoint (Lovable backend)
const API_URL = "https://project--c7237b6a-ebb6-4b56-9707-fca22763621d.lovable.app/api/public/chat";

async function ask(message) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return res.json();
}

// Random placeholder lists
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

// REMOVED: Chat history storage (localStorage removed)

// Build prompt for the AI: only sends the user's current message
function buildPrompt(latestUserText) {
  return latestUserText; // Just return what the user typed, nothing else
}

// DOM references
const textInput = document.getElementById("input");
const form = document.getElementById("prompty-prompty");
const typeBox = document.querySelector(".typeee");
const title = document.querySelector("h1");
const chatMessages = document.getElementById("chat-messages");
const NEWCHAT = document.getElementById("NEWCHAT");
const submitButton = form.querySelector(`input[type="submit"]`);

textInput.placeholder = say(aiHELLO);

let hasMovedLayout = false;

// Helper: append a message div
function addMessage(text, role) {
  const div = document.createElement("div");
  div.classList.add("message", role); // "user", "ai", or "system"
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

  // Show user message in UI
  addMessage(prompt, "user");

  const thinkingDiv = document.createElement("div");
  thinkingDiv.classList.add("message", "system");
  thinkingDiv.textContent = "Thinking...";
  chatMessages.appendChild(thinkingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    // Build prompt: only sends the user's current message (no history)
    const fullPrompt = buildPrompt(prompt);
    
    const data = await ask(fullPrompt);

    const aiText = data.response || "No response.";

    thinkingDiv.remove();

    // Show AI message in UI
    addMessage(aiText, "ai");

    // REMOVED: No history saving anymore
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

// REMOVED: "New Chat" button no longer needed (no history to clear)
if (NEWCHAT) {
  NEWCHAT.addEventListener("click", () => {
    // Just clear the input and refocus, no history to reset
    textInput.value = "";
    textInput.focus();
    textInput.placeholder = say(aiHELLO);
  });
}