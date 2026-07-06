interface AccentLineProps {
  className?: string;
}

export function AccentLine({ className = "" }: AccentLineProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px w-8 bg-[#ff7d27]" />
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
