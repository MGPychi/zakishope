import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import AddNewQandAForm from "@/app/admin/dashboard/q-and-a/_components/AddNewQandAForm";

const CreateQandAModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <Button onClick={openModal} className="rounded-sm hidden lg:block">
        <PlusIcon />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl outline-none ring-none">
          <DialogHeader>
            <DialogTitle>Create a new Q&A entry</DialogTitle>
            <AddNewQandAForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateQandAModal;
