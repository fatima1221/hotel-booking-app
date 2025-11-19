import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select-field";
import { InfoBox } from "@/components/ui/info-box";

import type { DaySelection } from "@/store/slices/bookingSlice";
import { HOTELS, MEALS } from "@/features/booking/constants/data";
import { formatDate } from "@/features/booking/utils/calculations";

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

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
  const hotelOptions = HOTELS[destinationCountry] || [];
  const meals = MEALS[destinationCountry];
  const lunchOptions = meals?.lunch || [];
  const dinnerOptions = meals?.dinner || [];
  const showMeals = boardType !== "NB";

  return (
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
          onClick={onPrev}
          className="text-white hover:text-luxe-purple"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-luxe-purple/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-luxe-purple/20">
                <th className="table-header">Day</th>
                <th className="table-header">Date</th>
                <th className="table-header">Hotel</th>
                {showMeals && (
                  <>
                    <th className="table-header">Lunch</th>
                    <th className="table-header">Dinner</th>
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
                  <td className="table-cell">Day {day.day}</td>
                  <td className="table-cell text-white/80">
                    {formatDate(day.date)}
                  </td>

                  <td className="table-cell">
                    <SelectField
                      value={day.hotelId}
                      placeholder="Select hotel"
                      onChange={(v) =>
                        onUpdateDaySelection(index, "hotelId", v)
                      }
                      options={hotelOptions.map((h) => ({
                        value: h.id,
                        label: `${h.name} - $${h.price}`,
                      }))}
                    />
                  </td>

                  {showMeals && (
                    <>
                      <td className="table-cell">
                        <SelectField
                          value={day.lunchId}
                          placeholder="No lunch"
                          onChange={(v) =>
                            onUpdateDaySelection(index, "lunchId", v)
                          }
                          options={lunchOptions.map((m) => ({
                            value: m.id,
                            label: `${m.name} - $${m.price}`,
                          }))}
                        />
                      </td>

                      <td className="table-cell">
                        <SelectField
                          value={day.dinnerId}
                          placeholder="No dinner"
                          onChange={(v) =>
                            onUpdateDaySelection(index, "dinnerId", v)
                          }
                          options={dinnerOptions.map((m) => ({
                            value: m.id,
                            label: `${m.name} - $${m.price}`,
                          }))}
                        />
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
        <InfoBox text="Half Board: You can select either lunch OR dinner for each day, not both." />
      )}
      <motion.button
        onClick={onContinue}
        disabled={!isValid}
        className={`w-full py-3 rounded-xl font-medium font-poppins transition-all ${
          isValid
            ? "bg-luxe-purple hover:bg-luxe-purple-dark text-white shadow-lg"
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
