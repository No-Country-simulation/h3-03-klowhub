import Icon from "../icon/icon.component";

type RatingProps = {
  rating: number
  ratingCount: number
}

const Rating = ({ rating, ratingCount }: RatingProps) => {
  return (
    <div className="flex gap-4">
      <span>{ rating }</span>
      <div className="relative">
        <div className="flex">
          {
            Array(Math.floor(5)).fill(0).map((s, idx) => (
              <Icon key={`unrated-star-${idx}`} name="star" /> 
            ))
          }
        </div>
        <div className="flex absolute left-0 top-0">
          {
            Array(Math.floor(rating)).fill(0).map((s, idx) => (
              <Icon key={`unrated-star-${idx}`} name="rated-star" />
            ))
          }
        </div>
      </div>
      <span>({ ratingCount })</span>
    </div>
  )
};

export default Rating
