import { ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";

export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const Card = ({ children, className, onClick }: CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-neutral-900 shadow-lg rounded-lg p-6 text-white ${className}`}
    onClick={onClick}
    style={onClick ? { cursor: 'pointer' } : undefined}
  >
    {children}
  </motion.div>
);

export default Card;