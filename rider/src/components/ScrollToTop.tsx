import { useEffect } from "react";
import { useLocation } from "react-router";

interface ContainerProps {
  children: any;
}

const ScrollToTop: React.FC<ContainerProps> = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
