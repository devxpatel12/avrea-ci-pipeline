import { TodoApp } from "@/components/TodoApp";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-sky-50 to-slate-100">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-10 sm:px-6">
        <TodoApp />
      </main>
    </div>
  );
}
