# ME Framework - Workflow

## 🔄 Figma naar Code Workflow

### Stap 1: Design in Figma

1. Ontwerp je component in **ME | Components** file
2. Gebruik tokens uit **ME | Variables** file
3. Gebruik consistente naming (bijv. "Input", "Button", etc.)

### Stap 2: Export met AutoHTML Plugin

1. Selecteer je component in Figma
2. Open **AutoHTML** plugin
3. Genereer HTML + CSS
4. Kopieer de code

### Stap 3: Integreer in Project

1. Open het component bestand (bijv. `src/ui/me-input/me-input.html`)
2. Plak de HTML code van AutoHTML
3. Open het CSS bestand (bijv. `src/ui/me-input/me-input.css`)
4. Plak de CSS styles **boven** de bestaande boilerplate code
5. Pas aan waar nodig (voeg token variabelen toe)

### Stap 4: Test

1. Open `demo.html` in je browser
2. Controleer of de component er goed uitziet
3. Test interacties en responsive gedrag

### Stap 5: Sync Design Tokens

```bash
# Sync alle Figma data (Variables + Components):
npm run figma:sync

# Bouw tokens naar CSS variabelen:
npm run tokens:build

# Scaffold nieuwe components:
npm run figma:scaffold
```

## 📋 Component Checklist

Voor elk component:

- [ ] Design in Figma (ME | Components)
- [ ] Export met AutoHTML plugin
- [ ] Plak HTML naar `.html` bestand
- [ ] Plak CSS naar `.css` bestand (boven de imports)
- [ ] Test in demo.html
- [ ] Commit naar Git

## 🎨 CSS Structuur

Elke component CSS file heeft deze structuur:

```css
/* 1. AutoHTML gegenereerde styles HIER plakken */
.me-input {
  /* Jouw Figma styles */
}

/* 2. Import design tokens */
@import "../../styles/tokens.css";
@import "../../styles/base.css";

/* 3. Eventuele custom aanpassingen */
.me-input-custom {
  /* Extra styles */
}
```

## 🔗 Figma Files

- **ME | Components**: `https://www.figma.com/file/UZN8LLFNOmFN47oDJJpDaS`

  - Bevat alle UI components
  - Gebruikt voor component structuur

- **ME | Variables**: `https://www.figma.com/design/MTzjjnbIR5kBS31ffCMacl`
  - Bevat core design tokens
  - Gebruikt voor kleuren, spacing, typography, etc.

## 🛠️ Tools

- **AutoHTML Plugin** - Voor Figma naar HTML/CSS export
- **Token Studio** - Voor design token management (optioneel)
- **VS Code** - Code editor
- **Live Server** - Voor local testing

## 💡 Tips

1. **Gebruik Token Variabelen**: Vervang hardcoded waarden met CSS variabelen

   ```css
   /* Voorheen: */
   padding: 16px;

   /* Nu: */
   padding: var(--space-md, 16px);
   ```

2. **Behoud AutoHTML Code**: Plak AutoHTML code bovenaan, pas alleen aan waar nodig

3. **Test Mobile First**: Check altijd op kleine schermen eerst

4. **Commit Regelmatig**: Maak kleine commits na elk component

## 🚀 Volgende Stappen

1. ✅ Input component is klaar
2. Doe hetzelfde voor:

   - [ ] Header/Navigation
   - [ ] Footer
   - [ ] Button (als die er is)
   - [ ] Card/Container components
   - [ ] Form elementen

3. Bouw je main page in `index.html`
