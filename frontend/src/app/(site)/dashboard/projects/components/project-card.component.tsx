import Icon from "@/components/icon/icon.component";
import { IconTypes } from "@/components/icon/icon.types";
import Rating from "@/components/rating/rating.component";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TProjectCard } from "@/types/project.types";
import { getSlug } from "@/utils/str.utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
    active?: boolean;
    project: TProjectCard;
};

const ProjectCard = ({ active, project }: Props) => {

    return (
        <Card className={`px-3 ${active ? "py-3" : "py-2"}`}>
            <div className={`flex ${active ? "flex-col gap-5" : "flex-col gap-3"}`}>
                <div className={`flex ${active ? "gap-5 flex-col" : "gap-3 flex-row items-center"}`}>
                    <div className={`shrink-0 relative ${active ? "w-[70px] h-[70px] w-[100px] h-[100px]" : "w-[50px] h-[50px]"}`}>
                        <Image src={project.instructor.profileImg.fileMetadata.url} fill alt={project.instructor.name} />
                    </div>
                    <p className="text-sm leading-6">{project.description}</p>
                </div>
                <div className={`flex ${active ? "flex-row items-center gap-3" : "flex-col gap-3"}`}>
                    <div className="flex gap-3">
                        <Badge
                            icon={<Icon name={getSlug(project.platform) as IconTypes} />}
                            className="lg:bg-gray-100 bg-transparent text-white w-[147px]"
                        >
                            {project.platform}
                        </Badge>

                        {!active && (
                            <div className="flex gap-2">
                                {project.tags.map((t, idx) => (
                                    <Badge key={`product-card-badge-${idx}`}>{t}</Badge>
                                ))}
                            </div>
                        )}
                    </div>
                    {!active && <Rating rating={project.rating} ratingCount={project.ratingCount} />}
                    <div
                        className={`text-xs w-fit h-[27.44] flex items-center gap-1.5 rounded-2xl text-[#4DE853] bg-[#00A86B]/15 p-2 border-1 border-[#4DE853] min-w-fit`}
                    >
                        <CheckCircle2 className="w-[12px] h-[12px]" />
                        <span>{project.status}</span>
                    </div>
                    {active && (
                        <Link
                            href={`/projects/${project.id}`}
                            className="text-sm font-semibold text-[#7197EB] w-[113.14px] h-[58.95px] flex items-center mx-auto lg:mx-0"
                        >
                            Ver detalle
                        </Link>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ProjectCard;
