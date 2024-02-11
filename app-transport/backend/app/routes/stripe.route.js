const express = require("express");
const Stripe = require("stripe");

require("dotenv").config();


const stripeSecretKey = 'sk_test_51OiMpOGf5W8k6CNIpYU98INspETc4XxZp9G8CzB9qCkRUJHcWr9J7GkRUN8sI8HqXZw2i9RhMFLuKQCJ40tDfxoj00yqmN9pIO';
const url = "https://localhost:3000/"

const stripe = Stripe(stripeSecretKey);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const { name, description, amount, currency } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: name,
                            description: description,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${url}`,
            cancel_url: `${url}`,
        });
        
        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});


module.exports = router;
