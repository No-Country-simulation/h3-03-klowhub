import Icon from "../icon/icon.component";

type RatingProps = {
  rating: number;
  ratingCount: number;
  showDetails?: boolean;
};

const Rating = ({ rating, ratingCount, showDetails = true }: RatingProps) => {
  return (
    <div className="flex gap-4">
      {showDetails && <span>{rating}</span>}

      <div className="relative">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Icon key={`unrated-star-${idx}`} name="star" />
          ))}
        </div>
        <div className="flex absolute left-0 top-0">
          {Array.from({ length: Math.floor(rating) }).map((_, idx) => (
            <Icon key={`rated-star-${idx}`} name="rated-star" />
          ))}
        </div>
      </div>

      {showDetails && <span>({ratingCount})</span>}
    </div>
  );
};

export default Rating;
