import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <h2>Counter Component</h2>
      <div className="counter-display">
        <span className={count > 0 ? 'positive' : count < 0 ? 'negative' : ''}>
          {count}
        </span>
      </div>
      <div className="counter-controls">
        <button onClick={decrement} className="counter-btn decrement">
          -
        </button>
        <button onClick={reset} className="counter-btn reset">
          Reset
        </button>
        <button onClick={increment} className="counter-btn increment">
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
