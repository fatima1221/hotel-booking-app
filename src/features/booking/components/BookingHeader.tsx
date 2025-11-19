import { motion } from "framer-motion";
import { Download, Loader, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

type BookingHeaderProps = {
  currentStep: number;
  onOpenLoad: () => void;
  onOpenSave: () => void;
  onExportPDF: () => void;
};

export function BookingHeader({
  currentStep,
  onOpenLoad,
  onOpenSave,
  onExportPDF,
}: BookingHeaderProps) {
  const steps = [1, 2, 3];

  return (
    <header className="px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold font-poppins text-luxe-lime">
          LuxeStay
        </h1>

        <div className="flex items-center gap-1 sm:gap-2">
          {steps.map((step) => (
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
              {step < steps.length && (
                <div className="w-4 sm:w-8 h-px bg-white/20 mx-1 sm:mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenLoad}
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
                onClick={onOpenSave}
                className="bg-white/10 border-luxe-purple/50 text-white hover:bg-white/15 text-xs sm:text-sm"
              >
                <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onExportPDF}
                className="bg-white/10 border-luxe-purple/50 text-white hover:bg-white/15 text-xs sm:text-sm"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">PDF</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
