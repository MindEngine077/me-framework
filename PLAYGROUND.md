# 📱 Mobile Playground - ULTRA MODE!

## 🚀 De Ultimate Feature!

Een **live mobile preview playground** waar je:

- 📱 Components drag & drop in een iPhone frame
- ✨ Live code editing (HTML/CSS/JS)
- 👀 Direct preview van je wijzigingen
- 💾 Export naar je codebase

## 🎯 Hoe het werkt

### 1. Open de Playground

```bash
# Open playground.html in je browser
open playground.html
```

Of gebruik een local server:

```bash
npx serve
# Dan ga naar: http://localhost:3000/playground.html
```

### 2. Drag & Drop Components

Links zie je alle beschikbare components:

- me-input
- me-header
- me-footnav
- me-button
- icon-grid

**Sleep een component** naar het iPhone scherm in het midden!

### 3. Live Editing

Rechts zie je de code editor met 3 tabs:

- **HTML** - Component markup
- **CSS** - Styling
- **JS** - JavaScript (optional)

**Edit de code** en klik op **"▶️ Apply Changes"** om direct te zien!

### 4. Export naar Codebase

Als je component perfect is:

1. Klik op **"💾 Export to Codebase"**
2. Dit download een `playground-export.json` file
3. Kopieer de HTML/CSS naar je component files in `src/ui/`

## 🎨 Features

### iPhone Frame

- ✨ Realistische iPhone 14 Pro frame
- 🔄 Rotate button (landscape mode)
- ↻ Refresh preview
- ⛶ Fullscreen mode

### Live Preview

- 📱 390x844px (iPhone 14 Pro size)
- 🎨 Dark theme
- ⚡ Instant updates
- 🔥 All your design tokens loaded

### Code Editor

- 🎯 Syntax highlighting
- ⌨️ Tab support
- 📋 Copy to clipboard
- 💾 Export functionality

### Component Library

- 📦 Drag & drop interface
- 🎨 Pre-configured components
- ✨ With example code
- 🔧 Ready to customize

## 💡 Workflow

### Figma → Playground → Codebase

1. **Design in Figma**

   - Create your component
   - Use design tokens

2. **Use AutoHTML plugin**

   - Generate HTML + CSS
   - Copy the code

3. **Paste in Playground**

   - Drag a base component
   - Replace with Figma code
   - Edit & preview live

4. **Export to Codebase**
   - Click "Export"
   - Copy to `src/ui/me-component/`
   - Done! ✅

## 🎬 Quick Start

```bash
# 1. Open playground
open playground.html

# 2. Drag "me-input" to the phone screen

# 3. Edit the HTML in the editor:
<div class="me-input">
  <label>Username</label>
  <input type="text" placeholder="Enter username">
</div>

# 4. Click "Apply Changes"

# 5. See it live in the iPhone frame!

# 6. Export when ready
```

## 🔧 Customization

### Add Your Own Components

Edit `playground.html` and add to the `COMPONENTS` array:

```javascript
const COMPONENTS = [
  {
    name: "my-component",
    title: "My Component",
    desc: "Description here",
    html: `<div class="my-component">HTML here</div>`,
    css: `@import "src/ui/my-component/my-component.css";`,
  },
  // ... more components
];
```

### Change Phone Size

Edit the `.device-frame` CSS:

```css
.device-frame {
  width: 390px; /* iPhone 14 Pro */
  height: 844px;
  /* Change to:
  width: 360px;   For Android
  height: 800px;
  */
}
```

## 📊 Keyboard Shortcuts

- `Ctrl/Cmd + S` - Apply changes (coming soon)
- `Ctrl/Cmd + C` - Copy code (when editor focused)
- `Ctrl/Cmd + Z` - Undo (native browser)

## 🎨 Components Available

| Component  | Description            | Use Case          |
| ---------- | ---------------------- | ----------------- |
| me-input   | Input field with label | Forms             |
| me-header  | App header             | Top navigation    |
| me-footnav | Bottom nav bar         | Mobile navigation |
| me-button  | Interactive button     | Actions           |
| icon-grid  | Icon showcase          | Icons preview     |

## 💡 Pro Tips

### 1. Use Design Tokens

Always use CSS variables:

```css
.my-component {
  padding: var(--space-md, 16px);
  background: var(--accent-primary);
  color: var(--text-100);
}
```

### 2. Test Responsiveness

The phone frame is 390px wide - perfect for mobile-first design!

### 3. Quick Preview

- Drag multiple components
- Build a complete page
- See how they work together

### 4. Export Often

Save your work:

- Export after each major change
- Keep backups of good versions
- Easy to rollback if needed

## 🐛 Troubleshooting

### Components not showing?

Check console (bottom right panel) for errors.

### Styles not applying?

Make sure CSS imports are correct:

```css
@import "src/ui/me-component/me-component.css";
```

### Drag & drop not working?

- Refresh the page
- Check if iframe is loaded
- Try a different browser

## 🚀 Advanced Usage

### Multi-Component Layouts

Build complete pages:

```html
<!-- Header -->
<header class="me-header">...</header>

<!-- Content -->
<main style="padding: 20px;">
  <div class="me-input">...</div>
  <button class="me-button">Submit</button>
</main>

<!-- Footer Nav -->
<nav class="me-footnav">...</nav>
```

### Add Interactivity

Use the JS tab:

```javascript
// Add event listeners
document.querySelector(".me-button").addEventListener("click", () => {
  alert("Button clicked!");
});
```

### Custom Animations

Add to CSS tab:

```css
@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.me-input {
  animation: slideIn 300ms ease;
}
```

## 📱 Phone Frame Specs

- **Device**: iPhone 14 Pro
- **Width**: 390px
- **Height**: 844px
- **Notch**: Included
- **Shadow**: Realistic depth
- **Viewport**: Safe area respected

## 🎉 That's It!

Je hebt nu een **complete playground** om:

- ✅ Components te testen
- ✅ Live te editen
- ✅ Direct te previewing
- ✅ Te exporteren naar je codebase

**Happy building! 🚀**

## 📚 Related Docs

- `WORKFLOW.md` - Figma workflow
- `ENHANCED-SCAFFOLD.md` - Component scaffolding
- `SETUP-COMPLETE.md` - Complete setup guide
- `icons.html` - Icon viewer
