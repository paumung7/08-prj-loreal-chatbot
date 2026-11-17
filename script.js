/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const latestQuestion = document.getElementById("latestQuestion");

/* Your deployed Cloudflare Worker URL.
   Replace this with the URL Cloudflare gives you after you deploy.
   The Worker holds the OpenAI API key — no key ever goes in this file! */
const WORKER_URL = "https://white-flower-07a4.jkmungtawng2014.workers.dev/";

/* System prompt: tells the AI who it is and what it is allowed to talk about */
const SYSTEM_PROMPT = `You are the L'Oréal Smart Product Advisor, a friendly beauty assistant for L'Oréal.

Only answer questions about:
- L'Oréal products (makeup, skincare, haircare, and fragrances)
- Beauty routines and personalized recommendations using L'Oréal products
- General beauty topics (like skin types or hair care tips) connected back to L'Oréal products

If the user asks about anything unrelated to L'Oréal or beauty, politely refuse and
remind them you can only help with L'Oréal products, routines, and recommendations.

Remember details the user shares (like their name, skin type, or hair type) and use
them to personalize your answers. Keep responses friendly, helpful, and concise.`;

/* Conversation history: starts with the system prompt.
   Every user and assistant message gets added here so the AI
   remembers the whole conversation (names, past questions, etc.) */
const messages = [{ role: "system", content: SYSTEM_PROMPT }];

/* Add a message bubble to the chat window.
   sender is "user" or "ai" — it controls which bubble style is used */
function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `msg ${sender}`;
  // textContent keeps the text safe (it can't run as HTML)
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  // Scroll to the newest message
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return bubble;
}

// Show a friendly greeting when the page loads
addMessage("👋 Hello! I'm your L'Oréal Smart Product Advisor. Ask me about makeup, skincare, haircare, fragrances, or a personalized routine!", "ai");

/* Handle form submit */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get the user's question and ignore empty input
  const question = userInput.value.trim();
  if (!question) return;

  // Show the latest question above the chat (resets each time)
  latestQuestion.textContent = `You asked: ${question}`;
  latestQuestion.hidden = false;

  // Show the user's message as a bubble and save it to the history
  addMessage(question, "user");
  messages.push({ role: "user", content: question });

  // Clear the input box for the next question
  userInput.value = "";

  // Show a temporary "thinking" bubble while we wait for the AI
  const thinkingBubble = addMessage("💭 Thinking…", "ai");

  try {
    // Send the whole conversation history to the Cloudflare Worker
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages }),
    });

    // Turn the response into a JavaScript object
    const data = await response.json();

    // Get the AI's reply text out of the response
    const reply = data.choices[0].message.content;

    // Replace the "thinking" bubble with the real reply
    thinkingBubble.textContent = reply;

    // Save the AI's reply so it stays part of the conversation history
    messages.push({ role: "assistant", content: reply });
  } catch (error) {
    // If something goes wrong (bad URL, no internet, etc.), tell the user
    thinkingBubble.textContent =
      "⚠️ Sorry, something went wrong. Please check the Worker URL and try again.";
  }

  // Scroll to the newest message
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
