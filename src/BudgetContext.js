
//context
import React, { createContext, useContext, useEffect, useReducer } from 'react';

// Define action types for reducer
const ActionTypes = {
  ADD_EXPENSE: 'ADD_EXPENSE',
  REMOVE_EXPENSE: 'REMOVE_EXPENSE',
  UPDATE_AMOUNTS: 'UPDATE_AMOUNTS',
};

// Reducer function to manage expenses state
const expensesReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_EXPENSE:
      return { ...state, expenses: [...state.expenses, action.payload] };
    case ActionTypes.REMOVE_EXPENSE:
      return { ...state, expenses: state.expenses.filter((_, index) => index !== action.payload) };
    case ActionTypes.UPDATE_AMOUNTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Define initial state
const initialState = {
  expenses: [],
  budget: 2000,
  remainingAmount: 2000,
  spentSoFar: 0,
};

// Create context
const BudgetContext = createContext(initialState);

// Context provider component
export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expensesReducer, initialState);

  useEffect(() => {
    const totalExpenses = state.expenses.reduce((acc, curr) => acc + curr.expense, 0);
    const remainingAmount = state.budget - totalExpenses;
    const spentSoFar = totalExpenses;
    dispatch({ type: ActionTypes.UPDATE_AMOUNTS, payload: { remainingAmount, spentSoFar } });
  }, [state.expenses, state.budget]);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
