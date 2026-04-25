import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type DivProps = ComponentProps<"div">;

type HeadingProps = ComponentProps<"h2">;

type ParagraphProps = ComponentProps<"p">;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-neutral-200 bg-white/95 p-6 shadow-xl shadow-neutral-300/30 backdrop-blur",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return <div className={cn("space-y-1.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HeadingProps) {
  return (
    <h2
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ParagraphProps) {
  return <p className={cn("text-sm text-neutral-600", className)} {...props} />;
}

export function CardContent({ className, ...props }: DivProps) {
  return <div className={cn("mt-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: DivProps) {
  return <div className={cn("mt-6", className)} {...props} />;
}
