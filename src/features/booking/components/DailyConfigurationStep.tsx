import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DaySelection } from "@/store/slices/bookingSlice";
import { HOTELS, MEALS } from "@/features/booking/constants/data";
import { formatDate } from "@/features/booking/utils/calculations";

type DailyConfigurationStepProps = {
  boardType: string;
  destinationCountry: string;
  dailySelections: DaySelection[];
  onUpdateDaySelection: (
    dayIndex: number,
    field: keyof DaySelection,
    value: string
  ) => void;
  onContinue: () => void;
  onPrev: () => void;
  isValid: boolean;
};

export function DailyConfigurationStep({
  boardType,
  destinationCountry,
  dailySelections,
  onUpdateDaySelection,
  onContinue,
  onPrev,
  isValid,
}: DailyConfigurationStepProps) {
  const hotelOptions = HOTELS[destinationCountry as keyof typeof HOTELS] || [];
  const meals = MEALS[destinationCountry as keyof typeof MEALS];
  const lunchOptions = meals?.lunch || [];
  const dinnerOptions = meals?.dinner || [];

  return (
    <motion.div
      key="step2"
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
          Step 2: Daily Configuration
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
                  <>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-medium text-xs sm:text-sm">
                      Lunch
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-white font-medium text-xs sm:text-sm">
                      Dinner
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {dailySelections.map((day, index) => (
                <motion.tr
                  key={day.day}
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
                      onChange={(event) =>
                        onUpdateDaySelection(
                          index,
                          "hotelId",
                          event.target.value
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
                    <>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <select
                          value={day.lunchId}
                          onChange={(event) =>
                            onUpdateDaySelection(
                              index,
                              "lunchId",
                              event.target.value
                            )
                          }
                          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-luxe-purple/50 rounded text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-luxe-purple"
                        >
                          <option value="">No lunch</option>
                          {lunchOptions.map((meal) => (
                            <option key={meal.id} value={meal.id}>
                              {meal.name} - ${meal.price}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <select
                          value={day.dinnerId}
                          onChange={(event) =>
                            onUpdateDaySelection(
                              index,
                              "dinnerId",
                              event.target.value
                            )
                          }
                          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-luxe-purple/50 rounded text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-luxe-purple"
                        >
                          <option value="">No dinner</option>
                          {dinnerOptions.map((meal) => (
                            <option key={meal.id} value={meal.id}>
                              {meal.name} - ${meal.price}
                            </option>
                          ))}
                        </select>
                      </td>
                    </>
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
            Half Board: You can select either lunch OR dinner for each day, not
            both.
          </span>
        </motion.div>
      )}

      <motion.button
        onClick={onContinue}
        disabled={!isValid}
        className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-medium text-base sm:text-lg font-poppins transition-all duration-300 ${
          isValid
            ? "bg-luxe-purple hover:bg-luxe-purple-dark text-white shadow-lg hover:shadow-xl"
            : "bg-luxe-purple/30 text-white/50 cursor-not-allowed"
        }`}
        whileHover={isValid ? { scale: 1.02 } : {}}
        whileTap={isValid ? { scale: 0.98 } : {}}
      >
        Continue to Summary
      </motion.button>
    </motion.div>
  );
}
