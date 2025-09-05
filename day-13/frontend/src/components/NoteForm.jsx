import { useState } from 'react';

const NoteForm = ({ onSubmit, initialData = { title: '', content: '' }, buttonText = 'Save Note' }) => {
  const [note, setNote] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!note.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(note);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <div className="relative">
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 text-xs border rounded-md shadow-sm focus:ring-2 focus:outline-none
              ${errors.title 
                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'}`}
            placeholder="Enter note title..."
          />
          {errors.title && (
            <div className="mt-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-red-500">{errors.title}</p>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-xs font-medium text-gray-700 mb-1">Content</label>
        <div className="relative">
          <textarea
            id="content"
            name="content"
            value={note.content}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
            placeholder="Write your note content here..."
          ></textarea>
        </div>
      </div>
      
      <div className="flex justify-end pt-2">
        <button 
          type="submit" 
          className="px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-md shadow-sm hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors duration-200"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
