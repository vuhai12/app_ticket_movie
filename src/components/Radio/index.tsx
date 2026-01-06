const Radio = ({
  label,
  name,
  checked,
  setChecked,
}: {
  label: string;
  name: string;
  checked: boolean;
  setChecked: (check: string) => void;
}) => {
  return (
    <label className="flex gap-[10px] items-center">
      <input
        type="checkbox"
        className="hidden"
        name={name}
        value={label}
        checked={checked}
        onChange={(e) => setChecked(e.target.value)}
      />
      <div className="border-[2px] border-white flex w-[22px] h-[22px] rounded-[50%] items-center justify-center">
        {checked && (
          <div className="w-[10px] h-[10px] rounded-[50%] bg-white" />
        )}
      </div>
      <p className="text-[14px]">{label}</p>
    </label>
  );
};

export default Radio;
