const Quantity = ({
  countTiket,
  setCountTiket,
}: {
  countTiket: number;
  setCountTiket: (fnc: (countTiket: number) => number) => void;
}) => {
  const handleIncrease = () => {
    setCountTiket((prev) => Math.min(10, prev + 1));
  };
  const handleDeIncrease = () => {
    setCountTiket((prev) => Math.max(0, prev - 1));
  };
  return (
    <div className="lg::w-fit w-full">
      <div className="flex gap-[20px] flex-col">
        <h3 className="text-[18px] text-white font-semibold">
          Ticket Quantity
        </h3>
        <div className="p-[20px] flex gap-[20px] bg-white rounded-[8px] justify-between">
          <div
            onClick={handleDeIncrease}
            className="p-[5px] cursor-pointer rounded-[5px] bg-[#e9d6f5] w-[50px] h-[50px] flex justify-center items-center text-[#5f1a89] text-[50px]"
          >
            -
          </div>
          <div className="flex flex-col gap-[10px] items-center justify-center">
            <p className="text-[16px] font-semibold text-black">
              {countTiket} Tickets
            </p>
            <p className="text-[12px] text-gray-400">Max 10 Tickets</p>
          </div>
          <div
            onClick={handleIncrease}
            className="bg-[#5f1a89] cursor-pointer p-[5px] rounded-[5px] text-[#e9d6f5] w-[50px] h-[50px] flex items-center justify-center text-[50px]"
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quantity;
