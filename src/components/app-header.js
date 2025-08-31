class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <h1 class="app-title">Notes App</h1>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);
