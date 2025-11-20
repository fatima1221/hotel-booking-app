import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function StepHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
}: StepHeaderProps) {
  const isCentered = !showBack;

  return (
    <div
      className={
        isCentered
          ? "text-center space-y-2"
          : "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      }
    >
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium font-poppins text-luxe-lime">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-poppins font-light">
            {subtitle}
          </p>
        )}
      </div>

      {showBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:text-luxe-purple"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      )}
    </div>
  );
}
