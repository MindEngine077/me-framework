# ME Framework - Figma Design System

## ✅ Setup Complete!

Your design system is now successfully connected to Figma with a clean, maintainable structure.

## 📊 What You Have Now

- **749 Design Tokens** generated from Token Studio
- **9 Core Components** scaffolded from Figma
- **570 Figma Components** available (filtered smartly)
- **Token-driven CSS** with proper imports
- **Demo Page** to visualize everything

## 📁 Project Structure

```
me-framework/
├── .env                          # Figma API credentials (not committed)
├── .env.example                  # Template for team members
├── .gitignore                    # Protects secrets
├── demo.html                     # Component showcase
├── index.html                    # Your main page
├── package.json                  # Project config
├── build-tokens.js               # Token builder script
├── fetch-figma-components.js     # Component scaffolder
└── src/
    ├── styles/
    │   ├── tokens.css            # 749 CSS variables from Figma
    │   ├── base.css              # Base styles
    │   ├── theme-dark.css        # Dark theme
    │   └── import/               # Token Studio JSON files
    │       ├── $metadata.json
    │       ├── $themes.json
    │       ├── tokens.json
    │       └── core_*/           # Token categories
    └── ui/                       # Component library
        ├── me-header/
        │   ├── me-header.html
        │   ├── me-header.css     # Imports tokens.css
        │   └── me-header.js
        ├── me-input/
        ├── me-footnav/
        └── ... (9 components total)
```

## 🚀 Key Features

### 1. Enhanced Component Scaffolding ⚡ NEW!

The enhanced script now:

- ✅ **Downloads SVG icons** (117 icons automatically saved)
- ✅ **Includes variant CSS** (hover, active, size, type variants)
- ✅ **Smart grouping** (state, size, type variants categorized)
- ✅ **Icon viewer** (browse all icons with search)

### 2. Smart Component Filtering

The script filters intelligently:

- 🎨 Icon components → Downloaded as SVG files
- 📦 Main UI components → Scaffolded with variants
- ⏭️ Flag variants → Skipped (too many!)
- ✅ Clean, maintainable structure

### 3. Token-Driven CSS

Each component CSS file:

- Imports `tokens.css` automatically
- Uses CSS variables from Figma
- Includes fallback values
- Simple hyphenated naming (`component-element-modifier`)
- **Auto-generated variant scaffolds** for Figma variants

### 4. Clean HTML Structure

- Semantic markup
- Simple hyphenated class names
- Usage examples included
- Ready to customize

### 5. SVG Icon Library 🎨 NEW!

- 117 FontAwesome icons downloaded
- Optimized SVG files
- Icon viewer with search (`icons.html`)
- Click to copy filename

## 🎯 Workflows

### 🚀 NEW: Mobile Playground (ULTRA MODE!)

```bash
open playground.html
```

**The ultimate development experience:**

- 📱 Drag & drop components into an iPhone frame
- ✨ Live edit HTML/CSS/JS with instant preview
- 👀 See changes in real-time on a mobile screen
- 💾 Export perfect components to your codebase

[Read the Playground Guide →](PLAYGROUND.md)

### Sync All Figma Data

```bash
npm run figma:sync
```

- Fetches both ME | Variables and ME | Components files
- Creates backups in `./figma-backup/` folder
- Shows component overview
- Checks for updates

### Update Design Tokens

```bash
npm run tokens:build
```

- Reads Token Studio JSON files
- Generates CSS custom properties
- Resolves aliases (e.g., `{color.primary}` → `var(--color-primary)`)

### Update Components from Figma

```bash
npm run figma:scaffold
```

- Fetches latest components
- Creates folders for new components
- Preserves existing customizations

### View Demo

Open `demo.html` in your browser to see:

- All scaffolded components
- Design token samples
- Project statistics

## 📝 Next Steps

### 1. Add Your Variables File Key

Update `.env` with your "ME | Variables" Figma file key:

```properties
FIGMA_VARIABLES_FILE_KEY=your-variables-file-key-here
```

### 2. Customize Components

Edit the CSS files in `src/ui/*/` to match your Figma designs:

- Use the 749 available CSS variables
- Add component variants (e.g., `me-button--primary`)
- Keep styles mobile-first

### 3. Update HTML Structure

Modify the HTML files based on your Figma component structure:

- Use semantic HTML
- Follow BEM naming
- Add accessibility attributes

### 4. Add More Components

To scaffold additional components, add their base names to the `INCLUDE_ONLY` array in `fetch-figma-components.js`:

```javascript
const INCLUDE_ONLY = [
  "button",
  "input",
  "card", // Add new component
  "modal", // Add new component
  // ...
];
```

## 🔧 Configuration

### Component Filtering

Edit `fetch-figma-components.js` to adjust what gets scaffolded:

**Skip Patterns** (components to ignore):

```javascript
const SKIP_PATTERNS = [
  /^name-fa7-/i, // Icons
  /^flags-/i, // Flags
  /^size-/i, // Size variants
  /^state-/i, // State variants
];
```

**Include List** (components to scaffold):

```javascript
const INCLUDE_ONLY = [
  "button",
  "input",
  "header",
  // Add your component names
];
```

## 🎨 Using Design Tokens

All 749 tokens are available as CSS variables in `tokens.css`:

```css
/* Colors */
--accent-primary: #5c6ef8;
--text-primary: #ffffff;
--surface-raised: rgba(255, 255, 255, 0.05);

/* Spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;

/* Border Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;

/* Typography */
--font-size-body-md: 1rem;
--letter-spacing-xxs: 0.01em;
```

Use them in your components:

```css
.my-component {
  padding: var(--space-md);
  background: var(--surface-raised);
  border-radius: var(--radius-md);
  color: var(--text-primary);
}
```

## 🔐 Security

- ✅ `.env` file is in `.gitignore`
- ✅ `.env.example` template provided
- ✅ Tokens are safe and working
- ✅ No secrets in git history

## 📚 Resources

- **Figma Components**: 570 components in your Figma file
- **Token Studio**: Your token JSON files in `src/styles/import/`
- **Demo Page**: `demo.html` - Visual component showcase
- **Main Page**: `index.html` - Your application

## 🎉 Success!

Your design system is now:

- ✅ Connected to Figma
- ✅ Using design tokens
- ✅ Mobile-first and accessible
- ✅ Easy to maintain and scale

Happy coding! 🚀
