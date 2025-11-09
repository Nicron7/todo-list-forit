"use client";

import {
  Calendar,
  CircleCheck,
  CircleDashed,
  EllipsisVertical,
  Trash2,
  SquarePen,
} from "lucide-react";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface TaskCardProps {
  date: string;
  title: string;
  description: string;
  id: number;
  completed: boolean;
  deleteTask: (id: number) => void;
}

export default function TaskCard({
  date,
  title,
  description,
  id,
  completed,
  deleteTask,
}: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleCompleted = () => {
    setIsCompleted(!isCompleted);
  };
  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleDeleteTask = () => {
    deleteTask(id);
    setDropdownOpen(false);
  };
  const baseStyles =
    "flex items-center gap-2 py-2 px-4 w-full transition-all duration-300";
  const notClickedStyles = `bg-neutral-300 text-neutral-500 cursor-pointer transform -translate-y-px ${
    isCompleted
      ? "shadow-[2px_1px_2px_rgba(0,0,0,0.2)]"
      : "shadow-[-2px_1px_2px_rgba(0,0,0,0.2)]"
  }`;
  return (
    <div className="relative bg-card-background max-w-120 p-6 rounded-lg shadow-md overflow-hidden">
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="w-33 absolute top-12 text-sm right-4 z-30 items-start flex flex-col bg-neutral-300 rounded-lg py-1"
          >
            <ul className="w-full">
              <li>
                <button className="py-1 pl-3 w-full rounded-lg mx-auto max-w-31 flex items-center gap-1 hover:bg-light-blue/50 transition-colors">
                  <SquarePen size={14} />
                  Editar
                </button>
              </li>
              <li>
                <button
                  onClick={handleDeleteTask}
                  className="py-1 pl-3 flex mx-auto rounded-lg items-center gap-1 w-full max-w-31 hover:bg-medium-red/20 transition-colors"
                >
                  <Trash2 size={15} />
                  Eliminar
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <EllipsisVertical
        onClick={handleDropdownOpen}
        width={20}
        className="absolute top-5 right-4 text-dark-blue cursor-pointer z-30"
      />
      <div className="relative z-20 w-full">
        <div className="px-2 py-1 mb-3 font-medium flex items-center gap-1 rounded-lg bg-medium-blue/40 w-fit">
          <Calendar
            className="text-foreground"
            size={16}
          />
          <h2 className="text-sm">{date}</h2>
        </div>

        <h3 className="text-xl font-medium mb-2 line-clamp-2">{title}</h3>
        <p className="mb-4 line-clamp-4 text-dark-gray">{description}</p>
        <div className="flex items-center text-sm w-full font-medium">
          <span
            onClick={handleCompleted}
            className={`${
              isCompleted
                ? notClickedStyles
                : "bg-medium-blue/40 text-dark-blue pointer-events-none"
            } ${baseStyles} rounded-l-full`}
          >
            <CircleDashed size={15} />
            Pendiente
          </span>
          <span
            onClick={handleCompleted}
            className={`${
              isCompleted
                ? "bg-dark-blue text-background pointer-events-none"
                : notClickedStyles
            } ${baseStyles} rounded-r-full`}
          >
            <CircleCheck size={16} />
            Completada
          </span>
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 w-220 h-220 bg-light-blue/20 z-2 transition-all duration-800  rounded-full transform ${
          !isCompleted
            ? "translate-y-65 -translate-x-100"
            : "-translate-y-18 -translate-x-50"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-220 h-220 bg-light-blue/20 z-2 transition-all delay-100 duration-800  rounded-full transform ${
          !isCompleted
            ? "translate-y-65 -translate-x-100"
            : "-translate-y-18 -translate-x-50"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 w-220 h-220 bg-light-blue/20 z-2 transition-all delay-200 duration-800  rounded-full transform ${
          !isCompleted
            ? "translate-y-65 -translate-x-100"
            : "-translate-y-18 -translate-x-50"
        }`}
      ></div>
    </div>
  );
}
