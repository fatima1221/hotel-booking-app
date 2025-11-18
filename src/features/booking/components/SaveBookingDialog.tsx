import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SaveBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string) => void;
}

export const SaveBookingDialog = ({
  open,
  onOpenChange,
  onSave,
}: SaveBookingDialogProps) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
      setName("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border-luxe-purple/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-luxe-lime">
            Save Booking Configuration
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Give your booking a name to save it for later
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="booking-name" className="text-white">
              Booking Name
            </Label>
            <Input
              id="booking-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Summer Vacation 2024"
              className="bg-white/10 border-luxe-purple/50 text-white placeholder:text-white/50"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSave();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-white/10 border-luxe-purple/50 text-white hover:bg-white/15"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name.trim()}
            className="bg-luxe-purple hover:bg-luxe-purple-dark text-white"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
