import { useState } from "react";
import "./App.css";

function App() {
    // States to manage transactions, selected type, description, and amount
    const [selectedOption, setSelectedOption] = useState("income");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState([]);

    // Handle the radio button change for Income or Expense
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Handle form submit to add a new transaction
    const handleAddTransaction = (e) => {
        e.preventDefault();
        if (!description || !amount) {
            alert("Please enter a description and an amount.");
            return;
        }

        // Add new transaction to the transactions array
        const newTransaction = {
            id: Date.now(),
            type: selectedOption,
            description,
            amount: parseFloat(amount),
        };

        setTransactions([...transactions, newTransaction]);
        setDescription("");
        setAmount("");
    };

    // Calculate total balance, income, and expenses
    const calculateBalance = () => {
        let income = 0;
        let expenses = 0;
        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                income += transaction.amount;
            } else {
                expenses += transaction.amount;
            }
        });
        return {
            totalBalance: income - expenses,
            totalIncome: income,
            totalExpenses: expenses,
        };
    };

    const { totalBalance, totalIncome, totalExpenses } = calculateBalance();

    return (
        <div className="App">
            <h1>Income & Expense Tracker</h1>
            <form onSubmit={handleAddTransaction}>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="transactionType"
                            value="income"
                            checked={selectedOption === "income"}
                            onChange={handleOptionChange}
                        />
                        Income
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="transactionType"
                            value="expense"
                            checked={selectedOption === "expense"}
                            onChange={handleOptionChange}
                        />
                        Expense
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="submit">Add Transaction</button>
            </form>

            <h2>Balance</h2>
            <p>Total Balance: ${totalBalance.toFixed(2)}</p>
            <p>Total Income: ${totalIncome.toFixed(2)}</p>
            <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>

            <h2>Transaction History</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        <span>{transaction.description}</span> -{" "}
                        <span>${transaction.amount.toFixed(2)}</span> (
                        {transaction.type})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
