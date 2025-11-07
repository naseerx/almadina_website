import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface QuoteDialogProps {
  children: React.ReactNode;
}

const MESSAGES = [
  "Believe you can and you're halfway there.",
  "Small steps every day lead to big results.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Start where you are. Use what you have. Do what you can.",
  "Don't watch the clock; do what it does — keep going.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
];

const QuoteDialog = ({ children }: QuoteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * MESSAGES.length)
  );

  const pickNewIndex = (prev: number) => {
    if (MESSAGES.length <= 1) return prev;
    let next = prev;
    // pick a different random index
    while (next === prev) {
      next = Math.floor(Math.random() * MESSAGES.length);
    }
    return next;
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (val) {
          setQuoteIndex((prev) => pickNewIndex(prev));
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Quote</DialogTitle>
          <DialogDescription>
            Here's a small motivational message to brighten your day.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 p-4 rounded-md bg-muted/50 text-center">
          <p className="text-lg font-medium">“{MESSAGES[quoteIndex]}”</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
