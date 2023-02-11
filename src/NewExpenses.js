/*
aviv ben shitrit , id: 313357766
raz rachman      , id: 209045517


*/






import './NewExpenses.css';
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

// The main component that renders a form for adding expenses.
/* 
cost - An object that contains the current state of the form input values,
 such as the name of the item, description, price, category, and purchase date.

message - A string that displays a message to the user, typically indicating the success or failure of an operation such as submitting the form.

inputHandler - A function that is triggered when the user changes the value of any of the form inputs.
 It updates the cost object with the new values.

submitHandler - A function that is triggered when the user submits the form by clicking the "Add Item" button.
 It is responsible for processing the form data and sending it to the server or storing it in local storage, for example.
*/

const NewExpense = ({ cost, message, inputHandler, submitHandler }) => {
  return (
    <form onSubmit={submitHandler} className='NewExpenseForm'>
      <div className='row'>
        <label>Item Name:</label>
        <input
          className='input'
          type='text'
          name='item_name'
          value={cost.item_name}
          onChange={inputHandler}
          autocomplete='off'
        />
      </div>
      
      <div className='row'>
        <label>Price:</label>
        <input
          className='input'
          type='number'
          name='price'
          min='0'
          value={cost.price}
          onChange={inputHandler}
        />
      </div>
     
      <div className='row'>
        <label>Category:</label>
        <select
          name='category'
          className='input'
          value={cost.category}
          onChange={inputHandler}
        >
          <option value=''>Select a category</option>
          <option value='food'>Food</option>
          <option value='health'>Health</option>
          <option value='housing'>Housing</option>
          <option value='sport'>Sport</option>
          <option value='eduction'>Education</option>
          <option value='transportation'>Transportation</option>
          <option value='other'>Other</option>
        </select>
      </div>
      <div className='row'>
        <label>Purchase Date:</label>
        <input
          type='date'
          name='purchaseDate'
          className='input'
          value={cost.purchaseDate}
          onChange={inputHandler}
        />
      </div>
      <button className='btnSubmit' onClick={submitHandler}>
        Add Item
      </button>
      <div className='message'>{message}</div>
    </form>
  );
};

export default NewExpense;
