/* ============================================
   L'Oréal Routine Builder — script.js
   --------------------------------------------
   The product catalog lives in products.js (the
   PRODUCTS array), which is loaded before this file.
   ============================================ */

/* ---- Cloudflare Worker endpoint ----
   The Worker holds the OpenAI API key as a secret, so no
   key ever appears in this file. */
const WORKER_URL = "https://white-flower-07a4.jkmungtawng2014.workers.dev/";

/* ============================================
   1. DOM ELEMENTS
   ============================================ */
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const productGrid = document.getElementById("productGrid");
const noResults = document.getElementById("noResults");
const showMoreBtn = document.getElementById("showMoreBtn");

const skinTypeSelect = document.getElementById("skinType");
const concernsBox = document.getElementById("concernsBox");

const selectedList = document.getElementById("selectedList");
const selectedCount = document.getElementById("selectedCount");
const emptySelection = document.getElementById("emptySelection");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");

const routineSection = document.getElementById("routineSection");
const amTab = document.getElementById("amTab");
const pmTab = document.getElementById("pmTab");
const amRoutine = document.getElementById("amRoutine");
const pmRoutine = document.getElementById("pmRoutine");
const routineWarnings = document.getElementById("routineWarnings");
const aiSummary = document.getElementById("aiSummary");
const regenerateBtn = document.getElementById("regenerateBtn");

const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const modalOverlay = document.getElementById("modalOverlay");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

/* ============================================
   2. APP STATE (saved to localStorage)
   ============================================ */

// How many product cards to show before "Show More"
const PAGE_SIZE = 8;
let visibleCount = PAGE_SIZE;

// IDs of products the user selected (loaded from localStorage)
let selectedIds = JSON.parse(localStorage.getItem("selectedIds") || "[]");

// The most recently generated routine (used as chatbot context)
let currentRoutine = null;

/* Save the current selection + preferences to localStorage
   so they survive a page refresh. */
function saveState() {
  localStorage.setItem("selectedIds", JSON.stringify(selectedIds));
  localStorage.setItem("skinType", skinTypeSelect.value);
  localStorage.setItem("concerns", JSON.stringify(getConcerns()));
}

/* Read the checked skin-concern checkboxes into an array. */
function getConcerns() {
  const checked = concernsBox.querySelectorAll("input:checked");
  return Array.from(checked).map((box) => box.value);
}

/* Restore skin type + concerns from localStorage on page load. */
function loadPreferences() {
  skinTypeSelect.value = localStorage.getItem("skinType") || "";
  const savedConcerns = JSON.parse(localStorage.getItem("concerns") || "[]");
  concernsBox.querySelectorAll("input").forEach((box) => {
    box.checked = savedConcerns.includes(box.value);
  });
}

/* Look up a full product object by its id. */
function getProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

/* ============================================
   3. PRODUCT BROWSING (search, filter, cards)
   ============================================ */

/* Return products matching the current search text + category. */
function getFilteredProducts() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  return PRODUCTS.filter((product) => {
    const matchesCategory = !category || product.category === category;

    // Search name, brand, description, and ingredients
    const haystack = `${product.name} ${product.brand} ${product.description} ${product.ingredients.join(" ")}`.toLowerCase();
    const matchesSearch = !search || haystack.includes(search);

    return matchesCategory && matchesSearch;
  });
}

/* Draw the product cards into the grid. */
function renderProducts() {
  const filtered = getFilteredProducts();
  const visible = filtered.slice(0, visibleCount);

  productGrid.innerHTML = "";
  noResults.hidden = filtered.length > 0;

  visible.forEach((product) => {
    const isSelected = selectedIds.includes(product.id);

    const card = document.createElement("div");
    card.className = `product-card ${isSelected ? "selected" : ""}`;
    card.innerHTML = `
      <div class="product-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <span class="product-brand">${product.brand}</span>
      <h3 class="product-name">${product.name}</h3>
      <span class="product-category">${product.category}</span>
      <p class="product-desc">${product.description}</p>
      <div class="card-actions">
        <button class="btn btn-outline details-btn">Details</button>
        <button class="btn ${isSelected ? "btn-outline" : "btn-primary"} toggle-btn">
          ${isSelected ? "Remove" : "Add to Routine"}
        </button>
      </div>
    `;

    // If the photo fails to load, show the emoji icon instead
    const cardImg = card.querySelector(".product-img img");
    cardImg.addEventListener("error", () => {
      cardImg.closest(".product-img").innerHTML =
        `<div class="product-icon">${product.icon}</div>`;
    });

    // Open the details modal
    card.querySelector(".details-btn").addEventListener("click", () => {
      openModal(product.id);
    });

    // Add or remove the product from the selection
    card.querySelector(".toggle-btn").addEventListener("click", () => {
      toggleProduct(product.id);
    });

    productGrid.appendChild(card);
  });

  // Only show "Show More" if there are hidden products left
  showMoreBtn.hidden = filtered.length <= visibleCount;
}

/* Add a product if it's not selected, remove it if it is. */
function toggleProduct(id) {
  if (selectedIds.includes(id)) {
    selectedIds = selectedIds.filter((selectedId) => selectedId !== id);
  } else {
    selectedIds.push(id);
  }
  saveState();
  renderProducts();
  renderSelected();
}

/* ============================================
   4. SELECTED PRODUCTS SECTION
   ============================================ */

function renderSelected() {
  selectedList.innerHTML = "";
  selectedCount.textContent = selectedIds.length;
  emptySelection.hidden = selectedIds.length > 0;

  selectedIds.forEach((id) => {
    const product = getProduct(id);
    if (!product) return;

    const chip = document.createElement("span");
    chip.className = "selected-chip";
    chip.innerHTML = `
      <img class="chip-thumb" src="${product.image}" alt="" />
      ${product.name}
      <button aria-label="Remove ${product.name}">
        <span class="material-icons">close</span>
      </button>
    `;

    // If the thumbnail fails to load, show the emoji instead
    const thumb = chip.querySelector(".chip-thumb");
    thumb.addEventListener("error", () => {
      thumb.replaceWith(document.createTextNode(product.icon));
    });

    chip.querySelector("button").addEventListener("click", () => {
      toggleProduct(id);
    });
    selectedList.appendChild(chip);
  });
}

/* Clear Selected Products button */
clearBtn.addEventListener("click", () => {
  selectedIds = [];
  saveState();
  renderProducts();
  renderSelected();
});

/* ============================================
   5. PRODUCT DETAILS MODAL
   ============================================ */

function openModal(id) {
  const product = getProduct(id);
  const isSelected = selectedIds.includes(id);

  modalBody.innerHTML = `
    <div class="product-img modal-img">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <span class="product-brand">${product.brand}</span>
    <h3>${product.name}</h3>
    <span class="product-category">${product.category}</span>

    <div class="modal-section">
      <h5>Description</h5>
      <p>${product.description}</p>
    </div>
    <div class="modal-section">
      <h5>Key Ingredients</h5>
      <p>${product.ingredients.join(", ")}</p>
    </div>
    <div class="modal-section">
      <h5>Best For Skin Types</h5>
      <p>${product.skinTypes.join(", ")}</p>
    </div>
    <div class="modal-section">
      <h5>Main Benefits</h5>
      <ul>${product.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}</ul>
    </div>
    <div class="modal-section">
      <h5>How To Use</h5>
      <p>${product.usage}</p>
    </div>
    <button class="btn ${isSelected ? "btn-outline" : "btn-primary"}" id="modalToggleBtn">
      ${isSelected ? "Remove from Routine" : "Add to Routine"}
    </button>
  `;

  // If the photo fails to load, show the emoji icon instead
  const modalImg = modalBody.querySelector(".modal-img img");
  modalImg.addEventListener("error", () => {
    modalImg.closest(".modal-img").innerHTML =
      `<div class="product-icon">${product.icon}</div>`;
  });

  // The modal button also adds/removes the product
  modalBody.querySelector("#modalToggleBtn").addEventListener("click", () => {
    toggleProduct(id);
    closeModal();
  });

  modalOverlay.hidden = false;
}

function closeModal() {
  modalOverlay.hidden = true;
}

modalClose.addEventListener("click", closeModal);
// Clicking the dark background also closes the modal
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) closeModal();
});

/* ============================================
   6. ROUTINE GENERATOR (rule-based, uses only
      verified catalog data — never invents products)
   ============================================ */

/* Pick the best product of a category from the user's selection.
   If a skin type is chosen, prefer products that suit it. */
function pickProduct(selectedProducts, category, time) {
  const skinType = skinTypeSelect.value;

  // Products in this category usable at this time of day
  const candidates = selectedProducts.filter(
    (product) =>
      product.category === category &&
      (product.timeOfDay === time || product.timeOfDay === "both")
  );
  if (candidates.length === 0) return null;

  // Prefer a product matching the user's skin type
  const match = candidates.find((product) =>
    product.skinTypes.includes(skinType)
  );
  return match || candidates[0];
}

/* Build the AM and PM routines from the selected products. */
function buildRoutine() {
  const selectedProducts = selectedIds.map(getProduct);

  // Serums and treatments can both fill the "treatment" step
  const pickTreatment = (time) =>
    pickProduct(selectedProducts, "serum", time) ||
    pickProduct(selectedProducts, "treatment", time);

  const am = [
    { label: "Cleanser", product: pickProduct(selectedProducts, "cleanser", "am") },
    { label: "Treatment / Serum", product: pickTreatment("am"), optional: true },
    { label: "Eye Cream", product: pickProduct(selectedProducts, "eye", "am"), optional: true },
    { label: "Moisturizer", product: pickProduct(selectedProducts, "moisturizer", "am") },
    { label: "Sunscreen", product: pickProduct(selectedProducts, "sunscreen", "am") },
  ];

  const pm = [
    { label: "Cleanser", product: pickProduct(selectedProducts, "cleanser", "pm") },
    { label: "Treatment / Serum", product: pickTreatment("pm"), optional: true },
    { label: "Eye Cream", product: pickProduct(selectedProducts, "eye", "pm"), optional: true },
    { label: "Moisturizer", product: pickProduct(selectedProducts, "moisturizer", "pm") },
  ];

  return { am, pm, warnings: buildWarnings(selectedProducts) };
}

/* Check the selection for common ingredient conflicts. */
function buildWarnings(selectedProducts) {
  const warnings = [];
  const hasIngredient = (word) =>
    selectedProducts.some((product) =>
      product.ingredients.join(" ").toLowerCase().includes(word)
    );

  const hasRetinol = hasIngredient("retinol");
  const hasAHA = hasIngredient("glycolic");
  const hasBenzoyl = hasIngredient("benzoyl");
  const hasVitaminC = hasIngredient("vitamin c");

  if (hasRetinol && hasAHA) {
    warnings.push(
      "⚠️ Retinol + glycolic acid can irritate skin. Use them on alternate nights, not together."
    );
  }
  if (hasRetinol && hasBenzoyl) {
    warnings.push(
      "⚠️ Retinol + benzoyl peroxide can be drying and may deactivate each other. Use one in the AM and one in the PM, or on different days."
    );
  }
  if (hasRetinol && hasVitaminC) {
    warnings.push(
      "💡 Tip: use vitamin C in the morning and retinol at night so they don't compete."
    );
  }
  if (hasRetinol || hasAHA) {
    warnings.push(
      "☀️ Retinol and exfoliating acids make skin sun-sensitive — daily sunscreen is a must."
    );
  }
  return warnings;
}

/* Explain WHY a product was recommended for a step. */
function buildReason(product) {
  const skinType = skinTypeSelect.value;
  const concerns = getConcerns();

  let reason = `Recommended because it ${product.benefits[0].toLowerCase()}`;
  if (skinType && product.skinTypes.includes(skinType)) {
    reason += ` and suits ${skinType} skin`;
  }

  // Mention a matching concern when we can
  const concernMap = {
    acne: ["acne", "pores", "breakouts"],
    dryness: ["hydrat", "moistur"],
    "dark spots": ["dark spot", "brighten"],
    "uneven skin tone": ["tone", "brighten"],
    "fine lines": ["fine lines", "wrinkle", "plump"],
    "sensitive skin": ["sooth", "gentle", "barrier"],
  };
  const text = (product.benefits.join(" ") + product.description).toLowerCase();
  const matched = concerns.find((concern) =>
    (concernMap[concern] || []).some((keyword) => text.includes(keyword))
  );
  if (matched) reason += `, which helps with your concern: ${matched}`;

  return reason + ".";
}

/* Draw one routine (AM or PM) into its container. */
function renderRoutineList(steps, container) {
  container.innerHTML = "";
  let stepNumber = 0;

  steps.forEach((step) => {
    // Skip optional steps with no matching product (no card needed)
    if (!step.product && step.optional) return;

    const div = document.createElement("div");

    if (step.product) {
      stepNumber++;
      const product = step.product;
      div.className = "routine-step";
      div.innerHTML = `
        <div class="step-number">${stepNumber}</div>
        <div class="step-body">
          <span class="step-label">${step.label}</span>
          <h4>${product.icon} ${product.name} <small>(${product.brand})</small></h4>
          <p><strong>Benefits:</strong> ${product.benefits.join(", ")}</p>
          <p><strong>How to use:</strong> ${product.usage}</p>
          <p><strong>Why:</strong> ${buildReason(product)}</p>
        </div>
      `;
    } else {
      // Required step with no product — clearly mark it as missing
      div.className = "routine-step missing";
      div.innerHTML = `
        <div class="step-number">!</div>
        <div class="step-body">
          <span class="step-label">${step.label}</span>
          <h4>Missing step</h4>
          <p>You haven't selected a ${step.label.toLowerCase()} yet. Browse the ${step.label.toLowerCase().includes("sunscreen") ? "sunscreens" : "catalog"} above to complete your routine.</p>
        </div>
      `;
    }
    container.appendChild(div);
  });
}

/* Generate the full routine and show the routine section. */
async function generateRoutine() {
  if (selectedIds.length === 0) {
    alert("Please select at least one product first! 🧴");
    return;
  }

  currentRoutine = buildRoutine();

  renderRoutineList(currentRoutine.am, amRoutine);
  renderRoutineList(currentRoutine.pm, pmRoutine);

  // Show any compatibility warnings
  routineWarnings.hidden = currentRoutine.warnings.length === 0;
  routineWarnings.innerHTML = currentRoutine.warnings
    .map((warning) => `<p>${warning}</p>`)
    .join("");

  routineSection.hidden = false;
  routineSection.scrollIntoView({ behavior: "smooth" });

  // Ask the AI for a short personalized summary (with fallback)
  await fetchAiSummary();
}

generateBtn.addEventListener("click", generateRoutine);
regenerateBtn.addEventListener("click", generateRoutine);

/* ---- AM / PM tab switching ---- */
amTab.addEventListener("click", () => {
  amTab.classList.add("active");
  pmTab.classList.remove("active");
  amRoutine.hidden = false;
  pmRoutine.hidden = true;
});

pmTab.addEventListener("click", () => {
  pmTab.classList.add("active");
  amTab.classList.remove("active");
  pmRoutine.hidden = false;
  amRoutine.hidden = true;
});

/* ============================================
   7. AI HELPERS (shared by routine + chatbot)
   ============================================ */

/* Describe the user's selection, preferences, and routine as
   plain text so the AI can use it as context. */
function buildContext() {
  const skinType = skinTypeSelect.value || "not specified";
  const concerns = getConcerns().join(", ") || "not specified";

  const productLines = selectedIds.map((id) => {
    const product = getProduct(id);
    return `- ${product.name} (${product.brand}, ${product.category}). Ingredients: ${product.ingredients.join(", ")}. Benefits: ${product.benefits.join(", ")}. Skin types: ${product.skinTypes.join(", ")}. Usage: ${product.usage}`;
  });

  let context = `USER PROFILE:\n- Skin type: ${skinType}\n- Concerns: ${concerns}\n\nSELECTED PRODUCTS:\n${productLines.length ? productLines.join("\n") : "- none selected yet"}`;

  // Include the generated routine, if there is one
  if (currentRoutine) {
    const describe = (steps) =>
      steps
        .filter((step) => step.product)
        .map((step, index) => `${index + 1}. ${step.label}: ${step.product.name}`)
        .join("; ");
    context += `\n\nGENERATED ROUTINE:\nAM: ${describe(currentRoutine.am) || "none"}\nPM: ${describe(currentRoutine.pm) || "none"}`;
  }
  return context;
}

/* Send a messages array to the Cloudflare Worker and return the
   AI's reply text. Throws an error if anything goes wrong. */
async function callAI(messages) {
  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: messages }),
  });

  const data = await response.json();

  // If the Worker didn't return a normal OpenAI response, fail
  if (!data.choices || !data.choices[0]) {
    throw new Error("Unexpected response from AI service");
  }
  return data.choices[0].message.content;
}

/* Ask the AI for a short personalized note about the routine. */
async function fetchAiSummary() {
  aiSummary.hidden = false;
  aiSummary.textContent = "✨ Writing your personalized routine notes…";

  try {
    const reply = await callAI([
      {
        role: "system",
        content:
          "You are a friendly L'Oréal skincare advisor. You are NOT a dermatologist and must not make medical claims. Only reference the products listed in the context — never invent products.",
      },
      {
        role: "user",
        content: `${buildContext()}\n\nIn 4-6 friendly sentences, explain how this routine works for the user, any tips on order or frequency, and remind them about sunscreen if relevant.`,
      },
    ]);
    aiSummary.textContent = `💬 AI Advisor notes:\n${reply}`;
  } catch (error) {
    // Fallback when the AI service is unavailable
    aiSummary.textContent =
      "💬 AI notes are unavailable right now, but your routine above is ready! Apply products thinnest to thickest, and always finish your morning routine with sunscreen.";
  }
}

/* ============================================
   8. CHATBOT
   ============================================ */

// Conversation history (session only, starts fresh each visit)
const chatHistory = [];

/* Add a chat bubble to the chat window. */
function addBubble(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `msg ${sender}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return bubble;
}

// Friendly greeting when the page loads
addBubble(
  "👋 Hi! I'm your L'Oréal AI Beauty Advisor. Select some products above, then ask me anything — like \"Can I use these together?\" or \"Build me a nighttime routine.\"",
  "ai"
);

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const question = userInput.value.trim();
  if (!question) return;

  addBubble(question, "user");
  chatHistory.push({ role: "user", content: question });

  userInput.value = "";
  sendBtn.disabled = true;

  // Loading indicator while we wait for the AI
  const thinkingBubble = addBubble("Thinking…", "ai");
  thinkingBubble.classList.add("thinking");

  try {
    /* The system prompt is rebuilt every message so it always has
       the LATEST selected products and routine as context. */
    const systemPrompt = `You are the L'Oréal AI Beauty Advisor for a routine-builder app.

${buildContext()}

Rules:
- Use ONLY the verified product information above when discussing the user's products. Never invent products or details.
- You may answer general skincare questions (order of application, ingredient compatibility, frequency, skin types).
- You are NOT a dermatologist. Do not make medical claims; for skin conditions, suggest seeing a professional.
- If asked about unrelated topics (politics, homework, other brands), politely steer back to skincare and L'Oréal products.
- Keep answers warm, clear, and fairly short.`;

    const reply = await callAI([
      { role: "system", content: systemPrompt },
      ...chatHistory,
    ]);

    chatHistory.push({ role: "assistant", content: reply });
    thinkingBubble.textContent = reply;
  } catch (error) {
    // Fallback reply when the AI service is unavailable
    thinkingBubble.textContent =
      "⚠️ I couldn't reach the AI service right now. Quick tips while you wait: cleanse first, apply thinnest to thickest, and use sunscreen every morning. Please try again in a moment!";
  }

  thinkingBubble.classList.remove("thinking");
  sendBtn.disabled = false;
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

/* ============================================
   9. EVENT LISTENERS & STARTUP
   ============================================ */

// Searching or filtering resets the visible count back to one page
searchInput.addEventListener("input", () => {
  visibleCount = PAGE_SIZE;
  renderProducts();
});

categoryFilter.addEventListener("change", () => {
  visibleCount = PAGE_SIZE;
  renderProducts();
});

// Show More reveals another page of products
showMoreBtn.addEventListener("click", () => {
  visibleCount += PAGE_SIZE;
  renderProducts();
});

// Save preferences whenever they change
skinTypeSelect.addEventListener("change", saveState);
concernsBox.addEventListener("change", saveState);

// Initial render
loadPreferences();
renderProducts();
renderSelected();
