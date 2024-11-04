const Item = require("../model/Items");


const getItems = async (req, res) => {
  const items = await Item.find();
    res.json(items);
//   return res.status(200).send(items);
};

const saveItems = async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
};

const updateItems = async (req, res) => {
  const { id } = req.params;
  const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedItem);
};

const deleteItems = async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.json({ message: "Item deleted" });
};

module.exports = {
  getItems,
  saveItems,
  updateItems,
  deleteItems,
};
