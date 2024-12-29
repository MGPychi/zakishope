"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import AddNewProductForm from "@/app/admin/dashboard/products/_components/AddNewProductForm";
import { getAllCategories } from "@/app/data/categories-data";

const CreateProductModal = ({
  categories,
}: {
  categories: Awaited<ReturnType<typeof getAllCategories>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <Button onClick={openModal} className="  rounded-sm hidden lg:block  ">
        <PlusIcon />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl  h-[95vh] overflow-y-scroll     outline-none ring-none ">
          <DialogHeader>
            <DialogTitle> Create a new product </DialogTitle>
            {/* <DialogDescription>
              this admin product will be able to manage the admin page
            </DialogDescription> */}
            <AddNewProductForm categories={categories} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateProductModal;
