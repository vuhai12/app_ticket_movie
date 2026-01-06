import { ReactNode, useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [_, setWidthContent] = useState(0);
  useEffect(() => {
    const updateWidth = () => {
      setWidthContent(document.documentElement.clientWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <>
      <div className="xl:max-w-[1200px] mx-auto lg:px-[100px] md:px-[50px] px-[10px] xl:px-0">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
