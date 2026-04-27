const statusConfig = {
  saved: { bg: "bg-gray-500/20", text: "text-gray-300", label: "Saved" },
  applied: { bg: "bg-blue-500/20", text: "text-blue-300", label: "Applied" },
  interview: { bg: "bg-yellow-500/20", text: "text-yellow-300", label: "Interview" },
  offer: { bg: "bg-green-500/20", text: "text-green-300", label: "Offer" },
  rejected: { bg: "bg-red-500/20", text: "text-red-300", label: "Rejected" },
  withdrawn: { bg: "bg-purple-500/20", text: "text-purple-300", label: "Withdrawn" },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.saved;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

