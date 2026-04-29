import CampaignPage from "../CampaignPage/CampaignPage";

const Deal = () => {
  return (
    <CampaignPage
      className="campaign-page-deals"
      eyebrow="Deals"
      storefrontSection="DEALS"
      title="Daily deals, featured steals, and sharper value messaging."
      description="Use this route to spotlight fast-moving offers with stronger hierarchy, cleaner CTAs, and a more trustworthy shopping feel."
      primaryAction={{ label: "Explore Deals", to: "/products/all" }}
      secondaryAction={{ label: "Shop All Products", to: "/products" }}
      highlights={[
        "Focused route for offer-led browsing",
        "Cleaner value communication for mobile and desktop users",
        "A better destination than leaving nav items unlinked",
      ]}
      metrics={[
        { icon: "clock", value: "Today", label: "Ideal for quick-hit campaigns and daily offer visibility" },
        { icon: "truck", value: "Fast", label: "Supports action-oriented browsing with direct next-step CTAs" },
      ]}
      sections={[
        {
          tag: "Daily Picks",
          title: "A compact home for offers users can act on quickly",
          description: "This page helps deals feel intentional rather than hidden behind generic product browsing.",
          points: ["Urgency-friendly layout", "Stronger CTA emphasis", "Polished offer presentation"],
        },
        {
          tag: "Best Price",
          title: "Show value without crowding the screen",
          description: "Deals can be exciting without becoming noisy, and this layout keeps the route easy to scan.",
          points: ["Readable headline system", "Balanced content spacing", "Responsive structure"],
        },
        {
          tag: "Conversion Ready",
          title: "Designed to lead users back into product discovery",
          description: "The page keeps a clear path back to the catalog so the route supports both browsing and conversion.",
          points: ["Catalog handoff CTA", "Future promotion slots", "Better navigation utility"],
        },
      ]}
    />
  );
};

export default Deal;
