import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  isLoading?: boolean;
}

export function Button({ children, isLoading, ...rest }: ButtonProps) {
  return (
    <button className={styles.container} {...rest}>
      {isLoading ? <div className={styles.spinner} /> : children}
    </button>
  );
}
