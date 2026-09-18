import { describe, expect, it } from "vitest";
import {
  countActive,
  countCompleted,
  createTodo,
  deleteTodo,
  filterTodos,
  toggleTodo,
} from "@/lib/todos";
import type { Todo } from "@/lib/types";

function makeTodo(partial: Partial<Todo> & Pick<Todo, "text">): Todo {
  return {
    id: partial.id ?? crypto.randomUUID(),
    text: partial.text,
    completed: partial.completed ?? false,
  };
}

describe("todos helpers", () => {
  it("createTodo trims text and starts incomplete", () => {
    const todo = createTodo("  Buy milk  ");
    expect(todo.text).toBe("Buy milk");
    expect(todo.completed).toBe(false);
    expect(todo.id).toBeTruthy();
  });

  it("toggleTodo flips completion for the matching id", () => {
    const todos = [
      makeTodo({ id: "1", text: "A" }),
      makeTodo({ id: "2", text: "B", completed: true }),
    ];

    expect(toggleTodo(todos, "1")[0].completed).toBe(true);
    expect(toggleTodo(todos, "2")[1].completed).toBe(false);
  });

  it("deleteTodo removes the matching todo", () => {
    const todos = [
      makeTodo({ id: "1", text: "A" }),
      makeTodo({ id: "2", text: "B" }),
    ];

    expect(deleteTodo(todos, "1")).toEqual([todos[1]]);
  });

  it("filterTodos returns the correct subset", () => {
    const todos = [
      makeTodo({ id: "1", text: "Active", completed: false }),
      makeTodo({ id: "2", text: "Done", completed: true }),
    ];

    expect(filterTodos(todos, "all")).toHaveLength(2);
    expect(filterTodos(todos, "active")).toEqual([todos[0]]);
    expect(filterTodos(todos, "completed")).toEqual([todos[1]]);
  });

  it("countActive and countCompleted tally correctly", () => {
    const todos = [
      makeTodo({ text: "A", completed: false }),
      makeTodo({ text: "B", completed: true }),
      makeTodo({ text: "C", completed: false }),
    ];

    expect(countActive(todos)).toBe(2);
    expect(countCompleted(todos)).toBe(1);
  });
});
