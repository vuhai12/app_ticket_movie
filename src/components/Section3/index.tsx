import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bgImage1 from "@assets/Section3/bg-image1.webp";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchNews } from "store/slices/newsSlice";
import { AlertCircle } from "lucide-react";
import {
  createVotesMovie,
  createVotesMovieBulk,
} from "store/slices/votesMovieSlice";

const ratingData = [
  { id: 1, lable: "Good", value: 60 },
  { id: 2, lable: "Average", value: 72 },
  { id: 3, lable: "Excellent", value: 90 },
];

const voteMovieData = [
  {
    movie_id: "0a6844b2-e58a-4a3f-9af1-5dd100c22de1",
    lable: "The Long Walk",
    value: 1223,
  },
  {
    movie_id: "0e23697c-88cf-437d-97ff-73aabd92276f",
    lable: "Hamnet (2025)",
    value: 123,
  },
  {
    movie_id: "7f34f9b3-dabd-4ebf-aae5-0909dac83d06",
    lable: "One Battle After Another",
    value: 57,
  },
  {
    movie_id: "8c1f4349-f8fc-49d2-8824-fcb96221d0e0",
    lable: "Now You See Me (2025)",
    value: 40,
  },
  {
    movie_id: "9e6fe684-a87a-4449-aa61-f5ecadb7cac6",
    lable: "The Housemaid (2025)",
    value: 28,
  },
];

const Section3 = () => {
  const [active, setActive] = useState(1);
  const [rateVote, setRateVote] = useState("good");
  const [checked, setChecked] = useState<string[]>([]);

  const [errorRateVote, setErrorRateVote] = useState<string | null>(null);
  const [successRateVote, setSuccessRateVote] = useState<string | null>(null);

  const [successMultiVote, setSuccessMultiVote] = useState<string | null>(null);
  const [errorMultiVote, setErrorMultiVote] = useState<string | null>(null);
  const [errorMultiVoteChecked, setErrorMultiVoteChecked] = useState<
    string | null
  >(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.news);
  const idUser = localStorage.getItem("idUser");

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleChecked = (id: number, name: string) => {
    setActive(id);
    setRateVote(name.toLowerCase());
    setSuccessRateVote(null);
    setErrorRateVote(null);
  };

  const handleCheckedVote = (id: string) => {
    setSuccessMultiVote(null);
    setErrorMultiVote(null);
    setErrorMultiVoteChecked(null);

    if (checked.includes(id)) {
      setChecked(checked.filter((item) => item !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const handleSubmitRateVote = async () => {
    setErrorRateVote(null);
    setSuccessRateVote(null);

    if (!idUser) {
      setErrorRateVote("You need to log in to vote.");
      return;
    }

    try {
      await dispatch(
        createVotesMovie({
          user_id: idUser,
          movie_id: "f4d9a6e6-08df-4f42-b198-dbb5895dec01",
          vote: rateVote,
        }),
      ).unwrap();

      setSuccessRateVote("Vote submitted successfully.");
    } catch (error) {
      setErrorRateVote("Something went wrong. Please try again.");
    }
  };

  const handleSubmitMultiVote = async () => {
    setErrorMultiVote(null);
    setErrorMultiVoteChecked(null);
    setSuccessMultiVote(null);

    if (!idUser) {
      setErrorMultiVote("You need to log in to vote.");
      return;
    }

    if (checked.length === 0) {
      setErrorMultiVoteChecked("No movie selected.");
      return;
    }

    const payload = checked.map((movieId) => ({
      user_id: idUser,
      movie_id: movieId,
      vote: "good",
    }));

    try {
      await dispatch(createVotesMovieBulk(payload)).unwrap();
      setSuccessMultiVote("Vote submitted successfully.");
      setChecked([]);
    } catch (error) {
      setErrorMultiVote("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-20 bg-[#0f0516] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            <div className="bg-[#1E0D28] p-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h5 className="text-lg font-semibold">Latest News</h5>
                <Link
                  to="/news-list"
                  className="text-sm border border-purple-500 text-purple-400 px-5 py-2 rounded-lg hover:bg-purple-500 hover:text-white transition"
                >
                  View All
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {data?.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className={`relative group rounded-xl overflow-hidden ${
                      index === 0 ? "sm:row-span-2" : ""
                    }`}
                  >
                    <img
                      loading="lazy"
                      src={item.poster_url}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-5 flex flex-col gap-2">
                      <h5 className="text-sm font-semibold line-clamp-1">
                        {item.title}
                      </h5>
                      <p className="text-xs text-gray-300 line-clamp-2">
                        {item.desciption}
                      </p>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/news-item/${item.id}`)}
                        className="mt-2 text-xs bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg hover:opacity-90 transition"
                      >
                        Detail
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-10"
          >
            {/* RATE */}
            <div className="bg-[#1E0D28] rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-semibold">
                How do you rate the movie?
              </div>

              <div className="p-6 flex flex-col gap-4">
                <img
                  loading="lazy"
                  src={bgImage1}
                  className="w-full h-40 object-cover rounded-lg"
                />

                {ratingData.map((item) => (
                  <label
                    key={item.id}
                    className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition ${
                      active === item.id
                        ? "bg-purple-700/40"
                        : "hover:bg-purple-700/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        className="hidden"
                        checked={item.id === active}
                        onChange={() => handleChecked(item.id, item.lable)}
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 border-white ${
                          active === item.id && "bg-white"
                        }`}
                      />
                      <span className="text-sm">{item.lable}</span>
                    </div>
                  </label>
                ))}

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitRateVote}
                  className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600 py-2 rounded-lg text-sm hover:opacity-90 transition"
                >
                  Submit
                </motion.button>

                {errorRateVote && (
                  <div className="flex items-center gap-2 text-red-400 text-xs mt-2">
                    <AlertCircle size={16} />
                    {errorRateVote}
                  </div>
                )}

                {successRateVote && (
                  <div className="text-green-400 text-xs mt-2">
                    {successRateVote}
                  </div>
                )}
              </div>
            </div>

            {/* MULTI VOTE */}
            <div className="bg-[#1E0D28] rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-semibold">
                Vote For Movie
              </div>

              <div className="p-6 flex flex-col gap-4">
                {voteMovieData.map((item) => (
                  <label
                    key={item.movie_id}
                    className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition ${
                      checked.includes(item.movie_id)
                        ? "bg-purple-700/40"
                        : "hover:bg-purple-700/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={checked.includes(item.movie_id)}
                      onChange={() => handleCheckedVote(item.movie_id)}
                    />
                    <div className="w-5 h-5 border-2 border-white rounded flex items-center justify-center">
                      {checked.includes(item.movie_id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CheckIcon className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <span className="text-sm">{item.lable}</span>
                  </label>
                ))}

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitMultiVote}
                  className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600 py-2 rounded-lg text-sm hover:opacity-90 transition"
                >
                  Submit
                </motion.button>

                {errorMultiVote && (
                  <div className="flex items-center gap-2 text-red-400 text-xs mt-2">
                    <AlertCircle size={16} />
                    {errorMultiVote}
                  </div>
                )}

                {errorMultiVoteChecked && (
                  <div className="flex items-center gap-2 text-red-400 text-xs mt-2">
                    <AlertCircle size={16} />
                    {errorMultiVoteChecked}
                  </div>
                )}

                {successMultiVote && (
                  <div className="text-green-400 text-xs mt-2">
                    {successMultiVote}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Section3;
