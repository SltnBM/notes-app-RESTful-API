import {
  customValidationTitleHandler,
  customValidationBodyHandler,
} from "./form-custom-validation.js";

class NoteForm extends HTMLElement {
  connectedCallback() {
    const maxTitle = this.getAttribute("max-title") || 60;
    const maxBody = this.getAttribute("max-body") || 500;

    this.innerHTML = `
      <form id="noteForm" class="note-form" novalidate>
        <div class="field">
          <label for="title">Title <span class="hint"><span>max. ${maxTitle} characters</span><span id="titleCount">0/${maxTitle}</span></span></label>
          <input id="title" name="title" type="text" required minlength="3" maxlength="${maxTitle}" aria-describedby="titleError" placeholder="Example: Monday Meeting"/>
          <p id="titleError" class="error" aria-live="polite"></p>
        </div>

        <div class="field">
          <label for="body">Note Content <span class="hint"><span>max. ${maxBody} characters</span><span id="bodyCount">0/${maxBody}</span></span></label>
          <textarea id="body" name="body" rows="5" required minlength="5" maxlength="${maxBody}" aria-describedby="bodyError" placeholder="Write your note here..."></textarea>
          <p id="bodyError" class="error" aria-live="polite"></p>
        </div>

        <div class="actions">
          <button type="reset" class="btn btn-ghost">Reset</button>
          <button type="submit" class="btn btn-primary">Add Note</button>
        </div>
      </form>
    `;

    const form = this.querySelector("#noteForm");
    const fields = [
      {
        el: form.elements.title,
        handler: customValidationTitleHandler,
        count: form.querySelector("#titleCount"),
        error: form.querySelector("#titleError"),
      },
      {
        el: form.elements.body,
        handler: customValidationBodyHandler,
        count: form.querySelector("#bodyCount"),
        error: form.querySelector("#bodyError"),
      },
    ];

    fields.forEach((f) => {
      ["input", "blur", "invalid", "change"].forEach((ev) => {
        f.el.addEventListener(ev, () => {
          f.handler({ target: f.el });
          f.error.textContent = f.el.validationMessage;
          f.count.textContent = `${f.el.value.length}/${f.el.maxLength}`;
        });
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      fields.forEach((f) => f.handler({ target: f.el }));
      if (!form.checkValidity()) return;

      fields.forEach((f) => {
        f.error.textContent = "";
        f.count.textContent = `0/${f.el.maxLength}`;
      });
    });

    form.addEventListener("reset", () => {
      fields.forEach((f) => {
        f.error.textContent = "";
        f.count.textContent = `0/${f.el.maxLength}`;
      });
    });
  }
}

customElements.define("note-form", NoteForm);
