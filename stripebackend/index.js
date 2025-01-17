const cors = require("cors")
const express = require("express")
const stripe = require("stripe")("sk_test_IGBIPJmkW6YdnWGwhpCWM97M000Ut6BaBQ")
const uuid = require('uuid/v4')

const app = express()

// middleware
app.use(express.json())
app.use(cors())

// routes
app.post('/payment', (req, res) => {
    const { product, token } = req.body
    console.log("PRODUCT ", product)
    console.log("PRICE ", product.price)
    console.log("TOKEN ", token)
    const idempotencyKey = uuid()

    return stripe.customers
        .create({
            email: token.email,
            source: token.id
        })
        .then(customer => {
            stripe.charges.create({
                amount: product.price * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: `purchase of ${product.name}`,
                // shipping: {
                //     name: token.card.name,
                //     address: {
                //         country: token.card.address_country
                //     }
                // }
            }, { idempotencyKey })
        })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
})

// listen
app.listen(8282, () => console.log("Server is up on port:8282"))