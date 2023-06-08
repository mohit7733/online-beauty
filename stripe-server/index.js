const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/stripe/charges", cors(), async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { planId, email, paymentMethodId } = req.body;
  console.log("stripe-routes.js 10 | planId and email", planId, email);
  try {
    const customer = await stripe.customers.create({
      email: email,
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: planId,
        },
      ],
      expand: ["latest_invoice.payment_intent"],
    });

    const paymentIntent = subscription.latest_invoice.payment_intent;

    // Wait for payment intent status to be 'succeeded'
    await stripe.paymentIntents.retrieve(paymentIntent.id, {
      expand: ['invoice'],
    });

    const invoice = paymentIntent.invoice;
    await stripe.invoices.sendInvoice(invoice.id);

    console.log("stripe-routes.js 19 | subscription", subscription);
    res.json({
      message: "Subscription Successful",
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Subscription Failed",
      success: false,
    });
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started...");
});
