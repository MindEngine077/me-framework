# 🎨 Figma Variables Setup Guide - Semantic Tokens

## 🎯 Goal

Set up your semantic tokens in Figma Variables so they reference core primitives and support theme switching.

---

## 📐 Step-by-Step Setup

### **Step 1: Open Figma Variables Panel**

1. Open je **ME | Variables** file in Figma
2. Klik op het **Variables** icon (⚡) in de rechter sidebar
3. Of gebruik shortcut: `Shift + Cmd/Ctrl + K`

---

### **Step 2: Create Collections Structure**

Maak deze **5 Collections**:

```
📦 Core - Colors        ← Primitives (raw values)
📦 Core - Layout        ← Spacing, sizing, radius
📦 Core - Typography    ← Font families, sizes, weights
📦 Semantic - Colors    ← Aliases (meaning-based)
📦 Semantic - Layout    ← Layout aliases
```

#### **How to create a collection:**

1. Click **"Create collection"** button
2. Name it exactly as above (bijv. `Core - Colors`)
3. Repeat for all 5 collections

---

### **Step 3: Set Up Core - Colors Collection**

**Purpose:** Raw color values (palette)

#### **Color Scales to Create:**

```
📦 Core - Colors
│
├── 📁 brand/
│   ├── 📁 primary/
│   │   ├── 100 = #ffc2cd
│   │   ├── 200 = #f8a7b5
│   │   ├── 300 = #f294a5
│   │   ├── 400 = #db7889
│   │   ├── 500 = #d9697c
│   │   ├── 600 = #df5d74
│   │   ├── 700 = #bc4f62
│   │   ├── 800 = #b04255
│   │   └── 900 = #9c3446
│   │
│   └── 📁 secondary/
│       ├── 100 = #aae7e8
│       ├── 200 = #94d1d2
│       └── ... (same pattern)
│
├── 📁 text/
│   ├── 100 = #fffff8
│   ├── 200 = #fffff5
│   ├── 300 = #fffef0
│   └── ... (100-900 scale)
│
├── 📁 surface/
│   ├── 100 = (lightest)
│   ├── 300 = (light)
│   ├── 600 = (base)
│   └── 900 = (darkest)
│
└── 📁 status/
    ├── 📁 success/
    │   └── 500 = #10b981 (green)
    ├── 📁 error/
    │   └── 500 = #ef4444 (red)
    ├── 📁 warning/
    │   └── 500 = #f59e0b (orange)
    └── 📁 info/
        └── 500 = #3b82f6 (blue)
```

#### **How to create variables:**

1. In `Core - Colors` collection
2. Click **"+"** → **"Create variable"**
3. Name: `brand/primary/100` (use `/` for grouping!)
4. Type: **Color**
5. Value: `#ffc2cd`
6. Repeat for all colors

💡 **Tip:** Use `/` in names to create auto-groups in Figma!

---

### **Step 4: Set Up Core - Layout Collection**

**Purpose:** Spacing, sizing, radius values

```
📦 Core - Layout
│
├── 📁 space/
│   ├── xs = 4px
│   ├── sm = 8px
│   ├── md = 16px
│   ├── lg = 24px
│   ├── xl = 32px
│   ├── 2xl = 48px
│   └── 3xl = 64px
│
├── 📁 radius/
│   ├── xs = 2px
│   ├── sm = 4px
│   ├── md = 8px
│   ├── lg = 12px
│   └── xl = 16px
│
└── 📁 size/
    ├── sm = 32px
    ├── md = 40px
    ├── lg = 48px
    └── xl = 56px
```

#### **How to create:**

1. Variable type: **Number**
2. Name: `space/md`
3. Value: `16`
4. Repeat for all values

---

### **Step 5: Set Up Semantic - Colors Collection** ⭐

**Purpose:** Meaning-based aliases that REFERENCE core colors

#### **Critical: Enable Scoping**

1. Click collection settings (⚙️)
2. Enable **"Scoping"**
3. Select which variables this collection can reference:
   - ✅ Check `Core - Colors`
   - ✅ Check `Core - Layout`

#### **Create Semantic Variables:**

```
📦 Semantic - Colors
│
├── 📁 accent/
│   ├── primary   → {brand/primary/300}    ← REFERENCE!
│   ├── secondary → {brand/secondary/300}
│   ├── hover     → {brand/primary/400}
│   └── active    → {brand/primary/500}
│
├── 📁 text/
│   ├── primary   → {text/100}
│   ├── secondary → {text/300}
│   ├── disabled  → {text/500}
│   └── inverse   → {surface/900}
│
├── 📁 background/
│   ├── base      → {surface/900}
│   ├── raised    → {surface/800}
│   └── overlay   → {surface/700}
│
├── 📁 border/
│   ├── base      → {surface/400}
│   ├── subtle    → {surface/300}
│   ├── focus     → {accent/primary}       ← Can reference other semantic!
│   ├── error     → {status/error/500}
│   └── success   → {status/success/500}
│
└── 📁 semantic/
    ├── success   → {status/success/500}
    ├── error     → {status/error/500}
    ├── warning   → {status/warning/500}
    └── info      → {status/info/500}
```

#### **How to reference variables:**

**Method 1: Via UI**

1. Create variable: `accent/primary`
2. Type: **Color**
3. Click the value field
4. Click **🔗 "Link to variable"** icon
5. Select `Core - Colors` → `brand/primary/300`

**Method 2: Via Expression (Advanced)**

1. Create variable: `border/focus`
2. In value field, type: `{accent/primary}`
3. Figma will auto-complete and link

💡 **This creates the reference chain:**

```
border/focus → accent/primary → brand/primary/300 → #f294a5
```

---

### **Step 6: Set Up Theme Modes** 🌓

**Purpose:** Support Light/Dark themes

#### **In Semantic - Colors collection:**

1. Click collection name → **"Add mode"**
2. Rename **"Mode 1"** → **"Dark"** (default)
3. Add new mode → Name it **"Light"**

#### **Set mode-specific values:**

```
Variable: text/primary

Dark Mode:  {text/100}    ← Light text on dark bg
Light Mode: {text/900}    ← Dark text on light bg

Variable: background/base

Dark Mode:  {surface/900} ← Dark background
Light Mode: {surface/100} ← Light background

Variable: border/base

Dark Mode:  {surface/400} ← Lighter border on dark
Light Mode: {surface/600} ← Darker border on light
```

#### **How to set mode values:**

1. Select variable (e.g., `text/primary`)
2. You'll see columns: **Dark** | **Light**
3. For **Dark**: Link to `{text/100}`
4. For **Light**: Link to `{text/900}`

---

### **Step 7: Apply Variables to Components**

#### **In je Input Component:**

1. Select the input background rectangle
2. In **Fill** property → Click variable icon (⚡)
3. Select `Semantic - Colors` → `background/base`

4. Select the border stroke
5. In **Stroke** property → Click variable icon
6. Select `Semantic - Colors` → `border/base`

7. For placeholder text:
8. **Fill** → `text/secondary`

9. For focused state (create variant):
10. **Stroke** → `border/focus`

#### **Result:**

```
Input Component
├── Fill: {background/base}       ← Semantic!
├── Stroke: {border/base}         ← Semantic!
├── Text: {text/primary}          ← Semantic!
└── Focused variant:
    └── Stroke: {border/focus}    ← Semantic!
```

---

## 🎯 Complete Example: Input Component

### **Figma Variables Used:**

```
Input Component Properties:

Background:
└─ {background/base} → {surface/900} → #0a1319

Border (Default):
└─ {border/base} → {surface/400} → (your value)

Border (Focus):
└─ {border/focus} → {accent/primary} → {brand/primary/300} → #f294a5

Text:
└─ {text/primary} → {text/100} → #fffff8

Placeholder:
└─ {text/secondary} → {text/300} → #fffef0

Height:
└─ {input/layout/height/md} → 48 (from Core - Layout)

Padding:
└─ {space/lg} → 24px (from Core - Layout)
```

---

## ✅ Verification Checklist

Check dat je setup correct is:

- [ ] **5 Collections** created (Core Colors, Core Layout, Core Typography, Semantic Colors, Semantic Layout)
- [ ] **Core variables** have raw values (no references)
- [ ] **Semantic variables** reference core variables (use `{}`)
- [ ] **Scoping** enabled on Semantic collections
- [ ] **Modes** created (Dark/Light) in Semantic - Colors
- [ ] **Mode values** set differently for theme switching
- [ ] **Components** use semantic variables (not core!)
- [ ] **Naming** uses `/` for groups (e.g., `accent/primary`)

---

## 🚀 Quick Tips

### DO:

✅ Use **semantic variables** in components (e.g., `accent/primary`)
✅ Use **`/` in names** for auto-grouping (`brand/primary/300`)
✅ Enable **scoping** so semantic can reference core
✅ Create **modes** for theme switching (Dark/Light)
✅ Add **descriptions** to important variables
✅ Test theme switching with mode selector

### DON'T:

❌ Use core colors directly in components
❌ Create variables without groups (`primary-300` ← bad)
❌ Forget to enable scoping between collections
❌ Skip mode setup if you want theme support
❌ Use hardcoded values in components

---

## 📊 Visual Reference

### Token Flow:

```
Component Property
    ↓ uses
Semantic Variable (accent/primary)
    ↓ references
Core Variable (brand/primary/300)
    ↓ has value
Raw Color (#f294a5)
```

### Mode Switching:

```
Component uses: {text/primary}
                    ↓
Dark Mode:  {text/100} → #fffff8 (white)
Light Mode: {text/900} → #1a1a1a (black)
```

---

## 🔄 Next Steps

### After Figma Setup:

1. **Export variables** via Token Studio plugin
2. **Save to** `src/styles/import/`
3. **Run build:**
   ```bash
   npm run tokens:build
   ```
4. **Use in CSS:**
   ```css
   .me-input {
     background: var(--background-base);
     border-color: var(--border-focus);
   }
   ```

---

## 🆘 Common Issues

### Issue: "Can't reference variable"

**Solution:** Enable **scoping** in collection settings

### Issue: "Theme not switching"

**Solution:** Check mode values are different for each mode

### Issue: "Variables not showing in component properties"

**Solution:** Make sure variable type matches property type (Color → Fill/Stroke, Number → Size/Spacing)

### Issue: "Circular reference error"

**Solution:** Semantic should only reference core, never the other way around

---

## 📚 Resources

- **Figma Variables Docs:** https://help.figma.com/hc/en-us/articles/15339657135383
- **Token Studio:** https://tokens.studio/
- **Your Setup:**
  - Core tokens: `src/styles/import/core_*/`
  - Semantic tokens: `src/styles/import/semantic_*/`
  - Build script: `scripts/build-tokens.js`

---

**Ready to set up your variables in Figma? Follow these steps and you'll have a production-ready design system! 🎨🚀**
