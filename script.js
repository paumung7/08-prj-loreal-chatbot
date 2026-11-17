/* ========== DOM elements ========== */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const latestQuestion = document.getElementById("latestQuestion");

/* ========== Cloudflare Worker URL ==========
   Replace this with YOUR deployed Worker URL.
   The Worker holds the OpenAI API key as a secret —
   no key ever appears in this frontend code. */
const WORKER_URL = "https://mute-snowflake-2e42.jkmungtawng2014.workers.dev/";

/* ========== System prompt ==========
   This tells the AI who it is and what it is allowed to talk about.
   It politely refuses anything unrelated to L'Oréal / beauty topics. */
const SYSTEM_PROMPT = `You are the L'Oréal Smart Product Advisor, a friendly beauty assistant.

Only answer questions about L'Oréal products, skincare and haircare routines,
makeup, fragrance, and beauty-related recommendations.

If the user asks about anything unrelated to L'Oréal or beauty (like math,
coding, politics, or other brands' products), politely refuse and steer the
conversation back to L'Oréal products and routines. For example:
"I'm sorry, I can only help with L'Oréal products and beauty routines.
Is there a product or routine I can help you find?"

Remember details the user shares (like their name, skin type, or hair type)
and use them to personalize your recommendations. Keep answers friendly,
clear, and concise.`;

/* ========== Conversation history ==========
   We keep every message in this array so the AI remembers the whole
   conversation (names, past questions, etc.). The system prompt is
   always the first message. */
const messages = [{ role: "system", content: SYSTEM_PROMPT }];

/* ========== Helper: add a message bubble to the chat window ========== */
function addMessage(text, sender) {
  // Create a div for the message bubble ("user" or "ai" styling)
  const bubble = document.createElement("div");
  bubble.className = `msg ${sender}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);

  // Scroll to the newest message
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Return the bubble so we can update it later (for the "thinking" message)
  return bubble;
}

/* ========== Initial greeting ========== */
addMessage("👋 Hello! I'm your L'Oréal Smart Product Advisor. Ask me about products, routines, or recommendations!", "ai");

/* ========== Handle form submit ========== */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get the user's question and ignore empty input
  const question = userInput.value.trim();
  if (!question) return;

  // Show the latest question above the chat (resets each time)
  latestQuestion.textContent = question;

  // Show the user's message as a bubble
  addMessage(question, "user");

  // Add the user's message to the conversation history
  messages.push({ role: "user", content: question });

  // Clear the input box
  userInput.value = "";

  // Show a temporary "thinking" bubble while we wait for the API
  const thinkingBubble = addMessage("💭 Thinking…", "ai");

  try {
    // Send the FULL conversation history to the Cloudflare Worker.
    // The Worker adds the API key and forwards the request to OpenAI.
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages }),
    });

    // Read the JSON response from the Worker
    const data = await response.json();

    // Get the AI's reply text
    const reply = data.choices[0].message.content;

    // Replace the "thinking" bubble with the real reply
    thinkingBubble.textContent = reply;

    // Add the AI's reply to the conversation history so it remembers it
    messages.push({ role: "assistant", content: reply });
  } catch (error) {
    // If something goes wrong (bad URL, network issue), show a friendly error
    thinkingBubble.textContent =
      "⚠️ Sorry, something went wrong. Please check your connection and try again.";
  }

  // Scroll to the newest message
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
