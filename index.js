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

// DOM references
const textInput = document.getElementById("input");
const form = document.getElementById("prompty-prompty");
const typeBox = document.querySelector(".typeee");
const title = document.querySelector("h1");
const chatMessages = document.getElementById("chat-messages");
const NEWCHAT = document.getElementById("NEWCHAT");
const submitButton = form.querySelector(`input[type="submit"]`)

// Initial placeholder
textInput.placeholder = say(aiHELLO);

// Track whether we’ve moved the layout (title up, input down)
let hasMovedLayout = false;

// Helper: append a message div
function addMessage(text, role) {
  const div = document.createElement("div");
  div.classList.add("message", role); // role: "user", "ai", or "system"
  div.textContent = text;
  chatMessages.appendChild(div);
  // auto-scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight; // [web:180][web:184]
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

    const thinkingDiv = document.createElement("div");
    thinkingDiv.classList.add("message", "system");
    thinkingDiv.textContent = "Thinking...";
    chatMessages.appendChild(thinkingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const data = await ask(prompt);

        const aiText = data.response || "No response.";

        thinkingDiv.remove();

        addMessage(aiText, "ai");
    } catch (err) {
        console.error("Error calling backend:", err);
    } finally {
        textInput.disabled = false;
        submitButton.disabled = false;
        textInput.focus();
    }

    textInput.value = "";
    textInput.placeholder = say(more2say);
});

// “New Chat” button reloads the page
if (NEWCHAT) {
  NEWCHAT.addEventListener("click", () => {
    window.location.reload();
  });
}