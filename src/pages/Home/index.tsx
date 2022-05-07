import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";
import { InputSearch } from "../../components/InputSearch";
import { TableUsers } from "../../components/TableUsers";

import { UserProps } from "../../types";

import styles from "./styles.module.scss";

const storageKey = "@users";

export function Home() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<UserProps[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);
  const [search, setSearch] = useState("");

  const getData = useCallback(async () => {
    const storageData = localStorage.getItem(storageKey);
    const parsedData = storageData ? JSON.parse(storageData) : [];

    const hasStorageData = parsedData.length > 0;

    if (!hasStorageData) {
      try {
        const response = await fetch(
          "https://private-9d65b3-tinnova.apiary-mock.com/users"
        );
        const data = await response.json();

        localStorage.setItem(storageKey, JSON.stringify(data));

        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setUsers(parsedData);
      setFilteredUsers(parsedData);
    }
  }, []);

  function handleNewUser() {
    navigate("/form");
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleEditUser(cpf: string) {
    navigate(`/form/${cpf}`);
  }

  function handleRemoveUser(cpf: string) {
    const newUsers = users.filter((user) => user.cpf !== cpf);

    localStorage.setItem(storageKey, JSON.stringify(newUsers));

    getData();
  }

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const value = search.toLowerCase();

    const newUsers = users.filter((user) => {
      if (search === "") return user;

      return (
        user.name.toLowerCase().includes(value) ||
        user.cpf.toLowerCase().includes(value) ||
        user.phone.toLowerCase().includes(value) ||
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
          <TableUsers
            items={filteredUsers}
            onEditUser={handleEditUser}
            onRemoveUser={handleRemoveUser}
          />
        </section>
      </main>
    </div>
  );
}
