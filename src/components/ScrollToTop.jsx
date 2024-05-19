import { useEffect } from "react";
import { useLocation } from "wouter";


function ScrollToTop() {

  const [ pathname ] = useLocation();

  useEffect(function() {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


export default ScrollToTop;