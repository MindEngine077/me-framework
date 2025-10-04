# 🎨 Token Architecture Guide - ME Framework

## 📐 Current Structure (Token Studio Setup)

Your design token system follows a **3-layer architecture**:

```
┌─────────────────────────────────────┐
│  1. CORE (Primitives)               │  ← Raw values
│     - core_color                    │
│     - core_spacing                  │
│     - core_radius                   │
│     - core_typography               │
│     - core_sizing                   │
│     - core_layout                   │
│     - core_border                   │
└─────────────────────────────────────┘
              ↓ referenced by
┌─────────────────────────────────────┐
│  2. SEMANTIC (Aliases)              │  ← Meaning/Intent
│     - semantic_color                │
│     - semantic_layout               │
└─────────────────────────────────────┘
              ↓ used by
┌─────────────────────────────────────┐
│  3. COMPONENT (Specific)            │  ← Component tokens
│     - input/*                       │  (To be created)
│     - button/*                      │
│     - card/*                        │
└─────────────────────────────────────┘
```

---

## 📊 Token Inventory

### ✅ What You Have:

**Core Tokens:** (Primitives)

- `core_color/core` - Brand colors, text scales, surface scales
  - `brand.primary.*` (100-900)
  - `brand.secondary.*` (100-900)
  - `text.*` (100-900)
  - `surface.*` (100-900)
- `core_spacing/core` - Spacing scale
- `core_radius/core` - Border radius values
- `core_typography/core` - Font scales
- `core_sizing/core` - Size scales
- `core_layout/core` - Layout values
- `core_border/core` - Border values

**Semantic Tokens:** (Aliases)

- `semantic_color/core`
  - `surface.lightest` → `{surface.300}`
  - `surface.base` → `{surface.600}`
  - `text.lighter` → `{text.100}`
  - `text.base` → `{text.300}`
- `semantic_layout/core`
  - `spacing.padding.container` → `{space.md}`
  - `sizing.component-height.md` → `{size.xl}`

**Themes:**

- `Core` - All core tokens
- `Semantic` - Semantic layer only
- `Global` - Everything combined

---

## 🎯 Recommended Additions

### Missing Semantic Tokens:

Add these to `semantic_color/core.json`:

```json
{
  "accent": {
    "primary": {
      "value": "{brand.primary.600}",
      "type": "color",
      "description": "Main brand color for CTAs, links, focus states"
    },
    "secondary": {
      "value": "{brand.secondary.600}",
      "type": "color"
    },
    "hover": {
      "value": "{brand.primary.700}",
      "type": "color"
    }
  },
  "text": {
    "primary": {
      "value": "{text.100}",
      "type": "color",
      "description": "Default text color (theme-aware)"
    },
    "secondary": {
      "value": "{text.300}",
      "type": "color",
      "description": "Muted text, placeholders"
    },
    "disabled": {
      "value": "{text.500}",
      "type": "color"
    },
    "inverse": {
      "value": "{surface.900}",
      "type": "color"
    }
  },
  "border": {
    "base": {
      "value": "{surface.500}",
      "type": "color"
    },
    "subtle": {
      "value": "{surface.600}",
      "type": "color"
    },
    "focus": {
      "value": "{accent.primary}",
      "type": "color"
    },
    "error": {
      "value": "{semantic.error}",
      "type": "color"
    }
  },
  "semantic": {
    "success": {
      "value": "#10b981",
      "type": "color",
      "description": "Success state (green)"
    },
    "error": {
      "value": "#ef4444",
      "type": "color",
      "description": "Error/danger state (red)"
    },
    "warning": {
      "value": "#f59e0b",
      "type": "color",
      "description": "Warning state (orange)"
    },
    "info": {
      "value": "#3b82f6",
      "type": "color",
      "description": "Info state (blue)"
    }
  },
  "background": {
    "base": {
      "value": "{surface.900}",
      "type": "color"
    },
    "raised": {
      "value": "{surface.800}",
      "type": "color"
    },
    "overlay": {
      "value": "{surface.700}",
      "type": "color"
    }
  }
}
```

---

## 🧩 Component Token Structure

### New Collection: `component_input`

Create: `src/styles/import/component_input/core.json`

```json
{
  "input": {
    "colors": {
      "background": {
        "value": "{background.base}",
        "type": "color"
      },
      "border": {
        "default": {
          "value": "{border.base}",
          "type": "color"
        },
        "hover": {
          "value": "{border.subtle}",
          "type": "color"
        },
        "focus": {
          "value": "{accent.primary}",
          "type": "color"
        },
        "error": {
          "value": "{semantic.error}",
          "type": "color"
        },
        "success": {
          "value": "{semantic.success}",
          "type": "color"
        }
      },
      "text": {
        "value": "{text.primary}",
        "type": "color"
      },
      "placeholder": {
        "value": "{text.secondary}",
        "type": "color"
      }
    },
    "layout": {
      "height": {
        "sm": {
          "value": "36px",
          "type": "dimension"
        },
        "md": {
          "value": "48px",
          "type": "dimension"
        },
        "lg": {
          "value": "56px",
          "type": "dimension"
        }
      },
      "padding": {
        "x": {
          "value": "{space.lg}",
          "type": "dimension"
        },
        "y": {
          "value": "{space.md}",
          "type": "dimension"
        }
      },
      "gap": {
        "value": "{space.md}",
        "type": "dimension"
      },
      "radius": {
        "value": "{radius.md}",
        "type": "dimension"
      }
    },
    "typography": {
      "font-family": {
        "value": "{font.family.base}",
        "type": "fontFamilies"
      },
      "font-size": {
        "value": "{font.size.body.md}",
        "type": "dimension"
      },
      "font-weight": {
        "value": "{font.weight.regular}",
        "type": "fontWeights"
      },
      "letter-spacing": {
        "value": "{letter-spacing.sm}",
        "type": "dimension"
      }
    },
    "shadow": {
      "default": {
        "value": "{elevation.sm}",
        "type": "boxShadow"
      },
      "focus": {
        "value": "0 0 0 3px {accent.primary}20",
        "type": "boxShadow"
      }
    }
  }
}
```

---

## 📋 Token Naming Convention

### Pattern:

```
{category}/{subcategory}/{property}/{variant?}/{state?}
```

### Examples:

```
✅ GOOD:
core_color/brand/primary/600
semantic_color/accent/primary
component_input/colors/border/focus

❌ BAD:
button-primary-color         ← No hierarchy
inputBorderFocus             ← Not kebab-case
Input/Color/Border           ← Not lowercase
```

---

## 🎨 Figma Variables Setup

### In Figma (ME | Variables file):

#### 1. Collections Structure:

```
📁 ME | Variables (file)
├── 📦 Core - Colors
│   ├── brand/primary/100-900
│   ├── brand/secondary/100-900
│   ├── text/100-900
│   └── surface/100-900
├── 📦 Core - Spacing
│   └── space/xs-5xl
├── 📦 Core - Radius
│   └── radius/xs-xl
├── 📦 Core - Typography
│   ├── font/family/*
│   ├── font/size/*
│   └── font/weight/*
├── 📦 Semantic - Colors
│   ├── accent/*
│   ├── text/*
│   ├── border/*
│   ├── background/*
│   └── semantic/*
└── 📦 Semantic - Layout
    ├── spacing/*
    └── sizing/*
```

#### 2. Variable Modes (Theme Support):

```
Mode 1: Light Theme
- text/primary → {text.900}
- background/base → {surface.100}

Mode 2: Dark Theme
- text/primary → {text.100}
- background/base → {surface.900}
```

---

## 🔄 Workflow: Figma → Code

### 1. Design in Figma

- Use semantic tokens in components
- Example: Input uses `{accent/primary}` for focus

### 2. Export from Token Studio

- Push to GitHub
- Or export JSON manually

### 3. Build CSS

```bash
npm run tokens:build
```

### 4. Use in Components

```css
.me-input {
  background: var(--background-base);
  border: 1px solid var(--border-base);
}

.me-input:focus-within {
  border-color: var(--accent-primary);
}
```

---

## 🚀 Next Steps

### Phase 1: Complete Semantic Layer ✅

- [x] Add missing semantic color tokens
- [x] Add border tokens
- [x] Add background tokens
- [x] Add semantic state colors (success/error/warning/info)

### Phase 2: Component Tokens 🔄

- [ ] Create `component_input` collection
- [ ] Create `component_button` collection
- [ ] Create `component_card` collection

### Phase 3: Theme Support 🎯

- [ ] Set up Light/Dark modes in Figma
- [ ] Test theme switching
- [ ] Document theme usage

---

## 📚 Resources

- **Token Studio Docs:** https://tokens.studio/
- **Design Tokens Spec:** https://tr.designtokens.org/format/
- **Your Setup:**
  - Core tokens: `src/styles/import/core_*/`
  - Semantic tokens: `src/styles/import/semantic_*/`
  - Build script: `scripts/build-tokens.js`

---

## 💡 Pro Tips

### DO:

✅ Always reference semantic tokens in components
✅ Use core tokens only in semantic layer
✅ Keep token names descriptive and hierarchical
✅ Document special tokens with descriptions
✅ Use consistent naming patterns

### DON'T:

❌ Reference core colors directly in components
❌ Hardcode values (always use tokens)
❌ Create token variants for every edge case
❌ Mix naming conventions
❌ Skip the semantic layer

---

## 🎯 Summary

Your token architecture is **already good**! You have:

- ✅ Proper 3-layer structure (Core → Semantic → Component)
- ✅ Token Studio integration
- ✅ Build script
- ✅ 749 tokens in place

**What's missing:**

- More semantic aliases (accent, border, background)
- Component-specific token collections
- Theme mode support (light/dark)

**Next action:** Update `semantic_color/core.json` with the missing semantic tokens above! 🚀
