"use client";
import { useState, useEffect } from "react";
import Paid from './paid'
import PendingPayment from './pendingPayment'
import ShoppingCart from './shoppingCart'

export default function Orders() {
  const [shoppingCartData, setshoppingCartData] = useState(null);
  const [pendingPaymentData, setpendingPaymentData] = useState(null);
  const [paidData, setpaidData] = useState(null);
  
  let dataList = []

  const getData = async () => {
    let userId = '67d7cff0159b3e97b515661f'
    try {
      //抓出user的交易紀錄
      const userTransaction = await fetch(`http://localhost:3030/danceclass/transaction/${userId}`);      
      const userTransactionRes = await userTransaction.json();
      let userTransactionList = userTransactionRes.transactions
      //抓出課程紀錄
      const classData = await fetch(`http://localhost:3030/danceclass`)
      const classDataRes = await classData.json();
      let classDataList = classDataRes.classData
      
///使用 交易紀錄的detail找出課程資料給頁面使用

    } catch (err) {
      console.error("Error fetching tutor data:", err);
    }
  };
  
  useEffect(() => {
    getData();
  }, []); // 空依賴陣列
  
  
return ( <div className="w-full max-w-md">
    <ShoppingCart/>
    <PendingPayment/>
    <Paid/>
    </div>
  );
  
}
