export default function SkeletonCard() {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-md p-4 space-y-3 border border-gray-100">
      {/* 🔷 Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* 🖼 Image placeholder */}
      <div className="h-48 bg-gray-200 rounded-xl" />

      {/* 🧾 Title and text placeholders */}
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />

      <style>
        {`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
}
