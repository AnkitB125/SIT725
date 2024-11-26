const express = require('express');
const app = express();
const port = 3000;

// A GET endpoint that sums two numbers passed in the query parameters
app.get('/sum', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send('Please provide two valid numbers.');
    }

    const sum = num1 + num2;
    res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
