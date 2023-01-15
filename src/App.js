import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function useFruits(value) {
  const [data, setData] = useState(['']);

  useEffect(() => {
    const fruits = [
      'strawberry',
      'blueberry',
      'berry',
      'apple',
      'bananas',
      'pineapple',
    ].filter(fruits => fruits.toLowerCase().includes(value.toLowerCase()));

    setData(fruits);
  }, [value]);

  return data;
}

function useDebounceValue(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}

function App() {
  const [text, setText] = useState('');
  const debounceText = useDebounceValue(text, 3000);
  const fruits = useFruits(debounceText);

  const handleChange = event => {
    setText(event.target.value);
  };

  return (
    <div className='App'>
      <h1>React auto complete</h1>
      <input type='text' value={text} onChange={handleChange} />
      <pre>Search Term: {debounceText || 'No search'}</pre>
      <pre>{JSON.stringify(fruits)}</pre>
    </div>
  );
}

export default App;
