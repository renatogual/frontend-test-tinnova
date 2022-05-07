import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  isLoading?: boolean;
}

export function Button({ children, isLoading, ...rest }: ButtonProps) {
  return (
    <button className={styles.container} {...rest} data-testid="button">
      {isLoading ? (
        <div className={styles.spinner} data-testid="spinner" />
      ) : (
        children
      )}
    </button>
  );
}
