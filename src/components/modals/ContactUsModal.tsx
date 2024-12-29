"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ContactUsForm from "@/app/_components/Contact/ContactUsForm";
import { useState } from "react";
import { Button } from "../ui/button";

const ContactUsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <Button
        onClick={openModal}
        className="rounded-sm hidden lg:block hover:ring-2 hover:ring-primary"
      >
        Contact Us
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl    outline-none ring-none ">
          <DialogHeader>
            <DialogTitle> Contact Us </DialogTitle>
            <DialogDescription>
              Please provide your information to get a detailed review of your
              professional profile.
            </DialogDescription>
          </DialogHeader>
          <ContactUsForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactUsModal;
