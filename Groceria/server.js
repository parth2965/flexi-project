const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/contact', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB connection successful");
});

// Define the schema and model
const userSchema = new mongoose.Schema({
    fname: { type: String },
    lName: { type: String },
    email: { type: String },
    phone: { type: String },
    topic: { type: String },
    message: { type: String },
});
const Users = mongoose.model("data", userSchema);

// Routes

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Create - Add new user data
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
            res.status(500).send("Error submitting form");
        });
});

// Read - Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).send("Error retrieving users");
    }
});

// Read - Get a specific user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");
        res.json(user);
    } catch (err) {
        console.error("Error retrieving user:", err);
        res.status(500).send("Error retrieving user");
    }
});

// Update - Update a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        if (!updatedUser) return res.status(404).send("User not found");
        res.json(updatedUser);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).send("Error updating user");
    }
});

// Delete - Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).send("User not found");
        res.send("User deleted successfully");
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).send("Error deleting user");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
