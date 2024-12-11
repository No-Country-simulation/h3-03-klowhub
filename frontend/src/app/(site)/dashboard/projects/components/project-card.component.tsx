import Icon from "@/components/icon/icon.component";
import { IconTypes } from "@/components/icon/icon.types";
import Rating from "@/components/rating/rating.component";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card"
import { TProject } from "@/types/project.types";
import { getSlug } from "@/utils/str.utils";
import { ArrowBigRight, ArrowRight, CheckCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
    active?: boolean
    project: TProject
}

const ProjectCard = ({ active, project }: Props) => {

    return (
        <Card className={`px-3 ${active ? "py-3" : "py-2"}`}>
            <div className={`flex ${active ? "flex-col lg:flex-row lg:items-center gap-5" : "flex-col gap-3"}`}>
                <div className={`flex ${active ? "gap-5 flex-col lg:flex-row lg:items-center" : "gap-3 flex-row items-center"}`}>
                    <div className={`shrink-0 relative ${active ? "lg:w-[70px] lg:h-[70px] w-[100px] h-[100px]" : "w-[50px] h-[50px]"}`}>
                        <Image src={project.img.url} fill alt={project.img.alt}></Image>
                    </div>
                    <p className="text-sm leading-6">{project.description}</p>
                </div>
                <div className={`flex ${active ? "lg:flex-row lg:items-center flex-col gap-3 lg:gap-5" : "flex-col gap-3"}`}>
                    <div className="flex flex-col-reverse lg:flex-col gap-3">
                        <Badge
                            icon={<Icon name={getSlug(project.platform) as IconTypes} />}
                            className="lg:bg-gray-100 bg-transparent text-white w-[147px]"
                        >
                            {project.platform}
                        </Badge>

                        {!active && <div className="flex gap-2">
                            {
                                project.tags.map((t, idx) => (
                                    <Badge key={`product-card-badge-${idx}`}>{t}</Badge>
                                ))
                            }
                        </div>}
                    </div>
                    {!active && <Rating rating={project.rating} ratingCount={project.ratingCount} />}
                    <div
                        className={`text-xs w-fit h-[27.44] flex items-center gap-1.5 rounded-2xl text-[#4DE853] bg-[#00A86B]/15 p-2 border-1 border-[#4DE853] min-w-fit`}
                    >
                        <CheckCircle2 className="w-[12px] h-[12px]" />
                        <span>
                            {project.status}
                        </span>
                    </div>
                    {!active && <div className="flex items-center gap-2 text-sm">
                        <span>{project.initialDate}</span>
                        <ArrowRight className="w-[18px] h-[18px]" />
                        <span>{project.finalDate}</span>
                    </div>}
                    {active && <Link
                        href={`projects/${project.id}`}
                        className="text-sm font-semibold text-[#7197EB] w-[113.14px] h-[58.95px] flex items-center mx-auto lg:mx-0"
                    >
                        Ver detalle
                    </Link>}
                </div>
            </div>
        </Card>
    )
}

export default ProjectCard