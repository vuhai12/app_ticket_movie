import Loading from "@components/Loading";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchTickets } from "store/slices/ticketsSlice";
import { useNavigate } from "react-router-dom";
import { createSeats } from "store/slices/seatsSlice";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

const TicketSummary = ({
  locationCinema,
  image,
  title,
  duration,
  showtime,
  quantity,
  seat,
  totalAmount,
  selectMovie,
  time,
}: {
  locationCinema: string | null;
  image: string;
  title: string;
  duration: string;
  showtime: string | null;
  quantity: number;
  seat: { row: string; col: number }[] | null;
  totalAmount: number;
  selectMovie: null | string;
  time: string | null;
}) => {
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    phone: z.string().min(8, "Phone must be at least 8 characters"),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.tickets);
  const navigate = useNavigate();

  const user_id = localStorage.getItem("idUser");

  const isValidBooking =
    locationCinema &&
    showtime &&
    quantity > 0 &&
    seat &&
    seat.length === quantity &&
    totalAmount > 0 &&
    selectMovie;

  const onSubmit = async (formData: FormSchema) => {
    if (!isValidBooking) return;

    dispatch(
      fetchTickets({
        ...formData,
        show_time_id: showtime,
        ticket_quantity: quantity,
        total_price: totalAmount,
        user_id,
        movie_id: selectMovie,
      }),
    );
  };

  useEffect(() => {
    if (!data || !data[0]?.id || !seat || !showtime) return;

    const seatPayload = seat.map((s) => ({
      ticket_id: data[0].id,
      showtime_id: showtime,
      row: s.row,
      col: s.col,
    }));

    dispatch(createSeats(seatPayload));
    navigate("/payment");
  }, [data, seat, showtime, dispatch, navigate]);

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-white/10 bg-[#1e0d28] text-white">
      {/* Header */}
      <div className="bg-[#5f1a89] p-4">
        <h3 className="text-lg font-semibold">Ticket Summary</h3>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Movie Info */}
        {selectMovie ? (
          <div className="flex gap-3">
            <div className="h-28 w-20 rounded-md overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="text-xs text-gray-400">{duration}</p>
            </div>
          </div>
        ) : (
          <Loading />
        )}

        {/* Info */}
        <div className="text-sm text-gray-300 space-y-2">
          <InfoRow label="Location" value={locationCinema} />
          <InfoRow label="Show Time" value={time} />
          <InfoRow label="Ticket Quantity" value={quantity?.toString()} />
          <InfoRow
            label="Selected Seat"
            value={
              seat && seat.length > 0
                ? seat.map((s) => `${s.col}${s.row}`).join(", ")
                : null
            }
          />
          <InfoRow
            label="Total Amount"
            value={`${totalAmount.toLocaleString()} USD`}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <InputField
            placeholder="Full Name"
            register={register("name")}
            error={errors.name?.message}
          />

          <InputField
            placeholder="Mobile Number"
            register={register("phone")}
            error={errors.phone?.message}
          />

          <button
            type="submit"
            disabled={!isValidBooking}
            className={`w-full py-2 rounded-md font-semibold transition ${
              isValidBooking
                ? "bg-purple-700 hover:bg-purple-800"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            PURCHASE TICKET
          </button>
        </form>

        <p className="text-xs text-gray-400">
          By clicking Purchase Ticket you accept Terms & Conditions.
        </p>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: any }) => (
  <div className="flex justify-between">
    <p>{label}</p>
    <p className="text-gray-400 text-right">{value ?? "_ _"}</p>
  </div>
);

const InputField = ({ placeholder, register, error }: any) => (
  <div>
    <input
      {...register}
      placeholder={placeholder}
      className="w-full text-black px-3 py-2 rounded-md border border-gray-400 text-sm"
    />
    {error && (
      <div className="mt-2 flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-md">
        <AlertCircle className="w-4 h-4" />
        {error}
      </div>
    )}
  </div>
);

export default TicketSummary;
