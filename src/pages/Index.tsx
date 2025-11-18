import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Download, Printer, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  COUNTRIES,
  BOARD_TYPES,
  HOTELS,
  MEALS,
} from "@/features/booking/constants/data";
import {
  getHotelName,
  getHotelPrice,
  getMealName,
  getMealPrice,
  calculateDayTotal,
  calculateGrandTotal,
  formatDate,
} from "@/features/booking/utils/calculations";
import { exportToPDF, printBooking } from "@/features/booking/utils/pdfExport";
import { SaveBookingDialog } from "@/features/booking/components/SaveBookingDialog";
import { LoadBookingDialog } from "@/features/booking/components/LoadBookingDialog";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Button } from "@/components/ui/button";
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
    return (
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

  const handlePrint = async () => {
    dispatch(setLoading(true));
    await new Promise((resolve) => setTimeout(resolve, 300));
    printBooking({
      citizenship,
      destinationCountry,
      startDate,
      numberOfDays,
      boardType,
      dailySelections,
    });
    dispatch(setLoading(false));
  };

  const hotelOptions = HOTELS[destinationCountry as keyof typeof HOTELS] || [];
  const lunchOptions =
    MEALS[destinationCountry as keyof typeof MEALS]?.lunch || [];
  const dinnerOptions =
    MEALS[destinationCountry as keyof typeof MEALS]?.dinner || [];

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
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
        {/* Header */}
        <header className="px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold font-poppins text-luxe-lime">
              LuxeStay
            </h1>
            <div className="flex items-center gap-1 sm:gap-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <motion.div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300 ${
                      currentStep >= step
                        ? "bg-luxe-purple text-white"
                        : "bg-white/20 text-white/60"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {step}
                  </motion.div>
                  {step < 3 && (
                    <div className="w-4 sm:w-8 h-px bg-white/20 mx-1 sm:mx-2" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLoadDialogOpen(true)}
                className="bg-white/10 border-luxe-purple/50 text-white hover:bg-white/15 text-xs sm:text-sm"
              >
                <Loader className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Load</span>
              </Button>
              {currentStep === 3 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSaveDialogOpen(true)}
                    className="bg-white/10 border-luxe-purple/50 text-white hover:bg-white/15 text-xs sm:text-sm"
                  >
                    <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Save</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportPDF}
                    className="bg-white/10 border-luxe-purple/50 text-white hover:bg-white/15 text-xs sm:text-sm"
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                    className="bg-white/10 border-luxe-purple/50 text-white hover:bg-white/15 text-xs sm:text-sm"
                  >
                    <Printer className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Print</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Step 1 */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium font-poppins text-luxe-lime">
                      Step 1: Initial Configuration
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 font-poppins font-light">
                      Configure your travel preferences
                    </p>
                  </div>

                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-4xl p-4 sm:p-6 md:p-8 border border-luxe-purple/30 max-w-4xl mx-auto">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <label className="block text-base sm:text-lg font-medium text-white">
                            Citizenship
                          </label>
                          <select
                            value={citizenship}
                            onChange={(e) =>
                              dispatch(setCitizenship(e.target.value))
                            }
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-luxe-purple/50 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-luxe-purple"
                          >
                            <option value="">Select your citizenship</option>
                            {COUNTRIES.map((country) => (
                              <option key={country.code} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-base sm:text-lg font-medium text-white">
                            Destination Country
                          </label>
                          <select
                            value={destinationCountry}
                            onChange={(e) =>
                              dispatch(setDestinationCountry(e.target.value))
                            }
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-luxe-purple/50 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-luxe-purple"
                          >
                            <option value="">Select destination</option>
                            {COUNTRIES.map((country) => (
                              <option key={country.code} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-base sm:text-lg font-medium text-white">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) =>
                              dispatch(setStartDate(e.target.value))
                            }
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-luxe-purple/50 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-luxe-purple"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-base sm:text-lg font-medium text-white">
                            Number of Days
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={numberOfDays}
                            onChange={(e) =>
                              dispatch(setNumberOfDays(e.target.value))
                            }
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-luxe-purple/50 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-luxe-purple"
                          />
                        </div>
                      </div>

                      <div className="pt-2 sm:pt-4">
                        <label className="block text-base sm:text-lg font-medium text-white mb-3 sm:mb-4">
                          Board Type
                        </label>
                        <div className="space-y-2 sm:space-y-3">
                          {BOARD_TYPES.map((board) => (
                            <motion.label
                              key={board.code}
                              className="flex items-center p-3 sm:p-4 bg-white/10 rounded-lg border border-luxe-purple/30 cursor-pointer hover:bg-white/15 transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <input
                                type="radio"
                                name="boardType"
                                value={board.code}
                                checked={boardType === board.code}
                                onChange={(e) =>
                                  dispatch(setBoardType(e.target.value))
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mr-2 sm:mr-3 border-2 transition-all duration-300 ${
                                  boardType === board.code
                                    ? "bg-luxe-purple border-luxe-purple"
                                    : "bg-transparent border-luxe-purple/50"
                                }`}
                              >
                                {boardType === board.code && (
                                  <motion.div
                                    className="w-2 h-2 bg-white rounded-full"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                  />
                                )}
                              </div>
                              <div>
                                <div className="text-white font-medium text-sm sm:text-base">
                                  {board.name}
                                </div>
                                <div className="text-xs sm:text-sm text-white/60">
                                  {board.description}
                                </div>
                              </div>
                            </motion.label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <motion.button
                      onClick={handleNextStep1}
                      disabled={!validateStep1()}
                      className={`w-full mt-6 sm:mt-8 py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-medium text-base sm:text-lg font-poppins transition-all duration-300 ${
                        validateStep1()
                          ? "bg-luxe-purple hover:bg-luxe-purple-dark text-white shadow-lg hover:shadow-xl"
                          : "bg-luxe-purple/30 text-white/50 cursor-not-allowed"
                      }`}
                      whileHover={validateStep1() ? { scale: 1.02 } : {}}
                      whileTap={validateStep1() ? { scale: 0.98 } : {}}
                    >
                      Continue to Daily Configuration
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium font-poppins text-luxe-lime">
                      Step 2: Daily Configuration
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={handlePrevStep}
                      className="text-white hover:text-luxe-purple transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Back
                    </Button>
                  </div>

                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-4xl border border-luxe-purple/30 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr className="bg-luxe-purple/20">
                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-medium text-xs sm:text-sm">
                              Day
                            </th>
                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-medium text-xs sm:text-sm">
                              Date
                            </th>
                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-medium text-xs sm:text-sm">
                              Hotel
                            </th>
                            {boardType !== "NB" && (
                              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-medium text-xs sm:text-sm">
                                Lunch
                              </th>
                            )}
                            {boardType !== "NB" && (
                              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-medium text-xs sm:text-sm">
                                Dinner
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {dailySelections.map((day, index) => (
                            <motion.tr
                              key={index}
                              className="border-t border-luxe-purple/20 hover:bg-white/5 transition-colors"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <td className="px-3 sm:px-6 py-3 sm:py-4 text-white font-medium text-xs sm:text-sm">
                                Day {day.day}
                              </td>
                              <td className="px-3 sm:px-6 py-3 sm:py-4 text-white/80 text-xs sm:text-sm">
                                {formatDate(day.date)}
                              </td>
                              <td className="px-3 sm:px-6 py-3 sm:py-4">
                                <select
                                  value={day.hotelId}
                                  onChange={(e) =>
                                    handleUpdateDaySelection(
                                      index,
                                      "hotelId",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-luxe-purple/50 rounded text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-luxe-purple"
                                >
                                  <option value="">Select hotel</option>
                                  {hotelOptions.map((hotel) => (
                                    <option key={hotel.id} value={hotel.id}>
                                      {hotel.name} - ${hotel.price}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              {boardType !== "NB" && (
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                  <select
                                    value={day.lunchId}
                                    onChange={(e) =>
                                      handleUpdateDaySelection(
                                        index,
                                        "lunchId",
                                        e.target.value
                                      )
                                    }
                                    disabled={boardType === "NB"}
                                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-luxe-purple/50 rounded text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-luxe-purple disabled:opacity-50"
                                  >
                                    <option value="">No lunch</option>
                                    {lunchOptions.map((meal) => (
                                      <option key={meal.id} value={meal.id}>
                                        {meal.name} - ${meal.price}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                              )}
                              {boardType !== "NB" && (
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                  <select
                                    value={day.dinnerId}
                                    onChange={(e) =>
                                      handleUpdateDaySelection(
                                        index,
                                        "dinnerId",
                                        e.target.value
                                      )
                                    }
                                    disabled={boardType === "NB"}
                                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-luxe-purple/50 rounded text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-luxe-purple disabled:opacity-50"
                                  >
                                    <option value="">No dinner</option>
                                    {dinnerOptions.map((meal) => (
                                      <option key={meal.id} value={meal.id}>
                                        {meal.name} - ${meal.price}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                              )}
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {boardType === "HB" && (
                    <motion.div
                      className="bg-luxe-blue/10 border border-luxe-blue rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-luxe-blue flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs sm:text-sm text-luxe-blue font-medium">
                        Half Board: You can select either lunch OR dinner for
                        each day, not both.
                      </span>
                    </motion.div>
                  )}

                  <motion.button
                    onClick={handleNextStep2}
                    disabled={!validateStep2()}
                    className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-medium text-base sm:text-lg font-poppins transition-all duration-300 ${
                      validateStep2()
                        ? "bg-luxe-purple hover:bg-luxe-purple-dark text-white shadow-lg hover:shadow-xl"
                        : "bg-luxe-purple/30 text-white/50 cursor-not-allowed"
                    }`}
                    whileHover={validateStep2() ? { scale: 1.02 } : {}}
                    whileTap={validateStep2() ? { scale: 0.98 } : {}}
                  >
                    Continue to Summary
                  </motion.button>
                </motion.div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium font-poppins text-luxe-lime">
                      Step 3: Summary & Price Calculation
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={handlePrevStep}
                      className="text-white hover:text-luxe-purple transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Back
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-4 sm:space-y-6">
                      <motion.div
                        className="bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-4xl p-4 sm:p-6 border border-luxe-purple/30"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-xl sm:text-2xl font-medium font-poppins text-white mb-3 sm:mb-4">
                          Configuration Summary
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex justify-between text-sm sm:text-base">
                            <span className="text-white/80">Citizenship:</span>
                            <span className="text-white font-medium">
                              {citizenship}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm sm:text-base">
                            <span className="text-white/80">Destination:</span>
                            <span className="text-white font-medium">
                              {destinationCountry}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm sm:text-base">
                            <span className="text-white/80">Travel Dates:</span>
                            <span className="text-white font-medium">
                              {formatDate(startDate)} ({numberOfDays} days)
                            </span>
                          </div>
                          <div className="flex justify-between text-sm sm:text-base">
                            <span className="text-white/80">Board Type:</span>
                            <span className="text-white font-medium">
                              {
                                BOARD_TYPES.find((b) => b.code === boardType)
                                  ?.name
                              }
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-4xl p-4 sm:p-6 border border-luxe-purple/30"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-xl sm:text-2xl font-medium font-poppins text-white mb-3 sm:mb-4">
                          Total Price
                        </h3>
                        <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
                          {dailySelections.map((day) => (
                            <div
                              key={day.day}
                              className="border-b border-luxe-purple/20 pb-2 sm:pb-3 last:border-b-0 last:pb-0"
                            >
                              <div className="flex justify-between items-center mb-1 sm:mb-2">
                                <span className="text-white font-medium text-xs sm:text-sm">
                                  Day {day.day} ({formatDate(day.date)})
                                </span>
                                <span className="text-luxe-lime font-bold text-sm sm:text-base">
                                  ${calculateDayTotal(day, destinationCountry)}
                                </span>
                              </div>
                              <div className="space-y-1 text-xs sm:text-sm text-white/60">
                                {day.hotelId && (
                                  <div>
                                    Hotel:{" "}
                                    {getHotelName(
                                      day.hotelId,
                                      destinationCountry
                                    )}{" "}
                                    - $
                                    {getHotelPrice(
                                      day.hotelId,
                                      destinationCountry
                                    )}
                                  </div>
                                )}
                                {day.lunchId && (
                                  <div>
                                    Lunch:{" "}
                                    {getMealName(
                                      "lunch",
                                      day.lunchId,
                                      destinationCountry
                                    )}{" "}
                                    - $
                                    {getMealPrice(
                                      "lunch",
                                      day.lunchId,
                                      destinationCountry
                                    )}
                                  </div>
                                )}
                                {day.dinnerId && (
                                  <div>
                                    Dinner:{" "}
                                    {getMealName(
                                      "dinner",
                                      day.dinnerId,
                                      destinationCountry
                                    )}{" "}
                                    - $
                                    {getMealPrice(
                                      "dinner",
                                      day.dinnerId,
                                      destinationCountry
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          <div className="border-t border-luxe-purple/30 pt-3 sm:pt-4 mt-3 sm:mt-4 flex justify-between items-center">
                            <span className="text-lg sm:text-xl text-white font-medium">
                              Grand Total:
                            </span>
                            <span className="text-luxe-lime font-bold text-xl sm:text-2xl">
                              $
                              {calculateGrandTotal(
                                dailySelections,
                                destinationCountry
                              )}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      className="bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-4xl p-4 sm:p-6 border border-luxe-purple/30"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xl sm:text-2xl font-medium font-poppins text-white mb-3 sm:mb-4">
                        Daily Selections
                      </h3>
                      <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
                        {dailySelections.map((day) => (
                          <div
                            key={day.day}
                            className="bg-white/5 rounded-lg p-3 sm:p-4"
                          >
                            <div className="flex justify-between items-start mb-2 sm:mb-3">
                              <div>
                                <h4 className="text-white font-medium text-sm sm:text-base">
                                  Day {day.day}
                                </h4>
                                <p className="text-xs sm:text-sm text-white/60">
                                  {formatDate(day.date)}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                              <div className="flex justify-between">
                                <span className="text-white/80">Hotel:</span>
                                <span className="text-white">
                                  {getHotelName(
                                    day.hotelId,
                                    destinationCountry
                                  ) || "Not selected"}
                                </span>
                              </div>
                              {boardType !== "NB" && (
                                <div className="flex justify-between">
                                  <span className="text-white/80">Lunch:</span>
                                  <span className="text-white">
                                    {getMealName(
                                      "lunch",
                                      day.lunchId,
                                      destinationCountry
                                    ) || "Not selected"}
                                  </span>
                                </div>
                              )}
                              {boardType !== "NB" && (
                                <div className="flex justify-between">
                                  <span className="text-white/80">Dinner:</span>
                                  <span className="text-white">
                                    {getMealName(
                                      "dinner",
                                      day.dinnerId,
                                      destinationCountry
                                    ) || "Not selected"}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <motion.button
                      onClick={handleResetBooking}
                      className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-medium text-base sm:text-lg font-poppins bg-white/10 hover:bg-white/15 text-white transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start New Booking
                    </motion.button>
                    <motion.button
                      onClick={() => navigate("/booking-success")}
                      className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-medium text-base sm:text-lg font-poppins bg-luxe-purple hover:bg-luxe-purple-dark text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Confirm Booking
                    </motion.button>
                  </div>
                </motion.div>
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
