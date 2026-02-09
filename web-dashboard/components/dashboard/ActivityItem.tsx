interface ActivityItemProps {
  text: string;
  timeAgo: string;
}

export function ActivityItem({ text, timeAgo }: ActivityItemProps) {
  return (
    <div className="flex gap-3 items-start">
      <div className="mt-1.5">
        <span className="text-[#4caf50] text-2xl leading-none">●</span>
      </div>
      <div className="flex-1">
        <p className="text-[#333] font-bold text-base mb-1">{text}</p>
        <p className="text-[#999] text-sm font-bold">{timeAgo}</p>
      </div>
    </div>
  );
}