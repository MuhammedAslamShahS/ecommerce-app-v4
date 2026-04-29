import CampaignPage from "../CampaignPage/CampaignPage";

const DeliveryTo = () => {
  return (
    <CampaignPage
      className="campaign-page-delivery"
      eyebrow="Delivery To"
      title="Delivery information that feels helpful before checkout."
      description="Give customers a dedicated place to understand delivery coverage, speed expectations, and convenience options without sending them into a dead end."
      primaryAction={{ label: "Browse Products", to: "/products/all" }}
      secondaryAction={{ label: "Go To Cart", to: "/cart" }}
      highlights={[
        "Useful destination for users who tap delivery information in the topbar",
        "Responsive layout that works for support-style content",
        "Simple structure ready for real location logic later",
      ]}
      metrics={[
        { icon: "map", value: "Coverage", label: "Space for serviceability updates, pin-code flow, or city-specific messaging" },
        { icon: "truck", value: "Fast", label: "Supports express, standard, and future delivery option explanations" },
      ]}
      sections={[
        {
          tag: "Service Zones",
          title: "Explain where delivery is currently supported",
          description: "This route can later expand into a real location lookup while already providing a polished user-facing page today.",
          points: ["Coverage messaging", "Delivery expectation setting", "Cleaner support experience"],
        },
        {
          tag: "Shipping Promise",
          title: "Set delivery expectations earlier in the journey",
          description: "By surfacing timing and convenience information upfront, users feel more confident before they reach checkout.",
          points: ["Express-delivery context", "Reduced purchase hesitation", "Customer-first communication"],
        },
        {
          tag: "Ready To Expand",
          title: "Useful now, practical later",
          description: "You can connect this route to location APIs or address logic later without needing to rebuild the page structure.",
          points: ["Launch-ready fallback", "Scalable information layout", "Fits future logistics updates"],
        },
      ]}
    />
  );
};

export default DeliveryTo;
