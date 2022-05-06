import { InputHTMLAttributes } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import styles from "./styles.module.scss";

export function InputSearch({
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.container}>
      <input {...rest} type="text" />
      <AiOutlineSearch size={24} />
    </div>
  );
}
