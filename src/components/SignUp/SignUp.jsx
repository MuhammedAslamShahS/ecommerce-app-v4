import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../../authSlice";
import { getApiErrorMessage, registerUser } from "../../ApiService/api";
import "../Login/Login.css";

const createDisplayNameFromEmail = (email) => {
    return email.split("@")[0] || "Customer";
};

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [signupForm, setSignupForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const redirectPath = location.state?.from
        ? `${location.state.from.pathname}${location.state.from.search || ""}`
        : "/";

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setSignupForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));

        if (errorMessage) {
            setErrorMessage("");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedEmail = signupForm.email.trim();
        const trimmedPassword = signupForm.password.trim();
        const trimmedConfirmPassword = signupForm.confirmPassword.trim();

        if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
            const message = "Please fill in all fields.";
            setErrorMessage(message);
            toast.error(message);
            return;
        }

        if (trimmedPassword.length < 6) {
            const message = "Password must be at least 6 characters.";
            setErrorMessage(message);
            toast.error(message);
            return;
        }

        if (trimmedPassword !== trimmedConfirmPassword) {
            const message = "Passwords do not match.";
            setErrorMessage(message);
            toast.error(message);
            return;
        }

        try {
            setIsSubmitting(true);

            const { user, token } = await registerUser({
                name: createDisplayNameFromEmail(trimmedEmail),
                email: trimmedEmail,
                password: trimmedPassword,
            });

            dispatch(setCredentials({ user, token }));
            toast.success("Account created successfully.");
            navigate(redirectPath, { replace: true });
        } catch (error) {
            const message = getApiErrorMessage(error, "Sign up failed. Please try again.");
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
                    <span className="login-badge">Create account</span>
                    <h2 className="login-title">Sign up with your own email and password</h2>
                    <p className="login-subtitle">
                        Create your account once and use the same details whenever you come back to shop again.
                    </p>

                    {redirectPath !== "/" ? (
                        <p className="login-redirect-note">Create an account to continue to {redirectPath}.</p>
                    ) : null}
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label htmlFor="signup-email">Email address</label>
                        <input
                            id="signup-email"
                            name="email"
                            type="email"
                            autoCapitalize="none"
                            spellCheck={false}
                            placeholder="Enter your email"
                            value={signupForm.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="signup-password">Password</label>
                        <input
                            id="signup-password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={signupForm.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="signup-confirm-password">Confirm password</label>
                        <input
                            id="signup-confirm-password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={signupForm.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>

                    {errorMessage ? <p className="login-error">{errorMessage}</p> : null}

                    <button type="submit" className="login-submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </button>

                    <div className="login-footer">
                        <span>Already have an account?</span>
                        <Link to="/login" state={location.state} className="login-footer-link">
                            Log in
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

export default SignUp;
