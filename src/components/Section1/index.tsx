import { useEffect, useState } from "react";
import iconPlay from "@assets/Section1/icon-play.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchMovies } from "store/slices/movieSlice";
import TrailerMovie from "@components/TrailerMovie";

const dataSection1 = [
  {
    id: 1,
    status: "now_showing",
    name: "Now Showing",
  },
  {
    id: 2,
    status: "coming_soon",
    name: "Coming Soon",
  },
];

const Section1 = () => {
  const [status, setStatus] = useState("now_showing");
  const handleChangeTab = (status: string) => {
    setStatus(status);
  };

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.movies);
  useEffect(() => {
    dispatch(fetchMovies({ status, from: 0, to: 9 }));
  }, [dispatch, status]);

  const navigate = useNavigate();

  const [isShowTrailerMovie, setIsShowTrailerMovie] = useState(false);
  const [movieShowTrailer, setMovieShowTrailer] = useState("");

  const handleShowTrailerMovie = (id: string) => {
    setIsShowTrailerMovie(true);
    setMovieShowTrailer(id);
  };

  return (
    <>
      <div className="flex flex-wrap gap-[10px] justify-between items-center sm:hidden">
        <div className="flex gap-[10px] flex-wrap">
          {dataSection1.map((item, _) => {
            return (
              <p
                onClick={() => handleChangeTab(item.status)}
                key={item.id}
                className={`${
                  status == item.status
                    ? "after:block after:w-[50%] after:left-[50%] after:-translate-x-1/2 after:absolute after:h-[3px] md:after:h-[5px] after:bottom-0 after:bg-white"
                    : "border-none"
                }  sm:text-[16px] text-[11px] font-semibold text-white relative h-full leading-[50px]  cursor-pointer`}
              >
                {item.name}
              </p>
            );
          })}
        </div>
      </div>
      <div className="md:h-[70px] h-[50px] sm:flex flex-row hidden justify-between items-center w-full ">
        <div className="flex sm:gap-[33px] h-full sm:flex-row flex-col gap-[10px] border-b-[1px] border-b-[#451662]  items-center">
          {dataSection1.map((item, _) => {
            return (
              <p
                onClick={() => handleChangeTab(item.status)}
                key={item.id}
                className={`${
                  status == item.status
                    ? "after:block after:w-[50%] after:left-[50%] after:-translate-x-1/2 after:absolute after:h-[3px] md:after:h-[5px] after:bottom-0 after:bg-white"
                    : "border-none"
                }  sm:text-[16px] text-[11px] font-semibold text-white relative h-full leading-[50px] md:leading-[70px] cursor-pointer`}
              >
                {item.name}
              </p>
            );
          })}
        </div>
        <Link
          to={"/movie-list"}
          className="sm:text-[16px]  text-[11px] font-semibold cursor-pointer text-white border-[1px] px-[20px] py-[10px] border-white p-[10px] rounded-[10px]"
        >
          View All
        </Link>
      </div>
      <div className=" flex flex-col gap-[20px] justify-center items-center">
        <div className="md:grid-cols-4 lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 grid md:grid-rows-2 text-white gap-[30px] py-[40px]">
          {data.dataMovies.map((item, _) => {
            return (
              <div
                key={item.id}
                className="md:h-[300px] h-[500px] relative gap-[10px] rounded-[10px] flex flex-col group"
              >
                <div
                  onClick={() => handleShowTrailerMovie(item.id)}
                  className="cursor-pointer relative h-full w-full rounded-[10px] group-hover:flex-1 overflow-hidden "
                >
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
                  <img
                    src={item.poster_url}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  />
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] flex-col flex items-center gap-[10px] text-current
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500 ease-in-out"
                  >
                    <div className="w-[58px] relative h-[58px] border-white border-[3px] rounded-full">
                      <img
                        src={iconPlay}
                        className="w-[15px] h-[17px] object-cover group-hover:object-contain left-1/2  -translate-x-1/2 absolute top-1/2 -translate-y-1/2"
                      />
                    </div>
                  </div>
                </div>

                <div className="gap-[10px] justify-center  ease-in-out  hidden transition-all group-hover:pointer-events-auto duration-800 group-hover:flex group-hover:flex-col relative z-[60]">
                  <h5 className="text-[12px] font-semibold text-white">
                    {item.title}
                  </h5>
                  <p className="text-gray-300 text-[12px] ">{item.category}</p>
                  <div className="flex justify-between">
                    <div
                      onClick={() => navigate(`/booking-movie`)}
                      className="text-[11px] cursor-pointer z-[99] bg-[#5f1a89] hidden group-hover:block font-semibold rounded-[5px]   p-[8px] "
                    >
                      Get Tickets
                    </div>
                    <div
                      onClick={() => navigate(`/movie/${item.id}`)}
                      className="text-[11px] cursor-pointer z-[99] bg-[#5f1a89] hidden group-hover:block font-semibold rounded-[5px]   p-[8px] "
                    >
                      Detail
                    </div>
                  </div>
                </div>
                {isShowTrailerMovie && movieShowTrailer == item.id && (
                  <TrailerMovie
                    setIsShowTrailerMovie={setIsShowTrailerMovie}
                    url_trailer={item.trailer_url}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div>
          <p className="sm:text-[16px] sm:hidden w-fit text-[11px] font-semibold cursor-pointer text-white border-[1px] px-[20px] py-[10px] border-white p-[10px] rounded-[10px]">
            <Link to={"/movie-list"}>View All</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Section1;
