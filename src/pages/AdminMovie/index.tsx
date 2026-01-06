import { useEffect, useState } from "react";
import LayoutDashboardAdmin from "../../Layout/LayoutDashboardAdmin";
import { deleteMovie, fetchMovies } from "store/slices/movieSlice";
import { useAppDispatch, useAppSelector } from "store/hook";
import Pagination from "@components/Pagination";
import ModalAddEdit from "@components/ModalAddEdit";
import { Movie, SortableMovieField } from "../../types/movie.types";
import { Pencil, Trash2, Plus, ChevronsUpDown } from "lucide-react";

const AdminMovie = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.movies);
  const [pageCurrent, setPageCurrent] = useState(1);

  const [sortBy, setSortBy] = useState<SortableMovieField>("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const limit = 3;
  const from = (pageCurrent - 1) * limit;
  const to = from + limit - 1;
  useEffect(() => {
    dispatch(fetchMovies({ from, to, sortBy, order }));
  }, [dispatch, pageCurrent, sortBy, order]);

  const [isShowModal, setIsShowModal] = useState(false);
  const [edittingItem, setEdittingItem] = useState<Movie | null>(null);
  const handleEdit = (movie: Movie) => {
    setIsShowModal(true);
    setEdittingItem(movie);
  };

  const handleDelete = async (item: Movie) => {
    await dispatch(deleteMovie(item.id));
    await dispatch(fetchMovies({ from, to }));
  };

  const handleSort = (name: SortableMovieField) => {
    setSortBy(name);
    setOrder((pre) => (pre == "asc" ? "desc" : "asc"));
  };

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
                  <ChevronsUpDown
                    onClick={() => handleSort("title")}
                    className="w-4 h-4 text-white cursor-pointer"
                  />
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
          {data && data.dataMovies.length > 0 ? (
            <tbody className="">
              {data.dataMovies.map((item, index) => {
                return (
                  <tr className="border-b-[1px] border-[#3f1356]">
                    <td className="w-[50px] p-5">{index + 1}</td>
                    <td className="w-[100px] p-5">{item.title}</td>
                    <td className="w-[100px] p-5">{item.status}</td>
                    <td className="line-clamp-3 w-[100px] px-5">
                      {item.description}
                    </td>
                    <td className="w-[100px] p-5">{item.duration}</td>
                    <td className="w-[100px] p-5">{item.release_date}</td>
                    <td className="w-[100px] p-5">
                      <img src={item.poster_url} />
                    </td>
                    <td className="w-[100px] p-5">{item.trailer_url}</td>
                    <td className="w-[100px] p-5">{item.category}</td>
                    <td className="w-[100px] p-5">{item.actor}</td>
                    <td className="flex gap-[20px] w-[200px] items-center justify-center p-5">
                      <Pencil
                        onClick={() => handleEdit(item)}
                        className="w-5 h-5 text-[#dabbed] cursor-pointer "
                      />
                      <Trash2
                        onClick={() => handleDelete(item)}
                        className="w-5 h-5 text-red-500 cursor-pointer "
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <p>No data</p>
          )}
        </table>
      </div>

      <div className="mt-[30px]">
        <Pagination
          limit={limit}
          setPageCurrent={setPageCurrent}
          pageCurrent={pageCurrent}
          totalItems={data.total}
        />
      </div>
      {isShowModal && (
        <ModalAddEdit
          from={from}
          to={to}
          edittingItem={edittingItem}
          setIsShowModal={setIsShowModal}
          setEdittingItem={setEdittingItem}
        />
      )}
    </LayoutDashboardAdmin>
  );
};

export default AdminMovie;
