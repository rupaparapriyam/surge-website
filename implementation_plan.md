# Implementation Plan: SURGE E-Commerce Store Update (with 'Get Your Routine' Quiz & Assets)

We will modify the SURGE Grooming e-commerce site to match your updated product listing, use the new logo branding everywhere, change the currency to Indian Rupees (₹), and implement a fully interactive **Build Your Own Set** bundle builder page containing a **Get Your Routine** quiz helper, modeled after `based.com`.

> [!IMPORTANT]
> **We will not start building or making any code changes until you give us the explicit instruction to do so.**

---

## Proposed Changes (Task Format)

### Task 1: Rebranding & Aesthetics
- **New Logo Integration:** Update all branding references. We will use the brand graphic from your folder: `SURGE_typography_on_white_backgr…_202607171525.jpeg` (copied as `logo.jpg`) in the header (centered) and footer.
- **Header Navigation Restructuring:**
  - Remove `Ingredients` from the main menu bar.
  - Keep navigation items: `Shop` (active products catalog), `Build a Set` (bundle builder), `Reviews`, and `Upcoming Products` (dropdown).
- **Luxury Entrance Animation:** Rewrite the splash screen CSS to show the new logo, with a clean luxury fade-in/out effect that slides the overlay away to reveal the homepage.
- **Massive Footer Logo:** Re-style the massive typographic "SURGE" logo in the footer to match your branding.

### Task 2: Product Catalog & Restructuring (Using Local Assets)
We will copy the exact product photos from `/Users/priyamrupapara/developer/bussiness 1/surge branding` to your asset directories:
- **Active Products (Sold Now):**
  - **SURGE Leave-in Conditioner** (₹1,299) &mdash; Asset: `White_leave-in_conditioner_tube_202607171526.jpeg`
  - **SURGE Sea Salt Spray** (₹1,199) &mdash; Asset: `Matte_black_sea_salt_spray_202607171526.jpeg`
  - **SURGE Texture Powder** (₹999) &mdash; Asset: `SURGE_texture_powder_bottle_rock_202607171526.jpeg`
  - **SURGE Pomade** (₹899) &mdash; Asset: `Black_pomade_jar_studio_shot_202607171526.jpeg`
  - **SURGE Curl Cream** (₹1,099) &mdash; Asset: `SURGE_curl_cream_jar_studio_202607171526.jpeg`
  - **SURGE Volumizing Mousse** (₹1,199) &mdash; Asset: `Matte_black_volumizing_mousse_can_202607171526.jpeg`
- **Upcoming Products Dropdown:**
  - **Shampoo** &mdash; Asset: `SURGE_shampoo_bottle_on_rock_202607171526.jpeg`
  - **Conditioner** &mdash; Asset: `SURGE_conditioner_bottle_on_log_202607171525.jpeg`
  - **Face Wash** &mdash; Asset: `Matte_black_face_wash_bottle_202607171526.jpeg`
  - **Hair Wax** &mdash; Asset: `Black_hair_wax_jar_202607171526.jpeg`
  - Full dropdown list: Shampoo, Conditioner, Face Wash, Moisturiser, Face Cleanser, Hair Oil, Hair Wax.
- **Remove Homepage Ingredients Section:** Clean up the main page to show only the hero builder, product catalog, reviews, and footer. Keep ingredients strictly under the detail view product tabs.
- **Currency Conversion:** Update all references of `$` to `₹` across the entire app (catalogs, tabs, cart calculations, drawer, checkout totals).

### Task 3: Build Your Own Set Bundle Builder (based.com copy)
- **Interactive Set Builder View:** Build a custom screen representing the based.com bundle builder.
- **Bundle Customizer Logic:**
  - Buyers click "Add to Set" to choose products.
  - Displays selected items in a visual slot deck (e.g., "Slot 1", "Slot 2", "Slot 3") with names and small images.
  - Automatically calculates discounts:
    - Choose 2 items: Save 10%
    - Choose 3+ items: Save 15%
  - Displays original subtotal, discount amount, and the final price in Indian Rupees (₹).
  - Large **Add Set to Cart** or **Buy Now** buttons to check out with the custom set.

### Task 4: 'Get Your Routine' Interactive Quiz (3-4 Questions)
- **Entrance Trigger:** Add a "Get Your Routine" CTA button inside the Set Builder view that launches the quiz modal.
- **Quiz Questions Flow:**
  - **Question 1: What is your hair type?**
    - Straight (Type 1: 1A / 1B / 1C)
    - Wavy (Type 2: 2A / 2B / 2C)
    - Curly (Type 3: 3A / 3B / 3C)
    - Coily / Kinky (Type 4: 4A / 4B / 4C)
  - **Question 2: How would you like to style your hair?**
    - High Volume & Matte Texture (Gravity-defying volume with no shine)
    - Neat, Sleek & Defined Shine (Classic clean look with solid hold)
    - Natural Wave & Beachy Grip (Casual, relaxed hold with light grit)
    - Soft, Hydrated Curls (Defined curls with frizz control and no crunch)
    - Lightweight Lift & Fullness (All-day flexible volume for medium-long hair)
  - **Question 3: What is your hair length?**
    - Short / Cropped (under 2 inches)
    - Medium / Styled (2 to 5 inches)
    - Long (5+ inches)
  - **Question 4: What is your primary hair or scalp concern?**
    - Dryness, frizz, or coarse texture
    - Flat, fine hair lacking volume
    - Excess oil or product buildup
- **Grooming Quiz Recommendation Mapping:**
  - *Quiz will only recommend active market products (no upcoming products).*
  - **Match 1 (Straight/Wavy + Volume/Matte + Short/Medium):** Recommends **Texture Powder** + **Sea Salt Spray** (The Volumizing Matte Duo).
  - **Match 2 (Wavy/Curly + Curls/Hydration + Medium/Long):** Recommends **Curl Cream** + **Leave-in Conditioner** (The Curl Definition Duo).
  - **Match 3 (Straight/Wavy + Sleek/Shine + Short/Medium):** Recommends **Pomade** (The Classic Sleek Routine).
  - **Match 4 (Any type + Volume/Fullness + Medium/Long):** Recommends **Volumizing Mousse** + **Sea Salt Spray** (The Lightweight Volume Routine).
  - **Match 5 (Coily/Dry + Softness/Hydration + Any length):** Recommends **Leave-in Conditioner** + **Curl Cream** (The Intense Hydration Set).
  - **Match 6 (Short/Medium + Volume/Matte + Dry/Oily):** Recommends **Texture Powder** (The Quick Texturizing Routine).
- **Single-Click Add:** A button **"Add Recommended Routine to Set"** will automatically populate the bundle slots with the recommended active products.

### Task 5: Testing & Verification
- Verify checkout calculations for single items, custom sets, and quiz recommendations.
- Test responsive layout on desktop and mobile.
- Verify page transitions and new entrance animation.
