//Dependencies
const express = require("express");
const path = require("path"); 

//Express
const app = express();
const PORT = process.env.PORT || 3000;

//Data Parsing through Express
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Restaurant Arrays

let currentTables = [

];
let waitTables = [

];

//Routes

//  //Basic html page routing
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"))
})

//  //API Tables

app.get("/api/tables", function(req, res){
  return res.json(currentTables);
})

app.get("/api/waitlist", function(req, res){
  return res.json(waitTables);
})

//Reserve a Table - JSON input

app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newReservation.routeName = newReservation.customerName.replace(/\s+/g, "").toLowerCase();
    var currentTableslength = currentTables.length+1;
    console.log(newReservation);
    console.log(currentTableslength);
    
  
    if (currentTableslength <= 5) {
      currentTables.push(newReservation);
      
    } else {
      waitTables.push(newReservation);
      
    }
  
    // currentTableslength ++
    res.json(newReservation);
  });

//Starts the server: LISTEN
app.listen(PORT, function(){
  console.log("App listening on PORT " + PORT);
})