import logo from "../../assets/logo_dark.png";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.container}>
      <img src={logo} alt="logo" />
      <div>
        <span>Renato Gualberto</span>
        Teste de Frontend
      </div>
    </header>
  );
}
