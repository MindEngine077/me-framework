# 🔤 Fonts Setup Guide

## Noir Pro Font Family

Je project gebruikt **Noir Pro** als custom font. Hier zijn de stappen om deze te laden:

## 📥 Option 1: Self-Host (Aanbevolen voor productie)

### Stap 1: Download je fonts

Je hebt Noir Pro nodig in deze gewichten:

- ✅ **Regular** (400) - Voor normale tekst
- ✅ **Medium** (500) - Voor footnav links, labels
- ✅ **SemiBold** (600) - Voor headings (optioneel)
- ✅ **Bold** (700) - Voor emphasis (optioneel)

Download van:

- Je Figma file (File → Export fonts)
- Je font provider (MyFonts, Adobe Fonts, etc.)
- Je email als je ze hebt gekocht

### Stap 2: Converteer naar web fonts

**Waarom WOFF2?**

- Kleinere bestanden (30-50% kleiner dan TTF/OTF)
- Ondersteund door alle moderne browsers
- Snellere laadtijden

**Online converter:**

1. Ga naar: https://cloudconvert.com/ttf-to-woff2
2. Upload je .ttf of .otf files
3. Convert naar .woff2
4. Download de resultaten

**Of gebruik een local tool:**

```bash
# Met Node.js
npm install -g ttf2woff2
ttf2woff2 NoirPro-Regular.ttf
```

### Stap 3: Plaats in deze folder

```
src/fonts/
├── fonts.css
├── NoirPro-Regular.woff2
├── NoirPro-Regular.woff
├── NoirPro-Medium.woff2
├── NoirPro-Medium.woff
├── NoirPro-SemiBold.woff2 (optioneel)
└── NoirPro-Bold.woff2 (optioneel)
```

### Stap 4: Activeer de @font-face rules

Open `src/fonts/fonts.css` en **uncomment** de font declarations:

```css
@font-face {
  font-family: "NoirPro";
  src: url("./NoirPro-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "NoirPro";
  src: url("./NoirPro-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

### Stap 5: Update de CSS variable

In `fonts.css`, change:

```css
--fontfamilies-noir-pro: "NoirPro", system-ui, sans-serif;
```

### Stap 6: Import in je HTML

Add to `<head>`:

```html
<link rel="stylesheet" href="src/fonts/fonts.css" />
```

---

## 🌐 Option 2: Adobe Fonts / Google Fonts

Als je geen Noir Pro hebt, gebruik een alternatief:

### Met Adobe Fonts:

1. Ga naar https://fonts.adobe.com
2. Zoek naar je font
3. Klik "Add to Web Project"
4. Copy de `<link>` tag
5. Plak in je `<head>`

### Met Google Fonts (alternatief):

Similar fonts:

- **Inter** - Modern, clean, great readability
- **DM Sans** - Geometric, professional
- **Work Sans** - Similar proportions
- **Manrope** - Rounded, friendly

Add to `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Update CSS variable:

```css
--fontfamilies-noir-pro: "Inter", system-ui, sans-serif;
```

---

## 🎨 Usage in je code

De font wordt automatisch gebruikt via CSS variables:

```css
/* Base styles (automatic) */
body {
  font-family: var(--fontfamilies-noir-pro);
}

/* Specific weights */
.title {
  font-family: var(--fontfamilies-noir-pro);
  font-weight: 500; /* Medium */
}

.heading {
  font-family: var(--fontfamilies-noir-pro);
  font-weight: 600; /* SemiBold */
}
```

Of gebruik de utility classes:

```html
<div class="font-regular">Regular text</div>
<div class="font-medium">Medium text</div>
<div class="font-semibold">SemiBold text</div>
<div class="font-bold">Bold text</div>
```

---

## ⚡ Performance Tips

### 1. Use font-display: swap

```css
@font-face {
  font-display: swap; /* Shows fallback first, then custom font */
}
```

### 2. Preload critical fonts

In `<head>`:

```html
<link rel="preload" href="src/fonts/NoirPro-Regular.woff2" as="font" type="font/woff2" crossorigin /> <link rel="preload" href="src/fonts/NoirPro-Medium.woff2" as="font" type="font/woff2" crossorigin />
```

### 3. Only load weights you need

Don't load all 9 weights if you only use 2-3!

---

## 🐛 Troubleshooting

### Fonts not loading?

1. **Check the path**

   ```css
   /* Correct: relative to fonts.css location */
   src: url('./NoirPro-Regular.woff2')

   /* Wrong */
   src: url('/NoirPro-Regular.woff2')
   ```

2. **Check the filename** - Exact match, including capitals!

3. **Check browser console** - Look for 404 errors

4. **Check CORS** - If loading from CDN, make sure CORS headers are set

### Font looks weird?

1. **Enable font smoothing** (already in fonts.css)
2. **Check font-weight matches** - Using 600 but only loaded 400?
3. **Check letter-spacing** - Noir Pro might need adjustment

### Font file too big?

1. **Use WOFF2** - Smallest format
2. **Subset the font** - Remove unused glyphs:
   ```bash
   # Using pyftsubset
   pyftsubset NoirPro-Regular.ttf \
     --output-file=NoirPro-Regular-subset.woff2 \
     --flavor=woff2 \
     --layout-features='*' \
     --unicodes=U+0020-007E,U+00A0-00FF
   ```

---

## 📦 Current Status

- ✅ `fonts.css` created with @font-face templates
- ✅ CSS variable `--fontfamilies-noir-pro` configured
- ⚠️ Font files need to be added (see Option 1 above)
- ⚠️ Import `fonts.css` in your HTML files

---

## 🚀 Quick Start (Using Google Fonts Temporary)

While you get Noir Pro:

1. Add to page-default.html `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" /> <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

2. In `src/fonts/fonts.css`, uncomment:

```css
--fontfamilies-noir-pro: "Inter", system-ui, sans-serif;
```

3. Import fonts.css:

```html
<link rel="stylesheet" href="src/fonts/fonts.css" />
```

Done! Inter will be used as a placeholder until you add Noir Pro.

---

## 📚 Resources

- [Web Font Best Practices](https://web.dev/font-best-practices/)
- [WOFF2 Converter](https://cloudconvert.com/ttf-to-woff2)
- [Google Fonts](https://fonts.google.com)
- [Adobe Fonts](https://fonts.adobe.com)
- [Font Squirrel Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator)
