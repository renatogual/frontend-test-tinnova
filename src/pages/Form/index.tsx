import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { UserProps } from "../../types";
import { cpfMask, phoneMask } from "../../utils/inputMaks";

import styles from "./styles.module.scss";

const validations = {
  name: {
    required: "Campo obrigatório",
    minLength: {
      value: 3,
      message: "Campo deve ter 3 caracteres ou mais",
    },
  },
  email: {
    required: "Campo obrigatório",
    minLength: {
      value: 3,
      message: "Campo deve ter 3 caracteres ou mais",
    },
  },
  cpf: {
    required: "Campo obrigatório",
    maxLength: {
      value: 14, // Quantidade de caracteres contando os caracteres de máscara do input
      message: "Campo deve conter no máximo 11 números",
    },
    minLength: {
      value: 14, // Quantidade de caracteres contando os caracteres de máscara do input
      message: "Campo deve conter no mínimo 11 números",
    },
  },
  phone: {
    required: "Campo obrigatório",
    maxLength: {
      value: 15, // Quantidade de caracteres contando os caracteres de máscara do input
      message: "Campo deve conter no máximo 11 números",
    },
    minLength: {
      value: 15, // Quantidade de caracteres contando os caracteres de máscara do input
      message: "Campo deve conter no mínimo 11 números",
    },
  },
};

const storageKey = "@users";

export function Form() {
  const navigate = useNavigate();
  const { cpf } = useParams();

  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserProps>();

  const cpfWatch = watch("cpf");
  const phoneWatch = watch("phone");

  function onSubmit(data: UserProps) {
    setLoading(true);

    setTimeout(() => {
      const newUsers = [...users];

      if (cpf) {
        const index = newUsers.findIndex(
          (user) => String(user.cpf) === String(cpf)
        );
        newUsers[index] = data;
      } else {
        newUsers.push(data);
      }

      localStorage.setItem(storageKey, JSON.stringify(newUsers));
      setLoading(false);
      navigate("/");
    }, 2000);
  }

  useEffect(() => {
    if (cpf) {
      const userFound = users.find((user) => String(user.cpf) === String(cpf));

      if (userFound) {
        setValue("name", userFound.name);
        setValue("cpf", userFound.cpf);
        setValue("email", userFound.email);
        setValue("phone", userFound.phone);
      }
    }
  }, [users, cpf, setValue]);

  useEffect(() => {
    const storageData = localStorage.getItem(storageKey) || "";
    const parsedData = storageData ? JSON.parse(storageData) : [];

    setUsers(parsedData);
  }, []);

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.content}>
        <h1>Formulário</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome completo (sem abreviações)"
            placeholder="Nome completo (sem abreviações)"
            error={errors.name}
            {...register("name", validations.name)}
          />
          <Input
            label="E-mail"
            placeholder="E-mail"
            type="email"
            error={errors.email}
            {...register("email", validations.email)}
          />
          <Input
            label="CPF"
            placeholder="CPF"
            error={errors.cpf}
            maxLength={14}
            value={cpfMask(cpfWatch || "")}
            {...register("cpf", validations.cpf)}
          />
          <Input
            label="Telefone"
            placeholder="Telefone"
            type="tel"
            error={errors.phone}
            maxLength={15}
            value={phoneMask(phoneWatch || "")}
            {...register("phone", validations.phone)}
          />

          <div className={styles.buttons}>
            <BackButton />
            <Button type="submit" isLoading={loading}>
              {cpf ? "Editar" : "Cadastrar"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
