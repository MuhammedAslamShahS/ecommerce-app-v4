import { Link } from "react-router-dom";
import {
    FiArrowRight,
    FiCheckCircle,
    FiHeadphones,
    FiPackage,
    FiShield,
    FiTrendingUp,
    FiTruck,
    FiUsers,
} from "react-icons/fi";
import logo from "../../assets/logo.png";
import "./About.css";

const principles = [
    {
        title: "Fast-moving shopping flow",
        description: "From search to checkout, every step is built to feel quick, clear, and low-friction.",
        icon: FiTruck,
    },
    {
        title: "Trust at every touchpoint",
        description: "Clean product discovery, dependable pricing, and a storefront experience customers can rely on.",
        icon: FiShield,
    },
    {
        title: "Support that feels human",
        description: "We design every detail so customers feel guided before, during, and after the order.",
        icon: FiHeadphones,
    },
];

const stats = [
    { value: "100+", label: "carefully selected products", icon: FiPackage },
    { value: "24/7", label: "shopping access across devices", icon: FiTrendingUp },
    { value: "1", label: "consistent brand experience", icon: FiUsers },
];

const promises = [
    "Responsive storefront built for mobile and desktop",
    "Black, white, and orange visual language across the experience",
    "Customer-first browsing, checkout, and account journey",
];

const milestones = [
    {
        step: "01",
        title: "Curated assortment",
        description: "We focus on products customers can discover quickly instead of overwhelming them with clutter.",
    },
    {
        step: "02",
        title: "Polished presentation",
        description: "Product visuals, navigation, and supporting content are designed to feel premium and easy to scan.",
    },
    {
        step: "03",
        title: "Confidence after click",
        description: "Wishlist, cart, profile, and order flows are shaped around clarity, speed, and reassurance.",
    },
];

const About = () => {
    return (
        <main className="about-page">
            <section className="about-hero">
                <div className="about-shell about-hero-grid">
                    <div className="about-hero-copy">
                        <span className="about-eyebrow">About Store</span>
                        <h1>Modern shopping, shaped with speed, clarity, and style.</h1>
                        <p className="about-hero-text">
                            Store is built for customers who want a sharper e-commerce experience. We combine a clean
                            interface, bold visual identity, and practical shopping flows so browsing feels premium and
                            effortless from the very first click.
                        </p>

                        <div className="about-hero-actions">
                            <Link to="/products/all" className="about-btn about-btn-primary">
                                Explore products
                                <FiArrowRight />
                            </Link>

                            <Link to="/" className="about-btn about-btn-secondary">
                                Back to home
                            </Link>
                        </div>

                        <div className="about-hero-promise-list">
                            {promises.map((promise) => (
                                <div className="about-hero-promise" key={promise}>
                                    <FiCheckCircle />
                                    <span>{promise}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="about-hero-visual">
                        <div className="about-glow about-glow-one" />
                        <div className="about-glow about-glow-two" />

                        <div className="about-brand-card">
                            <div className="about-brand-top">
                                <img src={logo} alt="Store logo" className="about-brand-logo" />
                                <div>
                                    <p className="about-brand-label">Store Experience</p>
                                    <h2>Black. White. Orange.</h2>
                                </div>
                            </div>

                            <p className="about-brand-copy">
                                A storefront crafted to look refined, move fast, and help customers shop with
                                confidence.
                            </p>

                            <div className="about-brand-tags">
                                <span>Responsive UI</span>
                                <span>Premium feel</span>
                                <span>Customer-first</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="about-story">
                <div className="about-shell about-story-grid">
                    <div className="about-story-copy">
                        <span className="about-section-tag">Who we are</span>
                        <h2>Not just an about page. A clear picture of how the brand should feel.</h2>
                        <p>
                            Store is designed around an idea that great e-commerce should feel intentional. Customers
                            should be able to understand the brand quickly, find what they need without friction, and
                            trust the experience enough to keep coming back.
                        </p>
                        <p>
                            That is why our interface leans on strong contrast, focused layout decisions, and warm
                            orange accents that guide attention without taking over the page.
                        </p>
                    </div>

                    <div className="about-story-panel">
                        <div className="about-story-item">
                            <span>01</span>
                            <div>
                                <h3>Clear brand identity</h3>
                                <p>Bold contrast and clean sections give the site a more premium, memorable feel.</p>
                            </div>
                        </div>

                        <div className="about-story-item">
                            <span>02</span>
                            <div>
                                <h3>Responsive by default</h3>
                                <p>Layouts adapt cleanly so the same experience feels polished across screen sizes.</p>
                            </div>
                        </div>

                        <div className="about-story-item">
                            <span>03</span>
                            <div>
                                <h3>Built around confidence</h3>
                                <p>Every touchpoint aims to reduce hesitation and make shopping feel straightforward.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-principles">
                <div className="about-shell">
                    <div className="about-section-heading">
                        <span className="about-section-tag">Our approach</span>
                        <h2>The experience pillars behind Store</h2>
                    </div>

                    <div className="about-principles-grid">
                        {principles.map((principle) => {
                            const Icon = principle.icon;

                            return (
                                <article className="about-principle-card" key={principle.title}>
                                    <div className="about-principle-icon">
                                        <Icon />
                                    </div>
                                    <h3>{principle.title}</h3>
                                    <p>{principle.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="about-band">
                <div className="about-shell about-band-grid">
                    <div className="about-band-copy">
                        <span className="about-section-tag about-section-tag-inverse">Why it works</span>
                        <h2>A branded storefront should feel premium before the customer even adds to cart.</h2>
                        <p>
                            Strong visual hierarchy, useful navigation, and consistent interactions make the experience
                            feel more trustworthy. That trust is what turns casual visits into meaningful shopping
                            sessions.
                        </p>
                    </div>

                    <div className="about-stats-grid">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <article className="about-stat-card" key={stat.label}>
                                    <Icon className="about-stat-icon" />
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="about-milestones">
                <div className="about-shell">
                    <div className="about-section-heading">
                        <span className="about-section-tag">What we focus on</span>
                        <h2>Three things that shape the Store experience</h2>
                    </div>

                    <div className="about-milestone-grid">
                        {milestones.map((milestone) => (
                            <article className="about-milestone-card" key={milestone.step}>
                                <span className="about-milestone-step">{milestone.step}</span>
                                <h3>{milestone.title}</h3>
                                <p>{milestone.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about-cta">
                <div className="about-shell about-cta-card">
                    <div>
                        <span className="about-section-tag">Ready to explore</span>
                        <h2>See the brand in motion across the storefront.</h2>
                        <p>
                            Browse the catalog, try the search experience, and move through the customer journey the
                            way your shoppers will.
                        </p>
                    </div>

                    <Link to="/products/all" className="about-btn about-btn-primary">
                        Start shopping
                        <FiArrowRight />
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default About;
