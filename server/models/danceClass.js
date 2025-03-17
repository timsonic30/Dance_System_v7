const mongoose = require("mongoose");
const { Schema } = mongoose;

//課程collection部份
const danceClassSchema = new Schema({
  code: String,
  type: {
    type: String,
    enum: [
      "Class Type",
      "Regular Class",
      "Pop Up Class",
      "Workshop Class",
      "Showcase Class",
      "Other Class",
    ],
  },
  style: {
    type: String,
    enum: [
      "Dance Type",
      "Heels Dance",
      "Chair Dance",
      "Jazz Funk",
      "Twerk",
      "Hip Hop",
      "House",
      "Poping",
      "Locking",
      "Girls Hip Hop",
      "Urban",
      "Conternporary",
      "Waacking",
      "K-pop",
      "Breaking",
    ],
  },
  teacher: String,
  vacancy: String,
  status: { type: String, enum: ["Status", "招收中", "已取消", "額滿"] },
  level: { type: String, enum: ["Level", "beginner", "Open style"] },
  date: { type: Date },
  startTime: { type: String },
  endTime: { type: String },
  description: String,
  price: { type: Number },
  lessonDuration: [{ type: Date }],
  room: { type: String, enum: ["Room Type", "Room X", "Room L", "Room XL"] },
  performanceDay: { type: Date },
  img: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const DanceClass = mongoose.model("DanceClass", danceClassSchema);

module.exports = DanceClass;

// 建立object及save到mongodb的範例
// const newDanceClass = new DanceClass({
//   code: "CLS905",
//   type: "Other Class",
//   style: "Girls Hip Hop",
//   teacher: "67d3ed811cc1f316f7a2748a",
//   vacancy: "7",
//   status: "招收中",
//   level: "beginner",
//   date: new Date("2025-04-28"),
//   startTime: "09:00",
//   endTime: "11:30",
//   description:
//     "A fun and empowering Girls Hip Hop class designed for beginners.",
//   price: 3200,
//   lessonDuration: [
//     new Date("2025-04-28T09:00:00"),
//     new Date("2025-04-28T11:30:00"),
//   ],
//   room: "Room X",
//   performanceDay: new Date("2025-05-25"),
//   img: "https://cdn.midjourney.com/59d8c800-32ad-45e1-ba4e-52803eaa9b4b/0_1.png",
//   createdAt: new Date(),
// });

// newDanceClass
//   .save()
//   .then((savedDoc) => {
//     console.log("儲存完畢, 資料是:");
//     console.log(savedDoc);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
