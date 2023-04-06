import { InputHTMLAttributes, ForwardedRef, ReactNode } from "react";
import { forwardRef } from "react";
import { classed } from "@tw-classed/react";

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "children"> {
  label?: string;
  success?: string;
  error?: string;
  description?: ReactNode;
  icon?: ReactNode;
}

const InputMessage = classed.p("text-gray-300", {
  variants: {
    error: {
      true: "text-red-500",
    },
    success: {
      true: "text-green-500",
    },
  },
  defaultVariants: {
    error: false,
    success: false,
  },
});

export const Input = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      size = "medium",
      value,
      className,
      error,
      success,
      description,
      label,
      icon,
      required,
      ...inputProps
    } = props;
    const hidden = inputProps.type === "password" || inputProps.hidden;

    return (
      <div className="relative space-y-2">
        <label
          className="pl-1 font-medium text-brand-pale-blue"
          htmlFor={label}
        >
          {label}
        </label>
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...inputProps}
          required={required}
          id={label}
          value={value}
          ref={ref}
          hidden={hidden}
          className={
            "block w-full box-border rounded-lg transition-all flex-1 p-1.5 ring-1 ring-transparent focus:ring-brand-blue bg-brand-blue-gray focus:outline-none"
          }
        />
        <InputMessage error={!!error} success={!!success}>
          {error || success || description}
        </InputMessage>
      </div>
    );
  }
);

Input.displayName = "Input";
