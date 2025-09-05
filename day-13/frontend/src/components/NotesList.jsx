import { useState, useEffect } from 'react';
import notesService from '../services/notesService';
import NoteForm from './NoteForm';
import NoteItem from './NoteItem';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch all notes when component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await notesService.getAllNotes();
      setNotes(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
      setError('Failed to load notes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      const newNote = await notesService.createNote(noteData);
      setNotes(prev => [newNote, ...prev]);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create note:', error);
      setError('Failed to create note. Please try again.');
    }
  };

  const handleUpdateNote = async (id, noteData) => {
    try {
      const updatedNote = await notesService.updateNote(id, noteData);
      setNotes(prev => prev.map(note => 
        note._id === id ? updatedNote : note
      ));
    } catch (error) {
      console.error('Failed to update note:', error);
      setError('Failed to update note. Please try again.');
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await notesService.deleteNote(id);
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (error) {
      console.error('Failed to delete note:', error);
      setError('Failed to delete note. Please try again.');
    }
  };

  if (loading && notes.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 mb-4 rounded-md">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <div className="mb-5">
        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)} 
            className="btn btn-primary flex items-center text-xs font-medium py-1.5 px-3 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            New Note
          </button>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
            <h3 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Create New Note
            </h3>
            <NoteForm onSubmit={handleCreateNote} />
            <button 
              onClick={() => setShowForm(false)} 
              className="mt-2 text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {notes.length === 0 && !loading ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No notes yet</h3>
          <p className="mt-1 text-gray-500">Create your first note to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map(note => (
            <NoteItem 
              key={note._id} 
              note={note} 
              onUpdate={handleUpdateNote} 
              onDelete={handleDeleteNote} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
