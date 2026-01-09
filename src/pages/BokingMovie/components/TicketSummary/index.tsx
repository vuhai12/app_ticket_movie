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
  const formPurchaseSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    phone: z.string().min(8, "Number phone must be at least 8 characters"),
  });

  type FormPurchaseSchema = z.infer<typeof formPurchaseSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPurchaseSchema>({
    resolver: zodResolver(formPurchaseSchema),
  });

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.tickets);

  const user_id = localStorage.getItem("idUser");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const onSubmit = async (formPurchaseSchema: FormPurchaseSchema) => {
    try {
      if (
        locationCinema &&
        showtime &&
        quantity &&
        seat &&
        totalAmount &&
        (user_id || user) &&
        selectMovie
      ) {
        dispatch(
          fetchTickets({
            ...formPurchaseSchema,
            show_time_id: showtime,
            ticket_quantity: quantity,
            total_price: totalAmount,
            user_id,
            movie_id: selectMovie,
          })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (data.length > 0 && data[0].id && seat && showtime) {
      const seatPayload = seat.map((s) => ({
        ticket_id: data[0].id,
        showtime_id: showtime,
        row: s.row,
        col: s.col,
      }));
      dispatch(createSeats(seatPayload));
      navigate("/payment");
    }
  }, [data]);

  return (
    <div className="flex  flex-col">
      <div className="bg-[#5f1a89] p-[15px]">
        <h3 className="text-[18px] font-semibold text-white">Ticket Summary</h3>
      </div>

      <div className="flex flex-col gap-[10px] p-[15px] bg-[#1e0d28] rounded-[8px] text-white">
        {selectMovie ? (
          <div className="flex gap-[10px] justify-between">
            <div className=" h-[120px] w-[100px] rounded-[5px] overflow-hidden">
              <img src={image} className="w-full object-cover h-full " />
            </div>
            <div className="flex flex-col flex-1 gap-[10px]">
              <h3 className="text-[12px] font-semibold">{title}</h3>
              <p className="text-[10px] text-gray-400">{duration}</p>
            </div>
          </div>
        ) : (
          <Loading />
        )}

        <div className="flex gap-[10px] flex-col text-[14px] text-gray-300 mt-[10px]">
          <div className="flex justify-between">
            <p className="">Location</p>
            {locationCinema == null ? (
              <p>_ _</p>
            ) : (
              <p className="font-semibold text-gray-400 text-right">
                {locationCinema}
              </p>
            )}
          </div>
          <div className="flex  justify-between">
            <p className="flex gap-[20px]">Show Time </p>
            {showtime == null ? (
              <p>_ _</p>
            ) : (
              <p className="text-gray-400">{time}</p>
            )}
          </div>
          <div className="flex  justify-between">
            <p className="flex gap-[20px]">Ticket Quantity </p>
            {showtime == null ? (
              <p>_ _</p>
            ) : (
              <p className="text-gray-400">{quantity}</p>
            )}
          </div>
          <div className="flex  justify-between">
            <p className="flex gap-[20px]">Selected Seat </p>
            {seat == null ? (
              <p>_ _</p>
            ) : (
              <p className="text-right text-gray-400">
                {seat.map((item, index) => {
                  if (index == seat.length - 1) return `${item.col}${item.row}`;
                  return `${item.col}${item.row}, `;
                })}
              </p>
            )}
          </div>
          <div className="flex  justify-between">
            <p className="flex gap-[20px]">Total Amount </p>
            <p className="text-gray-400">{totalAmount} USD</p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <h3 className="text-[16px] font-semibold">Ticket For</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-[20px] flex-col"
          >
            <div>
              <input
                {...register("name")}
                className="text-[14px] w-full text-black py-[8px] px-[15px] rounded-[5px] border-[1px] border-gray-400"
                placeholder="Full Name"
              />
              {errors.name && (
                <div className="mt-2 flex items-start gap-2 rounded-md bg-red-500/10 px-3 py-2 text-[11px] text-red-400 border border-red-500/30">
                  <AlertCircle className="w-4 h-4 mt-[1px]" />
                  <span>{errors.name.message} </span>
                </div>
              )}
            </div>
            <div>
              <input
                {...register("phone")}
                className="text-[14px] w-full text-black py-[8px] rounded-[5px] px-[15px] border-[1px] border-gray-400"
                placeholder="Mobie Number"
              />

              {errors.phone && (
                <div className="mt-2 flex items-start gap-2 rounded-md bg-red-500/10 px-3 py-2 text-[11px] text-red-400 border border-red-500/30">
                  <AlertCircle className="w-4 h-4 mt-[1px]" />
                  <span>{errors.phone.message} </span>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="text-[12px] rounded-[5px] p-[8px] bg-[#5f1a89] text-white font-semibold"
            >
              PURCHASE TICKET
            </button>
          </form>
        </div>
        <p className="text-[10px]">
          By clicking the Purchase Tickets you are accepting Terms & Conditions
          of Star Cineplex.
        </p>
      </div>
    </div>
  );
};

export default TicketSummary;
