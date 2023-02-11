/*
aviv ben shitrit , id: 313357766
raz rachman      , id: 209045517


*/





import './Report.css';
import "./App.css";
import React, { useState, useEffect } from "react";
import NewExpense from "./NewExpenses";
import Report from "./Report";
import localstorage from "./localstorage";
import moment from "moment";
const currentDate = new Date();



//This is the main component that returns the HTML for the cost manager application.
function App() {

// The useState hook is used to initialize the state variable and the functions it is used to update its value.
// This is a state variable that holds an array of each variable ( costs, message,reportDate) . 
 
  const [costs, setCosts] = useState([]);
  const [message, setMessage] = useState('');
  const [reportDate, setReportDate] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  });
  const [cost, setCost] = useState({
    price: 0,
    category: '',
    item_name: '',
   
    purchaseDate: new Date(),
  });

  // This is the useEffect hook, which is called when the component is mounted.
  // It calls the reportHandler function, which updates the costs state with the costs for the selected date.

  useEffect(() => {
    reportHandler();
  }, [reportDate]);


  const reportDateHandler = (event) => {
    const { name, value } = event.target;
    setReportDate({ ...reportDate, [name]: value });
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setCost({ ...cost, [name]: value });
  };

  const reportHandler = async () => {
    try {
      // expense report for the entire year
      let costsForDate = [];
      if (reportDate.month === '12') {
        costsForDate = await localstorage.getReportByYear(
          reportDate.year
        );
      
      }
     
       else {
        // expense report for a specific month
        costsForDate = await localstorage.getReportByDate(
          reportDate.month,
          reportDate.year
        );
      }

      setCosts(costsForDate);
    } catch (error) {
      console.log(error);
    }
  };
  
  const submitHandler = async (event) => {
    event.preventDefault();
       setTimeout(() => {
      setMessage('');
      setCost({
        item_name: '',
        price: 0,
        category: '',
        purchaseDate: new Date(),
      });
    },2000);
     
    if (
      cost.price &&
      cost.category &&
      cost.purchaseDate 
    ) {
      try {
        await localstorage.addCost({
          ...cost,
          purchaseDate: moment(cost.purchaseDate).format('YYYY-MM-DD'),
        });

        setMessage('Item added successfully!');
      } catch (error) {
        setMessage('An error occurred while adding the item');
      }
    } else {
      setMessage('Please fill all the details before adding an item');
    }

    const date = new Date(cost.purchaseDate);

    setReportDate({
     
      year: date.getFullYear(),
      month: date.getMonth(),
    });

  };
  //This returns the HTML for the application.

  return (
    <div className='app'>
      <h1 className="h1">React Final Project Cost Manager</h1>
      <main>
        <NewExpense
          cost={cost}
          message={message}
          submitHandler={submitHandler}
          inputHandler={inputHandler}
        />
        <div className='line' />
        <Report
          costs={costs}
          reportDate={reportDate}
          reportDateHandler={reportDateHandler}
        />
      </main>
      <h2>By aviv and raz</h2>
    </div>
  );
}

export default App;
