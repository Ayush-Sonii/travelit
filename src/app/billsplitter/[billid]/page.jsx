'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from 'next/navigation';

function Bill({params}) {
  const [peopleData, setPeopleData] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [fetching,setFetching] = useState(true);
  const [billStatus,setBillStatus] = useState(false);
  const [billPaid,setBillPaid] = useState(false);
  const [loading,setLoading] = useState(false);
  const router  = useRouter();
  
  async function getData(){
    try {
      const resp = await axios.get('/api/bills/getDetails',{
          params:{
              billId:params.billid,
          }
    })
      const billDetails = resp.data.resp;
      console.log(billDetails);
      setPeopleData(billDetails.memberData);
      setTransactions(billDetails.transactions);
      setExpenses(billDetails.expenses);
      setBillStatus(billDetails.settled);
    } catch (error) {
      console.log(error.message);
    } finally{
      setFetching(false);
    }
  }

  useEffect(()=>{
    getData();
  },[])

  const saveDetails = async ()=>{
    try {
        setLoading(true);
        const billId = params.billid;
        const resp = await axios.post('/api/bills/saveDetails',{billId,peopleData,expenses,transactions,billPaid});
        console.log(resp.data);
        router.push("/home");
    } catch (error) {
        console.log(error.message);
    } finally{
        setLoading(false);
    }
    
  }


  const handleAddExpense = (description, payer, amounts) => {
    const updatedPeopleData = [...peopleData];
    const processedAmount = amounts / updatedPeopleData.length;

    updatedPeopleData.forEach((data, index) => {
      if (index !== payer) {
        data.netAmount += processedAmount;
      } else {
        data.netAmount -= amounts - processedAmount;
      }
    });
    setPeopleData(updatedPeopleData);
    //console.log(peopleData);
    setExpenses([...expenses, { description, payer, amounts }]);
  };

  const settleDebts = () => {
    const balances = {};

    for (const person in peopleData) {
      const netAmount = peopleData[person].netAmount;
      balances[person] = netAmount;
    }

    const creditors = [];
    const debtors = [];

    for (const person in balances) {
      if (balances[person] > 0) {
        creditors.push({ name: person, amount: balances[person] });
      } else if (balances[person] < 0) {
        debtors.push({ name: person, amount: -balances[person] });
      }
    }

    creditors.sort((a, b) => a.amount - b.amount);
    debtors.sort((a, b) => a.amount - b.amount);

    const transactions = [];

    while (creditors.length > 0 && debtors.length > 0) {
      const creditor = creditors[0];
      const debtor = debtors[0];

      const minAmount = Math.min(creditor.amount, debtor.amount);

      balances[creditor.name] -= minAmount;
      balances[debtor.name] += minAmount;
      console.log(creditors[0].name);

      transactions.push({
        from: creditor.name,
        to: debtor.name,
        amount: minAmount,
      });

      if (creditor.amount === minAmount) {
        creditors.shift();
      } else {
        creditors[0].amount -= minAmount;
      }

      if (debtor.amount === minAmount) {
        debtors.shift();
      } else {
        debtors[0].amount -= minAmount;
      }
    }
    for (const transaction of transactions) {
      transaction.from = peopleData[transaction.from].name;
      transaction.to = peopleData[transaction.to].name;
    }
    //console.log(transactions);
    return transactions;
  };

  const handleSplitBills = () => {
    const result = settleDebts();
    //console.log(result);
    setTransactions(result);
  };
  if(fetching){
    return (
      <>
        <div className="absolute text-3xl left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
          Loading...
        </div>
      </>)
  }
  else if(billStatus){
    return (
      <>
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#293855] rounded-lg p-5 
        text-white">
            <div className="m-4 p-5">
                <h1 className="text-center text-2xl text-[#e76268]">Expenses:</h1>
                <ul className="mt-4 text-center">
                    {expenses.map((expense, index) => (
                        <li key={index} className="mb-2 text-lg">
                        {expense.description} ({peopleData[expense.payer].name}):{" "}
                        {expense.amounts} INR
                        </li>
                    ))}
                </ul>
            </div>
            <div className="m-4 p-5">
                <h1 className="text-center text-2xl text-[#e76268]">Settled as:</h1>
                <ul className="mt-4 text-center">
                    {transactions.map((txn, index) => (
                        <li key={index} className="mb-2 text-lg">
                        {txn.from} paid {txn.amount} INR to {txn.to}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </>)
  }  
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="p4 rounded-t shadow-md w-96 bg-[#3664f4]">
          <h1 className="text-3xl font-semibold m-4 text-center text-white">Bill Splitter</h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const description = e.target.description.value;
            const payer = parseInt(e.target.payer.value);
            const amounts = e.target.amounts.value.split(",").map(Number);
            handleAddExpense(description, payer, amounts);
            e.target.description.value = '';
            e.target.amounts.value = '';
            e.target.payer.value='';
          }}
          className="bg-white p-4 rounded shadow-md w-96"
        >
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="w-full p-2 border rounded mb-2"
          />
          <select
            name="payer"
            className="w-full p-2 border rounded mb-2 invalid:text-gray-50"
          >
            <option key='' hidden disabled selected value=''>
              Paid by
            </option>
            {peopleData.map((person, index) => (
              <option key={index} value={index}>
                {person.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="amounts"
            placeholder="Amount"
            className="w-full p-2 border rounded mb-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Expense
          </button>
        </form>

        <div className="p4 shadow-md bg-white w-96 flex justify-center h-20 overflow-auto">
          <ul className="mt-4 flex flex-col">
            {expenses.map((expense, index) => (
              <li key={index} className="mb-2">
                {expense.description} ({peopleData[expense.payer].name}):{" "}
                {expense.amounts} INR
              </li>
            ))}
          </ul>
        </div>

        <div className="p4 shadow-md w-96 bg-white flex justify-center flex-col overflow-auto">
          <button
            onClick={handleSplitBills}
            className="m-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Split Bills
          </button>
          <ul className="m-4 flex flex-col">
            {transactions.map((txn, index) => (
              <li key={index} className="mb-2">
                {txn.from} will pay {txn.amount} INR to {txn.to}
              </li>
            ))}
          </ul>
        </div>

        <div className="p4 shadow-md w-96 bg-[#f8b097] flex justify-center">
          <label htmlFor="settled" className="text-sm text-[#1a1a1a]">Mark as settled</label>
          <input type="checkbox" name="settled" id="settled" 
          className="p-2 ml-2"
            checked={billPaid}
            onChange={()=>{setBillPaid(!billPaid)}}
          />
          {/* <button
            onClick={()=>{setBillPaid(true)}}
            className="m-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Mark as settled
          </button> */}
        </div>

        <div className="p4 rounded-b shadow-md w-96 bg-[#77acb7] flex justify-center">
          <button
            onClick={saveDetails}
            className={`m-4 ${loading?'bg-green-600':'bg-green-500'} text-white px-4 py-2 rounded hover:bg-green-600`}
          >
            {loading?"Saving...":"Save Details"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Bill;


/*bg-[#1a1a1a] bg-[#77acb7] bg-[#f8b097] bg-[#3fc495]*/