let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGODB_URI;
let port = process.env.port || 3000;
let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db("SIT725_DB");
        console.log('Connected to MongoDB...');
        // Seed the database with 5 items automatically
        seedItems();
    })
    .catch(err => console.error('Could not connect to MongoDB...', err));



app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.render('index.html');
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

// Route to insert a new item
app.post('/api/items', async (req, res) => {    
    const { name, description } = req.body;
  
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
  
    try {
      const newItem = { name, description };
      await db.collection('items').insertOne(newItem);
      res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
      console.error('Error inserting item:', error);
      res.status(500).send('Server Error');
    }
  });


// Seeder function to add 5 items
async function seedItems() {
    const collection = db.collection('items');
    const count = await collection.countDocuments();

    // If the collection is empty, seed with 5 items
    if (count === 0) {
        const items = [
            { name: 'Item 1', description: 'Description for Item 1' },
            { name: 'Item 2', description: 'Description for Item 2' },
            { name: 'Item 3', description: 'Description for Item 3' },
            { name: 'Item 4', description: 'Description for Item 4' },
            { name: 'Item 5', description: 'Description for Item 5' }
        ];

        try {
            await collection.insertMany(items);
            console.log('5 items have been added to the database.');
        } catch (error) {
            console.error('Error seeding items:', error);
        }
    } else {
        console.log('Items already exist in the database.');
    }
}


// Route to manually seed the items
app.get('/seed', async (req, res) => {
    await seedItems();
    res.send('Database has been seeded with 5 items!');
});




app.listen(port, () => {
    console.log('Server running on http://localhost:3000');
});


