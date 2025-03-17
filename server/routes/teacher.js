const express = require("express");
const router = express.Router();
const Teacher = require("../models/teacher");
const DanceClass = require("../models/danceClass");

const { ObjectId } = require("mongodb");
const Authorization = require("../middlewares/authorization");

router.post("/information", Authorization, async (req, res, next) => {
  const { objectId } = req.body;
  try {
    const user = await Teacher.findOne({
      _id: new ObjectId(objectId),
    });
    // console.log(user);
    return res.json({
      username: user.username,
      phone: user.phone,
      email: user.email,
      gender: user.gender,
      birthday: user.dateOfBirth,
      point: user.point,
      nickname: user.nickname,
      style: user.style,
      instagram: user.instagram,
      avatar: user.profilePic,
    });
  } catch (err) {
    throw new Error("Server Error");
  }
});

router.post("/edit", Authorization, async (req, res, next) => {
  const { editField, editValue, objectId } = req.body;
  // const ID = "67d3eb571cc1f316f7a27482";
  const updateObject = { [editField]: editValue, updatedAt: new Date() };
  try {
    const user = await Teacher.updateOne(
      { _id: new ObjectId(objectId) },
      { $set: updateObject }
    );
    console.log(user);
    return res.send(`Successfully update ${editField}`);
  } catch (err) {
    throw new Error("Server Error");
  }
});

router.post("/getClassList", Authorization, async (req, res, next) => {
  const objectId = req.body.objectId;
  const presentClasses = [],
    oldClasses = [];
  const regularClass = [],
    popUpClass = [],
    workshopClass = [],
    showcaseClass = [],
    otherClass = [];
  try {
    const list = await DanceClass.find({ teacher: objectId });
    const filterList = list.filter(
      (classItem) => classItem["type"] === "Workshop Class"
    );
    list.forEach((classItem) => {
      if (classItem["type"] === "Workshop Class") {
        //   // regularClass.push(classItem);
        //   // } else if (classItem["type"] === "Pop Up Class") {
        //   //   popUpClass.push(classItem);
        //   // } else if (classItem["type"] === "Workshop Class") {
        workshopClass.push(classItem);
        //   // } else if (classItem["type"] === "Showcase Class") {
        //   //   showcaseClass.push(classItem);
        //   // } else {
        //   //   otherClass.push(classItem);
        //   // }
      }
    });

    // console.log(filterList);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the start of the day

    filterList.forEach((classItem) => {
      if (classItem.date < today) {
        oldClasses.push(classItem);
      } else {
        presentClasses.push(classItem);
      }
    });

    console.log(oldClasses);

    // console.log(today);
    // console.log(
    //   regularClass,
    //   popUpClass,
    //   workshopClass,
    //   showcaseClass,
    //   otherClass
    // );

    return res.send({
      regular: regularClass,
      popUp: popUpClass,
      workshop: workshopClass,
      showCase: showcaseClass,
      other: otherClass,
      present: presentClasses,
      old: oldClasses,
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
