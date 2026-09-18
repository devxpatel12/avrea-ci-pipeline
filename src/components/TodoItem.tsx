"use client";

import type { Todo } from "@/lib/types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 border-b border-slate-200 px-1 py-3 last:border-b-0">
      <input
        id={`todo-${todo.id}`}
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
        aria-label={`Mark "${todo.text}" as ${todo.completed ? "active" : "completed"}`}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`min-w-0 flex-1 text-sm ${
          todo.completed ? "text-slate-400 line-through" : "text-slate-800"
        }`}
      >
        {todo.text}
      </label>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="rounded-md px-2 py-1 text-xs font-medium text-rose-600 transition hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
        aria-label={`Delete "${todo.text}"`}
      >
        Delete
      </button>
    </li>
  );
}
