import "./TopCategories.css";
import all from "../../assets/all.jpg";
import men from "../../assets/men.jpg";
import women from "../../assets/women.jpg";
import kids from "../../assets/kids.jpg";
import accessories from "../../assets/accessories.jpg";
import Jewellery from "../../assets/Jewellery.jpg";
import perfumecosmetics from "../../assets/perfume&cosmetics.jpg";

import { useNavigate } from "react-router-dom";

const categories = [
    { id: 1, image: all, title: "All Products", slug: "all" },
    { id: 2, image: men, title: "Men", slug: "men" },
    { id: 3, image: women, title: "Women", slug: "women" },
    { id: 4, image: kids, title: "Kids", slug: "kids" },
    { id: 5, image: accessories, title: "accessories", slug: "accessories" },
    { id: 6, image: Jewellery, title: "Jewellery", slug: "jewellery" },
    { id: 7, image: perfumecosmetics, title: "perfume & cosmetics", slug: "perfume-cosmetics" },
];

const TopCategories = () => {
    const navigate = useNavigate();

    return (
        <div className="TopCategories-main-container">
            <h1>Top Categories</h1>
            <p>Categories people love the most</p>

            <div className="TopCategories-slider">
                {categories.map((item) => (
                    <div
                        className="TopCategories-list-card"
                        key={item.id}
                        onClick={() => navigate(`/products/${item.slug}`)}
                    >
                        <img src={item.image} alt={item.title} />
                        <div className="category-overlay">
                            <h3>{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCategories;
