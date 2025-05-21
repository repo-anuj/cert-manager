import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import Toast, { ToastType } from "../components/common/Toast";

interface ToastContextProps {
  showToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [toastType, setToastType] = useState<ToastType>("info");
  const [toastMessage, setToastMessage] = useState("");
  const [toastDuration, setToastDuration] = useState(3000);

  // Use useCallback to prevent unnecessary re-renders
  const showToast = useCallback((type: ToastType, message: string, duration = 3000) => {
    // If a toast is already visible, hide it first
    if (isVisible) {
      setIsVisible(false);
      setTimeout(() => {
        setToastType(type);
        setToastMessage(message);
        setToastDuration(duration);
        setIsVisible(true);
      }, 300);
    } else {
      setToastType(type);
      setToastMessage(message);
      setToastDuration(duration);
      setIsVisible(true);
    }
  }, [isVisible]);

  const hideToast = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        type={toastType}
        message={toastMessage}
        isVisible={isVisible}
        onClose={hideToast}
        duration={toastDuration}
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
