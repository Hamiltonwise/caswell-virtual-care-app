import { useRef, useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faTooth,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { toast } from "react-toastify";

type ImageInputProps = {
  id: string;
  question: string;
  htmlContent: ReactNode | ReactNode[];
  subtext?: string;
  isBlurred?: boolean;
  onValueConfirmed: (
    id: number,
    question: string,
    value: string | File
  ) => void;
};

const ImageInput: React.FC<ImageInputProps> = ({
  id,
  question,
  subtext = "",
  htmlContent = <></>,
  isBlurred = false,
  onValueConfirmed,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  function handleValueConfirmed() {
    if (!selectedFile) return toast.warn("You need to upload a photo first");
    onValueConfirmed(parseInt(id), question, selectedFile);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/heic",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert(
          "Invalid file type. Please upload a PNG, JPG, JPEG, or HEIC image."
        );
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        alert("File size must be less than 10MB.");
        return;
      }

      setSelectedFile(file);

      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`${
        isBlurred ? "opacity-0" : "opacity-1"
      } flex flex-col items-start gap-5 w-full`}
    >
      <p>{subtext}</p>
      <p className="text-gray-400 flex items-center text-xs mt-2">
        After uploading click the{" "}
        <span className="bg-accent text-xs mx-2 text-white opacity-50 rounded-md p-2 flex gap-1 items-center">
          Next
          <FontAwesomeIcon icon={faArrowRightLong} />
        </span>{" "}
        button
      </p>
      <div className="flex gap-[30px] max-md:flex-col items-center w-full">
        {htmlContent}
        <FontAwesomeIcon
          className={`${preview ? "text-primary" : "text-text"} text-2xl`}
          icon={faTooth}
        />
        <div className="flex flex-col">
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/heic"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />

          <div
            className={`min-h-[200px] min-w-[300px] rounded-md border-2 p-3 ${
              preview
                ? "border-primary bg-primary/20"
                : "border-text bg-gray-100"
            } border-dashed  flex justify-center items-center cursor-pointer  text-gray-500`}
            onClick={triggerFileInput}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className=" w-full h-full max-h-[200px] max-w-[300px] object-cover rounded-md"
              />
            ) : (
              <p className="text-text">
                <FontAwesomeIcon icon={faUpload} /> Click to upload
              </p>
            )}
          </div>

          {selectedFile && (
            <p className="text-sm text-gray-600 -mb-[40px] max-md:-mb-[0px] mt-5">
              Selected file: {selectedFile.name} (
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>
      </div>
      {preview && (
        <Button
          onClick={() => handleValueConfirmed()}
          label="Next"
          style="accent"
          iconPosition="end"
          icon={<FontAwesomeIcon icon={faArrowRightLong} />}
        />
      )}
    </div>
  );
};

export default ImageInput;
