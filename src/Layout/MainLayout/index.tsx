import { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="overflow-hidden flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
