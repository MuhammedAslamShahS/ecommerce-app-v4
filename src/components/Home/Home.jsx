import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getAllProducts } from "../../ApiService/api";
import useWishlist from "../../hooks/useWishlist";
import TopCategories from "../TopCategories/TopCategories";

const loadingPlaceholders = Array.from({ length: 8 });

const Home = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [searchParams] = useSearchParams();
    const { isInWishlist, isWishlistLoading, toggleWishlist } = useWishlist();

    const searchQuery = searchParams.get("search")?.trim() ?? "";
    const normalizedSearchQuery = searchQuery.toLowerCase();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setHasError(false);
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        if (!normalizedSearchQuery) {
            return true;
        }

        const searchableText = [product.title, product.category, product.description]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableText.includes(normalizedSearchQuery);
    });

    const productGridSx = {
        display: "grid",
        gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
        },
        gap: { xs: 1.5, sm: 2.5, lg: 3 },
    };

    return (
        <>
        <TopCategories/>
        <Box
            id="home-products-section"
            tabIndex={-1}
            sx={{
                px: { xs: 1.5, sm: 2.5, lg: 4 },
                pb: 6,
                scrollMarginTop: { xs: "104px", md: "120px" },
                outline: "none",
            }}
        >
            <Box sx={{ maxWidth: 1440, mx: "auto" }}>
                <Stack spacing={3}>
                    <Box
                        sx={{
                            px: { xs: 0.5, sm: 1 },
                            pt: 1,
                        }}
                    ></Box>

                    {searchQuery ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 1.5,
                                p: { xs: 1.5, sm: 2 },
                                border: "1px solid #ffd6c8",
                                borderRadius: 4,
                                background: "linear-gradient(135deg, #fffaf7 0%, #fff2ec 100%)",
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{ fontSize: 13, fontWeight: 700, color: "#ff5722", textTransform: "uppercase" }}
                                >
                                    Search Results
                                </Typography>
                                <Typography
                                    sx={{ mt: 0.35, fontSize: { xs: 14, sm: 16 }, fontWeight: 600, color: "#4a342b" }}
                                >
                                    {filteredProducts.length} result{filteredProducts.length === 1 ? "" : "s"} for "
                                    {searchQuery}"
                                </Typography>
                            </Box>
                            <Button
                                component={Link}
                                to="/"
                                variant="text"
                                sx={{
                                    color: "#ff5722",
                                    fontWeight: 700,
                                    textTransform: "none",
                                }}
                            >
                                Clear search
                            </Button>
                        </Box>
                    ) : null}

                    {isLoading ? (
                        <Box sx={productGridSx}>
                            {loadingPlaceholders.map((_, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        borderRadius: 4,
                                        border: "1px solid #ffe3d7",
                                        boxShadow: "0 16px 32px rgba(255, 87, 34, 0.08)",
                                        overflow: "hidden",
                                    }}
                                >
                                    <Skeleton
                                        variant="rectangular"
                                        sx={{ height: { xs: 150, sm: 230 }, bgcolor: "#fff1eb" }}
                                    />
                                    <CardContent sx={{ p: { xs: 1.25, sm: 2 } }}>
                                        <Skeleton width="55%" height={28} />
                                        <Skeleton width="90%" height={26} />
                                        <Skeleton width="75%" height={22} />
                                        <Skeleton width="100%" height={40} sx={{ mt: 1.5 }} />
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    ) : null}

                    {hasError ? (
                        <Alert severity="error" sx={{ borderRadius: 4 }}>
                            Unable to load products right now.
                        </Alert>
                    ) : null}

                    {!isLoading && !hasError && !filteredProducts.length ? (
                        <Alert
                            severity="info"
                            action={
                                searchQuery ? (
                                    <Button component={Link} to="/" color="inherit" size="small" sx={{ fontWeight: 700 }}>
                                        Clear
                                    </Button>
                                ) : null
                            }
                            sx={{ borderRadius: 4 }}
                        >
                            No products found for "{searchQuery}".
                        </Alert>
                    ) : null}

                    {!isLoading && !hasError && filteredProducts.length ? (
                        <Box sx={productGridSx}>
                            {filteredProducts.map((product) => (
                                <Card
                                    key={product.id}
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: { xs: 3, sm: 4 },
                                        border: "1px solid #ffe3d7",
                                        background: "linear-gradient(180deg, #ffffff 0%, #fffaf7 100%)",
                                        boxShadow: "0 16px 32px rgba(255, 87, 34, 0.08)",
                                        overflow: "hidden",
                                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: "0 20px 36px rgba(255, 87, 34, 0.14)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                            px: { xs: 1, sm: 1.5 },
                                            pt: { xs: 1, sm: 1.5 },
                                            pb: { xs: 0.75, sm: 1 },
                                            background: "linear-gradient(180deg, #fff6f1 0%, #fffdfb 100%)",
                                        }}
                                    >
                                        <Chip
                                            label={`$${Number(product.price).toFixed(2)}`}
                                            sx={{
                                                position: "absolute",
                                                top: { xs: 10, sm: 14 },
                                                right: { xs: 10, sm: 14 },
                                                height: { xs: 26, sm: 30 },
                                                bgcolor: "#ff5722",
                                                color: "#ffffff",
                                                fontWeight: 700,
                                                zIndex: 1,
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => toggleWishlist(product)}
                                            disabled={isWishlistLoading}
                                            aria-label={
                                                isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"
                                            }
                                            style={{
                                                position: "absolute",
                                                top: 10,
                                                left: 10,
                                                width: 36,
                                                height: 36,
                                                border: "none",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "#ffffff",
                                                color: isInWishlist(product.id) ? "#ff5722" : "#7b6a62",
                                                boxShadow: "0 8px 18px rgba(0, 0, 0, 0.12)",
                                                cursor: "pointer",
                                                zIndex: 1,
                                            }}
                                        >
                                            {isInWishlist(product.id) ? <AiFillHeart size={18} /> : <AiOutlineHeart size={18} />}
                                        </button>
                                        <CardMedia
                                            component="img"
                                            image={product.image}
                                            alt={product.title}
                                            sx={{
                                                height: { xs: 120, sm: 210 },
                                                objectFit: "contain",
                                                mixBlendMode: "multiply",
                                            }}
                                        />
                                    </Box>

                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: { xs: 1, sm: 1.5 },
                                            p: { xs: 1.25, sm: 2 },
                                        }}
                                    >
                                        <Chip
                                            label={product.category}
                                            size="small"
                                            sx={{
                                                alignSelf: "flex-start",
                                                maxWidth: "100%",
                                                bgcolor: "#fff1eb",
                                                color: "#bf360c",
                                                fontWeight: 700,
                                                textTransform: "capitalize",
                                                "& .MuiChip-label": {
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                },
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontSize: { xs: 14, sm: 18 },
                                                fontWeight: 700,
                                                lineHeight: 1.35,
                                                color: "#1f1a17",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                minHeight: { xs: "2.7em", sm: "3em" },
                                            }}
                                        >
                                            {product.title}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: { xs: 12, sm: 14 },
                                                lineHeight: 1.6,
                                                color: "rgba(74, 52, 43, 0.72)",
                                                display: { xs: "none", sm: "-webkit-box" },
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {product.description}
                                        </Typography>

                                        <Button
                                            component={Link}
                                            to={`/product/${product.id}`}
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                mt: "auto",
                                                borderRadius: 999,
                                                bgcolor: "#ff5722",
                                                textTransform: "none",
                                                fontWeight: 700,
                                                py: { xs: 1, sm: 1.2 },
                                                "&:hover": {
                                                    bgcolor: "#e64a19",
                                                },
                                            }}
                                        >
                                            Product details
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    ) : null}
                </Stack>
            </Box>
        </Box>
        </>
    );
};

export default Home;
