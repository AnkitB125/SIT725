let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server); 

dotenv.config();
const uri = process.env.MONGODB_URI;
let port = process.env.port || 3000;
let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db("SIT725_DB");
        console.log('Connected to MongoDB...');
    })
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// API route to get all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await db.collection('items').find().toArray();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Server Error');
    }
});


// Modify your POST route to emit an event
app.post('/api/items', async (req, res) => {    
    const { name, description } = req.body;
  
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
  
    try {
      const newItem = { name, description };
      await db.collection('items').insertOne(newItem);
      // Emit event to all connected clients
      io.emit('itemAdded', newItem);
      res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
      console.error('Error inserting item:', error);
      res.status(500).send('Server Error');
    }
});

// Rest of your code remains the same...

// Change app.listen to server.listen
server.listen(port, () => {
    console.log('Server running on http://localhost:3000');
});
