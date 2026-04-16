return (
  <div className="app">
    <h1>Expense Tracker</h1>
    <p className="subtitle">Track your spending in real-time</p>

    <div className="total-card">
      <div className="total-label">Total Spent</div>
      <div className="total-amount">₹{total.toFixed(2)}</div>
    </div>

    <div className="form-card">
      <h2>Add Expense</h2>
      <div className="form">
        <input
          placeholder="Description (e.g. Coffee)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="form-row">
          <input
            type="number"
            placeholder="Amount (₹)"
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
      {expenses.length === 0 && (
        <p className="empty">No expenses yet. Add one above!</p>
      )}
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
