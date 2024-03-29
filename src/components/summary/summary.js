import React, { useState, useEffect } from 'react';
import './summary.css';

function BudgetPlanner() {
  const [budget, setBudget] = useState(0);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setRemaining(budget - totalExpenses);
  }, [budget, expenses]);


  const handleBudgetChange = (event) => {
    setBudget(parseInt(event.target.value));
  };

  const handleExpenseNameChange = (event) => {
    setExpenseName(event.target.value);
  };

  const handleExpenseAmountChange = (event) => {
    setExpenseAmount(parseInt(event.target.value));
  };

  const handleAddExpense = () => {
    if (expenseAmount > 0) {
      setRemaining(budget - expenseAmount);
      setExpenses([...expenses, { name: expenseName, amount: expenseAmount }]);
      setExpenseName('');
      setExpenseAmount(0);
    }
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="budget-planner">
      <h1>Budget Planner</h1>
      <label>
        Budget: 
        <input type="number" value={budget} onChange={handleBudgetChange} />
      </label>
      <br />
      <div className="exp">
      <label>
        Expense Name: 
        <input type="text" value={expenseName} onChange={handleExpenseNameChange} />
      </label>
      <label>
        Expense Amount: 
        <input type="number" value={expenseAmount} onChange={handleExpenseAmountChange} />
      </label>
      </div>
      <button className="btn" onClick={handleAddExpense}>Save Expense</button>
      <br />
      <div className="remaining">Remaining Amount: {remaining}</div>
      <h2>Expenses:</h2>
      <ul className="expenses">
        {expenses.map((expense, index) => (
          <li key={index}>
            <span className="expense-name">{expense.name}</span> <span className="expense-amount">{expense.amount}</span>
            <button className="delete-btn" onClick={() => handleDeleteExpense(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetPlanner;