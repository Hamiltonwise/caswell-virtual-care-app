import { useRef, useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faUpload } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { toast } from "react-toastify";

type MultiImageInputProps = {
  id: string;
  question: string;
  htmlContent: ReactNode | ReactNode[];
  subtext?: string;
  isBlurred?: boolean;
  onValueConfirmed: (id: number, question: string, value: File[]) => void;
};

const MultiImageInput: React.FC<MultiImageInputProps> = ({
  id,
  question,
  subtext = "",
  htmlContent = <></>,
  isBlurred = false,
  onValueConfirmed,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [previews, setPreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/heic"];

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(
          "Invalid file type. Please upload a PNG, JPG, JPEG, or HEIC image."
        );
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size must be less than 10MB.");
        return;
      }

      // Update selected files
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles[index] = file;
      setSelectedFiles(newSelectedFiles);

      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...previews];
        newPreviews[index] = reader.result as string;
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (index: number) => {
    fileInputRefs[index].current?.click();
  };

  const handleNext = () => {
    // Filter out null values to get only uploaded files
    const uploadedFiles = selectedFiles.filter(
      (file): file is File => file !== null
    );

    if (uploadedFiles.length === 0) {
      toast.warn("Please upload at least one photo or click Skip to continue");
      return;
    }

    onValueConfirmed(parseInt(id), question, uploadedFiles);
  };

  const handleSkip = () => {
    // Pass empty array to allow skipping
    onValueConfirmed(parseInt(id), question, []);
  };

  return (
    <div
      className={`${
        isBlurred ? "opacity-0" : "opacity-1"
      } flex flex-col items-start gap-5 w-full`}
    >
      <p>{subtext}</p>
      <p className="text-gray-400 flex items-center text-xs mt-2">
        Upload up to 5 photos, then click{" "}
        <span className="bg-accent text-xs mx-2 text-white opacity-50 rounded-md p-2 flex gap-1 items-center">
          Next
          <FontAwesomeIcon icon={faArrowRightLong} />
        </span>{" "}
        or{" "}
        <span className="bg-gray-400 text-xs mx-2 text-white opacity-50 rounded-md p-2 flex gap-1 items-center">
          Skip
        </span>
      </p>
      <div className="flex gap-[30px] max-md:flex-col-reverse  items-start w-full">
        <div className="flex flex-col w-full gap-4 flex-1">
          {/* Grid container for 5 upload slots */}
          <div className="grid grid-cols-2 gap-4">
            {/* First 4 slots in 2x2 grid */}
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex w-full flex-col">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/heic"
                  onChange={(e) => handleFileChange(index, e)}
                  ref={fileInputRefs[index]}
                  className="hidden"
                />
                <div
                  className={`w-full h-[200px] rounded-md border-2 p-3 ${
                    previews[index]
                      ? "border-primary bg-primary/20"
                      : "border-text bg-gray-100"
                  } border-dashed flex justify-center items-center cursor-pointer text-gray-500`}
                  onClick={() => triggerFileInput(index)}
                >
                  {previews[index] ? (
                    <img
                      src={previews[index]!}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <p className="text-text text-sm text-center">
                      <FontAwesomeIcon icon={faUpload} />
                      <br />
                      Click to upload
                    </p>
                  )}
                </div>
                {selectedFiles[index] && (
                  <p className="text-xs text-gray-600 mt-1 truncate">
                    {selectedFiles[index]!.name}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* 5th slot left-aligned below */}
          <div className="flex justify-start">
            <div className="flex flex-col w-[49%]">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/heic"
                onChange={(e) => handleFileChange(4, e)}
                ref={fileInputRefs[4]}
                className="hidden"
              />
              <div
                className={`w-full h-[200px] rounded-md border-2 p-3 ${
                  previews[4]
                    ? "border-primary bg-primary/20"
                    : "border-text bg-gray-100"
                } border-dashed flex justify-center items-center cursor-pointer text-gray-500`}
                onClick={() => triggerFileInput(4)}
              >
                {previews[4] ? (
                  <img
                    src={previews[4]!}
                    alt="Preview 5"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <p className="text-text text-sm text-center">
                    <FontAwesomeIcon icon={faUpload} />
                    <br />
                    Click to upload
                  </p>
                )}
              </div>
              {selectedFiles[4] && (
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {selectedFiles[4]!.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Reference image section */}
        <div className="flex flex-col gap-2 items-center">{htmlContent}</div>
      </div>

      {/* Buttons - both visible immediately */}
      <div className="flex gap-3 mt-2">
        <Button
          onClick={handleNext}
          label="Next"
          style="accent"
          iconPosition="end"
          icon={<FontAwesomeIcon icon={faArrowRightLong} />}
        />
        <Button onClick={handleSkip} label="Skip" style="primary" />
      </div>
    </div>
  );
};

export default MultiImageInput;
