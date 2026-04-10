import { SavedNote } from "./types";

const STORAGE_KEY = "classsupport_notes";

export function getNotes(): SavedNote[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveNote(note: SavedNote): void {
  const notes = getNotes();
  notes.unshift(note);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function deleteNote(id: string): void {
  const notes = getNotes().filter((n) => n.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function getNoteById(id: string): SavedNote | undefined {
  return getNotes().find((n) => n.id === id);
}
