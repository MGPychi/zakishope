import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { selectContactSchema } from "@/db/schema";
import { z } from "zod";
import { Button } from "../ui/button";

type ContactModalProps = {
  contact: z.infer<typeof selectContactSchema>;
  open: boolean;
  onClose: () => void;
};

export function ContactUsDataModal({
  contact,
  open,
  onClose,
}: ContactModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
          <DialogDescription>
            Review details for {contact.name}
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold">Name</h3>
                <p className="text-sm">{contact.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Email</h3>
                <p className="text-sm">{contact.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Phone</h3>
                <p className="text-sm">{contact.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Message</h3>
                <p className="text-sm">{contact.body}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Created At</h3>
                <p className="text-sm">
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
