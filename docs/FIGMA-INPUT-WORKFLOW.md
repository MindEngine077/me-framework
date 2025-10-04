# 📝 Figma Input Component Workflow

## Problem

The current `me-input` scaffold from Figma AutoHTML exports a **static div**, not a functional input field.

## Solution

Convert Figma components to proper semantic HTML with real form elements.

## Step-by-Step Workflow

### 1. Export from Figma (AutoHTML)

- Open Figma component in AutoHTML plugin
- Copy HTML + CSS
- Save to component folder

### 2. Convert to Semantic HTML

Transform the static div structure:

```html
<!-- ❌ FROM (AutoHTML export) -->
<div class="input">
  <svg class="icon">...</svg>
  <div class="placeholder">Placeholder</div>
  <svg class="icon2">...</svg>
</div>

<!-- ✅ TO (Semantic HTML) -->
<div class="me-input">
  <svg class="me-input__icon-left">...</svg>
  <input type="text" class="me-input__field" placeholder="Placeholder" />
  <svg class="me-input__icon-right">...</svg>
</div>
```

### 3. Enhance CSS with States

Add interactive states:

```css
.me-input__field {
  /* Base styles from Figma */
  background: var(--input-colors-color);
  border: 1px solid var(--input-colors-border-color);
}

/* Focus state */
.me-input__field:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(92, 110, 248, 0.2);
}

/* Error state */
.me-input--error .me-input__field {
  border-color: var(--semantic-error);
}

/* Disabled state */
.me-input__field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 4. Add JavaScript Behavior

```javascript
export class MeInput extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector(".me-input__field");
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.input.addEventListener("focus", () => {
      this.classList.add("me-input--focused");
    });

    this.input.addEventListener("blur", () => {
      this.classList.remove("me-input--focused");
    });
  }
}
```

### 5. Figma Component Variants → CSS Modifiers

Map Figma variants to CSS classes:

| Figma Variant    | CSS Class             | Usage            |
| ---------------- | --------------------- | ---------------- |
| `State=Default`  | `.me-input`           | Base component   |
| `State=Focused`  | `.me-input--focused`  | When focused     |
| `State=Error`    | `.me-input--error`    | Validation error |
| `State=Disabled` | `.me-input--disabled` | Disabled state   |
| `Size=Small`     | `.me-input--sm`       | Compact size     |
| `Size=Large`     | `.me-input--lg`       | Large size       |

### 6. Usage Examples

```html
<!-- Basic input -->
<div class="me-input">
  <input type="text" class="me-input__field" placeholder="Enter text" />
</div>

<!-- With left icon -->
<div class="me-input">
  <svg class="me-input__icon-left">...</svg>
  <input type="email" class="me-input__field" placeholder="Email" />
</div>

<!-- Error state -->
<div class="me-input me-input--error">
  <input type="password" class="me-input__field" placeholder="Password" />
  <span class="me-input__error">Password is required</span>
</div>

<!-- Small variant -->
<div class="me-input me-input--sm">
  <input type="search" class="me-input__field" placeholder="Search..." />
  <svg class="me-input__icon-right">...</svg>
</div>
```

## Best Practices

### ✅ DO

- Use semantic HTML (`<input>`, `<label>`, `<fieldset>`)
- Keep Figma design tokens for colors/spacing
- Add accessibility attributes (`aria-label`, `aria-describedby`)
- Support keyboard navigation
- Add proper validation states

### ❌ DON'T

- Use `<div>` with contentEditable
- Hardcode colors (use tokens!)
- Forget focus states
- Skip error handling
- Ignore mobile touch targets (min 44×44px)

## Token Mapping

Use these tokens from your Figma Variables:

```css
.me-input__field {
  /* Colors */
  background: var(--input-colors-color);
  border-color: var(--input-colors-border-color);
  color: var(--text-primary);

  /* Layout */
  height: var(--input-layout-height);
  padding: var(--input-layout-pad-y) var(--input-layout-pad-x);
  border-radius: var(--input-layout-radius-base);
  gap: var(--input-layout-gap);

  /* Typography */
  font-family: var(--input-placeholder-font-family);
  font-size: var(--input-placeholder-font-size);
  font-weight: var(--input-placeholder-font-weight);
  letter-spacing: var(--input-placeholder-letter-spacing);
}
```

## Testing Checklist

- [ ] Input accepts text typing
- [ ] Placeholder shows when empty
- [ ] Focus state visible (border/shadow)
- [ ] Tab navigation works
- [ ] Error state displays correctly
- [ ] Icons aligned properly
- [ ] Mobile touch target ≥44px
- [ ] Screen reader announces label
- [ ] Form submission works

## Next Steps

1. Apply this workflow to other form components:

   - `me-textarea`
   - `me-select`
   - `me-checkbox`
   - `me-radio`
   - `me-switch`

2. Create a form validation system
3. Build a complete form example page
