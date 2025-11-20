import type { InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import StepHeader from "@/components/ui/step-header";
import { COUNTRIES, BOARD_TYPES } from "@/features/booking/constants/data";

type InitialConfigurationStepProps = {
  data: {
    citizenship: string;
    destinationCountry: string;
    startDate: string;
    numberOfDays: string;
    boardType: string;
  };
  onCitizenshipChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onNumberOfDaysChange: (value: string) => void;
  onBoardTypeChange: (value: string) => void;
  onContinue: () => void;
  isValid: boolean;
};

export function InitialConfigurationStep({
  data,
  onCitizenshipChange,
  onDestinationChange,
  onStartDateChange,
  onNumberOfDaysChange,
  onBoardTypeChange,
  onContinue,
  isValid,
}: InitialConfigurationStepProps) {
  return (
    <motion.div
      key="step1"
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
      <StepHeader
        title="Step 1: Initial Configuration"
        subtitle="Configure your travel preferences"
      />

      <div className="bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-4xl p-4 sm:p-6 md:p-8 border border-luxe-purple/30 max-w-4xl mx-auto">
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <SelectField
              label="Citizenship"
              value={data.citizenship}
              onChange={onCitizenshipChange}
              options={COUNTRIES.map((country) => ({
                value: country.name,
                label: country.name,
              }))}
              placeholder="Select your citizenship"
            />

            <SelectField
              label="Destination Country"
              value={data.destinationCountry}
              onChange={onDestinationChange}
              options={COUNTRIES.map((country) => ({
                value: country.name,
                label: country.name,
              }))}
              placeholder="Select destination"
            />

            <InputField
              label="Start Date"
              type="date"
              value={data.startDate}
              onChange={onStartDateChange}
            />

            <InputField
              label="Number of Days"
              type="number"
              value={data.numberOfDays}
              onChange={onNumberOfDaysChange}
              inputProps={{ min: 1, max: 30 }}
            />
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
                    checked={data.boardType === board.code}
                    onChange={(event) => onBoardTypeChange(event.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mr-2 sm:mr-3 border-2 transition-all duration-300 ${
                      data.boardType === board.code
                        ? "bg-luxe-purple border-luxe-purple"
                        : "bg-transparent border-luxe-purple/50"
                    }`}
                  >
                    {data.boardType === board.code && (
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
          onClick={onContinue}
          disabled={!isValid}
          className={`w-full mt-6 sm:mt-8 py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-medium text-base sm:text-lg font-poppins transition-all duration-300 ${
            isValid
              ? "bg-luxe-purple hover:bg-luxe-purple-dark text-white shadow-lg hover:shadow-xl"
              : "bg-luxe-purple/30 text-white/50 cursor-not-allowed"
          }`}
          whileHover={isValid ? { scale: 1.02 } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
        >
          Continue to Daily Configuration
        </motion.button>
      </div>
    </motion.div>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
};

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-base sm:text-lg font-medium text-white">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-luxe-purple/50 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-luxe-purple"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

function InputField({
  label,
  type,
  value,
  onChange,
  inputProps,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-base sm:text-lg font-medium text-white">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-luxe-purple/50 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-luxe-purple"
        {...inputProps}
      />
    </div>
  );
}
