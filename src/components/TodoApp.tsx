"use client";

import { useState } from "react";
import {
  countActive,
  createTodo,
  deleteTodo,
  filterTodos,
  toggleTodo,
} from "@/lib/todos";
import type { Filter, Todo } from "@/lib/types";
import { TodoCounter } from "./TodoCounter";
import { TodoFilter } from "./TodoFilter";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  function handleAdd(text: string) {
    setTodos((current) => [...current, createTodo(text)]);
  }

  function handleToggle(id: string) {
    setTodos((current) => toggleTodo(current, id));
  }

  function handleDelete(id: string) {
    setTodos((current) => deleteTodo(current, id));
  }

  const visibleTodos = filterTodos(todos, filter);
  const activeCount = countActive(todos);

  return (
    <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <header className="mb-5 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Taskflow
        </h1>
        <p className="text-sm text-slate-500">
          Add, complete, and filter your tasks.
        </p>
      </header>

      <div className="space-y-4">
        <TodoForm onAdd={handleAdd} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TodoCounter active={activeCount} total={todos.length} />
          <TodoFilter current={filter} onChange={setFilter} />
        </div>

        <TodoList
          todos={visibleTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
