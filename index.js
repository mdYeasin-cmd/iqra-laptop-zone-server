const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

function verifyJWT(req, res, next) {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.decoded = decoded;
        next();
    });

}

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
        app.get('/users', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            res.send(result);
        });

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
        app.get('/products', async (req, res) => {
            const email = req.query.email;
            const query = { sellerEmail: email };
            const result = await productsCollection.find(query).toArray();
            res.send(result);
        });

        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result);
        });

        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const body = req.body.isAdvertise;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    isAdvertise: body
                }
            };
            const result = await productsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/reportedProducts', async (req, res) => {
            const query = { isReported: true };
            const result = await productsCollection.find(query).toArray();
            res.send(result);
        })

        app.put('/reportedProducts/:id', async (req, res) => {
            const id = req.params.id;
            const body = req.body.isReported;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    isReported: body
                }
            };
            const result = await productsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

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
        });

        app.get('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.findOne(query);
            res.send(result);
        });

        // payment related api
        // app.post("/create-payment-intent", async (req, res) => {
        //     const booking = req.body;
        //     const price = booking.productPrice;
        //     const amount = price * 100;

        //     const paymentIntent = await stripe.paymentIntents.create({
        //         currency: "usd",
        //         amount: amount,
        //         "payment_method_types": [
        //             "card"
        //         ],
        //     });

        //     res.send({
        //         clientSecret: paymentIntent.client_secret,
        //     });

        // });

        // seller related api
        app.get('/sellers', async (req, res) => {
            const query = { userRole: 'seller' };
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/seller', async (req, res) => {
            const email = req.query.email;
            console.log(email);
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            res.send(result);
        })

        app.delete('/sellers/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        app.put('/sellers/:id', async (req, res) => {
            const id = req.params.id;
            const body = req.body.isVerified;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    isVerified: body
                }
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        // buyer related api
        app.get('/buyers', async (req, res) => {
            const query = { userRole: 'buyer' };
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        })

        app.delete('/buyers/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
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