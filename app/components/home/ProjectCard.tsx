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
        <div className="mb-2">
          <span>
            {getMonthYear(project.startDate)} -{" "}
            {project.endDate ? getMonthYear(project.endDate) : "Present"}
          </span>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-row gap-2 overflow-auto">
            {project.tags.map((tag, idx) => (
              <span
                key={`${project.title} ${idx}`}
                className="text-xs text-nowrap bg-neutral-900 text-neutral-300 group-hover:bg-neutral-300 group-hover:text-neutral-900 px-2 py-1 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
