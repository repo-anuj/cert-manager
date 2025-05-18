import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset"; // Add type prop for HTML button
  disabled?: boolean; // Add disabled prop for form compatibility
}

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button", // Default to "button" if not specified
  disabled = false,
}: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-lg font-heading text-white transition-all duration-300";
  const variantStyles =
    variant === "primary" ? "bg-primary hover:bg-blue-600" : "bg-secondary hover:bg-green-600";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      type={type} // Pass type to the button element
      disabled={disabled} // Pass disabled to the button element
    >
      {children}
    </motion.button>
  );
};

export default Button;