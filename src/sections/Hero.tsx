import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";
import {
  faComment,
  faLongArrowRight,
  faTooth,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Hero({
  firstItemRef,
}: {
  firstItemRef?: HTMLDivElement;
}) {
  function scrollToFirstItem(): void {
    if (firstItemRef !== undefined) {
      firstItemRef.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const textarea = firstItemRef.querySelector("textarea");
        if (textarea) textarea.focus();
      }, 700);
    }
  }

  return (
    <section className="w-[980px] min-h-[80vh] justify-center mx-auto px-5 py-[150px] flex flex-col gap-8 max-md:gap-5 max-md:py-[50px] max-md:w-auto">
      <p className="text-2xl max-md:text-xl text-text font-light leading-10">
        Welcome To Caswell Orthodontic's
      </p>
      <h1 className="text-6xl max-md:text-4xl font-black text-text">
        Virtual Care App
      </h1>
      <div className="flex flex-col gap-1">
        <p className="text-text font-light leading-10">
          <FontAwesomeIcon icon={faUser} /> 1. Enter Your Patient Info
        </p>
        <p className="text-text font-light leading-10">
          <FontAwesomeIcon icon={faComment} /> 2. Answer A Few Questions
        </p>
        <p className="text-text font-light leading-10">
          <FontAwesomeIcon icon={faTooth} /> 3. Snap 5 Pics of Your Teeth
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={(): void => {
            scrollToFirstItem();
          }}
          label="Let's Proceed"
          style="accent"
          iconPosition="end"
          icon={<FontAwesomeIcon icon={faLongArrowRight} />}
        />
      </div>
    </section>
  );
}
