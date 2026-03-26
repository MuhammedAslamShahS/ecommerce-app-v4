import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import { CiDeliveryTruck, CiHeart, CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { BiMessageError } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";
import { AiOutlineShopping } from "react-icons/ai";
import { getAllProducts } from "../../ApiService/api";
import HeaderTopBar from "./HeaderTopBar";

const RECENT_SEARCHES_STORAGE_KEY = "store_recent_searches";
const MAX_RECENT_SEARCHES = 5;
const MAX_PRODUCT_SUGGESTIONS = 7;

const readRecentSearches = () => {
    try {
        const storedValue = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
        const parsedValue = storedValue ? JSON.parse(storedValue) : [];

        if (!Array.isArray(parsedValue)) {
            return [];
        }

        return parsedValue
            .filter((item) => typeof item === "string" && item.trim())
            .map((item) => item.trim())
            .slice(0, MAX_RECENT_SEARCHES);
    } catch {
        return [];
    }
};

const buildSearchableProductText = (product) => {
    return [product.title, product.category, product.description].filter(Boolean).join(" ").toLowerCase();
};

const buildProtectedRedirectTarget = (path) => {
    const [pathname, search = ""] = path.split("?");

    return {
        pathname,
        search: search ? `?${search}` : "",
    };
};

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const searchBoxRef = useRef(null);
    const searchPopupRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(() => {
        return new URLSearchParams(location.search).get("search")?.trim() ?? "";
    });
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(true);
    const [hasSuggestionsError, setHasSuggestionsError] = useState(false);
    const [recentSearches, setRecentSearches] = useState(readRecentSearches);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                setIsSuggestionsLoading(true);
                setHasSuggestionsError(false);
                const productList = await getAllProducts();

                if (!isMounted) {
                    return;
                }

                setProducts(productList);
            } catch (error) {
                console.error("Unable to load search suggestions:", error);

                if (isMounted) {
                    setHasSuggestionsError(true);
                }
            } finally {
                if (isMounted) {
                    setIsSuggestionsLoading(false);
                }
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const activeSearch = new URLSearchParams(location.search).get("search")?.trim() ?? "";
        setSearchQuery(activeSearch);
        setIsSearchOpen(false);
    }, [location.pathname, location.search]);

    useEffect(() => {
        if (!menuOpen) {
            return;
        }

        setIsSearchOpen(false);
    }, [menuOpen]);

    useEffect(() => {
        const handlePointerDown = (event) => {
            const isInsideSearchBox = searchBoxRef.current?.contains(event.target);
            const isInsideSearchPopup = searchPopupRef.current?.contains(event.target);

            if (isInsideSearchBox || isInsideSearchPopup) {
                return;
            }

            setIsSearchOpen(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, []);

    const goToPath = (path) => {
        navigate(path);
        setMenuOpen(false);
        setIsSearchOpen(false);
    };

    const goToProtectedPath = (path) => {
        if (isAuthenticated) {
            goToPath(path);
            return;
        }

        navigate("/login", {
            state: {
                from: buildProtectedRedirectTarget(path),
            },
        });
        setMenuOpen(false);
        setIsSearchOpen(false);
    };

    const saveRecentSearch = (term) => {
        const trimmedTerm = term.trim();

        if (!trimmedTerm) {
            return;
        }

        setRecentSearches((previousSearches) => {
            const nextSearches = [
                trimmedTerm,
                ...previousSearches.filter((item) => item.toLowerCase() !== trimmedTerm.toLowerCase()),
            ].slice(0, MAX_RECENT_SEARCHES);

            try {
                localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(nextSearches));
            } catch {
                // Ignore localStorage write failures and keep the in-memory state.
            }

            return nextSearches;
        });
    };

    const navigateToSearchResults = (term) => {
        const trimmedTerm = term.trim();

        if (!trimmedTerm) {
            navigate("/");
            setIsSearchOpen(false);
            setMenuOpen(false);
            return;
        }

        saveRecentSearch(trimmedTerm);
        navigate({
            pathname: "/",
            search: `?search=${encodeURIComponent(trimmedTerm)}`,
        });
        setIsSearchOpen(false);
        setMenuOpen(false);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigateToSearchResults(searchQuery);
    };

    const handleSearchChange = (event) => {
        const nextValue = event.target.value;
        setSearchQuery(nextValue);
        setIsSearchOpen(Boolean(nextValue.trim()) || recentSearches.length > 0);
    };

    const handleSearchFocus = () => {
        if (searchQuery.trim() || recentSearches.length > 0) {
            setIsSearchOpen(true);
        }
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === "Escape") {
            setIsSearchOpen(false);
        }
    };

    const handleRecentSearchSelect = (term) => {
        setSearchQuery(term);
        navigateToSearchResults(term);
    };

    const handleProductSuggestionSelect = (product) => {
        if (searchQuery.trim()) {
            saveRecentSearch(searchQuery);
        }

        navigate(`/product/${product.id}`);
        setIsSearchOpen(false);
        setMenuOpen(false);
    };

    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    const matchingRecentSearches = normalizedSearchQuery
        ? recentSearches.filter((term) => term.toLowerCase().includes(normalizedSearchQuery))
        : recentSearches;
    const productSuggestions = normalizedSearchQuery
        ? products
              .filter((product) => buildSearchableProductText(product).includes(normalizedSearchQuery))
              .slice(0, MAX_PRODUCT_SUGGESTIONS)
        : [];
    const showSearchPopup = isSearchOpen && (matchingRecentSearches.length > 0 || Boolean(normalizedSearchQuery));

    return (
        <>
            <HeaderTopBar />

            <header className="navbar-wrapper">
                <div className="navbar">
                    <div className="navbar-left">
                        <img src={logo} alt="Store Logo" className="logo" onClick={() => navigate("/")} />
                    </div>

                    <ul className="desktop-nav-links">
                        <li>NEW IN</li>
                        <li>SALES</li>
                        <li onClick={() => navigate("/products/all")}>PRODUCTS</li>
                        <li>COLLECTIONS</li>
                        <li>WEDDING</li>
                        <li>DEALS</li>
                    </ul>

                    <form className="search-box header-search" ref={searchBoxRef} onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            value={searchQuery}
                            placeholder="Search products"
                            onChange={handleSearchChange}
                            onFocus={handleSearchFocus}
                            onKeyDown={handleSearchKeyDown}
                            aria-label="Search products"
                        />
                        <button type="submit" className="search-submit-btn" aria-label="Search">
                            <IoIosSearch className="search-icon" />
                        </button>
                    </form>

                    <div className="Express-delivery-container desktop-delivery">
                        <CiDeliveryTruck className="Experss-truck" />
                        <div className="express-text-container">
                            <p className="express-text-1">EXPRESS DELIVERY</p>
                            <p className="express-text-2">Upgrade Your Delivery Method</p>
                        </div>
                    </div>

                    <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        {menuOpen ? <IoCloseOutline /> : <CiMenuFries />}
                    </button>
                </div>

                {showSearchPopup ? (
                    <div className="search-suggestion-popup" ref={searchPopupRef}>
                        <div className="search-suggestion-panel">
                            {matchingRecentSearches.length ? (
                                <div className="search-suggestion-section">
                                    <p className="search-suggestion-heading">Recent Searches</p>

                                    <div className="recent-search-list">
                                        {matchingRecentSearches.map((term) => (
                                            <button
                                                key={term}
                                                type="button"
                                                className="recent-search-button"
                                                onClick={() => handleRecentSearchSelect(term)}
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {normalizedSearchQuery ? (
                                <div
                                    className={`search-suggestion-section ${
                                        matchingRecentSearches.length ? "with-divider" : ""
                                    }`}
                                >
                                    <p className="search-suggestion-heading">Suggestions</p>

                                    {isSuggestionsLoading ? (
                                        <p className="search-suggestion-state">Loading suggestions...</p>
                                    ) : null}

                                    {!isSuggestionsLoading && hasSuggestionsError ? (
                                        <p className="search-suggestion-state">Suggestions are unavailable right now.</p>
                                    ) : null}

                                    {!isSuggestionsLoading && !hasSuggestionsError && productSuggestions.length ? (
                                        <div className="search-suggestion-list">
                                            {productSuggestions.map((product) => (
                                                <button
                                                    key={product.id}
                                                    type="button"
                                                    className="search-suggestion-item"
                                                    onClick={() => handleProductSuggestionSelect(product)}
                                                >
                                                    <div className="search-suggestion-thumb">
                                                        {product.image ? (
                                                            <img src={product.image} alt={product.title} />
                                                        ) : (
                                                            <div className="search-suggestion-thumb-placeholder">
                                                                <IoIosSearch />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="search-suggestion-copy">
                                                        <p className="search-suggestion-title">{product.title}</p>
                                                        {product.category ? (
                                                            <p className="search-suggestion-meta">{product.category}</p>
                                                        ) : null}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : null}

                                    {!isSuggestionsLoading && !hasSuggestionsError && !productSuggestions.length ? (
                                        <p className="search-suggestion-state">No matching products found.</p>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : null}

                <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                    <div className="mobile-top-actions">
                        <div className="mobile-action-item" onClick={() => goToPath("/about")}>
                            ABOUT US
                        </div>

                        <div className="mobile-action-item">
                            <LuMapPin className="mobile-action-icon" />
                            <span>STORES</span>
                        </div>

                        <div className="mobile-action-item">
                            <BiMessageError className="mobile-action-icon" />
                            <span>CONTACT US</span>
                        </div>

                        <div className="mobile-action-item" onClick={() => goToProtectedPath("/profile")}>
                            <RiAccountCircleFill className="mobile-action-icon" />
                            <span>MY ACCOUNT</span>
                        </div>

                        <div className="mobile-action-item" onClick={() => goToProtectedPath("/profile?section=wishlist")}>
                            <CiHeart className="mobile-action-icon" />
                            <span>WISHLIST</span>
                        </div>

                        <div className="mobile-action-item" onClick={() => goToProtectedPath("/cart")}>
                            <AiOutlineShopping className="mobile-action-icon" />
                            <span>CART</span>
                        </div>
                    </div>

                    <ul className="mobile-nav-links">
                        <li>NEW IN</li>
                        <li>SALES</li>
                        <li onClick={() => goToPath("/products/all")}>PRODUCTS</li>
                        <li>COLLECTIONS</li>
                        <li>WEDDING</li>
                        <li>DEALS</li>
                    </ul>

                    <div className="Express-delivery-container mobile-delivery">
                        <CiDeliveryTruck className="Experss-truck" />
                        <div className="express-text-container">
                            <p className="express-text-1">EXPRESS DELIVERY</p>
                            <p className="express-text-2">Upgrade Your Delivery Method</p>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
