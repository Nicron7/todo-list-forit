"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import TaskCard from "@/components/cards/TaskCard";
import CreateTaskModal from "@/components/modals/CreateTaskModal";
import { CirclePlus, PackageOpen, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatDate } from "@/utils/dateFormatter";
import useTasks from "@/hooks/useTasks";

export default function Home() {
  const {
    tasks,
    loading,
    createNote,
    deleteTask,
    updateTask,
    switchCompleteTask,
  } = useTasks();
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

        {loading && (
          <div className="w-full flex flex-col items-center justify-center h-50">
            <LoaderCircle
              size={60}
              className="animate-spin text-light-blue"
            />
          </div>
        )}

        {tasks.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full text-center h-100 bg-light-blue/70 flex flex-col items-center justify-center 
          rounded-lg"
          >
            <PackageOpen size={110} />
            <h2 className="text-2xl font-bold">
              Aún no tienes tareas agregadas
            </h2>
            <p className="text-dark-gray">Crea una nueva tarea para comenzar</p>
          </motion.div>
        )}
        <motion.div className="w-full custom-grid">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                layout
                key={task.id}
              >
                <TaskCard
                  date={formatDate(task.created_at)}
                  title={task.title}
                  description={task.description}
                  id={task.id}
                  completed={task.completed}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  switchCompleteTask={switchCompleteTask}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
      <AnimatePresence>
        {isModalOpen && (
          <CreateTaskModal
            closeModal={handleModalOpen}
            createNote={createNote}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
