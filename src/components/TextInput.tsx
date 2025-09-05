import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Button from "./Button";

type TextInputProps = {
  id: string;
  itemType: "input" | "textarea";
  question: string;
  validation: "number" | "text";
  onValueConfirmed: (id: number, question: string, value: string) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    id: number,
    question: string,
    value: string
  ) => void;
  focused?: boolean;
  isBlurred?: boolean;
  placeholder?: string;
  subtext?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  itemType,
  question,
  validation,
  onValueConfirmed,
  handleKeyDown,
  isBlurred = false,
  placeholder = "",
  subtext = "",
}) => {
  const [value, setValue] = useState("");

  function validateValue(
    event: React.FormEvent<HTMLTextAreaElement>,
    validation: "number" | "text"
  ) {
    const elem = event.currentTarget; // Correct type (HTMLTextAreaElement)
    const value = elem.value;

    if (validation === "number") {
      const numVal = value.replace(/\D/g, ""); // Removes non-numeric characters
      elem.value = numVal;
    }
  }

  function handleValueConfirmed() {
    if (value.length === 0) {
      return toast.warn("Oops, you forgot to answer!");
    }
    onValueConfirmed(parseInt(id), question, value);
  }

  return (
    <div
      className={` ${
        isBlurred ? "opacity-0" : "opacity-1"
      }  w-full flex flex-col gap-3 duration-1000`}
    >
      <p>{subtext}</p>
      <div key={id} className="flex items-start gap-2 w-full">
        <textarea
          rows={itemType === "input" ? 1 : 5}
          className="text-xl border rounded-md border-[#007693] outline-none p-4 w-full"
          onChange={(e) => setValue(e.target.value)}
          onInput={(e) => validateValue(e, validation)}
          onKeyDown={(e) => handleKeyDown(e, parseInt(id), question, value)}
          disabled={isBlurred}
          placeholder={placeholder}
        />
        <Button
          onClick={() => handleValueConfirmed()}
          label="Next"
          style="accent"
          stretch={itemType !== "textarea"}
          iconPosition="end"
          icon={<FontAwesomeIcon icon={faArrowRightLong} />}
        />
      </div>
      <p className="text-gray-400 flex items-center text-xs mt-2">
        After typing hit{" "}
        <span className="px-4 py-2 text-xs mx-2 bg-gray-200 opacity-50 text-gray-800 rounded-md">
          Tab
        </span>{" "}
        or Click the{" "}
        <span className="bg-accent text-xs mx-2 text-white opacity-50 rounded-md p-2 flex gap-1 items-center">
          Next
          <FontAwesomeIcon icon={faArrowRightLong} />
        </span>{" "}
        button
      </p>
    </div>
  );
};

export default TextInput;
