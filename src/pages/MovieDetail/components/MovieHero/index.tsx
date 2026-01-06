import TrailerMovie from "@components/TrailerMovie";
import { useEffect, useState } from "react";

const MovieHero = ({
  title,
  category,
  actor,
  release,
  language,
  image,
  url_trailer,
}: {
  title: string;
  category: string;
  actor: string;
  release: string;
  language: string;
  image: string;
  url_trailer: string;
}) => {
  const [widthContent, setWidthContent] = useState(0);
  const [isShowTrailerMovie, setIsShowTrailerMovie] = useState(false);
  useEffect(() => {
    const updateWidth = () => {
      setWidthContent(document.documentElement.clientWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div
      className=" flex justify-center relative bg-no-repeat bg-center bg-cover "
      style={{
        backgroundImage: `url(${image})`,
        width: `${widthContent}px`,
        marginLeft: `calc(-${widthContent / 2}px + 50%)`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-10 bg-gradient-to-r from-black to-black/50"></div>
      <div className="flex md:gap-[30px] z-[99] flex-col md:flex-row gap-[20px] py-[30px]  w-[100%] xl:max-w-[1200px]  xl:mx-auto px-[20px] md:px-[100px]">
        <div className="sm:w-[250px] w-full  z-[99] rounded-[5px] overflow-hidden">
          <img
            src={image}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex-1 flex flex-col gap-[10px] text-white py-[30px]">
          <h3 className="font-semibold text-[25px]">{title}</h3>
          <p className="text-[14px]">{category}</p>
          <p className="text-[14px]">{actor}</p>
          <p className="text-[14px]">{release}</p>
          <p className="text-[14px]">{language}</p>
          <div className="flex gap-[20px] text-[14px]">
            <button
              onClick={() => setIsShowTrailerMovie(true)}
              className="border-[1px] border-white text-white rounded-[10px] py-[10px] px-[15px] self-start"
            >
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
      {isShowTrailerMovie && (
        <TrailerMovie
          setIsShowTrailerMovie={setIsShowTrailerMovie}
          url_trailer={url_trailer}
        />
      )}
    </div>
  );
};

export default MovieHero;
