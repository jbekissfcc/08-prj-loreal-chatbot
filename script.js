// Replace this example address with the URL of your class Cloudflare Worker.
const WORKER_URL = "https://08-prj-loreal-chatbot.james-bekis.workers.dev";

// Find the chat form and the elements used to show and enter messages.
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const sendBtn = document.getElementById("sendBtn");

// Keep successful messages so the assistant can use earlier conversation turns.
const conversationMessages = [];

// Add a message as text so user and assistant messages are displayed safely.
function addMessage(text, className) {
  const message = document.createElement("p");
  message.className = `msg ${className}`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Show a greeting when the page loads.
addMessage("👋 Hello! How can I help you today?", "ai");

// Send each submitted message to the class Cloudflare Worker.
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const messageText = userInput.value.trim();
  if (!messageText) {
    return;
  }

  if (WORKER_URL.includes("your-subdomain")) {
    addMessage(
      "Please add your Cloudflare Worker URL to WORKER_URL in script.js first.",
      "ai",
    );
    return;
  }

  addMessage(messageText, "user");
  userInput.value = "";
  userInput.disabled = true;
  sendBtn.disabled = true;

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          ...conversationMessages,
          { role: "user", content: messageText },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`The Worker returned HTTP ${response.status}.`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      throw new Error(
        data.error?.message || "The Worker returned no assistant reply.",
      );
    }

    conversationMessages.push(
      { role: "user", content: messageText },
      { role: "assistant", content: reply },
    );
    addMessage(reply, "ai");
  } catch (error) {
    console.error("Chat request failed:", error);
    addMessage(
      `Sorry, I couldn't get a reply. ${error.message} Check the Worker URL and try again.`,
      "ai",
    );
  } finally {
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
  }
});
