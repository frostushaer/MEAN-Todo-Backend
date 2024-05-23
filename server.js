var express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
var userRoutes = require('./routes/users');
var todoRoutes = require('./routes/todos');

const app = express();

app.use(cors());

const MONGO_URL = "mongodb+srv://frostushaer20:123Rishi@cluster0.ohatreh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = 3000;


// connetion to database
mongoose.connect(MONGO_URL, {
    dbname: "ToDoApp",
}).then((c) => {
    console.log(`Database Connected with ${c.connection.host}`);
}).catch((err) => {
    console.log(err);
});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);



// server config...
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});