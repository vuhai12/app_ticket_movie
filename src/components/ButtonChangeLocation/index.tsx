import TheatreLocations from "@components/TheatreLocations";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const ButtonChangeLocation = ({
  locationCinema,
  setLocationCinema,
}: {
  locationCinema: string | null;
  setLocationCinema: (location: string | null) => void;
}) => {
  const [isPopupTheatreLocations, setIsPopupTheatreLocations] = useState(
    !locationCinema
  );

  const [_, setcinemaId] = useState<null | string>(() =>
    localStorage.getItem("cinemaId")
  );

  return (
    <div className="flex gap-[20px] flex-col md:w-fit w-full">
      <label className="relative flex items-center">
        <FaMapMarkerAlt className="text-[#5f1a89] absolute left-[10px] z-[99]" />
        {/* <input
          // value={location}
          placeholder="Change Location Cinema"
          onClick={() => setIsPopupTheatreLocations(true)}
          className="py-[10px] pl-[35px] text-[12px] pr-[20px] md:w-fit w-full truncate z-[98] text-gray-500 border-[1px] border-[#5f1a89] rounded-[10px]"
        /> */}
      </label>
      {/* <div className="flex gap-[10px] items-center">
        <FaMapMarkerAlt className="text-white " />
        <h3 className="text-white font-semibold text-[14px] underline break-all">
          {location}
        </h3>
      </div> */}

      {isPopupTheatreLocations && (
        <TheatreLocations
          setcinemaId={setcinemaId}
          locationCinema={locationCinema}
          setLocationCinema={setLocationCinema}
          setIsPopupTheatreLocations={setIsPopupTheatreLocations}
        />
      )}
    </div>
  );
};

export default ButtonChangeLocation;
