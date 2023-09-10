import { Helmet } from "react-helmet";
import image from "../src/assets/images/all-img/c1.png";

const TestShare = () => {
  const shareUrl = window.location.href;

  const handleShareClick = () => {
    const shareText = "Check out my awesome website!";
    const shareTitle = "My Website";

    // You can customize the share URL format based on your needs.
    const socialShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      "https://erikkarlsson.dev"
    )}&title=${encodeURIComponent(shareTitle)}&quote=${encodeURIComponent(
      shareText
    )}`;

    // Open a new window to share on Facebook.
    window.open(socialShareUrl, "_blank", "width=600,height=400");
  };
  return (
    <div>
      <Helmet>
        <title>Your Page Title</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Erik Karlsson" />
        <meta
          property="og:description"
          content="Portfolio page made by Erik in React."
        />
        <meta
          property="og:image"
          content="https://erikkarlsson.dev/assets/prev.png"
        />
        <meta property="og:url" content="https://erikkarlsson.dev" />
      </Helmet>
      <div>
        {/* Your page content */}
        <p>This is your website content.</p>
        <button onClick={handleShareClick}>Share on Facebook</button>
      </div>
    </div>
  );
};

export default TestShare;
