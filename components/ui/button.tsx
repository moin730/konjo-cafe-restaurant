import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-semibold tracking-tight transition-[background-color,color,box-shadow,transform] duration-300 ease-out disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_10px_30px_-14px_rgba(238,157,56,.9)] hover:bg-primary-hover",
        cream: "bg-cream text-espresso hover:bg-white",
        outline:
          "border border-current/30 bg-transparent hover:border-current/70 hover:bg-current/5",
        ghost: "bg-transparent hover:bg-current/10",
        dark: "bg-espresso text-cream hover:bg-espresso-3",
        link: "rounded-none px-0 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
