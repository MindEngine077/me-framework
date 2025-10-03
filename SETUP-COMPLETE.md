# ✅ ME Framework - Complete Setup

## 🎉 Wat je nu hebt

### 🚀 0. **Mobile Playground - ULTRA MODE!** ⚡ NEW!

- ✅ iPhone frame met live preview
- ✅ Drag & drop components
- ✅ Live HTML/CSS/JS editing
- ✅ Export naar codebase

```bash
open playground.html
```

### 1. **Design Tokens System**

- ✅ 749 CSS variabelen uit Token Studio
- ✅ Automatische sync met Figma Variables file
- ✅ Aliases worden automatisch resolved

```bash
npm run tokens:build
```

### 2. **Component Scaffolding - Enhanced!**

- ✅ UI components met variant support
- ✅ 117 SVG icons automatisch gedownload
- ✅ State variants (hover, active, etc.) included
- ✅ Smart filtering (skip flags, group variants)

```bash
npm run figma:scaffold:enhanced
```

### 3. **Figma Sync**

- ✅ Sync beide Figma files (Variables + Components)
- ✅ Backups in `figma-backup/` folder
- ✅ Component overzicht in console

```bash
npm run figma:sync
```

## 📁 Project Structuur

```
me-framework/
├── .env                              # Figma credentials
├── .gitignore                        # Beschermt secrets
├── package.json                      # NPM scripts
│
├── index.html                        # Jouw main app
├── demo.html                         # Component showcase
├── icons.html                        # Icon viewer (NEW!)
│
├── build-tokens.js                   # Token builder
├── sync-figma.js                     # Figma sync (NEW!)
├── fetch-figma-components.js         # Original scaffolder
├── fetch-figma-components-enhanced.js # Enhanced scaffolder (NEW!)
│
├── WORKFLOW.md                       # Workflow documentatie
├── ENHANCED-SCAFFOLD.md              # Enhanced script docs (NEW!)
├── README.md                         # Project overview
│
├── figma-backup/                     # Figma data backups (NEW!)
│   ├── variables-file.json           # 3.8 MB
│   ├── components-file.json          # 31 MB
│   └── components-list.json          # 694 KB
│
└── src/
    ├── styles/
    │   ├── tokens.css                # 749 CSS variables
    │   ├── base.css
    │   ├── theme-dark.css
    │   └── import/                   # Token Studio JSON
    │
    └── ui/
        ├── icons/                    # SVG icons (NEW!)
        │   ├── name-fa7-solid-times.svg
        │   ├── name-fa7-solid-calendar.svg
        │   └── ... (117 total)
        │
        ├── me-header/
        │   ├── me-header.html
        │   ├── me-header.css         # Met variants!
        │   └── me-header.js
        │
        ├── me-input/
        ├── me-button/
        └── ... (9 components)
```

## 🚀 Complete Workflow

### 1️⃣ Sync alles uit Figma

```bash
npm run figma:sync
```

Dit haalt op:

- ME | Variables file → Design tokens
- ME | Components file → Component structure
- Backups van alles

### 2️⃣ Bouw tokens naar CSS

```bash
npm run tokens:build
```

Genereert:

- `src/styles/tokens.css` met 749 variabelen
- Resolved aliases (bijv. `{color.primary}` → `var(--color-primary)`)

### 3️⃣ Scaffold components + download icons

```bash
npm run figma:scaffold:enhanced
```

Maakt:

- Component folders met HTML/CSS/JS
- CSS scaffolds voor alle variants
- 117 SVG icon downloads

### 4️⃣ Bekijk de resultaten

- **Components**: Open `demo.html` in je browser
- **Icons**: Open `icons.html` in je browser
- **Tokens**: Check `src/styles/tokens.css`

## 💡 Jouw Workflow: AutoHTML Plugin

### Stap 1: Design in Figma

1. Ontwerp component in **ME | Components**
2. Gebruik tokens uit **ME | Variables**

### Stap 2: Export met AutoHTML

1. Selecteer component in Figma
2. Open **AutoHTML** plugin
3. Genereer HTML + CSS
4. Kopieer de code

### Stap 3: Plak in je component

1. Open `src/ui/me-component/me-component.html`
2. Plak HTML van AutoHTML
3. Open `src/ui/me-component/me-component.css`
4. Plak CSS **boven** de imports
5. Vervang hardcoded values met tokens waar mogelijk

### Stap 4: Test

1. Open `demo.html`
2. Test component
3. Check responsive gedrag

## 📋 NPM Scripts Overzicht

| Command                           | Functie                                   |
| --------------------------------- | ----------------------------------------- |
| `npm run figma:sync`              | Sync beide Figma files, maak backups      |
| `npm run tokens:build`            | Bouw CSS variabelen uit Token Studio JSON |
| `npm run figma:scaffold`          | Original scaffolder (zonder icons)        |
| `npm run figma:scaffold:enhanced` | Enhanced: met variants & icon download    |

## 🎨 Icon Gebruik

### HTML:

```html
<img src="src/ui/icons/name-fa7-solid-calendar.svg" alt="Calendar" class="icon" />
```

### Met styling:

```html
<svg class="icon">
  <use href="src/ui/icons/name-fa7-solid-calendar.svg"></use>
</svg>
```

```css
.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}
```

### Icon viewer:

Open `icons.html` in je browser om alle 117 icons te zien met search functie!

## 🎯 Wat nu?

### 1. Check de icons

```bash
# Open in browser
open icons.html
```

### 2. Bekijk een component met variants

Open `src/ui/me-header/me-header.css` en zie de gegenereerde variant scaffolds:

```css
/* State variants */
.me-header-state-hover {
  /* TODO: Add state-hover styles from Figma */
}

/* Size variants */
.me-header-size-lg {
  /* TODO: Add size-lg styles from Figma */
}
```

### 3. Vul de variants in

Gebruik je AutoHTML workflow:

1. Selecteer variant in Figma
2. Run AutoHTML plugin
3. Kopieer CSS
4. Plak in de juiste variant class

### 4. Bouw je app

Gebruik de components in `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="src/styles/tokens.css" />
    <link rel="stylesheet" href="src/styles/base.css" />
    <link rel="stylesheet" href="src/ui/me-header/me-header.css" />
  </head>
  <body>
    <div class="me-header">
      <img src="src/ui/icons/name-fa7-solid-house.svg" class="icon" />
      <span>Home</span>
    </div>
  </body>
</html>
```

## 🔧 Configuratie

### Enhanced scaffold aanpassen

Edit `fetch-figma-components-enhanced.js`:

```javascript
const CONFIG = {
  downloadIcons: true, // SVG download aan/uit
  includeVariants: true, // Variant CSS aan/uit
  maxIconsToShow: 10, // Max icons in console
  iconOutputDir: "src/ui/icons", // Icon locatie
};

// Voeg meer components toe:
const INCLUDE_ONLY = [
  "button",
  "input",
  "jouw-nieuwe-component", // Add here!
];

// Voeg meer icon patterns toe:
const ICON_PATTERNS = [
  /^name-fa7-/i,
  /^jouw-icon-prefix/i, // Add here!
];
```

## 📊 Stats

- ✅ **570 Figma components** gevonden
- ✅ **117 SVG icons** gedownload
- ✅ **9 UI components** gescaffold
- ✅ **749 design tokens** beschikbaar
- ✅ **3 Figma files** synced (Variables + Components)

## 🎉 Klaar!

Je hebt nu een complete design system setup met:

- ✅ Automatic Figma sync
- ✅ Design token management
- ✅ Component scaffolding met variants
- ✅ Automatic SVG icon download
- ✅ Icon viewer
- ✅ Component showcase

**Happy coding! 🚀**

## 📚 Documentatie

- `README.md` - Project overview
- `WORKFLOW.md` - AutoHTML plugin workflow
- `ENHANCED-SCAFFOLD.md` - Enhanced script details
- `demo.html` - Live component demo
- `icons.html` - Icon viewer met search

## 🐛 Problemen?

Check de docs:

- ENHANCED-SCAFFOLD.md voor troubleshooting
- WORKFLOW.md voor workflow tips
- .env voor credentials

Of run de sync opnieuw:

```bash
npm run figma:sync
npm run tokens:build
npm run figma:scaffold:enhanced
```
