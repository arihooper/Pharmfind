interface StatCardProps {
  emoji: string;
  value: number;
  label: string;
  variant?: 'default' | 'warning' | 'danger';
}

export function StatCard({ emoji, value, label, variant = 'default' }: StatCardProps) {
  const getColorClass = () => {
    switch (variant) {
      case 'warning':
        return 'text-[#ff9800]';
      case 'danger':
        return 'text-[#f44336]';
      default:
        return 'text-black';
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center h-[120px] shadow-sm hover:shadow-md transition-shadow">
      <p className={`text-xl font-normal ${getColorClass()}`}>
        {emoji} {value} {label}
      </p>
    </div>
  );
}