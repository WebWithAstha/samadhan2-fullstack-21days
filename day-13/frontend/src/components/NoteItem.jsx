import { useState } from 'react';
import NoteForm from './NoteForm';

const NoteItem = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleUpdate = async (updatedNote) => {
    await onUpdate(note._id, updatedNote);
    setIsEditing(false);
  };
  
  const handleDelete = async () => {
    await onDelete(note._id);
    setShowConfirmDelete(false);
  };
  
  if (isEditing) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 mb-3 bg-gray-50">
        <h3 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Note
        </h3>
        <NoteForm 
          initialData={note} 
          onSubmit={handleUpdate} 
          buttonText="Update" 
        />
        <button 
          onClick={() => setIsEditing(false)} 
          className="mt-2 text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Cancel
        </button>
      </div>
    );
  }
  
  if (showConfirmDelete) {
    return (
      <div className="border border-red-100 rounded-lg p-4 mb-3 bg-red-50">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <h3 className="text-sm font-medium mb-2 text-gray-700">Delete Note?</h3>
          <p className="mb-3 text-xs text-gray-600">This action cannot be undone.</p>
          <div className="flex justify-center space-x-3">
            <button onClick={handleDelete} className="btn btn-danger text-xs py-1 px-2">
              Delete
            </button>
            <button onClick={() => setShowConfirmDelete(false)} className="btn btn-secondary text-xs py-1 px-2">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-3 hover:shadow-sm transition-shadow">
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-800">{note.title}</h3>
          {note.createdAt && (
            <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
              {formatDate(note.createdAt)}
            </span>
          )}
        </div>
        <div className="mt-2 text-xs text-gray-600 whitespace-pre-wrap line-clamp-3 min-h-[1.5rem]">
          {note.content || <span className="text-gray-400 italic">No content</span>}
        </div>
      </div>
      
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex justify-end space-x-1">
        <button 
          onClick={handleEdit} 
          className="inline-flex items-center text-xs text-gray-600 hover:text-indigo-600 py-1 px-2 rounded hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit
        </button>
        <button 
          onClick={() => setShowConfirmDelete(true)} 
          className="inline-flex items-center text-xs text-gray-600 hover:text-red-600 py-1 px-2 rounded hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
