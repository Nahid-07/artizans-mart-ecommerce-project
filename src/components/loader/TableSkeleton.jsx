const TableSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl animate-pulse">
      {/* Header Row */}
      <div className="h-12 bg-gray-200 rounded mb-6 w-full"></div>

      {/* Table Rows */}
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex space-x-4">
            <div className="h-8 bg-gray-200 rounded w-1/6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/12"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
