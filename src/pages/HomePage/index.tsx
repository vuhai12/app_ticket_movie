import MainLayout from "../../Layout/MainLayout";
import Hero from "../../components/Hero";
import Section1 from "../../components/Section1";
import Section2 from "../../components/Section2";
import Section3 from "@components/Section3";

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <Hero />
        <Section1 />
        <Section2 />
        <Section3 />
      </MainLayout>
    </>
  );
};

export default HomePage;
