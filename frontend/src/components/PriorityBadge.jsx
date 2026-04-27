const priorityConfig = {
  low: { bg: "bg-green-500/20", text: "text-green-300", label: "Low" },
  medium: { bg: "bg-yellow-500/20", text: "text-yellow-300", label: "Medium" },
  high: { bg: "bg-red-500/20", text: "text-red-300", label: "High" },
};

export default function PriorityBadge({ priority }) {
  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

