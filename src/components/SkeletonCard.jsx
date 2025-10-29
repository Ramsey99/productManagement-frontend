export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded p-4 space-y-3 shadow">
      <div className="h-40 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
}
