import { useEffect, useState } from "react";
import { Movie } from "../../types/movie.types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadPoster } from "@api/uploadPoster";
import { useAppDispatch } from "store/hook";
import { createMovie, fetchMovies, updateMovie } from "store/slices/movieSlice";

const ModalAddEdit = ({
  setEdittingItem,
  from,
  to,
  setIsShowModal,
  edittingItem,
}: {
  setEdittingItem: (edittingItem: Movie | null) => void;
  setIsShowModal: (isShowModal: boolean) => void;
  edittingItem: Movie | null;
  from: number;
  to: number;
}) => {
  const emptyForm: Omit<Movie, "id"> = {
    title: "",
    description: "",
    status: "coming_soon",
    release_date: "",
    poster_url: "",
    trailer_url: "",
    category: "",
    actor: "",
    duration: "",
  };

  const formSchema = z.object({
    title: z.string().min(3, "Please enter title!"),
    actor: z.string().min(3, "Please enter tiactortle!"),
    category: z.string().min(3, "Please enter category!"),
    trailer_url: z.string().min(3, "Please enter trailer_url!"),
    duration: z.string().min(3, "Please enter duration!"),
    release_date: z.string().min(3, "Please enter release_date!"),
    status: z.string(),
    description: z.string().min(6, "Please enter description!"),
    poster_url: z.string().min(6, "Please enter poster_url!"),
  });

  type FormData = z.infer<typeof formSchema>;

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState<Omit<Movie, "id">>(emptyForm);

  useEffect(() => {
    if (edittingItem) {
      reset({
        title: edittingItem.title,
        actor: edittingItem.actor,
        category: edittingItem.category,
        trailer_url: edittingItem.trailer_url,
        duration: edittingItem.duration,
        release_date: edittingItem.release_date,
        status: edittingItem.status,
        description: edittingItem.description,
        poster_url: edittingItem.poster_url,
      });
    } else {
      reset();
    }
  }, [edittingItem]);

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      const url = await uploadPoster(file);
      setFormData({ ...formData, poster_url: url });
      setValue("poster_url", url);
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setEdittingItem(null);
  };

  const onSubmit = async (formData: FormData) => {
    if (edittingItem) {
      await dispatch(updateMovie({ movieId: edittingItem.id, data: formData }));
      await dispatch(fetchMovies({ from, to }));
    } else {
      await dispatch(createMovie(formData));
      await dispatch(fetchMovies({ from: 0, to: 2 }));
    }
    setIsShowModal(false);
    setEdittingItem(null);
  };
  return (
    <div
      onClick={handleCloseModal}
      className="bg-black/40 fixed  inset-0 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-[20px] w-full mx-auto sm:w-[500px] max-h-[70vh] overflow-auto bg-white"
      >
        <h3 className="text-[20px] text-white bg-[#5f1a89] text-center py-[10px] ">
          Add
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-[20px] flex flex-col gap-[20px]"
        >
          <div className="flex flex-col gap-[10px]">
            <label>Title</label>
            <input
              {...register("title")}
              name="title"
              placeholder="title"
              className="py-[10px] px-[20px] border-gray-400 border-[1px] rounded-[10px]"
            />
            {errors.title && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                {errors.title.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[10px] ">
            <label className="">Status</label>
            <select
              {...register("status")}
              name="status"
              className="py-[10px] px-[20px] border-[1px] border-gray-400 rounded-[10px] bg-white"
            >
              <option value={"coming_soon"}>Coming soon</option>
              <option value={"now_showing"}>Now showing</option>
            </select>
          </div>
          <div className="flex flex-col gap-[10px]">
            <label>Description</label>
            <div className="flex">
              <input
                {...register("description")}
                name="description"
                placeholder="description"
                className=" py-[10px] flex-1 w-full px-[20px] border-gray-400 border-[1px] rounded-tl-[10px] rounded-bl-[10px]"
              />
            </div>
            {errors.description && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                {errors.description.message}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-[10px]">
            <label>Duration </label>
            <div className="flex">
              <input
                {...register("duration")}
                name="duration"
                placeholder="duration"
                className=" py-[10px] flex-1 w-full px-[20px] border-gray-400 border-[1px] rounded-tl-[10px] rounded-bl-[10px]"
              />
            </div>
            {errors.duration && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                {errors.duration.message}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-[10px]">
            <label>Release_date</label>
            <div className="flex">
              <input
                {...register("release_date")}
                name="release_date"
                type="date"
                placeholder="release_date"
                className=" py-[10px] flex-1 w-full px-[20px] border-gray-400 border-[1px] rounded-tl-[10px] rounded-bl-[10px]"
              />
            </div>
            {errors.release_date && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                {errors.release_date.message}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-[10px]">
            <label>Post_url</label>
            <div className="flex gap-[20px] flex-col">
              <div className="flex-1">
                <img
                  src={
                    preview || edittingItem?.poster_url || "/default-poster.png"
                  }
                />
              </div>
              <input
                onChange={(e) => handleChangeFile(e)}
                type="file"
                placeholder="poster_url"
                className=" py-[10px] flex-1 w-full px-[20px] border-gray-400 border-[1px] rounded-tl-[10px] rounded-bl-[10px]"
              />
              <input type="hidden" {...register("poster_url")} />
              {errors.poster_url && (
                <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                  {errors.poster_url.message}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <label>Trailer_url</label>
            <div className="flex">
              <input
                {...register("trailer_url")}
                name="trailer_url"
                placeholder="Trailer_url"
                className=" py-[10px] flex-1 w-full px-[20px] border-gray-400 border-[1px] rounded-tl-[10px] rounded-bl-[10px]"
              />
            </div>
            {errors.trailer_url && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                {errors.trailer_url.message}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-[10px]">
            <label>Category</label>
            <div className="flex">
              <input
                {...register("category")}
                name="category"
                placeholder="Category"
                className=" py-[10px] flex-1 w-full px-[20px] border-gray-400 border-[1px] rounded-tl-[10px] rounded-bl-[10px]"
              />
            </div>
            {errors.category && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                {errors.category.message}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-[10px]">
            <label>Actor</label>
            <div className="flex">
              <input
                {...register("actor")}
                name="actor"
                placeholder="Actor"
                className=" py-[10px] flex-1 w-full px-[20px] border-gray-400 border-[1px] rounded-tl-[10px] rounded-bl-[10px]"
              />
            </div>
            {errors.actor && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                {errors.actor.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="py-[10px] bg-[#5f1a89] rounded-[10px] text-white"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddEdit;
