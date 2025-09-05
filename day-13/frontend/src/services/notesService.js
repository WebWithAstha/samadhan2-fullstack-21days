import api from './api';

// Service for interacting with Notes API
const notesService = {
  // Get all notes
  getAllNotes: async () => {
    try {
      const response = await api.get('/notes');
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  // Get a single note by ID
  getNote: async (id) => {
    try {
      const response = await api.get(`/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching note ${id}:`, error);
      throw error;
    }
  },

  // Create a new note
  createNote: async (noteData) => {
    try {
      const response = await api.post('/notes', noteData);
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  // Update an existing note
  updateNote: async (id, noteData) => {
    try {
      const response = await api.put(`/notes/${id}`, noteData);
      return response.data;
    } catch (error) {
      console.error(`Error updating note ${id}:`, error);
      throw error;
    }
  },

  // Delete a note
  deleteNote: async (id) => {
    try {
      const response = await api.delete(`/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting note ${id}:`, error);
      throw error;
    }
  }
};

export default notesService;
