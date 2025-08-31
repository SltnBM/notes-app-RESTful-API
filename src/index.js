import "./style.css";
import "./components/app-header.js";
import "./components/note-form.js";
import "./components/note-card.js";
import Swal from "sweetalert2";
import { gsap } from "gsap";
import {
  getNotes,
  createNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from "./api/notes-api.js";

const notesListElement = document.querySelector("#notesList");
const archivedNotesListElement = document.querySelector("#archivedNotesList");

function createNoteItemElement({ id, title, body, createdAt, archived }) {
  return `
    <div class="note-wrapper" data-noteid="${id}" data-archived="${archived}">
      <note-card 
        note-id="${id}" 
        title="${title}" 
        body="${body}" 
        date="${new Date(createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}" 
        archived="${archived}">
      </note-card>
    </div>
  `;
}

function animateNotes(targets) {
  if (!targets || targets.length === 0) return;
  gsap.from(targets, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  });
}

async function renderNotes() {
  notesListElement.innerHTML = "Loading...";
  try {
    const notes = await getNotes(false);
    notesListElement.innerHTML = notes.length
      ? notes.map(createNoteItemElement).join("")
      : "<p>No notes found.</p>";

    const wrappers = notesListElement.querySelectorAll(".note-wrapper");
    animateNotes(wrappers);
  } catch {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to load notes!",
    });
  }
}

async function renderArchivedNotes() {
  archivedNotesListElement.innerHTML = "Loading...";
  try {
    const notes = await getNotes(true);
    archivedNotesListElement.innerHTML = notes.length
      ? notes.map(createNoteItemElement).join("")
      : "<p>No archived notes found.</p>";

    const wrappers = archivedNotesListElement.querySelectorAll(".note-wrapper");
    animateNotes(wrappers);
  } catch {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to load archived notes!",
    });
  }
}

async function archiveWithAnimation(noteId, noteWrapper) {
  gsap.to(noteWrapper, {
    x: 500,
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: async () => {
      await archiveNote(noteId);
      noteWrapper.remove();
      renderNotes();
      renderArchivedNotes();
      Swal.fire({
        icon: "success",
        title: "Note archived!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
}

async function unarchiveWithAnimation(noteId, noteWrapper) {
  gsap.to(noteWrapper, {
    x: -500,
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: async () => {
      await unarchiveNote(noteId);
      noteWrapper.remove();
      renderNotes();
      renderArchivedNotes();
      Swal.fire({
        icon: "success",
        title: "Note unarchived!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderNotes();
  renderArchivedNotes();

  document.querySelector("note-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.querySelector("#title").value;
    const body = form.querySelector("#body").value;
    if (!title || !body) return;

    try {
      await createNote(title, body);
      form.reset();
      await renderNotes();
      Swal.fire({
        icon: "success",
        title: "Note added!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add note!",
      });
    }
  });

  document.body.addEventListener("click", async (e) => {
    const cardWrapper = e.target.closest(".note-wrapper");
    if (!cardWrapper) return;
    const noteId = cardWrapper.dataset.noteid;

    if (e.target.title === "Delete") {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        try {
          await deleteNote(noteId);
          cardWrapper.remove();
          renderNotes();
          renderArchivedNotes();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your note has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to delete note!",
          });
        }
      }
    } else if (e.target.title === "Archive") {
      archiveWithAnimation(noteId, cardWrapper);
    } else if (e.target.title === "Unarchive") {
      unarchiveWithAnimation(noteId, cardWrapper);
    }
  });
});
