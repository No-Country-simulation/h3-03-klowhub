import { ProjectWithFullImgs } from "@/types/project.types";
import { TProjectCard } from "@/types/project.types";
import { RequiredProperty } from "@/types/utils.types";

export const transformBTProject = (project: RequiredProperty<ProjectWithFullImgs>): TProjectCard => {
  const projectFT = {
    id: project.id!,
    title: project.title,
    description: project.description,
    instructor: {
      name: project.author.name,
      img: project.author.profileImg.fileMetadata,
      userType: project.author.seller.type,
      description: project.author.seller.about,
      rating: 4.5
    },
    platform: "PowerApps" as TProjectCard["platform"],
    status: "en-curso" as TProjectCard["status"],
    rating: 4.5,
    ratingCount: 16
  };   

  return projectFT
};
