import { useLocation } from "wouter";
import { useEffect } from "react";


function ScrollToTop() {

  const [ pathname ] = useLocation();

  useEffect(function() {
    
    window.scrollTo(0, 0);
  
  }, [pathname]);

  return null;
};


export default ScrollToTop;