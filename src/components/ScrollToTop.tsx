import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  behavior?: ScrollBehavior;
};

const ScrollToTop = ({ behavior = "auto" }: Props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top whenever the pathname changes (route navigation)
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, behavior]);

  return null;
};

export default ScrollToTop;
