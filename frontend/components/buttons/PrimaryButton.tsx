interface PrimaryButtonProps {
  text: string;
  icon?: React.ReactNode;
  type?: "submit" | "reset" | "button";
  full?: boolean;
  action?: () => void;
}

export default function PrimaryButton({
  text,
  icon,
  type = "button",
  full = false,
  action,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={action}
      type={type}
      className={`${
        full ? "w-full" : "w-fit"
      } flex items-center gap-2 bg-light-blue/70 hover:bg-light-blue text-dark-blue
         transition-all duration-300 cursor-pointer py-2 px-4 rounded-lg font-medium`}
    >
      {icon}
      {text}
    </button>
  );
}
