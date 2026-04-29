import CampaignPage from "../CampaignPage/CampaignPage";

const Stores = () => {
  return (
    <CampaignPage
      className="campaign-page-stores"
      eyebrow="Stores"
      title="Store discovery with a clearer path to offline shopping."
      description="Turn the stores entry into a polished destination for physical locations, service points, and future branch details instead of leaving it unconnected."
      primaryAction={{ label: "Browse Products", to: "/products/all" }}
      secondaryAction={{ label: "Contact Us", to: "/about" }}
      highlights={[
        "Transforms the Stores nav item into a real destination",
        "Responsive format that can hold branch and city details later",
        "Better support for omnichannel user journeys",
      ]}
      metrics={[
        { icon: "map", value: "Visit", label: "A clean route for store locations, timings, and in-person shopping details" },
        { icon: "shield", value: "Support", label: "Useful for pickup, exchange guidance, and offline assistance messaging" },
      ]}
      sections={[
        {
          tag: "Locations",
          title: "Make store discovery feel intentional from the first click",
          description: "Customers who prefer offline shopping now land on a page that feels complete and easier to trust.",
          points: ["Store-ready route", "Future city listings", "Improved customer orientation"],
        },
        {
          tag: "Pickup Support",
          title: "A helpful space for service details beyond products",
          description: "This route can later include timings, map embeds, pickup instructions, and store-specific benefits.",
          points: ["Omnichannel usefulness", "Structured support information", "Clear route identity"],
        },
        {
          tag: "Scalable Layout",
          title: "Designed for both placeholder use and future data",
          description: "The page is already polished enough for launch while staying easy to evolve into a real store locator.",
          points: ["Responsive by default", "Built for branch content", "No dead-end navigation"],
        },
      ]}
    />
  );
};

export default Stores;
