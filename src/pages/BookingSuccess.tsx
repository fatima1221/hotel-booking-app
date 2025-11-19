import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundGradients } from "../components/ui/backgroundGradient";

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-luxe-dark font-inter relative overflow-hidden">
      <BackgroundGradients />
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          className="bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-4xl p-6 sm:p-8 md:p-12 border border-luxe-purple/30 max-w-2xl w-full text-center space-y-6 sm:space-y-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-luxe-purple/30 rounded-full blur-2xl animate-pulse" />
              <CheckCircle
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-luxe-lime relative z-10"
                strokeWidth={1}
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins text-luxe-lime">
              Booking Confirmed!
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white font-poppins font-light">
              Your luxury travel experience awaits
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-luxe-purple/20 text-left space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-white/60 font-medium">
                BOOKING REFERENCE
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-luxe-lime font-mono">
                LX-{Math.random().toString(36).substring(2, 11).toUpperCase()}
              </p>
            </div>
            <div className="border-t border-luxe-purple/20 pt-3 sm:pt-4">
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Your reservation has been successfully confirmed. A confirmation
                email with all booking details has been sent to your inbox.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-2 sm:space-y-3 pt-2 sm:pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm sm:text-base text-white/70">
              What happens next?
            </p>
            <ul className="text-left space-y-2 sm:space-y-3 text-sm sm:text-base text-white/80">
              {[
                "Check your email for the confirmation and booking details",
                "Your hotel will send pre-arrival information 2 weeks before your trip",
                "Download the LuxeStay app to manage your booking on the go",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2 sm:gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <span className="text-luxe-lime font-bold mt-1">✓</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.button
            onClick={() => navigate("/")}
            className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-medium text-base sm:text-lg font-poppins bg-luxe-purple hover:bg-luxe-purple-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Another Trip
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
