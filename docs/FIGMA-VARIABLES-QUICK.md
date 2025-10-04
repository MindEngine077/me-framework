# 🎨 Figma Semantic Tokens - Quick Reference

## 🚦 3-Second Rule

**Components use SEMANTIC → Semantic uses CORE → Core has VALUES**

```
❌ Component → Core (WRONG!)
✅ Component → Semantic → Core (CORRECT!)
```

---

## 📋 Collections Structure

```
📦 Core - Colors          Type: Color      Scope: None
📦 Core - Layout          Type: Number     Scope: None
📦 Core - Typography      Type: String     Scope: None
📦 Semantic - Colors      Type: Color      Scope: Core - Colors ✅
📦 Semantic - Layout      Type: Number     Scope: Core - Layout ✅
```

---

## 🎨 Semantic Colors to Create

### Copy-paste deze in Figma:

```
ACCENT (Brand colors for interactive elements)
├─ accent/primary       → {brand/primary/300}
├─ accent/secondary     → {brand/secondary/300}
├─ accent/hover         → {brand/primary/400}
└─ accent/active        → {brand/primary/500}

TEXT (Text colors)
├─ text/primary         → {text/100}      Dark: #fffff8
├─ text/secondary       → {text/300}      Dark: #fffef0
├─ text/disabled        → {text/500}
└─ text/inverse         → {surface/900}

BACKGROUND (Page/surface backgrounds)
├─ background/base      → {surface/900}   Dark: #0a1319
├─ background/raised    → {surface/800}
└─ background/overlay   → {surface/700}

SURFACE (Component backgrounds)
├─ surface/base         → {surface/600}
├─ surface/raised       → {surface/500}
└─ surface/overlay      → {surface/400}

BORDER (Border colors)
├─ border/base          → {surface/400}
├─ border/subtle        → {surface/300}
├─ border/focus         → {accent/primary}
├─ border/error         → {status/error/500}
└─ border/success       → {status/success/500}

SEMANTIC (Status colors)
├─ semantic/success     → {status/success/500}    #10b981 (green)
├─ semantic/error       → {status/error/500}      #ef4444 (red)
├─ semantic/warning     → {status/warning/500}    #f59e0b (orange)
└─ semantic/info        → {status/info/500}       #3b82f6 (blue)
```

---

## 🔧 How to Create Variables

### Method 1: Click UI

1. Collection → **+ Create variable**
2. Name: `accent/primary` (use `/` for groups!)
3. Type: **Color**
4. Value: Click **🔗** → Select `{brand/primary/300}`

### Method 2: Type Reference

1. Name: `border/focus`
2. Value field: Type `{accent/primary}`
3. Figma auto-links ✅

---

## 🌓 Theme Modes Setup

### In Semantic - Colors collection:

1. **Add mode** → Rename to:

   - Mode 1: `Dark` (default)
   - Mode 2: `Light`

2. **Set different values per mode:**

```
Variable          Dark Mode         Light Mode
────────────────────────────────────────────────
text/primary      {text/100}        {text/900}
                  (white)           (black)

background/base   {surface/900}     {surface/100}
                  (dark bg)         (light bg)

border/base       {surface/400}     {surface/600}
                  (light border)    (dark border)
```

---

## 🧩 Component Usage

### ✅ CORRECT:

```
Input Component
├─ Fill: {background/base}        ← Semantic ✅
├─ Stroke: {border/base}          ← Semantic ✅
├─ Text: {text/primary}           ← Semantic ✅
└─ On focus: {border/focus}       ← Semantic ✅
```

### ❌ WRONG:

```
Input Component
├─ Fill: {surface/900}            ← Core ❌
├─ Stroke: #29414e                ← Hardcoded ❌
├─ Text: {text/100}               ← Core ❌
```

---

## ⚡ Quick Actions

### Enable Scoping:

```
Semantic - Colors collection
→ Settings (⚙️)
→ Scoping
→ ✅ Check: Core - Colors
→ ✅ Check: Core - Layout
```

### Test Theme Switching:

```
1. Select component with semantic variables
2. Top right: Mode switcher
3. Switch: Dark ↔ Light
4. Component should change colors automatically ✅
```

### Export to Code:

```
1. Token Studio plugin
2. Push to GitHub
   OR
3. Export JSON → Save to src/styles/import/
4. Run: npm run tokens:build
```

---

## 🎯 Reference Chain Example

```
Component Property: Fill
    ↓ uses
{background/base}           ← Semantic (meaning)
    ↓ references
{surface/900}               ← Core (primitive)
    ↓ has value
#0a1319                     ← Raw color value
```

**Why?** When you rebrand, you only change core values once!

---

## 🚨 Common Mistakes

| ❌ Wrong           | ✅ Right               |
| ------------------ | ---------------------- |
| `primary-300`      | `brand/primary/300`    |
| Component → Core   | Component → Semantic   |
| Hardcode `#f294a5` | Use `{accent/primary}` |
| No scoping         | Enable scoping         |
| One mode only      | Dark + Light modes     |

---

## 📊 Naming Convention

```
{category}/{property}/{variant}/{state}

Examples:
accent/primary              ← Good
brand/primary/300           ← Good
input/colors/border/focus   ← Good (component token)

button-primary-bg           ← Bad (no hierarchy)
accentPrimary               ← Bad (not kebab-case)
ACCENT-PRIMARY              ← Bad (uppercase)
```

---

## 🔗 See Full Guide

For detailed setup: [FIGMA-VARIABLES-SETUP.md](./FIGMA-VARIABLES-SETUP.md)

---

**Last Updated:** October 4, 2025
