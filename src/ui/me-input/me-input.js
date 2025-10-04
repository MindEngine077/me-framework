/**
 * File: src/ui/me-input/me-input.js
 * ME Input Component - Enhanced input field with validation
 */

export class MeInput {
  constructor(element) {
    this.container = element;
    this.input = element.querySelector(".me-input__field");
    this.errorElement = null;

    if (!this.input) {
      console.warn("MeInput: No input field found");
      return;
    }

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupValidation();

    // Check for error message element
    const group = this.container.closest(".me-input-group");
    if (group) {
      this.errorElement = group.querySelector(".me-input__error");
    }
  }

  setupEventListeners() {
    // Focus state management
    this.input.addEventListener("focus", () => {
      this.container.classList.add("me-input--focused");
    });

    this.input.addEventListener("blur", () => {
      this.container.classList.remove("me-input--focused");
      this.validate();
    });

    // Input change
    this.input.addEventListener("input", () => {
      // Clear error on input
      if (this.container.classList.contains("me-input--error")) {
        this.clearError();
      }
    });
  }

  setupValidation() {
    // HTML5 validation support
    if (this.input.form) {
      this.input.form.addEventListener("submit", (e) => {
        if (!this.validate()) {
          e.preventDefault();
        }
      });
    }
  }

  validate() {
    // Use HTML5 validation API
    if (!this.input.checkValidity()) {
      this.setError(this.input.validationMessage);
      return false;
    }

    this.clearError();
    return true;
  }

  setError(message) {
    this.container.classList.add("me-input--error");
    this.input.setAttribute("aria-invalid", "true");

    if (this.errorElement) {
      this.errorElement.textContent = message;
      this.errorElement.style.display = "block";
    }
  }

  clearError() {
    this.container.classList.remove("me-input--error");
    this.input.setAttribute("aria-invalid", "false");

    if (this.errorElement) {
      this.errorElement.textContent = "";
      this.errorElement.style.display = "none";
    }
  }

  setSuccess() {
    this.container.classList.add("me-input--success");
    this.clearError();
  }

  getValue() {
    return this.input.value;
  }

  setValue(value) {
    this.input.value = value;
  }

  clear() {
    this.input.value = "";
    this.clearError();
  }

  disable() {
    this.input.disabled = true;
    this.container.classList.add("me-input--disabled");
  }

  enable() {
    this.input.disabled = false;
    this.container.classList.remove("me-input--disabled");
  }
}

/**
 * Auto-initialize all inputs on page load
 */
export function initMeInput(root = document) {
  const inputs = root.querySelectorAll(".me-input");
  const instances = [];

  inputs.forEach((input) => {
    const instance = new MeInput(input);
    instances.push(instance);
  });

  return instances;
}

// Auto-initialize on DOM ready
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initMeInput());
  } else {
    initMeInput();
  }
}

// Export for use as module
export default MeInput;
