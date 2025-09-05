import type { ReactNode } from "react";

type Choice = { label: string; value: string };

export type QuestionItemType = {
  question: string;
  type: string;
  choices?: Choice[];
  inline?: boolean;
  placeholder?: string;
  subtext?: string;
  validation?: "text" | "number";
  htmlContent?: ReactNode | ReactNode[];
  multiple?: boolean;
};

export const questions: QuestionItemType[] = [
  {
    question: "Why are you seeking Orthodontic Treatment?",
    type: "checkbox",
    multiple: true,
    choices: [
      {
        label: "I want to straighten my teeth",
        value: "I want to straighten my teeth",
      },
      {
        label: "I want to correct my bite",
        value: "I want to correct my bite",
      },

      {
        label: "I want to resolve my pain",
        value: "I want to resolve my pain",
      },

      {
        label: "I want to improve my confidence",
        value: "I want to improve my confidence",
      },
      {
        label: "I have a special occasion coming up",
        value: "I have a special occasion coming up",
      },
    ],
  },
  {
    question: "Where should we email your consultation?",
    type: "input",
    placeholder: "Enter Your Email",
    validation: "text",
  },
  {
    question: "Which mobile number can we reach you at?",
    type: "input",
    placeholder: "Mobile Number",
    validation: "number",
  },

  {
    question: "Patient's Full Name",
    type: "input",
    placeholder: "First Name, Last Name, MI",
    validation: "text",
  },

  {
    question: "Describe your Orthodontic Goals/Objectives:",
    type: "textarea",
    subtext: "Tell us what you want to accomplish",
    validation: "text",
  },

  {
    question: "Which type of orthodontic appliance are you most interested in?",
    type: "checkbox",
    choices: [
      {
        label: "Invisalign/Clear Aligners",
        value: "Invisalign/Clear Aligners",
      },
      {
        label: "Metal Braces",
        value: "Metal Braces",
      },
      {
        label: "Clear Braces",
        value: "Clear Braces",
      },
      {
        label: "I'd like Dr. Caswell's recommendation",
        value: "I'd like Dr. Caswell's recommendation",
      },
    ],
  },

  {
    question: "Do You Have Dental Insurance with Orthodontic Coverage?",
    type: "checkbox",
    choices: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
      {
        label: "Yes, but not sure about orthodontic benefit",
        value: "Yes, but not sure about orthodontic benefit",
      },
    ],
  },

  {
    question: "How soon would you like to begin?",
    type: "checkbox",
    choices: [
      {
        label: "I'm Ready, ASAP!",
        value: "I'm Ready, ASAP!",
      },
      {
        label: "1-2 Months",
        value: "1-2 Months",
      },
      {
        label: "I'm just starting to gather information",
        value: "I'm just starting to gather information",
      },
      {
        label: "I'm mostly curious, not too serious",
        value: "I'm mostly curious, not too serious",
      },
    ],
  },

  {
    question: "Which location do you prefer?",
    type: "checkbox",
    choices: [
      {
        label: "Honolulu Office",
        value: "Honolulu Office",
      },
      {
        label: "Kahala Office",
        value: "Kahala Office",
      },
      {
        label: "Mililani Office",
        value: "Mililani Office",
      },
    ],
  },

  {
    question: "On the next screen, we'll ask for 5 photos",
    subtext:
      "We encourage uploading photos taken from a mobile phone camera to ensure image quality",
    htmlContent: (
      <div className="flex gap-2 flex-wrap">
        <img
          className="rounded-md w-[18%]"
          src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t1.jpg"
          alt=""
        />
        <img
          className="rounded-md w-[18%]"
          src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t2.jpg"
          alt=""
        />
        <img
          className="rounded-md w-[18%]"
          src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t3.jpg"
          alt=""
        />
        <img
          className="rounded-md w-[18%]"
          src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t4.jpg"
          alt=""
        />
        <img
          className="rounded-md w-[18%]"
          src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t5.jpg"
          alt=""
        />
      </div>
    ),
    type: "instruction",
  },
  {
    question: "Photo 1/5",
    subtext:
      "First, take a selfie of your teeth straight on, as shown. * Please bite down on your back teeth.",
    htmlContent: (
      <img
        className="rounded-md w-full h-full max-h-[200px] max-w-[300px] object-cover"
        src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t1.jpg"
        alt=""
      />
    ),
    type: "imageinput",
  },
  {
    question: "Photo 2/5",
    subtext:
      "Great! 4 more to go! Take a selfie of the left side of your teeth, using your finger to stretch your cheek. * Please bite down on your back teeth.",
    htmlContent: (
      <img
        className="rounded-md w-full h-full max-h-[200px] max-w-[300px] object-cover"
        src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t2.jpg"
        alt=""
      />
    ),
    type: "imageinput",
  },
  {
    question: "Photo 3/5",
    subtext:
      "Nice work! 3 more to go! Take a selfie of the right side of your teeth, using your finger to stretch your cheek. * Please bite down on your back teeth.",
    htmlContent: (
      <img
        className="rounded-md w-full h-full max-h-[200px] max-w-[300px] object-cover"
        src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t3.jpg"
        alt=""
      />
    ),
    type: "imageinput",
  },
  {
    question: "Photo 4/5",
    subtext:
      "Almost done! 2 more to go! Take a selfie of the top of your teeth, as if you were looking up.",
    htmlContent: (
      <img
        className="rounded-md w-full h-full max-h-[200px] max-w-[300px] object-cover"
        src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t4.jpg"
        alt=""
      />
    ),
    type: "imageinput",
  },
  {
    question: "Photo 5/5",
    subtext:
      "Congrats - last photo! Take a selfie of the bottom of your teeth, as if you were looking down.",
    htmlContent: (
      <img
        className="rounded-md w-full h-full max-h-[200px] max-w-[300px] object-cover"
        src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t5.jpg"
        alt=""
      />
    ),
    type: "imageinput",
  },
];
