import { ProjectWithFullImgs } from "@/types/project.types";
import { TProjectCard } from "@/types/project.types";
import { RequiredProperty } from "@/types/utils.types";

export const transformBTProject = (project: RequiredProperty<ProjectWithFullImgs>): TProjectCard => {
  console.log('project.author.seller: ', project.author.seller);
  const projectFT = {
    id: project.id!,
    title: project.title,
    description: project.description,
    instructor: {
      name: project.author.name,
      profileImg: project.author.profileImg,
      userType: project.author.seller.type,
      description: "asdasdasd",
      rating: 4.5
    },
    platform: "PowerApps" as TProjectCard["platform"],
    status: "en-curso" as TProjectCard["status"],
    tags: project.tags,
    rating: 4.5,
    ratingCount: 16
  };   
  console.log('projectFT: ', projectFT);

  return projectFT
};
