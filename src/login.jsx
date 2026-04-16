<div className="login-page">
  <div className="login-card">
    <h2>Sign in</h2>
    <p className="login-subtitle">Access your account</p>

    <label className="login-label">Email</label>
    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <label className="login-label">Password</label>
    <input
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button className="login-btn login-primary" onClick={login}>
      Sign In
    </button>

    <button className="login-btn login-secondary" onClick={signup}>
      Create Account
    </button>
  </div>
</div>;
