const express = require("express");

const router = express.Router();

//getting Item model
const Item = require("../../model/Item");

//getting all items
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: 1 }) // 1 for ascending, -1 for descending
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

//create new item
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem
    .save()
    .then((item) => res.status(200).json({ item: item, msg: "success" }))
    .catch((err) => console.log(err));
});

//deleting an item
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) =>
      item.remove().then(() => res.json({ msg: "item deleted successfully" }))
    )
    .catch((err) => res.status(404).json({ msg: "item not found" }));
});

module.exports = router;
