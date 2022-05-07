import { ButtonHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  navigateTo?: string;
}

export function BackButton({ navigateTo = "/", ...rest }: ButtonProps) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(navigateTo);
  }

  return (
    <button
      onClick={handleNavigate}
      className={styles.container}
      {...rest}
      type="button"
    >
      <BsArrowLeft />
      Voltar
    </button>
  );
}
