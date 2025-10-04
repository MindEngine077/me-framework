# 🚀 Complete Workflow: Van Login tot Volledige App

**Van nul tot production-ready app in het ME Framework**

---

## 📋 Overzicht

Deze guide neemt je mee door het **complete proces**:

```
1. Figma Setup (Design System)
   ↓
2. Token Export & Build
   ↓
3. Component Development
   ↓
4. Page Building
   ↓
5. App Integration
   ↓
6. Production Deploy
```

**Geschatte tijd:** Eerste keer ~4-6 uur, daarna ~30 min per component

---

## 🎯 Phase 1: Figma Setup (One-time, ~2 uur)

### Step 1.1: Create Figma Files

```bash
# Login op Figma (figma.com)
# Ga naar je team/project workspace
```

**Create 3 files:**

1. **ME | Variables**

   ```
   File → New design file
   Naam: "ME | Variables"
   Beschrijving: "Design tokens - Core & Semantic layers"
   ```

2. **ME | Components**

   ```
   File → New design file
   Naam: "ME | Components"
   Beschrijving: "Reusable UI components using ME Variables"
   ```

3. **ME | Pages**
   ```
   File → New design file
   Naam: "ME | Pages"
   Beschrijving: "Application page templates"
   ```

### Step 1.2: Setup Variables

**Open ME | Variables file:**

```
1. Open local variables panel (⌘ + Option + K / Ctrl + Alt + K)
2. Follow guide: docs/FIGMA-VARIABLES-SETUP.md
   → Create 5 collections
   → Add all tokens from JSON files
   → Setup Dark/Light modes
3. Verify: Should have ~795 variables
```

**Quick verification:**

- ✅ Core - Colors collection exists
- ✅ Core - Layout collection exists
- ✅ Core - Typography collection exists
- ✅ Semantic - Colors collection exists (with Dark/Light modes)
- ✅ Semantic - Layout collection exists
- ✅ All semantic variables reference core variables

**Publish to Team Library:**

```
Assets panel → Team Library icon → Publish
→ Version name: "v1.0 - Initial token system"
→ Publish
```

### Step 1.3: Link Variables to Components

**Open ME | Components file:**

```
1. Assets panel → Libraries icon (book)
2. Find "ME | Variables" → Toggle ON
3. Verify: Variables now appear in variable picker
```

### Step 1.4: Design Components (or Import Existing)

**Option A - Already have designs:**

```
1. Copy components from existing file
2. Paste into ME | Components
3. Replace hardcoded colors/spacing with variables
   → Select element → Property → Variable icon (⚡) → Pick variable
```

**Option B - Design from scratch:**

```
1. Create component (⌘ + Option + K / Ctrl + Alt + K)
2. Use variables for all properties:
   → Fill: {background/base}
   → Stroke: {border/base}
   → Text: {text/primary}
   → Padding: {space/md}
3. Create variants (states, sizes)
4. Add Auto Layout
```

**Example: Input Component**

```
Base component "Input"
├─ Variant: State = Default, Size = Medium
├─ Variant: State = Focus, Size = Medium
├─ Variant: State = Error, Size = Medium
├─ Variant: State = Default, Size = Small
└─ Variant: State = Default, Size = Large

Properties using variables:
├─ Background: {input/colors/background} → {background/base}
├─ Border: {input/colors/border/default} → {border/base}
├─ Text: {input/colors/text} → {text/primary}
└─ Height: {input/layout/height/md} → 48px
```

**Publish Components:**

```
Assets panel → Publish → "v1.0 - Initial components"
```

---

## 🔄 Phase 2: Token Export & Sync (~15 min)

### Step 2.1: Export from Figma

**Install Token Studio plugin (if not done):**

```
Figma → Plugins → Browse plugins → Search "Token Studio"
→ Install (gratis)
```

**Export tokens:**

```
1. Open ME | Variables file
2. Plugins → Token Studio for Figma → Run
3. Export → JSON → Save to local folder
4. Copy exported JSON to: me-framework/src/styles/import/
```

**Alternative: Manual sync**

```
# Je hebt al 795 tokens in JSON files
# Skip export en gebruik bestaande files
```

### Step 2.2: Build Tokens

```bash
cd me-framework
npm run tokens:build
```

**Expected output:**

```
✓ Reading token files...
✓ Processing 795 tokens
✓ Generated tokens.css (287 aliases resolved)
✓ Build complete!
```

**Verify:**

```bash
# Check tokens.css is updated
cat src/styles/tokens.css | grep "input/colors/background"
# Should show: --input-colors-background: var(--background-base);
```

---

## 🎨 Phase 3: Component Development (~30 min per component)

### Step 3.1: Export Component from Figma

**Use Figma AutoHTML plugin:**

```
1. Open ME | Components file
2. Select component (e.g., Input)
3. Plugins → "AutoHTML with CSS" → Run
4. Copy generated HTML
5. Copy generated CSS
```

### Step 3.2: Create Component Files

```bash
# Create component folder
mkdir -p src/ui/me-[component-name]
cd src/ui/me-[component-name]

# Create files
touch me-[component-name].html
touch me-[component-name].css
touch me-[component-name].js
touch README.md
```

**Example: Input component**

```bash
mkdir -p src/ui/me-input
cd src/ui/me-input
touch me-input.html me-input.css me-input.js README.md
```

### Step 3.3: Convert to Semantic HTML

**Follow guide:** `docs/FIGMA-INPUT-WORKFLOW.md`

**Key transformations:**

```html
<!-- ❌ Figma AutoHTML output (divs) -->
<div class="input-container">
  <div class="input-field">Placeholder</div>
</div>

<!-- ✅ Semantic HTML -->
<div class="me-input-group">
  <label for="email" class="me-input-label">Email</label>
  <input type="email" id="email" class="me-input" placeholder="Enter your email" aria-label="Email address" />
  <span class="me-input-hint">We'll never share your email</span>
</div>
```

### Step 3.4: Style with Tokens

**In me-[component].css:**

```css
.me-input {
  /* Use CSS variables from tokens.css */
  background: var(--input-colors-background); /* → var(--background-base) */
  border: var(--input-layout-border-width) solid var(--input-colors-border-default);
  color: var(--input-colors-text);
  padding: 0 var(--input-layout-padding-x);
  height: var(--input-layout-height-md);
  border-radius: var(--input-layout-radius);

  font-family: var(--input-typography-font-family);
  font-size: var(--input-typography-font-size);

  transition: all var(--input-effects-transition-duration);
}

.me-input:focus {
  border-color: var(--input-colors-border-focus);
  outline: none;
  box-shadow: var(--input-effects-shadow-focus);
}

.me-input[aria-invalid="true"] {
  border-color: var(--input-colors-border-error);
}
```

### Step 3.5: Add JavaScript Behavior

**In me-[component].js:**

```javascript
class MeInput {
  constructor(element) {
    this.element = element;
    this.input = element.querySelector(".me-input");
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.input.addEventListener("blur", () => this.validate());
  }

  validate() {
    const isValid = this.input.checkValidity();
    this.input.setAttribute("aria-invalid", !isValid);
    return isValid;
  }

  getValue() {
    return this.input.value;
  }

  setValue(value) {
    this.input.value = value;
  }
}

// Auto-initialize
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".me-input-group").forEach((group) => {
    new MeInput(group);
  });
});
```

### Step 3.6: Create Demo Page

```bash
# Create demo for component
cp pages/input-demo.html pages/[component]-demo.html
# Update content to showcase new component
```

---

## 📄 Phase 4: Page Building (~1 uur per page)

### Step 4.1: Design Page in Figma

**In ME | Pages file:**

```
1. Enable ME | Components library
2. Drag components from Assets panel
3. Build page layout using components
4. Apply Auto Layout for responsive design
5. Test interactions (click states, hovers)
```

### Step 4.2: Export Page Structure

**Use Figma AutoHTML:**

```
1. Select page frame
2. Plugins → AutoHTML → Run
3. Copy HTML structure
4. Copy CSS (mostly layout, components handle styling)
```

### Step 4.3: Create Page File

```bash
# Create new page
touch pages/[page-name].html
```

**Template structure:**

```html
<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title - ME Framework</title>

    <!-- Base styles -->
    <link rel="stylesheet" href="../src/fonts/fonts.css" />
    <link rel="stylesheet" href="../src/styles/tokens.css" />
    <link rel="stylesheet" href="../src/styles/base.css" />
    <link rel="stylesheet" href="../src/styles/theme-dark.css" />
    <link rel="stylesheet" href="../src/styles/demo.css" />

    <!-- Component styles -->
    <link rel="stylesheet" href="../src/ui/me-input/me-input.css" />
    <link rel="stylesheet" href="../src/ui/me-button/me-button.css" />
    <!-- Add other components as needed -->
  </head>
  <body>
    <!-- Page content using components -->
    <div class="page-container">
      <main class="page-content">
        <!-- Use components here -->
      </main>
    </div>

    <!-- Component scripts -->
    <script src="../src/ui/me-input/me-input.js"></script>
    <script src="../src/ui/me-button/me-button.js"></script>
  </body>
</html>
```

### Step 4.4: Add Page to Navigation

**Update index.html:**

```html
<div class="tool-cards">
  <!-- Existing cards... -->

  <a href="pages/[page-name].html" class="tool-card">
    <div class="tool-card-content">
      <h2>Page Name</h2>
      <p class="text-secondary">Description of the page</p>
    </div>
  </a>
</div>
```

---

## 🏗️ Phase 5: App Integration (Full app, ~2-4 uur)

### Step 5.1: Plan App Structure

**Define pages needed:**

```
App Structure:
├── Landing page (index.html) ✓ exists
├── Authentication
│   ├── Login page
│   └── Signup page
├── Dashboard
│   ├── Overview
│   ├── Profile
│   └── Settings
└── Feature pages
    ├── Feature A
    └── Feature B
```

### Step 5.2: Create Routing (if SPA)

**Option A: Simple multi-page (current setup):**

```
index.html → pages/login.html → pages/dashboard.html
```

**Option B: Single Page App (advanced):**

```javascript
// Simple router
class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
  }

  addRoute(path, component) {
    this.routes[path] = component;
  }

  navigate(path) {
    const component = this.routes[path];
    if (component) {
      this.render(component);
      window.history.pushState({}, "", path);
    }
  }

  render(component) {
    document.getElementById("app").innerHTML = component;
  }
}

// Usage
const router = new Router();
router.addRoute("/login", LoginPage);
router.addRoute("/dashboard", DashboardPage);
```

### Step 5.3: Add State Management (if needed)

**Simple state store:**

```javascript
class AppState {
  constructor() {
    this.state = {
      user: null,
      isAuthenticated: false,
      theme: "dark",
    };
    this.listeners = [];
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

// Global instance
const appState = new AppState();
```

### Step 5.4: Add Authentication Flow

**Example login page:**

```html
<!-- pages/login.html -->
<div class="auth-container">
  <form id="loginForm" class="auth-form">
    <h1>Login</h1>

    <div class="me-input-group">
      <label for="email">Email</label>
      <input type="email" id="email" class="me-input" required />
    </div>

    <div class="me-input-group">
      <label for="password">Password</label>
      <input type="password" id="password" class="me-input" required />
    </div>

    <button type="submit" class="me-button me-button--primary">Login</button>
  </form>
</div>

<script>
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Call your API
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user = await response.json();
      appState.setState({ user, isAuthenticated: true });
      window.location.href = "/pages/dashboard.html";
    } else {
      // Show error
    }
  });
</script>
```

### Step 5.5: Build Dashboard Layout

**Example dashboard structure:**

```html
<!-- pages/dashboard.html -->
<div class="app-layout">
  <!-- Header -->
  <header class="me-header">
    <div class="me-header-content">
      <h1>Dashboard</h1>
      <div class="user-menu">
        <span id="userName"></span>
        <button class="logout-btn">Logout</button>
      </div>
    </div>
  </header>

  <!-- Sidebar (optional) -->
  <aside class="sidebar">
    <nav>
      <a href="#overview" class="nav-item active">Overview</a>
      <a href="#profile" class="nav-item">Profile</a>
      <a href="#settings" class="nav-item">Settings</a>
    </nav>
  </aside>

  <!-- Main content -->
  <main class="dashboard-content">
    <div class="dashboard-grid">
      <!-- Cards with data -->
    </div>
  </main>

  <!-- Footer nav -->
  <nav class="me-footnav">
    <!-- Mobile navigation -->
  </nav>
</div>

<script>
  // Load user data
  const user = appState.getState().user;
  document.getElementById("userName").textContent = user.name;
</script>
```

---

## 🚀 Phase 6: Production Deploy (~30 min)

### Step 6.1: Optimize Assets

```bash
# Minify CSS (optional)
npm install -D cssnano postcss-cli

# Create minified version
npx postcss src/styles/*.css --use cssnano -o dist/styles.min.css

# Optimize images (if any)
# Use tools like imagemin or Squoosh
```

### Step 6.2: Bundle (if needed)

**Simple setup (current):** Already works - no bundling needed!

**Advanced setup:**

```bash
# Install bundler
npm install -D vite

# Create vite.config.js
# Build
npm run build
```

### Step 6.3: Deploy to Hosting

**Option A: GitHub Pages (gratis):**

```bash
# Create gh-pages branch
git checkout -b gh-pages

# Push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# Enable in GitHub repo settings → Pages → Source: gh-pages
```

**Option B: Netlify (gratis):**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Option C: Vercel (gratis):**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Step 6.4: Setup Domain (optional)

```
1. Buy domain (bijvoorbeeld Cloudflare, €10/jaar)
2. Add to hosting platform
3. Configure DNS records
4. Enable HTTPS (automatic op Netlify/Vercel)
```

---

## 📊 Complete Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    FIGMA (Design)                           │
│                                                             │
│  ME | Variables  →  ME | Components  →  ME | Pages          │
│  (795 tokens)        (UI library)         (Templates)       │
└─────────────────┬───────────────────────────────────────────┘
                  │ Export (AutoHTML + Token Studio)
                  ↓
┌─────────────────────────────────────────────────────────────┐
│                 CODEBASE (Development)                       │
│                                                             │
│  1. src/styles/import/  ← Token JSON files                  │
│     └─ npm run tokens:build                                 │
│        └─ src/styles/tokens.css (generated)                 │
│                                                             │
│  2. src/ui/me-[component]/  ← Component files               │
│     ├─ me-[component].html (semantic HTML)                  │
│     ├─ me-[component].css (uses tokens)                     │
│     └─ me-[component].js (behavior)                         │
│                                                             │
│  3. pages/[page].html  ← Page files                         │
│     └─ Uses components + tokens                             │
│                                                             │
│  4. index.html  ← Main entry point                          │
└─────────────────┬───────────────────────────────────────────┘
                  │ Build & Deploy
                  ↓
┌─────────────────────────────────────────────────────────────┐
│                  PRODUCTION (Live App)                       │
│                                                             │
│  your-domain.com → Netlify/Vercel/GitHub Pages              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Daily Workflow

### Morning: Design updates

```
1. Open Figma → ME | Variables
2. Adjust tokens if needed (new color, spacing)
3. Publish update
4. Open ME | Components
5. Components auto-update (they use variables!)
6. Verify changes in ME | Pages
7. Export tokens → JSON
```

### Afternoon: Code implementation

```
8. Copy JSON to me-framework/src/styles/import/
9. Run: npm run tokens:build
10. Refresh browser → See updated tokens!
11. Export component from Figma (if new)
12. Convert to semantic HTML
13. Test in demo page
14. Commit changes
```

### Evening: Ship it!

```
15. git add .
16. git commit -m "Added new feature"
17. git push
18. Auto-deploys to production! 🚀
```

---

## 🎯 Quick Reference: Commands

```bash
# Token build
npm run tokens:build

# Dev server (if using)
npm run dev

# Build for production
npm run build

# Deploy
git push origin main  # (triggers auto-deploy)
```

---

## 📚 Related Documentation

| Document                                                   | When to Use                       |
| ---------------------------------------------------------- | --------------------------------- |
| [FIGMA-VARIABLES-SETUP.md](./FIGMA-VARIABLES-SETUP.md)     | Setting up token system in Figma  |
| [FIGMA-VARIABLES-QUICK.md](./FIGMA-VARIABLES-QUICK.md)     | Quick token reference             |
| [FIGMA-VARIABLES-DIAGRAM.md](./FIGMA-VARIABLES-DIAGRAM.md) | Visual architecture overview      |
| [TOKEN-ARCHITECTURE.md](./TOKEN-ARCHITECTURE.md)           | Understanding token layers        |
| [FIGMA-INPUT-WORKFLOW.md](./FIGMA-INPUT-WORKFLOW.md)       | Converting Figma to semantic HTML |
| [WORKFLOW.md](./WORKFLOW.md)                               | Original workflow notes           |

---

## ✅ Checklist: First Time Setup

```
□ Created 3 Figma files (Variables, Components, Pages)
□ Setup 795 tokens in ME | Variables
□ Published ME | Variables to Team Library
□ Created first component in ME | Components
□ Published ME | Components to Team Library
□ Exported tokens to JSON
□ Ran npm run tokens:build successfully
□ Created first component folder in src/ui/
□ Converted Figma HTML to semantic HTML
□ Styled component with tokens
□ Added JavaScript behavior
□ Created demo page
□ Built first full page
□ Tested in browser
□ Committed to Git
□ Deployed to hosting
```

---

## 💡 Pro Tips

### Speed up component creation:

```bash
# Create component script
cat > create-component.sh << 'EOF'
#!/bin/bash
NAME=$1
mkdir -p src/ui/me-$NAME
cd src/ui/me-$NAME
echo "<!-- Component: ME $NAME -->" > me-$NAME.html
echo "/* Component: ME $NAME */" > me-$NAME.css
echo "// Component: ME $NAME" > me-$NAME.js
echo "# ME $NAME Component" > README.md
EOF

chmod +x create-component.sh
./create-component.sh button  # Creates all files!
```

### Token updates propagate automatically:

```
Change in Figma Variable → Affects all components → Affects all pages
Just export + build, everything updates! 🎨
```

### Test theme switching:

```javascript
// Add theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("theme-light");
});
```

---

## 🆘 Troubleshooting

### Tokens not updating?

```bash
# Check if build ran
npm run tokens:build

# Check tokens.css was generated
ls -la src/styles/tokens.css

# Hard refresh browser (Ctrl + Shift + R)
```

### Component not styled?

```html
<!-- Check CSS is imported -->
<link rel="stylesheet" href="../src/styles/tokens.css" />
<link rel="stylesheet" href="../src/ui/me-component/me-component.css" />
```

### Variables not appearing in Figma?

```
1. Check if ME | Variables is published
2. In ME | Components: Assets → Libraries → Enable "ME | Variables"
3. Restart Figma if needed
```

---

**Je bent nu klaar om van login tot volledige app te bouwen! 🚀**

Questions? Check related docs or ask! ✨
