const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db("SIT725_DB");
        console.log('Connected to MongoDB...');
    } catch (err) {
        console.error('Could not connect to MongoDB...', err);
    }
}

function getDB() {
    if (!db) {
        throw new Error("Database not initialized. Call connectDB first.");
    }
    return db;
}

module.exports = { connectDB, getDB };
