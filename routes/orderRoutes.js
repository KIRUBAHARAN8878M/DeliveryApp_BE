const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51KiwMmSEYT4FQcHRbWoF8Onzy5tleQAveOo9pqF5drh5pMt2ExH3qCi3Ap1Ikok2cNaxOH70lh89Ffwo47QjZMAP00LULO3q1b"
);

const Order = require("../models/orderModel");

router.post("/placeorder", async (req, res) => {
  const { token, subTotal, currentUser, cartItems } = req.body;
  // console.log(req.body);

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: subTotal * 100,
        currency: "INR",
        payment_method_types: ["card"],
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (paymentIntent) {
      const newOrder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subTotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionId:token.card.id,
      });
      newOrder.save();
      res.send("Payment successful");
    } else {
      res.send("Payment failed");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.stack });
  }
});

router.post("/getuserorder", async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid }).sort({ _id: "-1" });
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.stack,
    });
  }
});

router.get("/alluserorder", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.stack,
    });
  }
});

router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid
  try {
    const order = await Order.findOne({_id:orderid});
    order.isDelivered = true;
    await order.save();
    res.status(200).send("Order Delivered Successfully");
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.stack,
    });
  }
});

module.exports = router;
