"use client";

import {
  Calendar,
  CircleCheck,
  CircleDashed,
  EllipsisVertical,
  Trash2,
  SquarePen,
  Save,
  CircleX,
  Fullscreen,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { taskSchema } from "@/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@/schemas/task.schema";
import { useForm } from "react-hook-form";
import PrimaryButton from "../buttons/PrimaryButton";

interface TaskCardProps {
  date: string;
  title: string;
  description: string;
  id: number;
  completed: boolean;
  deleteTask: (id: number) => void;
  updateTask: (id: number, title: string, description: string) => void;
  switchCompleteTask: (id: number, completed: boolean) => void;
}

export default function TaskCard({
  date,
  title,
  description,
  id,
  completed,
  deleteTask,
  updateTask,
  switchCompleteTask,
}: TaskCardProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: title, description: description },
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    if (modalOpen) {
      reset({
        title: title,
        description: description,
      });
    }
  }, [modalOpen, title, description, reset]);

  const handleCompleted = () => {
    switchCompleteTask(id, !completed);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
    setDropdownOpen(false);
  };

  const handleCancelEdit = () => {
    reset({
      title: title,
      description: description,
    });
    setModalOpen(false);
  };

  const onSubmit = async (data: Task) => {
    updateTask(id, data.title, data.description);
    setModalOpen(false);
  };

  const handleFullscreenOpen = () => {
    if (fullscreenOpen) {
      setIsAnimating(true);
      setFullscreenOpen(false);
    } else {
      setFullscreenOpen(true);
    }
    setDropdownOpen(false);
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
    completed
      ? "shadow-[2px_1px_2px_rgba(0,0,0,0.2)]"
      : "shadow-[-2px_1px_2px_rgba(0,0,0,0.2)]"
  }`;
  return (
    <>
      {!fullscreenOpen && (
        <motion.div
          layoutId={`card-${id}`}
          onLayoutAnimationComplete={() => setIsAnimating(false)}
          className={`${
            isAnimating ? "z-200" : ""
          } mx-auto relative h-full bg-card-background max-w-120 p-6 rounded-lg shadow-md overflow-hidden`}
        >
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                ref={dropdownRef}
                className="w-33 absolute shadow-lg top-12 text-sm right-4 z-30 items-start flex flex-col bg-neutral-300 rounded-lg py-1"
              >
                <ul className="w-full">
                  <li>
                    <button
                      onClick={handleFullscreenOpen}
                      className="py-1 pl-3 w-full rounded-md mx-auto max-w-31 flex items-center gap-1 hover:bg-light-blue/50 transition-colors"
                    >
                      <Fullscreen size={14} />
                      Ver
                    </button>
                    <button
                      onClick={handleModalOpen}
                      className="py-1 pl-3 w-full rounded-md mx-auto max-w-31 flex items-center gap-1 hover:bg-light-blue/50 transition-colors"
                    >
                      <SquarePen size={14} />
                      Editar
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleDeleteTask}
                      className="py-1 pl-3 flex mx-auto rounded-md items-center gap-1 w-full max-w-31 hover:bg-medium-red/20 transition-colors"
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
            ref={buttonRef}
            onClick={handleDropdownOpen}
            width={20}
            className="absolute top-5 right-4 text-dark-blue cursor-pointer z-30"
          />
          <div className="flex flex-col justify-between h-full relative z-20 w-full">
            <div>
              <div className="px-2 py-1 mb-3 font-medium flex items-center gap-1 rounded-lg bg-medium-blue/40 w-fit">
                <Calendar
                  className="text-foreground"
                  size={16}
                />
                <h2 className="text-sm">{date}</h2>
              </div>
              <h3 className="text-xl font-medium mb-2 line-clamp-2">{title}</h3>
              <p className="mb-4 line-clamp-3 text-dark-gray">{description}</p>
            </div>
            <div className="flex items-center text-sm w-full font-medium">
              <span
                onClick={handleCompleted}
                className={`${
                  completed
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
                  completed
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
              !completed
                ? "translate-y-75 -translate-x-100"
                : "-translate-y-18 -translate-x-50"
            }`}
          ></div>
          <div
            className={`absolute top-0 left-0 w-220 h-220 bg-light-blue/20 z-2 transition-all delay-100 duration-800  rounded-full transform ${
              !completed
                ? "translate-y-75 -translate-x-100"
                : "-translate-y-18 -translate-x-50"
            }`}
          ></div>
          <div
            className={`absolute top-0 left-0 w-220 h-220 bg-light-blue/20 z-2 transition-all delay-200 duration-800  rounded-full transform ${
              !completed
                ? "translate-y-75 -translate-x-100"
                : "-translate-y-18 -translate-x-50"
            }`}
          ></div>
        </motion.div>
      )}
      {fullscreenOpen && !modalOpen && (
        <>
          <motion.div
            layoutId={`card-${id}`}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-200 bg-card-background p-6 
          rounded-lg shadow-md w-240 max-w-[95%] overflow-hidden"
          >
            <Fullscreen
              onClick={handleFullscreenOpen}
              width={30}
              className="absolute top-5 right-4 text-dark-blue cursor-pointer z-30"
            />
            <div className="relative z-20 w-full">
              <div className="px-2 py-1 mb-3 font-medium flex items-center gap-1 rounded-lg bg-medium-blue/40 w-fit">
                <Calendar
                  className="text-foreground"
                  size={19}
                />
                <h2 className="text-base">{date}</h2>
              </div>

              <h3 className="text-2xl font-medium mb-2">{title}</h3>
              <p className="mb-4 text-lg text-dark-gray">{description}</p>
              <div className="flex items-center text-base w-full max-w-120 font-medium">
                <span
                  onClick={handleCompleted}
                  className={`${
                    completed
                      ? notClickedStyles
                      : "bg-medium-blue/40 text-dark-blue pointer-events-none"
                  } ${baseStyles} rounded-l-full`}
                >
                  <CircleDashed size={17} />
                  Pendiente
                </span>
                <span
                  onClick={handleCompleted}
                  className={`${
                    completed
                      ? "bg-dark-blue text-background pointer-events-none"
                      : notClickedStyles
                  } ${baseStyles} rounded-r-full`}
                >
                  <CircleCheck size={19} />
                  Completada
                </span>
              </div>
            </div>
            <div
              className={`absolute top-0 left-0 w-500 h-500 bg-light-blue/20 z-2 transition-all duration-800  rounded-full transform ${
                !completed
                  ? "translate-y-75 -translate-x-100"
                  : "-translate-y-50 -translate-x-140"
              }`}
            ></div>
            <div
              className={`absolute top-0 left-0 w-500 h-500 bg-light-blue/20 z-2 transition-all delay-100 duration-800  rounded-full transform ${
                !completed
                  ? "translate-y-75 -translate-x-100"
                  : "-translate-y-50 -translate-x-140"
              }`}
            ></div>
            <div
              className={`absolute top-0 left-0 w-500 h-500 bg-light-blue/20 z-2 transition-all delay-200 duration-800  rounded-full transform ${
                !completed
                  ? "translate-y-75 -translate-x-100"
                  : "-translate-y-50 -translate-x-140"
              }`}
            ></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleFullscreenOpen}
            className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm z-199"
          ></motion.div>
        </>
      )}
      {modalOpen && !fullscreenOpen && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-200 bg-card-background p-6 rounded-lg shadow-md w-120 max-w-[95%]"
          >
            <CircleX
              size={25}
              onClick={handleCancelEdit}
              className="absolute top-5 right-5 cursor-pointer hover:text-medium-red transition-all duration-300"
            />
            <h2 className="text-3xl font-bold mb-3">Editar Tarea</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <div>
                <label
                  className="text-dark-blue"
                  htmlFor="title"
                >
                  Título
                </label>
                <input
                  type="text"
                  placeholder="Título"
                  {...register("title")}
                  className="mt-1 border border-light-gray rounded-lg py-2 px-4 w-full focus:outline-none
              focus:ring-1 focus:ring-light-blue focus:border-light-blue transition-all duration-300"
                />
                {errors.title && (
                  <p className="text-medium-red mt-1 text-sm">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="text-dark-blue"
                  htmlFor="description"
                >
                  Descripción
                </label>
                <textarea
                  placeholder="Descripción"
                  {...register("description")}
                  className="mt-1 border border-light-gray rounded-lg py-2 px-4 w-full h-30 resize-none focus:outline-none
            focus:ring-1 focus:ring-light-blue focus:border-light-blue transition-all duration-300"
                />
                {errors.description && (
                  <p className="text-medium-red mt-1 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <PrimaryButton
                text="Guardar"
                type="submit"
                icon={<Save size={18} />}
              />
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCancelEdit}
            className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm z-199"
          ></motion.div>
        </>
      )}
    </>
  );
}
