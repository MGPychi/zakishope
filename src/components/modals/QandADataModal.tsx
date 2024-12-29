import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { selectQandASchema } from "@/db/schema"; // Adjust this import based on your actual schema file
import { z } from "zod";
import { Button } from "../ui/button";

type QandAModalProps = {
  qanda: z.infer<typeof selectQandASchema>;
  open: boolean;
  onClose: () => void;
};

export function QandADataModal({ qanda, open, onClose }: QandAModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Q&A Information</DialogTitle>
          <DialogDescription>
            {" "}
            QaA details for {qanda.question}
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>Q&A Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold">Question</h3>
                <p className="text-sm">{qanda.question}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Answer</h3>
                <p className="text-sm">{qanda.answer}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Created At</h3>
                <p className="text-sm">
                  {new Date(qanda.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Updated At</h3>
                <p className="text-sm">
                  {new Date(qanda.updatedAt).toLocaleString()}
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
