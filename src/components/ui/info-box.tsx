type InfoBoxProps = {
  text: string;
  className?: string;
};

export function InfoBox({ text, className = "" }: InfoBoxProps) {
  return (
    <div
      className={`bg-luxe-blue/10 border border-luxe-blue rounded-lg p-4 flex items-start gap-3 ${className}`}
    >
      <svg
        className="w-5 h-5 text-luxe-blue flex-shrink-0 mt-0.5"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>

      <span className="text-sm text-luxe-blue font-medium">{text}</span>
    </div>
  );
}
