import { render, screen, fireEvent } from "@testing-library/react";
import { UserProps } from "../../types";

import { TableUsers } from ".";

const mockItems: UserProps[] = [
  {
    name: "User 1",
    email: "user@email.com",
    cpf: "12345678910",
    phone: "41999999999",
  },
];

const onEditUser: jest.Mock = jest.fn();
const onRemoveUser: jest.Mock = jest.fn();

describe("TableUsers Component", () => {
  it("should be able to render all users", () => {
    render(
      <TableUsers
        items={mockItems}
        onEditUser={onEditUser}
        onRemoveUser={onRemoveUser}
      />
    );

    expect(screen.getByText("User 1")).toBeInTheDocument();
  });

  it("should be able to handle 'onEditUser' event", () => {
    render(
      <TableUsers
        items={mockItems}
        onEditUser={onEditUser}
        onRemoveUser={onRemoveUser}
      />
    );

    const editIcon = screen.getByTestId("edit-12345678910");

    fireEvent.click(editIcon);

    expect(onEditUser).toHaveBeenCalledWith(mockItems[0].cpf);
  });

  it("should be able to handle 'onRemoveUser' event", () => {
    render(
      <TableUsers
        items={mockItems}
        onEditUser={onEditUser}
        onRemoveUser={onRemoveUser}
      />
    );

    const trashIcon = screen.getByTestId("remove-12345678910");

    fireEvent.click(trashIcon);

    expect(onRemoveUser).toHaveBeenCalledWith(mockItems[0].cpf);
  });

  it("should renders alert message if items is empty", () => {
    const onEditUser = jest.fn();
    const onRemoveUser = jest.fn();

    render(
      <TableUsers
        items={[]}
        onEditUser={onEditUser}
        onRemoveUser={onRemoveUser}
      />
    );

    expect(
      screen.getByText("Não foram encontrados dados !")
    ).toBeInTheDocument();
  });
});
