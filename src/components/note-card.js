class NoteCard extends HTMLElement {
  static get observedAttributes() {
    return ["note-id", "title", "body", "date", "archived"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "";
    const body = this.getAttribute("body") || "";
    const date = this.getAttribute("date") || "";
    const archived = this.getAttribute("archived") === "true";

    this.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div class="card-accent"></div>
          <h3 class="card-title">${title}</h3>
        </div>
        <p class="card-meta">${date}</p>
        <div class="card-body">${body.replace(/</g, "&lt;")}</div>
        <div class="card-actions">
          <button class="icon-btn" title="${archived ? "Unarchive" : "Archive"}">
            ${archived ? "📤" : "📥"}
          </button>
          <button class="icon-btn danger" title="Delete">🗑️</button>
        </div>
      </div>
    `;
  }
}

customElements.define("note-card", NoteCard);
