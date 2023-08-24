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
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-xl"
              src={isDark ? LogoWhite : MainLogo}
              alt=""
            />
            <p>
              <span className="font-bold text-green-700">Deshi</span>{" "}
              <span className="font-bold text-orange-500">Farmer</span>
            </p>
          </div>
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
