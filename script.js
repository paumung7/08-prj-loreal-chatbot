/* ============================================
   L'Oréal Smart Product Advisor — script.js
   ============================================ */

/* ---- DOM elements ---- */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const latestQuestion = document.getElementById("latestQuestion");
const sendBtn = document.getElementById("sendBtn");

/* ---- Cloudflare Worker endpoint ----
   This is the URL of YOUR deployed Cloudflare Worker.
   The Worker holds the OpenAI API key as a secret, so no
   key ever appears in this file. Replace the placeholder
   below with the Worker URL you get after deploying. */
const WORKER_URL = "https://mute-snowflake-2e42.jkmungtawng2014.workers.dev/";

/* ---- System prompt ----
   This guides the AI to ONLY talk about L'Oréal topics and
   politely refuse anything unrelated. */
const SYSTEM_PROMPT = `You are the L'Oréal Smart Product Advisor, a friendly beauty assistant.

You ONLY answer questions about:
- L'Oréal products (makeup, skincare, haircare, fragrance)
- Beauty routines and how to use L'Oréal products
- Personalized product recommendations and beauty advice

Rules:
- If the user asks about anything unrelated to L'Oréal or beauty
  (e.g. math homework, politics, coding, other brands), politely
  refuse and steer the conversation back to L'Oréal products.
  Example refusal: "I'm sorry, I can only help with L'Oréal
  products, routines, and beauty advice!"
- Remember details the user shares (like their name, skin type,
  or hair type) and use them in later answers.
- Keep answers warm, helpful, and fairly short.`;

/* ---- Conversation history ----
   We keep every message (system, user, assistant) in this array
   so the AI remembers the whole conversation — including the
   user's name and past questions. */
const messages = [{ role: "system", content: SYSTEM_PROMPT }];

/* ---- Helper: add a chat bubble to the chat window ----
   "user" bubbles appear on the right, "ai" bubbles on the left. */
function addBubble(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `msg ${sender}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);

  // Always scroll to show the newest message
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return bubble;
}

/* ---- Initial greeting bubble ---- */
addBubble("👋 Hello! I'm your L'Oréal Smart Product Advisor. Ask me about products, routines, or recommendations!", "ai");

/* ---- Handle form submit ---- */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get the user's question and ignore empty input
  const question = userInput.value.trim();
  if (!question) return;

  // Show the latest question above the chat (resets each time)
  latestQuestion.textContent = question;
  latestQuestion.hidden = false;

  // Show the user's message as a bubble
  addBubble(question, "user");

  // Save the user's message to the conversation history
  messages.push({ role: "user", content: question });

  // Clear the input and disable the button while we wait
  userInput.value = "";
  sendBtn.disabled = true;

  // Show a temporary "thinking" bubble
  const thinkingBubble = addBubble("…", "ai");

  // Check if the Worker URL is still the placeholder — if so,
  // show a helpful message instead of trying to fetch.
  if (WORKER_URL.includes("your-subdomain")) {
    thinkingBubble.textContent =
      "🔧 Almost there! Your Cloudflare Worker isn't connected yet. Deploy your Worker on cloudflare.com, then paste its URL into WORKER_URL at the top of script.js.";
    sendBtn.disabled = false;
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return;
  }

  try {
    // Send the FULL conversation history to the Cloudflare Worker.
    // The Worker adds the API key and forwards it to OpenAI.
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages }),
    });

    const data = await response.json();

    // If the Worker is still running the starter code or the key is
    // missing, the response won't have the expected shape — explain why.
    if (!data.choices || !data.choices[0]) {
      thinkingBubble.textContent =
        "🔧 Your Cloudflare Worker responded, but not with an AI answer. Make sure you pasted RESOURCE_cloudflare-worker.js into the Worker's code editor, clicked Deploy, and added your OPENAI_API_KEY secret.";
      sendBtn.disabled = false;
      return;
    }

    // Read the AI's reply from the response
    const reply = data.choices[0].message.content;

    // Save the AI's reply to the history so it has context next time
    messages.push({ role: "assistant", content: reply });

    // Replace the "thinking" bubble with the real reply
    thinkingBubble.textContent = reply;
  } catch (error) {
    // Show a friendly error if something goes wrong
    thinkingBubble.textContent =
      "⚠️ Sorry, something went wrong. Please check your Worker URL and try again.";
  }

  // Re-enable the send button
  sendBtn.disabled = false;
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
