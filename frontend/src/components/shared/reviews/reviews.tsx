import { FC } from 'react'
import { TReview } from './review.types';
import Rating from '@/components/rating/rating.component';

export const Review: FC<TReview> = ({ author, rating, comment }) => {

    return (
        <div className="space-y-1 border-b border-[#F3F3F3] pb-2">
            <div className="flex items-center gap-2">
                <Rating rating={rating} showDetails={false} />
                <span className="text-sm font-medium text-white">{author}</span>
            </div>
            <p className="text-sm text-gray-400">{comment}</p>
        </div>
    );

};