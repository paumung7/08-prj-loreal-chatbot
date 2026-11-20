/* ============================================
   L'Oréal Routine Builder — products.js
   --------------------------------------------
   This file holds our product catalog as a plain
   JavaScript array. It is loaded BEFORE script.js
   in index.html, so script.js can use PRODUCTS.

   All brands here are part of the L'Oréal family:
   L'Oréal Paris, CeraVe, La Roche-Posay, Garnier,
   Vichy, and Kiehl's.

   Each product has:
   - id          : unique number
   - name        : product name
   - brand       : the L'Oréal family brand
   - category    : cleanser | serum | treatment | moisturizer | sunscreen | eye
   - icon        : emoji used as a FALLBACK if the image fails to load
   - image       : official product photo (from the class image library
                   or the brand's own website)
   - description : short real-world description
   - ingredients : key ingredients
   - skinTypes   : which skin types it suits
   - benefits    : main benefits
   - usage       : how to use it
   - timeOfDay   : "am", "pm", or "both"
   ============================================ */

const PRODUCTS = [
  /* ---------- Cleansers ---------- */
  {
    id: 1,
    name: "SkinActive Micellar Cleansing Water All-in-1",
    brand: "Garnier",
    category: "cleanser",
    icon: "💧",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/Garnier_SkinActive_Micellar_Cleansing_Water.png",
    description:
      "A no-rinse micellar water that removes makeup, dirt, and oil while hydrating the skin. No harsh rubbing needed.",
    ingredients: ["Micelles", "Glycerin"],
    skinTypes: ["normal", "dry", "sensitive", "combination"],
    benefits: ["Removes makeup", "Cleanses gently", "Hydrates"],
    usage:
      "Soak a cotton pad and gently wipe over face and eyes. No rinsing required. Use morning and/or night.",
    timeOfDay: "both",
  },
  {
    id: 2,
    name: "Foaming Facial Cleanser",
    brand: "CeraVe",
    category: "cleanser",
    icon: "🫧",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/CeraVe_Foaming_Facial_Cleanser.png",
    description:
      "A gel-based foaming cleanser that removes excess oil without disrupting the skin barrier. Developed with dermatologists.",
    ingredients: ["Ceramides", "Niacinamide", "Hyaluronic Acid"],
    skinTypes: ["normal", "oily", "combination"],
    benefits: ["Removes excess oil", "Non-drying", "Supports skin barrier"],
    usage:
      "Wet skin with lukewarm water, massage cleanser into a foam, and rinse. Use morning and night.",
    timeOfDay: "both",
  },
  {
    id: 3,
    name: "Hydrating Facial Cleanser",
    brand: "CeraVe",
    category: "cleanser",
    icon: "🧴",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/CeraVe_Hydrating_Facial_Cleanser.png",
    description:
      "A creamy, non-foaming cleanser that cleans and hydrates without stripping moisture. Fragrance free.",
    ingredients: ["Ceramides", "Hyaluronic Acid", "Glycerin"],
    skinTypes: ["normal", "dry", "sensitive"],
    benefits: ["Gentle cleansing", "Hydrates", "Restores skin barrier"],
    usage:
      "Massage onto damp skin and rinse with lukewarm water. Use morning and night.",
    timeOfDay: "both",
  },
  {
    id: 4,
    name: "Renewing SA Cleanser",
    brand: "CeraVe",
    category: "cleanser",
    icon: "🌊",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/CeraVe_Renewing_SA_Cleanser.png",
    description:
      "A gentle exfoliating gel cleanser with salicylic acid that smooths rough skin and unclogs pores — without harsh scrubbing grains.",
    ingredients: ["Salicylic Acid", "Ceramides", "Niacinamide", "Hyaluronic Acid"],
    skinTypes: ["normal", "oily", "combination"],
    benefits: ["Exfoliates gently", "Unclogs pores", "Smooths texture"],
    usage:
      "Massage onto wet skin, avoiding the eye area, and rinse thoroughly. Use morning and night.",
    timeOfDay: "both",
  },
  {
    id: 5,
    name: "Toleriane Hydrating Gentle Cleanser",
    brand: "La Roche-Posay",
    category: "cleanser",
    icon: "🥛",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/La_Roche-Posay_Toleriane_Hydrating_Gentle_Cleanser.png",
    description:
      "A creamy, milky cleanser for normal to dry, sensitive skin that cleanses while maintaining moisture.",
    ingredients: ["Ceramide-3", "Niacinamide", "Glycerin"],
    skinTypes: ["normal", "dry", "sensitive"],
    benefits: ["Hydrating cleanse", "Soothes", "Protects skin barrier"],
    usage:
      "Massage onto damp skin in circular motions and rinse. Use morning and night.",
    timeOfDay: "both",
  },

  /* ---------- Serums ---------- */
  {
    id: 6,
    name: "Revitalift Derm Intensives 1.5% Pure Hyaluronic Acid Serum",
    brand: "L'Oréal Paris",
    category: "serum",
    icon: "✨",
    image:
      "https://www.lorealparisusa.com/-/media/project/loreal/brand-sites/oap/americas/us/products/skin-care/facial-moisturizers/revitalift-derm-intensives-pure-hyaluronic-acid-serum/071249377512_t1.png",
    description:
      "A lightweight serum with 1.5% pure hyaluronic acid that plumps skin and visibly reduces fine lines in 2 weeks.",
    ingredients: ["1.5% Hyaluronic Acid"],
    skinTypes: ["normal", "dry", "oily", "combination", "sensitive"],
    benefits: ["Intense hydration", "Plumps skin", "Reduces fine lines"],
    usage:
      "Apply 2–3 drops to clean skin before moisturizer, morning and night.",
    timeOfDay: "both",
  },
  {
    id: 7,
    name: "Revitalift 12% Pure Vitamin C + E + Salicylic Acid Serum",
    brand: "L'Oréal Paris",
    category: "serum",
    icon: "🍊",
    image:
      "https://www.lorealparisusa.com/-/media/project/loreal/brand-sites/oap/americas/us/products/skin-care/face-serums/vitamin-c-vitamin-e-salicylic-acid-serum/3600524053352_t1.png",
    description:
      "A potent 12% pure vitamin C serum with vitamin E and salicylic acid that brightens skin tone and boosts radiance. Best used in the morning under sunscreen.",
    ingredients: ["12% Vitamin C (Ascorbic Acid)", "Vitamin E", "Salicylic Acid"],
    skinTypes: ["normal", "oily", "combination"],
    benefits: ["Brightens", "Evens skin tone", "Antioxidant protection"],
    usage:
      "Apply a few drops to clean skin in the morning before moisturizer and sunscreen.",
    timeOfDay: "am",
  },
  {
    id: 8,
    name: "Minéral 89 Hyaluronic Acid Face Booster",
    brand: "Vichy",
    category: "serum",
    icon: "💎",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/Vichy_Mine%CC%81ral_89_Hyaluronic_Acid_Booster.png",
    description:
      "A daily gel-serum with 89% volcanic mineralizing water and hyaluronic acid that hydrates, plumps, and strengthens the skin barrier.",
    ingredients: ["Vichy Volcanic Water (89%)", "Hyaluronic Acid"],
    skinTypes: ["normal", "dry", "oily", "combination", "sensitive"],
    benefits: ["Deep hydration", "Strengthens skin barrier", "Plumps fine lines"],
    usage:
      "Apply 2 drops to face and neck before moisturizer, morning and night.",
    timeOfDay: "both",
  },
  {
    id: 9,
    name: "Bright Reveal 12% Niacinamide Dark Spot Serum",
    brand: "L'Oréal Paris",
    category: "serum",
    icon: "🌟",
    image:
      "https://www.lorealparisusa.com/-/media/project/loreal/brand-sites/oap/americas/us/products/skin-care/face-serums/bright-reveal-12-niacinamide-amino-sulfonic-ferulic-acid-dark-spot-serum/atf/3600524112073-t1.png",
    description:
      "A dark spot serum with 12% niacinamide, amino sulfonic acid, and ferulic acid that visibly reduces stubborn discoloration and evens tone.",
    ingredients: ["12% Niacinamide", "Amino Sulfonic Acid", "Ferulic Acid"],
    skinTypes: ["normal", "oily", "dry", "combination", "sensitive"],
    benefits: ["Fades dark spots", "Evens skin tone", "Gentle on skin"],
    usage:
      "Apply morning and evening to clean skin before moisturizer. Use sunscreen during the day.",
    timeOfDay: "both",
  },

  /* ---------- Treatments ---------- */
  {
    id: 10,
    name: "Resurfacing Retinol Serum",
    brand: "CeraVe",
    category: "treatment",
    icon: "🌙",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/CeraVe_Resurfacing_Retinol_Serum.png",
    description:
      "An encapsulated retinol serum that smooths texture and fades post-acne marks while supporting the skin barrier.",
    ingredients: ["Encapsulated Retinol", "Ceramides", "Niacinamide", "Licorice Root"],
    skinTypes: ["normal", "oily", "combination"],
    benefits: ["Fades post-acne marks", "Smooths texture", "Refines pores"],
    usage:
      "Apply a pea-sized amount at night to clean, dry skin. Start 2–3 nights per week. Always use sunscreen in the morning.",
    timeOfDay: "pm",
  },
  {
    id: 11,
    name: "Effaclar Duo Dual Action Acne Treatment",
    brand: "La Roche-Posay",
    category: "treatment",
    icon: "🎯",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/La-Roche-Posay-Effaclar-Duo-Dual-Acne-Treatment.jpg",
    description:
      "A dual-action acne treatment with micronized benzoyl peroxide that clears pimples and helps prevent new breakouts.",
    ingredients: ["5.5% Benzoyl Peroxide", "Micro-Exfoliating LHA"],
    skinTypes: ["oily", "combination"],
    benefits: ["Clears acne", "Unclogs pores", "Prevents new breakouts"],
    usage:
      "Apply a thin layer to affected areas once daily, increasing to twice daily if needed. May bleach fabrics.",
    timeOfDay: "both",
  },
  {
    id: 12,
    name: "Bright Reveal Dark Spot Exfoliant Peel",
    brand: "L'Oréal Paris",
    category: "treatment",
    icon: "🧽",
    image:
      "https://www.lorealparisusa.com/-/media/project/loreal/brand-sites/oap/americas/us/products/skin-care/face-serums/bright-reveal-dark-spot-exfoliant-peel/t1.png",
    description:
      "A multi-acid exfoliating peel with glycolic acid that gently resurfaces skin to reveal a brighter, more even-toned complexion.",
    ingredients: ["Glycolic Acid (AHA)", "Lactic Acid", "PHA"],
    skinTypes: ["normal", "combination", "oily"],
    benefits: ["Exfoliates", "Brightens", "Evens texture"],
    usage:
      "Smooth a thin layer over clean skin at night, avoiding the eye area. Start 2–3 nights per week. Use sunscreen the next morning.",
    timeOfDay: "pm",
  },

  /* ---------- Moisturizers ---------- */
  {
    id: 13,
    name: "Revitalift Triple Power Anti-Aging Moisturizer",
    brand: "L'Oréal Paris",
    category: "moisturizer",
    icon: "🧈",
    image:
      "https://www.lorealparisusa.com/-/media/project/loreal/brand-sites/oap/americas/us/products/skin-care/facial-moisturizers/revitalift-triple-power-anti-aging-moisturizer/triple-power-anti-aging-moisturizer/new-assets-2026/071249227916-t1-with-seal.png",
    description:
      "An anti-aging day and night cream with Pro-Retinol, vitamin C, and hyaluronic acid to reduce wrinkles and firm skin.",
    ingredients: ["Pro-Retinol", "Vitamin C", "Hyaluronic Acid"],
    skinTypes: ["normal", "dry", "combination"],
    benefits: ["Reduces wrinkles", "Firms", "Brightens"],
    usage: "Smooth over face and neck morning and night after serums.",
    timeOfDay: "both",
  },
  {
    id: 14,
    name: "Hydra Genius Daily Liquid Care",
    brand: "L'Oréal Paris",
    category: "moisturizer",
    icon: "💦",
    image:
      "https://www.lorealparisusa.com/-/media/project/loreal/brand-sites/oap/americas/us/products/skin-care/facial-moisturizers/hydra-genius-daily-liquid-care-normal-dry-skin/daily-liquid-care-normal-dry-skin/071249339190_t1.png",
    description:
      "A lightweight, water-based liquid moisturizer with aloe water and hyaluronic acid for all-day hydration without heaviness.",
    ingredients: ["Aloe Vera Water", "Hyaluronic Acid"],
    skinTypes: ["normal", "oily", "combination"],
    benefits: ["72-hour hydration", "Lightweight feel", "Healthy glow"],
    usage: "Apply a few drops to face and neck morning and night.",
    timeOfDay: "both",
  },
  {
    id: 15,
    name: "Moisturizing Cream",
    brand: "CeraVe",
    category: "moisturizer",
    icon: "🤍",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/CeraVe_Moisturizing_Cream.png",
    description:
      "A rich, non-greasy cream with three essential ceramides that provides 24-hour hydration and restores the skin barrier.",
    ingredients: ["Ceramides 1, 3, 6-II", "Hyaluronic Acid", "Petrolatum"],
    skinTypes: ["dry", "normal", "sensitive"],
    benefits: ["24-hour hydration", "Restores skin barrier", "Non-comedogenic"],
    usage: "Apply liberally to face and body as often as needed.",
    timeOfDay: "both",
  },
  {
    id: 16,
    name: "PM Facial Moisturizing Lotion",
    brand: "CeraVe",
    category: "moisturizer",
    icon: "🌛",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/CeraVe_PM_Facial_Moisturizing_Lotion.png",
    description:
      "A lightweight night lotion with niacinamide and ceramides that calms skin and locks in moisture overnight.",
    ingredients: ["Niacinamide", "Ceramides", "Hyaluronic Acid"],
    skinTypes: ["normal", "oily", "combination", "sensitive"],
    benefits: ["Calms skin", "Overnight hydration", "Oil-free"],
    usage: "Apply to face in the evening after cleansing and serums.",
    timeOfDay: "pm",
  },
  {
    id: 17,
    name: "Ultra Facial Cream",
    brand: "Kiehl's",
    category: "moisturizer",
    icon: "🛡️",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/Kiehl%27s_Ultra_Facial_Cream.jpg",
    description:
      "An iconic daily moisturizer with squalane and glacial glycoprotein that delivers 24-hour hydration with a light, non-greasy feel.",
    ingredients: ["Squalane", "Glacial Glycoprotein", "Glycerin"],
    skinTypes: ["normal", "dry", "oily", "combination", "sensitive"],
    benefits: ["24-hour hydration", "Strengthens skin barrier", "Lightweight feel"],
    usage: "Apply morning and night after cleansing and serums.",
    timeOfDay: "both",
  },

  /* ---------- Sunscreens ---------- */
  {
    id: 18,
    name: "AM Facial Moisturizing Lotion SPF 30",
    brand: "CeraVe",
    category: "sunscreen",
    icon: "☀️",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/CeraVe_AM_Facial_Moisturizing_Lotion_SPF_30.jpg",
    description:
      "A 2-in-1 morning moisturizer with broad-spectrum SPF 30, ceramides, and niacinamide. Oil-free and non-comedogenic.",
    ingredients: ["SPF 30", "Ceramides", "Niacinamide", "Hyaluronic Acid"],
    skinTypes: ["normal", "oily", "combination", "sensitive"],
    benefits: ["Sun protection", "Hydrates", "Lightweight"],
    usage:
      "Apply generously to face every morning as the last skincare step, 15 minutes before sun exposure.",
    timeOfDay: "am",
  },
  {
    id: 19,
    name: "Anthelios Ultra-Light Fluid Face Sunscreen SPF 60",
    brand: "La Roche-Posay",
    category: "sunscreen",
    icon: "🌞",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/La-Roche-Posay-Anthelios-Ultra-Light-Fluid-Face-Sunscreen-SPF-60.jpg",
    description:
      "An ultra-light, fast-absorbing broad-spectrum SPF 60 fluid sunscreen for the face. Oxybenzone free and water resistant.",
    ingredients: ["SPF 60 Broad Spectrum", "Cell-Ox Shield Technology"],
    skinTypes: ["normal", "dry", "oily", "combination", "sensitive"],
    benefits: ["High sun protection", "Water resistant (80 min)", "Non-greasy matte finish"],
    usage:
      "Apply generously as the final morning step. Reapply at least every 2 hours when outdoors.",
    timeOfDay: "am",
  },

  /* ---------- Eye Care ---------- */
  {
    id: 20,
    name: "Eye Repair Cream",
    brand: "CeraVe",
    category: "eye",
    icon: "👁️",
    image:
      "https://cdn.jsdelivr.net/gh/GCA-Classroom/09-loreal-images/img/CeraVe_Eye_Repair_Cream.png",
    description:
      "A gentle eye cream that visibly reduces dark circles and puffiness while restoring the delicate eye-area barrier.",
    ingredients: ["Ceramides", "Hyaluronic Acid", "Niacinamide", "Marine & Botanical Complex"],
    skinTypes: ["normal", "dry", "oily", "combination", "sensitive"],
    benefits: ["Reduces dark circles", "De-puffs", "Hydrates eye area"],
    usage:
      "Gently dab a small amount around the eye area morning and night.",
    timeOfDay: "both",
  },
  {
    id: 21,
    name: "Age Perfect Rosy Tone Moisturizer",
    brand: "L'Oréal Paris",
    category: "moisturizer",
    icon: "🌸",
    image:
      "https://www.lorealparisusa.com/-/media/project/loreal/brand-sites/oap/americas/us/products/skin-care/facial-moisturizers/age-perfect-rosy-tone-moisturizer-for-mature-dull-skin/rosy-tone-moisturizer-for-mature-dull-skin/071249331262_t1.png",
    description:
      "A day cream with imperial peony and LHA that gently exfoliates and restores a rosy, youthful tone to mature skin.",
    ingredients: ["Imperial Peony Extract", "LHA"],
    skinTypes: ["normal", "dry"],
    benefits: ["Restores rosy tone", "Gently exfoliates", "Hydrates"],
    usage: "Apply every morning and evening over face and neck.",
    timeOfDay: "both",
  },
];
