"use client";
import { AnimatePresence, m as motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface Props {
  links: {
    title: string;
    href: string;
  }[];
}

const MobileNav = ({ links }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Resets to default
    }

    // Clean up to remove overflow style when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div>
      <Button
        variant="ghost"
        className="p-2 hover:primary group rounded-md"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu className="!w-5 text-white group-hover:text-primary !h-5" />
      </Button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed bg-primary   h-screen inset-0 z-50"
            // style={{ overflowY: "scroll" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <MobileMenu onClose={() => setIsMenuOpen(false)} links={links} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
