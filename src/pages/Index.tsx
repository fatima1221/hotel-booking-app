import { useState, useEffect } from "react";
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
} from "@/store/slices/bookingSlice";
import { exportToPDF, printBooking } from "../features/booking/utils/pdfExport";
import { SaveBookingDialog } from "../features/booking/components/SaveBookingDialog";
import { LoadBookingDialog } from "../features/booking/components/LoadBookingDialog";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { BookingHeader } from "../features/booking/components/BookingHeader";
import { InitialConfigurationStep } from "../features/booking/components/InitialConfigurationStep";
import { DailyConfigurationStep } from "../features/booking/components/DailyConfigurationStep";
import { SummaryStep } from "../features/booking/components/SummaryStep";
import type { DaySelection } from "@/store/slices/bookingSlice";

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

  const validateStep1 = () => {
    return Boolean(
      citizenship &&
        destinationCountry &&
        startDate &&
        numberOfDays &&
        boardType
    );
  };

  const validateStep2 = () => {
    return dailySelections.every((day) => day.hotelId);
  };

  const handleNextStep1 = async () => {
    if (!validateStep1()) return;
    dispatch(setLoading(true));

    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const days = parseInt(numberOfDays);
    const startDateObj = new Date(startDate);
    const selections: DaySelection[] = [];

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDateObj);
      currentDate.setDate(currentDate.getDate() + i);
      selections.push({
        day: i + 1,
        date: currentDate.toISOString().split("T")[0],
        hotelId: "",
        lunchId: "",
        dinnerId: "",
      });
    }
    dispatch(setDailySelections(selections));
    dispatch(setStep(2));
    dispatch(setLoading(false));
  };

  const handleNextStep2 = () => {
    if (!validateStep2()) return;
    dispatch(setStep(3));
  };

  const handleUpdateDaySelection = (
    dayIndex: number,
    field: keyof DaySelection,
    value: string
  ) => {
    dispatch(updateDaySelection({ dayIndex, field, value }));
  };

  const handlePrevStep = () => {
    dispatch(setStep(Math.max(1, currentStep - 1)));
  };

  const handleResetBooking = () => {
    dispatch(resetBooking());
  };

  const handleSaveBooking = (name: string) => {
    dispatch(saveBooking({ name }));
  };

  const handleExportPDF = async () => {
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
  };

  return (
    <div className="min-h-screen w-full bg-luxe-dark font-inter relative overflow-hidden">
      {/* Gradient backgrounds */}
      <div className="fixed inset-0 opacity-60 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "radial-gradient(ellipse 1055px 658px at 808px 759px, rgba(24, 180, 244, 0.5) 0%, rgba(46, 55, 114, 0) 63%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-full h-full"
          style={{
            background:
              "radial-gradient(ellipse 842px 410px at 657px 910px, rgba(172, 127, 244, 0.6) 0%, rgba(21, 25, 52, 0) 100%)",
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-full h-full"
          style={{
            background:
              "radial-gradient(circle 734px at 920px 1044px, rgba(155, 93, 254, 0.6) 5%, rgba(172, 127, 244, 0) 80%)",
          }}
        />
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && <LoadingOverlay message="Processing..." />}
      </AnimatePresence>

      {/* Content */}
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
                  isValid={validateStep1()}
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
                  isValid={validateStep2()}
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

      {/* Dialogs */}
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
