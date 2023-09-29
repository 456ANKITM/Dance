const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const bodyparser = require("body-parser");




// Getting started Mongoose in node js 
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactdance');
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
  



// Define Mongoose Schema 
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String

  });




//   Compiling Model 
  var Contact  = mongoose.model('Contact', contactSchema);




// Express specific stufff 
app.use("/static", express.static('static')) ;// For serving static File 
app.use(express.urlencoded())



// Pug Specific Stuff 
app.set('view engine', 'pug'); // set the template engine as pug 
app.set('views', path.join(__dirname, 'views')); // set the views directory 



// End Points 
app.get('/', (req, res)=>{
    const params =  { }
    res.status(200).render('home.pug', params)
});



app.get('/contact', (req,res)=>{
    const params =  { }
    res.status(200).render('contact.pug', params)

});

app.post('/contact', (req, res)=>{
    var mydata = new Contact(req.body);
    mydata.save();
});




// Start the server 
app.listen(port, ()=>{
    console.log(`The application started sucessfully on port ${port}`);
});
