import { FC } from "react";
import { review } from "@/components/shared/reviews/review.types";
import Rating from "@/components/rating/rating.component";
import { Review } from "@/components/shared/reviews/reviews";

interface ReviewListProps {
    reviews: review[];
}

export const ReviewsSection: FC<ReviewListProps> = ({ reviews }) => {
    return (
        <div className="space-y-8">
            <div className="border-b border-[#F3F3F3] space-y-2 pb-2">
                <h3 className="text-lg font-semibold text-white">15 Reseñas</h3>
                <div className="flex gap-2">
                    <Rating rating={4.7} showDetails={false} />
                    <span className="text-white">4.7</span>
                </div>
            </div>

            <div className="space-y-4">
                {
                    reviews.map((review, index) => (
                        <Review
                            key={index + 1}
                            author={review.author}
                            rating={review.rating}
                            comment={review.comment}
                        />
                    ))
                }
            </div>
        </div>

    )
}
