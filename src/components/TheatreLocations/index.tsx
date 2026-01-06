import { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Font Awesome
import { X } from "lucide-react";
import classNames from "classnames";
import { fetchCinemas } from "store/slices/cinemaSlice";
import { useAppDispatch, useAppSelector } from "store/hook";
import Loading from "@components/Loading";

const TheatreLocations = ({
  locationCinema,
  setLocationCinema,
  setIsPopupTheatreLocations,
  setcinemaId,
}: {
  setIsPopupTheatreLocations: (isPopupTheatreLocations: boolean) => void;
  setLocationCinema: (location: string | null) => void;
  locationCinema: string | null;
  setcinemaId: (cinemaId: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.cinemas);
  useEffect(() => {
    dispatch(fetchCinemas());
  }, [dispatch]);

  const handlePickLocationTheatre = (location: string, cinemaId: string) => {
    localStorage.setItem("location", location);
    localStorage.setItem("cinemaId", cinemaId);

    setIsPopupTheatreLocations(false);
    setLocationCinema(location);
    setcinemaId(cinemaId);
  };

  {
    loading && <Loading />;
  }

  const handlePopupTheatreLocations = () => {
    if (locationCinema) {
      setIsPopupTheatreLocations(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999]">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handlePopupTheatreLocations}
      ></div>

      <div className="flex flex-col gap-[30px] absolute z-[99] bg-white rounded-[10px] p-[50px] w-[600px] h-[500px]">
        <div className="absolute top-[30px] right-[50px]">
          <X onClick={handlePopupTheatreLocations} className="cursor-pointer" />
        </div>
        <h3 className="text-[23px] text-black font-semibold text-center">
          Select Your Theatre
        </h3>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex gap-[30px] flex-col h-[450px] overflow-auto">
            {data.length > 0 &&
              data.map((item) => {
                return (
                  <div
                    onClick={() =>
                      handlePickLocationTheatre(item.name, item.id)
                    }
                    className={classNames(
                      "flex gap-[30px] cursor-pointer rounded-[10px]   p-[10px] items-center",
                      locationCinema == item.name
                        ? "border-[#5f1a89] border-[2px]"
                        : "border-gray-400 border-[1px]"
                    )}
                  >
                    <FaMapMarkerAlt className="text-[#5f1a89]" />
                    <div className="flex-1 flex flex-col gap-[10px]">
                      <h3 className="text-[18px] text-[#5f1a89] font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-[14px] text-gray-500">
                        {item.address}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TheatreLocations;
