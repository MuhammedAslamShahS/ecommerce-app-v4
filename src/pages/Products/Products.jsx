import "./Products.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllProducts } from "../../ApiService/api";

const createCategorySlug = (value) => {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/&/g, " ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const formatCategoryLabel = (value) => {
    return String(value || "")
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const Products = () => {
    const { category } = useParams();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const selectedCategory = category || "all";

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);
                setHasError(false);

                const productList = await getAllProducts();
                setProducts(productList);
            } catch (error) {
                console.error("Unable to load products", error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter((product) => createCategorySlug(product.category) === selectedCategory);

    const pageTitle = selectedCategory === "all" ? "All Products" : formatCategoryLabel(selectedCategory);

    return (
        <div className="Products-page">
            <h1>{pageTitle}</h1>

            {isLoading ? <p>Loading products...</p> : null}
            {hasError ? <p>Unable to load products right now.</p> : null}
            {!isLoading && !hasError && filteredProducts.length === 0 ? <p>No products found</p> : null}

            {!isLoading && !hasError && filteredProducts.length > 0 ? (
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="product-card"
                            style={{ textDecoration: "none", color: "inherit", display: "block" }}
                        >
                            <h3>{product.title}</h3>
                            <p>{product.category || "Uncategorized"}</p>
                            <p>Rs. {Number(product.price || 0).toFixed(2)}</p>
                        </Link>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default Products;
