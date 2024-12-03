import { ProjectDetails } from "@/types/project.types";

export const PROJECT_DETAILS_INITIAL_STATE: ProjectDetails = {
  days: NaN,
  budget: {
    min: NaN,
    max: NaN
  },
  technicalRequirement: [""],
  requiredKnowledge: [],
  requiredSkills: [""],
  assets: []
};

