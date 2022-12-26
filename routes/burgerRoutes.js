const express = require("express");
const router = express.Router();
const burgerModel = require("../models/burgerModel");

//get all burger request
router.get("/getAllBurgers", async (req, res) => {
  try {
    const burgers = await burgerModel.find({});
    res.send(burgers);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/addburger", async (req, res) => {
  const { burger } = req.body;

  try {
    const newBurger = new burgerModel({
      name: burger.name,
      image: burger.image,
      varients: ["small", "medium", "large"],
      description: burger.description,
      category: burger.category,
      prices: [burger.prices],
    });
    await newBurger.save();
    res.status(201).send("New Burger Added");
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/getburgerbyid", async (req, res) => {
  const burgerId = req.body.burgerId;
  try {
    let burger = await burgerModel.findOne({ _id: burgerId });
    res.send(burger);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/updatedburger", async (req, res) => {
  const updatedBurger = req.body.updatedBurger;
  try {
    const burger = await burgerModel.findOne({ _id: updatedBurger._id });
    (burger.name = updatedBurger.name),
      (burger.description = updatedBurger.description),
      (burger.image = updatedBurger.image),
      (burger.category = updatedBurger.category),
      (burger.prices = [updatedBurger.prices]);
    await burger.save();
    res.status(200).send("Burger Update Success");
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post('/deleteburger',async (req, res) => {
  const burgerId = req.body.burgerId
  try {
    await burgerModel.findOneAndDelete({_id: burgerId})
    res.status(200).send("Burger Deleted")
  } catch (error) {
    res.status(404).json({message : error})    
  }
})
module.exports = router;
