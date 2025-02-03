const { getDB } = require('../config/db');

class Item {
    static async getAll() {
        const db = getDB();
        return await db.collection('items').find().toArray();
    }

    static async insert(name, description) {
        const db = getDB();
        const newItem = { name, description };
        await db.collection('items').insertOne(newItem);
        return newItem;
    }

    static async seedItems() {
        const db = getDB();
        const collection = db.collection('items');
        const count = await collection.countDocuments();

        if (count === 0) {
            const items = [
                { name: 'Item 1', description: 'Description for Item 1' },
                { name: 'Item 2', description: 'Description for Item 2' },
                { name: 'Item 3', description: 'Description for Item 3' },
                { name: 'Item 4', description: 'Description for Item 4' },
                { name: 'Item 5', description: 'Description for Item 5' }
            ];
            await collection.insertMany(items);
            console.log('Database seeded with 5 items.');
        } else {
            console.log('Items already exist in the database.');
        }
    }
}

module.exports = Item;
