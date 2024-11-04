const express = require("express");
const router = express.Router();

const {
  getItems,
  saveItems,
  updateItems,
  deleteItems,
} = require("../controller/ItemController");
// const saveItems = require("../controller/ItemController"); // wrong approach , destructure it/Express expects a function, not an object.
// const updateItems = require("../controller/ItemController");
// const deleteItems = require("../controller/ItemController");

router.get("/items", getItems);
router.post("/items", saveItems);
router.put("/items/:id", updateItems);
router.delete("/items/:id", deleteItems);

module.exports = router;
