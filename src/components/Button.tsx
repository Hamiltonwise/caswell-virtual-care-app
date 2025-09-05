import { ReactNode } from "react";

type ButtonProps = {
  label: string;
  style: "primary" | "accent";
  isLoading?: boolean;
  href?: string;
  icon?: JSX.Element;
  iconPosition?: "start" | "end";
  disabled?: boolean;
  stretch?: boolean;
  onClick?: () => void;
};

const styles = {
  primary:
    "duration-800 transition-all text-white bg-primary border-primary shadow-lg shadow-primary/50 hover:shadow-sm hover:translate-y-[5px]",
  accent:
    "duration-800 transition-all text-white border-accent bg-accent shadow-lg shadow-primary/50 hover:shadow-sm hover:translate-y-[5px]",
};

export default function Button({
  label,
  style,
  isLoading,
  href,
  icon,
  iconPosition = "start",
  disabled = false,
  stretch = false,
  onClick,
}: ButtonProps) {
  return (
    <LinkWrapper href={href}>
      <button
        disabled={isLoading || disabled}
        onClick={onClick}
        className={`${isLoading ? "animate-pulse" : ""} ${
          disabled ? "opacity-50" : ""
        } ${
          stretch && "self-stretch"
        } px-11 py-3 border-2 text-base rounded-lg max-md:px-5 max-md:py-3 max-md:text-base flex gap-2 items-center ${
          styles[style]
        }`}
      >
        {isLoading && (
          <div className="h-3 w-3 border-2 border-b-0 border-l-0 bg-transparent border-white rounded-full animate-spin-fast"></div>
        )}
        {iconPosition === "start" && icon && icon}
        {label}
        {iconPosition === "end" && icon && icon}
      </button>
    </LinkWrapper>
  );
}

function LinkWrapper({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) {
  return href ? <a href={href}>{children}</a> : children;
}
