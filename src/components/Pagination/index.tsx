import classNames from "classnames";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  limit,
  totalItems,
  pageCurrent,
  setPageCurrent,
}: {
  limit: number;
  totalItems: number;
  pageCurrent: number;
  setPageCurrent: (page: number | ((page: number) => number)) => void;
}) => {
  const totalPages = Math.ceil(totalItems / limit);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const handleChangePage = (page: number) => {
    setPageCurrent(page);
  };
  const handleNext = () => {
    if (pageCurrent < totalPages) {
      setPageCurrent((page: number) => page + 1);
    }
  };
  const handlePre = () => {
    if (pageCurrent > 1) {
      setPageCurrent((page: number) => page - 1);
    }
  };

  return (
    <div className="flex gap-[10px] text-[12px] text-black  justify-center">
      <div
        onClick={handlePre}
        className="bg-white cursor-pointer  rounded-[50%] w-[35px] h-[35px] flex justify-center items-center"
      >
        <ChevronLeft className="w-[20px] h-[20px]  transition" />
      </div>
      {pages.map((item) => {
        return (
          <div
            onClick={() => handleChangePage(item)}
            className={classNames(
              "p-[10px] cursor-pointer rounded-[50%] text-[14px] w-[35px] h-[35px] font-semibold flex justify-center items-center",
              item == pageCurrent ? " bg-[#5f1a89] text-white" : "bg-white"
            )}
          >
            {item}
          </div>
        );
      })}
      <div
        onClick={handleNext}
        className="bg-white cursor-pointer rounded-[50%] w-[35px] h-[35px] flex justify-center items-center"
      >
        <ChevronRight className="w-[20px] h-[20px] transition" />
      </div>
    </div>
  );
};

export default Pagination;
