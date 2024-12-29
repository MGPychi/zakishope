"use client";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { m as motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
interface Props {
  links: {
    title: string;
    href: string;
  }[];
}
const DesktopNav = ({ links }: Props) => {
  const [currentHovered, setCurrentHovered] = useState<string | null>(null);

  return (
    <nav className="hidden    lg:flex font-bold   text-lg sm:-ml-10 items-center space-x-8">
      {links.map((item, index) => (
        <DesktopItemLink
          setHovered={setCurrentHovered}
          currentHovered={currentHovered}
          key={index}
          href={item.href}
          title={item.title}
        />
      ))}
    </nav>
  );
};
export const DesktopItemLink = ({
  href,
  title,
  setHovered,
  currentHovered,
}: {
  href: string;
  title: string;
  currentHovered: string | null;
  setHovered: (title: string | null) => void;
}) => {
  const isActive = href === usePathname();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative "
      onMouseOver={() => {
        setIsHovered(true);
        setHovered(title);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setHovered(null);
      }}
    >
      <Link
        href={href}
        className={` ${currentHovered && currentHovered != title && "blur-sm"}    py-2.5  rounded-sm     font-medium  hover:text-blur   text-gray-200    transition-all duration-300`}
      >
        {title}
      </Link>
      <AnimatePresence>
        {((isActive && currentHovered == null) || isHovered) && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute -bottom-1 left-0 w-full h-px bg-primary  "
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesktopNav;
