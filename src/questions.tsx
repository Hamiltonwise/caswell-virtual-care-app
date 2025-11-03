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
  // 1) Treatment goals: free-text (no more multiple choice)
  {
    question: "What are your treatment goals? (in your own words)",
    type: "input",
    placeholder:
      "Tell us why you're seeking orthodontic care (e.g., straighten teeth, fix bite, relieve pain, boost confidence)...",
    validation: "text",
    subtext:
      "Dr. Caswell prefers to hear this in your own words so we can personalize your consult.",
  },

  // Contact details
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

  // Patient details
  {
    question: "Patient's Full Name",
    type: "input",
    placeholder: "First Name, Last Name, MI",
    validation: "text",
  },

  {
    // 3) Added birthday field (for Dolphin profile)
    question: "Patient's Date of Birth",
    type: "input",
    placeholder: "MM/DD/YYYY",
    validation: "text",
    subtext: "Needed to create your profile in our system (Dolphin).",
  },

  // (Still useful) Appliance interest
  {
    question: "Which type of orthodontic appliance are you most interested in?",
    type: "checkbox",
    choices: [
      {
        label: "Invisalign/Clear Aligners",
        value: "Invisalign/Clear Aligners",
      },
      { label: "Metal Braces", value: "Metal Braces" },
      { label: "Clear Braces", value: "Clear Braces" },
      {
        label: "I'd like Dr. Caswell's recommendation",
        value: "I'd like Dr. Caswell's recommendation",
      },
    ],
  },

  // General dentist question
  {
    question: "Who is your general dentist?",
    type: "input",
    placeholder: "Dentist's name or practice",
    validation: "text",
    subtext: "Optional. This helps us coordinate care if needed.",
  },

  // 4 & 5) Photos: single, optional step (no multi-step)
  {
    question:
      "Optional: Upload up to 5 teeth photos to speed up your virtual consult",
    subtext:
      "Uploading photos now helps us maximize your consultation time — but it's completely optional. You may upload up to 5 photos or simply skip this step and continue. You can upload 1-5 photos and still skip to the next step anytime.",
    htmlContent: (
      <div className="flex flex-col gap-3 w-full">
        <p className="text-sm font-medium">Images for reference:</p>
        {/* Grid container for reference images matching upload layout */}
        <div className="flex flex-col gap-4">
          {/* First 4 images in 2x2 grid */}
          <div className="grid grid-cols-2 gap-4">
            <img
              className="rounded-md w-full h-[200px] object-cover border-2 border-gray-200"
              src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t1.jpg"
              alt="Reference example 1"
            />
            <img
              className="rounded-md w-full h-[200px] object-cover border-2 border-gray-200"
              src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t2.jpg"
              alt="Reference example 2"
            />
            <img
              className="rounded-md w-full h-[200px] object-cover border-2 border-gray-200"
              src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t3.jpg"
              alt="Reference example 3"
            />
            <img
              className="rounded-md w-full h-[200px] object-cover border-2 border-gray-200"
              src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t4.jpg"
              alt="Reference example 4"
            />
          </div>
          {/* 5th image left-aligned below */}
          <div className="flex justify-start">
            <div className="w-[49%]">
              <img
                className="rounded-md w-full h-[200px] object-cover border-2 border-gray-200"
                src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t5.jpg"
                alt="Reference example 5"
              />
            </div>
          </div>
        </div>
      </div>
    ),
    type: "multiimageinput",
    multiple: true, // single page that accepts multiple images
  },
];
