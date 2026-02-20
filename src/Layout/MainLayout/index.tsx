import { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollToTop from "@components/ScrollToTop";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default MainLayout;
