import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  const remainingCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>
      
      <div className="filters">
        <button 
          onClick={() => setFilter('all')} 
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')} 
          className={filter === 'active' ? 'active' : ''}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>
      
      <ul className="todo-list">
        {filteredTodos.length > 0 ? (
          filteredTodos.map(todo => (
            <li key={todo.id} className="todo-item">
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className={todo.completed ? 'completed' : ''}>
                  {todo.text}
                </span>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li className="empty-message">No tasks found</li>
        )}
      </ul>
      
      <div className="todo-footer">
        <span>{remainingCount} {remainingCount === 1 ? 'item' : 'items'} left</span>
        <button onClick={clearCompleted} className="clear-btn">
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
