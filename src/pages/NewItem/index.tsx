import MainLayout from "Layout/MainLayout";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNewsDetail } from "store/slices/newsDetailSlice";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchNews } from "store/slices/newsSlice";
import { motion } from "framer-motion";

const NewItem = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data: newsDetail } = useAppSelector((state) => state.newsDetail);
  const { data: news } = useAppSelector((state) => state.news);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNews());
    if (id) {
      dispatch(fetchNewsDetail(id));
    }
  }, [dispatch, id]);

  const item = newsDetail?.[0];

  return (
    <MainLayout>
      <motion.div
        key={id} // 👈 quan trọng để animate lại khi đổi bài
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-[1200px] mx-auto px-4 lg:px-6 mt-12 pb-16"
      >
        <div className="grid lg:grid-cols-4 gap-10">
          {/* ================= LEFT CONTENT ================= */}
          <div className="lg:col-span-3 flex flex-col gap-8 text-white">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-[250px] sm:h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
                src={item?.poster_url}
                alt={item?.title}
              />
            </motion.div>

            {/* Title & Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#1a0f2a] p-6 sm:p-8 rounded-2xl shadow-md"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                {item?.title}
              </h2>
              <p className="text-gray-300 leading-7 text-sm sm:text-base">
                {item?.desciption}
              </p>
            </motion.div>

            {/* ================= COMMENTS ================= */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#1a0f2a] p-6 sm:p-8 rounded-2xl shadow-md"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-6">
                Leave a Comment
              </h3>

              <form>
                <div className="flex flex-col gap-6">
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-400">Nick Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="px-4 py-3 rounded-xl bg-[#230c34] border border-[#2e1b47] focus:outline-none focus:ring-2 focus:ring-[#5f1a89] transition"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-400">E-mail</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="px-4 py-3 rounded-xl bg-[#230c34] border border-[#2e1b47] focus:outline-none focus:ring-2 focus:ring-[#5f1a89] transition"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">
                      Write a Message
                    </label>
                    <textarea
                      placeholder="Your comment..."
                      className="px-4 py-3 rounded-xl bg-[#230c34] border border-[#2e1b47] h-[150px] sm:h-[200px] focus:outline-none focus:ring-2 focus:ring-[#5f1a89] transition"
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-fit px-6 py-3 bg-[#5f1a89] hover:bg-[#7a29b8] rounded-xl font-semibold transition duration-300 shadow-md"
                  >
                    Submit Comment
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 flex flex-col gap-6 text-white"
          >
            <div className="bg-[#5f1a89] px-4 py-3 rounded-xl font-semibold text-center">
              Recent News
            </div>

            <div className="flex flex-col gap-5">
              {news &&
                news.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 6 }}
                    className="flex gap-4 cursor-pointer bg-[#1a0f2a] p-3 rounded-xl hover:bg-[#241238] transition"
                    onClick={() => navigate(`/news-item/${item.id}`)}
                  >
                    <div className="w-[90px] h-[70px] rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        loading="lazy"
                        src={item.poster_url}
                        className="w-full h-full object-cover"
                        alt={item.title}
                      />
                    </div>

                    <div className="flex flex-col justify-between">
                      <h5 className="text-sm line-clamp-2 hover:text-[#bd81e3] transition">
                        {item.title}
                      </h5>
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {item.desciption}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default NewItem;
