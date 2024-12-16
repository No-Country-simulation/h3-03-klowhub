import Icon from '@/components/icon/icon.component'
import { IconTypes } from '@/components/icon/icon.types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getSlug } from '@/utils/str.utils'
import { EllipsisVertical, Heart, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import Image from "next/image"
import React from 'react'
import { TProjectCard } from '@/types/project.types'
import { formatPublicationDate } from '../utils/project-card.utils'

type Props = {
    project: TProjectCard
}

const ProjectCard = ({ project }: Props) => {

    return (
        <Card className='tracking-wider'>
            <CardContent className="p-3">
                <div className="flex flex-col gap-3 md:gap-5 px-3.5">
                    <div className="flex flex-col-reverse md:flex-row md:justify-between">
                        <div className="flex flex-col md:gap-5 lg:gap-0">
                            <p className="text-xs lg:h-[23px] md:h-[46px]">{formatPublicationDate(project.initialDate)}</p>
                            <h4 className="hidden lg:flex text-sm font-semibold lg:text-base lg:font-bold">
                <Link href={`/projects/${project.id}`}>
                  {project.title}
                </Link>
                            </h4>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Link
                                className="h-[46px] w-[46px] flex justify-center items-center hover:text-primary-200 transition-colors"
                                href="#"
                            >
                                <LinkIcon />
                            </Link>
                            <div className="flex">
                                <button className="h-[46px] w-[46px] flex justify-center items-center hover:text-primary-200 transition-colors">
                                    <Heart />
                                </button>
                                <button className="h-[46px] w-[26px] flex justify-center items-center hover:text-primary-200 transition-colors">
                                    <EllipsisVertical />
                                </button>
                            </div>
                        </div>
                    </div>
            <h4 className="text-sm font-semibold lg:text-base lg:font-bold lg:hidden">
          <Link href={`/projects/${project.id}`}>
              {project.title}
          </Link>
            </h4>
                    <div className='flex flex-col gap-3.5'>
            <Link href={`/projects/${project.id}`}>
              <p className='text-xs lg:text-sm leading-6'>{project.description}</p>
            </Link>
                        <Badge
                            icon={<Icon name={getSlug(project.platform) as IconTypes} />}
                            className="bg-gray-100 text-white w-[147px]"
                        >
                            {project.platform}
                        </Badge>
                        <div className='flex gap-3'>

                            {
                                project.tags.map((t, idx) => (
                                    <Badge key={`product-card-badge-${idx}`}>{t}</Badge>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-3.5'>
                        <div className='flex gap-3.5 items-center'>
                            <div className={`shrink-0 relative w-[50px] h-[50px]`}>
                                <Image src={project.instructor.img.url} fill alt={project.instructor.img.alt}></Image>
                            </div>
                            <div className='flex flex-col gap-1 h-[50px]'>
                                <div className='flex gap-3 items-center'>
                                    <span className='text-sm'>{project.instructor.name}</span>
                                    <span className="bg-pro-badge-gradient w-[45px] h-[27px] flex justify-center items-center text-xs font-[100] rounded-lg">
                                        {project.instructor.userType}
                                    </span>
                                </div>
                                <span className='text-xs text-primary-100'>{project.instructor.description}</span>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <Icon name="rated-star" />
                            <span className='text-sm'>Calificacion del instructor: {project.instructor.rating}</span>
                        </div>
                    </div>
                    <div className='w-full text-sm text-center lg:text-end p-3.5'>
            <Link className='hover:text-primary-200 transition-colors' href={`/projects/${project.id}`}>
              Ver Detalles
            </Link>

          </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProjectCard
