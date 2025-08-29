export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="flex items-center gap-1 mb-2">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}