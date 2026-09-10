import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Link, usePage } from '@inertiajs/react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

export const Navbar = ({ children, className, forceVisible = false }) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(forceVisible);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (forceVisible) {
      setVisible(true);
      return;
    }
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      className={cn("fixed inset-x-0 top-4 z-50 w-full transition-all duration-300", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "60%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: visible ? "800px" : "auto",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent transition-colors duration-200",
        visible && "bg-white/90 dark:bg-surface-base/90",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { visible }) : child
      )}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, visible }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-end space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={`link-${idx}`}
          className="relative group"
          onMouseEnter={() => setHovered(idx)}
        >
          <a
            onClick={onItemClick}
            className={cn(
              "relative px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange rounded-full transition-colors flex items-center gap-1",
              visible 
                ? "text-neutral-600 dark:text-text-secondary hover:text-accent-orange dark:hover:text-accent-orange" 
                : "text-white/90 hover:text-white"
            )}
            href={item.link}
          >
            {hovered === idx && visible && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-surface-muted"
              />
            )}
            <span className="relative z-20">{item.name}</span>
            {item.subItems && (
              <svg className="w-4 h-4 relative z-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </a>
          
          {item.subItems && (
            <div className="absolute left-0 top-full hidden group-hover:block pt-6 w-max -mt-2">
              <div className="flex flex-col bg-white dark:bg-surface-muted shadow-lg rounded-xl overflow-hidden min-w-[200px] border border-neutral-100 dark:border-surface-muted/50">
                {item.subItems.map((sub, sIdx) => (
                  <Link
                    key={`sub-${idx}-${sIdx}`}
                    href={sub.link}
                    className="px-4 py-3 text-sm text-neutral-600 dark:text-text-secondary hover:bg-gray-50 dark:hover:bg-surface-base hover:text-accent-orange dark:hover:text-accent-orange transition-colors relative z-10"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden transition-colors duration-200",
        visible && "bg-white/90 dark:bg-surface-base/90",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { visible }) : child
      )}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className, visible }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between px-4 py-2",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { visible }) : child
      )}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-surface-base border border-transparent dark:border-surface-muted transition-colors duration-200",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick, visible }) => {
  const colorClass = visible ? "text-black dark:text-white" : "text-white";
  return isOpen ? (
    <IconX className={colorClass} onClick={onClick} />
  ) : (
    <IconMenu2 className={colorClass} onClick={onClick} />
  );
};

export const NavbarLogo = ({ visible }) => {
  const { web_setting } = usePage().props;

  return (
    <a
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
    >
      <img
        src={web_setting?.logo_url || "/assets/icon_bm.webp"}
        alt="logo"
        className="w-8 h-auto"
      />
      <span className={cn(
        "font-bold text-xl",
        visible ? "text-black dark:text-text-primary" : "text-white"
      )}>
        {web_setting?.site_name || "Blue Murder"}
      </span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
