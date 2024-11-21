import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import Image from 'next/image'
import Rating from '../rating/rating.component'
import { Badge } from '../ui/badge'
import Icon from '../icon/icon.component'
import { getSlug, truncate } from '@/utils/str.utils'
import { Edit } from 'lucide-react'

const CourseCard = () => {
    return (
        <Card
            className="overflow-hidden flex flex-col"
        >
            <div className="flex-shrink-0 h-60">
                <Link href="" scroll={false}>
                    <Image
                        className="w-full h-full object-cover"
                        width={334} height={200}
                        alt="some description"
                        src="/temp/imgs/course-image.png"
                    />
                </Link>
            </div>
            <div className="w-full flex flex-col justify-evenly h-full gap-6 p-4 flex-grow">
                <CardHeader className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <Link href={""} scroll={false}>
                            <CardTitle>Dominando el Desarrollo de Aplicaciones con AppSheet</CardTitle>
                        </Link>
                        <Icon name="more-vertical" />
                    </div>
                    <Link href="" scroll={false}>
                        <span className="text-sm tracking-wide leading-6 h-[72px]">
                            {
                                truncate("¡Conviértete en un experto en la creación de aplicaciones dinámicas con ApSheet", undefined)
                            }
                        </span>
                    </Link>
                </CardHeader>

                <div>
                    <Badge
                        icon={<Icon name={getSlug("AppSheet") === 'appsheet' ? 'app-sheet' : 'power-apps'} />}
                        className="bg-gray-100 text-white"
                    >
                        AppSheet
                    </Badge>
                </div>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        {
                            ["Logística", "Retail", "Inventarios"].map((t, idx) => (
                                <Badge key={`product-card-badge-${idx}`}>{t}</Badge>
                            ))
                        }
                    </div>
                    <Rating rating={4} ratingCount={136} />
                    <div className="w-full flex items-center justify-end">
                        <Link href="#" className="hover:text-primary-200 transition-colors">
                            <Edit className='size-[24px]' />
                        </Link>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

export default CourseCard