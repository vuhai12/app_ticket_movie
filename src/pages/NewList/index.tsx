import MainLayout from "Layout/MainLayout";

import bgImage2 from "@assets/Section3/bg-image2.svg";
import bgImage3 from "@assets/Section3/bg-image3.svg";
import bgImage4 from "@assets/Section3/bg-image4.svg";
import bgImage5 from "@assets/Section3/bg-image5.svg";
import bgImage6 from "@assets/Section3/bg-image6.svg";

import Pagination from "@components/Pagination";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchNews } from "store/slices/newsSlice";
import { useNavigate } from "react-router-dom";

const dataListNew = [
  {
    id: 1,
    bgImage: bgImage2,
    name: "Fast X: Family Rides Together Again",
    time: "05 Jun 2023",
    des: "The writers, and directors of the franchise are not pumping the brakes just yet.",
  },
  {
    id: 2,
    bgImage: bgImage3,
    name: "Avatar",
    time: "14 Aug 2023",
    des: "The countdown has begun as Avatar: The Way of Water finally enters its release week,",
  },
  {
    id: 3,
    bgImage: bgImage4,
    name: "Joker",
    time: "14 Aug 2023",
    des: "Joker: Folie à Deux: Joaquin Phoenix's intense FIRST LOOK teased as filming for the",
  },
  {
    id: 4,
    bgImage: bgImage5,
    name: "Deadpool 3",
    time: "21 Dec 2023",
    des: "Deadpool 3, Avengers: Secret Wars and more MCU films get NEW release dates; Here's all we know",
  },
  {
    id: 5,
    bgImage: bgImage6,
    name: "The Guardians Of The Galaxy",
    time: "21 Dec 2023",
    des: "The Guardians Of The Galaxy Holiday Special Trailer: Star-Lord's 'Perfect' Christmas Gift ",
  },
];

const NewList = () => {
  const [pageCurrent, setPageCurrent] = useState(1);

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.news);
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className="flex gap-[30px] text-white mt-[50px] lg:flex-row flex-col max-w-[900px] px-4 mx-auto">
        <div className="flex-[3] flex flex-col gap-[30px]">
          <div className=" flex gap-[10px] flex-col">
            <div className="flex flex-col gap-[20px]">
              <div className="flex gap-[20px] items-center">
                <div className="w-[3px] bg-[#5f1a89] h-[50px]"></div>
                <h3 className="text-[18px]">News</h3>
              </div>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px] ">
                {data &&
                  data.length > 0 &&
                  data.map((item) => {
                    return (
                      <div
                        onClick={() => navigate(`/news-item/${item.id}`)}
                        className="flex lg:gap-[30px] cursor-pointer gap-[20px] flex-col lg:h-[300px] "
                      >
                        <div className="h-[200px]  ">
                          <img
                            src={item.poster_url}
                            className="h-full object-cover w-full object-center"
                          />
                        </div>

                        <div className="flex flex-col gap-[10px] ">
                          <h3 className="text-[14px] hover:text-[#bd81e3] line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-[12px] line-clamp-2 text-gray-400">
                            {item.desciption}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <Pagination
            limit={6}
            totalItems={dataListNew.length}
            setPageCurrent={setPageCurrent}
            pageCurrent={pageCurrent}
          />
        </div>

        <div className="flex-1 flex flex-col gap-[20px] ">
          <div className="p-[10px] bg-[#5f1a89]">Recent News</div>
          <div className="flex flex-col gap-[20px]">
            {data &&
              data.length > 0 &&
              data.map((item) => {
                return (
                  <div
                    className="flex gap-[10px] cursor-pointer"
                    onClick={() => navigate(`/news-item/${item.id}`)}
                  >
                    <div className="lg:h-[100px] flex-1 h-[200px]">
                      <img
                        src={item.poster_url}
                        className="h-full object-cover w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-[10px] flex-1">
                      <h5 className="text-[14px] cursor-pointer line-clamp-2 hover:text-[#bd81e3]">
                        {item.title}
                      </h5>
                      <p className="text-[12px] line-clamp-2 text-gray-400">
                        {item.desciption}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewList;
