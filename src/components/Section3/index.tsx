import { useEffect, useState } from "react";
import bgImage1 from "@assets/Section3/bg-image1.svg";

import { CheckIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
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
    lable: "Now You See Me: Now You Don't (2025)",
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
  const [errorRateVote, setErrorRateVote] = useState<null | string>(null);
  const [successRateVote, setSuccessRateVote] = useState<null | string>(null);
  const [successMultiVote, setSuccessMultiVote] = useState<null | string>(null);
  const [errorMultiVote, setErrorMultiVote] = useState<null | string>(null);
  const [errorMultiVoteChecked, setErrorMultiVoteChecked] = useState<
    null | string
  >(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.news);

  const idUser = localStorage.getItem("idUser");

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  const handleChecked = (id: number, name: string) => {
    setActive(id);
    setRateVote(name.toLowerCase());
    setSuccessRateVote(null);
  };

  const handleCheckedVote = (id: string) => {
    setSuccessMultiVote(null);
    setErrorMultiVoteChecked(null);
    if (checked.includes(id)) {
      setChecked(checked.filter((item) => item !== id));
    } else {
      setChecked([...checked, id]);
    }
  };
  const handleSubmitRateVote = async () => {
    if (!idUser) {
      setErrorRateVote("You need to log in to vote.");
    } else {
      try {
        await dispatch(
          createVotesMovie({
            user_id: idUser,
            movie_id: "f4d9a6e6-08df-4f42-b198-dbb5895dec01",
            vote: rateVote,
          }),
        ).unwrap();
        setSuccessRateVote("Vote submitted.");
      } catch (error) {}
    }
  };

  const handleSubmitMultiVote = async () => {
    if (!idUser) {
      setErrorMultiVote("You need to log in to vote.");
    } else {
      if (checked.length > 0) {
        const payload = checked.map((movieId: string) => ({
          user_id: idUser,
          movie_id: movieId,
          vote: "good",
        }));

        try {
          await dispatch(createVotesMovieBulk(payload)).unwrap();
          setSuccessMultiVote("Vote submitted.");
          setErrorMultiVoteChecked(null);
          setErrorMultiVote(null);
          setChecked([]);
        } catch (error) {}
      } else {
        setSuccessMultiVote(null);
        setErrorMultiVoteChecked("No movie selected.");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col gap-[20px] mt-[20px] lg:flex-row max-w-[900px] mx-auto px-4">
        <div className="flex flex-col gap-[20px] lg:flex-[3]">
          <div className=" bg-[#1E0D28]/100 p-[20px] flex flex-col gap-[20px] flex-1">
            <div className="flex justify-between flex-wrap gap-[20px]">
              <h5 className="text-[18px] font-semibold text-white">
                Latest News
              </h5>
              <Link
                to="/news-list"
                className="cursor-pointer text-[12px] font-semibold text-white px-[20px] py-[10px] border-[1px]  border-white p-[10px] rounded-[10px]"
              >
                View All
              </Link>
            </div>
            <div
              className={classNames(
                `grid md:grid-cols-2 lg:grid-cols-3 gap-[30px] flex-1`,
              )}
            >
              {data &&
                data.length > 0 &&
                data.map((item, index: number) => {
                  return (
                    <div
                      key={index}
                      style={{ backgroundImage: `url(${item.poster_url})` }}
                      className={classNames(
                        `bg-no-repeat rounded-[10px] group relative h-[300px] sm:h-[auto] bg-center bg-cover flex flex-col justify-end  p-[20px]`,
                        index == 0 ? "md:row-span-2" : "",
                      )}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-60" />
                      <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-[#15061E]/0 to-[#15061E]/80"></div>
                      <div className="relative z-9 flex-col gap-[10px] flex opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                        <h5 className="lg:text-[14px]  font-semibold text-white line-clamp-1">
                          {item.title}
                        </h5>
                        <p className="text-[12px] text-gray-400 line-clamp-2">
                          {item.desciption}
                        </p>
                        <button
                          onClick={() => navigate(`/news-item/${item.id}`)}
                          className="py-[10px] text-[12px] rounded-[10px] px-[15px] w-fit font-semibold bg-[#5f1a89] text-white"
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="bg-[#1E0D28]/100 p-[20px] flex-col gap-[20px] flex">
            <div className="flex flex-col gap-[10px] max-w-[1216px]">
              <h5 className="text-[16px] font-semibold text-white">
                Student Reward
              </h5>
              <p className="text-[12px] text-white">
                STAR Cineplex brings a whole new experience for the young
                generation with the ‘Student Reward Program. This is a special
                opportunity for students of educational institutions to get
                a‘Buy 1 Get 1’ offer for movie tickets at all the branches of
                STAR Cineplex. Details
              </p>
            </div>
            <button
              onClick={() => navigate("/register")}
              className="text-white w-fit text-[12px] cursor-pointer border-[1px]  border-white p-[10px] rounded-[10px]"
            >
              Register Now
            </button>
          </div>
        </div>
        <div className="flex-col flex gap-[20px] lg:flex-[1]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[10px] bg-[#5f1a89] px-[20px] py-[10px]">
              <p className="text-white text-[14px] font-semibold">
                How do you rate the movie?
              </p>
            </div>
            <div className="bg-[#1E0D28]/100 flex gap-[20px] flex-col md:p-[20px] ">
              <div className="flex flex-col gap-[10px]">
                <div className="flex justify-between gap-[20px] md:flex-row flex-col md:items-center flex-wrap">
                  <div className="w-full h-[107px] rounded-[10px] overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={bgImage1}
                    />
                  </div>
                  <p className="text-[12px] font-semibold text-white">
                    Avatar: The Way of Water (3D)
                  </p>
                </div>
                {ratingData.map((item, _) => {
                  return (
                    <label
                      key={item.id}
                      className={`${
                        active == item.id && "bg-[#451662]"
                      } grid grid-cols-[auto_1fr_2fr_1fr] gap-[10px] p-[10px] items-center cursor-pointer rounded-[10px]`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className=" hidden"
                          checked={item.id == active}
                          onChange={() => handleChecked(item.id, item.lable)}
                        />
                        <span
                          className={`${
                            active == item.id && "border-[2px]"
                          } w-[20px] h-[20px] rounded-full border-white border-[2px] relative`}
                        >
                          {active == item.id && (
                            <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[10px] h-[10px]  rounded-full  bg-white " />
                          )}
                        </span>
                      </div>
                      <p className="text-white text-[12px]">{item.lable}</p>
                      {active == item.id && (
                        <div className="bg-white h-[3px] w-full" />
                      )}
                      {active == item.id && (
                        <p className="text-white text-right text-[12px]">
                          {item.value}%
                        </p>
                      )}
                    </label>
                  );
                })}
                {successRateVote && (
                  <div className="mt-2 flex items-start gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[12px] text-emerald-400">
                    <svg
                      className="mt-[1px] h-4 w-4 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{successRateVote}</span>
                  </div>
                )}
                {errorRateVote && (
                  <div className="mt-2 flex items-start gap-2 rounded-md bg-red-500/10 px-3 py-2 text-[11px] text-red-400 border border-red-500/30">
                    <AlertCircle className="w-4 h-4 mt-[1px]" />
                    <span>
                      {errorRateVote}{" "}
                      <Link
                        to="/login"
                        className="underline font-semibold hover:text-red-300"
                      >
                        Login
                      </Link>
                    </span>
                  </div>
                )}
                <button
                  onClick={handleSubmitRateVote}
                  className="bg-[#5f1a89] mt-[10px] px-[20px] w-fit text-white rounded-[5px] py-[5px] text-[12px]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-[10px] bg-[#5f1a89] px-[20px] py-[10px] text-white">
              <h5 className="text-[14px] font-semibold">Notice</h5>
            </div>
            <div className="bg-[#1E0D28] p-[20px]  gap-[10px] flex flex-col text-white">
              <p className="text-white text-[12px]">
                We are open seven days a week.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-[10px] bg-[#5f1a89] px-[20px] py-[10px]">
              <h5 className="text-[14px] font-semibold text-white">
                Vote For Movie
              </h5>
            </div>
            <div className="bg-[#1E0D28]/100 p-[20px] gap-[20px] flex flex-col text-white">
              <div className="flex flex-col gap-[10px]">
                {voteMovieData.map((item, _) => {
                  return (
                    <label key={item.movie_id} className="cursor-pointer">
                      <div className="grid grid-cols-[1fr_5fr]">
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={checked.includes(item.movie_id)}
                          onChange={() => handleCheckedVote(item.movie_id)}
                        />
                        <div
                          className={` ${
                            checked.includes(item.movie_id) && "bg-[#451662]"
                          }  rounded-[5px] flex-1 relative w-[20px] flex flex-wrap justify-center items-center h-[20px] border-white border-[2px]`}
                        >
                          {checked.includes(item.movie_id) && (
                            <CheckIcon className="w-full h-full text-white" />
                          )}
                        </div>
                        <p className="text-white flex-8 text-[12px] break-all ">
                          {item.lable}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
              {successMultiVote && (
                <div className="mt-2 flex items-start gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[12px] text-emerald-400">
                  <svg
                    className="mt-[1px] h-4 w-4 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{successMultiVote}</span>
                </div>
              )}
              {errorMultiVoteChecked && (
                <div className="mt-2 flex items-start gap-2 rounded-md bg-red-500/10 px-3 py-2 text-[11px] text-red-400 border border-red-500/30">
                  <AlertCircle className="w-4 h-4 mt-[1px]" />
                  <span>{errorMultiVoteChecked} </span>
                </div>
              )}
              {errorMultiVote && (
                <div className="mt-2 flex items-start gap-2 rounded-md bg-red-500/10 px-3 py-2 text-[11px] text-red-400 border border-red-500/30">
                  <AlertCircle className="w-4 h-4 mt-[1px]" />
                  <span>
                    {errorMultiVote}{" "}
                    <Link
                      to="/login"
                      className="underline font-semibold hover:text-red-300"
                    >
                      Login
                    </Link>
                  </span>
                </div>
              )}
              <button
                onClick={handleSubmitMultiVote}
                className="bg-[#5f1a89] px-[20px] w-fit text-white rounded-[5px] py-[5px] text-[12px]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;
