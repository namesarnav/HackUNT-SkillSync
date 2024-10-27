'use client';

import { useState } from 'react';

interface Note {
  id: string;
  content: string;
  timestamp: string;
  isPrivate: boolean;
}

interface SessionNotesProps {
  sessionId: string;
}

export function SessionNotes({ sessionId }: SessionNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const addNote = () => {
    if (!newNote.trim()) return;

    setNotes([
      ...notes,
      {
        id: Date.now().toString(),
        content: newNote,
        timestamp: new Date().toISOString(),
        isPrivate,
      },
    ]);
    setNewNote('');
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Session Notes</h3>
        
        <div className="space-y-4 mb-4">
          {notes.map((note) => (
            <div key={note.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{note.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(note.timestamp).toLocaleString()}
                  </p>
                </div>
                {note.isPrivate && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Private
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            rows={3}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Private note</span>
            </label>
            <button
              onClick={addNote}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}