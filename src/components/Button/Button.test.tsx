import { render, screen } from "@testing-library/react";

import { Button } from ".";

describe("Button Component", () => {
  it("should be able to render Button component", () => {
    render(<Button>Cadastrar</Button>);

    const button = screen.getByTestId("button");

    expect(button).toBeInTheDocument();
  });

  it("should be able to render Button component with loading", () => {
    render(
      <Button isLoading>
        <div data-testid="spinner" />
      </Button>
    );

    const button = screen.getByTestId("button");

    expect(button).toContainHTML(
      '<button class="container" data-testid="button"><div class="spinner" data-testid="spinner" /></button>'
    );
  });
});
