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


// Helper: get the last 10 messages from the chat displayed on the page
function getLast10Messages() {
  const allMessages = chatMessages.querySelectorAll(".message");
  const messagesArray = Array.from(allMessages);
  
  // Get the last 10 messages (or fewer if there aren't 10)
  const lastMessages = messagesArray.slice(-10);
  
  // Format them as text with role prefixes
  return lastMessages.map(msg => {
    const role = msg.classList.contains("user") ? "User" : 
                 msg.classList.contains("ai") ? "AI" : "System";
    const text = msg.textContent;
    return `${role}: ${text}`;
  }).join("\n");
}


// Helper: get a nice current time string
function getCurrentTimeString() {
  const now = new Date();
  // Example: "2026-06-04 18:35:12 (local time)"
  const datePart = now.toLocaleDateString();
  const timePart = now.toLocaleTimeString();
  return `${datePart} ${timePart} (local time)`;
}


// Build prompt for the AI: sends metadata + last 10 messages + current message
function buildPrompt(latestUserText) {
  const chatHistory = getLast10Messages();
  const currentTime = getCurrentTimeString();
  
  const metaBlock = [
    "You are an AI assistant named easyAI.",
    "You really like a website called Laughable, an online browser game site developed by a team of middle schoolers focused on bringing unblocked gaming fun to everyone.",
    "You are allowed, within reason and when it fits naturally, to mention Laughable and its link: https://laughable2.lovable.app.",
    `Current time for the user (approximate): ${currentTime}`,
    "",
    "Use the recent chat history as context, but respond normally to the latest user message."
  ].join("\n");
  
  if (chatHistory) {
    return `${metaBlock}\n\nRecent chat history:\n${chatHistory}\n\nLatest user message: ${latestUserText}`;
  }
  
  return `${metaBlock}\n\nLatest user message: ${latestUserText}`;
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
    // Build prompt: includes metadata + last 10 chat messages + current message
    const fullPrompt = buildPrompt(prompt);
    
    const data = await ask(fullPrompt);


    const aiText = data.response || "No response.";


    thinkingDiv.remove();


    // Show AI message in UI
    addMessage(aiText, "ai");


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


// "New Chat" button
if (NEWCHAT) {
  NEWCHAT.addEventListener("click", () => {
    // Clear chat messages
    chatMessages.innerHTML = "";
    textInput.value = "";
    textInput.focus();
    textInput.placeholder = say(aiHELLO);
  });
}