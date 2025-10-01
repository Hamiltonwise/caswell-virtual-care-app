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

  // 4 & 5) Photos: single, optional step (no multi-step)
  {
    question: "Optional: Upload teeth photos to speed up your virtual consult",
    subtext:
      "Optional, but recommended — sharing photos now helps us maximize your consultation time. You can skip this and bring photos later.",
    htmlContent: (
      <div className="flex gap-2 flex-wrap">
        {/* example reference thumbnails, purely visual */}
        <img
          className="rounded-md w-[100%]"
          src="https://caswellorthodontics.com/wp-content/uploads/2025/03/t1.jpg"
          alt="Front teeth example"
        />
        {/* add more example images if you have them */}
      </div>
    ),
    type: "imageinput",
    multiple: true, // single page that accepts multiple images
  },
];
