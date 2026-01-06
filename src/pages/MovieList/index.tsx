import MainLayout from "Layout/MainLayout";
import { useEffect, useState } from "react";

import iconPlay from "@assets/Section1/icon-play.svg";
import classNames from "classnames";
import Pagination from "@components/Pagination";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchMovies } from "store/slices/movieSlice";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDebond } from "hook/useDebond";
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

const MovieList = () => {
  const [status, setStatus] = useState("now_showing");

  const handleChangeTab = (status: string) => {
    setStatus(status);
  };

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.movies);
  const [searchString, setSearchString] = useState<undefined | string>(
    undefined
  );

  const searchStringDebond = useDebond(searchString);
  const [pageCurrent, setPageCurrent] = useState(1);
  const limit = 8;
  const from = (pageCurrent - 1) * limit;
  const to = from + limit - 1;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovies({ title: searchStringDebond, status, from, to }));
  }, [dispatch, status, pageCurrent, searchStringDebond]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const [isShowTrailerMovie, setIsShowTrailerMovie] = useState(false);
  const [movieShowTrailer, setMovieShowTrailer] = useState("");

  const handleShowTrailerMovie = (id: string) => {
    setIsShowTrailerMovie(true);
    setMovieShowTrailer(id);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-[30px] mt-[20px]">
        <div className="flex justify-between items-center">
          <div className="flex justify-start border-b-[1px] border-[#5f1a89] w-fit ">
            {dataSection1.map((item) => {
              return (
                <div
                  onClick={() => handleChangeTab(item.status)}
                  className="p-[15px] cursor-pointer text-[12px] text-white relative flex justify-center font-semibold"
                >
                  <p className="text-[14px] ">{item.name}</p>
                  <div
                    className={classNames(
                      "absolute  bottom-0 h-[3px] bg-white w-[60%]",
                      status == item.status ? "block" : "hidden"
                    )}
                  />
                </div>
              );
            })}
          </div>
          <div className="md:flex gap-[40px] relative hidden">
            <input
              value={searchString}
              onChange={(e) => handleChange(e)}
              placeholder="Search"
              className="text-white border-[#38134E] border-[1px] bg-[#1e0d28] text-[16px] pl-[50px] pr-[20px] py-[16px] md:py-[5px]  md:h-[40px] w-[200px] h-[58px] rounded-[58px]"
            />
            <MagnifyingGlassIcon className="w-[20px] h-[20px] text-white absolute left-[20px] top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="grid xl:grid-cols-6 sm:grid-cols-2 md:grid-cols-4 grid-cols-1 gap-[30px]">
          {data &&
            data.dataMovies.length > 0 &&
            data.dataMovies.map((item) => {
              return (
                <div className="rounded-[10px]  flex flex-col gap-[8px] group overflow-hidden ">
                  <div
                    onClick={() => handleShowTrailerMovie(item.id)}
                    className="md:h-[200px] h-[300px] group-hover:rounded-[10px] overflow-hidden relative cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
                    <img
                      src={item.poster_url}
                      className="object-cover h-full w-full"
                    />
                    <div className="w-[50px] h-[50px] rounded-[50%] border-[2px] border-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  items-center justify-center hidden group-hover:flex">
                      <img className="" src={iconPlay} />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-[8px]">
                    <h3 className="text-[14px] text-white font-semibold line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-[12px]">{item.category}</p>
                    <div className="flex justify-between text-white font-semibold">
                      <button
                        onClick={() => navigate(`/booking-movie`)}
                        className="text-[12px] p-[10px] rounded-[5px] bg-[#5f1a89]"
                      >
                        Get Ticket
                      </button>
                      <button
                        onClick={() => navigate(`/movie/${item.id}`)}
                        className="text-[12px] p-[10px] rounded-[5px] bg-[#5f1a89]"
                      >
                        Detail
                      </button>
                    </div>
                    {isShowTrailerMovie && movieShowTrailer == item.id && (
                      <TrailerMovie
                        setIsShowTrailerMovie={setIsShowTrailerMovie}
                        url_trailer={item.trailer_url}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        <div>
          <Pagination
            limit={limit}
            setPageCurrent={setPageCurrent}
            pageCurrent={pageCurrent}
            totalItems={data.total}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default MovieList;
