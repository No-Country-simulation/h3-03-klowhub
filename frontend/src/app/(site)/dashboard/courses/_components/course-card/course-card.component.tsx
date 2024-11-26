import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import Rating from '../../../../../../components/rating/rating.component'
import { Badge } from '../../../../../../components/ui/badge'
import Icon from '../../../../../../components/icon/icon.component'
import { truncate } from '@/utils/str.utils'
import { Edit } from 'lucide-react'

type Props = {
    course: SoldCourse
}

const CourseCard = ({ course }: Props) => {
    return (
        <Card className="overflow-hidden flex flex-col">
            <div className="flex-shrink-0 h-60">
                <Link href={course.courseLink} scroll={false}>
                    <Image
                        className="w-full h-full object-cover"
                        width={334}
                        height={200}
                        alt={course.altText}
                        src={course.imageUrl}
                    />
                </Link>
            </div>
            <div className="w-full flex flex-col justify-evenly h-full gap-6 p-4 flex-grow">
                <CardHeader className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <Link href={course.courseLink} scroll={false}>
                            <CardTitle>{course.courseTitle}</CardTitle>
                        </Link>
                        <Icon name="more-vertical" />
                    </div>
                    <Link href={course.courseLink} scroll={false}>
                        <span className="text-sm tracking-wide leading-6 h-[72px]">
                            {truncate(course.courseDescription, undefined)}
                        </span>
                    </Link>
                </CardHeader>

                <div>
                    <Badge className="bg-gray-100 text-white">{course.platform}</Badge>
                </div>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        {course.categories.map((category, idx) => (
                            <Badge key={`product-card-badge-${idx}`}>{category}</Badge>
                        ))}
                    </div>
                    <Rating rating={course.rating.score} ratingCount={course.rating.count} />
                    <div className="w-full flex items-center justify-end">
                        <Link href={course.editLink} className="hover:text-primary-200 transition-colors">
                            <Edit className="size-[24px]" />
                        </Link>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

export default CourseCard