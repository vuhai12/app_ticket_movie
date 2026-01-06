import { useEffect, useState } from "react";
import LayoutDashboardAdmin from "../../Layout/LayoutDashboardAdmin";
import { fetchMovies } from "store/slices/movieSlice";
import { useAppDispatch } from "store/hook";

import { Plus, ChevronsUpDown } from "lucide-react";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();

  const [pageCurrent, _] = useState(1);
  const limit = 3;
  const from = (pageCurrent - 1) * limit;
  const to = from + limit - 1;
  useEffect(() => {
    dispatch(fetchMovies({ from, to }));
  }, [dispatch, pageCurrent]);

  const [, setIsShowModal] = useState(false);

  return (
    <LayoutDashboardAdmin>
      <button
        onClick={() => setIsShowModal(true)}
        className="rounded-[5px] flex items-center gap-[15px] px-[20px]  py-[5px] bg-[#5f1a89] text-white"
      >
        <Plus className="w-5 h-5 text-white" />
        Add
      </button>
      <div className="w-full min-w-0 overflow-auto bg-[#1e0d28] mt-[30px]">
        <table className="w-[1500px]  text-white text-[14px]">
          <thead className="bg-[#5f1a89]">
            <tr>
              <th className="w-[50px] p-5">No</th>
              <th className="w-[100px] p-5 ">
                <div className="flex justify-between items-center">
                  <p>Title</p>
                  <ChevronsUpDown className="w-4 h-4 text-white cursor-pointer" />
                </div>
              </th>
              <th className="w-[100px] p-5 ">
                <div className="flex justify-between items-center">
                  <p>Status</p>
                  <ChevronsUpDown className="w-4 h-4 text-white cursor-pointer" />
                </div>
              </th>
              <th className="w-[100px] p-5 ">
                <div className="flex justify-between items-center">
                  <p>Description</p>
                  <ChevronsUpDown className="w-4 h-4 text-white cursor-pointer" />
                </div>
              </th>
              <th className="w-[100px] p-5">
                <div className="flex justify-between items-center">
                  <p>Duration</p>
                  <ChevronsUpDown className="w-4 h-4 text-white cursor-pointer" />
                </div>
              </th>
              <th className="w-[100px] p-5">
                <div className="flex justify-between items-center">
                  <p>Release_date</p>
                  <ChevronsUpDown className="w-4 h-4 text-white cursor-pointer" />
                </div>
              </th>
              <th className="w-[100px] p-5">Post_url</th>
              <th className="w-[100px] p-5">Trailer_url</th>
              <th className="w-[100px] p-5">
                <div className="flex justify-between items-center">
                  <p>Category</p>
                  <ChevronsUpDown className="w-4 h-4 text-white cursor-pointer" />
                </div>
              </th>
              <th className="w-[100px] p-5">
                <div className="flex justify-between items-center">
                  <p>Actor</p>
                  <ChevronsUpDown className="w-4 h-4 text-white cursor-pointer" />
                </div>
              </th>
              <th className="w-[200px] p-5">Action</th>
            </tr>
          </thead>
          <p>No data</p>
        </table>
      </div>
    </LayoutDashboardAdmin>
  );
};

export default AdminDashboard;
