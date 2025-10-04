# 🎨 Token Setup - Visual Diagram

## �️ Figma File Organization

### Recommended Structure

```
┌─────────────────────────────────────────────────────────────┐
│                   FIGMA WORKSPACE                           │
│                                                             │
│  📄 ME | Variables                                          │
│  ├─ Core - Colors (primitives)                             │
│  ├─ Core - Layout (spacing, sizing)                        │
│  ├─ Core - Typography (fonts, sizes)                       │
│  ├─ Semantic - Colors (with modes: Dark/Light)             │
│  └─ Semantic - Layout                                      │
│      │                                                      │
│      │ linked by (Team Library)                            │
│      ↓                                                      │
│  📄 ME | Components                                         │
│  ├─ Input (uses variables from ME | Variables)             │
│  ├─ Button                                                 │
│  ├─ Card                                                   │
│  ├─ Header                                                 │
│  └─ FootNav                                                │
│      │                                                      │
│      │ linked by (Team Library)                            │
│      ↓                                                      │
│  📄 ME | Pages                                              │
│  ├─ Home (uses components from ME | Components)            │
│  ├─ Demo                                                   │
│  └─ Playground                                             │
└─────────────────────────────────────────────────────────────┘
```

### Why Separate Files?

| Aspect        | Single File ❌        | Separate Files ✅  |
| ------------- | --------------------- | ------------------ |
| Organization  | Messy, hard to find   | Clean, focused     |
| Performance   | Slow with 100+ items  | Fast loading       |
| Collaboration | Conflicts, confusion  | Clear ownership    |
| Token Export  | Export everything     | Export tokens only |
| Versioning    | Hard to track changes | Clear change scope |
| Team Library  | All or nothing        | Granular sharing   |

### How to Link Files

1. **Publish Variables** (in ME | Variables):

   ```
   ME | Variables file → Assets Panel → Team Library icon
   → Publish → "Published token system"
   ```

2. **Use in Components** (in ME | Components):

   ```
   ME | Components file → Assets Panel → Libraries icon
   → Enable "ME | Variables" library
   → Variables now available in dropdown!
   ```

3. **Use Components** (in ME | Pages):
   ```
   ME | Pages file → Assets Panel → Libraries icon
   → Enable "ME | Components" library
   → Drag components from Assets panel
   ```

---

## �📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FIGMA VARIABLES                          │
│                                                                 │
│  ┌──────────────────┐     ┌──────────────────┐                │
│  │  Core - Colors   │     │  Core - Layout   │                │
│  │                  │     │                  │                │
│  │  brand/primary/  │     │  space/xs  = 4   │                │
│  │  100 = #ffc2cd   │     │  space/sm  = 8   │                │
│  │  300 = #f294a5   │     │  space/md  = 16  │                │
│  │  900 = #9c3446   │     │  space/lg  = 24  │                │
│  │                  │     │                  │                │
│  │  text/           │     │  radius/sm = 4   │                │
│  │  100 = #fffff8   │     │  radius/md = 8   │                │
│  │  300 = #fffef0   │     │  radius/lg = 12  │                │
│  │  900 = #1a1a1a   │     │                  │                │
│  │                  │     │  size/md   = 40  │                │
│  │  surface/        │     │  size/lg   = 48  │                │
│  │  100 = lightest  │     │  size/xl   = 56  │                │
│  │  900 = darkest   │     │                  │                │
│  └──────────────────┘     └──────────────────┘                │
│           │                         │                          │
│           └─────────┬───────────────┘                          │
│                     │ referenced by                            │
│                     ↓                                          │
│  ┌──────────────────────────────────────────────┐             │
│  │         Semantic - Colors (Dark Mode)        │             │
│  │                                              │             │
│  │  accent/primary    → {brand/primary/300}    │             │
│  │  accent/hover      → {brand/primary/400}    │             │
│  │                                              │             │
│  │  text/primary      → {text/100}   #fffff8   │             │
│  │  text/secondary    → {text/300}   #fffef0   │             │
│  │                                              │             │
│  │  background/base   → {surface/900} #0a1319  │             │
│  │  background/raised → {surface/800}          │             │
│  │                                              │             │
│  │  border/base       → {surface/400}          │             │
│  │  border/focus      → {accent/primary}       │             │
│  │  border/error      → {status/error/500}     │             │
│  │                                              │             │
│  │  semantic/success  → {status/success/500}   │             │
│  │  semantic/error    → {status/error/500}     │             │
│  └──────────────────────────────────────────────┘             │
│                     │ used by                                 │
│                     ↓                                          │
│  ┌──────────────────────────────────────────────┐             │
│  │            COMPONENTS                         │             │
│  │                                              │             │
│  │  Input Component                             │             │
│  │  ├─ Fill: {background/base}                  │             │
│  │  ├─ Stroke: {border/base}                    │             │
│  │  ├─ Text: {text/primary}                     │             │
│  │  └─ Focus: {border/focus}                    │             │
│  │                                              │             │
│  │  Button Component                            │             │
│  │  ├─ Fill: {accent/primary}                   │             │
│  │  ├─ Text: {text/inverse}                     │             │
│  │  └─ Hover: {accent/hover}                    │             │
│  └──────────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Theme Switching

```
┌─────────────────────────────────────────────────────────────┐
│              Semantic - Colors (Multi-Mode)                 │
│                                                             │
│  Variable          │  Dark Mode       │  Light Mode        │
│  ─────────────────────────────────────────────────────────  │
│  text/primary      │  {text/100}      │  {text/900}        │
│                    │  white #fffff8   │  black #1a1a1a     │
│                    │                  │                    │
│  background/base   │  {surface/900}   │  {surface/100}     │
│                    │  dark #0a1319    │  light #f5f5f5     │
│                    │                  │                    │
│  border/base       │  {surface/400}   │  {surface/600}     │
│                    │  subtle          │  strong            │
└─────────────────────────────────────────────────────────────┘

Component automatically switches when mode changes! 🎨
```

---

## 🧩 Component Token Layer (Optional)

```
┌────────────────────────────────────────────────────────────┐
│             Component - Input (Token File)                 │
│                                                            │
│  input/colors/background     → {background/base}          │
│  input/colors/border/default → {border/base}              │
│  input/colors/border/focus   → {border/focus}             │
│  input/colors/text           → {text/primary}             │
│  input/colors/placeholder    → {text/secondary}           │
│                                                            │
│  input/layout/height/md      → 48px                       │
│  input/layout/padding/x      → {space/lg}                 │
│  input/layout/gap            → {space/md}                 │
│  input/layout/radius         → {radius/md}                │
└────────────────────────────────────────────────────────────┘
         │ used by
         ↓
┌────────────────────────────────────────────────────────────┐
│              Input Component (Figma)                       │
│                                                            │
│  ┌──────────────────────────────────────────────┐         │
│  │  [icon]  Placeholder text...         [icon]  │         │
│  └──────────────────────────────────────────────┘         │
│                                                            │
│  Properties:                                              │
│  • Fill: {input/colors/background}                        │
│  • Stroke: {input/colors/border/default}                  │
│  • Text: {input/colors/text}                              │
│  • Height: {input/layout/height/md}                       │
└────────────────────────────────────────────────────────────┘
```

---

## 🎯 Token Flow Example

### When you use `{border/focus}` in a component:

```
Component Stroke Property
    ↓ uses
{border/focus}                    ← Semantic (intent)
    ↓ references
{accent/primary}                  ← Semantic (brand)
    ↓ references
{brand/primary/300}               ← Core (primitive)
    ↓ has value
#f294a5                           ← Raw hex color

Total chain: Component → Semantic → Semantic → Core → Value
```

### Why this works:

```
Need to rebrand?
└─ Change 1 value: brand/primary/300 = #NEW_COLOR
   └─ ALL components update automatically! ✨

Need dark/light theme?
└─ Change mode values in semantic layer
   └─ ALL components adapt! 🌓
```

---

## 🔧 Setup Steps Visual

```
Step 1: Create Collections
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Core Colors  │  │ Core Layout  │  │  Semantic    │
│              │  │              │  │   Colors     │
│ Raw values   │  │ Spacing,     │  │              │
│ No refs      │  │ sizing       │  │ References   │
└──────────────┘  └──────────────┘  └──────────────┘

Step 2: Add Variables
Core Colors:              Semantic Colors:
├─ brand/primary/300     ├─ accent/primary → {brand/primary/300}
├─ text/100              ├─ text/primary → {text/100}
└─ surface/900           └─ border/focus → {accent/primary}

Step 3: Enable Scoping
Semantic Collections → Settings → Scoping
└─ ✅ Can reference: Core - Colors, Core - Layout

Step 4: Add Modes
Semantic - Colors
├─ Mode: Dark (default)
└─ Mode: Light
    └─ Set different values per mode

Step 5: Apply to Components
Component Property
└─ Click ⚡ variable icon
    └─ Select semantic variable ✅
```

---

## ✅ Quick Check

```
✓ Collections created in correct order
✓ Core has raw values (no references)
✓ Semantic references core (uses {})
✓ Scoping enabled on semantic collections
✓ Modes set up (Dark/Light)
✓ Components use semantic (not core!)
✓ Names use `/` for grouping
```

---

## 🚀 Result

```
BEFORE                          AFTER
──────────────────────────────────────────────────────
Hardcoded colors               → Token references ✅
No theme support               → Dark/Light modes ✅
Manual updates needed          → Auto-propagation ✅
Inconsistent values            → Single source ✅
Hard to rebrand                → Change once ✅
```

---

## � Quick Start: File Setup

### Step 1: Create Files

```
1. Create new file: "ME | Variables"
   → Add description: "Design tokens only - Core & Semantic"

2. Create new file: "ME | Components"
   → Add description: "UI components using ME | Variables"

3. Create new file: "ME | Pages"
   → Add description: "Page templates using ME | Components"
```

### Step 2: Setup Variables File

```
In "ME | Variables":
1. Create collections (use FIGMA-VARIABLES-SETUP.md)
2. Add all 795 tokens
3. Configure modes (Dark/Light)
4. Publish to Team Library
```

### Step 3: Link Components File

```
In "ME | Components":
1. Open Assets panel
2. Click Libraries icon (book)
3. Enable "ME | Variables"
4. Variables now available in variable picker!
5. Build components using variables
6. Publish to Team Library
```

### Step 4: Link Pages File

```
In "ME | Pages":
1. Open Assets panel
2. Enable "ME | Components" library
3. Enable "ME | Variables" library (optional, for direct access)
4. Drag components from Assets
5. Build pages
```

---

## 📋 Checklist

```
□ Created 3 separate Figma files
□ ME | Variables has all 795 tokens
□ ME | Variables is published to Team Library
□ ME | Components can access variables
□ ME | Components uses semantic tokens (not core!)
□ ME | Components is published to Team Library
□ ME | Pages can access components
□ Theme switching works across all files
```

---

## 💡 Pro Tips

**Naming Convention:**

```
ME | Variables     ← Design system foundation
ME | Components    ← Reusable UI building blocks
ME | Pages         ← Application templates
ME | [Feature]     ← Feature-specific work files
```

**When to Create New Files:**

- Variables & Components: Keep stable, rarely change
- Pages: Create per project/feature
- Prototypes: Create temporary files, link to Components

**Team Library Best Practices:**

```
Always Publish:
└─ ME | Variables (everyone needs tokens)
└─ ME | Components (everyone needs UI blocks)

Rarely Publish:
└─ ME | Pages (usually project-specific)
```

---

## �📚 Related Docs

- **Full Setup:** [FIGMA-VARIABLES-SETUP.md](./FIGMA-VARIABLES-SETUP.md)
- **Quick Ref:** [FIGMA-VARIABLES-QUICK.md](./FIGMA-VARIABLES-QUICK.md)
- **Architecture:** [TOKEN-ARCHITECTURE.md](./TOKEN-ARCHITECTURE.md)
- **Workflow:** [FIGMA-INPUT-WORKFLOW.md](./FIGMA-INPUT-WORKFLOW.md)

---

**Now you're ready to set up semantic tokens in Figma! 🎨✨**
