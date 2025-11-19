import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BOARD_TYPES } from "@/features/booking/constants/data";
import {
  calculateDayTotal,
  calculateGrandTotal,
  formatDate,
  getHotelName,
  getHotelPrice,
  getMealName,
  getMealPrice,
} from "@/features/booking/utils/calculations";
import type { DaySelection } from "@/store/slices/bookingSlice";

type SummaryStepProps = {
  citizenship: string;
  destinationCountry: string;
  startDate: string;
  numberOfDays: string;
  boardType: string;
  dailySelections: DaySelection[];
  onPrev: () => void;
  onReset: () => void;
  onConfirm: () => void;
};

export function SummaryStep({
  citizenship,
  destinationCountry,
  startDate,
  numberOfDays,
  boardType,
  dailySelections,
  onPrev,
  onReset,
  onConfirm,
}: SummaryStepProps) {
  return (
    <motion.div
      key="step3"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
      }}
      transition={{ duration: 0.3 }}
      className="space-y-6 sm:space-y-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium font-poppins text-luxe-lime">
          Step 3: Summary & Price Calculation
        </h2>
        <Button
          variant="ghost"
          onClick={onPrev}
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
            <SummaryItem label="Citizenship" value={citizenship} />
            <SummaryItem label="Destination" value={destinationCountry} />
            <SummaryItem
              label="Travel Dates"
              value={`${formatDate(startDate)} (${numberOfDays} days)`}
            />
            <SummaryItem
              label="Board Type"
              value={
                BOARD_TYPES.find((board) => board.code === boardType)?.name ||
                boardType
              }
            />
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
                        Hotel: {getHotelName(day.hotelId, destinationCountry)} -
                        ${getHotelPrice(day.hotelId, destinationCountry)}
                      </div>
                    )}
                    {day.lunchId && (
                      <div>
                        Lunch:{" "}
                        {getMealName("lunch", day.lunchId, destinationCountry)}{" "}
                        - $
                        {getMealPrice("lunch", day.lunchId, destinationCountry)}
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
                  ${calculateGrandTotal(dailySelections, destinationCountry)}
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
              <div key={day.day} className="bg-white/5 rounded-lg p-3 sm:p-4">
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
                  <Selection
                    label="Hotel"
                    value={getHotelName(day.hotelId, destinationCountry)}
                  />
                  {boardType !== "NB" && (
                    <>
                      <Selection
                        label="Lunch"
                        value={getMealName(
                          "lunch",
                          day.lunchId,
                          destinationCountry
                        )}
                      />
                      <Selection
                        label="Dinner"
                        value={getMealName(
                          "dinner",
                          day.dinnerId,
                          destinationCountry
                        )}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
        <motion.button
          onClick={onReset}
          className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-medium text-base sm:text-lg font-poppins bg-white/10 hover:bg-white/15 text-white transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start New Booking
        </motion.button>
        <motion.button
          onClick={onConfirm}
          className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-medium text-base sm:text-lg font-poppins bg-luxe-purple hover:bg-luxe-purple-dark text-white shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Confirm Booking
        </motion.button>
      </div>
    </motion.div>
  );
}

type SummaryItemProps = {
  label: string;
  value: string;
};

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="flex justify-between text-sm sm:text-base py-1 first:pt-0 last:pb-0">
      <span className="text-white/80">{label}:</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}

type SelectionProps = {
  label: string;
  value?: string;
};

function Selection({ label, value }: SelectionProps) {
  return (
    <div className="flex justify-between">
      <span className="text-white/80">{label}:</span>
      <span className="text-white">{value || "Not selected"}</span>
    </div>
  );
}
