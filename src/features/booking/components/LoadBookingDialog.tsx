import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadBooking, deleteSavedBooking } from "@/store/slices/bookingSlice";

interface LoadBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoadBookingDialog = ({
  open,
  onOpenChange,
}: LoadBookingDialogProps) => {
  const dispatch = useAppDispatch();
  const savedBookings = useAppSelector((state) => state.booking.savedBookings);

  const handleLoad = (id: string) => {
    dispatch(loadBooking(id));
    onOpenChange(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this saved booking?")) {
      dispatch(deleteSavedBooking(id));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border-luxe-purple/30 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-luxe-lime">
            Load Saved Booking
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Select a saved booking configuration to load
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {savedBookings.length === 0 ? (
            <p className="text-white/60 text-center py-8">
              No saved bookings found
            </p>
          ) : (
            savedBookings
              .slice()
              .reverse()
              .map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white/5 rounded-lg p-4 border border-luxe-purple/20 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => handleLoad(booking.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">
                        {booking.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(booking.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-white/70">
                        <span>{booking.data.destinationCountry}</span>
                        {booking.data.startDate && (
                          <span className="ml-2">
                            •{" "}
                            {new Date(
                              booking.data.startDate
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDelete(booking.id, e)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-white/10 border-luxe-purple/50 text-white hover:bg-white/15"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
