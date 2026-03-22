import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer-main-container">
            {/* 1st Box */}
           
                <div className="top-stripe"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back To Top </div>

            {/* 2nd Box */}
            <div className="footer-main-block">
                <div className="footer-grid">
                    <div className="footer-column">
                        <h4>Get to Know Us</h4>
                        <p>About Store</p>
                        <p>Careers</p>
                        <p>Press Releases</p>
                    </div>

                    <div className="footer-column">
                        <h4>Connect with Us</h4>
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Instagram</p>
                    </div>

                    <div className="footer-column">
                        <h4>Make Money with Us</h4>
                        <p>Sell on Store</p>
                        <p>Affiliate</p>
                        <p>Advertise Products</p>
                    </div>

                    <div className="footer-column">
                        <h4>Let Us Help You</h4>
                        <p>Your Account</p>
                        <p>Returns</p>
                        <p>Help</p>
                    </div>
                </div>
            </div>

            {/* 3rd Box */}
            <div className="brand-local-bar">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </div>

            {/* 4th Box */}
            <div className="services-trip">
                <p>Services section</p>
            </div>

            {/* 5th Box */}
            <div className="legal-ottom-bar">
                <p>
                    <span>Privacy Notice</span> Cookies Notice
                </p>
                <p>© 2020-2026, store.com</p>
            </div>
        </div>
    );
};

export default Footer;