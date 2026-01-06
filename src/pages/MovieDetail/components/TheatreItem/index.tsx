const TheatreItem = ({
  icon,
  name,
  address,
}: {
  icon: string;
  name: string;
  address: string;
}) => {
  return (
    <div className="flex gap-[50px] border-[1px] rounded-[12px] border-gray-300">
      <img src={icon} />
      <div className="flex flex-col gap-[50px]">
        <h3>{name}</h3>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default TheatreItem;
