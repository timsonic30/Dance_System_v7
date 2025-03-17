"use client";
import { useState, useEffect } from "react";

export default function DanceClass() {
  const [classesHTML, setClassesHTML] = useState("");

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3030/danceclass");
      const res = await response.json();

      // 從 res.classData 中提取課程數據
      const classes = res.classData;      

      // 動態生成 HTML
      const html = classes.map((danceClass) => (
        <div
          key={danceClass._id}
          className="flex items-center bg-gray-700 mb-4 p-4 rounded shadow"
        >
          <div
            className="w-24 h-24 shrink-0 bg-cover bg-center rounded"
            style={{ backgroundImage: `url(${danceClass.img})` }}
          >
          </div>


          <div className="flex-1 flex items-center p-4">
            <div className="text-center mr-6">
              <div className="text-4xl font-bold text-white">
                {new Date(danceClass.date).getDate()}
              </div>
              <div className="text-xl text-white">{new Date(danceClass.date).toLocaleString('en-US', { month: 'short' })}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white">
                {danceClass.style} - {danceClass.teacher}
              </h3>
              <div className="text-white">
                {danceClass.startTime} - {danceClass.endTime}{" "}
                <span className="mx-2">•</span> {danceClass.room}
              </div>
            </div>

            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={() => alert(`Booking ${danceClass.code}`)}
            >
              Book This Class
            </button>
          </div>
        </div>
      ));

      setClassesHTML(html); // 更新 state
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData(); // 請求資料
  }, []);

  return <div className="max-w-4xl mx-auto">{classesHTML}</div>;
}
