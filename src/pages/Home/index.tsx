import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";
import { InputSearch } from "../../components/InputSearch";
import { TableUsers } from "../../components/TableUsers";

import { UserProps } from "../../types";

import styles from "./styles.module.scss";

export function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);
  const [search, setSearch] = useState("");

  function handleNewUser() {
    navigate("/form");
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    (async function getData() {
      const response = await fetch(
        "https://private-9d65b3-tinnova.apiary-mock.com/users"
      );
      const data = await response.json();

      setUsers(data);
      setFilteredUsers(data);
    })();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    const newUsers = users.filter((user) => {
      if (search === "") return user;

      return (
        user.name.toLowerCase().includes(value) ||
        String(user.cpf).toLowerCase().includes(value) ||
        String(user.phone).toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
      );
    });

    setFilteredUsers(newUsers);
  }, [users, search]);

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.content}>
        <section className={styles.headerContent}>
          <h1>Dados cadastrados</h1>

          <div className={styles.actions}>
            <InputSearch
              value={search}
              onChange={handleSearch}
              placeholder="Buscar"
            />

            <button onClick={handleNewUser}>Cadastrar Usuário</button>
          </div>
        </section>

        <section>
          <TableUsers items={filteredUsers} />
        </section>
      </main>
    </div>
  );
}
