import "./Products.css";
import { useParams } from "react-router-dom";

const allProducts = [
  { id: 1, name: "Men T-Shirt", category: "men" },
  { id: 2, name: "Men Jeans", category: "men" },
  { id: 3, name: "Women Dress", category: "women" },
  { id: 4, name: "Women Bag", category: "women" },
  { id: 5, name: "Kids Shirt", category: "kids" },
  { id: 6, name: "Ring", category: "jewellery" },
  { id: 7, name: "Watch", category: "accessories" },
  { id: 8, name: "Perfume", category: "beauty-grooming" },
];

const Products = () => {
  const { category } = useParams();

  const filteredProducts =
    category === "all"
      ? allProducts
      : allProducts.filter((item) => item.category === category);

  return (
    <div className="Products-page">
      <h1>{category === "all" ? "All Products" : category}</h1>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id} className="product-card">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;