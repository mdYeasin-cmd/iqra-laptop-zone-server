const dbConnect = require("./dbConnect");

const client = dbConnect();

// exports.categoriesCollection = client.db('iqraLaptopZoneDB').collection('categories');
// exports.productsCollection = client.db('iqraLaptopZoneDB').collection('products');
// exports.usersCollection = client.db('iqraLaptopZoneDB').collection('users');
// exports.ordersCollection = client.db('iqraLaptopZoneDB').collection('orders');