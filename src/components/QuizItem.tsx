import Question from "./Question";
import Choice from "./Choice";
import { Choices } from "../quiz-app-types";
import TextInput from "./TextInput";
import { useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import Instruction from "./Instruction";
import ImageInput from "./ImageInput";
import MultiImageInput from "./MultiImageInput";

type QuizItemProps = {
  question: string;
  choices?: Choices;
  isBlurred: boolean;
  selectedItem?: string | File | File[];
  isChecked: boolean;
  id: number;
  inline?: boolean;
  itemType?: string;
  validation?: "text" | "number";
  placeholder?: string;
  onValueConfirmed: (
    id: number,
    question: string,
    value: string | File | File[]
  ) => void;
  focused: boolean;
  multiple: boolean;
  subtext?: string;
  htmlContent?: ReactNode | ReactNode[];
};

export default function QuizItem({
  question,
  choices,
  isBlurred,
  selectedItem,
  isChecked,
  id,
  inline,
  itemType = "checkbox",
  validation = "text",
  multiple = false,
  placeholder = "",
  subtext = "",
  htmlContent = <></>,
  onValueConfirmed,
}: QuizItemProps) {
  const [valuesString, setValuesString] = useState("");

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    id: number,
    question: string,
    value: string
  ) => {
    if (event.key === "Tab") {
      event.preventDefault(); // Prevent default tab behavior (optional)
      onValueConfirmed(id, question, value);
    }
  };

  const handleChoiceChange = (value: string) => {
    if (multiple) {
      // Handle multiple selections
      let selectedValues = valuesString ? valuesString.split(",") : [];

      if (selectedValues.includes(value)) {
        selectedValues = selectedValues.filter((v) => v !== value);
      } else {
        selectedValues.push(value);
      }

      setValuesString(selectedValues.join(","));
    } else {
      // Handle single selection
      onValueConfirmed(id, question, value);
    }
  };

  return (
    <div className="flex flex-col gap-8 pt-[150px] w-full min-h-[80vh] justify-center">
      <Question label={question} isBlurred={isBlurred} isChecked={isChecked} />
      {multiple && itemType === "checkbox" && (
        <p
          className={`${
            isBlurred ? "opacity-0" : "opacity-1"
          } duration-1000 text-gray-400 flex items-center text-xs mt-2`}
        >
          Select all that apply, then click the
          <span className="bg-accent text-xs mx-2 flex gap-1 items-center text-white opacity-50 rounded-md p-2">
            Next
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          button
        </p>
      )}
      <div
        className={`flex ${
          !inline ? "flex-col" : "flex-wrap"
        } items-start gap-2`}
      >
        {itemType === "checkbox" && choices && (
          <div
            className={`duration-1000 ${
              isBlurred ? "opacity-0" : "opacity-1"
            } `}
          >
            <div className="flex flex-wrap gap-3">
              {choices.map((choice, index) => (
                <Choice
                  key={index}
                  label={choice.label}
                  value={choice.value}
                  isBlurred={isBlurred}
                  imageSrc={choice.imageSrc}
                  selected={
                    multiple
                      ? valuesString.split(",").includes(choice.value)
                      : selectedItem !== undefined &&
                        selectedItem === choice.value
                  }
                  onValueConfirmed={(value): void => handleChoiceChange(value)}
                />
              ))}
            </div>
            {multiple && (
              <div className="mt-5">
                <Button
                  disabled={isBlurred}
                  onClick={() => onValueConfirmed(id, question, valuesString)}
                  label="Next"
                  style="primary"
                  iconPosition="end"
                  icon={<FontAwesomeIcon icon={faArrowRightLong} />}
                />
              </div>
            )}
          </div>
        )}
        {(itemType === "input" || itemType === "textarea") && (
          <TextInput
            placeholder={placeholder}
            subtext={subtext}
            handleKeyDown={(e, id, question, value) =>
              handleKeyDown(e, id, question, value)
            }
            question={question}
            validation={validation}
            itemType={itemType}
            id={id.toString()}
            isBlurred={isBlurred}
            onValueConfirmed={(id, question, value) =>
              onValueConfirmed(id, question, value)
            }
          />
        )}
        {itemType === "instruction" && (
          <Instruction
            isBlurred={isBlurred}
            question={question}
            id={id.toString()}
            subtext={subtext}
            htmlContent={htmlContent}
            onValueConfirmed={(id, question, value) =>
              onValueConfirmed(id, question, value)
            }
          />
        )}
        {itemType === "imageinput" && (
          <ImageInput
            isBlurred={isBlurred}
            question={question}
            id={id.toString()}
            subtext={subtext}
            htmlContent={htmlContent}
            onValueConfirmed={(id, question, value) =>
              onValueConfirmed(id, question, value)
            }
          />
        )}
        {itemType === "multiimageinput" && (
          <MultiImageInput
            isBlurred={isBlurred}
            question={question}
            id={id.toString()}
            subtext={subtext}
            htmlContent={htmlContent}
            onValueConfirmed={(id, question, value) =>
              onValueConfirmed(id, question, value)
            }
          />
        )}
      </div>
    </div>
  );
}
