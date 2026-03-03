import MainLayout from "Layout/MainLayout";
import Pagination from "@components/Pagination";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchNews } from "store/slices/newsSlice";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

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
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-1 h-12 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold">Latest News</h2>
              </motion.div>

              {/* News Grid */}
              <motion.div
                key={pageCurrent}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {newsToShow?.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/news-item/${item.id}`)}
                    className="group cursor-pointer bg-[#1e0d28] rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-600/20 transition duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        loading="lazy"
                        src={item.poster_url}
                        alt={item.title}
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
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              <Pagination
                limit={limit}
                totalItems={totalItems}
                setPageCurrent={setPageCurrent}
                pageCurrent={pageCurrent}
              />
            </div>

            {/* ===== RIGHT SIDEBAR ===== */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8"
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 rounded-xl text-sm font-semibold">
                Recent News
              </div>

              <div className="flex flex-col gap-6 lg:sticky lg:top-24">
                {data?.slice(0, 5).map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 5 }}
                    onClick={() => navigate(`/news-item/${item.id}`)}
                    className="flex gap-4 cursor-pointer group"
                  >
                    <div className="w-24 h-20 overflow-hidden rounded-lg flex-shrink-0">
                      <img
                        loading="lazy"
                        src={item.poster_url}
                        alt={item.title}
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default NewList;
