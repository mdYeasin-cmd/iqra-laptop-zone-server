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
    const categoriesCollection = client.db('iqraLaptopZoneDB').collection('categories');
    const productsCollection = client.db('iqraLaptopZoneDB').collection('products');
    const ordersCollection = client.db('iqraLaptopZoneDB').collection('orders');

    try {
        // users related api
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        app.get('/allUsers', async (req, res) => {
            const query = {};
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/users', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            res.send(result);
        });

        // categories related api
        app.get('/categories', async (req, res) => {
            const query = {};
            const result = await categoriesCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { category_id: id }
            const result = await productsCollection.find(query).toArray();
            res.send(result);
        });

        // products related api
        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result);
        });

        // orders related api
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.send(result);
        });

        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await ordersCollection.find(query).toArray();
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