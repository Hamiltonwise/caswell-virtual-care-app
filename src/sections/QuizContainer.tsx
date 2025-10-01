import { useEffect, useRef, useState } from "react";
import { questions } from "../questions";
import QuizItem from "../components/QuizItem";
import Button from "../components/Button";
import axios from "axios";
import ConfettiExplosion from "react-confetti-explosion";
import Lottie from "lottie-react";
import successLottie from "../assets/success-lottie.json";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactGA from "react-ga4";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import imageCompression from "browser-image-compression";
const TRACKING_ID = "G-09WKL0L1E5"; // your Measurement ID

type QuizContainerProps = {
  onProgressChange: (percentage: number) => void;
  onRefsPopulated: (refs: (HTMLDivElement | null)[]) => void;
};

export default function QuizContainer({
  onProgressChange,
  onRefsPopulated,
}: QuizContainerProps) {
  const [currentItem, setCurrentItem] = useState(0);
  const [answers, setAnswers] = useState<{
    [id: number]: {
      question: string;
      value: string | File;
      type?: string;
    };
  }>({});
  const [email, setEmail] = useState("");
  const [, setOutlineEmail] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setHasAAEID] = useState(false);
  const [focusedId, setFocusedId] = useState(-1);
  const [currentProgress, setCurrentProgress] = useState(0);

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const confirmRef = useRef<HTMLDivElement>(null);

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const aaeID = window.location.href.indexOf("aae-2024");
    if (aaeID !== -1) setHasAAEID(true);
  }, []);

  useEffect(() => {
    if (refs.current.length) {
      onRefsPopulated(refs.current);
    }
  }, [refs, onRefsPopulated]);

  async function handleValueConfirmed(
    id: number,
    question: string,
    value: string | File
  ): Promise<void> {
    setAnswers({ ...answers, [id]: { question, value } });
    if (id === currentItem) {
      setCurrentItem(currentItem + 1);

      const progress = ((currentItem + 1) / questions.length) * 100;

      if (progress === 100 && confirmRef.current) {
        confirmRef.current.scrollIntoView({ behavior: "smooth" });
      }

      setCurrentProgress(progress);
      onProgressChange(progress);
    }

    if (id === 1 && typeof value === "string") {
      setEmail(value);
    }

    setFocusedId(id);

    if (currentItem < questions.length - 1) {
      const scrollToRef = refs.current[id + 1];
      if (scrollToRef) {
        setTimeout(() => {
          scrollToRef.scrollIntoView({ behavior: "smooth" });

          setTimeout(() => {
            const textarea = scrollToRef.querySelector("textarea");
            if (textarea) textarea.focus();
          }, 700);
        }, 500);
      }
    }
  }

  function validateEmail(): boolean {
    if (email.length > 0) return true;
    setOutlineEmail(true);
    return false;
  }

  async function convertAndCompressImage(file: File): Promise<File> {
    const needsCompression = file.size > 1 * 1024 * 1024;

    const options = {
      maxSizeMB: needsCompression ? 1 : undefined, // Only resize if > 1MB
      maxWidthOrHeight: needsCompression ? 1200 : undefined,
      fileType: "image/jpeg",
      initialQuality: 0.8,
      alwaysKeepResolution: false,
    };

    try {
      const compressed = await imageCompression(file, options);
      const finalFile = new File(
        [compressed],
        file.name.replace(/\.\w+$/, ".jpg"),
        {
          type: "image/jpeg",
        }
      );

      if (needsCompression) {
        const originalSize = (file.size / 1024 / 1024).toFixed(2);
        const newSize = (finalFile.size / 1024 / 1024).toFixed(2);
        console.log(`${file.name}: ${originalSize}MB → ${newSize}MB`);
      }

      return finalFile;
    } catch (error) {
      console.error(`Compression failed for ${file.name}:`, error);
      throw error;
    }
  }

  async function submitResults() {
    if (!captchaToken) return toast.warn("Please complete captcha first.");
    if (!validateEmail()) return toast.warn("Please enter a valid email.");

    setIsLoading(true);

    // File upload start
    const fileUploadIndices = [6];
    let finalAnswers = answers;

    const endpoint =
      "https://caswellorthodontics.com/wp-json/dqp/v1/upload-photo";
    const formData = new FormData();

    for (const index of fileUploadIndices) {
      const file = answers[index].value as File;

      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File "${file.name}" exceeds 10MB.`);
        setIsLoading(false);
        return;
      }

      try {
        const jpgFile = await convertAndCompressImage(file);
        formData.append("files[]", jpgFile);
      } catch (err) {
        toast.error(`Error processing ${file.name}`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.urls.length) {
        let updatedAnswers = answers;
        response.data.urls.forEach((url: string, index: number) => {
          updatedAnswers = {
            ...updatedAnswers,
            [fileUploadIndices[index]]: {
              question: answers[fileUploadIndices[index]].question,
              type: "image",
              value: url,
            },
          };
        });

        finalAnswers = updatedAnswers;
      }
    } catch (error) {
      console.log(error);
    }

    // File upload end

    axios
      .post(
        "https://caswellorthodontics.com/wp-json/hqa/v1/complete-assessment",
        {
          email,
          answers: finalAnswers,
          submissionFrom: "Virtual Care App",
        }
      )
      .then(() => {
        ReactGA.initialize(TRACKING_ID);
        ReactGA.event({
          category: "Conversion",
          action: "Virtual Care App Conversion",
        });

        setIsLoading(false);
        setIsSuccessful(true);
      })
      .catch((e) => {
        setIsError(true);
        axios.post(
          "https://caswellorthodontics.com/wp-json/hqa/v1/assessment-error",
          { error_body: e }
        );
      });
  }

  return isError ? (
    <ErrorScreen />
  ) : isSuccessful ? (
    <SuccessScreen />
  ) : (
    <div className="flex flex-col items-start gap-10 max-w-[980px] mx-auto pb-[500px] px-5">
      {questions.map((item, index) => (
        <div
          key={index}
          ref={(el: HTMLDivElement | null) => (refs.current[index] = el)}
          className="w-full"
        >
          <QuizItem
            placeholder={item?.placeholder}
            itemType={item.type}
            subtext={item.subtext}
            choices={item?.choices}
            isChecked={index < currentItem}
            id={index}
            question={item.question}
            isBlurred={index > currentItem}
            validation={item.validation}
            onValueConfirmed={handleValueConfirmed}
            focused={focusedId === index}
            multiple={item.multiple || false}
            selectedItem={
              answers[index] !== undefined ? answers[index].value : undefined
            }
            htmlContent={item?.htmlContent}
          />
        </div>
      ))}
      <div
        ref={confirmRef}
        className={` ${
          currentProgress === 100 ? "opacity-1" : "opacity-0"
        } duration-1000 min-h-[80vh] flex flex-col gap-5 justify-center items-center w-full p-3`}
      >
        <div className="flex flex-col gap-3 items-center w-full">
          <p
            className={`duration-1000 text-gray-400 flex items-center text-xs mt-2`}
          >
            Verify captcha then click
            <span className="bg-accent text-xs mx-2 flex gap-1 items-center text-white opacity-50 rounded-md p-2">
              Get Your Results
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
            button
          </p>
          <ReCAPTCHA
            sitekey="6Lez_xQrAAAAAL6D57WUwQKAhSDqjIp9qX4fQAaN"
            onChange={handleCaptchaChange}
          />
        </div>
        <div
          className={`duration-1000 delay-500 ${
            currentProgress === 100 ? " scale-150" : "scale-0"
          } mt-[50px] flex flex-col items-center`}
        >
          <Button
            onClick={submitResults}
            style="accent"
            label={isLoading ? "Please wait" : "Get Your Results"}
            isLoading={isLoading}
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            iconPosition="end"
          />
          {isLoading && (
            <p className="text-xs text-wrap text-gray-600 mt-5">
              Uploading your images may take some time. Please don't close your
              browser.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ErrorScreen(): JSX.Element {
  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-white flex items-center justify-center flex-col gap-2 px-5">
      <h3 className="text-3xl text-gray-600">Oops. Something went wrong.</h3>
      <p className="text-gray-500">
        The developer has been notified and is now working on a fix.
      </p>
    </div>
  );
}

function SuccessScreen(): JSX.Element {
  return (
    <div className="fixed top-0 left-0 z-20 h-[100vh] w-[100vw] flex items-center justify-center flex-col gap-4 max-md:gap-4 px-8">
      <ConfettiExplosion zIndex={100} />
      <div className="animate-splash-circle h-[100%] w-[100%] bg-white rounded-full absolute top-0 left-0 -z-10"></div>
      <div className="w-[350px] max-md:w-[200px]">
        <Lottie animationData={successLottie} loop={false} />
      </div>
      <h1 className="text-center text-6xl font-bold max-md:text-3xl text-slate-800">
        Great Job!
      </h1>
      <div className="flex flex-col gap-1">
        <p className="text-center font-light text-lg max-md:text-base text-slate-800">
          Dr. Caswell will review your information and photos to develop a
          customized Smile Assessment. We will email it to you within 2 business
          days for you to review. The next step would be coming in for full
          records and x-rays. We look forward to helping you achieve a beautiful
          healthy smile
        </p>
      </div>
      <div className="mt-4">
        <Button
          href="https://caswellorthodontics.com/about/"
          label="Learn More About Us"
          style="accent"
        />
      </div>
    </div>
  );
}
