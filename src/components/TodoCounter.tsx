type TodoCounterProps = {
  active: number;
  total: number;
};

export function TodoCounter({ active, total }: TodoCounterProps) {
  const label =
    total === 0
      ? "No tasks yet"
      : `${active} active of ${total} ${total === 1 ? "task" : "tasks"}`;

  return (
    <p className="text-sm text-slate-600" aria-live="polite">
      {label}
    </p>
  );
}
