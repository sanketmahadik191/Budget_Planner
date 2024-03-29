// App.js

import React, { useState } from 'react';
import './App.css';
import { BudgetProvider, useBudget } from './BudgetContext';

function App() {
  const { state, dispatch } = useBudget();
  const [inputValues, setInputValues] = useState({ title: '', expense: '' });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleAddExpense = () => {
    const title = inputValues.title.trim();
    const expense = parseInt(inputValues.expense);
    if (title && expense) {
      dispatch({ type: 'ADD_EXPENSE', payload: { title, expense } });
    }
  };

  // Handler for removing expense
  const handleRemoveExpense = (index, expense) => {
    dispatch({ type: 'REMOVE_EXPENSE', payload: index });
  };

  return (
    <div className="App">
      <h1>My Budget Planner</h1>
      f
      <h2>Expenses</h2>
      <div className="expenses">
        <ul>
          {state.expenses.map((item, index) => (
            <li key={index}>
              <span>{item.title}</span><span> Rs {item.expense}</span>
              <button onClick={() => handleRemoveExpense(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <h2>Add Expenses</h2>
      <div className="input">
        <input
          type="text"
          placeholder="Name"
          name="title"
          value={inputValues.title}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Cost"
          name="expense"
          value={inputValues.expense}
          onChange={handleInputChange}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
    </div>
  );
}

const AppWithContext = () => (
  <BudgetProvider>
    <App />
  </BudgetProvider>
);

export default AppWithContext;
