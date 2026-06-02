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
  "Hola!!!",
  "How's it going?"
];

const more2say = [
  "What's next?",
  "Anything else?",
  "Follow up!",
  "Blah blah blah"
];

function say(SOMETHING) {
  return SOMETHING[Math.floor(Math.random() * SOMETHING.length)];
}

// DOM references
const textInput = document.getElementById("input");
const form = document.getElementById("prompty-prompty");
const typeBox = document.querySelector(".typeee");
const title = document.querySelector("h1");
const responseBox = document.getElementById("ai-response");
const NEWCHAT = document.getElementById("NEWCHAT");

// Initial placeholder
textInput.placeholder = say(aiHELLO);

// Track whether we’ve moved the layout (title up, input down)
let hasMovedLayout = false;

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const prompt = textInput.value.trim();
  if (!prompt) return;

  // Show “thinking…” in the center
  responseBox.textContent = "Thinking...";
  responseBox.classList.add("visible");

    if (!hasMovedLayout) {
    hasMovedLayout = true;
    typeBox.classList.add("fixed-bottom");
    title.classList.add("top-title");
    }

  try {
    const data = await ask(prompt);
    

    // ✅ Use the actual field from your backend:
    // Backend response: { success: true, response: 'Hello! How can I assist you today?', ... }
    const aiText = data.response || "No response.";

    responseBox.textContent = aiText;
  } catch (err) {
    
    responseBox.textContent = "Error talking to AI.";
  }

  textInput.value = "";
  textInput.placeholder = say(more2say);
  textInput.focus();
});

// “New Chat” button reloads the page
if (NEWCHAT) {
  NEWCHAT.addEventListener("click", () => {
    window.location.reload();
  });
}