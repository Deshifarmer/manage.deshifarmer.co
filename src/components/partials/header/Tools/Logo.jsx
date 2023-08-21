import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";

import MainLogo from "@/assets/images/logo/logo.jpg";
import LogoWhite from "@/assets/images/logo/logo.jpg";
import MobileLogo from "@/assets/images/logo/logo.jpg";
import MobileLogoWhite from "@/assets/images/logo/logo.jpg";
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to="/dashboard">
        {width >= breakpoints.xl ? (
          <img src={isDark ? LogoWhite : MainLogo} alt="" />
        ) : (
          <img
            className="w-8 h-8 rounded-xl"
            src={isDark ? MobileLogoWhite : MobileLogo}
            alt=""
          />
        )}
      </Link>
    </div>
  );
};

export default Logo;
