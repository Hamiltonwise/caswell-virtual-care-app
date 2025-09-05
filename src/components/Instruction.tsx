import { type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

type InstructionProps = {
  id: string;
  question: string;
  htmlContent: ReactNode | ReactNode[];
  subtext?: string;
  isBlurred?: boolean;
  onValueConfirmed: (id: number, question: string, value: string) => void;
};

const Instruction: React.FC<InstructionProps> = ({
  id,
  question,
  subtext = "",
  htmlContent = <></>,
  isBlurred = false,
  onValueConfirmed,
}) => {
  function handleValueConfirmed() {
    onValueConfirmed(parseInt(id), question, "proceed");
  }

  return (
    <div
      className={`${
        isBlurred ? "opacity-0" : "opacity-1"
      } w-full flex flex-col gap-3 duration-1000`}
    >
      <p>{subtext}</p>
      {htmlContent}
      <div key={id} className="flex items-start gap-2 w-full">
        <Button
          onClick={() => handleValueConfirmed()}
          label="Next"
          style="accent"
          iconPosition="end"
          icon={<FontAwesomeIcon icon={faArrowRightLong} />}
        />
      </div>
      <p className="text-gray-400 flex items-center text-xs mt-2">
        After reading click the{" "}
        <span className="bg-accent text-xs mx-2 text-white opacity-50 rounded-md p-2 flex gap-1 items-center">
          Next
          <FontAwesomeIcon icon={faArrowRightLong} />
        </span>{" "}
        button
      </p>
    </div>
  );
};

export default Instruction;
