import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "./App.css";

/* Supabase client */
const supabase = createClient(
  "https://sabspytycigijmosvirr.supabase.co",
  "sb_publishable_LeHkEAV5LKafCH2ntDTkyw_pJyvhboX"
);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  /* Check existing session */
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserData(data);
    };
    checkSession();
  }, []);

  /* Sign up */
  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      setUserData(data);
    }
  };

  /* Login */
  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      setUserData(data);
    }
  };

  /* Logout */
  const logout = async () => {
    await supabase.auth.signOut();
    setUserData(null);
  };

  /* ================= DASHBOARD ================= */
  if (userData?.session) {
    return (
      <div className="dashboard">
        <div className="dashboard-card">
          <h1>Hello, {userData.session.user.email}</h1>
          <p className="welcome-text">Welcome back to your dashboard</p>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  /* ================= AUTH ================= */
  return (
    <div className="auth-container">
      <div className={`auth-flip ${isSignup ? "flip" : ""}`}>
        <div className="auth-inner">
          {/* LOGIN */}
          <div className="auth-face auth-front">
            <h1>Welcome Back</h1>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={login}>Login</button>

            <p className="switch-text">
              Don&apos;t have an account?
              <span
                className="switch-link"
                onClick={() => setIsSignup(true)}
              >
                {" "}
                Sign up
              </span>
            </p>
          </div>

          {/* SIGN UP */}
          <div className="auth-face auth-back">
            <h1>Create Account</h1>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Choose your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={signUp}>Sign Up</button>

            <p className="switch-text">
              Already have an account?
              <span
                className="switch-link"
                onClick={() => setIsSignup(false)}
              >
                {" "}
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
