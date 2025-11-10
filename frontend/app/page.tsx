"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import TaskCard from "@/components/cards/TaskCard";
import CreateTaskModal from "@/components/modals/CreateTaskModal";
import { CirclePlus, PackageOpen, LoaderCircle, Search } from "lucide-react";
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
    searchTasks,
  } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      return;
    }
    searchTasks(searchQuery);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === "") {
      searchTasks("");
    }
  };
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <main className="w-[95%] flex flex-col items-center py-15 max-w-[1400px]">
        <h1 className="text-4xl font-bold mb-3">Lista de Tareas</h1>
        <div className="flex items-center justify-center gap-5 mb-5 w-full">
          <PrimaryButton
            action={handleModalOpen}
            text="Crear Tarea"
            icon={<CirclePlus size={20} />}
          />
          <div
            className="relative focus-within:ring-1 focus-within:ring-light-blue py-2 px-4 pr-10
           rounded-lg border border-light-gray focus-within:border-light-blue transition-all duration-300"
          >
            <input
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              type="text"
              className="focus:outline-none w-full"
              placeholder="Buscar tarea"
            />
            <div
              onClick={handleSearch}
              className="hover:text-medium-blue transition-all duration-300 flex items-center justify-center px-3 h-10.5 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-dark-gray "
            >
              <Search size={20} />
            </div>
          </div>
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
