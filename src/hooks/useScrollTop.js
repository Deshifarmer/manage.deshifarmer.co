import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      const scrollStep = -window.scrollY / (500 / 15); // Adjust the smoothness by changing the '500' value
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15); // Adjust the smoothness by changing the '15' value
    };

    scrollToTop();
  }, [location]);

  return null;
};

export default ScrollToTop;
