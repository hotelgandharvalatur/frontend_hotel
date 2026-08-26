interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  showCount?: boolean;
  count?: number;
  className?: string;
}

export function StarRating({
  rating,
  max = 5,
  size = 16,
  showCount = false,
  count,
  className = "",
}: StarRatingProps) {
  return (
    <div
      className={`inline-flex items-center gap-1 ${className}`}
      aria-label={`${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        const fill = filled ? 1 : partial ? rating - Math.floor(rating) : 0;

        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`star-grad-${i}-${rating}`}>
                <stop offset={`${fill * 100}%`} stopColor="#D49A2A" />
                <stop offset={`${fill * 100}%`} stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M10 1.5L12.39 6.26L17.73 7.04L13.87 10.8L14.79 16.12L10 13.6L5.21 16.12L6.13 10.8L2.27 7.04L7.61 6.26L10 1.5Z"
              fill={`url(#star-grad-${i}-${rating})`}
              stroke="#D49A2A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
      {showCount && count !== undefined && (
        <span className="body-sm ml-1">({count})</span>
      )}
    </div>
  );
}
