import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";
import { FieldError } from "react-hook-form";

import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, ...rest },
  ref
) => {
  return (
    <div className={styles.container}>
      <input
        id={label}
        {...rest}
        ref={ref}
        className={!!error ? styles.error : ""}
      />
      <label htmlFor={label}>{label}</label>
      {!!error && <span>{error.message}</span>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
