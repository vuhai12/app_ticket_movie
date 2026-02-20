import MainLayout from "Layout/MainLayout";
import Pagination from "@components/Pagination";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchNews } from "store/slices/newsSlice";
import { useNavigate } from "react-router-dom";

const NewList = () => {
  const [pageCurrent, setPageCurrent] = useState(1);

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.news);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const limit = 6;
  const totalItems = data?.length || 0;
  const from = (pageCurrent - 1) * limit;
  const to = from + limit;
  const newsToShow = data?.slice(from, to);

  return (
    <MainLayout>
      <section className="bg-[#0f0516] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* ===== LEFT MAIN NEWS ===== */}
            <div className="lg:col-span-3 flex flex-col gap-10">
              {/* Section Title */}
              <div className="flex items-center gap-4">
                <div className="w-1 h-12 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold">Latest News</h2>
              </div>

              {/* News Grid */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {newsToShow?.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/news-item/${item.id}`)}
                    className="group cursor-pointer bg-[#1e0d28] rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-600/20 transition duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.poster_url}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition" />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-3">
                      <h3 className="text-sm md:text-base font-semibold line-clamp-1 group-hover:text-purple-400 transition">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 line-clamp-3">
                        {item.desciption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                limit={limit}
                totalItems={totalItems}
                setPageCurrent={setPageCurrent}
                pageCurrent={pageCurrent}
              />
            </div>

            {/* ===== RIGHT SIDEBAR ===== */}
            <div className="flex flex-col gap-8">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 rounded-xl text-sm font-semibold">
                Recent News
              </div>

              <div className="flex flex-col gap-6 lg:sticky lg:top-24">
                {data?.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/news-item/${item.id}`)}
                    className="flex gap-4 cursor-pointer group"
                  >
                    <div className="w-24 h-20 overflow-hidden rounded-lg flex-shrink-0">
                      <img
                        src={item.poster_url}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-purple-400 transition">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {item.desciption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default NewList;
