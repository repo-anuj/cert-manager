import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-neutral-900 shadow-lg rounded-lg p-6 text-white ${className}`}
  >
    {children}
  </motion.div>
);

export default Card;