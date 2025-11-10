"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import TaskCard from "@/components/cards/TaskCard";
import CreateTaskModal from "@/components/modals/CreateTaskModal";
import {
  CirclePlus,
  PackageOpen,
  LoaderCircle,
  SearchX,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatDate } from "@/utils/dateFormatter";
import useTasks from "@/hooks/useTasks";
import SearchBar from "@/components/inputs/SearchBar";
import CustomSelect from "@/components/inputs/CustomSelect";

export default function Home() {
  const {
    tasks,
    loading,
    createNote,
    deleteTask,
    updateTask,
    switchCompleteTask,
    searchTasks,
    pendingTasks,
    completedTasks,
  } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState("all");

  const options = [
    { label: "Todas", value: "all" },
    { label: "Pendientes", value: "pending" },
    { label: "Completadas", value: "complete" },
  ];

  const filteredTasks =
    selected === "all"
      ? tasks
      : selected === "pending"
      ? pendingTasks
      : completedTasks;

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      return;
    }
    setIsSearching(true);
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
      setIsSearching(false);
      searchTasks("");
    }
  };
  return (
    <div className="flex flex-col min-h-screen items-center">
      <header className="w-full h-20 bg-light-blue flex items-center justify-center">
        <div className="flex items-center max-w-[1400px] w-[95%]">
          <div
            className="h-14 w-14 flex items-center justify-center rounded-full border-4
           border-dark-blue"
          >
            <ClipboardList size={38} />
          </div>
        </div>
      </header>
      <main className="w-[95%] flex flex-col items-center py-15 max-w-[1400px]">
        <h1 className="text-4xl font-bold text-center">Lista de Tareas</h1>
        <p className="mb-5 text-dark-gray text-lg text-center">
          Crea y administra tus tareas de forma fácil y eficiente
        </p>
        <div className="flex sm:flex-row flex-col items-center justify-center gap-5 mb-10 w-full">
          <div className="w-full sm:w-50 flex justify-center sm:justify-end">
            <PrimaryButton
              action={handleModalOpen}
              text="Crear Tarea"
              icon={<CirclePlus size={20} />}
            />
          </div>
          <SearchBar
            searchQuery={searchQuery}
            handleInputChange={handleInputChange}
            handleKeyPress={handleKeyPress}
            handleSearch={handleSearch}
          />
          <CustomSelect
            options={options}
            value={selected}
            onChange={setSelected}
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
            className="w-full text-center p-4 h-50 flex flex-col items-center justify-center 
          rounded-lg"
          >
            {isSearching ? (
              <>
                <SearchX size={110} />
                <h2 className="text-2xl font-bold">No se encontraron tareas</h2>
                <p className="text-dark-gray">
                  Intenta con otra búsqueda o verifica la ortografía
                </p>
              </>
            ) : selected === "pending" ? (
              <>
                <PackageOpen size={110} />
                <h2 className="text-2xl font-bold">No hay tareas pendientes</h2>
              </>
            ) : selected === "complete" ? (
              <>
                <PackageOpen size={110} />
                <h2 className="text-2xl font-bold">
                  No hay tareas completadas
                </h2>
              </>
            ) : (
              <>
                <PackageOpen size={110} />
                <h2 className="text-2xl font-bold">
                  Aún no tienes tareas agregadas
                </h2>
                <p className="text-dark-gray">
                  Crea una nueva tarea para empezar
                </p>
              </>
            )}
          </motion.div>
        )}
        <motion.div className="w-full custom-grid">
          <AnimatePresence mode="popLayout">
            {!loading &&
              filteredTasks.map((task) => (
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
