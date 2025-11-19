import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setStep,
  setCitizenship,
  setDestinationCountry,
  setStartDate,
  setNumberOfDays,
  setBoardType,
  setDailySelections,
  updateDaySelection,
  resetBooking,
  setLoading,
  saveBooking,
  type DaySelection,
} from "@/store/slices/bookingSlice";
import { exportToPDF } from "../features/booking/utils/pdfExport";
import { SaveBookingDialog } from "../features/booking/components/SaveBookingDialog";
import { LoadBookingDialog } from "../features/booking/components/LoadBookingDialog";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { BookingHeader } from "../features/booking/components/BookingHeader";
import { InitialConfigurationStep } from "../features/booking/components/InitialConfigurationStep";
import { DailyConfigurationStep } from "../features/booking/components/DailyConfigurationStep";
import { SummaryStep } from "../features/booking/components/SummaryStep";
import { BackgroundGradients } from "../components/ui/backgroundGradient";
export default function Index() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    currentStep,
    citizenship,
    destinationCountry,
    startDate,
    numberOfDays,
    boardType,
    dailySelections,
    isLoading,
  } = useAppSelector((state) => state.booking);

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const isStep1Valid = Boolean(
    citizenship && destinationCountry && startDate && numberOfDays && boardType
  );

  const isStep2Valid = dailySelections.every((day) => day.hotelId);

  const handleNextStep1 = useCallback(async () => {
    if (!isStep1Valid) return;

    dispatch(setLoading(true));
    await new Promise((resolve) => setTimeout(resolve, 400));

    const days = Number(numberOfDays);
    const start = new Date(startDate);

    const selections: DaySelection[] = Array.from({ length: days }, (_, i) => {
      const current = new Date(start);
      current.setDate(current.getDate() + i);

      return {
        day: i + 1,
        date: current.toISOString().split("T")[0],
        hotelId: "",
        lunchId: "",
        dinnerId: "",
      };
    });

    dispatch(setDailySelections(selections));
    dispatch(setStep(2));
    dispatch(setLoading(false));
  }, [isStep1Valid, numberOfDays, startDate, dispatch]);

  const handleNextStep2 = useCallback(() => {
    if (!isStep2Valid) return;
    dispatch(setStep(3));
  }, [isStep2Valid, dispatch]);

  const handlePrevStep = useCallback(() => {
    dispatch(setStep(Math.max(1, currentStep - 1)));
  }, [currentStep, dispatch]);

  const handleUpdateDaySelection = useCallback(
    (dayIndex: number, field: keyof DaySelection, value: string) => {
      dispatch(updateDaySelection({ dayIndex, field, value }));
    },
    [dispatch]
  );

  const handleResetBooking = () => dispatch(resetBooking());

  const handleSaveBooking = (name: string) => {
    dispatch(saveBooking({ name }));
  };

  const handleExportPDF = useCallback(async () => {
    dispatch(setLoading(true));
    await new Promise((resolve) => setTimeout(resolve, 300));

    exportToPDF({
      citizenship,
      destinationCountry,
      startDate,
      numberOfDays,
      boardType,
      dailySelections,
    });

    dispatch(setLoading(false));
  }, [
    citizenship,
    destinationCountry,
    startDate,
    numberOfDays,
    boardType,
    dailySelections,
    dispatch,
  ]);

  return (
    <div className="min-h-screen w-full bg-luxe-dark font-inter relative overflow-hidden">
      <BackgroundGradients />
      <AnimatePresence>
        {isLoading && <LoadingOverlay message="Processing..." />}
      </AnimatePresence>

      <div className="relative z-10 min-h-screen">
        <BookingHeader
          currentStep={currentStep}
          onOpenLoad={() => setLoadDialogOpen(true)}
          onOpenSave={() => setSaveDialogOpen(true)}
          onExportPDF={handleExportPDF}
        />

        <main className="px-4 sm:px-6 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <InitialConfigurationStep
                  data={{
                    citizenship,
                    destinationCountry,
                    startDate,
                    numberOfDays,
                    boardType,
                  }}
                  onCitizenshipChange={(value) =>
                    dispatch(setCitizenship(value))
                  }
                  onDestinationChange={(value) =>
                    dispatch(setDestinationCountry(value))
                  }
                  onStartDateChange={(value) => dispatch(setStartDate(value))}
                  onNumberOfDaysChange={(value) =>
                    dispatch(setNumberOfDays(value))
                  }
                  onBoardTypeChange={(value) => dispatch(setBoardType(value))}
                  onContinue={handleNextStep1}
                  isValid={isStep1Valid}
                />
              )}

              {currentStep === 2 && (
                <DailyConfigurationStep
                  boardType={boardType}
                  destinationCountry={destinationCountry}
                  dailySelections={dailySelections}
                  onUpdateDaySelection={handleUpdateDaySelection}
                  onContinue={handleNextStep2}
                  onPrev={handlePrevStep}
                  isValid={isStep2Valid}
                />
              )}

              {currentStep === 3 && (
                <SummaryStep
                  citizenship={citizenship}
                  destinationCountry={destinationCountry}
                  startDate={startDate}
                  numberOfDays={numberOfDays}
                  boardType={boardType}
                  dailySelections={dailySelections}
                  onPrev={handlePrevStep}
                  onReset={handleResetBooking}
                  onConfirm={() => navigate("/booking-success")}
                />
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <SaveBookingDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        onSave={handleSaveBooking}
      />

      <LoadBookingDialog
        open={loadDialogOpen}
        onOpenChange={setLoadDialogOpen}
      />
    </div>
  );
}
