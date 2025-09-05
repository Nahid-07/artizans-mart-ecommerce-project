import { StarIcon } from "@heroicons/react/24/solid";
export const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-400">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <StarIcon key={`full-${i}`} className="h-4 w-4" />
        ))}
      {halfStar && (
        <div className="relative">
          <StarIcon className="h-4 w-4" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <StarIcon className="h-4 w-4 text-gray-300" />
          </div>
        </div>
      )}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
    </div>
  );
};