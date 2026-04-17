import { useState } from "react";
import "./login.css"; // ✅ IMPORTANT: this connects your CSS

// 🔥 Firebase Auth
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ LOGIN
  const login = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ SIGNUP
  const signup = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p className="login-subtitle">Login to your account</p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTONS */}
        <button className="login-btn login-primary" onClick={login}>
          Login
        </button>

        <button className="login-btn login-secondary" onClick={signup}>
          Create Account
        </button>

        <p className="login-footer">Secure login powered by Firebase</p>
      </div>
    </div>
  );
}

export default Login;
