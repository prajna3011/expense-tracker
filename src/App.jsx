import { useState, useEffect } from "react";
import "./App.css";
import Login from "./login"; // ✅ ADD THIS

// 🔥 Firebase
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  // 🔹 Expense states
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);

  // 🔹 Auth state
  const [user, setUser] = useState(null);

  // ✅ AUTH LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ REAL-TIME EXPENSES
  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "expenses"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpenses(data);
      },
    );

    return () => unsubscribe();
  }, [user]);

  // ✅ ADD EXPENSE
  const addExpense = async () => {
    if (!description || !amount) return;

    await addDoc(collection(db, "users", user.uid, "expenses"), {
      description,
      amount: parseFloat(amount),
      category,
      createdAt: new Date(),
    });

    setDescription("");
    setAmount("");
    setCategory("Food");
  };

  // ✅ DELETE EXPENSE
  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "expenses", id));
  };

  // ✅ LOGOUT
  const logout = async () => {
    await signOut(auth);
  };

  // ✅ TOTAL
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  // 🔐 SHOW LOGIN PAGE (THIS IS THE KEY FIX)
  if (!user) {
    return <Login />;
  }

  // ✅ MAIN APP UI
  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <p className="subtitle">Track your spending in real-time</p>

      <button onClick={logout}>Logout</button>

      <div className="total-card">
        <div className="total-label">Total Spent</div>
        <div className="total-amount">₹{total.toFixed(2)}</div>
      </div>

      <div className="form-card">
        <h2>Add Expense</h2>

        <div className="form">
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="form-row">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {["Food", "Transport", "Shopping", "Bills", "Other"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <button onClick={addExpense}>+ Add Expense</button>
        </div>
      </div>

      {expenses.length > 0 && <p className="list-header">Recent Expenses</p>}

      <ul className="list">
        {expenses.length === 0 && <p className="empty">No expenses yet</p>}

        {expenses.map((expense) => (
          <li key={expense.id} className="item">
            <div className="item-left">
              <div className="item-icon">
                {expense.category === "Food"
                  ? "🍔"
                  : expense.category === "Transport"
                    ? "🚗"
                    : expense.category === "Shopping"
                      ? "🛍️"
                      : expense.category === "Bills"
                        ? "📄"
                        : "💸"}
              </div>

              <div>
                <div className="item-desc">{expense.description}</div>
                <div className="cat">{expense.category}</div>
              </div>
            </div>

            <div className="row-right">
              <span className="amount">₹{expense.amount.toFixed(2)}</span>

              <button className="del" onClick={() => deleteExpense(expense.id)}>
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
