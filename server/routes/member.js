const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Member = require("../models/member");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const Authorization = require("../middlewares/authorization");

router.post("/information", Authorization, async (req, res, next) => {
  try {
    const user = await Member.findOne({ _id: new ObjectId(req.body.objectId) });
    console.log(user);
    return res.json({
      username: user.username,
      phone: user.phone,
      email: user.email,
      gender: user.gender,
      birthday: user.dateOfBirth,
      point: user.point,
    });
  } catch (err) {
    throw new Error("Server Error");
  }
});

router.post("/edit", Authorization, async (req, res, next) => {
  const { editField, editValue, objectId } = req.body;
  const updateObject = { [editField]: editValue, updatedAt: new Date() };
  console.log(updateObject);
  try {
    const user = await Member.updateOne(
      { _id: new ObjectId(objectId) },
      { $set: updateObject }
    );
    console.log(user);
    return res.send(`Successfully update ${editField}`);
  } catch (err) {
    throw new Error("Server Error");
  }
});

module.exports = router;
