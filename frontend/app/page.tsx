import TaskCard from "@/components/cards/TaskCard";
import { CirclePlus } from "lucide-react";

const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <main className="w-[95%] flex flex-col items-center py-15 max-w-[1400px]">
        <h1 className="text-4xl font-bold mb-3">Lista de Tareas</h1>
        <button
          className="flex items-center gap-2 bg-light-blue/40 hover:bg-light-blue/70 text-dark-blue
         transition-all duration-300 cursor-pointer py-2 px-4 rounded-lg mb-5"
        >
          <CirclePlus size={16} />
          Crear tarea
        </button>
        <div className="w-full custom-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task}
              date="2023-01-01"
              title={`Tarea ${task}`}
              description={`Descripción de la tarea ${task} lorem ipsum dolor sit amet.`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
