import { useEffect, useState } from "react";
import "./HomeImage.css";

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
        title: "Premium Fashion",
        subtitle: "Discover timeless styles",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
        title: "New Arrivals",
        subtitle: "Latest trends for you",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&q=80",
        title: "Luxury Collection",
        subtitle: "Elevate your style",
    },
];

const HomeImage = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % slides.length);
    };

    const goToSlide = (slideIndex) => {
        setIndex(slideIndex);
    };

    return (
        <section className="home-image">
            <div
                className="home-image-track"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                }}
            >
                {slides.map((item) => (
                    <div className="home-image-slide" key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <div className="overlay" />

                        <div className="content">
                            <p>{item.subtitle}</p>
                            <h1>{item.title}</h1>
                            <button>Shop Now</button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="arrow left" onClick={prevSlide}>
                &#10094;
            </button>

            <button className="arrow right" onClick={nextSlide}>
                &#10095;
            </button>

            <div className="dots">
                {slides.map((_, i) => (
                    <span
                        key={i}
                        className={i === index ? "dot active" : "dot"}
                        onClick={() => goToSlide(i)}
                    />
                ))}
            </div>
        </section>
    );
};

export default HomeImage;