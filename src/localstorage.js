/*
aviv ben shitrit , id: 313357766
raz rachman      , id: 209045517


*/




const COSTS = {};

/*
This function returns a Promise that resolves once a new cost object is added to the array of cost objects stored in local storage.
The function retrieves the array by calling localStorage.getItem('costs'),
pushes the new cost object to the array, and stores the updated array in local storage using localStorage.
setItem('costs', JSON.stringify(allCosts)).
The new cost object is given a unique id by concatenating the item_name with the current timestamp.
The function returns a rejected Promise with an error message if an error occurs while retrieving or adding the cost object.
*/ 

COSTS.addCost = async (cost) => {
    return new Promise((resolve, reject) => {
      try {
        const allCosts = JSON.parse(localStorage.getItem('costs')) || [];
        allCosts.push({
          ...cost,
          // The id must be uniqe so we used timestamp
          id: `${cost.item_name}${new Date().getTime()}`,
          purchaseDate: new Date(cost.purchaseDate),
        });
        localStorage.setItem('costs', JSON.stringify(allCosts));
        resolve();
      } catch (error) {
        reject(`Failed to add cost ${cost.item_name}: ${error}`);
      }
    });
  };
  

   





/* 
getReportByDate(month, year): This function returns a Promise that resolves to an array of cost objects,
filtered by the specified month and year. The cost objects are stored in local storage,
and the method retrieves them by calling localStorage.getItem('costs').
The returned array is filtered by checking if the purchaseDate of each cost object matches the specified month and year.
The function returns a rejected Promise with an error message if an error occurs while retrieving or filtering the cost objects.

*/ 

COSTS.getReportByDate = async (month, year) => {
  return new Promise((resolve, reject) => {
    try {
      const allCosts = JSON.parse(localStorage.getItem('costs')) || [];
      const costsForDate = allCosts.filter((cost) => {
        const costDate = new Date(cost.purchaseDate);
        return (
          costDate.getMonth() === parseInt(month) &&
          costDate.getFullYear() === parseInt(year)
        );
      });
      resolve(costsForDate.reverse());
    } catch (error) {
      reject(
        `Failed to get costs for the month ${month} and year ${year}: ${error}`
      );
    }
  });
};



COSTS.getReportByYear = async (year) => {
  return new Promise((resolve, reject) => {
    try {
      const allCosts = JSON.parse(localStorage.getItem('costs')) || [];
      const costsForYear = allCosts.filter((cost) => {
        const costDate = new Date(cost.purchaseDate);

        return costDate.getFullYear() === parseInt(year);
      });

      resolve(costsForYear.reverse());
    } catch (error) {
      reject(`Failed to get costs for the year ${year}: ${error}`);
    }
  });
};



export default COSTS;
