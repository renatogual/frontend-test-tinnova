import { render, screen } from "@testing-library/react";

import { Header } from ".";

describe("Header Component", () => {
  it("should be able to render Header component", () => {
    render(<Header />);
    const nameTitle = screen.getByText("Renato Gualberto");
    const nameTest = screen.getByText("Teste de Frontend");
    expect(nameTitle).toBeInTheDocument();
    expect(nameTest).toBeInTheDocument();
  });
});
