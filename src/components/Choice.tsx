type ChoiceProps = {
  label: string;
  value: string;
  isBlurred?: boolean;
  selected?: boolean;
  imageSrc?: string;
  multiple?: boolean;
  onValueConfirmed: (value: string) => void;
};

export default function Choice({
  label,
  isBlurred,
  value,
  selected,
  imageSrc,
  onValueConfirmed,
}: ChoiceProps) {
  return (
    <>
      <button
        onClick={(): void => onValueConfirmed(value)}
        className={` duration-300 px-11 py-3 border border-accent text-base rounded-lg max-md:px-5 max-md:py-3 max-md:text-base flex flex-col items-center text-left w-max gap-2  ${
          selected ? "bg-accent text-white" : "text-black bg-white "
        }`}
        disabled={isBlurred}
      >
        {imageSrc && (
          <img
            className="h-[60px] max-md:h-10 p-1 bg-white rounded-sm w-auto"
            src={imageSrc}
          />
        )}
        {label}
      </button>
    </>
  );
}
