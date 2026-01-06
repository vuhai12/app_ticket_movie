import MainLayout from "Layout/MainLayout";
import { useEffect, useState } from "react";
import bgImage from "@assets/TicketPrice/bgImage.png";

const AboutUs = () => {
  const [clientWidth, setClientWidth] = useState(0);
  useEffect(() => {
    const updateWidth = () => {
      setClientWidth(document.documentElement.clientWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <MainLayout>
      <div
        className=" text-white bg-no-repeat bg-cover  "
        style={{
          backgroundImage: `url(${bgImage})`,
          width: `${clientWidth}px`,
          marginLeft: `calc(-${clientWidth / 2}px + 50%)`,
          backgroundPosition: "80% -500px",
        }}
      >
        <div className="flex lg:flex-row flex-col gap-[50px] xl:max-w-[1200px] mx-auto lg:px-[100px] md:px-[50px] px-[10px] xl:px-0">
          <div className="flex-[3] py-[50px]">
            <aside className="">
              <div className="details-page">
                <div className="slider-section" />
                <div className="details-contents">
                  <div className="details-content">
                    <div className="details-dectiontion">
                      <h4>The First Multiplex Cinema Theatre in Bangladesh</h4>
                      <br />
                      <p>
                        STAR CINEPLEX : Show Motion Limited, incorporated in
                        19th December 2002, pioneered the modern Multiplex Movie
                        Theater industry with STAR Cineplex brand in Bangladesh.
                      </p>
                      <br />
                      <p>
                        {" "}
                        The First Multiplex Cinema Theatre in Bangladesh STAR
                        CINEPLEX: Show Motion Limited, incorporated on 19th
                        December 2002, pioneered the modern Multiplex Movie
                        Theater industry with the STAR Cineplex brand in
                        Bangladesh. With a lucid vision for entertainment
                        development in the country, the local and foreign
                        promoters of Show Motion Ltd. started the first
                        international quality state-of-the-art multiplex cinema
                        theatre on 8th October 2004 in Bangladesh at Bashundhara
                        City Mall at Panthapath, Dhaka.
                      </p>
                      <br />
                      <p>
                        Since then, STAR Cineplex has expanded across multiple
                        locations, ensuring movie lovers can enjoy the latest
                        Hollywood and Bangladeshi films in a world-class
                        setting.
                      </p>
                      <br />
                      <p>
                        The flagship branch of STAR Cineplex at Bashundhara City
                        Mall has been the heart of premium movie entertainment
                        in Bangladesh since 2004. This location features five
                        fully digital halls, each equipped with state-of-the-art
                        3D projection technology, Silver Screens, and Dolby
                        Digital Sound. Halls 1, 2, and 3 each have 248 seats,
                        providing an immersive viewing experience. Hall 5 is a
                        VIP hall, offering luxury seating for an exclusive and
                        comfortable experience, while Hall 6 is a premium hall
                        featuring Dolby ATMOS sound system, ensuring next-level
                        audio immersion. With a total seating capacity of over
                        1,200 seats, Bashundhara City Mall continues to be the
                        ultimate destination for box office hit movies, red
                        carpet premieres, corporate bookings, and private
                        screenings.
                      </p>
                      <br />
                      <p>
                        In 2019, STAR Cineplex expanded its reach with a
                        state-of-the-art multiplex at Shimanto Shambhar. This
                        branch features three fully digital halls, designed to
                        provide an immersive viewing experience. Two of the
                        halls, with 263 and 253 seats, offer stunning 3D
                        projection and Dolby Digital Sound, while the third
                        hall, with 221 seats, is equipped with Dolby ATMOS
                        sound, delivering a next-level audio experience.
                      </p>
                      <br />
                      <p>
                        Opening its doors in 2019, the SKS Tower branch brings a
                        perfect blend of comfort and innovation. This location
                        boasts three halls, each crafted to enhance the
                        cinematic experience. Two of the halls, each with 264
                        seats, are designed for maximum visual clarity and sound
                        precision, with one featuring Dolby ATMOS for superior
                        sound depth. The exclusive VIP hall, with just 38 seats,
                        offers a luxurious and intimate setting, making it ideal
                        for a premium movie experience.
                      </p>
                      <br />
                      <p>
                        With its grand opening in 2021, Sony Square became a
                        landmark in the Bangladeshi film industry by introducing
                        the largest cinema hall in the country. This massive
                        auditorium seats 408 guests, offering a spectacular
                        movie experience. Accompanied by two additional halls
                        with 225 and 136 seats, this multiplex ensures that
                        moviegoers can enjoy the latest hits with crystal-clear
                        visuals, dynamic sound, and plush seating arrangements.
                        Sony Square continues to set new standards in cinema
                        entertainment.
                      </p>
                      <br />
                      <p>
                        The Military Museum branch, introduced in 2022, stands
                        out as a one-of-a-kind movie theater experience. With
                        one hall and 183 seats, this location offers a cozy yet
                        immersive atmosphere. The combination of advanced
                        projection, pristine sound quality, and a historic
                        setting makes it a unique attraction for film
                        enthusiasts who want to experience cinema in a
                        distinctive environment.
                      </p>
                      <br />
                      <p>
                        STAR Cineplex extended its reach to Chattogram in 2022
                        with the launch of its Bali Arcade branch. This modern
                        multiplex features three halls, each designed to provide
                        an exceptional cinematic experience. The halls, seating
                        85, 196, and 125 guests, are equipped with top-tier
                        projection and Dolby Digital sound, ensuring the perfect
                        blend of comfort and entertainment. As Chattogram’s
                        premier multiplex, this branch has quickly become a
                        favorite destination for movie enthusiasts.
                      </p>
                      <br />
                      <p>
                        In 2023, STAR Cineplex made history by launching its
                        first branch in the North region. The Rajshahi branch
                        features one hall with 172 seats, providing a premium
                        movie experience to the region. With high-end projection
                        technology and immersive sound systems, this branch has
                        set a new standard for cinema in Rajshahi, bringing
                        world-class entertainment closer to home for movie
                        lovers in the area.
                      </p>
                      <br />
                      <p>
                        The Centrepoint branch, opened in 2025, is designed to
                        redefine luxury cinema in Bangladesh. With four halls,
                        this branch offers a range of experiences tailored to
                        different audiences. The Royal Hall, with 48 seats,
                        provides an ultra-premium, intimate viewing experience,
                        while the VIP Hall, with 83 seats, offers superior
                        comfort. Among the regular halls, one boasts 331 seats,
                        making it one of STAR Cineplex’s largest, while the
                        other accommodates 175 guests, both featuring
                        semi-recliner seats for added luxury. Combining
                        cutting-edge technology, plush interiors, and
                        exceptional services, Centrepoint is poised to be the
                        future of entertainment in Bangladesh.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
