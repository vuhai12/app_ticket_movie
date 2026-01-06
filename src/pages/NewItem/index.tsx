import MainLayout from "Layout/MainLayout";
import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { fetchNewsDetail } from "store/slices/newsDetailSlice";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchNews } from "store/slices/newsSlice";

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

  return (
    <MainLayout>
      <div className="flex gap-[30px] mt-[50px] lg:flex-row flex-col">
        <div className="lg:flex-[3] flex flex-col gap-[20px] text-white">
          <div className="w-full h-[350px] rounded-[10px] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={newsDetail[0]?.poster_url}
            />
          </div>
          <div>
            <h2 className="title py-[20px] text-[30px]">
              {newsDetail[0]?.title}
            </h2>
            <p>{newsDetail[0]?.desciption}</p>
          </div>

          <h3 className="text-[24px] font-semibold">comment's</h3>
          <h3 className="text-[23px] font-semibold">Leave a Comment</h3>
          <div>
            <form className="text-white">
              <div className="flex gap-[30px] flex-col">
                <div className="flex gap-[30px] sm:flex-row flex-col">
                  <div className="flex flex-col flex-1 gap-[10px]">
                    <label>Nick Name :</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="px-[20px] py-[10px] rounded-[5px] text-black bg-[#230c34] border-[1px] border-[#1f2932]"
                    />
                  </div>
                  <div className="flex flex-col flex-1 gap-[10px]">
                    <label>E-mail :</label>
                    <input
                      type="text"
                      placeholder="email"
                      className="px-[20px] py-[10px] rounded-[5px] text-black bg-[#230c34] border-[1px] border-[#1f2932]"
                    />
                  </div>
                </div>
                <div className="flex flex-col  gap-[10px]">
                  <label>Write a Message :</label>
                  <textarea className="text-black bg-[#230c34] rounded-[5px] px-[20px] py-[10px] h-[200px] border-[1px] border-[#1f2932]"></textarea>
                </div>
                <button className="px-[20px] py-[10px] bg-[#5f1a89] w-fit rounded-[10px] text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="lg:flex-1 flex flex-col gap-[20px] text-white">
          <div className="p-[10px] bg-[#5f1a89] ">Recent News</div>
          <div className="flex flex-col gap-[20px]">
            {news &&
              news.length > 0 &&
              news.map((item) => {
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

export default NewItem;
