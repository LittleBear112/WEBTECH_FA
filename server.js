require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/items', require('./routes/items'));

app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Server Error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));