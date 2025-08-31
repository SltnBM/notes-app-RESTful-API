const API_BASE = "https://notes-api.dicoding.dev/v2";

export async function getNotes(archived = false) {
  const url = archived ? `${API_BASE}/notes/archived` : `${API_BASE}/notes`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data || [];
}

export async function createNote(title, body) {
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
  const data = await res.json();
  return data.data;
}

export async function archiveNote(id) {
  await fetch(`${API_BASE}/notes/${id}/archive`, { method: "POST" });
}

export async function unarchiveNote(id) {
  await fetch(`${API_BASE}/notes/${id}/unarchive`, { method: "POST" });
}

export async function deleteNote(id) {
  await fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" });
}
