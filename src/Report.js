/*
aviv ben shitrit , id: 313357766
raz rachman      , id: 209045517


*/






import './Report.css';
import React from "react";

/*
 Report - This is the main component that returns the report UI. It takes three props:
 costs: an array of objects, each object representing a cost, with properties such as item_name, price, category, and purchaseDate.
 reportDate: an object that contains the selected month and year for the report.
 reportDateHandler: a function that handles the change event when the user selects a different month or
*/

const Report = ({ costs, reportDate, reportDateHandler }) => {
    const totalCost = costs.reduce((total, cost) => total + parseFloat(cost.price), 0);
  return (
    <div className='report'>
      <form className='reportForm'>
        <div className='column'>
          <label>Month:</label>
          <select
            name='month'
            className='input'
            value={reportDate.month}
            onChange={reportDateHandler}
          >
            <option value=''>Select a month</option>
            <option value='12'>All Months</option>
            <option value='0'>January</option>
            <option value='1'>February</option>
            <option value='2'>March</option>
            <option value='3'>April</option>
            <option value='4'>May</option>
            <option value='5'>June</option>
            <option value='6'>July</option>
            <option value='7'>August</option>
            <option value='8'>September</option>
            <option value='9'>October</option>
            <option value='10'>November</option>
            <option value='11'>December</option>
          </select>
{/* from now cmd z  */}
        </div>
        <div className='column'>
          <label>Year:</label>
          <select
            name='year'
            className='input'
            value={reportDate.year}
            onChange={reportDateHandler}
          >
            <option value=''>Select a year</option>
            <option value='2023'>2023</option>
            <option value='2022'>2022</option>
            <option value='2021'>2021</option>
            <option value='2020'>2020</option>
            </select>
        </div>
      </form>

      <div className='reportContainer'>
        <table className='reportTable'>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((cost) => (
              <tr key={cost.id}>
                <td>{cost.item_name}</td>
                <td>{cost.price}₪</td>
                
                <td>{cost.category}</td>
                <code>
                  <td>{new Date(cost.purchaseDate).toLocaleDateString()}</td>
                </code>{" "}
                
              </tr>
            ))} 
          </tbody>
        </table>
        {costs.length === 0 && <div className='message'>No data available</div>}
        <div className='totalCost'>
        <hr />
        <h2>Total Cost: {totalCost}₪</h2>
      </div>
      </div>

    </div>
  );
};

export default Report;
