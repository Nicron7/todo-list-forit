import { CirclePlus, CircleX } from "lucide-react";
import PrimaryButton from "../buttons/PrimaryButton";
import { motion } from "motion/react";

export default function CreateTaskModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card-background
     p-6 rounded-lg shadow-md z-200 w-130 max-w-[95%]"
      >
        <CircleX
          size={25}
          onClick={closeModal}
          className="absolute top-5 right-5 cursor-pointer hover:text-medium-red transition-all duration-300"
        />
        <h2 className="text-3xl font-bold mb-1">Crea una nueva tarea</h2>

        <form className="flex flex-col gap-5 group">
          <div
            className="w-1/5 h-1 bg-light-blue rounded-full group-focus-within:w-1/4 
          transition-all duration-500"
          ></div>
          <input
            type="text"
            placeholder="Título"
            className="border border-light-gray rounded-lg py-2 px-4 w-full focus:outline-none
            focus:ring-1 focus:ring-light-blue focus:border-light-blue transition-all duration-300"
          />
          <textarea
            placeholder="Descripción"
            className="border border-light-gray rounded-lg py-2 px-4 w-full h-40 resize-none focus:outline-none
            focus:ring-1 focus:ring-light-blue focus:border-light-blue transition-all duration-300"
          />
          <PrimaryButton
            type="submit"
            text="Añadir"
            icon={<CirclePlus size={17} />}
          />
        </form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={closeModal}
        className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm z-199"
      ></motion.div>
    </>
  );
}
