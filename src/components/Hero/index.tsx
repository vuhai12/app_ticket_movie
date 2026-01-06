import { useEffect, useState } from "react";
import bgSlide1 from "../../assets/Hero/bg-image1.svg";
import bgSlide2 from "../../assets/Hero/bg-image2.jpg";
import bgSlide3 from "../../assets/Hero/bg-image3.jpg";
import iconPlay from "@assets/Section1/icon-play.svg";
import TrailerMovie from "@components/TrailerMovie";

const dataSlide = [
  {
    id: 1,
    bgImage: bgSlide1,
    title: "Avatar: The Way of Water (3D)",
    genre: "Action, Adventure",
    time: "2hr 35mins",
    url_trailer: "https://www.youtube.com/watch?v=d9MyW72ELq0",
  },
  {
    id: 2,
    bgImage: bgSlide2,
    title: "X-Men: Days of Future Past",
    genre: "Action, Adventure",
    time: "2hr 30mins",
    url_trailer: "https://www.youtube.com/watch?v=pK2zYHWDZKo",
  },
  {
    id: 3,
    bgImage: bgSlide3,
    title: "The Fate of the Furious",
    genre: "Action, Adventure",
    time: "3hr 30mins",
    url_trailer: "https://www.youtube.com/watch?v=JwMKRevYa_M",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState<number>(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [isShowTrailerMovie, setIsShowTrailerMovie] = useState(false);
  const [movieShowTrailer, setMovieShowTrailer] = useState<string | null>(null);

  useEffect(() => {
    const interVal = setInterval(() => {
      setCurrent((pre) => (pre + 1) % dataSlide.length);
    }, 5000);
    return () => {
      clearInterval(interVal);
    };
  }, []);

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${scrollbarWidth}px`
    );
  }, []);

  useEffect(() => {
    const updateWidth = () =>
      setContentWidth(document.documentElement.clientWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleChangeSlide = (index: number) => {
    setCurrent(index);
  };
  const handleShowTrailerMovie = (url: string | null) => {
    setIsShowTrailerMovie(true);
    setMovieShowTrailer(url);
  };

  return (
    <div
      // className="min-h-[200px] py-[100px] md:min-h-[450px] xl:min-h-[500px] relative overflow-x-hidden text-white"
      className="min-h-[200px] xl:min-h-[500px] md:min-h-[450px] relative overflow-x-hidden text-white"
      style={{
        width: `${contentWidth}px`,
        marginLeft: `calc(50% - ${contentWidth / 2}px)`,
      }}
    >
      {dataSlide.map((item, index) => {
        return (
          <>
            <div
              key={index}
              style={{
                left: `${(index - current) * 100}%`,
              }}
              className="absolute left-0 top-0 h-full w-full "
            >
              <div className="text-white  relative xl:max-w-[1200px] mx-auto lg:px-[100px] md:px-[50px] px-[10px] xl:px-0 top-[20%] z-[99] flex gap-[10px] md:gap-[25px] flex-col">
                <h3 className="lg:text-[40px] text-[14px] font-bold line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex gap-[20px] text-[12px] md:text-[15px] items-center flex-wrap">
                  <p>{item.genre}</p>
                  <div className="bg-white w-[2px] h-[20px]"></div>
                  <p className="line-clamp-1">{item.time}</p>
                  <div className="bg-white w-[2px] h-[20px]"></div>
                  <div
                    onClick={() => handleShowTrailerMovie(item.url_trailer)}
                    className="cursor-pointer h-[25px] w-[25px] md:h-[45px] md:w-[45px] rounded-[50%]  border-[2px]  border-white flex items-center justify-center"
                  >
                    <img
                      src={iconPlay}
                      className="md:translate-x-[2px] w-[6px] md:w-auto"
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                }}
                className="absolute z-1 top-0 left-0 h-full w-full bg-cover  bg-no-repeat"
              />
              <div className="absolute z-[2] top-0 left-0 w-full h-full bg-gradient-to-b from-[#000000]/50 to-[#15061E]/100" />
              <div className="bottom-[0px] left-1/2 -translate-x-1/2  sm:px-[30px] md:gap-[20px] xl:max-w-[1200px] mx-auto flex flex-col lg:gap-[20px] absolute z-[3]">
                <div className=" items-center justify-center h-[90px] flex gap-[20px] ">
                  {dataSlide.map((_, index) => {
                    return (
                      <p
                        onClick={() => handleChangeSlide(index)}
                        className={`${
                          current == index
                            ? "md:w-[20px] w-[10px]"
                            : "md:w-[10px] w-[5px]"
                        }  md:h-[10px] h-[5px] rounded-[5px] md:rounded-[10px] bg-white cursor-pointer`}
                      ></p>
                    );
                  })}
                </div>
              </div>
            </div>
            {isShowTrailerMovie && movieShowTrailer == item.url_trailer && (
              <TrailerMovie
                setIsShowTrailerMovie={setIsShowTrailerMovie}
                url_trailer={item.url_trailer}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default Hero;
