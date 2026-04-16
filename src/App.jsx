// src/App.jsx
import { useState, useEffect } from "react";
import {
  collection, // points to a collection
  addDoc, // creates a new document
  onSnapshot, // real-time listener
  deleteDoc, // removes a document
  doc, // points to a specific document
  orderBy, // sorts results
  query, // builds a query
} from "firebase/firestore";
import { db } from "./firebase";
import "./App.css";

const EXPENSES_COLLECTION = collection(db, "expenses"); // "expenses" is your collection name

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  // ─── REAL-TIME LISTENER ──────────────────────────────────────────────────
  // onSnapshot fires immediately with current data, then again on every change
  useEffect(() => {
    const q = query(EXPENSES_COLLECTION, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id, // Firestore auto-generated ID
        ...doc.data(), // spread all the fields you saved
      }));
      setExpenses(data);
    });

    return unsubscribe; // cleanup: stops listening when component unmounts
  }, []);

  // ─── ADD EXPENSE ─────────────────────────────────────────────────────────
  const addExpense = async () => {
    if (!description || !amount) return;

    await addDoc(EXPENSES_COLLECTION, {
      description,
      amount: parseFloat(amount),
      category,
      createdAt: new Date(), // Firestore stores this as a Timestamp
    });

    // Reset form
    setDescription("");
    setAmount("");
  };

  // ─── DELETE EXPENSE ──────────────────────────────────────────────────────
  const deleteExpense = async (id) => {
    const docRef = doc(db, "expenses", id); // get a reference to the specific doc
    await deleteDoc(docRef);
    // No need to update state manually — onSnapshot will fire and do it for you!
  };

  // ─── TOTAL ───────────────────────────────────────────────────────────────
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <p className="total">Total: ₹{total.toFixed(2)}</p>

      {/* ── ADD FORM ── */}
      <div className="form">
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {["Food", "Transport", "Shopping", "Bills", "Other"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button onClick={addExpense}>Add</button>
      </div>

      {/* ── EXPENSE LIST ── */}
      <ul className="list">
        {expenses.map((expense) => (
          <li key={expense.id} className="item">
            <div>
              <strong>{expense.description}</strong>
              <span className="cat">{expense.category}</span>
            </div>
            <div className="row-right">
              <span>₹{expense.amount.toFixed(2)}</span>
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
