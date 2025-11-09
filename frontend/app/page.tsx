"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import TaskCard from "@/components/cards/TaskCard";
import CreateTaskModal from "@/components/modals/CreateTaskModal";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <main className="w-[95%] flex flex-col items-center py-15 max-w-[1400px]">
        <h1 className="text-4xl font-bold mb-3">Lista de Tareas</h1>
        <div className="mb-5">
          <PrimaryButton
            action={handleModalOpen}
            text="Crear Tarea"
            icon={<CirclePlus size={20} />}
          />
        </div>
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
      <AnimatePresence>
        {isModalOpen && <CreateTaskModal closeModal={handleModalOpen} />}
      </AnimatePresence>
    </div>
  );
}
