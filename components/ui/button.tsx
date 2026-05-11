import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "secondary";
type ButtonSize = "default" | "lg" | "sm" | "icon";

const buttonVariants: Record<ButtonVariant, string> = {
  default:
    "bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40",
  outline:
    "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-200/40",
};

const buttonSizes: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2 text-sm font-medium",
  lg: "h-11 px-8 text-base font-medium",
  sm: "h-9 px-3 text-xs font-medium",
  icon: "h-10 w-10 flex items-center justify-center",
};

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    />
  );
}
