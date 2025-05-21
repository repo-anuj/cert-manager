import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconCheck, IconAlertTriangle, IconInfoCircle } from "@tabler/icons-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type: ToastType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-green-500",
          icon: <IconCheck className="h-5 w-5 text-white" />,
        };
      case "error":
        return {
          bgColor: "bg-red-500",
          icon: <IconAlertTriangle className="h-5 w-5 text-white" />,
        };
      case "warning":
        return {
          bgColor: "bg-yellow-500",
          icon: <IconAlertTriangle className="h-5 w-5 text-white" />,
        };
      case "info":
        return {
          bgColor: "bg-blue-500",
          icon: <IconInfoCircle className="h-5 w-5 text-white" />,
        };
      default:
        return {
          bgColor: "bg-gray-700",
          icon: <IconInfoCircle className="h-5 w-5 text-white" />,
        };
    }
  };

  const { bgColor, icon } = getToastStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 right-4 z-50 flex items-center max-w-md"
        >
          <div
            className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3`}
          >
            <div className="flex-shrink-0">{icon}</div>
            <p className="flex-1">{message}</p>
            <button
              onClick={onClose}
              className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <IconX className="h-4 w-4 text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
