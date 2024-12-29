"use client";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, m as motion } from "framer-motion";
import { X, Phone, Mail, MapPin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { infos } from "@/constants";

interface Props {
  links: { href: string; title: string }[];
  onClose: () => void;
}
const socials = [
  { Icon: Facebook, label: "Facebook", href: "www.facebook.com" },
];

const contactInfo = {
  phone: infos.phone,
  email: infos.email,
  address: infos.address,
};
export default function Component({ links, onClose = () => {} }: Props) {
  return (
    <motion.div
      // initial={{ opacity: 0, height: 0 }}
      // animate={{ opacity: 1, height: "100vh" }}
      // exit={{ opacity: 0 }}
      // transition={{ duration: 0.2 }}
      className="fixed inset-0  h-[100vh] pb-10 overflow-y-scroll z-50 flex flex-col backdrop-blur-3xl     text-white"
    >
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-2 backdrop-blur-sm">
        <h1 className="flex items-center gap-2 font-bold text-xl">Pages</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-primary hover:text-white"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close menu</span>
        </Button>
      </header>

      <nav className="flex flex-grow     px-6 py-4">
        <ul className="space-y-2  w-full">
          <AnimatePresence>
            {links.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  className=" flex w-full py-4  items-center justify-between rounded-lg md:py-1 px-4  font-semibold transition-colors hover:bg-white/5"
                  onClick={onClose}
                  href={item.href}
                >
                  {item.title}
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </nav>

      <div className="border-t border-white/10  p-6 backdrop-blur-sm">
        <Link href={"/#contact"}>
          <Button className="mb-8 h-14 w-full bg-gradient-to-r  bg-primary/90 hover:bg-primary text-lg font-semibold shadow-lg transition-all   ">
            Contact Us
          </Button>
        </Link>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Contact Info</h2>
          <div className="space-y-4">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5 hover:text-primary"
            >
              <Phone className="h-5 w-5" />
              <span>{contactInfo.phone}</span>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5 hover:text-primary"
            >
              <Mail className="h-5 w-5" />
              <span>{contactInfo.email}</span>
            </a>
            <div className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-white/5">
              <MapPin className="h-5 w-5 flex-shrink-0" />
              <span>{contactInfo.address}</span>
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div>
            <h2 className="mb-4 text-xl font-semibold">Social Links</h2>
            <div className="flex gap-4">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={`mobile_menu_nav_link_${href}`}
                  href={href}
                  target="_blank"
                >
                  <Button
                    key={label}
                    variant="ghost"
                    size="icon"
                    className="rounded-md      "
                    asChild
                  >
                    {<Icon href={href} className="" />}
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
