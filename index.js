const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// Databse
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0nieed1.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    const usersCollection = client.db('iqraLaptopZoneDB').collection('users');

    try {
        // users related api
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(error => console.error(error));


app.get('/', (req, res) => {
    res.send('Iqra Laptop Zone server is running.')
});

app.listen(port, () => {
    console.log(`Iqra Laptop Zone server is running on port ${port}`);
})