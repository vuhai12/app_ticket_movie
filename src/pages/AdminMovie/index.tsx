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

  const [isShowModal, setIsShowModal] = useState(false);
  const [edittingItem, setEdittingItem] = useState<Movie | null>(null);

  const limit = 5;
  const from = (pageCurrent - 1) * limit;
  const to = from + limit - 1;

  useEffect(() => {
    dispatch(fetchMovies({ from, to, sortBy, order }));
  }, [dispatch, pageCurrent, sortBy, order]);

  const handleEdit = (movie: Movie) => {
    setIsShowModal(true);
    setEdittingItem(movie);
  };

  const handleDelete = async (item: Movie) => {
    await dispatch(deleteMovie(item.id));
    dispatch(fetchMovies({ from, to, sortBy, order }));
  };

  const handleSort = (field: SortableMovieField) => {
    setSortBy(field);
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <LayoutDashboardAdmin>
      {/* Header Action */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Movie Management</h1>

        <button
          onClick={() => {
            setEdittingItem(null);
            setIsShowModal(true);
          }}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#5f1a89] hover:bg-[#7a27ad] transition shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Movie</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1e0d28] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white">
            <thead className="bg-[#2b1239] text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">#</th>

                <th className="px-6 py-4 cursor-pointer">
                  <div
                    className="flex items-center gap-2"
                    onClick={() => handleSort("title")}
                  >
                    Title
                    <ChevronsUpDown className="w-4 h-4" />
                  </div>
                </th>

                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Poster</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Release</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.dataMovies?.length ? (
                data.dataMovies.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-white/10 hover:bg-[#2b1239]/60 transition"
                  >
                    <td className="px-6 py-4">
                      {(pageCurrent - 1) * limit + index + 1}
                    </td>

                    <td className="px-6 py-4 font-medium">{item.title}</td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-[#5f1a89]/40 text-purple-300">
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <img
                        src={item.poster_url}
                        alt=""
                        className="w-12 h-16 object-cover rounded-md shadow"
                      />
                    </td>

                    <td className="px-6 py-4">{item.duration} min</td>

                    <td className="px-6 py-4">
                      {new Date(item.release_date).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">{item.category}</td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 rounded-lg hover:bg-[#5f1a89]/40 transition"
                        >
                          <Pencil className="w-4 h-4 text-purple-300" />
                        </button>

                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 rounded-lg hover:bg-red-500/20 transition"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-400">
                    No movies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          limit={limit}
          setPageCurrent={setPageCurrent}
          pageCurrent={pageCurrent}
          totalItems={data?.total}
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
