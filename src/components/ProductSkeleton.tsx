interface ProductSkeletonProps {
  viewMode: 'grid' | 'list';
}

export default function ProductSkeleton(props:ProductSkeletonProps){
  const{ viewMode }=props;
  if (viewMode === 'list') {
    return (
      <div className="flex gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
        <div className="w-32 h-32 bg-gradient-to-r from-[#00CCCC]/10 to-[#00CCCC]/5 rounded-lg"></div>
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-gradient-to-r from-[#00CCCC]/10 to-[#00CCCC]/5 rounded w-3/4"></div>
          <div className="h-4 bg-gradient-to-r from-[#00CCCC]/10 to-[#00CCCC]/5 rounded w-1/2"></div>
          <div className="h-6 bg-gradient-to-r from-[#00CCCC]/10 to-[#00CCCC]/5 rounded w-16"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 animate-pulse">
      <div className="w-full h-48 bg-gradient-to-r from-[#00CCCC]/10 to-[#00CCCC]/5 rounded-lg mb-4"></div>
      <div className="h-5 bg-gradient-to-r from-[#00CCCC]/10 to-[#00CCCC]/5 rounded mb-2"></div>
      <div className="h-4 bg-gradient-to-r from-[#00CCCC]/10 to-[#00CCCC]/5 rounded w-3/4 mb-4"></div>
      <div className="flex items-center justify-between">
        <div className="h-6 bg-gradient-to-r from-[#00CCCC]/10 to-[#00CCCC]/5 rounded w-16"></div>
        <div className="h-8 w-8 bg-gradient-to-r from-[#00CCCC]/10 to-[#00CCCC]/5 rounded-lg"></div>
      </div>
    </div>
  );
}