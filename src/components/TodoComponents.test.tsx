import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TodoCounter } from "@/components/TodoCounter";
import { TodoFilter } from "@/components/TodoFilter";
import { TodoItem } from "@/components/TodoItem";

describe("TodoCounter", () => {
  it("renders empty and populated states", () => {
    const { rerender } = render(<TodoCounter active={0} total={0} />);
    expect(screen.getByText("No tasks yet")).toBeInTheDocument();

    rerender(<TodoCounter active={2} total={5} />);
    expect(screen.getByText("2 active of 5 tasks")).toBeInTheDocument();
  });
});

describe("TodoFilter", () => {
  it("marks the current filter as pressed", () => {
    const onChange = vi.fn();
    render(<TodoFilter current="active" onChange={onChange} />);

    expect(screen.getByRole("button", { name: "Active" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});

describe("TodoItem", () => {
  it("renders todo text and actions", () => {
    render(
      <TodoItem
        todo={{ id: "1", text: "Ship it", completed: false }}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText("Ship it")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Delete "Ship it"/i }),
    ).toBeInTheDocument();
  });
});
