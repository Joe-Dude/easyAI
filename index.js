// Backend endpoint (Lovable backend)
const API_URL = "https://project--c7237b6a-ebb6-4b56-9707-fca22763621d.lovable.app/api/public/chat";

async function ask(message) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  // You may want to handle non-OK here, but basic version:
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

  try {
    const data = await ask(prompt);
    console.log("Backend response:", data);

    // Adjust this once you know your backend’s exact response shape.
    // For now, try a few common fields and fall back to JSON:
    const aiText =
      data.reply ||
      data.content ||
      data.message ||
      JSON.stringify(data, null, 2);

    responseBox.textContent = aiText;
  } catch (err) {
    console.error("Error calling backend:", err);
    responseBox.textContent = "Error talking to AI.";
  }

  textInput.value = "";
  textInput.placeholder = say(more2say);
  textInput.focus();

  if (!hasMovedLayout) {
    hasMovedLayout = true;
    typeBox.classList.add("fixed-bottom");
    title.classList.add("top-title");
  }
});

// “New Chat” button reloads the page
if (NEWCHAT) {
  NEWCHAT.addEventListener("click", () => {
    window.location.reload();
  });
}