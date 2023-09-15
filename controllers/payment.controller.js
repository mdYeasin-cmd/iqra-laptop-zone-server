// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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