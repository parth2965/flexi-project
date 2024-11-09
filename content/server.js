const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;


app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/contact')
const db =mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connect successful")
})


const userSchema = new mongoose.Schema({
   
    fname: { type: String },
    lName: { type: String }, // Use quotes for string data type
    email: { type: String },
    phone: { type: String },
    topic: { type: String },
    message: { type: String },
  });
const Users= mongoose.model("data",userSchema);

// Define your routes and middleware here
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'contact.html'));
});

app.post('/post', async (req, res) => {
    const { fName, lName, email, phone, topic, message } = req.body;
  
    const user = new Users({
      fName,
      lName,
      email,
      phone,
      topic,
      message,
    });
  
    await user.save()
      .then(() => res.send("Form submission successful"))
      .catch(err => {
        console.error("Error saving user data:", err);
        res.status(500).send("Error submitting form"); // Handle errors with proper status code and message
      });
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});