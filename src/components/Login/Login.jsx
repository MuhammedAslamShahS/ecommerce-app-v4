import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../../authSlice";
import { toast } from "react-toastify";
import { login } from "../../ApiService/api";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const redirectPath = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const enteredEmail = String(formData.get("loginEmail") || "").trim();
      const enteredPassword = String(formData.get("loginPassword") || "").trim();

      if (!enteredEmail || !enteredPassword) {
          const message = "Please enter both email and password.";
          setErrorMessage(message);
          toast.error(message);
          return;
      }

      try {
          const { user, accessToken } = await login({ email: enteredEmail, password: enteredPassword });
          dispatch(setCredentials({ user, token: accessToken }));
          toast.success("Logged in successfully.");
          navigate(redirectPath, { replace: true });
      } catch (err) {
          const message = err?.response?.data?.message || "Login failed. Please try again.";
          setErrorMessage(message);
          toast.error(message);
      }
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-copy">
          <span className="login-badge">Welcome back</span>
          <h2 className="login-title">Sign in to continue shopping</h2>
          <p className="login-subtitle">
            Use the email and password you created from the sign-up page to access your account.
          </p>

          {redirectPath !== "/" ? (
            <p className="login-redirect-note">Please log in to continue to {redirectPath}.</p>
          ) : null}
        </div>

        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="login-decoy-fields" aria-hidden="true">
            <input type="text" name="username" autoComplete="username" tabIndex={-1} />
            <input type="password" name="password" autoComplete="current-password" tabIndex={-1} />
          </div>

          <div className="login-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="loginEmail"
              type="email"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="loginPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
            />
          </div>

          {errorMessage ? <p className="login-error">{errorMessage}</p> : null}

          <button type="submit" className="login-submit-btn">
            Log In
          </button>

          <div className="login-footer">
            <span>New here?</span>
            <Link to="/signup" state={location.state} className="login-footer-link">
              Create an account
            </Link>
          </div>

          <Link to="/" className="login-secondary-link">
            Continue browsing products
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
