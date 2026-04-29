import CampaignPage from "../CampaignPage/CampaignPage";

const Wedding = () => {
  return (
    <CampaignPage
      className="campaign-page-wedding"
      eyebrow="Wedding"
      storefrontSection="WEDDING"
      title="Wedding shopping that feels elegant, calm, and guided."
      description="Create a dedicated destination for celebration-ready fashion, gifting ideas, and polished essentials with a layout that feels more premium."
      primaryAction={{ label: "Shop Wedding Picks", to: "/products/all" }}
      secondaryAction={{ label: "View Products", to: "/products" }}
      highlights={[
        "A softer, more occasion-led experience for wedding visitors",
        "Mobile-friendly structure for browsing looks and gifting ideas",
        "Clear content blocks that can support future wedding categories",
      ]}
      metrics={[
        { icon: "gift", value: "Occasion", label: "A polished route for festive styling, gifting, and event-based shopping" },
        { icon: "shield", value: "Premium", label: "Cleaner presentation that supports a more elevated brand feel" },
      ]}
      sections={[
        {
          tag: "Celebration Looks",
          title: "A better home for event-led product storytelling",
          description: "This page can support outfits, accessories, and gifting edits that help users browse with a clearer intent.",
          points: ["Occasion-first layout", "Premium visual tone", "Stronger route identity"],
        },
        {
          tag: "Gift Guide",
          title: "Useful for both wedding guests and wedding shoppers",
          description: "A dedicated page gives room for helpful copy, category splits, and future curated recommendations.",
          points: ["Gifting-focused sections", "Better discovery path", "Responsive across devices"],
        },
        {
          tag: "Future Ready",
          title: "Simple now, expandable later",
          description: "You can later plug in product blocks, festive filters, or featured picks without having to redesign the route.",
          points: ["Scalable structure", "Reusable campaign layout", "Launch-ready page experience"],
        },
      ]}
    />
  );
};

export default Wedding;
