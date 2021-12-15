/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=b7f34c3f7abc275d330d65cbed795d76&units=metric'
//Feelings input variable
let feelings = document.querySelector('#feelings');
//Button variable
const generateBtn = document.querySelector('#generate');
//Output variables
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


//Event listener to add function to existing HTML DOM element
generateBtn.addEventListener('click', performAction);
/* Function called by event listener */
function performAction(e) {
    let zipValue = document.querySelector('#zip').value;
    getTemp(baseUrl, zipValue, apiKey).then(function(data) {
        //Conditional to pop up an alert in case of an error
        if(data.cod != 200) {
            return alert(data.message)
        }
        postData('/postData', {date:newDate, temp:data.main.temp, content:feelings.value});
    })
    .then(() =>{
        updateUI()
    })
};


//GET route
/* Function to GET Web API Data*/
const getTemp = async (baseUrl, zipValue, apiKey)=>{
    const res = await fetch(`${baseUrl}${zipValue}${apiKey}`);
    try {
      // Transform into JSON
      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

//POST data
/* Asynchronous Function to POST data */

const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', //Include, 'same-origin', 'omit' is necessary for a successful POST request
        headers: {
            //Should be JSON because we will be handling our data with JSON for the most part
            'Content-Type': 'application/json',
        },
        //Body data type must match "Content-type" header
        // When sending data to the web server, the data has to be string, so we use this method to convert JS objects and JSON data into string.
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log("error", error); // appropiately handle the error
    }
}

//Asynchronous function to retrieve the app’s data to update the User Interface or the client side
const updateUI = async () => {
    const req = await fetch('/all');
    try{
      const allData = await req.json();
      date.innerHTML = `Date: ${allData.date}`;
      temp.innerHTML = `Temperature: ${allData.temp}`;
      content.innerHTML = `I am feeling: ${allData.content}`;
    }catch (error){
      console.log("error", error);
    }
};
