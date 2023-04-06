import { classed } from "@tw-classed/react";
import {
  ButtonHTMLAttributes,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from "react";
import { CgSpinnerTwo as SpinnerIcon } from "react-icons/cg";

export const BaseButton = classed.button(
  "rounded-full inline-flex w-full justify-center box-border px-4 py-2 cursor-pointer font-semibold items-center gap-2 disabled:bg-opacity-75  disabled:cursor-not-allowed bg-brand-blue transition ease-in-out duration-300 hover:bg-opacity-75 text-white disabled:hover:bg-brand-blue disabled:hover:bg-opacity-50"
);
export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
}

export const Button = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const { children, loading, icon, disabled, ...rest } = props;
    return (
      <BaseButton
        {...rest}
        aria-disabled={disabled || loading}
        disabled={disabled || loading}
        ref={ref}
      >
        {loading ? (
          <SpinnerIcon className="animate-spin motion-reduce:invisible " />
        ) : (
          icon
        )}
        <span> {children}</span>
      </BaseButton>
    );
  }
);

Button.displayName = "Button";
