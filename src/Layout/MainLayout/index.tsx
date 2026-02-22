import { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="overflow-hidden">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
