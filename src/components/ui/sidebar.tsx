"use client";
import { cn } from "../../lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "fixed top-0 left-0 h-screen px-4 py-6 hidden md:flex md:flex-col bg-neutral-900 dark:bg-neutral-900 border-r border-neutral-800 z-10",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "70px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 h-16 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-900 dark:bg-neutral-900 w-full z-20 border-b border-neutral-800 shadow-lg"
        )}
        {...props}
      >
        <div className="flex justify-between z-20 w-full items-center">
          <div className="text-white font-bold text-lg flex items-center">
            <div className="h-6 w-7 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-primary mr-2" />
            CertManager
          </div>
          <button
            className="p-2 rounded-full hover:bg-neutral-800 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            <IconMenu2 className="text-neutral-200 h-6 w-6" />
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-neutral-900 pt-16 pb-8 px-6 z-[100] flex flex-col justify-between overflow-y-auto",
                className
              )}
            >
              <div
                className="absolute right-4 top-4 z-50 text-neutral-200 p-2 rounded-full hover:bg-neutral-800 transition-colors"
                onClick={() => setOpen(!open)}
                aria-label="Close menu"
              >
                <IconX className="h-6 w-6" />
              </div>

              {/* Mobile profile section at top */}
              <div className="flex items-center space-x-3 mb-8 mt-4 pb-4 border-b border-neutral-800">
                <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                  U
                </div>
                <div>
                  <p className="text-white font-medium">User</p>
                  <p className="text-xs text-gray-400">user@example.com</p>
                </div>
              </div>

              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Add padding to push content down on mobile */}
      <div className="h-16 md:hidden"></div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate } = useSidebar();
  return (
    <a
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-3 group/sidebar py-3 px-3 rounded-lg hover:bg-neutral-800 transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
        "md:text-sm text-base", // Larger text on mobile
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0">
        {link.icon}
      </div>

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-200 group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </a>
  );
};
