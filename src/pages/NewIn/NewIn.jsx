import CampaignPage from "../CampaignPage/CampaignPage";

const NewIn = () => {
  return (
    <CampaignPage
      className="campaign-page-new-in"
      eyebrow="New In"
      storefrontSection="NEW IN"
      title="Fresh arrivals designed to make the next scroll feel worth it."
      description="Explore the latest edits across fashion, accessories, and everyday essentials with a page built to surface what is new at a glance."
      primaryAction={{ label: "Shop New Arrivals", to: "/products/all" }}
      secondaryAction={{ label: "Browse Products", to: "/products" }}
      highlights={[
        "Weekly product drops organized for quick discovery",
        "Clean hero layout that reads well on mobile and desktop",
        "Focused content blocks instead of an empty placeholder page",
      ]}
      metrics={[
        { icon: "star", value: "Fresh", label: "New styles highlighted first for faster browsing" },
        { icon: "package", value: "Daily", label: "Updated curation rhythm for always-on storefront energy" },
      ]}
      sections={[
        {
          tag: "Trending Now",
          title: "Fast-moving arrivals with stronger first impressions",
          description: "This page can spotlight the newest releases that deserve priority visibility the moment customers land here.",
          points: ["Season-first product storytelling", "Cleaner product discovery flow", "Better landing-page readability"],
        },
        {
          tag: "Editorial Picks",
          title: "Collections that feel selected, not dumped into a list",
          description: "Use this section for product edits, creator picks, or curated style stories that give the page more personality.",
          points: ["Curated capsules", "Intentional merchandising", "Mobile-friendly browsing structure"],
        },
        {
          tag: "Always Updated",
          title: "A foundation that is ready for future dynamic content",
          description: "Even before API-driven modules are added, this layout gives the page a polished, launch-ready presentation.",
          points: ["Responsive card layout", "Reusable content pattern", "Consistent brand presentation"],
        },
      ]}
    />
  );
};

export default NewIn;
