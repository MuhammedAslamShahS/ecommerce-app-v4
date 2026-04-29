import CampaignPage from "../CampaignPage/CampaignPage";

const Collections = () => {
  return (
    <CampaignPage
      className="campaign-page-collections"
      eyebrow="Collections"
      storefrontSection="COLLECTIONS"
      title="Curated collections with a stronger editorial feel."
      description="Present grouped product stories, seasonal edits, and signature storefront themes in a way that feels considered and easy to explore."
      primaryAction={{ label: "Explore Collections", to: "/products/all" }}
      secondaryAction={{ label: "Browse All Products", to: "/products" }}
      highlights={[
        "A better landing space for category storytelling",
        "Balanced layout with visual breathing room",
        "Reusable structure for future collection modules",
      ]}
      metrics={[
        { icon: "star", value: "Curated", label: "Grouped experiences that can feel more branded than a raw catalog page" },
        { icon: "package", value: "Flexible", label: "Ready for capsule launches, themed drops, and seasonal edits" },
      ]}
      sections={[
        {
          tag: "Seasonal Edit",
          title: "Bring multiple products under one sharper narrative",
          description: "Collections work best when they feel deliberate, and this page gives you a more polished frame for that storytelling.",
          points: ["Capsule-ready layout", "Cleaner browsing flow", "Built for campaign evolution"],
        },
        {
          tag: "Category Story",
          title: "Turn grouped items into a guided shopping experience",
          description: "Instead of making customers infer the theme, this page lets the collection itself explain the value and mood.",
          points: ["Editorial clarity", "Brand-friendly presentation", "Responsive content spacing"],
        },
        {
          tag: "Flexible Use",
          title: "Useful now even before advanced collection logic exists",
          description: "This structure gives the route a finished experience immediately while staying simple to maintain.",
          points: ["No empty state feel", "Scales well on smaller screens", "Consistent call-to-action rhythm"],
        },
      ]}
    />
  );
};

export default Collections;
