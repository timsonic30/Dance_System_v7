"use client";
import { useState, useEffect } from "react";
import Paid from "./paid";
import PendingPayment from "./pendingPayment";
import ShoppingCart from "./shoppingCart";

export default function Orders() {
  const [data, setData] = useState(null);

  const getData = async () => {
    let userId = "67d7cff0159b3e97b515661f";
    try {
      //抓出user的交易紀錄
      const userTransaction = await fetch(
        `http://localhost:3030/danceclass/transaction/${userId}`
      );
      const userTransactionRes = await userTransaction.json();
      let userTransactionList = userTransactionRes.userTransactions;

      //抓出課程紀錄
      const classData = await fetch(`http://localhost:3030/danceclass`);
      const classDataRes = await classData.json();
      let classDataList = classDataRes.classData;

      let dataList = userTransactionList.map((item) => {
        const matchedClass = classDataList.find(
          (classItem) => classItem._id === item.detail
        );
        if (matchedClass) {
          return {
            ...item,
            classData: matchedClass, //將找到的資料放入classData key裡面, 課程的資料是一個Object
          };
        }
      });
      setData(dataList);
    } catch (err) {
      console.error("Error fetching tutor data:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []); // 空依賴陣列

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-4/5 mb-4 mt-16 shadow-lg rounded-lg">
        <ShoppingCart data={data} />
      </div>

      <div className="w-4/5 mt-4 mb-4 shadow-lg rounded-lg">
        <PendingPayment data={data} />
      </div>
      <div className="w-4/5 mt-4 shadow-lg rounded-lg">
        <Paid data={data} />
      </div>
    </div>
  );
}
