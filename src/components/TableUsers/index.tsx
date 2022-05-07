import { FiEdit, FiTrash } from "react-icons/fi";

import { UserProps } from "../../types";
import { cpfMask, phoneMask } from "../../utils/inputMaks";

import styles from "./styles.module.scss";

interface Props {
  items: UserProps[];
  onEditUser: (cpf: string) => void;
  onRemoveUser: (cpf: string) => void;
}

export function TableUsers({ items, onEditUser, onRemoveUser }: Props) {
  return (
    <table className={styles.tableContent}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>CPF</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {!!items.length ? (
          items?.map(({ name, email, cpf, phone }) => (
            <tr key={cpf}>
              <td>{name}</td>
              <td>{email}</td>
              <td>{cpfMask(cpf)}</td>
              <td>{phoneMask(phone)}</td>
              <td>
                <div className={styles.actions}>
                  <button
                    onClick={() => onEditUser(cpf)}
                    data-testid={`edit-${cpf}`}
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => onRemoveUser(cpf)}
                    data-testid={`remove-${cpf}`}
                  >
                    <FiTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className={styles.without_data}>
              Não foram encontrados dados !
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
