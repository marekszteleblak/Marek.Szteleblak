const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/api', taskRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
