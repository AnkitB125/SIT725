const Item = require('../models/itemModel');

exports.getItems = async (req, res) => {
    try {
        const items = await Item.getAll();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Server Error');
    }
};

exports.addItem = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
    }

    try {
        const newItem = await Item.insert(name, description);
        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        console.error('Error inserting item:', error);
        res.status(500).send('Server Error');
    }
};

exports.seedDatabase = async (req, res) => {
    try {
        await Item.seedItems();
        res.send('Database has been seeded with 5 items!');
    } catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).send('Server Error');
    }
};
