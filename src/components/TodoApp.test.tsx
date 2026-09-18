import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TodoApp } from "@/components/TodoApp";

describe("TodoApp", () => {
  it("adds, completes, filters, and deletes todos", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByLabelText("New task");
    await user.type(input, "Write tests");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("1 active of 1 task")).toBeInTheDocument();

    await user.click(
      screen.getByRole("checkbox", { name: /Mark "Write tests" as completed/i }),
    );
    expect(screen.getByText("0 active of 1 task")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Active" }));
    expect(screen.getByText("No tasks to show.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Completed" }));
    expect(screen.getByText("Write tests")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "All" }));
    await user.click(
      screen.getByRole("button", { name: /Delete "Write tests"/i }),
    );
    expect(screen.getByText("No tasks yet")).toBeInTheDocument();
  });

  it("does not add empty todos", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByText("No tasks yet")).toBeInTheDocument();
    expect(screen.getByText("No tasks to show.")).toBeInTheDocument();
  });
});
