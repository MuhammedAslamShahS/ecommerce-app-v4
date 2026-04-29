import CampaignPage from "../CampaignPage/CampaignPage";

const Sales = () => {
  return (
    <CampaignPage
      className="campaign-page-sales"
      eyebrow="Sales"
      storefrontSection="SALES"
      title="Promotions that feel premium instead of cluttered."
      description="Give discounts, markdowns, and limited-time offers a dedicated destination that stays readable, responsive, and easier to trust."
      primaryAction={{ label: "See Sale Products", to: "/products/all" }}
      secondaryAction={{ label: "Continue Shopping", to: "/products" }}
      highlights={[
        "Offer-led design that still feels clean and high-end",
        "Large readable headlines for urgency without visual noise",
        "Structured sections that work better across screen sizes",
      ]}
      metrics={[
        { icon: "gift", value: "Best Value", label: "Promotional moments grouped clearly for faster decision-making" },
        { icon: "clock", value: "Limited", label: "Built for flash offers, seasonal drops, and clearance stories" },
      ]}
      sections={[
        {
          tag: "Clearance Edit",
          title: "Highlight markdowns without making the page feel chaotic",
          description: "A cleaner sales page helps users understand the offer quickly and move to the product list with confidence.",
          points: ["Reduced friction", "Stronger sale messaging", "Responsive hero structure"],
        },
        {
          tag: "Timed Offers",
          title: "Space for campaigns with urgency and momentum",
          description: "Countdown-style campaigns, weekend promos, and app-only offers can all fit into this section naturally.",
          points: ["Short promotional copy", "Focused campaign blocks", "Easy future expansion"],
        },
        {
          tag: "Smart Layout",
          title: "Designed to scale with more offers later",
          description: "This layout gives your sales page a clear backbone now, while staying ready for richer merchandising later.",
          points: ["Better content hierarchy", "Consistent CTA placement", "Improved mobile reading flow"],
        },
      ]}
    />
  );
};

export default Sales;
