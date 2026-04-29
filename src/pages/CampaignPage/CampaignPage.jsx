import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiChevronRight,
  FiClock,
  FiGift,
  FiMapPin,
  FiPackage,
  FiShield,
  FiStar,
  FiTruck,
} from "react-icons/fi";
import { getAllProducts } from "../../ApiService/api";
import "./CampaignPage.css";

const iconMap = {
  clock: FiClock,
  gift: FiGift,
  map: FiMapPin,
  package: FiPackage,
  shield: FiShield,
  star: FiStar,
  truck: FiTruck,
};

const CampaignPage = ({
  className = "",
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  highlights = [],
  metrics = [],
  sections = [],
  storefrontSection = "",
}) => {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const savedProducts = await getAllProducts();

        if (!isMounted) {
          return;
        }

        setProducts(savedProducts);
      } catch {
        if (isMounted) {
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingProducts(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProducts = useMemo(() => {
    return products
      .filter((product) => storefrontSection && product.section === storefrontSection)
      .slice(0, 8);
  }, [products, storefrontSection]);

  return (
    <main className={`campaign-page ${className}`.trim()}>
      <section className="campaign-hero">
        <div className="campaign-shell campaign-hero-grid">
          <div className="campaign-copy">
            <span className="campaign-eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{description}</p>

            <div className="campaign-actions">
              {primaryAction ? (
                <Link className="campaign-btn campaign-btn-primary" to={primaryAction.to}>
                  <span>{primaryAction.label}</span>
                  <FiArrowRight />
                </Link>
              ) : null}

              {secondaryAction ? (
                <Link className="campaign-btn campaign-btn-secondary" to={secondaryAction.to}>
                  {secondaryAction.label}
                </Link>
              ) : null}
            </div>

            {highlights.length ? (
              <div className="campaign-highlight-list">
                {highlights.map((highlight) => (
                  <div className="campaign-highlight" key={highlight}>
                    <FiStar />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="campaign-spotlight">
            <div className="campaign-spotlight-card">
              <span className="campaign-spotlight-label">Curated For You</span>
              <strong>Purposeful shopping moments with cleaner browsing and stronger discovery.</strong>
              <p>Each page is structured to feel focused, readable, and easy to explore on desktop and mobile.</p>
            </div>

            {metrics.length ? (
              <div className="campaign-metrics-grid">
                {metrics.map((metric) => {
                  const Icon = iconMap[metric.icon] || FiStar;

                  return (
                    <article className="campaign-metric-card" key={metric.label}>
                      <div className="campaign-metric-icon">
                        <Icon />
                      </div>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </article>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {storefrontSection ? (
        <section className="campaign-products">
          <div className="campaign-shell">
            <div className="campaign-products-header">
              <div>
                <span className="campaign-section-tag">Featured Products</span>
                <h2>Products selected for {storefrontSection}</h2>
              </div>

              <Link className="campaign-products-link" to="/products/all">
                <span>View all products</span>
                <FiChevronRight />
              </Link>
            </div>

            {isLoadingProducts ? <div className="campaign-products-empty">Loading section products...</div> : null}

            {!isLoadingProducts && featuredProducts.length === 0 ? (
              <div className="campaign-products-empty">
                No products are assigned to this storefront section yet.
              </div>
            ) : null}

            {!isLoadingProducts && featuredProducts.length > 0 ? (
              <div className="campaign-products-grid">
                {featuredProducts.map((product) => (
                  <Link className="campaign-product-card" key={product.id} to={`/product/${product.id}`}>
                    <div className="campaign-product-image-wrap">
                      {product.image ? (
                        <img src={product.image} alt={product.title} className="campaign-product-image" />
                      ) : (
                        <div className="campaign-product-image-placeholder">No image</div>
                      )}
                    </div>

                    <div className="campaign-product-copy">
                      <span className="campaign-product-category">{product.category || "Uncategorized"}</span>
                      <h3>{product.title}</h3>
                      <p>{product.description || "Explore this featured storefront product."}</p>
                      <strong>Rs. {Number(product.price || 0).toFixed(2)}</strong>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {sections.length ? (
        <section className="campaign-sections">
          <div className="campaign-shell campaign-sections-grid">
            {sections.map((section) => (
              <article className="campaign-section-card" key={section.title}>
                <span className="campaign-section-tag">{section.tag}</span>
                <h2>{section.title}</h2>
                <p>{section.description}</p>

                {section.points?.length ? (
                  <ul className="campaign-point-list">
                    {section.points.map((point) => (
                      <li key={point}>
                        <FiArrowRight />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default CampaignPage;
