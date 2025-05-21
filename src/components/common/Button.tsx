import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";
import LoadingSpinner from "./LoadingSpinner";

// Omit the onDrag property from HTMLMotionProps to avoid type conflicts
type ButtonMotionProps = Omit<HTMLMotionProps<"button">, "onClick">;

export interface ButtonProps extends ButtonMotionProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href?: string;
  fullWidth?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  href,
  fullWidth = false,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) => {
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-blue-600",
    secondary: "bg-green-500 text-white hover:bg-green-600",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary/10",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizeStyles = {
    sm: "text-xs px-2 py-1 rounded",
    md: "text-sm px-4 py-2 rounded-lg",
    lg: "text-base px-6 py-3 rounded-lg",
  };

  const baseStyles = cn(
    "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 flex items-center justify-center font-heading",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    (isLoading || disabled) ? "opacity-70 cursor-not-allowed" : "",
    className
  );

  const content = (
    <>
      {isLoading && (
        <LoadingSpinner
          size="small"
          color={variant === "outline" || variant === "ghost" ? "primary" : "white"}
          className="mr-2"
        />
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <Link to={href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      className={baseStyles}
      onClick={onClick}
      type={type}
      disabled={isLoading || disabled}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;