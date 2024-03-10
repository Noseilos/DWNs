import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Dynamic Waste Navigations",
  description: "Navigate Waste Management in TUP Taguig",
  keywords: "Waste",
};

export default Meta;
