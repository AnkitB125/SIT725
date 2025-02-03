const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
