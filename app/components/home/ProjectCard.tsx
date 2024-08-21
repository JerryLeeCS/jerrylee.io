import { Project } from "app/types/project";
import { getMonthYear } from "app/utils/date";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <a href={project.link}>
      <div className="group border border-neutral-100 hover:bg-neutral-100 hover:text-black border-solid p-4">
        <h1 className="text-lg font-bold mb-2">{project.title}</h1>
        <h2 className="text-sm text-neutral-400 mb-2">{project.description}</h2>
        <div className="text-xs text-neutral-400 text-right">
          <span>
            {getMonthYear(project.startDate)} -{" "}
            {project.endDate ? getMonthYear(project.endDate) : "Present"}
          </span>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
