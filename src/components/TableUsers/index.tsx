import { UserProps } from "../../types";

import styles from "./styles.module.scss";

interface Props {
  items: UserProps[];
}

export function TableUsers({ items }: Props) {
  return (
    <table className={styles.tableContent}>
      <thead>
        <tr>
          <th className={styles.infos}>Nome</th>
          <th className={styles.infos}>CPF</th>
          <th className={styles.infos}>Telefone</th>
          <th className={styles.infos}>E-mail</th>
        </tr>
      </thead>
      <tbody>
        {!!items.length ? (
          items?.map(({ name, cpf, phone, email }) => (
            <tr key={cpf} data-testid="row-character">
              <td>{name}</td>
              <td>{cpf}</td>
              <td>{phone}</td>
              <td>{email}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>Não foram encontrados dados !</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
