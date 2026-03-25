import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../../authSlice";
import { getApiErrorMessage, loginUser } from "../../ApiService/api";
import "./Login.css";

const getSafeRedirectPath = (locationState) => {
    const redirectSource = locationState?.from;

    if (!redirectSource?.pathname) {
        return "/";
    }

    const blockedRedirectPaths = new Set(["/login", "/signup", "/register", "/logout"]);

    if (blockedRedirectPaths.has(redirectSource.pathname)) {
        return "/";
    }

    return `${redirectSource.pathname}${redirectSource.search || ""}`;
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const redirectPath = getSafeRedirectPath(location.state);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setLoginForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));

        if (errorMessage) {
            setErrorMessage("");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedEmail = loginForm.email.trim();
        const trimmedPassword = loginForm.password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            const message = "Please enter both email and password.";
            setErrorMessage(message);
            toast.error(message);
            return;
        }

        try {
            setIsSubmitting(true);

            const { user, token } = await loginUser({
                email: trimmedEmail,
                password: trimmedPassword,
            });

            dispatch(setCredentials({ user, token }));
            toast.success("Logged in successfully.");
            navigate(redirectPath, { replace: true });
        } catch (error) {
            const message = getApiErrorMessage(error, "Login failed. Please try again.");
            setErrorMessage(message);
            toast.error(message);
        } finally {
            setIsSubmitting(false);
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

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoCapitalize="none"
                            spellCheck={false}
                            placeholder="Enter your email"
                            value={loginForm.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={loginForm.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    {errorMessage ? <p className="login-error">{errorMessage}</p> : null}

                    <button type="submit" className="login-submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Logging In..." : "Log In"}
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
