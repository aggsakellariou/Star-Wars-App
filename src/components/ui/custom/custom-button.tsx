"use client";

import { Button } from "@/components/ui/button";
import React from "react";

type ButtonProps = React.ComponentProps<typeof Button>;

interface CustomButtonProps
  extends Omit<ButtonProps, "variant" | "children" | "size"> {
  variant:
    | "blue"
    | "purple"
    | "green"
    | "red"
    | "gray"
    | "teal"
    | "indigo"
    | "orange"
    | "emerald";
  children: React.ReactNode;
  size?: ButtonProps["size"];
}

const variantStyles = {
  blue: {
    className:
      "bg-blue-50 hover:bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 dark:border-blue-700",
    textColor: "text-blue-700 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400",
  },
  purple: {
    className:
      "bg-violet-50 hover:bg-violet-100 border-violet-300 dark:bg-violet-900/30 dark:hover:bg-violet-800/40 dark:border-violet-700",
    textColor: "text-violet-700 dark:text-violet-300 hover:text-violet-600 dark:hover:text-violet-400",
  },
  green: {
    className:
      "bg-green-50 hover:bg-green-100 border-green-300 dark:bg-green-900/30 dark:hover:bg-green-800/40 dark:border-green-700",
    textColor: "text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400",
  },
  red: {
    className:
      "bg-red-50 hover:bg-red-100 border-red-300 dark:bg-red-900/30 dark:hover:bg-red-800/40 dark:border-red-700",
    textColor: "text-red-700 dark:text-red-300 hover:text-red-600 dark:hover:text-red-400",
  },
  gray: {
    className:
      "bg-gray-50 hover:bg-gray-100 border-gray-300 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 dark:border-gray-700",
    textColor: "text-gray-700 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400",
  },
  teal: {
    className:
      "bg-teal-50 hover:bg-teal-100 border-teal-300 dark:bg-teal-900/30 dark:hover:bg-teal-800/40 dark:border-teal-700",
    textColor: "text-teal-700 dark:text-teal-300 hover:text-teal-600 dark:hover:text-teal-400",
  },
  indigo: {
    className:
      "bg-indigo-50 hover:bg-indigo-100 border-indigo-300 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 dark:border-indigo-700",
    textColor: "text-indigo-700 dark:text-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400",
  },
  orange: {
    className:
      "bg-orange-50 hover:bg-orange-100 border-orange-300 dark:bg-orange-900/30 dark:hover:bg-orange-800/40 dark:border-orange-700",
    textColor: "text-orange-700 dark:text-orange-300 hover:text-orange-600 dark:hover:text-orange-400",
  },
  emerald: {
    className:
      "bg-emerald-50 hover:bg-emerald-100 border-emerald-300 dark:bg-emerald-900/30 dark:hover:bg-emerald-800/40 dark:border-emerald-700",
    textColor: "text-emerald-700 dark:text-emerald-300 hover:text-emerald-600 dark:hover:text-emerald-400",
  },
};

export function CustomButton({
  variant,
  children,
  size = "default",
  className = "",
  ...rest
}: CustomButtonProps) {
  const styles = variantStyles[variant];

  return (
    <Button
      size={size}
      variant="outline"
      className={`${styles.className} ${className} hover:cursor-pointer`}
      {...rest}
    >
      <div className={`flex items-center ${styles.textColor}`}>{children}</div>
    </Button>
  );
}
