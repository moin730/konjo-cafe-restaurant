import * as React from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full min-w-0 rounded-xl border border-espresso/15 bg-white/70 px-4 text-base text-espresso shadow-[inset_0_1px_0_rgba(255,255,255,.6)] transition-[border-color,box-shadow,background-color] outline-none placeholder:text-muted/70 hover:border-espresso/30 focus-visible:border-primary focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-secondary aria-invalid:ring-4 aria-invalid:ring-secondary/15 md:text-[0.95rem]";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldBase, "h-12", className)}
      {...props}
    />
  );
}

export { Input, fieldBase };
