import { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { X } from "lucide-react";
import classNames from "classnames";
import { fetchCinemas } from "store/slices/cinemaSlice";
import { useAppDispatch, useAppSelector } from "store/hook";
import LoadingSpinner from "@components/LoadingSpinner";

interface Props {
  setIsPopupTheatreLocations: (value: boolean) => void;
  setLocationCinema: (location: string | null) => void;
  locationCinema: string | null;
  setcinemaId: (cinemaId: string) => void;
}

const TheatreLocations = ({
  locationCinema,
  setLocationCinema,
  setIsPopupTheatreLocations,
  setcinemaId,
}: Props) => {
  const dispatch = useAppDispatch();
  const { data = [], loading } = useAppSelector((state) => state.cinemas);

  useEffect(() => {
    dispatch(fetchCinemas());
  }, [dispatch]);

  const handlePickLocationTheatre = (location: string, cinemaId: string) => {
    localStorage.setItem("location", location);
    localStorage.setItem("cinemaId", cinemaId);

    setLocationCinema(location);
    setcinemaId(cinemaId);
    setIsPopupTheatreLocations(false);
  };

  const handleClose = () => {
    if (locationCinema) {
      setIsPopupTheatreLocations(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-[95%] sm:w-[600px] max-h-[85vh] rounded-2xl shadow-2xl p-6 sm:p-8 animate-fadeIn">
        {/* Close button */}
        <div className="absolute top-4 right-4">
          <X
            onClick={handleClose}
            className="cursor-pointer text-gray-500 hover:text-black transition"
          />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-center mb-6">
          Select Your Theatre
        </h3>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-2">
            {data.length > 0 ? (
              data.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => handlePickLocationTheatre(item.name, item.id)}
                  className={classNames(
                    "flex gap-4 cursor-pointer rounded-xl p-4 border transition-all",
                    locationCinema === item.name
                      ? "border-purple-700 bg-purple-50"
                      : "border-gray-200 hover:border-purple-400 hover:bg-gray-50",
                  )}
                >
                  <FaMapMarkerAlt className="text-purple-700 mt-1" />

                  <div className="flex-1">
                    <h4 className="font-semibold text-purple-700">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{item.address}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No theatres available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TheatreLocations;
