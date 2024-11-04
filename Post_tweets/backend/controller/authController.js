const Item = require("../model/Items");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userRegister = async (req, res) => {
  let user1 = await Item.findOne({email:req.body.email });
  if (user1) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new Item({ email: req.body.email, password: hashedPassword });
  await user.save();
  res.status(201).send("User created");
};

const userLogin = async (req, res) => {
  const user = await Item.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User not found");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid password");

  const token = jwt.sign({ userId: user._id }, "secret_key");
  res.send({ token });
};

module.exports = {
  userRegister,
  userLogin,
};
