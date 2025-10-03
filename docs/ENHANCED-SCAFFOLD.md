# Enhanced Figma Scaffold Script

## 🎯 Features

Dit enhanced script heeft drie belangrijke verbeteringen:

### 1. ✅ State Variants worden meegenomen

Alle state variants (hover, active, disabled, etc.) worden nu automatisch gedetecteerd en als CSS scaffolds gegenereerd.

### 2. 🎨 SVG Icons worden automatisch gedownload

FontAwesome icons en andere iconen worden als SVG bestanden gedownload naar `src/ui/icons/`

### 3. 📦 Slimme variant grouping

Variants worden gegroepeerd per type:

- **State variants**: hover, active, disabled, focus
- **Size variants**: xs, sm, md, lg, xl
- **Type variants**: primary, secondary, ghost, danger
- **Other variants**: custom variants uit Figma

## 🚀 Gebruik

```bash
# Enhanced versie met SVG download en variants
npm run figma:scaffold:enhanced

# Originele versie (zonder SVG download)
npm run figma:scaffold
```

## ⚙️ Configuratie

Edit het `CONFIG` object in `fetch-figma-components-enhanced.js`:

```javascript
const CONFIG = {
  downloadIcons: true, // Download SVG files for icons
  includeVariants: true, // Generate CSS for variants
  maxIconsToShow: 10, // Max icons to show in console
  iconOutputDir: "src/ui/icons", // Where to save icons
};
```

### Icon Patterns

Welke components worden als icons behandeld:

```javascript
const ICON_PATTERNS = [
  /^name-fa7-/i, // FontAwesome icons
  /^house-solid/i, // House icon
];
```

### Skip Patterns

Welke components worden overgeslagen:

```javascript
const SKIP_PATTERNS = [
  /^flags-/i, // Flag icons (269 variants!)
];
```

### Include List

Welke UI components worden gescaffold:

```javascript
const INCLUDE_ONLY = [
  "button",
  "input",
  "input-feedback",
  "header",
  "footer",
  "footnav",
  // ... add more
];
```

## 📋 Resultaat

### UI Components

Voor elk component in `INCLUDE_ONLY` wordt er een folder gemaakt:

```
src/ui/me-button/
├── me-button.html    # HTML template
├── me-button.css     # Styles met variants
└── me-button.js      # Component logic
```

De **CSS file** bevat automatisch:

- Base component styles
- State variant scaffolds (hover, active, etc.)
- Size variant scaffolds (xs, sm, md, lg, xl)
- Type variant scaffolds (primary, secondary, etc.)

Bijvoorbeeld voor een button met variants:

```css
/* State variants */
.me-button-state-hover {
  /* TODO: Add state-hover styles from Figma */
}

.me-button-state-active {
  /* TODO: Add state-active styles from Figma */
}

/* Size variants */
.me-button-size-sm {
  /* TODO: Add size-sm styles from Figma */
}

.me-button-size-lg {
  /* TODO: Add size-lg styles from Figma */
}

/* Type variants */
.me-button-type-primary {
  /* TODO: Add type-primary styles from Figma */
}

.me-button-type-secondary {
  /* TODO: Add type-secondary styles from Figma */
}
```

### SVG Icons

Alle icons worden gedownload naar `src/ui/icons/`:

```
src/ui/icons/
├── name-fa7-solid-times.svg
├── name-fa7-solid-calendar.svg
├── name-fa7-solid-user.svg
└── ... (117 total)
```

## 💡 Workflow

### 1. Sync Figma data

```bash
npm run figma:sync
```

### 2. Scaffold components met variants en icons

```bash
npm run figma:scaffold:enhanced
```

### 3. Check de resultaten

- **UI Components**: `src/ui/me-<component>/`
- **Icons**: `src/ui/icons/`

### 4. Vul de variant styles in

Open bijv. `src/ui/me-button/me-button.css` en vul de TODO's in met styles uit Figma:

```css
/* TODO: Add type-primary styles from Figma */
.me-button-type-primary {
  background: var(--accent-primary);
  color: var(--text-100);
}
```

Of gebruik de **AutoHTML plugin** workflow:

1. Selecteer component in Figma
2. Run AutoHTML plugin
3. Kopieer de generated CSS
4. Plak in je CSS file

## 📊 Stats

Laatste run resultaten:

- ✅ 570 components gevonden in Figma
- ✅ 117 SVG icons gedownload
- ✅ 9 UI components gescaffold
- ✅ 173 components overgeslagen (flags, complex variants)

## 🎨 Icons gebruiken

### In HTML:

```html
<img src="../ui/icons/name-fa7-solid-calendar.svg" alt="Calendar" class="icon" />
```

### Als inline SVG (voor styling):

```html
<svg class="icon icon-calendar">
  <use href="../ui/icons/name-fa7-solid-calendar.svg#icon"></use>
</svg>
```

### CSS styling:

```css
.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.icon-lg {
  width: 32px;
  height: 32px;
}
```

## 🔄 Update workflow

Als je Figma components update:

1. **Sync**: `npm run figma:sync` - Haal laatste data op
2. **Scaffold**: `npm run figma:scaffold:enhanced` - Update components & icons
3. **Build tokens**: `npm run tokens:build` - Update CSS variables
4. **Test**: Open `demo.html` en check je components

## 💡 Tips

1. **Eerste keer**: Run `npm run figma:scaffold:enhanced` - Dit maakt alle folders aan
2. **Updates**: Het script overschrijft **geen** bestaande files (behalve icons)
3. **Icons**: Icons worden altijd opnieuw gedownload (laatste versie)
4. **Variants**: Edit `CONFIG.includeVariants = false` als je geen variant CSS wilt

## 🐛 Troubleshooting

### Icons downloaden niet?

- Check je `FIGMA_TOKEN` in `.env`
- Check of de component visible is in Figma
- Check de console voor error messages

### Te veel variants in CSS?

Edit het script en verklein de slice:

```javascript
stateVariants.slice(0, 3).forEach((v) => {
  // Was: 5
  // ...
});
```

### Component wordt niet gescaffold?

Voeg de component toe aan `INCLUDE_ONLY`:

```javascript
const INCLUDE_ONLY = [
  "button",
  "input",
  "jouw-component", // Add here
];
```

## 📚 Zie ook

- `WORKFLOW.md` - Complete Figma → Code workflow
- `README.md` - Project overview
- `demo.html` - Live component showcase
