import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { selectReviewSchema } from "@/db/schema"; // Adjust this import based on your actual schema file
import { z } from "zod";
import { Button } from "../ui/button";

type ReviewModalProps = {
  review: z.infer<typeof selectReviewSchema>;
  open: boolean;
  onClose: () => void;
};

export function ReviewDataModal({ review, open, onClose }: ReviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Information</DialogTitle>
          <DialogDescription>
            Review details for {review.client}
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>Review Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold">Client</h3>
                <p className="text-sm">{review.client}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Review</h3>
                <p className="text-sm">{review.body}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Created At</h3>
                <p className="text-sm">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Updated At</h3>
                <p className="text-sm">
                  {new Date(review.updatedAt).toLocaleString()}
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
